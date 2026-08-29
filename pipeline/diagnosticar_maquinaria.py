"""
Diagnóstico de una sola vez: `inte.maquinaria` no existe en pnc.tb_em_intervencion
(confirmado por el error de la primera corrida de generar_reporte_diario_live.py --
marco_legal sí existe, solo maquinaria no). Esto busca dónde vive de verdad ese dato,
para no seguir adivinando nombres de columna uno por uno.

Uso (misma conexión/credenciales que los otros scripts de esta carpeta):
    python diagnosticar_maquinaria.py --repo "D:\\Presentacion_PNC"

Pega el resultado completo (las 3 secciones) de vuelta -- con eso ajusto el SELECT
de generar_reporte_diario_live.py sin tener que seguir adivinando.
"""

import argparse
import os
import sys

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    print("Falta la librería psycopg2. Instálala con:\n    pip install psycopg2-binary")
    sys.exit(1)


def cargar_env_local():
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


def main():
    cargar_env_local()
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", required=False, help="No se usa, solo por consistencia con los otros scripts")
    ap.add_argument("--id-intervencion", default=None, help="Opcional: un id de una intervención EN EJECUCIÓN conocida, para probar joins puntuales")
    args = ap.parse_args()

    host = pedir_dato('PGHOST', 'Servidor (host) [S01pgeo001.vivienda.gob.pe]: ', default='S01pgeo001.vivienda.gob.pe')
    port = pedir_dato('PGPORT', 'Puerto [5432]: ', default='5432')
    dbname = pedir_dato('PGDATABASE', 'Base de datos: ')
    user = pedir_dato('PGUSER', 'Usuario: ')
    password = pedir_dato('PGPASSWORD', 'Contraseña (no se muestra): ', oculto=True)

    conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password, connect_timeout=10)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    print("\n=== 1) Todas las columnas de pnc.tb_em_intervencion ===")
    cur.execute("""
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'pnc' AND table_name = 'tb_em_intervencion'
        ORDER BY ordinal_position;
    """)
    for r in cur.fetchall():
        print(f"  {r['column_name']:<35} {r['data_type']}")

    print("\n=== 2) Tablas/vistas del esquema pnc con 'maquin' o 'equipo' en el nombre ===")
    cur.execute("""
        SELECT table_name, table_type
        FROM information_schema.tables
        WHERE table_schema = 'pnc'
          AND (table_name ILIKE '%maquin%' OR table_name ILIKE '%equipo%')
        ORDER BY table_name;
    """)
    tablas = cur.fetchall()
    for r in tablas:
        print(f"  {r['table_name']:<45} {r['table_type']}")

    print("\n=== 3) Columnas de esas tablas/vistas (para ver cómo se relacionan con una intervención) ===")
    for t in tablas:
        cur.execute("""
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'pnc' AND table_name = %s
            ORDER BY ordinal_position;
        """, (t['table_name'],))
        print(f"\n  --- pnc.{t['table_name']} ---")
        for c in cur.fetchall():
            print(f"    {c['column_name']:<35} {c['data_type']}")

    if args.id_intervencion:
        print(f"\n=== 4) Filas de esas tablas relacionadas al id_intervencion={args.id_intervencion} (si tienen esa columna) ===")
        for t in tablas:
            cur.execute("""
                SELECT column_name FROM information_schema.columns
                WHERE table_schema = 'pnc' AND table_name = %s AND column_name ILIKE '%%intervencion%%';
            """, (t['table_name'],))
            cols_fk = [r['column_name'] for r in cur.fetchall()]
            for col_fk in cols_fk:
                try:
                    cur.execute(f'SELECT * FROM pnc.{t["table_name"]} WHERE {col_fk} = %s LIMIT 5;', (args.id_intervencion,))
                    filas = cur.fetchall()
                    print(f"\n  pnc.{t['table_name']}.{col_fk} = {args.id_intervencion} -> {len(filas)} fila(s)")
                    for f in filas:
                        print(f"    {dict(f)}")
                except Exception as e:
                    print(f"  (no se pudo probar pnc.{t['table_name']}.{col_fk}: {e})")
                    conn.rollback()

    cur.close()
    conn.close()


if __name__ == '__main__':
    main()
