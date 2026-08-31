"""
Genera src/data/reporteDiario.json conectándose EN VIVO a la base de datos del MAIN
(Postgres, bd_geovivienda), en vez de depender de un Excel exportado a mano. Reusa
exactamente la misma conexión/credenciales que ya usa `generar_todas_regiones.py`
(mismo archivo credenciales_pnc.env, mismo host/usuario), solo que sin filtrar por
departamento: trae TODAS las intervenciones con estado = 'EN EJECUCIÓN' a nivel
nacional (las 23 UBO/departamentos), igual que el Excel que se le envía al Ministro.

Pensado para correr desatendido, por ejemplo con el Programador de tareas de Windows
cada 15-30 minutos mientras esta PC esté encendida -- con --git-commit --git-push deja
el sitio actualizado solo, sin que nadie tenga que exportar ni subir nada a mano.
Ver pipeline/LEEME_REPORTE_DIARIO.md para cómo programar la tarea.

Uso manual (una sola corrida, sin tocar git):
    python pipeline/generar_reporte_diario_live.py --repo "D:\\Presentacion_PNC"

Uso desatendido (Task Scheduler), actualiza y publica solo:
    python pipeline/generar_reporte_diario_live.py --repo "D:\\Presentacion_PNC" --git-push

Columnas MARCO_LEGAL y MAQUINARIA (resuelto):
`inte.marco_legal` es columna plana de pnc.tb_em_intervencion (confirmado, sin error
al correrlo). La maquinaria asignada NO es columna plana -- vive en la tabla puente
N:M `pnc.tb_em_intervencion_maquinaria` (id_intervencion, cod_activo), cruzada con el
catálogo `pnc.fc_em_maquinaria_1` (codigo -> tipo_unidad/marca/modelo). Confirmado
por el equipo (mismo patrón que ya usan M_avance_pnc.php / M_asigna_activo.php).

La maquinaria se trae con una CONSULTA APARTE (no en el mismo SELECT que el resto),
a propósito: si el usuario de credenciales_pnc.env no tiene permiso sobre
tb_em_intervencion_maquinaria, esa segunda consulta falla sola y el reporte se genera
igual con todo lo demás -- la maquinaria queda vacía y se avisa por consola, nunca se
inventa ni se pierde la corrida completa por un problema de permisos en una sola tabla.
"""

import argparse
import json
import os
import re
import sys
from datetime import date

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    print("Falta la librería psycopg2. Instálala con:\n    pip install psycopg2-binary")
    sys.exit(1)


DEPTO_TO_REGION = {
    'TUMBES': 'tumbes',
    'PUNO': 'puno',
    'TACNA': 'tacna',
    'PIURA': 'piura',
    'ANCASH': 'ancash',
    'LAMBAYEQUE': 'lambayeque',
    'ICA': 'ica',
    'LA LIBERTAD': 'la-libertad',
    'LIMA': 'lima',
    'AREQUIPA': 'arequipa',
    # 15 departamentos agregados 30/08/2026 -- ver comentario largo en
    # generar_todas_regiones.py (DEPARTAMENTOS) sobre por qué estos no tienen
    # puntosCriticos/escenarios curados como los 10 anteriores.
    'AMAZONAS': 'amazonas',
    'APURIMAC': 'apurimac',
    'AYACUCHO': 'ayacucho',
    'CAJAMARCA': 'cajamarca',
    'CALLAO': 'callao',
    'CUSCO': 'cusco',
    'HUANCAVELICA': 'huancavelica',
    'HUANUCO': 'huanuco',
    'JUNIN': 'junin',
    'LORETO': 'loreto',
    'MADRE DE DIOS': 'madre-de-dios',
    'MOQUEGUA': 'moquegua',
    'PASCO': 'pasco',
    'SAN MARTIN': 'san-martin',
    'UCAYALI': 'ucayali',
}


def cargar_env_local():
    """Igual que en generar_todas_regiones.py: si hay un credenciales_pnc.env en esta
    misma carpeta, lo carga como variables de entorno para correr desatendido."""
    ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "credenciales_pnc.env")
    if not os.path.isfile(ruta):
        return
    with open(ruta, encoding="utf-8") as f:
        for linea in f:
            linea = linea.strip()
            if not linea or linea.startswith("#") or "=" not in linea:
                continue
            clave, _, valor = linea.partition("=")
            os.environ.setdefault(clave.strip(), valor.strip().strip('"').strip("'"))


