// Buscador general de intervenciones -- extensión del Reporte Diario (29/08/2026, pedido de
// Franco tras el caso "limpieza de drenes de Chiclayo" que el Ministro pidió con urgencia y que
// hubo que armar a mano). La idea: que ese mismo tipo de consulta se pueda hacer DESDE el sitio,
// con filtros + exportación, en vez de tener que pedirla en el chat cada vez.
//
// Combina TRES fuentes que hoy viven separadas, sin fabricar ni inventar ningún campo que falte:
//
//   1. "EN EJECUCIÓN" -- src/data/reporteDiario.json, la consulta EN VIVO a Producción
//      (pnc.tb_em_intervencion) que ya alimentaba el Reporte Diario. Trae marco legal y
//      maquinaria asignada (join con pnc.tb_em_intervencion_maquinaria), pero NO trae ficha
//      técnica, población ni volumen -- esos campos no forman parte de esa consulta.
//   2. "EJECUTADA" -- src/data/mapaIntervenciones.js (una entrada por región), ya con ficha,
//      fechas, población y volumen -- pero sin marco legal ni maquinaria (ese dato no se
//      guarda por intervención ejecutada, solo para las que están en curso).
//   3. "PROGRAMADA" -- el `programadasDetalle` de cada región (src/data/regions/_generated/
//      <slug>.js) -- ficha, fechas, población y meta de volumen, pero sin coordenadas (por
//      eso no aparecen en el mapa) ni marco legal/maquinaria (todavía no se les asigna).
//
// Cada fila resultante solo llena los campos que su fuente realmente tiene -- el resto queda
// `null` y la tabla/exportación lo muestra como "—", nunca relleno inventado.
import { REGION_LIST, regions } from '../data/regions'
import mapaIntervenciones from '../data/mapaIntervenciones'
import reporteDiarioData from '../data/reporteDiario.json'

export const ESTADOS = ['EN EJECUCIÓN', 'EJECUTADA', 'PROGRAMADA']
export const TIPOS = ['PREVENCIÓN', 'URGENTE ATENCIÓN', 'EMERGENCIA']

