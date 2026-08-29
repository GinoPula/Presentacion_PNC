// "Reporte Diario de Intervenciones" -- consulta de las intervenciones con ESTADO = "EN EJECUCIÓN"
// sobre el reporte nacional del MAIN (las 23 UBO/departamentos), igual al Excel que se le envía
// al Ministro. En el sitio se puede ver a nivel nacional (Vista General) o filtrado al
// departamento que esté seleccionado en ese momento, si ese departamento es una de las 8
// regiones que ya tenemos en el sitio.
import reporteDiarioData from '../data/reporteDiario.json'

const TIPO_ORDEN = ['PREVENCIÓN', 'URGENTE ATENCIÓN', 'EMERGENCIA']

export function getReporteDiario(regionId) {
  const { meta, items } = reporteDiarioData
  const filtrado = regionId ? items.filter((it) => it.regionId === regionId) : items

  // Renumerar para que el reporte filtrado también arranque en 1.
  const numerado = filtrado.map((it, i) => ({ ...it, n: i + 1 }))

  const porTipo = TIPO_ORDEN.reduce((acc, tipo) => {
    acc[tipo] = numerado.filter((it) => it.tipo === tipo).length
    return acc
  }, {})

  return {
    meta,
    items: numerado,
    total: numerado.length,
    porTipo,
  }
}

export function tipoTone(tipo) {
  if (tipo === 'EMERGENCIA') return 'critical'
  if (tipo === 'URGENTE ATENCIÓN') return 'amber'
  return 'brand-blue'
}
