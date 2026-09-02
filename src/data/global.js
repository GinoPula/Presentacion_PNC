// Datos agregados de la pestaña "Vista General" (Global) -- 28/08/2026.
//
// Todo lo de aquí se CALCULA en tiempo real a partir de src/data/regions/*.js (que a su vez
// vienen del pipeline `generar_todas_regiones.py`). No hay ningún número escrito a mano: si el
// pipeline actualiza una región, esta vista se actualiza sola en el próximo build.
//
// Presupuesto FEN: solo se suma sobre las regiones que efectivamente tienen `escenarios` (Áncash,
// La Libertad, Lambayeque, Piura, Tumbes). Ica, Puno y Tacna no tienen esta fuente todavía y
// quedan fuera del total -- no se inventa un valor para ellas.
//
// Presupuesto de "Programadas": el MAIN (columnas MONTO_*) no trae este dato para casi ninguna
// intervención programada de las 8 regiones (solo 11/160 filas, todas de Tacna) -- por eso NO se
// muestra un monto, solo la cantidad de intervenciones (que sí es un dato real y completo).

import { regions, REGION_LIST } from './regions'

const regionArr = REGION_LIST.map((r) => regions[r.id])

function sum(arr, pick) {
  return arr.reduce((acc, item) => acc + (pick(item) || 0), 0)
}

export const globalMeta = {
  region: 'Vista General',
  programa: 'Programa Nuestras Ciudades',
  seccion: 'Maquinarias',
  periodo: 'Agosto 2026',
}

export const ejecutadasTotalGlobal = {
  cantidad: sum(regionArr, (r) => r.ejecutadasTotal.cantidad),
  m3: sum(regionArr, (r) => r.ejecutadasTotal.m3),
  km: sum(regionArr, (r) => r.ejecutadasTotal.km),
  poblacion: sum(regionArr, (r) => r.ejecutadasTotal.poblacion),
}

export const conveniosCountGlobal = sum(regionArr, (r) => r.conveniosCount)

export const flotaTotalGlobal = sum(regionArr, (r) => r.flotaTotal)

export const programadasCantidadGlobal = sum(regionArr, (r) => r.programadasTotal?.cantidad)

// Ranking de regiones por intervenciones ejecutadas (mayor a menor) -- para el listado de barras.
export const regionEjecutadasRanking = REGION_LIST.map((r) => ({
  id: r.id,
  name: r.shortLabel,
  value: regions[r.id].ejecutadasTotal.cantidad,
})).sort((a, b) => b.value - a.value)

// Ranking de regiones por flota total (mayor a menor).
export const regionFlotaRanking = REGION_LIST.map((r) => ({
  id: r.id,
  name: r.shortLabel,
  value: regions[r.id].flotaTotal,
})).sort((a, b) => b.value - a.value)

// Regiones con y sin data de escenarios FEN, para el aviso en la sección de presupuesto.
export const regionesConEscenarios = REGION_LIST.filter((r) => regions[r.id].escenarios)
export const regionesSinEscenarios = REGION_LIST.filter((r) => !regions[r.id].escenarios)

// Suma de los escenarios FEN, por nombre de escenario, sobre las regiones que sí tienen la data.
export const escenariosGlobal = (() => {
  if (!regionesConEscenarios.length) return null
  const nombres = regions[regionesConEscenarios[0].id].escenarios.map((e) => e.nombre)
  return nombres.map((nombre) => {
    const filas = regionesConEscenarios
      .map((r) => regions[r.id].escenarios.find((e) => e.nombre === nombre))
      .filter(Boolean)
    return {
      nombre,
      condicion: filas[0]?.condicion ?? nombre,
      presupuesto: sum(filas, (e) => e.presupuesto),
      mantenimiento: sum(filas, (e) => e.mantenimiento),
      combustible: sum(filas, (e) => e.combustible),
      personal: sum(filas, (e) => e.personal),
    }
  })
})()

// Galería nacional: todas las fotos curadas de las 8 regiones, cada una etiquetada con su región.
export const galeriaGlobal = REGION_LIST.flatMap((r) => {
  const region = regions[r.id]
  return (region.galeria || []).map((g) => ({
    ...g,
    key: `${r.id}-${g.id}`,
    regionId: r.id,
    regionLabel: r.shortLabel,
  }))
})

