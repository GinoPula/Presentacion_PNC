#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
piura_por_cod_actividad.py -- Trae TODAS las intervenciones EJECUTADAS de Piura 2026 del MAIN
(sin filtrar por texto de "limpieza"/"descolmata" como hacia validar_piura_limpieza.py) y las
agrupa por el COD_ACTIVIDAD que trae encajado en la ficha tecnica (ficha_tec), para poder
clasificar por el campo REAL del sistema en vez de adivinar por palabras clave de la
descripcion (18/09/2026, a pedido de Franco).

Los codigos que Franco ya identifico (verifica/completa la lista de abajo si falta alguno):
  AA-U    = Abastecimiento y Distribucion de Agua
  CTMP-U  = ?  (pendiente que Franco confirme)
  LD-E    = ?  (probablemente Limpieza y Descolmatacion / Emergencia)
  LDOA-P  = ?  (probablemente Limpieza y Descolmatacion de Obras de Arte / Prevencion)
  LDOA-PI = ?
  LD-P    = ?
  LD-PI   = ?
  LD-U    = ?
  LETV-E  = ?  (aparece en la ficha 099-2026-LETV-E-PIU, "levantamiento de escombros...")
  MTV-U   = ?  (probablemente Mejoramiento de la Transitabilidad Vial / Urgencia)
  RLE-U   = ?

Este script NO asume el significado de cada codigo -- solo extrae el codigo tal cual aparece en
ficha_tec (buscando cual de los codigos de la lista de arriba calza dentro del texto) y cuenta
cuantas filas caen en cada uno, para que Franco confirme el significado real y para ver si algun
codigo NO listado aparece (fichas sin match se listan aparte al final).

Mismo patron de credenciales que los scripts anteriores (validar_piura_limpieza.py,
inspeccionar_ficha_099.py).

Uso:
    .venv/bin/python3 pipeline/piura_por_cod_actividad.py
