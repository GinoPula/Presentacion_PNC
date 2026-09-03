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

Además (agregado 25/08/2026): actualiza los PUNTOS del mapa de intervenciones
en <repo>/src/data/mapaIntervenciones.js -- confirmado que pnc.tb_em_intervencion
tiene columnas lat/long/sector/ficha_tec/enlace_info_cierre directamente, así que
esto también sale de la base y ya no depende del Excel "Reporte de intervenciones"
que exportaba el MAIN. Solo toca el bloque de la región que se está regenerando
(busca su clave y reemplaza SOLO su arreglo de puntos; si la región es nueva,
agrega una clave nueva) -- las demás regiones del archivo quedan intactas.
Lo único que este script NO puede generar por sí solo es el CONTORNO geográfico
de una región nueva (mapaLimites.js, viene de una fuente pública de mapas, no de
Producción) -- eso se agrega a mano una sola vez, la primera vez que aparece esa
región (ver el LEEME de automatización).

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
import math
import getpass
import argparse
import subprocess
import unicodedata
from datetime import date, datetime

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    print("Falta la librería psycopg2. Instálala con:\n    pip install psycopg2-binary")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Incidencias: cada vez que el pipeline corrige o excluye algo automáticamente
# (coordenada rara, tipo/marca sin traducir, etc.) se guarda acá además de
# imprimirse -- al final de la corrida se escribe un reporte aparte y corto
# (pipeline/logs/ULTIMO_REPORTE.txt) para no tener que buscarlo dentro del
# log completo de cada corrida. Ver avisar() y el final de main().
# ---------------------------------------------------------------------------
INCIDENCIAS = []


def avisar(msg):
    print(f"  [!] {msg}")
    INCIDENCIAS.append(msg)


# ---------------------------------------------------------------------------
# Configuración: qué regiones existen y cómo se llama su departamento en la
# base (pnc.lim_departamentos.nom_dpto). El slug es el nombre de archivo en
# src/data/regions/_generated/<slug>.js -- tiene que coincidir con lo que ya
# usa src/data/regions/index.js.
# ---------------------------------------------------------------------------
DEPARTAMENTOS = {
    "tumbes":      "TUMBES",
    "puno":        "PUNO",
    "tacna":       "TACNA",
    "piura":       "PIURA",
    "ancash":      "ANCASH",
    "lambayeque":  "LAMBAYEQUE",
    "ica":         "ICA",
    "la-libertad": "LA LIBERTAD",
    "lima":        "LIMA",
    "arequipa":    "AREQUIPA",
    # 15 departamentos agregados 30/08/2026 (Franco: "termina las demas regiones que faltan").
    # A diferencia de los 10 anteriores, para estos NO hay Excel consolidado de fichas MVCS/ANA
    # ni archivo de presupuesto Moderado/Severo -- solo el reporte en vivo del MAIN. Por eso sus
    # src/data/regions/<slug>.js quedan con puntosCriticos/escenarios/capacidad/personalUBO
    # vacíos (mismo patrón que Puno/Tacna), y solo esta sección (ejecutadas/en ejecución/
    # programadas/convenios/flota) sale con datos reales una vez que se corra el pipeline.
    "amazonas":      "AMAZONAS",
    "apurimac":      "APURIMAC",
    "ayacucho":      "AYACUCHO",
    "cajamarca":     "CAJAMARCA",
    "callao":        "CALLAO",
    "cusco":         "CUSCO",
    "huancavelica":  "HUANCAVELICA",
    "huanuco":       "HUANUCO",
    "junin":         "JUNIN",
    "loreto":        "LORETO",
    "madre-de-dios": "MADRE DE DIOS",
    "moquegua":      "MOQUEGUA",
    "pasco":         "PASCO",
    "san-martin":    "SAN MARTIN",
    "ucayali":       "UCAYALI",
}

# ---------------------------------------------------------------------------
# Máquinas alquiladas -- 03/09/2026, a pedido de Franco: el reporte general venía mostrando 453
# unidades de flota a nivel nacional, pero el número real (sin contar alquiladas) son 450.
#
# No hay ningún campo en fc_em_maquinaria_1/vw_em_maquina_estado_activo que marque esto de forma
# confiable para poder filtrarlo con una condición genérica -- se probó estado_reg (viene NULL
# para las 530 filas del universo con cod_ubo 1-25), estado_desc (solo trae OPERATIVO/
# INOPERATIVO) y contrato_maquinaria (vacío en las 3). El campo 'detalle' sí trae la nota "UNIDAD
# ALQUILADA 2026" para 2 de las 3, pero la tercera (R3-ACS) no tiene ninguna marca en la base --
# así que se excluyen por código explícito, confirmado a mano por Franco, con el mismo criterio
# que ya se usa para los cod_ubo 26/27 de la ANA (ver DEPARTAMENTO_BBOX/consulta de flota más
# abajo). Las 3 son de Junín (cod_ubo 12): R3-ACS (camión cisterna de agua, ACS), 81376 (tractor
# sobre oruga, Komatsu) y CRS70638 (retroexcavadora, Caterpillar).
#
# OJO: si en el futuro aparecen más máquinas alquiladas, hay que agregar su código acá a mano --
# no hay forma de detectarlas solas desde la base tal como está hoy.
FLOTA_CODIGOS_ALQUILADOS = ("R3-ACS", "81376", "CRS70638")

# ---------------------------------------------------------------------------
# Cajas geográficas (lat_min, lat_max, lon_min, lon_max) para validar/corregir
# los puntos del mapa. Agregado 26/08/2026: en La Libertad una intervención
# salía en el mar -- la coordenada de esa fila en Producción venía en UTM
# (este/norte) pegada directo en las columnas lat/long en vez de convertida a
# WGS84. corregir_coordenada_punto() usa estas cajas para detectar cuándo una
# coordenada no cae dentro de su departamento y, si puede, la corrige sola
# (signo invertido, o UTM zona 17S/18S/19S -- las 3 que usa Perú); si no
# puede ubicarla en ningún lugar razonable de Perú, la excluye del mapa en
# vez de mostrarla en un lugar incorrecto (y avisa por consola con el ID para
# poder corregirlo en la fuente).
# ---------------------------------------------------------------------------
PERU_BBOX = (-18.5, 0.5, -81.5, -68.0)