// Resumen del Presupuesto FEN a nivel nacional (agregado 02/09/2026, a pedido de Franco: quería
// el bloque de "Puntos Críticos / Descolmatación / Longitud de Cauces / Impacto Social / Demanda
// MEF" + recuadro de "Programación Total Ago-Dic" + tabla por región, tal como una diapositiva
// que envió como referencia). Fuente final: tres Excel que Franco envió, de más a menos autoridad --
//   1) "Demandas 2026 FEN- Formato Cronograma Meta Fisica FINALV2_010926.xlsx" -- el documento
//      oficial de demanda presupuestal al MEF, 724 filas exactas. Trae "Monto Demanda Adicional
//      2026" y "Costo Unitario" (S/4.0395/m³ fijo en las 724 filas -- Monto = m³ × costo unitario,
//      la suma da EXACTO 21,981,975.00, cuadrando con PRESUPUESTO_NACIONAL_SEVERO que ya estaba en
//      src/lib/ayudaMemoria.js). Es la fuente de puntosCriticos, demandaMef, poblacionBeneficiada y
//      el desglose porRegion/otrasRegiones -- todo cuadra exacto contra el total de 724.
//      OJO: la columna "Población Beneficiaria" trae una fila (LIMA/LURIGANCHO) con 11,000,000 --
//      un error de tipeo evidente (ninguna intervención de descolmatación beneficia a 11 millones
//      de personas). Se excluye esa fila del total; sin ella la suma da 1,305,573 (≈1.3 millones,
//      cuadra con la diapositiva de referencia de Franco). Con la fila mal tipeada el total sería
//      12.3 millones. Vale la pena avisarle a Franco para que lo corrijan en el Excel original.
//      No trae columna de Km (todas las 724 filas están en unidad "M3"), por eso longitudKm sigue
//      viniendo de la fuente (2).
//   2) "programacion_no_fen.xlsx", hoja "FINAL" -- pivote por departamento de intervenciones
//      "Programadas" Ago-Dic 2026 (FEN y no-FEN); es la única de las tres fuentes que trae Km de
//      cauces (704.03), por eso longitudKm sale de acá. Su propio total de m³ (5,778,079) y de
//      población (1,366,971) son ligeramente distintos a la fuente (1) -- se usa la fuente (1) para
//      esos dos campos por ser el documento oficial de demanda al MEF, más autoritativo.
//   3) "RANKING_710_SEVERO_PROG_FINAL_PARA_724.xlsx" -- ranking de puntos críticos del escenario
//      FEN Severo, solo 7 departamentos, 710 filas (no llega a 724) -- se usó solo como referencia
//      inicial, ninguno de sus campos se usa en el resultado final.
export const presupuestoFenResumenGlobal = {
  fechaCorte: '01/09/2026',
  puntosCriticos: 724,
  regionesConPuntos: 19,
  materialM3: 5441741.79,
  longitudKm: 704.03,
  poblacionBeneficiada: 1305573,
  demandaMef: 21981975.0,
  porRegion: [
    { region: 'Lima', cantidad: 221 },
    { region: 'Piura', cantidad: 118 },
    { region: 'Ancash', cantidad: 104 },
    { region: 'Tumbes', cantidad: 75 },
    { region: 'La Libertad', cantidad: 62 },
    { region: 'Cajamarca', cantidad: 42 },
    { region: 'Lambayeque', cantidad: 33 },
  ],
  otrasRegiones: { cantidadRegiones: 12, cantidad: 69 },
  totalNacional: 724,
}

export const fuentesGlobal = [
  'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
  'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
  `Unidades Básicas Operativas (UBO) de las ${REGION_LIST.length} regiones`,
]

// Objeto con la misma forma (meta + fuentes) que usan los componentes compartidos (p. ej. Footer),
// para poder reutilizarlos sin modificarlos.
export const globalData = {
  id: 'global',
  label: 'Vista General',
  shortLabel: 'Global',
  meta: globalMeta,
  ejecutadasTotal: ejecutadasTotalGlobal,
  conveniosCount: conveniosCountGlobal,
  flotaTotal: flotaTotalGlobal,
  escenarios: escenariosGlobal,
  fuentes: fuentesGlobal,
}
