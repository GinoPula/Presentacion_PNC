// "Alertas de Fechas Vencidas" -- agregado 14/09/2026 a pedido de Franco: detecta intervenciones
// cuyo ESTADO en el MAIN quedó desactualizado frente a la fecha real (PROGRAMADA cuya
// fecha_inicio ya pasó, o EN EJECUCIÓN cuya fecha_fin ya pasó), sin margen de días -- ver el
// comentario grande junto a consultar_alertas_fechas_vencidas() en
// pipeline/generar_todas_regiones.py para el porqué y cómo se calcula.
//
// Uso interno: AlertasFechasModal.jsx pide usuario/clave antes de mostrar este detalle (Franco
// pidió explícitamente que esta información no quede a la vista de cualquiera, 14/09/2026).
import alertasFechasData from '../data/alertasFechas.json'

export function getAlertasFechas(regionId) {
  const { meta, items } = alertasFechasData
  const filtrado = regionId ? items.filter((it) => it.regionId === regionId) : items

  // Ya vienen ordenadas por días de atraso descendente desde el pipeline (dias_atraso DESC), pero
  // se reordena acá también por si el filtro por región cambia el orden relativo, y se renumera
  // para que la vista filtrada también arranque en 1.
  const ordenado = [...filtrado].sort((a, b) => (b.diasAtraso || 0) - (a.diasAtraso || 0))
  const numerado = ordenado.map((it, i) => ({ ...it, n: i + 1 }))

  const programadas = numerado.filter((it) => it.tipoAlerta === 'PROGRAMADA_ATRASADA').length
  const enEjecucion = numerado.filter((it) => it.tipoAlerta === 'EN_EJECUCION_ATRASADA').length
  const mayorAtraso = numerado.reduce((max, it) => Math.max(max, it.diasAtraso || 0), 0)

  return {
    meta,
    items: numerado,
    total: numerado.length,
    programadas,
    enEjecucion,
    mayorAtraso,
  }
}

export function tipoAlertaLabel(tipoAlerta) {
  return tipoAlerta === 'PROGRAMADA_ATRASADA' ? 'Programada sin iniciar' : 'En ejecución sin cerrar'
}

export function tipoAlertaTone(tipoAlerta) {
  return tipoAlerta === 'PROGRAMADA_ATRASADA' ? 'amber' : 'critical'
}
