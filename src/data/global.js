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

export const fuentesGlobal = [
  'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
  'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
  'Unidades Básicas Operativas (UBO) de las 8 regiones',
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
