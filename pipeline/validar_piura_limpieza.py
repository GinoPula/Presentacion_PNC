#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validar_piura_limpieza.py -- Saca del MAIN (pnc.tb_em_intervencion), UNA POR UNA, las
intervenciones que la Ayuda Memoria cuenta como "limpieza y descolmatacion" en Piura,
periodo 2026, para poder validar si el total correcto es 32 o 33 (17/09/2026, a pedido de
Franco -- le observaron el numero en una reunion).

Mismo mecanismo que exportar_rio_chillon.py (conexion directa a la base del MAIN desde el
servidor, con las credenciales de pipeline/credenciales_pnc.env) -- corre EN EL SERVIDOR.

Criterio usado (AJUSTA si no calza con el texto exacto de tu Ayuda Memoria):
  - departamento = LIMA... no, PIURA
  - provincia en (AYABACA, HUANCABAMBA, MORROPON, PIURA, TALARA) -- las 5 que menciona el
    parrafo de la Ayuda Memoria
  - periodo = 2026
  - descripcion contiene "LIMPIEZA" Y "DESCOLMATA" (cubre DESCOLMATACION/DESCOLMATACIÓN) --
    asi se identifican como "limpieza y descolmatacion" y no como "mejoramiento de la
    transitabilidad" (el otro rubro que menciona el mismo parrafo, con 21 intervenciones)
  - estado = EJECUTADA -- el parrafo dice "se han ejecutado", no "programadas" ni "en
    ejecucion"

Si tu Ayuda Memoria usa un criterio distinto (otro campo, otro filtro de estado, otro periodo
exacto), avisame el detalle y ajusto la consulta -- lo importante ahora es tener la LISTA
real fila por fila para poder contar y comparar contra el 33, no solo el numero.

Uso:
    .venv/bin/python3 pipeline/validar_piura_limpieza.py

Salida: imprime cada fila encontrada (ficha, distrito, fechas) y el TOTAL al final. Tambien
guarda pipeline/logs/piura_limpieza_<fecha>.json por si quieres revisarlo con calma o
mandarmelo.
"""
import argparse
import getpass
import json
import os
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


def clean(v):
    return (v or "").strip() if isinstance(v, str) else (v or "")


def main():
    ap = argparse.ArgumentParser(description="Valida el conteo de 'limpieza y descolmatacion' en Piura 2026 contra el MAIN.")
    ap.add_argument("--periodo", default="2026", help="Periodo a validar (default: 2026)")
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

    cur.execute("""
        SELECT inte.id_intervencion, inte.provincia, inte.distrito, inte.sector, inte.estado,
               inte.ficha_tec, inte.descripcion, inte.periodo,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fecha_fin
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = 'PIURA'
          AND upper(inte.provincia) = ANY(%(provincias)s)
          AND inte.periodo = %(periodo)s
          AND upper(inte.estado) = 'EJECUTADA'
          AND upper(coalesce(inte.descripcion, '')) LIKE '%%LIMPIEZA%%'
          AND upper(coalesce(inte.descripcion, '')) LIKE '%%DESCOLMATA%%'
        ORDER BY inte.provincia, inte.distrito, inte.fecha_inicio;
    """, {"provincias": PROVINCIAS_PIURA, "periodo": args.periodo})
    filas = cur.fetchall()
    conn.close()

    print(f"\n{'N°':<4}{'ID':<8}{'PROVINCIA':<14}{'DISTRITO':<20}{'FICHA':<18}{'FECHA INICIO – FIN'}")
    print("-" * 90)
    items = []
    for i, r in enumerate(filas, start=1):
        print(f"{i:<4}{clean(r['id_intervencion']):<8}{clean(r['provincia']):<14}{clean(r['distrito']):<20}"
              f"{clean(r['ficha_tec']):<18}{clean(r['fecha_inicio'])} – {clean(r['fecha_fin'])}")
        items.append({
            "idIntervencion": clean(r["id_intervencion"]),
            "provincia": clean(r["provincia"]),
            "distrito": clean(r["distrito"]),
            "sector": clean(r["sector"]),
            "estado": clean(r["estado"]).upper(),
            "ficha": clean(r["ficha_tec"]),
            "descripcion": clean(r["descripcion"]),
            "periodo": clean(r["periodo"]),
            "fechaInicio": clean(r["fecha_inicio"]),
            "fechaFin": clean(r["fecha_fin"]),
        })

    print("-" * 90)
    print(f"TOTAL encontrado en el MAIN: {len(items)}")
    print("(la Ayuda Memoria dice 33 -- compara esta lista contra la de ahi para ver cual sobra/falta)\n")

    ruta_logs = os.path.join(args.repo, "pipeline", "logs")
    os.makedirs(ruta_logs, exist_ok=True)
    ruta_salida = os.path.join(ruta_logs, f"piura_limpieza_{datetime.now().strftime('%Y%m%d_%H%M')}.json")
    with open(ruta_salida, "w", encoding="utf-8") as f:
        json.dump({"criterio": "Piura, provincias AYABACA/HUANCABAMBA/MORROPON/PIURA/TALARA, "
                                "periodo 2026, estado EJECUTADA, descripcion contiene LIMPIEZA y DESCOLMATA",
                    "total": len(items), "items": items}, f, ensure_ascii=False, indent=2)
    print(f"Detalle guardado en: {ruta_salida}")


if __name__ == "__main__":
    main()
