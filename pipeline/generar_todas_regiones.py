#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generar_todas_regiones.py -- Pipeline de automatización PNC Maquinarias.

Corre, para TODAS las regiones configuradas (ver DEPARTAMENTOS abajo), las mismas
5 consultas ya validadas en 03_generar_region.py contra Producción (ejecutadas,
en ejecución, programadas, convenios, flota) y escribe cada resultado DIRECTO
como código fuente del sitio en:

    <repo>/src/data/regions/_generated/<slug>.js

listo para que `npm run build` lo empaquete. Nunca toca los archivos con
contenido curado a mano: src/data/regions/<slug>.js (meta, puntosCriticos,
escenarios, capacidad, personalUBO, galeria, fuentes) queda intacto -- esos
archivos solo hacen `import datosBD from './_generated/<slug>'` y `...datosBD,`.

Uso típico (en tu laptop, conectado a la VPN de VIVIENDA):

    python generar_todas_regiones.py --repo "C:\\ruta\\a\\pnc-tumbes"

Opciones:
    --repo RUTA       Carpeta raíz del proyecto del sitio (donde está package.json).
                       Obligatorio.
    --periodo AAAA     Periodo/año a consultar (default: el año actual).
    --regiones LISTA   Lista separada por comas de slugs a regenerar en vez de
                        todas (ej. --regiones piura,ica). Útil para probar.
    --git-commit        Además de escribir los archivos, hace `git add` + `git commit`
                        en el repo (usa --repo como working dir). NO hace push --
                        eso queda para --git-push.
    --git-push          Igual que --git-commit, y además hace `git push`. Implica
                        --git-commit.

Credenciales (igual que 03_generar_region.py): se piden por variables de entorno
PGHOST / PGPORT / PGDATABASE / PGUSER / PGPASSWORD, o interactivo si no están
seteadas. Para correr esto desapercibido (ej. Task Scheduler de Windows), hay
que setear esas variables de entorno de forma persistente ANTES -- ver el LEEME
de automatización para cómo hacerlo con `setx` sin dejar la contraseña en texto
plano en este script ni en el repo.

============================================================================
LIMITACIONES CONOCIDAS DE LA AUTOMATIZACIÓN (documentado a propósito, léelo)
============================================================================

1. tipo/marca de flota: la base los da en MAYÚSCULAS y sin tildes
   (ej. "EXCAVADORA HIDRAULICA"). Este script los traduce con los diccionarios
   TRAD_TIPO / TRAD_MARCA de abajo, armados a partir de los valores que ya
   aparecen en los 7 sitios publicados. Si aparece un tipo/marca de maquinaria
   NUEVO que no está en el diccionario, el script:
     - igual lo incluye (no se pierde ninguna máquina),
     - le aplica una capitalización simple como respaldo,
     - imprime una advertencia en pantalla pidiendo agregarlo al diccionario.
   Conviene revisar esas advertencias cada vez que salgan y sumar la entrada
   correcta a TRAD_TIPO/TRAD_MARCA para que quede prolijo de ahí en adelante.

2. Notas de mantenimiento (ej. "HT N° 124313: falla en el módulo de control...").
   Esto NO existe en la base -- es texto que se escribió a mano en el sitio.
   El script las PRESERVA cuando puede: antes de escribir un archivo nuevo, lee
   el _generated/<slug>.js existente y arma un mapa código -> nota. Si una
   máquina sigue en el mismo estado (ej. sigue inoperativa) y su código ya
   tenía una nota, esa nota se mantiene en la nueva corrida. Una nota para una
   máquina que RECIÉN queda inoperativa no se puede inventar sola -- hay que
   escribirla a mano una vez (editando el _generated/<slug>.js después de
   correr el script, o pidiéndomelo) y de ahí en adelante el script la conserva
   mientras la máquina siga inoperativa con ese mismo código.