"""
import argparse
import getpass
import json
import os
import re
import sys
from datetime import datetime


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
            clave = clave.strip()
            valor = valor.strip().strip('"').strip("'")
            os.environ.setdefault(clave, valor)


def pedir_dato(nombre, es_password=False):
    valor = os.environ.get(nombre)
    if valor:
        return valor
    if es_password:
        return getpass.getpass(f"{nombre}: ")
    return input(f"{nombre}: ").strip()


PROVINCIAS_PIURA = ["AYABACA", "HUANCABAMBA", "MORROPON", "PIURA", "TALARA"]

# Codigos conocidos (los que paso Franco) -- se ordenan de mas largo a mas corto para que el
# regex no matchee "LD-P" dentro de "LD-PI" por accidente (probamos primero los mas largos/
# especificos).
CODIGOS_CONOCIDOS = [
    "LDOA-PI", "LDOA-P", "LETV-E", "CTMP-U", "MTV-U", "RLE-U",
    "LD-PI", "LD-E", "LD-P", "LD-U", "AA-U",
]


def clean(v):
    return (v or "").strip() if isinstance(v, str) else (v or "")


def extraer_cod_actividad(ficha_tec):
    t = (ficha_tec or "").upper()
    for cod in CODIGOS_CONOCIDOS:
        # que este como token propio (rodeado de guion/espacio/inicio-fin), no como substring
        # suelto de otro codigo mas largo.
        patron = r"(?<![A-Z0-9])" + re.escape(cod) + r"(?![A-Z0-9])"
        if re.search(patron, t):
            return cod
    return None


def main():
    ap = argparse.ArgumentParser(description="Agrupa las EJECUTADAS de Piura 2026 por COD_ACTIVIDAD (ficha_tec).")
    ap.add_argument("--periodo", default="2026")
    ap.add_argument("--estado", default="EJECUTADA", help="Estado a filtrar (default EJECUTADA; usa '' para traer todos)")
    ap.add_argument("--repo", default=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    args = ap.parse_args()

    cargar_env_local()
    try:
        import psycopg2
        import psycopg2.extras
    except ImportError:
        print("Falta psycopg2 -- corre esto con el venv del pipeline (.venv/bin/python3).")
        sys.exit(1)

    conn = psycopg2.connect(
        host=pedir_dato("PGHOST"),
        port=pedir_dato("PGPORT") or "5432",
        dbname=pedir_dato("PGDATABASE"),
        user=pedir_dato("PGUSER"),
        password=pedir_dato("PGPASSWORD", es_password=True),
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    sql = """
        SELECT inte.id_intervencion, inte.provincia, inte.distrito, inte.estado,
               inte.ficha_tec, inte.descripcion, inte.periodo,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fecha_fin
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = 'PIURA'
          AND upper(inte.provincia) = ANY(%(provincias)s)
          AND inte.periodo = %(periodo)s
    """
    params = {"provincias": PROVINCIAS_PIURA, "periodo": args.periodo}
    if args.estado:
        sql += " AND upper(inte.estado) = %(estado)s"
        params["estado"] = args.estado.upper()
    sql += " ORDER BY inte.provincia, inte.distrito, inte.fecha_inicio;"

    cur.execute(sql, params)
    filas = cur.fetchall()
    conn.close()

    grupos = {}
    sin_codigo = []
    items = []
    for r in filas:
        ficha = clean(r["ficha_tec"])
        cod = extraer_cod_actividad(ficha)
        if cod is None:
            sin_codigo.append(r)
        grupos.setdefault(cod or "(SIN CODIGO RECONOCIDO)", []).append(r)
        items.append({
            "idIntervencion": clean(r["id_intervencion"]),
            "provincia": clean(r["provincia"]),
            "distrito": clean(r["distrito"]),
            "estado": clean(r["estado"]).upper(),
            "ficha": ficha,
            "codActividad": cod,
            "descripcion": clean(r["descripcion"]),
            "periodo": clean(r["periodo"]),
            "fechaInicio": clean(r["fecha_inicio"]),
            "fechaFin": clean(r["fecha_fin"]),
        })

    print(f"\nTotal filas (Piura, provincias AYABACA/HUANCABAMBA/MORROPON/PIURA/TALARA, "
          f"periodo {args.periodo}, estado {args.estado or '(todos)'}): {len(filas)}\n")

    print(f"{'COD_ACTIVIDAD':<26}{'CANTIDAD'}")
    print("-" * 40)
    for cod in sorted(grupos.keys(), key=lambda c: -len(grupos[c])):
        print(f"{cod:<26}{len(grupos[cod])}")

    print("\n--- Detalle por codigo ---")
    for cod in sorted(grupos.keys()):
        print(f"\n[{cod}] ({len(grupos[cod])})")
        for r in grupos[cod]:
            print(f"  {clean(r['ficha_tec']):<30} {clean(r['provincia']):<12} {clean(r['distrito']):<20} "
                  f"{clean(r['descripcion'])[:80]}")

    if sin_codigo:
        print(f"\n\n*** OJO: {len(sin_codigo)} ficha(s) SIN codigo reconocido de la lista actual"
              f" -- revisa si falta agregar un codigo nuevo a CODIGOS_CONOCIDOS: ***")
        for r in sin_codigo:
            print(f"  {clean(r['ficha_tec'])!r}  -- {clean(r['descripcion'])[:100]}")

    ruta_logs = os.path.join(args.repo, "pipeline", "logs")
    os.makedirs(ruta_logs, exist_ok=True)
    ruta_salida = os.path.join(ruta_logs, f"piura_por_cod_actividad_{datetime.now().strftime('%Y%m%d_%H%M')}.json")
    with open(ruta_salida, "w", encoding="utf-8") as f:
        json.dump({"periodo": args.periodo, "estado": args.estado, "total": len(items), "items": items},
                   f, ensure_ascii=False, indent=2)
    print(f"\nDetalle guardado en: {ruta_salida}")
    print("Mandame la salida de arriba (la tabla de conteos + el detalle) para terminar de mapear "
          "cada codigo a su actividad real.")


if __name__ == "__main__":
    main()