# Calculadas del contorno real de cada departamento en mapaLimites.js (min/max
# lat/lon de su polígono), con un colchón de ~0.15° (~15 km) para no marcar
# como "fuera" un punto real cerca del borde (validado contra los 277 puntos
# ya publicados en mapaIntervenciones.js -- cero falsos positivos).
DEPARTAMENTO_BBOX = {
    "TUMBES":      (-4.38, -3.26, -81.19, -79.99),
    "PIURA":       (-6.52, -3.93, -81.48, -79.06),
    "LAMBAYEQUE":  (-7.33, -5.34, -80.78, -78.97),
    "LA LIBERTAD": (-9.12, -6.80, -79.84, -76.75),
    "ANCASH":      (-10.90, -7.90, -78.79, -76.58),
    "ICA":         (-15.59, -12.81, -76.55, -74.51),
    "PUNO":        (-17.44, -12.85, -71.26, -68.66),
    "TACNA":       (-18.50, -16.62, -71.29, -69.32),
    # LIMA agregado 29/08/2026: estimado a partir del contorno público del departamento
    # (no de mapaLimites.js, que todavía no tiene a Lima) -- cubre desde Barranca/Végueta
    # al norte hasta Cañete/Mala al sur, y desde el litoral hasta Yauyos/Huarochirí al
    # este, con el mismo colchón de ~0.15° que las demás. Si algún punto real de Lima
    # queda fuera de esta caja, revisar y ajustar (mismo criterio que las otras 7).
    "LIMA":        (-13.65, -10.15, -78.00, -75.50),
    # AREQUIPA agregado 29/08/2026: mapaLimites.js todavía no tiene su polígono (no se pudo
    # descargar el contorno público desde aquí), así que se estimó cruzando los extremos
    # geográficos publicados del departamento (norte: La Unión/Cotahuasi ~-14.3; sur: Islay/
    # costa ~-17.3; oeste: Caravelí/Chala ~-75.0; este: Caylloma, borde con Puno, ~-70.9) con
    # los 70 puntos reales ya en Producción (`inter_20260824204815.xlsx`, filtrando 2 filas con
    # coordenada corrupta -- típico problema de UTM pegado directo en lat/long, ver comentario
    # de La Libertad): esos 70 caen en lat -16.48/-15.13, lon -74.61/-71.41 pero solo cubren 6
    # de las 8 provincias (falta Caylloma e Islay), por eso la caja es más ancha que ese rango.
    # Colchón más generoso que las demás (~0.2-0.3°) por la misma razón. Si algún punto real
    # queda fuera, revisar y ajustar -- y si se consigue el contorno real, reemplazar esto igual
    # que se hizo para las demás regiones.
    "AREQUIPA":    (-17.35, -14.30, -75.05, -70.85),

    # 15 departamentos agregados 30/08/2026. Sin polígono en mapaLimites.js y sin puntos
    # suficientes en Producción todavía para cruzarlos como se hizo con Arequipa -- estimados
    # directamente de los extremos geográficos publicados de cada departamento (límites político-
    # administrativos del Perú), con colchón amplio (~0.3-0.5°, más ancho que las 10 regiones
    # anteriores) porque no hay puntos reales para validar contra falsos positivos todavía. Se
    # revisaron contra las coordenadas que sí trae hoy 'inter_20260824204815.xlsx' para los 12 que
    # tienen filas (Amazonas, Apurímac, Ayacucho, Cajamarca, Cusco, Huancavelica, Huánuco, Junín,
    # Loreto, Moquegua, Pasco, San Martín) y todas caen dentro de la caja estimada. Los otros 3
    # (Callao, Madre de Dios, Ucayali) no tienen ninguna fila en ese reporte todavía -- su caja es
    # 100% estimada de fuentes públicas, sin ningún punto real para contrastar. Si al correr el
    # pipeline aparece un punto real fuera de estas cajas, ajustar (mismo criterio que las demás).
    "AMAZONAS":      (-7.00, -3.00, -78.90, -76.90),
    "APURIMAC":      (-14.90, -13.20, -73.75, -72.30),
    "AYACUCHO":      (-15.60, -12.30, -75.05, -73.10),
    "CAJAMARCA":     (-7.85, -4.70, -79.40, -77.70),
    "CALLAO":        (-12.20, -11.70, -77.25, -76.90),
    "CUSCO":         (-15.50, -11.20, -73.90, -70.40),
    "HUANCAVELICA":  (-13.90, -11.80, -76.00, -74.35),
    "HUANUCO":       (-10.60, -8.10, -77.10, -74.30),
    "JUNIN":         (-12.90, -10.10, -76.40, -73.70),
    "LORETO":        (-8.20, 0.00, -78.50, -69.50),
    "MADRE DE DIOS": (-13.50, -9.50, -72.50, -68.50),
    "MOQUEGUA":      (-17.85, -15.85, -71.40, -70.35),
    "PASCO":         (-11.20, -9.70, -76.60, -74.60),
    "SAN MARTIN":    (-8.85, -5.70, -77.60, -75.80),
    "UCAYALI":       (-11.50, -7.00, -75.80, -70.50),
}


def _dentro_de_bbox(lat, lon, bbox):
    if lat is None or lon is None:
        return False
    lat_min, lat_max, lon_min, lon_max = bbox
    return lat_min <= lat <= lat_max and lon_min <= lon <= lon_max