3. Convenios: si son pocos (<= 10) se listan uno por uno con su fecha de
   vencimiento (esto es lo que ya está validado contra Producción). Si son
   muchos (Piura, Puno) se agrupan por nivel de gobierno en un resumen
   ("21 convenios vigentes"), igual que ya está hecho ahí -- si no, la lista
   sería demasiado larga para el sitio. Un convenio a menos de 30 días de
   vencer se marca "vence DD/MM/AAAA (a un mes de caducar)" en vez de
   "hasta DD/MM/AAAA", igual que ya está hecho a mano en Ancash.
   Nota: los nombres de entidad se estandarizan a "Gobierno Regional" /
   "Municipalidad Provincial X" / "Municipalidad Distrital X" en todas las
   regiones (Tumbes hoy dice "GORE Tumbes" / "Distrito La Cruz" -- al
   regenerar va a cambiar a la forma larga, más consistente entre regiones).

4. provincia/distrito se pasan por Title Case simple (cada palabra con
   mayúscula inicial). Tildes que la base no tiene en nombres propios
   (ej. "San José de los Molinos" -> queda "San Jose De Los Molinos") NO se
   restauran automáticamente -- si algún nombre de distrito importa mucho
   que quede con tilde, es un ajuste manual puntual, no algo que este script
   pueda saber por sí solo.

5. Lo que este script NUNCA toca (sigue 100% manual, a propósito): fotos de
   galería, puntos críticos ANA (vienen de un Excel aparte), escenarios FEN
   (vienen de un Excel nacional que solo cubre regiones del norte), personal
   de UBO, fuentes, y los límites geográficos del mapa (GeoJSON, fuente
   pública aparte). Para una región NUEVA que nunca existió en el sitio, esos
   campos hay que armarlos a mano la primera vez (yo puedo ayudar con eso
   cuando llegue el momento).