function normalizar(s) {
  return (s ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function regionLabelDe(regionId) {
  return REGION_LIST.find((r) => r.id === regionId)?.shortLabel ?? regionId
}

// --- 1) EN EJECUCIÓN (live, ya viene con regionId resuelto en el propio JSON) -----------------
const itemsEnEjecucion = (reporteDiarioData.items || []).map((it) => ({
  key: `vivo-${it.idIntervencion}`,
  estado: 'EN EJECUCIÓN',
  regionId: it.regionId || null,
  deptoLabel: it.deptoLabel,
  provincia: it.provincia,
  distrito: it.distrito,
  sector: it.sector || null,
  tipo: (it.tipo || '').toUpperCase() || null,
  marcoLegal: it.marcoLegal || null,
  descripcion: it.descripcion,
  fechaInicio: it.fechaInicio || null,
  fechaFin: it.fechaFin || null,
  poblacion: null,
  volumen: null,
  ficha: null,
  maquinaria: it.maquinaria || [],
}))

// --- 2) EJECUTADA (mapaIntervenciones.js -- estado 'Ejecutada' únicamente; 'En ejecución' de
// ese mismo archivo se descarta a propósito para no duplicar la fuente #1, que es la que se
// refresca en vivo cada 15-30 min y trae marco legal + maquinaria) ----------------------------
const itemsEjecutadas = REGION_LIST.flatMap((r) =>
  (mapaIntervenciones[r.id] || [])
    .filter((p) => p.estado === 'Ejecutada')
    .map((p) => ({
      key: `ejec-${r.id}-${p.id}`,
      estado: 'EJECUTADA',
      regionId: r.id,
      deptoLabel: r.shortLabel,
      provincia: p.provincia,
      distrito: p.distrito,
      sector: p.sector || null,
      tipo: (p.tipo || '').toUpperCase() || null,
      marcoLegal: null,
      descripcion: (p.descripcion || '').trim().replace(/\s+/g, ' '),
      fechaInicio: p.fechaInicio || null,
      fechaFin: p.fechaFin || null,
      poblacion: p.poblacion ?? null,
      volumen: p.volumen ?? null,
      ficha: p.ficha || null,
      maquinaria: [],
    })),
)

// --- 3) PROGRAMADA (programadasDetalle de cada región -- sin coordenadas, por eso no está en
// el mapa; tampoco tiene "tipo" en esta tabla, así que queda null en vez de adivinarlo) --------
const itemsProgramadas = REGION_LIST.flatMap((r) =>
  (regions[r.id]?.programadasDetalle || []).map((p, i) => ({
    key: `prog-${r.id}-${p.ficha || i}`,
    estado: 'PROGRAMADA',
    regionId: r.id,
    deptoLabel: r.shortLabel,
    provincia: p.provincia,
    distrito: p.distrito,
    sector: p.sector || null,
    tipo: null,
    marcoLegal: null,
    descripcion: (p.descripcion || '').trim().replace(/\s+/g, ' '),
    fechaInicio: p.fechaInicio || null,
    fechaFin: p.fechaFin || null,
    poblacion: p.poblacion ?? null,
    volumen: p.metaVol ?? null,
    ficha: p.ficha || null,
    maquinaria: [],
  })),
)

const TODAS = [...itemsEnEjecucion, ...itemsEjecutadas, ...itemsProgramadas]

/**
 * Filtra el universo combinado de intervenciones.
 * @param {object} opts
 * @param {string|null} opts.regionId - una región (slug) o null/undefined para todas.
 * @param {string[]} opts.estados - subconjunto de ESTADOS a incluir (vacío/undefined = todos).
 * @param {string[]} opts.tipos - subconjunto de TIPOS a incluir (vacío/undefined = todos).
 * @param {string} opts.q - texto libre: busca en descripción, sector, distrito, provincia y ficha.
 */
export function buscarIntervenciones({ regionId = null, estados = [], tipos = [], q = '' } = {}) {
  const qNorm = normalizar(q)
  const filtrado = TODAS.filter((it) => {
    if (regionId && it.regionId !== regionId) return false
    if (estados.length > 0 && !estados.includes(it.estado)) return false
    if (tipos.length > 0 && !tipos.includes(it.tipo)) return false
    if (qNorm) {
      const haystack = normalizar([it.descripcion, it.sector, it.distrito, it.provincia, it.ficha].filter(Boolean).join(' '))
      if (!haystack.includes(qNorm)) return false
    }
    return true
  })

  // Orden: por fecha de inicio (las que no tienen fecha, al final), luego por región/distrito.
  function fechaOrden(s) {
    if (!s) return Infinity
    const [d, m, y] = s.split('/').map(Number)
    return new Date(y, (m || 1) - 1, d || 1).getTime()
  }
  filtrado.sort((a, b) => fechaOrden(a.fechaInicio) - fechaOrden(b.fechaInicio) || a.deptoLabel.localeCompare(b.deptoLabel))

  const numerado = filtrado.map((it, i) => ({ ...it, n: i + 1 }))
  const porEstado = ESTADOS.reduce((acc, e) => ({ ...acc, [e]: numerado.filter((it) => it.estado === e).length }), {})

  // `meta` (fecha/hora de corte) viene de la única fuente que sí se refresca en vivo -- el
  // Reporte Diario de "EN EJECUCIÓN". Las otras dos fuentes (mapaIntervenciones, programadasDetalle)
  // no traen su propio corte, así que este es el dato de actualidad más reciente que hay.
  return { items: numerado, total: numerado.length, porEstado, meta: reporteDiarioData.meta }
}

export function estadoTono(estado) {
  if (estado === 'EJECUTADA') return 'series-3'
  if (estado === 'PROGRAMADA') return 'series-1'
  return 'brand' // EN EJECUCIÓN
}

export function tipoTone(tipo) {
  if (tipo === 'EMERGENCIA') return 'critical'
  if (tipo === 'URGENTE ATENCIÓN') return 'amber'
  if (tipo === 'PREVENCIÓN') return 'brand-blue'
  return 'mute'
}