def utm_a_latlon(easting, northing, zona, hemisferio_sur=True):
    """UTM (WGS84) -> lat/long en grados decimales. Formula estándar de
    inversión de Mercator transversa (Snyder), sin dependencias externas --
    validada contra pyproj con error < 1 metro en las 3 zonas que usa Perú
    (17S, 18S, 19S)."""
    a = 6378137.0
    f = 1 / 298.257223563
    e2 = f * (2 - f)
    k0 = 0.9996

    x = easting - 500000.0
    y = northing - (10000000.0 if hemisferio_sur else 0.0)

    m = y / k0
    mu = m / (a * (1 - e2/4 - 3*e2**2/64 - 5*e2**3/256))

    e1 = (1 - math.sqrt(1 - e2)) / (1 + math.sqrt(1 - e2))
    j1 = 3*e1/2 - 27*e1**3/32
    j2 = 21*e1**2/16 - 55*e1**4/32
    j3 = 151*e1**3/96
    j4 = 1097*e1**4/512
    fp = mu + j1*math.sin(2*mu) + j2*math.sin(4*mu) + j3*math.sin(6*mu) + j4*math.sin(8*mu)

    e1sq = e2 / (1 - e2)
    C1 = e1sq * math.cos(fp)**2
    T1 = math.tan(fp)**2
    R1 = a * (1 - e2) / (1 - e2*math.sin(fp)**2)**1.5
    N1 = a / math.sqrt(1 - e2*math.sin(fp)**2)
    D = x / (N1 * k0)

    Q1 = N1 * math.tan(fp) / R1
    Q2 = D**2 / 2
    Q3 = (5 + 3*T1 + 10*C1 - 4*C1**2 - 9*e1sq) * D**4 / 24
    Q4 = (61 + 90*T1 + 298*C1 + 45*T1**2 - 3*C1**2 - 252*e1sq) * D**6 / 720
    lat = fp - Q1 * (Q2 - Q3 + Q4)

    Q5 = D
    Q6 = (1 + 2*T1 + C1) * D**3 / 6
    Q7 = (5 - 2*C1 + 28*T1 - 3*C1**2 + 8*e1sq + 24*T1**2) * D**5 / 120
    lon0 = math.radians(zona * 6 - 183)
    lon = lon0 + (Q5 - Q6 + Q7) / math.cos(fp)

    return math.degrees(lat), math.degrees(lon)


def corregir_coordenada_punto(lat, lon, departamento, id_intervencion=None, sector=None):
    """Ver comentario arriba de DEPARTAMENTO_BBOX. Devuelve (lat, lon) ya
    corregidas si hizo falta, o (None, None) si no se pudo ubicar el punto en
    ningún lugar razonable de Perú (se excluye del mapa)."""
    if lat is None or lon is None:
        return None, None

    etiqueta = f"[{departamento}] intervención {id_intervencion}" if id_intervencion is not None else f"[{departamento}] un punto"
    if sector:
        etiqueta += f" ({sector})"

    bbox = DEPARTAMENTO_BBOX.get(departamento, PERU_BBOX)

    if _dentro_de_bbox(lat, lon, bbox):
        return lat, lon

    # 1) ¿Un signo de menos que falta o que sobra?
    for lat_c, lon_c in ((-lat, lon), (lat, -lon), (-lat, -lon)):
        if _dentro_de_bbox(lat_c, lon_c, bbox):
            avisar(f"{etiqueta}: coordenada con signo invertido -- corregida "
                   f"automáticamente ({lat}, {lon}) -> ({lat_c}, {lon_c}).")
            return lat_c, lon_c

    # 2) ¿Es UTM (este/norte) pegado por error en las columnas lat/long? Se
    #    prueban las 3 zonas de Perú y las 2 formas de asignar las columnas
    #    (lat=norte/long=este es la más probable, pero también al revés).
    for zona in (17, 18, 19):
        for este, norte in ((lon, lat), (lat, lon)):
            try:
                lat_c, lon_c = utm_a_latlon(este, norte, zona, hemisferio_sur=True)
            except (ValueError, ZeroDivisionError, OverflowError):
                continue
            if _dentro_de_bbox(lat_c, lon_c, bbox):
                avisar(f"{etiqueta}: coordenada parecía UTM zona {zona}S -- convertida "
                       f"automáticamente a lat/long ({round(lat_c, 6)}, {round(lon_c, 6)}).")
                return round(lat_c, 6), round(lon_c, 6)

    # 3) Nada cayó dentro del departamento -- último intento: puede que el
    #    departamento registrado en la base esté mal pero la coordenada
    #    original sí sea válida en algún lugar de Perú.
    if bbox is not PERU_BBOX and _dentro_de_bbox(lat, lon, PERU_BBOX):
        avisar(f"{etiqueta}: la coordenada ({lat}, {lon}) no cae dentro de {departamento} "
               f"pero sí dentro de Perú -- se deja tal cual. Revisar a mano si el departamento "
               f"registrado es el correcto (o si el punto de verdad pertenece a otra región).")
        return lat, lon

    avisar(f"{etiqueta}: no se pudo ubicar esta coordenada ({lat}, {lon}) en ningún "
           f"lugar razonable de Perú -- se EXCLUYE del mapa. Revisar el dato en Producción.")
    return None, None


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
    "BOBCAT": "Bobcat",
    "CATERPILLAR": "Caterpillar",
    "HAMM": "Hamm",
    "HINO": "Hino",
    "INDUSTRIA FIRME": "Industria Firme",
    "IVECO": "Iveco",
    "JOHN DEERE": "John Deere",
    "KAWASAKI": "Kawasaki",
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
    avisar(f"{etiqueta} sin traducir en el diccionario: {valor!r} -- se usa capitalización simple. "
           f"Conviene agregarlo a TRAD_{etiqueta.upper()} en este script.")
    return valor.strip().title()


def titulo(valor):
    return (valor or "").strip().title()