def pedir_dato(nombre_env, prompt, default=None, oculto=False):
    valor = os.environ.get(nombre_env)
    if valor:
        return valor
    if oculto:
        import getpass
        return getpass.getpass(prompt)
    entrada = input(prompt)
    return entrada.strip() or default


def clean_text(v):
    if v is None:
        return ''
    return re.sub(r'\s+', ' ', str(v)).strip().strip('"').strip()


def titlecase_es(s):
    if not s:
        return s
    return ' '.join(w.capitalize() if w else w for w in s.strip().split(' '))


def correr_git(repo, args_git):
    import subprocess
    print(f"  $ git {' '.join(args_git)}")
    resultado = subprocess.run(["git", *args_git], cwd=repo, capture_output=True, text=True)
    if resultado.stdout.strip():
        print("   ", resultado.stdout.strip().replace("\n", "\n    "))
    if resultado.returncode != 0:
        print("   ", resultado.stderr.strip().replace("\n", "\n    "))
    return resultado.returncode == 0


def main():
    cargar_env_local()

    ap = argparse.ArgumentParser(description="Genera el Reporte Diario nacional (EN EJECUCIÓN) desde Producción, en vivo.")
    ap.add_argument("--repo", required=True, help="Carpeta raíz del proyecto (donde está package.json)")
    ap.add_argument("--periodo", default=str(date.today().year), help="Periodo/año a consultar (default: año actual)")
    ap.add_argument("--git-commit", action="store_true", help="git add + commit después de escribir (si hubo cambios)")
    ap.add_argument("--git-push", action="store_true", help="Igual que --git-commit, y además git push")
    args = ap.parse_args()

    repo = os.path.abspath(args.repo)
    destino = os.path.join(repo, "src", "data", "reporteDiario.json")
    if not os.path.isdir(os.path.join(repo, "src", "data")):
        print(f"No existe {os.path.join(repo, 'src', 'data')} -- ¿--repo apunta a la carpeta correcta del proyecto?")
        sys.exit(1)

    host = pedir_dato('PGHOST', 'Servidor (host) [S01pgeo001.vivienda.gob.pe]: ', default='S01pgeo001.vivienda.gob.pe')
    port = pedir_dato('PGPORT', 'Puerto [5432]: ', default='5432')
    dbname = pedir_dato('PGDATABASE', 'Base de datos: ')
    user = pedir_dato('PGUSER', 'Usuario (ej. vivienda\\mvcs_pnc_gfpg): ')
    password = pedir_dato('PGPASSWORD', 'Contraseña (no se muestra en pantalla): ', oculto=True)

    print("Conectando...")
    try:
        conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password, connect_timeout=10)
    except Exception as e:
        print(f"NO SE PUDO CONECTAR: {e}")
        sys.exit(1)
    print("Conexión exitosa.\n")
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # 1) Datos base de la intervención -- esta consulta sola ya cubre todo el reporte
    # menos la maquinaria. Separada de la maquinaria a propósito (ver punto 2) para que
    # un problema de permisos en la tabla de maquinaria nunca tumbe el reporte completo.
    cur.execute("""
        SELECT inte.id_intervencion,
               inte.departamento, inte.provincia, inte.distrito, inte.sector,
               inte.tipo, inte.marco_legal, inte.descripcion,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fecha_fin
        FROM pnc.tb_em_intervencion inte
        WHERE inte.estado = 'EN EJECUCIÓN' AND inte.periodo = %s
        ORDER BY inte.departamento, inte.provincia, inte.distrito;
    """, (args.periodo,))
    filas = cur.fetchall()

    # 2) Maquinaria asignada -- tabla puente N:M pnc.tb_em_intervencion_maquinaria
    # (id_intervencion, cod_activo) cruzada con el catálogo pnc.fc_em_maquinaria_1
    # (codigo -> tipo_unidad). Confirmado por el equipo (mismo patrón que ya usan
    # M_avance_pnc.php / M_asigna_activo.php). Arma el texto "TIPO_UNIDAD ( CODIGO)"
    # igual que en los Excel del MAIN, ej. "EXCAVADORA HIDRAULICA ( A10913)".
    #
    # Si el usuario de credenciales_pnc.env no tiene permiso SELECT sobre
    # tb_em_intervencion_maquinaria (psycopg2.errors.InsufficientPrivilege), el reporte
    # se genera igual con el resto de los datos -- la maquinaria queda vacía y se avisa
    # por consola, nunca se inventa ni se tumba la corrida completa. Para que sí traiga
    # la maquinaria, pide a quien administre la base de Producción que corra:
    #   GRANT SELECT ON pnc.tb_em_intervencion_maquinaria TO <tu usuario>;
    maquinaria_por_id = {}
    try:
        cur.execute("""
            SELECT im.id_intervencion,
                   string_agg(ma.tipo_unidad || ' ( ' || im.cod_activo || ')', ', ') AS maquinaria_asignada
            FROM pnc.tb_em_intervencion_maquinaria im
            LEFT JOIN pnc.fc_em_maquinaria_1 ma ON im.cod_activo = ma.codigo
            INNER JOIN pnc.tb_em_intervencion inte ON inte.id_intervencion = im.id_intervencion
            WHERE inte.estado = 'EN EJECUCIÓN' AND inte.periodo = %s
            GROUP BY im.id_intervencion;
        """, (args.periodo,))
        for r in cur.fetchall():
            maquinaria_por_id[r['id_intervencion']] = clean_text(r.get('maquinaria_asignada'))
    except Exception as e:
        conn.rollback()
        print(f"[!] No se pudo traer la maquinaria asignada ({e.__class__.__name__}: {e}).")
        print("    El reporte se genera igual, sin maquinaria por intervención (nunca inventada).")
        print("    Pídele a quien administre Producción: GRANT SELECT ON pnc.tb_em_intervencion_maquinaria TO <tu usuario>;")

    cur.close()
    conn.close()

    rows = []
    for i, r in enumerate(filas, start=1):
        depto_raw = clean_text(r['departamento']).upper()
        maquinaria_raw = maquinaria_por_id.get(r['id_intervencion'], '')
        maquinaria_list = [m.strip() for m in maquinaria_raw.split(',') if m.strip()] if maquinaria_raw else []
        rows.append({
            'n': i,
            'idIntervencion': clean_text(r.get('id_intervencion')),
            'departamento': depto_raw,
            'deptoLabel': titlecase_es(depto_raw),
            'regionId': DEPTO_TO_REGION.get(depto_raw),
            'provincia': titlecase_es(clean_text(r.get('provincia'))),
            'distrito': titlecase_es(clean_text(r.get('distrito'))),
            'sector': titlecase_es(clean_text(r.get('sector'))),
            'tipo': clean_text(r.get('tipo')).upper(),
            'marcoLegal': clean_text(r.get('marco_legal')),
            'descripcion': clean_text(r.get('descripcion')),
            'fechaInicio': r.get('fecha_inicio') or '',
            'fechaFin': r.get('fecha_fin') or '',
            'maquinaria': maquinaria_list,
        })

    ahora = __import__('datetime').datetime.now()
    out = {
        'meta': {
            'fuente': f'Consulta en vivo a bd_geovivienda (pnc.tb_em_intervencion), periodo {args.periodo}',
            'fechaCorte': ahora.strftime('%d/%m/%Y'),
            'horaCorte': ahora.strftime('%H:%M'),
            'generadoDesc': 'ESTADO = "EN EJECUCIÓN" sobre el reporte nacional de intervenciones del MAIN, las 23 UBO/departamentos.',
        },
        'items': rows,
    }

    with open(destino, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"OK -- {len(rows)} intervenciones en ejecución -> {destino}")

    if args.git_commit or args.git_push:
        print("\n=== Git ===")
        rel = os.path.relpath(destino, repo)
        correr_git(repo, ["add", rel])
        mensaje = f"Actualiza Reporte Diario ({ahora.strftime('%d/%m/%Y %H:%M')}) -- refresco automático"
        hay_cambios = correr_git(repo, ["commit", "-m", mensaje])
        if args.git_push and hay_cambios:
            # Antes de subir, trae lo último de origin y reacomoda nuestro commit
            # encima (en vez de fusionarlo). Esto evita que el push falle si el
            # otro pipeline (Regiones) subió cambios entre que empezamos y
            # terminamos esta corrida -- ahora que ambas tareas corren cada
            # 15-30 min, un cruce entre las dos es mucho más probable que antes.
            if not correr_git(repo, ["pull", "--rebase", "--autostash"]):
                print("  [!] git pull --rebase falló -- no se intentará el push para no "
                      "dejar el repo en un estado inconsistente. Revisar a mano.")
            else:
                correr_git(repo, ["push"])
        elif args.git_push:
            print("  (nada que subir -- no hubo cambios desde la última corrida)")


if __name__ == '__main__':
    main()