"""
import os
import re
import sys
import getpass
import argparse
import subprocess
import unicodedata
from datetime import date

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    print("Falta la librería psycopg2. Instálala con:\n    pip install psycopg2-binary")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Configuración: qué regiones existen y cómo se llama su departamento en la
# base (pnc.lim_departamentos.nom_dpto). El slug es el nombre de archivo en
# src/data/regions/_generated/<slug>.js -- tiene que coincidir con lo que ya
# usa src/data/regions/index.js.
# ---------------------------------------------------------------------------
DEPARTAMENTOS = {
    "tumbes":     "TUMBES",
    "puno":       "PUNO",
    "tacna":      "TACNA",
    "piura":      "PIURA",
    "ancash":     "ANCASH",
    "lambayeque": "LAMBAYEQUE",
    "ica":        "ICA",
}

# Umbral: con más de este número de convenios vigentes, se agrupan por nivel
# de gobierno en vez de listarlos uno por uno (si no, la lista queda enorme).
UMBRAL_AGRUPAR_CONVENIOS = 10

# Notas nuevas que quedan inoperativas se marcan "vence en <= 30 días" con
# aviso especial en vez de solo la fecha.
DIAS_AVISO_VENCIMIENTO = 30

NIVEL_GOB = {"01": "Gobierno Regional", "02": "Municipalidad Provincial", "03": "Municipalidad Distrital"}

# Diccionario de traducción tipo_unidad / marca: MAYÚSCULAS-sin-tilde (como
# viene de la base) -> forma legible ya usada en el sitio. Armado leyendo los
# 7 archivos _generated/*.js ya publicados (agosto 2026). Si sale una
# advertencia de "no traducido", agregar la entrada acá.
TRAD_TIPO = {
    "CAMION CISTERNA DE AGUA": "Camión cisterna de agua",
    "CAMION CISTERNA DE COMBUSTIBLE": "Camión cisterna de combustible",
    "CAMION DE AUXILIO MECANICO": "Camión de auxilio mecánico",
    "CAMION GRUA": "Camión grúa",
    "CAMIONETA": "Camioneta",
    "CARGADOR FRONTAL": "Cargador frontal",
    "EXCAVADORA HIDRAULICA": "Excavadora hidráulica",
    "MINI CARGADOR": "Mini cargador",
    "MOTONIVELADORA": "Motoniveladora",
    "PLATAFORMA": "Plataforma",
    "PLATAFORMA (CAMA BAJA)": "Plataforma (cama baja)",
    "REMOLCADOR": "Remolcador",
    "RETROEXCAVADORA": "Retroexcavadora",
    "RODILLO COMPACTADOR": "Rodillo compactador",
    "TRACTOR SOBRE ORUGA": "Tractor sobre oruga",
    "VOLQUETE": "Volquete",
}
TRAD_MARCA = {
    "ACS": "ACS",
    "CATERPILLAR": "Caterpillar",
    "HAMM": "Hamm",
    "HINO": "Hino",
    "INDUSTRIA FIRME": "Industria Firme",
    "IVECO": "Iveco",
    "JOHN DEERE": "John Deere",
    "KOMATSU": "Komatsu",
    "MERCEDES BENZ": "Mercedes Benz",
    "MITSUBISHI": "Mitsubishi",
    "NEW HOLLAND": "New Holland",
    "RMB SATECI": "RMB Sateci",
    "SCANIA": "Scania",
    "TOYOTA": "Toyota",
    "VOLVO": "Volvo",
}


def sin_tildes(s):
    """Quita tildes/diéresis para poder comparar sin importar si la base trae
    el texto con o sin acentuar (se ha visto de las dos formas para el mismo
    valor, ej. 'CAMION...' junto con 'MECÁNICO' en la misma fila)."""
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


# Diccionarios normalizados (clave sin tildes) para que la búsqueda no falle
# si la base trae o no trae acentos en las mayúsculas.
TRAD_TIPO_NORM = {sin_tildes(k): v for k, v in TRAD_TIPO.items()}
TRAD_MARCA_NORM = {sin_tildes(k): v for k, v in TRAD_MARCA.items()}


def cargar_env_local():
    """Para correr esto DESAPERCIBIDO (ej. Task Scheduler de Windows) sin que
    nadie tenga que tipear la contraseña: si existe un archivo llamado
    'credenciales_pnc.env' en la MISMA carpeta que este script, se cargan sus
    líneas KEY=VALOR como variables de entorno (sin pisar una que ya esté
    seteada de verdad). Ese archivo NUNCA se sube a git -- está en
    .gitignore. Ver el LEEME de automatización para cómo crearlo.
    Si no existe el archivo, no pasa nada -- se sigue pidiendo por consola o
    por variables de entorno de verdad, como siempre."""
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


def pedir_dato(nombre_env, prompt, default=None, oculto=False):
    valor = os.environ.get(nombre_env)
    if valor:
        return valor
    if oculto:
        return getpass.getpass(prompt)
    entrada = input(prompt)
    return entrada.strip() or default


def num(v, default=0):
    return float(v) if v is not None else default


def entero(v, default=0):
    return int(v) if v is not None else default


def traducir(valor, diccionario_norm, etiqueta):
    if valor is None:
        return "SIN DATO"
    clave = sin_tildes(valor.strip().upper())
    if clave in diccionario_norm:
        return diccionario_norm[clave]
    print(f"  [!] {etiqueta} sin traducir en el diccionario: {valor!r} -- se usa capitalización simple. "
          f"Conviene agregarlo a TRAD_{etiqueta.upper()} en este script.")
    return valor.strip().title()


def titulo(valor):
    return (valor or "").strip().title()


# ---------------------------------------------------------------------------
# 1) CONSULTA: exactamente la misma lógica ya validada en 03_generar_region.py,
#    devuelve los datos TAL COMO vienen de la base (mayúsculas, sin traducir).
# ---------------------------------------------------------------------------
def consultar_departamento(cur, departamento, periodo):
    resultado = {"departamento": departamento, "periodo": periodo}

    cur.execute("""
        SELECT inte.tipo,
               COUNT(*) AS cantidad,
               SUM(COALESCE(
                   (SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_vol, 0)) AS m3,
               SUM(COALESCE(
                   (SELECT round(sum(av.avance_km), 3) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_km, 0)) AS km,
               SUM(COALESCE(inte.pob_beneficiada, 0)) AS poblacion
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado = 'EJECUTADA'
        GROUP BY inte.tipo
        ORDER BY inte.tipo;
    """, (departamento, periodo))
    ejecutadas_por_tipo = cur.fetchall()
    resultado["ejecutadasPorTipo"] = [
        {"tipo": r["tipo"], "cantidad": r["cantidad"], "m3": round(num(r["m3"]), 2), "km": round(num(r["km"]), 2), "poblacion": entero(r["poblacion"])}
        for r in ejecutadas_por_tipo
    ]
    resultado["ejecutadasTotal"] = {
        "cantidad": sum(r["cantidad"] for r in ejecutadas_por_tipo),
        "m3": round(sum(num(r["m3"]) for r in ejecutadas_por_tipo), 2),
        "km": round(sum(num(r["km"]) for r in ejecutadas_por_tipo), 2),
        "poblacion": sum(entero(r["poblacion"]) for r in ejecutadas_por_tipo),
    }

    cur.execute("""
        SELECT inte.provincia, inte.distrito, inte.tipo, inte.descripcion,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fin,
               COALESCE((SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion), 0) AS vol_acum,
               inte.pob_beneficiada
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado = 'EN EJECUCIÓN'
        ORDER BY inte.fecha_inicio;
    """, (departamento, periodo))
    resultado["enEjecucion"] = [
        {"provincia": r["provincia"], "distrito": r["distrito"], "tipo": r["tipo"], "descripcion": r["descripcion"],
         "inicio": r["inicio"], "fin": r["fin"], "volAcum": num(r["vol_acum"]), "poblacion": entero(r["pob_beneficiada"], None)}
        for r in cur.fetchall()
    ]

    cur.execute("""
        SELECT inte.provincia, inte.distrito,
               COUNT(*) AS cantidad,
               SUM(COALESCE(inte.meta_vol, 0)) AS meta_vol,
               SUM(COALESCE(inte.meta_km, 0)) AS meta_km,
               SUM(COALESCE(inte.pob_beneficiada, 0)) AS poblacion
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado ILIKE 'PROGRAMADA%%'
        GROUP BY inte.provincia, inte.distrito
        ORDER BY inte.provincia, inte.distrito;
    """, (departamento, periodo))
    programadas = cur.fetchall()
    resultado["programadas"] = [
        {"provincia": r["provincia"], "distrito": r["distrito"], "cantidad": r["cantidad"],
         "metaVol": round(num(r["meta_vol"]), 2), "metaKm": round(num(r["meta_km"]), 2), "poblacion": entero(r["poblacion"])}
        for r in programadas
    ]
    resultado["programadasTotal"] = {
        "cantidad": sum(r["cantidad"] for r in programadas),
        "metaVol": round(sum(num(r["meta_vol"]) for r in programadas), 2),
        "metaKm": round(sum(num(r["meta_km"]) for r in programadas), 2),
        "poblacion": sum(entero(r["poblacion"]) for r in programadas),
    }

    cur.execute("""
        SELECT co.nivel_gob, p.nom_prov AS provincia_nombre, d.nom_dist AS distrito_nombre,
               co.fecha_fin
        FROM pnc.tb_op_convenio co
        LEFT JOIN pnc.lim_provincias p ON p.id_prov = co.id_prov
        LEFT JOIN pnc.lim_distritos d ON d.id_dist = co.id_dist
        WHERE co.id_dpto = (SELECT id_dpto FROM pnc.lim_departamentos WHERE upper(nom_dpto) = %s)
          AND co.fecha_fin >= CURRENT_DATE
        ORDER BY co.fecha_fin;
    """, (departamento,))
    resultado["_convenios_crudo"] = cur.fetchall()

    cur.execute("""
        SELECT fcm.tipo_unidad, fcm.marca, fcm.codigo,
               COALESCE(vme.estado_desc, 'SIN DATO') AS estado_maquinaria
        FROM pnc.fc_em_maquinaria_1 fcm
        LEFT JOIN pnc.vw_em_maquina_estado_activo vme ON fcm.numero = vme.id_maquina
        WHERE fcm.codigo IS NOT NULL
          AND vme.cod_ubo = (
              SELECT id_dpto FROM pnc.lim_departamentos WHERE upper(nom_dpto) = %s
          )
        ORDER BY fcm.tipo_unidad, fcm.marca;
    """, (departamento,))
    resultado["_flota_cruda"] = cur.fetchall()

    return resultado


# ---------------------------------------------------------------------------
# 2) FORMATEO: traduce/agrupa/preserva notas. Separado de la consulta para
#    poder probarlo con datos de ejemplo sin conexión a la base (ver
#    `--self-test` más abajo).
# ---------------------------------------------------------------------------
def formatear_convenios(convenios_crudo, hoy=None):
    hoy = hoy or date.today()
    filas = []
    for r in convenios_crudo:
        nivel = NIVEL_GOB.get(r["nivel_gob"], f"Convenio (nivel_gob={r['nivel_gob']})")
        if nivel == "Gobierno Regional":
            entidad = "Gobierno Regional"
        elif nivel == "Municipalidad Provincial":
            entidad = f"Municipalidad Provincial {titulo(r['provincia_nombre'])}".strip()
        elif nivel == "Municipalidad Distrital":
            entidad = f"Municipalidad Distrital {titulo(r['distrito_nombre'])}".strip()
        else:
            entidad = nivel
        filas.append({"nivel": nivel, "entidad": entidad, "fecha_fin": r["fecha_fin"]})

    total = len(filas)
    if total > UMBRAL_AGRUPAR_CONVENIOS:
        # Muchos convenios: se agrupan por nivel de gobierno.
        orden = ["Gobierno Regional", "Municipalidad Provincial", "Municipalidad Distrital"]
        conteo = {n: 0 for n in orden}
        for f in filas:
            conteo[f["nivel"]] = conteo.get(f["nivel"], 0) + 1
        vigentes = []
        for n in orden:
            c = conteo.get(n, 0)
            if c == 0:
                continue
            etiqueta = "convenio vigente" if c == 1 else "convenios vigentes"
            vigentes.append({"entidad": n, "detail": f"{c} {etiqueta}"})
        return total, vigentes

    # Pocos convenios: se listan uno por uno, ordenados por nivel y luego por
    # fecha de vencimiento; los que vencen en <= 30 días llevan aviso.
    orden_nivel = {"Gobierno Regional": 0, "Municipalidad Provincial": 1, "Municipalidad Distrital": 2}
    filas.sort(key=lambda f: (orden_nivel.get(f["nivel"], 9), f["fecha_fin"]))
    vigentes = []
    for f in filas:
        dias = (f["fecha_fin"] - hoy).days
        fecha_str = f["fecha_fin"].strftime("%d/%m/%Y")
        if 0 <= dias <= DIAS_AVISO_VENCIMIENTO:
            detail = f"vence {fecha_str} (a un mes de caducar)"
        else:
            detail = f"hasta {fecha_str}"
        vigentes.append({"entidad": f["entidad"], "detail": detail})
    return total, vigentes


def cargar_notas_viejas(ruta_generated_js):
    """Lee un _generated/<slug>.js ya existente y arma un mapa
    código -> (nota, estado) para poder preservar notas de mantenimiento
    escritas a mano cuando se regenera el archivo."""
    notas = {}
    if not os.path.isfile(ruta_generated_js):
        return notas
    try:
        contenido = open(ruta_generated_js, encoding="utf-8").read()
    except OSError:
        return notas
    # Cada entrada de flota vive en su propia línea en el formato que este
    # mismo script escribe (y el que ya usan los 7 archivos publicados).
    patron = re.compile(
        r"codigos:\s*\[([^\]]*)\].*?estado:\s*'([^']*)'(?:.*?nota:\s*'((?:[^'\\]|\\.)*)')?",
    )
    for linea in contenido.splitlines():
        m = patron.search(linea)
        if not m or not m.group(3):
            continue
        codigos_txt, estado, nota = m.groups()
        nota = nota.replace("\\'", "'")
        codigos = re.findall(r"'([^']*)'", codigos_txt)
        for c in codigos:
            notas[c] = (nota, estado)
    return notas


def formatear_flota(flota_cruda, notas_viejas):
    agrupado = {}
    orden = []
    for r in flota_cruda:
        estado = (r["estado_maquinaria"] or "SIN DATO").strip().lower()
        clave = (r["tipo_unidad"], r["marca"], estado)
        if clave not in agrupado:
            agrupado[clave] = {"tipo_raw": r["tipo_unidad"], "marca_raw": r["marca"], "codigos": [], "estado": estado}
            orden.append(clave)
        agrupado[clave]["codigos"].append(r["codigo"])

    flota = []
    for clave in orden:
        g = agrupado[clave]
        item = {
            "tipo": traducir(g["tipo_raw"], TRAD_TIPO_NORM, "tipo"),
            "marca": traducir(g["marca_raw"], TRAD_MARCA_NORM, "marca"),
            "codigos": g["codigos"],
            "estado": g["estado"],
            "cantidad": len(g["codigos"]),
        }
        # Preservar nota de mantenimiento si TODOS los códigos del grupo
        # tenían la misma nota en el mismo estado en el archivo anterior.
        notas_candidatas = set()
        todas_coinciden = True
        for cod in g["codigos"]:
            prev = notas_viejas.get(cod)
            if prev and prev[1] == g["estado"]:
                notas_candidatas.add(prev[0])
            else:
                todas_coinciden = False
                break
        if todas_coinciden and len(notas_candidatas) == 1:
            item["nota"] = next(iter(notas_candidatas))
        flota.append(item)
    return flota, len(flota_cruda)


def formatear_resultado(crudo, notas_viejas, hoy=None):
    """Toma el dict devuelto por consultar_departamento() (o un dict con la
    misma forma, ej. cargado de un salida_<region>.json de prueba) y devuelve
    la versión ya traducida/agrupada lista para emitir como JS."""
    r = dict(crudo)

    r["ejecutadasPorTipo"] = [
        {
            "tipo": (e["tipo"] or "").strip().capitalize(),
            "cantidad": entero(e["cantidad"]),
            "m3": round(num(e["m3"]), 2),
            "km": (round(num(e["km"]), 2) or None) if num(e["km"]) == 0 else round(num(e["km"]), 2),
            "poblacion": entero(e["poblacion"]),
        }
        for e in r["ejecutadasPorTipo"]
    ]

    r["enEjecucion"] = [
        {
            "provincia": titulo(e["provincia"]),
            "distrito": titulo(e["distrito"]),
            "tipo": (e["tipo"] or "").strip().capitalize(),
            "descripcion": e["descripcion"],
            "inicio": e["inicio"],
            "fin": e["fin"],
            "volAcum": num(e["volAcum"]),
            "poblacion": e["poblacion"] if e["poblacion"] is not None else None,
        }
        for e in r["enEjecucion"]
    ]

    r["programadas"] = [
        {
            "provincia": titulo(p["provincia"]),
            "distrito": titulo(p["distrito"]),
            "cantidad": entero(p["cantidad"]),
            "metaVol": round(num(p["metaVol"]), 2),
            "metaKm": round(num(p["metaKm"]), 2),
            "poblacion": entero(p["poblacion"]),
        }
        for p in r["programadas"]
    ]

    if "_convenios_crudo" in r:
        total, vigentes = formatear_convenios(r.pop("_convenios_crudo"), hoy=hoy)
        r["conveniosCount"] = total
        r["conveniosVigentes"] = vigentes

    if "_flota_cruda" in r:
        flota, flota_total = formatear_flota(r.pop("_flota_cruda"), notas_viejas)
        r["flota"] = flota
        r["flotaTotal"] = flota_total

    return r


# ---------------------------------------------------------------------------
# 3) EMISIÓN: convierte el dict formateado en el texto del archivo .js, con
#    el mismo estilo (comillas simples, un objeto por línea) que ya usan los
#    7 archivos _generated/*.js publicados.
# ---------------------------------------------------------------------------
def js_str(v):
    s = str(v).replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"


def js_num(v):
    if v is None:
        return "null"
    if isinstance(v, int):
        return str(v)
    return str(round(float(v), 2))


def js_list_str(vals):
    return "[" + ", ".join(js_str(v) for v in vals) + "]"


def emitir_js(r):
    L = []
    L.append("// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.")
    L.append("// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.")
    L.append("export default {")

    L.append("  ejecutadasPorTipo: [")
    for e in r["ejecutadasPorTipo"]:
        L.append(f"    {{ tipo: {js_str(e['tipo'])}, cantidad: {js_num(e['cantidad'])}, m3: {js_num(e['m3'])}, km: {js_num(e['km'])}, poblacion: {js_num(e['poblacion'])} }},")
    L.append("  ],")
    et = r["ejecutadasTotal"]
    L.append(f"  ejecutadasTotal: {{ cantidad: {js_num(et['cantidad'])}, m3: {js_num(et['m3'])}, km: {js_num(et['km'])}, poblacion: {js_num(et['poblacion'])} }},")
    L.append("")

    L.append("  enEjecucion: [")
    for e in r["enEjecucion"]:
        L.append(
            f"    {{ provincia: {js_str(e['provincia'])}, distrito: {js_str(e['distrito'])}, tipo: {js_str(e['tipo'])}, "
            f"descripcion: {js_str(e['descripcion'])}, inicio: {js_str(e['inicio'])}, fin: {js_str(e['fin'])}, "
            f"volAcum: {js_num(e['volAcum'])}, poblacion: {js_num(e['poblacion'])} }},"
        )
    L.append("  ],")
    L.append("")

    L.append("  programadasCols: ['provincia', 'distrito'],")
    L.append("  programadas: [")
    for p in r["programadas"]:
        L.append(
            f"    {{ provincia: {js_str(p['provincia'])}, distrito: {js_str(p['distrito'])}, cantidad: {js_num(p['cantidad'])}, "
            f"metaVol: {js_num(p['metaVol'])}, metaKm: {js_num(p['metaKm'])}, poblacion: {js_num(p['poblacion'])} }},"
        )
    L.append("  ],")
    pt = r["programadasTotal"]
    L.append(f"  programadasTotal: {{ cantidad: {js_num(pt['cantidad'])}, metaVol: {js_num(pt['metaVol'])}, metaKm: {js_num(pt['metaKm'])}, poblacion: {js_num(pt['poblacion'])} }},")
    L.append("")

    L.append(f"  conveniosCount: {js_num(r['conveniosCount'])},")
    L.append("  conveniosVigentes: [")
    for c in r["conveniosVigentes"]:
        L.append(f"    {{ entidad: {js_str(c['entidad'])}, detail: {js_str(c['detail'])} }},")
    L.append("  ],")
    L.append("")

    L.append("  flota: [")
    for f in r["flota"]:
        base = f"    {{ tipo: {js_str(f['tipo'])}, cantidad: {js_num(f['cantidad'])}, marca: {js_str(f['marca'])}, codigos: {js_list_str(f['codigos'])}, estado: {js_str(f['estado'])}"
        if f.get("nota"):
            base += f", nota: {js_str(f['nota'])}"
        base += " },"
        L.append(base)
    L.append("  ],")
    L.append(f"  flotaTotal: {js_num(r['flotaTotal'])},")
    L.append("}")
    L.append("")
    return "\n".join(L)


# ---------------------------------------------------------------------------
# 4) MAIN
# ---------------------------------------------------------------------------
def correr_git(repo, args_git):
    print(f"  $ git {' '.join(args_git)}")
    resultado = subprocess.run(["git", *args_git], cwd=repo, capture_output=True, text=True)
    if resultado.stdout.strip():
        print("   ", resultado.stdout.strip().replace("\n", "\n    "))
    if resultado.returncode != 0:
        print("   ", resultado.stderr.strip().replace("\n", "\n    "))
    return resultado.returncode == 0


def main():
    cargar_env_local()

    ap = argparse.ArgumentParser(description="Genera los datos de todas las regiones PNC desde Producción.")
    ap.add_argument("--repo", required=True, help="Carpeta raíz del proyecto (donde está package.json)")
    ap.add_argument("--periodo", default=str(date.today().year), help="Periodo/año a consultar (default: año actual)")
    ap.add_argument("--regiones", default=None, help="Slugs separados por coma a regenerar (default: todas)")
    ap.add_argument("--git-commit", action="store_true", help="git add + commit después de escribir")
    ap.add_argument("--git-push", action="store_true", help="Igual que --git-commit, y además git push")
    args = ap.parse_args()

    repo = os.path.abspath(args.repo)
    destino = os.path.join(repo, "src", "data", "regions", "_generated")
    if not os.path.isdir(destino):
        print(f"No existe {destino} -- ¿--repo apunta a la carpeta correcta del proyecto?")
        sys.exit(1)

    slugs = list(DEPARTAMENTOS.keys())
    if args.regiones:
        pedidos = [s.strip().lower() for s in args.regiones.split(",") if s.strip()]
        desconocidos = [s for s in pedidos if s not in DEPARTAMENTOS]
        if desconocidos:
            print(f"Región(es) desconocida(s): {', '.join(desconocidos)}. Disponibles: {', '.join(DEPARTAMENTOS)}")
            sys.exit(1)
        slugs = pedidos

    print(f"=== Generando {len(slugs)} región(es) para el periodo {args.periodo} ===\n")

    host = pedir_dato('PGHOST', 'Servidor (host) [S01pgeo001.vivienda.gob.pe]: ', default='S01pgeo001.vivienda.gob.pe')
    port = pedir_dato('PGPORT', 'Puerto [5432]: ', default='5432')
    dbname = pedir_dato('PGDATABASE', 'Base de datos: ')
    user = pedir_dato('PGUSER', 'Usuario (ej. vivienda\\mvcs_pnc_gfpg): ')
    password = pedir_dato('PGPASSWORD', 'Contraseña (no se muestra en pantalla): ', oculto=True)

    print("\nConectando...")
    try:
        conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password, connect_timeout=10)
    except Exception as e:
        print(f"\nNO SE PUDO CONECTAR: {e}")
        sys.exit(1)
    print("Conexión exitosa.\n")
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    archivos_escritos = []
    for slug in slugs:
        departamento = DEPARTAMENTOS[slug]
        print(f"--- {slug} ({departamento}) ---")
        ruta_destino = os.path.join(destino, f"{slug}.js")
        notas_viejas = cargar_notas_viejas(ruta_destino)

        crudo = consultar_departamento(cur, departamento, args.periodo)
        formateado = formatear_resultado(crudo, notas_viejas)
        texto = emitir_js(formateado)

        with open(ruta_destino, "w", encoding="utf-8") as f:
            f.write(texto)
        print(f"  OK -- {ruta_destino}")
        print(f"  ejecutadas={formateado['ejecutadasTotal']['cantidad']}  "
              f"programadas={formateado['programadasTotal']['cantidad']}  "
              f"convenios={formateado['conveniosCount']}  flota={formateado['flotaTotal']}\n")
        archivos_escritos.append(ruta_destino)

    cur.close()
    conn.close()

    if args.git_commit or args.git_push:
        print("=== Git ===")
        rel = [os.path.relpath(p, repo) for p in archivos_escritos]
        correr_git(repo, ["add", *rel])
        mensaje = f"Actualiza datos de regiones ({args.periodo}) -- pipeline automático"
        hay_cambios = correr_git(repo, ["commit", "-m", mensaje])
        if args.git_push and hay_cambios:
            correr_git(repo, ["push"])
        elif args.git_push:
            print("  (nada que subir -- no hubo cambios en los datos)")

    print(f"=== Listo -- {len(archivos_escritos)} archivo(s) actualizado(s) ===")


if __name__ == '__main__':
    main()