# ---------------------------------------------------------------------------
# 1) CONSULTA: exactamente la misma lógica ya validada en 03_generar_region.py,
#    devuelve los datos TAL COMO vienen de la base (mayúsculas, sin traducir).
# ---------------------------------------------------------------------------
# Clasificación de actividad "agua potable" vs el resto -- agregada 01/09/2026 a pedido de Franco
# ("desglosar la cantidad total de m3 entre material removido y agua potable"). No hay una columna
# de categoría en tb_em_intervencion (solo inte.descripcion, texto libre), así que se clasifica por
# palabra clave sobre esa descripción -- mismo criterio que ya se usa para flota (clasificarFlota en
# ayudaMemoria.js). Regex ancla el verbo (abastecimiento/distribución) cerca de "agua" para no
# confundir actividades de agua potable con menciones incidentales de "agua" en nombres de lugar
# (p.ej. distrito "Aguas Verdes") o de río ("aguas arriba/abajo de..."), que NO deben contar como
# agua potable. Un puñado de fichas de "mejoramiento de vías PARA distribución de agua" también
# matchean (la vía es un medio, pero el texto dice explícitamente que sirve para distribuir agua) --
# se cuentan como agua potable por seguir el texto literal; avisar a Franco si prefiere lo contrario.
_REGEX_AGUA_POTABLE = r"(abastecimiento|distribuci[oó]n)\s+([a-z]+\s+){0,4}agua"


def _consultar_ejecutadas_por_tipo(cur, departamento, periodo):
    """Devuelve (lista_por_tipo, total) para estado='EJECUTADA' en un
    departamento+periodo dados. Separado en función propia porque se llama
    dos veces: para el periodo actual y para el anterior (histórico cerrado,
    ver 'ejecutadasPorTipoAnioAnterior' en consultar_departamento)."""
    cur.execute("""
        SELECT inte.tipo,
               COUNT(*) AS cantidad,
               SUM(COALESCE(
                   (SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_vol, 0)) AS m3,
               SUM(CASE WHEN inte.descripcion ~* %s THEN COALESCE(
                   (SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_vol, 0) ELSE 0 END) AS m3_agua_potable,
               SUM(COALESCE(
                   (SELECT round(sum(av.avance_km), 3) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_km, 0)) AS km,
               SUM(COALESCE(inte.pob_beneficiada, 0)) AS poblacion,
               array_agg(DISTINCT inte.provincia ORDER BY inte.provincia) AS provincias
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado = 'EJECUTADA'
        GROUP BY inte.tipo
        ORDER BY inte.tipo;
    """, (_REGEX_AGUA_POTABLE, departamento, periodo))
    por_tipo = cur.fetchall()
    lista = [
        {"tipo": r["tipo"], "cantidad": r["cantidad"], "m3": round(num(r["m3"]), 2),
         "m3AguaPotable": round(num(r["m3_agua_potable"]), 2), "km": round(num(r["km"]), 2),
         "poblacion": entero(r["poblacion"]), "provincias": list(r["provincias"] or [])}
        for r in por_tipo
    ]
    total = {
        "cantidad": sum(r["cantidad"] for r in por_tipo),
        "m3": round(sum(num(r["m3"]) for r in por_tipo), 2),
        "m3AguaPotable": round(sum(num(r["m3_agua_potable"]) for r in por_tipo), 2),
        "km": round(sum(num(r["km"]) for r in por_tipo), 2),
        "poblacion": sum(entero(r["poblacion"]) for r in por_tipo),
    }
    return lista, total


