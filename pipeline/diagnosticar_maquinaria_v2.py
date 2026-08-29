"""
Segunda vuelta del diagnóstico: ninguna tabla/vista con "maquin" o "equipo" en el
nombre tiene relación directa con una intervención puntual (fc_em_maquinaria_1,
tb_em_maquina_estado y vw_em_maquina_estado_activo son todas de flota por UBO/
departamento, no por intervención). El texto "MAQUINARIA" del Excel del MAIN tiene
que salir de otro lado -- esto busca de forma más amplia, sin depender de que el
nombre de la tabla contenga "maquin" o "equipo".

Uso (misma conexión/credenciales que los otros scripts de esta carpeta):
    python diagnosticar_maquinaria_v2.py [--id-intervencion <id>]

Si le pasas --id-intervencion (el id_intervencion de una fila EN EJECUCIÓN
cualquiera -- puedes sacarlo de reporteDiario.json, campo idIntervencion), además
prueba a traer filas reales relacionadas a esa intervención en cualquier tabla que
tenga columna id_intervencion, para ver el dato tal cual está guardado.

Pégame la salida completa.
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
    ap.add_argument("--id-intervencion", default=None)
    args = ap.parse_args()

    host = pedir_dato('PGHOST', 'Servidor (host) [S01pgeo001.vivienda.gob.pe]: ', default='S01pgeo001.vivienda.gob.pe')
    port = pedir_dato('PGPORT', 'Puerto [5432]: ', default='5432')
    dbname = pedir_dato('PGDATABASE', 'Base de datos: ')
    user = pedir_dato('PGUSER', 'Usuario: ')
    password = pedir_dato('PGPASSWORD', 'Contraseña (no se muestra): ', oculto=True)

    conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password, connect_timeout=10)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    print("=== 1) Tablas/vistas del esquema pnc con 'intervencion' en el nombre ===")
    cur.execute("""
        SELECT table_name, table_type
        FROM information_schema.tables
        WHERE table_schema = 'pnc' AND table_name ILIKE '%intervencion%'
        ORDER BY table_name;
    """)
    for r in cur.fetchall():
        print(f"  {r['table_name']:<45} {r['table_type']}")

    print("\n=== 2) Cualquier tabla/vista (en cualquier esquema) con columna 'id_intervencion' ===")
    cur.execute("""
        SELECT table_schema, table_name
        FROM information_schema.columns
        WHERE column_name = 'id_intervencion'
        ORDER BY table_schema, table_name;
    """)
    relacionadas = cur.fetchall()
    for r in relacionadas:
        print(f"  {r['table_schema']}.{r['table_name']}")

    print("\n=== 3) Columnas de cada una de esas tablas ===")
    for r in relacionadas:
        cur.execute("""
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = %s AND table_name = %s
            ORDER BY ordinal_position;
        """, (r['table_schema'], r['table_name']))
        print(f"\n  --- {r['table_schema']}.{r['table_name']} ---")
        for c in cur.fetchall():
            print(f"    {c['column_name']:<35} {c['data_type']}")

    print("\n=== 4) Contenido real de reserva_uno..reserva_cuatro en 5 filas EN EJECUCIÓN ===")
    print("    (por si el texto de maquinaria quedó guardado ahí en vez de en una tabla aparte)")
    cur.execute("""
        SELECT id_intervencion, reserva_uno, reserva_dos, reserva_tres, reserva_cuatro
        FROM pnc.tb_em_intervencion
        WHERE estado = 'EN EJECUCIÓN'
        LIMIT 5;
    """)
    for r in cur.fetchall():
        print(f"  id={r['id_intervencion']}: uno={r['reserva_uno']!r} dos={r['reserva_dos']!r} tres={r['reserva_tres']!r} cuatro={r['reserva_cuatro']!r}")

    if args.id_intervencion:
        print(f"\n=== 5) Filas reales relacionadas a id_intervencion={args.id_intervencion} en cada tabla del punto 2 ===")
        for r in relacionadas:
            try:
                cur.execute(f'SELECT * FROM {r["table_schema"]}.{r["table_name"]} WHERE id_intervencion = %s LIMIT 5;', (args.id_intervencion,))
                filas = cur.fetchall()
                print(f"\n  {r['table_schema']}.{r['table_name']} -> {len(filas)} fila(s)")
                for f in filas:
                    print(f"    {dict(f)}")
            except Exception as e:
                print(f"  (no se pudo consultar {r['table_schema']}.{r['table_name']}: {e})")
                conn.rollback()

    cur.close()
    conn.close()


if __name__ == '__main__':
    main()
