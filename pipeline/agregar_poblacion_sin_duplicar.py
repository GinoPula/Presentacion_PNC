"""
Agrega la columna "Poblacion Beneficiada sin duplicar" al Excel "Reporte de
intervenciones" que se descarga de MAIN (hoja "Reporte").

Por que existe este script
---------------------------
En varios distritos, la misma poblacion real se repite en el campo
POB_BENEFICIADA de varias fichas distintas (confirmado con Franco, nov 2026):
una ficha se desestima y se vuelve a crear, un proyecto grande se parte en
varias fichas, o simplemente se copia el mismo numero porque corresponde al
mismo lugar. Si se suma POB_BENEFICIADA tal cual viene del export, esa
poblacion se cuenta una vez por cada ficha en vez de una sola vez -- inflando
la cifra en la Ayuda Memoria y en los reportes del area Tecnica.

Alcance de esta primera version (a pedido explicito de Franco, 11/11/2026):
SOLO se aplica el filtro a los dos distritos donde el caso ya esta
confirmado y es grande -- el resto del pais se deja tal cual viene del
Excel, porque en Vivienda todavia va a demorar el analisis con el area
Tecnica para los demas distritos:

  - CAYMA        (AREQUIPA / AREQUIPA)  -- el mismo numero (8000) se repite
    en 11 fichas con sectores DISTINTOS -> la llave de duplicado NO puede
    ser "mismo sector", tiene que ser "mismo distrito + mismo valor exacto".
  - LURIGANCHO   (LIMA / LIMA) -- Franco se refiere a esta como "San Juan de
    Lurigancho"; en el export de MAIN el distrito aparece como "LURIGANCHO"
    (no existe un distrito "SAN JUAN DE LURIGANCHO" en esta data). El caso
    grande aca es "LA BOCATOMA DE LA PTAP HUACHIPA" con 2,500,000 repetido
    en 4 fichas (110,111,112,113-2026-LDP-LIM).

Regla de deduplicacion (confirmada con el caso real de Cayma)
---------------------------------------------------------------
Dentro de cada uno de los 2 distritos de arriba: se agrupan las filas por el
VALOR EXACTO de POB_BENEFICIADA (sin importar el sector -- ver Cayma arriba).
De cada grupo con mas de una fila, se queda con el valor real en UNA sola
fila y se pone 0 en las demas, para que cualquier suma posterior (Excel,
tabla dinamica, Ayuda Memoria) ya no cuente la misma poblacion mas de una
vez. Se prioriza dejar el valor real en una ficha que NO este DESESTIMADA
(para que no se vea rara una ficha EJECUTADA con "0" mientras una desestimada
se queda con el numero); si hay mas de una candidata, se usa la de menor
ID_INTERVENCION.

Filas fuera de estos 2 distritos: la columna nueva sale IGUAL a
POB_BENEFICIADA (no se toca nada), porque ese analisis nacional todavia esta
pendiente con el area Tecnica.

El Excel original NO se modifica -- este script escribe un archivo nuevo al
lado del original, con el sufijo "_sin_duplicar.xlsx", dejando todas las
columnas originales intactas mas la columna nueva.

Uso:
    python agregar_poblacion_sin_duplicar.py "ruta/al/inter_20261111101702.xlsx"
"""
import sys
import pandas as pd

# Distritos donde se aplica el filtro, y solo estos (departamento, provincia, distrito)
DISTRITOS_CON_FILTRO = [
    ("AREQUIPA", "AREQUIPA", "CAYMA"),
    ("LIMA", "LIMA", "LURIGANCHO"),  # la que Franco llama "San Juan de Lurigancho"
]

COL_NUEVA = "Poblacion Beneficiada sin duplicar"


def deduplicar_grupo(filas):
    """Recibe las filas (DataFrame) de UN distrito con filtro. Devuelve una
    Series alineada a su indice con el valor final de poblacion por fila:
    repetidos del mismo valor exacto -> 0, salvo una (preferir no-DESESTIMADA,
    luego menor ID_INTERVENCION)."""
    resultado = pd.Series(0.0, index=filas.index)
    con_valor = filas[filas["POB_BENEFICIADA"].notna()]
    for valor, grupo in con_valor.groupby("POB_BENEFICIADA"):
        orden = grupo.assign(
            _prio=(grupo["ESTADO"].astype(str).str.upper() == "DESESTIMADA").astype(int)
        ).sort_values(["_prio", "ID_INTERVENCION"])
        fila_que_se_queda = orden.index[0]
        resultado.loc[fila_que_se_queda] = valor
    # filas sin poblacion (NaN) quedan en NaN, no en 0
    resultado.loc[filas.index.difference(con_valor.index)] = pd.NA
    return resultado


def procesar(ruta_entrada):
    df = pd.read_excel(ruta_entrada, sheet_name="Reporte", engine="openpyxl")

    # Por defecto: columna nueva = columna original (no se toca nada fuera
    # de los distritos con filtro)
    df[COL_NUEVA] = df["POB_BENEFICIADA"]

    resumen = []
    for depto, prov, distrito in DISTRITOS_CON_FILTRO:
        mask = (
            (df["DEPARTAMENTO"] == depto)
            & (df["PROVINCIA"] == prov)
            & (df["DISTRITO"] == distrito)
        )
        if not mask.any():
            print(f"AVISO: no se encontraron filas para {depto}/{prov}/{distrito} en este archivo.")
            continue
        valores_dedup = deduplicar_grupo(df.loc[mask])
        df.loc[mask, COL_NUEVA] = valores_dedup

        bruta = df.loc[mask, "POB_BENEFICIADA"].sum()
        sin_dup = df.loc[mask, COL_NUEVA].sum()
        resumen.append((f"{distrito} ({prov}/{depto})", mask.sum(), bruta, sin_dup))

    # Reordenar: columna nueva justo despues de POB_BENEFICIADA
    cols = list(df.columns)
    cols.remove(COL_NUEVA)
    pos = cols.index("POB_BENEFICIADA") + 1
    cols = cols[:pos] + [COL_NUEVA] + cols[pos:]
    df = df[cols]

    print("\nResumen (solo distritos con filtro aplicado):")
    for nombre, n_filas, bruta, sin_dup in resumen:
        print(f"  {nombre}: {n_filas} fichas | bruta: {bruta:,.0f} | sin duplicar: {sin_dup:,.0f} | diferencia: {bruta - sin_dup:,.0f}")

    total_bruta = df["POB_BENEFICIADA"].sum()
    total_sin_dup = df[COL_NUEVA].sum()
    print(f"\nTotal nacional (este archivo): bruta {total_bruta:,.0f} | con el ajuste de estos 2 distritos: {total_sin_dup:,.0f}")

    return df


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python agregar_poblacion_sin_duplicar.py <ruta_al_excel_de_MAIN.xlsx>")
        sys.exit(1)
    ruta_entrada = sys.argv[1]
    df = procesar(ruta_entrada)
    ruta_salida = ruta_entrada.rsplit(".", 1)[0] + "_sin_duplicar.xlsx"
    df.to_excel(ruta_salida, sheet_name="Reporte", index=False, engine="openpyxl")
    print(f"\nListo. Archivo nuevo: {ruta_salida}")