def consultar_departamento(cur, departamento, periodo):
    resultado = {"departamento": departamento, "periodo": periodo}

    resultado["ejecutadasPorTipo"], resultado["ejecutadasTotal"] = _consultar_ejecutadas_por_tipo(cur, departamento, periodo)

    # Histórico del año anterior (periodo ya cerrado -- no cambia, pero se
    # trae en vivo de la misma tabla en vez de dejarlo fijo a mano, para que
    # la Ayuda Memoria pueda narrar "durante el <año-1>..." igual que hace
    # el MAIN). Si el departamento/periodo anterior no tiene filas, queda en
    # listas vacías (mismo criterio que una región sin datos todavía).
    anio_anterior = str(int(periodo) - 1) if periodo.isdigit() else None
    resultado["anioAnterior"] = anio_anterior
    if anio_anterior:
        resultado["ejecutadasPorTipoAnioAnterior"], resultado["ejecutadasTotalAnioAnterior"] = \
            _consultar_ejecutadas_por_tipo(cur, departamento, anio_anterior)
    else:
        resultado["ejecutadasPorTipoAnioAnterior"], resultado["ejecutadasTotalAnioAnterior"] = [], {"cantidad": 0, "m3": 0.0, "m3AguaPotable": 0.0, "km": 0.0, "poblacion": 0}

    cur.execute("""
        SELECT inte.provincia, inte.distrito, inte.tipo, inte.descripcion,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fin,
               COALESCE((SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion), 0) AS vol_acum,
               COALESCE((SELECT round(sum(av.avance_km), 3) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion), 0) AS km_acum,
               inte.pob_beneficiada
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado = 'EN EJECUCIÓN'
        ORDER BY inte.fecha_inicio;
    """, (departamento, periodo))
    resultado["enEjecucion"] = [
        {"provincia": r["provincia"], "distrito": r["distrito"], "tipo": r["tipo"], "descripcion": r["descripcion"],
         "inicio": r["inicio"], "fin": r["fin"], "volAcum": num(r["vol_acum"]), "kmAcum": num(r["km_acum"]),
         "poblacion": entero(r["pob_beneficiada"], None)}
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

    # Detalle por ficha de las programadas (a diferencia de "programadas" de
    # arriba, que está agregado por provincia/distrito para el widget de la
    # web). Este detalle es el que necesita la Ayuda Memoria (sector, ficha
    # técnica, descripción y fechas por intervención) -- agregado 28/08/2026.
    cur.execute("""
        SELECT inte.provincia, inte.distrito, inte.sector, inte.ficha_tec, inte.descripcion,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fecha_fin,
               inte.meta_vol, inte.meta_km, inte.pob_beneficiada
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s AND inte.estado ILIKE 'PROGRAMADA%%'
        ORDER BY inte.fecha_inicio;
    """, (departamento, periodo))
    resultado["programadasDetalle"] = [
        {"provincia": r["provincia"], "distrito": r["distrito"], "sector": r["sector"], "ficha": r["ficha_tec"],
         "descripcion": r["descripcion"], "fechaInicio": r["fecha_inicio"], "fechaFin": r["fecha_fin"],
         "metaVol": num(r["meta_vol"]), "metaKm": num(r["meta_km"]), "poblacion": entero(r["pob_beneficiada"], None)}
        for r in cur.fetchall()
    ]

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
          AND fcm.codigo NOT IN %s
          AND vme.cod_ubo = (
              SELECT id_dpto FROM pnc.lim_departamentos WHERE upper(nom_dpto) = %s
          )
        ORDER BY fcm.tipo_unidad, fcm.marca;
    """, (FLOTA_CODIGOS_ALQUILADOS, departamento))
    resultado["_flota_cruda"] = cur.fetchall()

    # ---------- 6) PUNTOS DEL MAPA (ejecutadas + en ejecución) ----------
    # Confirmado 25/08/2026: pnc.tb_em_intervencion tiene lat/long/sector/ficha_tec/
    # enlace_info_cierre directamente -- ya no depende del Excel del MAIN.
    #
    # 02/09/2026 -- OJO: esta consulta traía "AND inte.lat IS NOT NULL AND inte.long IS NOT
    # NULL", así que un registro con coordenada nula en la base ni siquiera llegaba a Python --
    # se perdía ACÁ, antes de que formatear_puntos_mapa() pudiera hacer nada. Es la causa real
    # del bug que reportó Franco (La Libertad: 3 "EJECUTADA" 2026 sin fila en el cuadro resumen
    # del Ayuda Memoria pese a existir en el MAIN). Se saca el filtro de coordenada: ahora se
    # traen TODAS las EJECUTADA/EN EJECUCIÓN del departamento/periodo, tengan o no lat/long, y es
    # formatear_puntos_mapa() (ver su comentario) el que decide qué hacer con las que no tienen
    # coordenada -- las mantiene para el cuadro/Anexo, sin pin en el mapa.
    cur.execute("""
        SELECT inte.id_intervencion, inte.lat, inte.long, inte.estado, inte.tipo,
               inte.provincia, inte.distrito, inte.sector, inte.descripcion,
               inte.ficha_tec,
               TO_CHAR(inte.fecha_inicio, 'DD/MM/YYYY') AS fecha_inicio,
               TO_CHAR(inte.fecha_fin, 'DD/MM/YYYY') AS fecha_fin,
               inte.pob_beneficiada,
               COALESCE(
                   (SELECT round(sum(av.avance_vol), 2) FROM pnc.fc_em_intervencion_avance av WHERE av.id_intervencion = inte.id_intervencion),
                   inte.meta_vol, 0
               ) AS volumen,
               inte.enlace_info_cierre
        FROM pnc.tb_em_intervencion inte
        WHERE upper(inte.departamento) = %s AND inte.periodo = %s
          AND inte.estado IN ('EJECUTADA', 'EN EJECUCIÓN')
        ORDER BY inte.fecha_inicio;
    """, (departamento, periodo))
    resultado["_puntos_mapa_crudo"] = cur.fetchall()

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

    def _fmt_por_tipo(lista):
        return [
            {
                "tipo": (e["tipo"] or "").strip().capitalize(),
                "cantidad": entero(e["cantidad"]),
                "m3": round(num(e["m3"]), 2),
                "km": (round(num(e["km"]), 2) or None) if num(e["km"]) == 0 else round(num(e["km"]), 2),
                "poblacion": entero(e["poblacion"]),
                "provincias": [titulo(p) for p in (e.get("provincias") or [])],
            }
            for e in lista
        ]

    r["ejecutadasPorTipo"] = _fmt_por_tipo(r["ejecutadasPorTipo"])
    if "ejecutadasPorTipoAnioAnterior" in r:
        r["ejecutadasPorTipoAnioAnterior"] = _fmt_por_tipo(r["ejecutadasPorTipoAnioAnterior"])

    r["enEjecucion"] = [
        {
            "provincia": titulo(e["provincia"]),
            "distrito": titulo(e["distrito"]),
            "tipo": (e["tipo"] or "").strip().capitalize(),
            "descripcion": e["descripcion"],
            "inicio": e["inicio"],
            "fin": e["fin"],
            "volAcum": num(e["volAcum"]),
            "kmAcum": num(e.get("kmAcum", 0)),
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

    if "programadasDetalle" in r:
        r["programadasDetalle"] = [
            {
                "provincia": titulo(p["provincia"]),
                "distrito": titulo(p["distrito"]),
                "sector": titulo(p["sector"]) if p["sector"] else "",
                "ficha": p["ficha"] or "",
                "descripcion": p["descripcion"] or "",
                "fechaInicio": p["fechaInicio"] or "",
                "fechaFin": p["fechaFin"] or "",
                "metaVol": round(num(p["metaVol"]), 2),
                "metaKm": round(num(p["metaKm"]), 2),
                "poblacion": p["poblacion"] if p["poblacion"] is not None else None,
            }
            for p in r["programadasDetalle"]
        ]

    if "_convenios_crudo" in r:
        total, vigentes = formatear_convenios(r.pop("_convenios_crudo"), hoy=hoy)
        r["conveniosCount"] = total
        r["conveniosVigentes"] = vigentes

    if "_flota_cruda" in r:
        flota, flota_total = formatear_flota(r.pop("_flota_cruda"), notas_viejas)
        r["flota"] = flota
        r["flotaTotal"] = flota_total

    if "_puntos_mapa_crudo" in r:
        r["puntosMapa"] = formatear_puntos_mapa(r.pop("_puntos_mapa_crudo"), r["departamento"])

    return r


def formatear_puntos_mapa(puntos_crudo, departamento):
    """Convierte las filas crudas de la sección 6) de consultar_departamento()
    (ejecutadas/en ejecución con lat/long) a la misma forma que ya usan los
    puntos cargados a mano en mapaIntervenciones.js. De paso valida/corrige
    cada coordenada contra su departamento (ver corregir_coordenada_punto).

    02/09/2026 -- ANTES, un punto cuya coordenada no se podía ubicar en
    ningún lugar razonable de Perú se excluía COMPLETO (con provincia,
    distrito, estado, ficha, etc. y todo), no solo su pin del mapa. Eso hacía
    que esos registros -- reales en el MAIN, solo sin coordenada usable --
    desaparecieran también de tablaResumenIntervenciones() en el Ayuda
    Memoria (caso detectado por Franco: La Libertad mostraba "3 en ejecución"
    en la narrativa pero 0 en el cuadro PROVINCIA/DISTRITO, porque a esas 3
    intervenciones les faltaba la coordenada y por eso mapaIntervenciones.js
    no las traía en absoluto). Ahora el punto SIEMPRE se agrega -- con "lat"/
    "lng" en null cuando la coordenada no se pudo resolver -- y son los
    consumidores que sí necesitan coordenada (el mapa, MapaIntervenciones.jsx)
    los que filtran esos puntos antes de dibujar pines/encuadrar el mapa. Los
    consumidores que solo necesitan provincia/distrito/estado (el cuadro
    resumen del Ayuda Memoria, el Anexo, el filtro por ámbito) ya no pierden
    estos registros."""
    puntos = []
    sin_coordenada = 0
    for p in puntos_crudo:
        id_i = entero(p["id_intervencion"])
        sector_orig = titulo(p["sector"])
        lat, lon = corregir_coordenada_punto(
            num(p["lat"], default=None), num(p["long"], default=None),
            departamento, id_intervencion=id_i, sector=sector_orig,
        )
        if lat is None or lon is None:
            sin_coordenada += 1
        puntos.append({
            "id": id_i,
            "lat": round(lat, 6) if lat is not None else None,
            "lng": round(lon, 6) if lon is not None else None,
            "estado": (p["estado"] or "").strip().capitalize(),
            "tipo": (p["tipo"] or "").strip().capitalize(),
            "provincia": titulo(p["provincia"]),
            "distrito": titulo(p["distrito"]),
            "sector": sector_orig,
            "descripcion": p["descripcion"] or "",
            "ficha": p["ficha_tec"] or "",
            "fechaInicio": p["fecha_inicio"] or "",
            "fechaFin": p["fecha_fin"] or "",
            "poblacion": entero(p["pob_beneficiada"]) if p["pob_beneficiada"] is not None else None,
            "volumen": num(p["volumen"]),
            "enlace": p["enlace_info_cierre"] if p["enlace_info_cierre"] else None,
        })
    if sin_coordenada:
        print(f"  [!] {sin_coordenada} punto(s) sin coordenada usable (ver avisos arriba) -- "
              f"se incluyen igual en mapaIntervenciones.js (provincia/distrito/estado), pero "
              f"sin pin en el mapa.")
    return puntos


# ---------------------------------------------------------------------------
# 3) EMISIÓN: convierte el dict formateado en el texto del archivo .js, con
#    el mismo estilo (comillas simples, un objeto por línea) que ya usan los
#    7 archivos _generated/*.js publicados.
# ---------------------------------------------------------------------------
def js_str(v):
    # OJO (28/08/2026): algunos campos de texto libre de la base (sobre todo
    # 'descripcion' de programadas/puntos criticos) vienen con saltos de
    # línea y tabulaciones pegados desde Word/Excel. Antes solo se escapaba
    # la barra invertida y la comilla simple -- un salto de línea o tab
    # crudo dentro de un string de un solo apóstrofe rompe la sintaxis de
    # JS ("Unterminated string"), lo que tumbó el build de Vite para
    # Tumbes, Lambayeque y Piura. Ahora se escapan también \r, \n, \t y los
    # separadores de línea/párrafo Unicode (U+2028/U+2029), que tampoco se
    # permiten crudos dentro de un string de JS.
    s = str(v).replace("\\", "\\\\").replace("'", "\\'")
    s = s.replace("\r\n", "\\n").replace("\r", "\\n").replace("\n", "\\n")
    s = s.replace("\t", "\\t").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
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

    def _emitir_por_tipo(lista):
        Le = []
        for e in lista:
            Le.append(
                f"    {{ tipo: {js_str(e['tipo'])}, cantidad: {js_num(e['cantidad'])}, m3: {js_num(e['m3'])}, km: {js_num(e['km'])}, "
                f"poblacion: {js_num(e['poblacion'])}, provincias: {js_list_str(e.get('provincias') or [])} }},"
            )
        return Le

    L.append("  ejecutadasPorTipo: [")
    L.extend(_emitir_por_tipo(r["ejecutadasPorTipo"]))
    L.append("  ],")
    et = r["ejecutadasTotal"]
    # m3AguaPotable (agregado 01/09/2026, ver _REGEX_AGUA_POTABLE): desglose del mismo total de m3,
    # no un dato nuevo aparte -- así que m3 (material removido) + m3AguaPotable siempre suma el
    # total de m3 que ya se mostraba antes. seccionNarrativa() en ayudaMemoria.js lo resta para
    # sacar el m3 de "material removido".
    L.append(
        f"  ejecutadasTotal: {{ cantidad: {js_num(et['cantidad'])}, m3: {js_num(et['m3'])}, "
        f"m3AguaPotable: {js_num(et.get('m3AguaPotable', 0))}, km: {js_num(et['km'])}, poblacion: {js_num(et['poblacion'])} }},"
    )
    L.append("")

    # Histórico del año anterior -- ver _consultar_ejecutadas_por_tipo(). Se
    # usa para narrar "durante el <año-1>..." en la Ayuda Memoria; el sitio
    # web no lo usa (por eso no está en programadasCols ni en ningún
    # componente todavía).
    L.append(f"  anioAnterior: {js_str(r['anioAnterior']) if r.get('anioAnterior') else 'null'},")
    L.append("  ejecutadasPorTipoAnioAnterior: [")
    L.extend(_emitir_por_tipo(r.get("ejecutadasPorTipoAnioAnterior") or []))
    L.append("  ],")
    eta = r.get("ejecutadasTotalAnioAnterior") or {"cantidad": 0, "m3": 0.0, "m3AguaPotable": 0.0, "km": 0.0, "poblacion": 0}
    L.append(
        f"  ejecutadasTotalAnioAnterior: {{ cantidad: {js_num(eta['cantidad'])}, m3: {js_num(eta['m3'])}, "
        f"m3AguaPotable: {js_num(eta.get('m3AguaPotable', 0))}, km: {js_num(eta['km'])}, poblacion: {js_num(eta['poblacion'])} }},"
    )
    L.append("")

    L.append("  enEjecucion: [")
    for e in r["enEjecucion"]:
        L.append(
            f"    {{ provincia: {js_str(e['provincia'])}, distrito: {js_str(e['distrito'])}, tipo: {js_str(e['tipo'])}, "
            f"descripcion: {js_str(e['descripcion'])}, inicio: {js_str(e['inicio'])}, fin: {js_str(e['fin'])}, "
            f"volAcum: {js_num(e['volAcum'])}, kmAcum: {js_num(e.get('kmAcum', 0))}, poblacion: {js_num(e['poblacion'])} }},"
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

    # Detalle por ficha de programadas -- lo usa la Ayuda Memoria (ver
    # src/lib/ayudaMemoria.js), no el widget "Programadas" de la web.
    L.append("  programadasDetalle: [")
    for p in r.get("programadasDetalle") or []:
        L.append(
            f"    {{ provincia: {js_str(p['provincia'])}, distrito: {js_str(p['distrito'])}, sector: {js_str(p['sector'])}, "
            f"ficha: {js_str(p['ficha'])}, descripcion: {js_str(p['descripcion'])}, fechaInicio: {js_str(p['fechaInicio'])}, "
            f"fechaFin: {js_str(p['fechaFin'])}, metaVol: {js_num(p['metaVol'])}, metaKm: {js_num(p['metaKm'])}, poblacion: {js_num(p['poblacion'])} }},"
        )
    L.append("  ],")
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
# 3b) EMISIÓN DE PUNTOS DEL MAPA: mapaIntervenciones.js usa un estilo distinto
#     (comillas dobles, un bloque multilínea por punto) al de los _generated/
#     *.js -- por eso van funciones de emisión aparte, calcadas del formato
#     real del archivo (confirmado con `sed`/`tail` antes de escribir esto).
# ---------------------------------------------------------------------------
def jstr(v):
    """String con comillas dobles al estilo mapaIntervenciones.js."""
    s = str(v).replace("\\", "\\\\").replace('"', '\\"').replace("\r", "").replace("\n", " ")
    return f'"{s}"'


def jcoord(v):
    """Número con hasta 6 decimales sin ceros de más (-3.5479, -75.202, 5928).
    None -> "null" (02/09/2026: caso de lat/lng sin coordenada usable, ver
    formatear_puntos_mapa)."""
    if v is None:
        return "null"
    v = round(float(v), 6)
    s = f"{v:.6f}".rstrip("0").rstrip(".")
    return s if s not in ("", "-") else "0"


def punto_mapa_js(p):
    """Un punto, en el formato exacto (4 espacios de indentación por campo,
    sin coma después del último) que ya usan los puntos existentes."""
    poblacion = str(entero(p["poblacion"])) if p["poblacion"] is not None else "null"
    enlace = jstr(p["enlace"]) if p["enlace"] else "null"
    campos = [
        f'"id": {entero(p["id"])}',
        f'"lat": {jcoord(p["lat"])}',
        f'"lng": {jcoord(p["lng"])}',
        f'"estado": {jstr(p["estado"])}',
        f'"tipo": {jstr(p["tipo"])}',
        f'"provincia": {jstr(p["provincia"])}',
        f'"distrito": {jstr(p["distrito"])}',
        f'"sector": {jstr(p["sector"])}',
        f'"descripcion": {jstr(p["descripcion"])}',
        f'"ficha": {jstr(p["ficha"])}',
        f'"fechaInicio": {jstr(p["fechaInicio"])}',
        f'"fechaFin": {jstr(p["fechaFin"])}',
        f'"poblacion": {poblacion}',
        f'"volumen": {jcoord(p["volumen"])}',
        f'"enlace": {enlace}',
    ]
    cuerpo = ",\n".join(f"    {c}" for c in campos)
    return "  {\n" + cuerpo + "\n  }"


def puntos_mapa_array_js(puntos):
    if not puntos:
        return "[\n]"
    bloques = ",\n".join(punto_mapa_js(p) for p in puntos)
    return "[\n" + bloques + "\n]"


def actualizar_mapa_intervenciones(ruta, region_key, puntos):
    """Reemplaza (o agrega, si la región es nueva) el bloque
    '<region_key>: [ ... ],' dentro de mapaIntervenciones.js sin tocar el
    resto del archivo (comentarios de cabecera, otras regiones, etc.).
    Devuelve 'actualizado' o 'agregado' para el mensaje en pantalla."""
    with open(ruta, "r", encoding="utf-8") as f:
        texto = f.read()

    clave_regex = re.compile(r'(?m)^\s*["\']?' + re.escape(region_key) + r'["\']?\s*:\s*\[')
    m = clave_regex.search(texto)

    array_nuevo = puntos_mapa_array_js(puntos)
    clave_txt = region_key if region_key.isidentifier() else f'"{region_key}"'

    if m:
        # Ya existe la clave -- ubicar el '[' de apertura y su ']' de cierre
        # correspondiente contando profundidad de corchetes, y reemplazar
        # solo ese tramo (se preserva la ',' y todo lo que sigue).
        inicio_array = m.end() - 1  # índice del '[' de apertura
        profundidad = 0
        i = inicio_array
        while i < len(texto):
            if texto[i] == "[":
                profundidad += 1
            elif texto[i] == "]":
                profundidad -= 1
                if profundidad == 0:
                    break
            i += 1
        if profundidad != 0:
            raise RuntimeError(f"No se pudo encontrar el ']' de cierre para '{region_key}' en {ruta}.")
        fin_array = i  # índice del ']' de cierre
        nuevo_texto = texto[:inicio_array] + array_nuevo + texto[fin_array + 1:]
        cambio = "actualizado"
    else:
        # Región nueva -- insertar una clave nueva justo antes del '}' final
        # del objeto (localizado por su cercanía con "export default ...").
        insercion_regex = re.compile(r"\}\s*\n\s*export default mapaIntervenciones")
        im = insercion_regex.search(texto)
        if not im:
            raise RuntimeError(
                f"No se pudo encontrar el cierre de mapaIntervenciones en {ruta} -- revísalo a mano."
            )
        pos_cierre = im.start()  # índice del '}' final del objeto
        bloque_nuevo = f"  {clave_txt}: {array_nuevo},\n"
        nuevo_texto = texto[:pos_cierre] + bloque_nuevo + texto[pos_cierre:]
        cambio = "agregado"

    with open(ruta, "w", encoding="utf-8") as f:
        f.write(nuevo_texto)

    return cambio


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


def escribir_reporte_incidencias(repo, periodo):
    """Escribe pipeline/logs/ULTIMO_REPORTE.txt con TODO lo que se avisó
    durante esta corrida (coordenadas corregidas/excluidas, tipo/marca sin
    traducir, etc.) -- se sobreescribe en cada corrida, así que siempre es
    "la corrida más reciente" sin tener que buscar cuál log es el último.
    Pensado para revisar rápido y tomar acción (reportarle a Producción), sin
    tener que leer el log completo de cada corrida."""
    ruta_pipeline = os.path.dirname(os.path.abspath(__file__))
    ruta_logs = os.path.join(ruta_pipeline, "logs")
    os.makedirs(ruta_logs, exist_ok=True)
    ruta_reporte = os.path.join(ruta_logs, "ULTIMO_REPORTE.txt")

    ahora = datetime.now().strftime("%d/%m/%Y %H:%M")
    L = [f"Reporte de la corrida del {ahora} -- periodo {periodo}", ""]
    if not INCIDENCIAS:
        L.append("Sin incidencias -- todo se generó sin avisos.")
    else:
        L.append(f"{len(INCIDENCIAS)} incidencia(s) -- revisar y reportar a Producción si corresponde:")
        L.append("")
        for i, msg in enumerate(INCIDENCIAS, 1):
            L.append(f"{i}. {msg}")

    with open(ruta_reporte, "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")

    if INCIDENCIAS:
        print(f"\n=== {len(INCIDENCIAS)} incidencia(s) esta corrida -- ver {ruta_reporte} ===")
    else:
        print(f"\n=== Sin incidencias esta corrida -- ver {ruta_reporte} ===")


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

    ruta_mapa = os.path.join(repo, "src", "data", "mapaIntervenciones.js")
    if not os.path.isfile(ruta_mapa):
        print(f"[!] No se encontró {ruta_mapa} -- se generarán los datos igual, pero no se podrá "
              f"actualizar el mapa de intervenciones.")
        ruta_mapa = None

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
              f"convenios={formateado['conveniosCount']}  flota={formateado['flotaTotal']}")
        archivos_escritos.append(ruta_destino)

        puntos_mapa = formateado.get("puntosMapa", [])
        if ruta_mapa:
            cambio = actualizar_mapa_intervenciones(ruta_mapa, slug, puntos_mapa)
            print(f"  OK -- mapaIntervenciones.js ({cambio}, {len(puntos_mapa)} punto(s) con coordenadas)")
            if ruta_mapa not in archivos_escritos:
                archivos_escritos.append(ruta_mapa)
        print()

    cur.close()
    conn.close()

    escribir_reporte_incidencias(repo, args.periodo)

    if args.git_commit or args.git_push:
        print("=== Git ===")
        rel = [os.path.relpath(p, repo) for p in archivos_escritos]
        correr_git(repo, ["add", *rel])
        mensaje = f"Actualiza datos de regiones ({args.periodo}) -- pipeline automático"
        hay_cambios = correr_git(repo, ["commit", "-m", mensaje])
        if args.git_push and hay_cambios:
            # Antes de subir, trae lo último de origin y reacomoda nuestro commit
            # encima (en vez de fusionarlo). Esto evita que el push falle si el
            # otro pipeline (Reporte Diario) subió cambios entre que empezamos y
            # terminamos esta corrida -- algo cada vez más probable ahora que
            # ambas tareas corren con solo 15-30 min de diferencia.
            if not correr_git(repo, ["pull", "--rebase", "--autostash"]):
                print("  [!] git pull --rebase falló -- no se intentará el push para no "
                      "dejar el repo en un estado inconsistente. Revisar a mano.")
            else:
                correr_git(repo, ["push"])
        elif args.git_push:
            print("  (nada que subir -- no hubo cambios en los datos)")

    print(f"=== Listo -- {len(archivos_escritos)} archivo(s) actualizado(s) ===")


if __name__ == '__main__':
    main()
