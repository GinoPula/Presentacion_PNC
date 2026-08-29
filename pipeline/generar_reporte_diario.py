"""
Genera src/data/reporteDiario.json a partir del reporte nacional de intervenciones del MAIN
(el mismo archivo 'inter_AAAAMMDDHHMMSS.xlsx', hoja 'Reporte', que ya usamos para refrescar las
8 regiones del sitio).

Este JSON alimenta el botón "Reporte Diario" del sitio (ver src/lib/reporteDiario.js y
src/components/ReporteDiarioModal.jsx): un consolidado nacional (o filtrado a una región) de
todas las intervenciones con ESTADO = "EN EJECUCIÓN", en el mismo formato que se le envía al
Ministro por Excel.

Uso:
    python pipeline/generar_reporte_diario.py "ruta/al/inter_20260824204815.xlsx"

Vuelve a correr este script cada vez que haya un nuevo export del MAIN, igual que con las
8 regiones -- sobreescribe src/data/reporteDiario.json y listo, no hace falta tocar nada más
del sitio (el filtro por región se recalcula solo, en el navegador, a partir de ese JSON).
"""

import json
import re
import sys
from pathlib import Path

import pandas as pd

# Departamento (MAIN) -> id de región del sitio. Solo las 8 regiones que ya tenemos construidas
# se pueden filtrar desde el sitio; el resto de departamentos igual aparecen en el consolidado
# nacional, solo que con regionId = null (no hay página de región a la que enlazarlos todavía).
DEPTO_TO_REGION = {
    'TUMBES': 'tumbes',
    'PUNO': 'puno',
    'TACNA': 'tacna',
    'PIURA': 'piura',
    'ANCASH': 'ancash',
    'LAMBAYEQUE': 'lambayeque',
    'ICA': 'ica',
    'LA LIBERTAD': 'la-libertad',
}


def titlecase_es(s):
    if not isinstance(s, str):
        return s
    return ' '.join(w.capitalize() if w else w for w in s.strip().split(' '))


def clean_text(v):
    if pd.isna(v):
        return ''
    return re.sub(r'\s+', ' ', str(v)).strip().strip('"').strip()


def fmt_date(v):
    if pd.isna(v):
        return ''
    if isinstance(v, str):
        return v.strip()
    try:
        return v.strftime('%d/%m/%Y')
    except Exception:
        return str(v)


def parse_corte_from_filename(path: Path):
    # inter_20260824204815.xlsx -> 24/08/2026, 20:48
    m = re.search(r'(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})', path.stem)
    if not m:
        return None, None
    y, mo, d, h, mi, _s = m.groups()
    return f'{d}/{mo}/{y}', f'{h}:{mi}'


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    src_path = Path(sys.argv[1])
    if not src_path.exists():
        print(f'No existe el archivo: {src_path}')
        sys.exit(1)

    df = pd.read_excel(src_path, sheet_name='Reporte')

    en_ej = df[df['ESTADO'].astype(str).str.strip() == 'EN EJECUCIÓN'].copy()
    en_ej = en_ej.sort_values(['DEPARTAMENTO', 'PROVINCIA', 'DISTRITO'])

    rows = []
    for i, (_, r) in enumerate(en_ej.iterrows(), start=1):
        depto_raw = clean_text(r['DEPARTAMENTO']).upper()
        maquinaria_raw = clean_text(r.get('MAQUINARIA', ''))
        maquinaria_list = [m.strip() for m in maquinaria_raw.split(',') if m.strip()] if maquinaria_raw else []
        rows.append({
            'n': i,
            'idIntervencion': clean_text(r.get('ID_INTERVENCION', '')),
            'departamento': depto_raw,
            'deptoLabel': titlecase_es(depto_raw),
            'regionId': DEPTO_TO_REGION.get(depto_raw),
            'provincia': titlecase_es(clean_text(r.get('PROVINCIA', ''))),
            'distrito': titlecase_es(clean_text(r.get('DISTRITO', ''))),
            'sector': titlecase_es(clean_text(r.get('SECTOR', ''))),
            'tipo': clean_text(r.get('TIPO', '')).upper(),
            'marcoLegal': clean_text(r.get('MARCO_LEGAL', '')),
            'descripcion': clean_text(r.get('DESCRIPCION', '')),
            'fechaInicio': fmt_date(r.get('FECHA_INICIO')),
            'fechaFin': fmt_date(r.get('FECHA_FIN')),
            'maquinaria': maquinaria_list,
        })

    fecha_corte, hora_corte = parse_corte_from_filename(src_path)

    out = {
        'meta': {
            'fuente': f'{src_path.name} (MAIN, corte {fecha_corte} {hora_corte})',
            'fechaCorte': fecha_corte or '',
            'horaCorte': hora_corte or '',
            'generadoDesc': 'ESTADO = "EN EJECUCIÓN" sobre el reporte nacional de intervenciones del MAIN, las 23 UBO/departamentos.',
        },
        'items': rows,
    }

    out_path = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'reporteDiario.json'
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'{len(rows)} intervenciones en ejecución -> {out_path}')


if __name__ == '__main__':
    main()
