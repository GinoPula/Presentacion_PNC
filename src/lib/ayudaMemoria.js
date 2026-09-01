// Generador de la "Ayuda Memoria" (Word) por región, 100% en el navegador --
// no hay backend: todo sale de los mismos datos ya sincronizados por el
// pipeline (pipeline/generar_todas_regiones.py, cada 2h) que ya usa el resto
// de la web. Piloto agregado 28/08/2026, comparado contra el documento real
// del MAIN 'AM LA LIBERTAD 250826 v2 1.docx' -- ver comentarios en
// src/data/regions/la-libertad.js para qué partes son en vivo y cuáles
// todavía son estáticas (pendientes de un campo de la base que falta
// confirmar).
//
// Piezas del documento y su fuente:
//   - Membrete (imagen de cabecera institucional) y pie de página con N° de
//     página: en todas las hojas, igual que la plantilla real -- ver
//     crearEncabezado()/crearPie() más abajo.
//   - Antecedentes: texto fijo (igual en las 8 regiones, es el mismo texto
//     institucional que usa el MAIN).
//   - Narrativa de intervenciones (2025 / 2026 / en ejecución): estática por
//     ahora -- ver data.ayudaMemoriaNarrativa y su comentario en el archivo
//     de la región.
//   - Tabla de programadas: en vivo, data.programadasDetalle.
//   - Tabla de puntos críticos ANA: en vivo, data.puntosCriticos.
//   - Tabla de "todos los responsables" (reemplaza la imagen que pega el
//     MAIN al final): en vivo, data.todosResponsables / .todosResponsablesResumen.
//   - Flota + mantenimiento: en vivo, data.flota.
//   - Plan FEN 2026-2027: texto fijo (con el nombre de la región insertado).
//   - Escenarios (moderado/severo): en vivo, data.escenarios.
//
// Fidelidad visual con la plantilla real (agregado 28/08/2026, a pedido del
// usuario: "eso falta en las hojas y tambien el tipo de letra y todo
// conforme a la plantilla que te he enviado"): se extrajeron del XML crudo
// del .docx original (word/header1.xml, word/footer1.xml, styles.xml,
// document.xml) los siguientes datos concretos, que se replican abajo:
//   - Membrete: imagen word/media/image2.png del original (copiada a
//     src/assets/membrete-mvcs.png), 749x77px, flotante en el encabezado de
//     cada sección/página, misma posición relativa (margen/párrafo) y
//     tamaño que el original.
//   - Fuente base: Calibri en prácticamente todo el cuerpo (el docDefault
//     del original es Arial, pero cada run real está sobre-escrito a
//     Calibri -- replicamos eso, no el docDefault).
//   - Título principal: Calibri, negrita, color CC0000, 14pt, centrado.
//   - Encabezados de sección: Calibri, negrita, color C00000 (la mayoría);
//     "Principales Actividades." va en negro; "PLAN DE TRABAJO..." y
//     "ESCENARIOS IDENTIFICADOS..." van en Arial Narrow negro (así está en
//     el original -- es una inconsistencia real de la plantilla, no un
//     error nuestro).
//   - Tablas: encabezado con relleno negro + texto blanco (puntos críticos,
//     flota) salvo la tabla de "programadas", que en el original usa
//     relleno celeste (AED6F1) + texto negro.
//   - Márgenes de página y pie de página con N° de página alineado a la
//     derecha: iguales al original (ver construirAyudaMemoria()).
import {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  VerticalAlign, PageOrientation, ImageRun, Header, Footer, PageNumber,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
} from 'docx'
import membreteUrl from '../assets/membrete-mvcs.png'
import mapaIntervenciones from '../data/mapaIntervenciones'
import { conveniosCountGlobal } from '../data/global'

// ---------------------------------------------------------------------------
// Utilidades de formato
// ---------------------------------------------------------------------------
const fmtNum = (n, dec = 0) => {
  if (n === null || n === undefined) return '—'
  return Number(n).toLocaleString('es-PE', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}
const fmtSoles = (n) => `S/ ${fmtNum(n, 2)}`
const volquetadas = (m3) => Math.round(Number(m3 || 0) / 15)

function listaProvincias(arr) {
  if (!arr || !arr.length) return ''
  return arr.map((p) => p.toUpperCase()).join(', ')
}

// ---------------------------------------------------------------------------
// Ámbito (provincia/distrito) -- agregado 31/08/2026 a pedido de Franco: pidieron
// una Ayuda Memoria acotada a solo algunas provincias/distritos de un departamento
// (caso concreto: Puno -> provincias de Puno y Huancané, y solo el distrito de
// Juliaca dentro de la provincia de San Román), usando la misma plantilla. Ver
// construirAyudaMemoriaFiltrada() más abajo y AyudaMemoriaFiltroModal.jsx para la UI.
//
// 'seleccion' es un Map<provincia, 'todos' | Set<distrito>> -- 'todos' cuando el
// usuario marcó la provincia entera, un Set cuando acotó a distritos puntuales.
// ---------------------------------------------------------------------------

// Provincias/distritos disponibles para un departamento, calculado en vivo a
// partir de los mismos datos que ya alimentan el resto del documento
// (programadasDetalle y puntosCriticos son las únicas piezas con esa
// granularidad -- ver comentario grande al inicio del archivo).
export function obtenerAmbitoDisponible(data, regionId) {
  const mapa = new Map()
  const agregar = (arr) => {
    ;(arr || []).forEach((r) => {
      if (!r.provincia) return
      if (!mapa.has(r.provincia)) mapa.set(r.provincia, new Set())
      if (r.distrito) mapa.get(r.provincia).add(r.distrito)
    })
  }
  agregar(data.programadasDetalle)
  agregar(data.puntosCriticos)
  // Los puntos EJECUTADA/EN EJECUCIÓN de mapaIntervenciones.js (usado para el mapa) traen
  // provincia/distrito propios y a veces cubren lugares que programadasDetalle no tiene
  // (p.ej. Sandia en Puno) -- se suman acá para que también salgan como opción en el filtro.
  agregar(mapaIntervenciones[regionId])
  return [...mapa.entries()]
    .map(([provincia, distritos]) => ({ provincia, distritos: [...distritos].sort((a, b) => a.localeCompare(b, 'es')) }))
    .sort((a, b) => a.provincia.localeCompare(b.provincia, 'es'))
}

// Puntos EJECUTADA/EN EJECUCIÓN (mapaIntervenciones.js) que caen dentro del ámbito elegido --
// esta es la fuente que sí tiene provincia/distrito por punto (a diferencia de
// data.ejecutadasTotal/ejecutadasPorTipo, que solo traen el agregado departamental). Solo cubre
// las regiones que tienen entrada en mapaIntervenciones.js (las que alimentan el mapa); para las
// demás no hay manera honesta de desagregar ejecutadas por provincia/distrito todavía.
export function filtrarEjecutadasPorAmbito(regionId, seleccion) {
  const puntos = mapaIntervenciones[regionId]
  if (!puntos) return null // región sin datos de mapa -- distinto de "sin resultados"
  return filtrarPorAmbito(
    puntos.filter((p) => p.estado === 'Ejecutada' || p.estado === 'En ejecución'),
    seleccion
  )
}

export function filtrarPorAmbito(filas, seleccion) {
  if (!seleccion || !seleccion.size) return []
  return (filas || []).filter((f) => {
    const distritos = seleccion.get(f.provincia)
    if (!distritos) return false
    return distritos === 'todos' || distritos.has(f.distrito)
  })
}

function describirSeleccion(seleccion) {
  const partes = []
  for (const [provincia, distritos] of seleccion.entries()) {
    if (distritos === 'todos') partes.push(`provincia de ${provincia}`)
    else partes.push(`distrito${distritos.size > 1 ? 's' : ''} de ${[...distritos].sort((a, b) => a.localeCompare(b, 'es')).join(', ')} (provincia de ${provincia})`)
  }
  return partes.join('; ')
}

function seccionAlcance(seleccion, regionLabel) {
  return [
    titulo2('Ámbito del presente documento.'),
    parrafo(
      `El presente documento comprende únicamente el ámbito seleccionado dentro del departamento de ${regionLabel}: ${describirSeleccion(seleccion)}.`
    ),
  ]
}

// ---------------------------------------------------------------------------
// Estilos base -- extraídos del .docx real (ver comentario de cabecera)
// ---------------------------------------------------------------------------
const FONT = 'Calibri'
const COLOR_TITULO = 'CC0000' // título principal
const COLOR_SECCION = 'C00000' // encabezados de sección (la mayoría)
// Presupuesto Severo a nivel nacional (agregado 31/08/2026, a partir de la "Exposición de
// Motivos" del Decreto Supremo de Transferencia de Partidas FEN 2026-2027 que Franco envió --
// mismo documento que ya se usó para el desglose por UBO de data.escenarios en cada región, ver
// comentario junto a 'escenarios' en src/data/regions/tumbes.js). Es un monto ÚNICO a nivel
// nacional (la suma de la brecha solicitada al MEF para TODAS las UBO), por eso va como
// constante acá y no como campo por región -- aparece igual en la Ayuda Memoria de cualquier
// departamento que tenga Escenario Severo curado.
const PRESUPUESTO_NACIONAL_SEVERO = 21981975.0
// Presupuesto del Acuerdo Multisectorial a nivel nacional (agregado 01/09/2026, a partir del
// Excel que Franco envió -- "BASE_DATOS.xlsx", hoja "CONSOLIDADO SOLO MVCS 55": los 55 puntos
// críticos a cargo del MVCS a nivel nacional, columna "COSTO ESTIMADO MVCS" -- suma = 25,500,000
// exacto, lo que Franco confirmó como la cifra correcta ("el excel que ya tienes el último que es
// de los 25.5millones"). Igual que PRESUPUESTO_NACIONAL_SEVERO, es un monto ÚNICO a nivel
// nacional -- aparece igual en la 4.2 de cualquier departamento con puntos críticos curados.
const PRESUPUESTO_NACIONAL_MULTISECTORIAL = 25500000.0
// Presupuesto del Acuerdo Multisectorial POR REGIÓN (agregado 01/09/2026 -- a pedido de Franco:
// "debe ir el monto total y el de la región... de los puntos críticos de ANA... para que pongas el
// total"). Mismo Excel/hoja/columna que PRESUPUESTO_NACIONAL_MULTISECTORIAL ("BASE_DATOS.xlsx",
// hoja "CONSOLIDADO SOLO MVCS 55", columna "COSTO ESTIMADO MVCS"), pero agrupado por DEPARTAMENTO
// en vez de sumado a nivel nacional -- los 8 departamentos de esa hoja son exactamente los mismos 8
// que hoy tienen puntosCriticos curados (Ancash, Arequipa, Ica, La Libertad, Lambayeque, Lima,
// Piura, Tumbes), así que reemplaza el campo `presupuestoAcuerdoMultisectorial` que antes solo
// existía a mano en tumbes.js (S/380,893, de una fuente distinta) -- ahora las 8 regiones usan la
// misma fuente/metodología, en vez de un valor curado aparte por región. Los 8 montos suman
// exactamente PRESUPUESTO_NACIONAL_MULTISECTORIAL (con 1 céntimo de diferencia por redondeo a 2
// decimales en cada fila -- no se ajusta, es la fuente real).
const PRESUPUESTO_MULTISECTORIAL_POR_REGION = {
  ancash: 619164.68,
  arequipa: 14323364.13,
  ica: 4197199.59,
  'la-libertad': 1334361.53,
  lambayeque: 1144020.67,
  lima: 1055652.67,
  piura: 2058040.07,
  tumbes: 768196.67,
}
const HEADER_FILL = '000000' // relleno de encabezado de tabla (mayoría: puntos críticos, flota, etc.)
const HEADER_TEXT = 'FFFFFF'
const HEADER_FILL_PROGRAMADAS = 'AED6F1' // la tabla de "programadas" usa celeste, no negro
const HEADER_TEXT_PROGRAMADAS = '000000'
const CELL_FONT_SIZE = 17 // 8.5pt, en half-points -- tamaño por defecto de las tablas angostas
const PROGRAMADAS_FONT_SIZE = 12 // 6pt -- igual que la plantilla real: la tabla de "programadas" tiene 11 columnas y se queda toda en vertical (nunca apaisada), así que usa letra chica para que no se corten encabezados
const PAGE_WIDTH = 11909 // tamaño de página EXACTO de la plantilla real (no el A4 "de catálogo" 11906)
const PAGE_HEIGHT = 16834
// Todas las hojas van en vertical, igual que la plantilla real -- ver
// construirAyudaMemoria(). Las tablas anchas (programadas) usan letra chica
// en vez de una sección apaisada para entrar en el ancho útil de una hoja
// vertical.
const PORTRAIT_WIDTH = PAGE_WIDTH - 1133 - 1440 // ancho útil, con los márgenes reales (izq 1133 / der 1440 DXA)

// Membrete institucional (imagen real de la plantilla, ver src/assets/membrete-mvcs.png)
const MEMBRETE_WIDTH_PX = 580
const MEMBRETE_HEIGHT_PX = 61
const MEMBRETE_OFFSET_H_EMU = 461282
const MEMBRETE_OFFSET_V_EMU = -266403

// Ayuda para no repetir `font: FONT` en cada TextRun -- ver bug corregido
// más abajo en parrafo() sobre no volver a envolver un TextRun ya construido.
function run(props) {
  const base = typeof props === 'string' ? { text: props } : props
  return new TextRun({ font: FONT, ...base })
}

let _membreteBytesPromise = null
function cargarMembrete() {
  if (!_membreteBytesPromise) {
    _membreteBytesPromise = fetch(membreteUrl).then((r) => r.arrayBuffer())
  }
  return _membreteBytesPromise
}

function crearEncabezado(membreteBytes) {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            type: 'png',
            data: membreteBytes,
            transformation: { width: MEMBRETE_WIDTH_PX, height: MEMBRETE_HEIGHT_PX },
            floating: {
              horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.MARGIN,
                offset: MEMBRETE_OFFSET_H_EMU,
              },
              verticalPosition: {
                relative: VerticalPositionRelativeFrom.PARAGRAPH,
                offset: MEMBRETE_OFFSET_V_EMU,
              },
              wrap: { type: TextWrappingType.NONE },
            },
          }),
        ],
      }),
    ],
  })
}

function crearPie() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [run({ children: [PageNumber.CURRENT], size: 24 })],
      }),
    ],
  })
}

function celda(texto, { header = false, width, align = AlignmentType.LEFT, bold = false, fill = HEADER_FILL, textColor = HEADER_TEXT, fontSize = CELL_FONT_SIZE, colSpan } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    columnSpan: colSpan || undefined,
    shading: header ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          run({
            text: String(texto ?? ''),
            bold: header || bold,
            color: header ? textColor : undefined,
            size: fontSize,
          }),
        ],
      }),
    ],
  })
}

function tabla(columnas, filas, anchoTotal = PORTRAIT_WIDTH, estiloHeader = {}) {
  const { fill = HEADER_FILL, textColor = HEADER_TEXT, fontSize = CELL_FONT_SIZE } = estiloHeader
  const anchos = columnas.map((c) => Math.round(anchoTotal * (c.peso ?? 1 / columnas.length)))
  return new Table({
    width: { size: anchoTotal, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({
        tableHeader: true,
        children: columnas.map((c, i) => celda(c.titulo, { header: true, width: anchos[i], align: c.align, fill, textColor, fontSize })),
      }),
      ...filas.map(
        (fila) =>
          new TableRow({
            children: columnas.map((c, i) => celda(fila[c.clave], { width: anchos[i], align: c.align, fontSize })),
          })
      ),
    ],
  })
}

// Justificado ("both" en el XML real, w:jc val="both"): en la plantilla
// original CASI todos los párrafos van justificados -- encabezados de
// sección, cuerpo y viñetas por igual (solo el título principal, que se
// arma aparte en construirAyudaMemoria(), va centrado). Antes estos
// párrafos se quedaban alineados a la izquierda por defecto.
function titulo2(texto, { color = COLOR_SECCION, font = FONT, size } = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 300, after: 120 },
    children: [run({ text: texto, bold: true, font, color: color === null ? undefined : color, size })],
  })
}
function parrafo(runs, opts = {}) {
  // OJO: si 'r' ya es un TextRun (viene de un array mixto de strings +
  // TextRun con bold, como en seccionAntecedentes/parrafoActividad), NO hay
  // que volver a envolverlo en "new TextRun(r)" -- el constructor de TextRun
  // no sabe leer otra instancia de TextRun y el texto se pierde en silencio.
  const toRun = (r) => (r instanceof TextRun ? r : run(r))
  const children = Array.isArray(runs) ? runs.map(toRun) : [toRun(runs)]
  return new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 160 }, children, ...opts })
}
function bullet(texto) {
  return new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 60 }, children: [run(`•  ${texto}`)] })
}

// ---------------------------------------------------------------------------
// Antecedentes (fijo, igual en las 8 regiones)
// ---------------------------------------------------------------------------
// 01/09/2026 -- a pedido de Franco, se reescribió Antecedentes por segunda vez el mismo día para
// calzar con el texto final que envió (fusiona las dos primeras oraciones en un solo párrafo, saca
// la oración "Este pool de maquinaria está a disposición...", y agrega numerales (I)/(II)/(III)
// antes de PREVENCIÓN/URGENCIA/EMERGENCIA). Sigue siendo el mismo texto para las 25 regiones -- el
// propio párrafo lo dice ("a nivel nacional"), por eso lo único que cambia entre regiones es el
// número de Convenios, que sale de conveniosCountGlobal (suma en vivo de data.conveniosCount de
// las 25 regiones -- ver src/data/global.js).
function seccionAntecedentes(data, regionLabel, numAntecedentes, numActividades) {
  const p1 = (n) => (n != null ? `${n}. ` : '')
  return [
    titulo2(`${p1(numAntecedentes)}Antecedentes.`),
    parrafo(
      'El PNC-MAQUINARIAS del Programa Nuestras Ciudades (PNC) realiza trabajos de prevención y mitigación de riesgos a nivel nacional para proteger a las poblaciones más vulnerables del país, causadas por fenómenos naturales o climatológicos como huaicos, desbordes de ríos, sismos y terremotos.'
    ),
    parrafo(
      'En este marco, el PNC-MAQUINARIAS realiza intervenciones de (I) PREVENCIÓN (requiere Convenios de Colaboración Interinstitucional), (II) URGENCIA (requiere acuerdo de concejo) e intervenciones de (III) EMERGENCIA (requiere Decreto de emergencia PCM). Las intervenciones se realizan en zonas donde existen viviendas, para protección del equipamiento e infraestructura urbana.'
    ),
    parrafo(
      `Las intervenciones se realizan a nivel nacional a través de las 19 Unidades Básicas Operativas (UBO) ubicadas en los departamentos de Lima, Ayacucho, Cusco, Ancash, Ica, Arequipa, Tacna, Loreto, Tumbes, Lambayeque, La Libertad, Piura, Junín, Amazonas, San Martín, Cajamarca, Puno, Apurímac y Huánuco y, se cuenta con ${fmtNum(conveniosCountGlobal)} Convenios de Colaboración Interinstitucional vigentes con entidades de los tres niveles de gobierno a nivel nacional.`
    ),
    titulo2(`${p1(numActividades)}Principales Actividades.`, { color: null }),
    bullet('Limpieza y descolmatación de drenes, quebradas, canales y ríos y conformación de diques de protección, hasta garantizar la escorrentía y desfogue de las aguas.'),
    bullet('Limpieza de escombros por desastres y nivelación de terrenos para damnificados.'),
    bullet('Mejoramiento de la transitabilidad de calles y vías de acceso dentro de centros poblados urbanos y rurales.'),
    bullet('Abastecimiento y distribución de agua potable.'),
  ]
}

// ---------------------------------------------------------------------------
// Narrativa de intervenciones (estática por ahora -- ver cabecera del archivo)
// ---------------------------------------------------------------------------
function parrafoActividad(a) {
  return parrafo([
    run({ text: `${a.cantidad} intervenciones de ${a.actividad},`, bold: true }),
    ` en la provincia de ${listaProvincias(a.provincias)}, removiendo material sedimentado en el cauce como piedras, lodo y maleza en un total de ${fmtNum(a.m3)} m³, que equivale a ${fmtNum(a.volquetadas ?? volquetadas(a.m3))} volquetadas, en una longitud de ${fmtNum(a.km, a.km % 1 ? 3 : 0)} km, beneficiando a ${fmtNum(a.poblacion)} pobladores.`,
  ])
}

// Cuadro resumen PROVINCIA / DISTRITO / N° EJECUTADAS / N° EN EJECUCIÓN -- agregado 31/08/2026,
// reescrito 01/09/2026 a pedido de Franco ("en ese cuadro se le tiene que añadir distrito...
// programadas no van aquí"): vuelve a calzar con la plantilla real (solo EJECUTADAS/EN EJECUCIÓN,
// sin PROGRAMADAS, que se había agregado un día antes por pedido suyo y ahora se saca), y se
// agrega una columna DISTRITO junto a PROVINCIA. Sale de mapaIntervenciones.js (misma fuente que
// ya usa el mapa y el filtro por ámbito -- ver comentario grande junto a
// obtenerAmbitoDisponible()), que sí trae distrito por punto; solo tiene datos para las regiones
// con entrada ahí (tumbes, puno, tacna, piura, ancash, lambayeque, ica) -- para el resto se omite
// la tabla entera (return null) en vez de mostrar una tabla vacía o inventar un 0.
function tablaResumenIntervenciones(data, regionId) {
  const puntos = mapaIntervenciones[regionId]
  if (!puntos || !puntos.length) return null

  const porFila = new Map()
  const clave = (provincia, distrito) => `${provincia} ${distrito}`
  puntos.forEach((p) => {
    if (!p.provincia || !p.distrito) return
    const k = clave(p.provincia, p.distrito)
    if (!porFila.has(k)) porFila.set(k, { provincia: p.provincia, distrito: p.distrito, ejecutadas: 0, enEjecucion: 0 })
    const c = porFila.get(k)
    if (p.estado === 'Ejecutada') c.ejecutadas += 1
    else if (p.estado === 'En ejecución') c.enEjecucion += 1
  })
  const filasOrdenadas = [...porFila.values()].sort(
    (a, b) => a.provincia.localeCompare(b.provincia, 'es') || a.distrito.localeCompare(b.distrito, 'es')
  )
  if (!filasOrdenadas.length) return null
  const totales = filasOrdenadas.reduce(
    (acc, c) => {
      acc.ejecutadas += c.ejecutadas
      acc.enEjecucion += c.enEjecucion
      return acc
    },
    { ejecutadas: 0, enEjecucion: 0 }
  )

  const pesos = [0.3, 0.3, 0.2, 0.2]
  const anchos = pesos.map((p) => Math.round(PORTRAIT_WIDTH * p))
  const estilo = { fill: HEADER_FILL_PROGRAMADAS, textColor: HEADER_TEXT_PROGRAMADAS }
  const filas = filasOrdenadas.map((c) => {
    return new TableRow({
      children: [
        celda(c.provincia.toUpperCase(), { width: anchos[0] }),
        celda(c.distrito.toUpperCase(), { width: anchos[1] }),
        celda(c.ejecutadas || '', { width: anchos[2], align: AlignmentType.RIGHT }),
        celda(c.enEjecucion || '', { width: anchos[3], align: AlignmentType.RIGHT }),
      ],
    })
  })
  const filaTotal = new TableRow({
    children: [
      celda('Total general', { width: anchos[0], bold: true, colSpan: 2 }),
      celda(fmtNum(totales.ejecutadas), { width: anchos[2], align: AlignmentType.RIGHT, bold: true }),
      celda(fmtNum(totales.enEjecucion), { width: anchos[3], align: AlignmentType.RIGHT, bold: true }),
    ],
  })
  return new Table({
    width: { size: PORTRAIT_WIDTH, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          celda('PROVINCIA', { header: true, width: anchos[0], ...estilo }),
          celda('DISTRITO', { header: true, width: anchos[1], ...estilo }),
          celda('N° EJECUTADAS', { header: true, width: anchos[2], align: AlignmentType.RIGHT, ...estilo }),
          celda('N° EN EJECUCIÓN', { header: true, width: anchos[3], align: AlignmentType.RIGHT, ...estilo }),
        ],
      }),
      ...filas,
      filaTotal,
    ],
  })
}

// ---------------------------------------------------------------------------
// Desglose EN VIVO material removido / agua potable (agregado 01/09/2026 a pedido de Franco:
// "el término es Distribucion de agua para consumo humano... jales el dato real" -- no esperar a
// que se re-corra el pipeline, que ya trae et.m3AguaPotable pero requiere que Franco lo ejecute
// contra la BD por VPN (ver _REGEX_AGUA_POTABLE en generar_todas_regiones.py).
//
// Mientras tanto, se calcula el mismo desglose acá usando mapaIntervenciones.js (la misma fuente
// que ya alimenta tablaResumenIntervenciones/el mapa/el filtro por ámbito), clasificando la
// descripción de cada punto EJECUTADA con la misma regla que el pipeline
// (abastecimiento/distribución + agua, que cubre el término "Distribución de agua para consumo
// humano" que pidió Franco, y también "Abastecimiento de agua potable"/"...para consumo humano").
//
// Se usa SOLO cuando el total calculado desde mapaIntervenciones.js reconcilia EXACTO (misma
// cantidad y mismo m3, con margen de redondeo) con data.ejecutadasTotal -- si no reconcilia,
// mapaIntervenciones.js está incompleto para esa región frente a la BD (caso detectado en Áncash
// y La Libertad, a las que les faltan registros) y se prefiere no mostrar un desglose que no
// cuadraría con el total oficial, en vez de mostrar un número que parezca real pero esté mal.
// Regiones que sí reconcilian hoy: Tumbes, Puno, Tacna, Piura, Lambayeque, Ica.
// ---------------------------------------------------------------------------
const RE_AGUA_POTABLE = /(?:abastecimiento|distribuci[oó]n)\s+(?:\w+\s+){0,4}agua/i

// Compartida por calcularDesgloseAguaPotableEnVivo() y el Anexo "Detalle de Ejecución" (ver
// seccionAnexo más abajo): ambos necesitan saber si mapaIntervenciones.js es confiable para una
// región antes de mostrar algo calculado a partir de ella.
function mapaEjecutadasReconciliaConTotal(regionId, et) {
  if (!et) return false
  const puntos = mapaIntervenciones[regionId]
  if (!puntos || !puntos.length) return false
  const ejecutadas = puntos.filter((p) => p.estado === 'Ejecutada')
  const cantidad = ejecutadas.length
  const m3Total = ejecutadas.reduce((acc, p) => acc + Number(p.volumen || 0), 0)
  return cantidad === (et.cantidad || 0) && Math.abs(m3Total - (et.m3 || 0)) < 0.5
}

function calcularDesgloseAguaPotableEnVivo(regionId, et) {
  if (!mapaEjecutadasReconciliaConTotal(regionId, et)) return null
  const ejecutadas = mapaIntervenciones[regionId].filter((p) => p.estado === 'Ejecutada')
  const m3AguaPotable = ejecutadas
    .filter((p) => RE_AGUA_POTABLE.test(p.descripcion || ''))
    .reduce((acc, p) => acc + Number(p.volumen || 0), 0)
  return { m3AguaPotable: Math.round(m3AguaPotable * 100) / 100 }
}

// ---------------------------------------------------------------------------
// Cuadro resumen genérico PROVINCIA / DISTRITO / <conteo> -- agregado 01/09/2026 a pedido de
// Franco ("los cuadros resumen van a ir ahora resumidos así como el item 3... el cuadro detalle
// va en los anexos"): reemplaza, en el CUERPO del documento, a las tablas de detalle completo de
// 4.1 (Priorizadas) y 4.2 (Puntos Críticos ANA) -- que ahora van solo en el Anexo (ver
// seccionAnexo) -- por el mismo formato de 3 columnas que ya usa tablaResumenIntervenciones() en
// el punto 3.
// ---------------------------------------------------------------------------
function agruparConteoPorProvinciaDistrito(filas) {
  const porFila = new Map()
  ;(filas || []).forEach((f) => {
    if (!f.provincia || !f.distrito) return
    const k = `${f.provincia} ${f.distrito}`
    if (!porFila.has(k)) porFila.set(k, { provincia: f.provincia, distrito: f.distrito, cantidad: 0 })
    porFila.get(k).cantidad += 1
  })
  return [...porFila.values()].sort(
    (a, b) => a.provincia.localeCompare(b.provincia, 'es') || a.distrito.localeCompare(b.distrito, 'es')
  )
}

function tablaConteoProvinciaDistrito(filas, tituloColumna) {
  const agrupado = agruparConteoPorProvinciaDistrito(filas)
  if (!agrupado.length) return null
  const total = agrupado.reduce((acc, c) => acc + c.cantidad, 0)
  const pesos = [0.35, 0.35, 0.3]
  const anchos = pesos.map((p) => Math.round(PORTRAIT_WIDTH * p))
  const estilo = { fill: HEADER_FILL_PROGRAMADAS, textColor: HEADER_TEXT_PROGRAMADAS }
  const filas_ = agrupado.map(
    (c) =>
      new TableRow({
        children: [
          celda(c.provincia.toUpperCase(), { width: anchos[0] }),
          celda(c.distrito.toUpperCase(), { width: anchos[1] }),
          celda(fmtNum(c.cantidad), { width: anchos[2], align: AlignmentType.RIGHT }),
        ],
      })
  )
  const filaTotal = new TableRow({
    children: [
      celda('Total general', { width: anchos[0], bold: true, colSpan: 2 }),
      celda(fmtNum(total), { width: anchos[2], align: AlignmentType.RIGHT, bold: true }),
    ],
  })
  return new Table({
    width: { size: PORTRAIT_WIDTH, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          celda('PROVINCIA', { header: true, width: anchos[0], ...estilo }),
          celda('DISTRITO', { header: true, width: anchos[1], ...estilo }),
          celda(tituloColumna, { header: true, width: anchos[2], align: AlignmentType.RIGHT, ...estilo }),
        ],
      }),
      ...filas_,
      filaTotal,
    ],
  })
}

function seccionNarrativa(data, regionLabel, regionId, numero) {
  const n = data.ayudaMemoriaNarrativa
  const titulo = titulo2(`${numero != null ? numero + '. ' : ''}Intervenciones de PNC Maquinarias - ${regionLabel.toUpperCase()}`, { size: 24 })
  const resumen = tablaResumenIntervenciones(data, regionId)
  if (!n) {
    // Regiones sin narrativa curada a mano (todas menos La Libertad por ahora): se arma el mismo
    // párrafo que trae la plantilla real ("En el año X, a la fecha se han ejecutado N
    // intervenciones con un total de M m³... De estas intervenciones E ya han sido ejecutadas y
    // R está(n) en ejecución"), con los totales ya vivos del pipeline (data.ejecutadasTotal /
    // data.enEjecucion -- ver _generated/<region>.js), en vez de un resumen genérico de una sola
    // línea como antes.
    const et = data.ejecutadasTotal
    const enEj = data.enEjecucion?.length || 0
    const anio = (data.meta?.periodo || '').match(/\d{4}/)?.[0] || new Date().getFullYear()
    const out = [titulo]
    if (et) {
      const totalIntervenciones = (et.cantidad || 0) + enEj
      // 01/09/2026 -- a pedido de Franco: desglosar el total de m³ entre "material removido" y
      // "agua potable" (antes todo se mostraba junto como "material removido", aunque una parte de
      // esos m³ viene de intervenciones de abastecimiento/distribución de agua, no de limpieza).
      // et.m3AguaPotable es el campo del pipeline (ver _REGEX_AGUA_POTABLE en
      // generar_todas_regiones.py) -- solo está disponible en regiones ya regeneradas con esa
      // versión del pipeline, que Franco todavía no ha corrido. Mientras tanto se calcula el mismo
      // desglose EN VIVO desde mapaIntervenciones.js (ver calcularDesgloseAguaPotableEnVivo() más
      // arriba), que reconcilia con el total oficial en 6 de las 8 regiones con datos de mapa. Si
      // ninguna de las dos fuentes está disponible/confiable, se muestra el texto de siempre (sin
      // desglosar) en vez de inventar un reparto.
      const m3AguaPotable = et.m3AguaPotable ?? calcularDesgloseAguaPotableEnVivo(regionId, et)?.m3AguaPotable
      const tieneDesglose = m3AguaPotable != null
      const m3MaterialRemovido = tieneDesglose ? Math.max(0, (et.m3 || 0) - m3AguaPotable) : null
      const fraseM3 = tieneDesglose
        ? `${fmtNum(m3MaterialRemovido, 2)} m³ de material removido y ${fmtNum(m3AguaPotable, 2)} m³ de agua potable`
        : `${fmtNum(et.m3, 2)} m³ de material removido`
      out.push(
        parrafo(
          `En el año ${anio}, a la fecha se han ejecutado ${fmtNum(totalIntervenciones)} intervenciones con un total de ${fraseM3}, en beneficio de más de ${fmtNum(et.poblacion)} pobladores${et.km != null ? ` comprendido en ${fmtNum(et.km, 2)} km` : ''}. De estas intervenciones ${fmtNum(et.cantidad)} ya ${et.cantidad === 1 ? 'ha sido ejecutada' : 'han sido ejecutadas'} y ${fmtNum(enEj)} ${enEj === 1 ? 'está' : 'están'} en ejecución.`
        )
      )
      if (data.ejecutadasPorTipo?.length) {
        const partes = data.ejecutadasPorTipo
          .filter((t) => t.cantidad)
          .map((t) => `${fmtNum(t.cantidad)} a ${t.tipo}`)
        if (partes.length) {
          const ultima = partes.pop()
          out.push(parrafo(`De estas intervenciones, ${partes.length ? partes.join(', ') + ' y ' : ''}${ultima}.`))
        }
      }
    } else {
      out.push(
        parrafo(
          `Durante el ${data.periodoActual || data.meta?.periodo || 'periodo actual'}, el PNC Maquinarias en la región ${regionLabel} ha ejecutado ${fmtNum(data.ejecutadasTotal?.cantidad)} intervenciones.`
        )
      )
    }
    if (resumen) {
      // 01/09/2026 -- a pedido de Franco ("la palabra programadas no debe ir"): esta oración
      // introduce tablaResumenIntervenciones(), que desde el pedido anterior de Franco ya NO trae
      // columna de programadas (ver comentario junto a esa función) -- la oración se había quedado
      // desactualizada.
      out.push(parrafo('El cuadro resumen de ejecutadas y en ejecución es el siguiente:'))
      out.push(resumen)
    }
    return out
  }
  // 29/08/2026 -- a pedido de Franco (comentario de su jefe en reunión: esa narrativa del 2025
  // ya no debería ir): se deja de mostrar el bloque histórico 2025, aunque siga curado en el
  // archivo de la región (por si se quiere revertir). Se prueba así primero -- si se confirma,
  // el siguiente paso sería limpiar el bloque "2025" de los 8 archivos de región directamente.
  const ANIOS_OCULTOS = ['2025']
  const anios = Object.keys(n)
    .filter((k) => /^\d{4}$/.test(k) && !ANIOS_OCULTOS.includes(k))
    .sort()
  const out = [titulo]
  for (const anio of anios) {
    const bloque = n[anio]
    out.push(parrafo(`Durante el ${anio}, el PNC Maquinarias en la región ${regionLabel} ha ejecutado ${bloque.total} intervenciones.`))
    bloque.porActividad.forEach((a) => out.push(parrafoActividad(a)))
  }
  if (n.enEjecucion) {
    out.push(parrafo(`Asimismo, se vienen ejecutando ${n.enEjecucion.total} intervenciones.`))
    n.enEjecucion.porActividad.forEach((a) => out.push(parrafoActividad(a)))
  }
  if (resumen) {
    out.push(parrafo('El cuadro resumen de programadas, ejecutadas y en ejecución es el siguiente:'))
    out.push(resumen)
  }
  return out
}

// ---------------------------------------------------------------------------
// Tabla de programadas (en vivo) -- en el original va con encabezado celeste
// ---------------------------------------------------------------------------
function tablaProgramadas(programadasDetalle, regionLabel, { mostrarVacio = false } = {}) {
  const filas = (programadasDetalle || []).map((p) => ({
    depart: regionLabel.toUpperCase(),
    provincia: p.provincia?.toUpperCase(),
    distrito: p.distrito?.toUpperCase(),
    sector: p.sector?.toUpperCase(),
    ficha: p.ficha,
    descripcion: p.descripcion,
    fechaInicio: p.fechaInicio,
    fechaFin: p.fechaFin,
    metaVol: fmtNum(p.metaVol),
    metaKm: fmtNum(p.metaKm, 2),
    poblacion: fmtNum(p.poblacion),
  }))
  if (!filas.length) {
    // 'mostrarVacio' se usa en la Ayuda Memoria filtrada por ámbito: que no haya
    // programadas para el ámbito elegido es información real que hay que mostrar
    // (p.ej. "0 programadas en Juliaca"), no un motivo para omitir la sección.
    return mostrarVacio
      ? [parrafo('No se registran intervenciones programadas para el ámbito seleccionado.')]
      : []
  }
  return [
    parrafo(
      `En adición, se tiene ${filas.length} intervenciones programadas de acuerdo al siguiente detalle:`
    ),
    tabla(
      [
        { clave: 'depart', titulo: 'DEPART.', peso: 0.07 },
        { clave: 'provincia', titulo: 'PROV.', peso: 0.07 },
        { clave: 'distrito', titulo: 'DISTRITO', peso: 0.08 },
        { clave: 'sector', titulo: 'SECTOR', peso: 0.08 },
        { clave: 'ficha', titulo: 'FICHA TEC.', peso: 0.11 },
        { clave: 'descripcion', titulo: 'DESCRIPCIÓN', peso: 0.32 },
        { clave: 'fechaInicio', titulo: 'INICIO', peso: 0.07 },
        { clave: 'fechaFin', titulo: 'FIN', peso: 0.07 },
        { clave: 'metaVol', titulo: 'VOL', peso: 0.045, align: AlignmentType.RIGHT },
        { clave: 'metaKm', titulo: 'KM', peso: 0.04, align: AlignmentType.RIGHT },
        { clave: 'poblacion', titulo: 'POB', peso: 0.045, align: AlignmentType.RIGHT },
      ],
      filas,
      PORTRAIT_WIDTH,
      { fill: HEADER_FILL_PROGRAMADAS, textColor: HEADER_TEXT_PROGRAMADAS, fontSize: PROGRAMADAS_FONT_SIZE }
    ),
    parrafo(
      'Las fechas de inicio programadas están sujetas a variaciones por condiciones climáticas, gestiones administrativas, disponibilidad de recursos, situaciones de emergencia u otros factores imprevistos.'
    ),
  ]
}

// 01/09/2026 -- a pedido de Franco, mismo cambio que en 4.1 (ver seccionFEN): en el cuerpo va el
// resumen por provincia/distrito, no la tabla de detalle completo (que se movió al Anexo). Esta
// función solo se usa en regiones sin Plan FEN/Escenario Severo curado (Puno, Tacna, y las
// regiones nuevas), donde no hay una sección 4.1 aparte a la cual moverlo.
function seccionProgramadas(data, regionLabel) {
  const filas = data.programadasDetalle
  if (!filas?.length) return []
  const resumen = tablaConteoProvinciaDistrito(filas, 'N° PUNTOS CRÍTICOS PRIORIZADOS')
  if (!resumen) return []
  return [
    parrafo(`En adición, se tiene ${fmtNum(filas.length)} intervenciones programadas de acuerdo al siguiente detalle:`),
    resumen,
  ]
}

// ---------------------------------------------------------------------------
// Tabla de EJECUTADA / EN EJECUCIÓN por punto (mapaIntervenciones.js) -- usada solo en la Ayuda
// Memoria filtrada por ámbito, ver construirAyudaMemoriaFiltrada() y filtrarEjecutadasPorAmbito().
// ---------------------------------------------------------------------------
// 'intro' es personalizable porque esta tabla se usa en dos contextos con textos distintos: la
// Ayuda Memoria filtrada por ámbito (texto por defecto, "...en el ámbito seleccionado") y, desde
// 01/09/2026, el Anexo "Detalle de ejecución" del documento completo (ver seccionAnexo), donde no
// hay ámbito -- se le pasa un texto propio.
function tablaEjecutadas(puntos, { mostrarVacio = false, intro } = {}) {
  const filas = (puntos || []).map((p) => ({
    provincia: p.provincia?.toUpperCase(),
    distrito: p.distrito?.toUpperCase(),
    sector: p.sector?.toUpperCase() || '—',
    estado: (p.estado || '').toUpperCase(),
    ficha: p.ficha || '—',
    descripcion: (p.descripcion || '').trim().replace(/\s+/g, ' '),
    fechaInicio: p.fechaInicio || '—',
    fechaFin: p.fechaFin || '—',
    volumen: fmtNum(p.volumen),
    poblacion: fmtNum(p.poblacion),
  }))
  if (!filas.length) {
    return mostrarVacio
      ? [parrafo('No se registran intervenciones ejecutadas ni en ejecución para el ámbito seleccionado.')]
      : []
  }
  return [
    parrafo(intro || `Se registran ${filas.length} intervenciones ejecutadas o en ejecución en el ámbito seleccionado, de acuerdo al siguiente detalle:`),
    tabla(
      [
        { clave: 'provincia', titulo: 'PROV.', peso: 0.09 },
        { clave: 'distrito', titulo: 'DISTRITO', peso: 0.1 },
        { clave: 'sector', titulo: 'SECTOR', peso: 0.1 },
        { clave: 'estado', titulo: 'ESTADO', peso: 0.09 },
        { clave: 'ficha', titulo: 'FICHA', peso: 0.1 },
        { clave: 'descripcion', titulo: 'DESCRIPCIÓN', peso: 0.28 },
        { clave: 'fechaInicio', titulo: 'INICIO', peso: 0.07 },
        { clave: 'fechaFin', titulo: 'FIN', peso: 0.07 },
        { clave: 'volumen', titulo: 'VOL', peso: 0.05, align: AlignmentType.RIGHT },
        { clave: 'poblacion', titulo: 'POB', peso: 0.05, align: AlignmentType.RIGHT },
      ],
      filas,
      PORTRAIT_WIDTH,
      { fontSize: PROGRAMADAS_FONT_SIZE }
    ),
  ]
}

// ---------------------------------------------------------------------------
// Puntos críticos ANA (en vivo)
// ---------------------------------------------------------------------------
function tablaPuntosCriticos(pc, { mostrarVacio = false } = {}) {
  pc = pc || []
  if (!pc.length) {
    return mostrarVacio
      ? [parrafo('No se registran puntos críticos ANA para el ámbito seleccionado.')]
      : []
  }
  const filas = pc.map((p) => ({
    provincia: p.provincia,
    distrito: p.distrito,
    sector: p.sector || '—',
    ficha: p.fichaTecnica,
    actividad: p.descripcion,
    meta: fmtNum(p.metaKm, 3),
  }))
  return [
    parrafo(`Asimismo, el MVCS intervendrá (${pc.length}) puntos críticos ante el Fenómeno del Niño, de acuerdo a lo siguiente:`),
    tabla(
      [
        { clave: 'provincia', titulo: 'PROVINCIA', peso: 0.13 },
        { clave: 'distrito', titulo: 'DISTRITO', peso: 0.13 },
        { clave: 'sector', titulo: 'SECTOR', peso: 0.13 },
        { clave: 'ficha', titulo: 'CODIGO', peso: 0.21 },
        { clave: 'actividad', titulo: 'NOMBRE DE ACTIVIDAD', peso: 0.32 },
        { clave: 'meta', titulo: 'META', peso: 0.08, align: AlignmentType.RIGHT },
      ],
      filas
    ),
  ]
}

// Cuadro de "puntos críticos restantes" (PROVINCIA / DISTRITO / N° INTERVENCIÓN, con fila Total)
// -- agregado 31/08/2026: es el mismo cuadro que se completó a mano en el .docx de Tumbes con
// datos del Excel RANKING_710 (ver src/data/regions/tumbes.js, campo puntosCriticosRestantes).
// Solo se muestra si la región tiene ese campo curado.
function tablaPuntosCriticosRestantes(filas) {
  if (!filas?.length) return []
  const total = filas.reduce((acc, f) => acc + (f.cantidad || 0), 0)
  const pesos = [0.4, 0.4, 0.2]
  const anchos = pesos.map((p) => Math.round(PORTRAIT_WIDTH * p))
  const cuerpo = filas.map(
    (f) =>
      new TableRow({
        children: [
          celda(f.provincia?.toUpperCase(), { width: anchos[0] }),
          celda(f.distrito?.toUpperCase(), { width: anchos[1] }),
          celda(fmtNum(f.cantidad), { width: anchos[2], align: AlignmentType.RIGHT }),
        ],
      })
  )
  const filaTotal = new TableRow({
    children: [
      new TableCell({
        columnSpan: 2,
        width: { size: anchos[0] + anchos[1], type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 60, bottom: 60, left: 80, right: 80 },
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run({ text: 'Total', bold: true, size: CELL_FONT_SIZE })] })],
      }),
      celda(fmtNum(total), { width: anchos[2], align: AlignmentType.RIGHT, bold: true }),
    ],
  })
  return [
    parrafo(`Respecto a los ${fmtNum(total)} puntos críticos restantes, se detallan los distritos identificados en el siguiente cuadro:`),
    new Table({
      width: { size: PORTRAIT_WIDTH, type: WidthType.DXA },
      columnWidths: anchos,
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            celda('PROVINCIA', { header: true, width: anchos[0] }),
            celda('DISTRITO', { header: true, width: anchos[1] }),
            celda('N° INTERVENCIÓN', { header: true, width: anchos[2], align: AlignmentType.RIGHT }),
          ],
        }),
        ...cuerpo,
        filaTotal,
      ],
    }),
  ]
}

function seccionPuntosCriticos(data, regionLabel, numeroSeccion, regionId) {
  if (!data.puntosCriticos?.length) return []
  // 31/08/2026 -- la plantilla real trae esta tabla bajo un encabezado propio ("4.2 PUNTOS
  // CRÍTICOS IDENTIFICADOS POR ACUERDO MULTISECTORIAL") que antes no se mostraba acá; se agrega
  // junto con la numeración de la sección (heredada de seccionFEN -- ver construirAyudaMemoria()).
  const numero = numeroSeccion != null ? `${numeroSeccion}.2 ` : ''
  const out = [titulo2(`${numero}PUNTOS CRÍTICOS IDENTIFICADOS POR ACUERDO MULTISECTORIAL`)]
  // 01/09/2026 -- a pedido de Franco: en el cuerpo va solo el resumen por provincia/distrito
  // (mismo formato que el cuadro del punto 3); el detalle completo (sector, código, nombre de
  // actividad, meta) se movió al Anexo -- ver seccionAnexo() y tablaPuntosCriticos().
  out.push(parrafo(`Asimismo, el MVCS intervendrá ${fmtNum(data.puntosCriticos.length)} puntos críticos ante el Fenómeno del Niño, conforme el siguiente cuadro:`))
  const resumenANA = tablaConteoProvinciaDistrito(data.puntosCriticos, 'N° PUNTOS CRÍTICOS')
  if (resumenANA) out.push(resumenANA)
  // Presupuesto del Acuerdo Multisectorial -- 01/09/2026: se saca de PRESUPUESTO_MULTISECTORIAL_POR_REGION
  // (en vivo desde BASE_DATOS.xlsx, ver comentario junto a la constante) en vez de un campo curado a
  // mano por región; data.presupuestoAcuerdoMultisectorial queda como respaldo por si alguna región
  // nueva trae su propio monto curado antes de estar en esa tabla. Para las regiones sin ninguna de
  // las dos fuentes se omite la línea en vez de mostrar un monto sin verificar.
  const presupuestoRegion = PRESUPUESTO_MULTISECTORIAL_POR_REGION[regionId] ?? data.presupuestoAcuerdoMultisectorial
  if (regionLabel && presupuestoRegion != null) {
    out.push(
      parrafo([run({ text: `Presupuesto ${regionLabel}: `, bold: true }), run({ text: `${fmtSoles(presupuestoRegion)}.`, bold: true })])
    )
    // 01/09/2026 -- a pedido de Franco ("te falto poner"): la plantilla real trae esta segunda
    // línea también en la 4.2, igual que en la 4.1 (ver seccionFEN). El monto nacional
    // (PRESUPUESTO_NACIONAL_MULTISECTORIAL, S/25,500,000) se confirmó el mismo día con el Excel
    // "BASE_DATOS.xlsx" -- ver comentario junto a la constante.
    out.push(
      parrafo([
        run({
          text: `(Recursos solicitados al MEF, cuyo monto a nivel nacional equivale a ${fmtSoles(PRESUPUESTO_NACIONAL_MULTISECTORIAL)})`,
          bold: true,
        }),
      ])
    )
  }
  return out
}

// ---------------------------------------------------------------------------
// Todos los responsables (en vivo) -- reemplaza la imagen del MAIN. A pedido
// del usuario (28/08/2026), el detalle va como tabla dinámica agrupada por
// RESPONSABLE -> PROVINCIA -> DISTRITO con conteo, igual que la tabla
// dinámica de Excel que compartió como referencia -- no como listado plano.
// ---------------------------------------------------------------------------
function agruparPivotResponsables(tr) {
  const conteos = new Map()
  tr.forEach((r) => {
    const clave = `${r.responsable}${r.provincia}${r.distrito}`
    conteos.set(clave, (conteos.get(clave) || 0) + 1)
  })
  const combos = [...conteos.entries()].map(([clave, cantidad]) => {
    const [responsable, provincia, distrito] = clave.split('')
    return { responsable, provincia, distrito, cantidad }
  })
  combos.sort(
    (a, b) =>
      a.responsable.localeCompare(b.responsable, 'es') ||
      a.provincia.localeCompare(b.provincia, 'es') ||
      a.distrito.localeCompare(b.distrito, 'es')
  )
  return combos
}

function tablaPivotResponsables(combos, total) {
  const pesos = [0.28, 0.28, 0.28, 0.16]
  const anchos = pesos.map((p) => Math.round(PORTRAIT_WIDTH * p))
  const estilo = { fill: HEADER_FILL_PROGRAMADAS, textColor: HEADER_TEXT_PROGRAMADAS }

  let prevResp = null
  let prevProv = null
  const filas = combos.map((c) => {
    const nuevoResp = c.responsable !== prevResp
    const nuevoProv = nuevoResp || c.provincia !== prevProv
    prevResp = c.responsable
    prevProv = c.provincia
    return new TableRow({
      children: [
        celda(nuevoResp ? c.responsable.toUpperCase() : '', { width: anchos[0], bold: nuevoResp }),
        celda(nuevoProv ? c.provincia : '', { width: anchos[1], bold: nuevoProv }),
        celda(c.distrito, { width: anchos[2] }),
        celda(fmtNum(c.cantidad), { width: anchos[3], align: AlignmentType.RIGHT }),
      ],
    })
  })

  const filaTotal = new TableRow({
    children: [
      new TableCell({
        columnSpan: 3,
        width: { size: anchos[0] + anchos[1] + anchos[2], type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 60, bottom: 60, left: 80, right: 80 },
        children: [
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [run({ text: 'Total general', bold: true, size: CELL_FONT_SIZE })] }),
        ],
      }),
      celda(fmtNum(total), { width: anchos[3], align: AlignmentType.RIGHT, bold: true }),
    ],
  })

  return new Table({
    width: { size: PORTRAIT_WIDTH, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          celda('RESPONSABLE', { header: true, width: anchos[0], ...estilo }),
          celda('PROVINCIA', { header: true, width: anchos[1], ...estilo }),
          celda('DISTRITO', { header: true, width: anchos[2], ...estilo }),
          celda('CUENTA DE DISTRITO', { header: true, width: anchos[3], align: AlignmentType.RIGHT, ...estilo }),
        ],
      }),
      ...filas,
      filaTotal,
    ],
  })
}

function seccionTodosResponsables(data, regionLabel) {
  const tr = data.todosResponsables
  const resumen = data.todosResponsablesResumen
  if (!tr || !tr.length) return []
  const out = [
    titulo2('Acuerdos Puntos Críticos -- todos los responsables'),
    parrafo(
      `En la región ${regionLabel} se han identificado ${resumen?.total ?? tr.length} puntos críticos a cargo de los distintos responsables del Acuerdo Multisectorial (ANA, MIDAGRI, Defensa, MTC y MVCS -- Vivienda), de acuerdo al siguiente detalle:`
    ),
  ]
  if (resumen) {
    out.push(
      tabla(
        [
          { clave: 'ana', titulo: 'ANA', peso: 0.15, align: AlignmentType.RIGHT },
          { clave: 'midagri', titulo: 'MIDAGRI', peso: 0.18, align: AlignmentType.RIGHT },
          { clave: 'defensa', titulo: 'DEFENSA', peso: 0.17, align: AlignmentType.RIGHT },
          { clave: 'mtc', titulo: 'MTC', peso: 0.14, align: AlignmentType.RIGHT },
          { clave: 'mvcs', titulo: 'MVCS (VIVIENDA)', peso: 0.21, align: AlignmentType.RIGHT },
          { clave: 'total', titulo: 'TOTAL', peso: 0.15, align: AlignmentType.RIGHT },
        ],
        [
          {
            ana: fmtNum(resumen.ana),
            midagri: fmtNum(resumen.midagri),
            defensa: fmtNum(resumen.defensa),
            mtc: fmtNum(resumen.mtc),
            mvcs: fmtNum(resumen.mvcs),
            total: fmtNum(resumen.total),
          },
        ]
      )
    )
    out.push(new Paragraph({ spacing: { before: 160, after: 80 }, children: [] }))
  }
  out.push(parrafo('Detalle por responsable, provincia y distrito (cantidad de puntos críticos):'))
  out.push(tablaPivotResponsables(agruparPivotResponsables(tr), resumen?.total ?? tr.length))
  return out
}

// ---------------------------------------------------------------------------
// Flota y mantenimiento (en vivo)
// ---------------------------------------------------------------------------
// 01/09/2026 -- a pedido de Franco: la propia plantilla trae una nota junto a este cuadro
// ("Este cuadro debe ir clasificado por Tipo de Flota Maquinaria Pesada y Vehiculo pesado y las
// cantidades") que antes no se aplicaba -- la tabla salía como un solo listado plano. Clasificación
// por palabras clave del nombre del tipo de unidad (data.flota[].tipo, en vivo desde el pipeline):
// MAQUINARIA PESADA = equipo autopropulsado de movimiento de tierras (cargadores, excavadoras,
// motoniveladoras, retroexcavadoras, rodillos, tractores); VEHÍCULO PESADO = camiones y unidades de
// transporte sobre ruedas (camionetas, camiones cisterna/grúa/auxilio, plataformas, remolcadores,
// volquetes). Un tipo que no calce con ninguna de las dos palabras clave cae en "Otros" en vez de
// asignarse a una categoría al azar -- así no se pierde ni se clasifica mal ninguna unidad.
const MAQUINARIA_PESADA_RE = /cargador|excavadora|motoniveladora|retroexcavadora|rodillo|tractor|moto ?niveladora|compactador|grua torre/i
const VEHICULO_PESADO_RE = /cami[oó]n|camioneta|plataforma|remolcador|volquete|tr[aá]iler|b[uú]s|[oó]mnibus/i
function clasificarFlota(tipo) {
  const t = tipo || ''
  if (MAQUINARIA_PESADA_RE.test(t)) return 'Maquinaria Pesada'
  if (VEHICULO_PESADO_RE.test(t)) return 'Vehículo Pesado'
  return 'Otros'
}

// 01/09/2026 -- a pedido de Franco: la tabla de maquinarias queda solo con TIPO UNIDAD | CANTIDAD
// (antes también traía CÓDIGO, MARCA y ESTADO por unidad individual). Con eso ya no hace falta una
// fila por código -- una fila por tipo de unidad alcanza. Además, data.flota a veces trae más de
// una entrada con el mismo "tipo" (p.ej. distintas marcas del mismo VOLQUETE) -- antes cada una se
// distinguía por su columna MARCA/CÓDIGO, pero al quedar solo TIPO UNIDAD esas entradas se ven
// como una fila duplicada; se fusionan sumando la cantidad para que cada tipo aparezca una sola vez.
// 01/09/2026 -- a pedido de Franco ("más resumido el cuadro de Maquinarias, ajustarlo un poco
// más"): antes salían 2-3 tablas de Word separadas (una por grupo, cada una con su propio
// encabezado TIPO UNIDAD/CANTIDAD) más un título y un párrafo de subtotal entre medio. Se fusiona
// todo en UNA sola tabla: una fila-banner por grupo (fondo gris, en vez de un título de sección
// aparte) seguida de sus filas y una fila de subtotal en negrita -- mismos datos, con mucha menos
// repetición visual.
function tablaFlotaCombinada(grupos) {
  const pesos = [0.7, 0.3]
  const anchos = pesos.map((p) => Math.round(PORTRAIT_WIDTH * p))
  const estilo = { fill: HEADER_FILL, textColor: HEADER_TEXT }

  const filas = []
  for (const [nombreGrupo, items] of grupos) {
    const porTipo = new Map()
    items.forEach((f) => {
      const tipo = f.tipo.toUpperCase()
      porTipo.set(tipo, (porTipo.get(tipo) || 0) + f.cantidad)
    })
    filas.push(
      new TableRow({
        children: [
          celda(nombreGrupo, { header: true, width: PORTRAIT_WIDTH, colSpan: 2, fill: 'D9D9D9', textColor: '000000' }),
        ],
      })
    )
    let subtotal = 0
    for (const [tipo, cantidad] of porTipo) {
      subtotal += cantidad
      filas.push(
        new TableRow({
          children: [celda(tipo, { width: anchos[0] }), celda(fmtNum(cantidad), { width: anchos[1], align: AlignmentType.RIGHT })],
        })
      )
    }
    filas.push(
      new TableRow({
        children: [
          celda(`Subtotal ${nombreGrupo}`, { width: anchos[0], bold: true }),
          celda(fmtNum(subtotal), { width: anchos[1], align: AlignmentType.RIGHT, bold: true }),
        ],
      })
    )
  }

  return new Table({
    width: { size: PORTRAIT_WIDTH, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          celda('TIPO UNIDAD', { header: true, width: anchos[0], ...estilo }),
          celda('CANTIDAD', { header: true, width: anchos[1], align: AlignmentType.RIGHT, ...estilo }),
        ],
      }),
      ...filas,
    ],
  })
}

function seccionFlota(data, numeroSeccion) {
  const flota = data.flota || []
  if (!flota.length) return []
  // 31/08/2026: la plantilla real llama a esta sección "RELACIÓN DE ACTIVO Y PERSONAL" (antes acá
  // decía "MAQUINARIAS Y VEHÍCULOS DE LA UBO", que no aparece así en el documento original).
  const numero = numeroSeccion != null ? `${numeroSeccion}. ` : ''

  const grupos = new Map([
    ['Maquinaria Pesada', []],
    ['Vehículo Pesado', []],
    ['Otros', []],
  ])
  flota.forEach((f) => grupos.get(clasificarFlota(f.tipo)).push(f))
  const gruposConDatos = [...grupos].filter(([, items]) => items.length)

  const out = [titulo2(`${numero}RELACIÓN DE ACTIVO Y PERSONAL`)]
  out.push(tablaFlotaCombinada(gruposConDatos))
  out.push(parrafo([run({ text: `Total de la flota: ${fmtNum(data.flotaTotal ?? flota.reduce((a, f) => a + f.cantidad, 0))} unidades.`, bold: true })]))

  // 01/09/2026 -- a pedido de Franco ("quita Maquinarias y vehiculos en mantenimiento, no va"): se
  // quitó esta tabla (unidades inoperativas con su código/marca/observación). data.flota sigue
  // trayendo el campo 'nota' por unidad para quien lo necesite más adelante, pero ya no se muestra.
  return out
}

// ---------------------------------------------------------------------------
// Plan FEN (fijo, con el nombre de región insertado) + Escenarios (en vivo)
// ---------------------------------------------------------------------------
function seccionFEN(data, regionLabel, numeroSeccion) {
  // 31/08/2026 -- a pedido de Franco: en las regiones "normales" (sin puntos críticos ANA ni
  // Escenario Severo curados -- Puno, Tacna y las 15 regiones nuevas) esta sección entera debe
  // desaparecer (4 secciones en el documento), no solo la tabla de escenarios -- antes se seguía
  // mostrando el título y los 2 párrafos introductorios del Plan FEN aunque no hubiera escenarios
  // que mostrar. En las regiones que sí tienen ambos datos (Ancash, La Libertad, Lambayeque, Lima,
  // Piura, Tumbes) esta sección va completa, igual que antes (5 secciones).
  const esc = data.escenarios
  if (!esc || !esc.length) return []
  const numero = numeroSeccion != null ? `${numeroSeccion}. ` : ''
  const numeroSub = numeroSeccion != null ? `${numeroSeccion}.1 ` : ''
  // 01/09/2026 -- a pedido de Franco, se quitaron los 2 párrafos introductorios ("Con el fin de
  // afrontar el Fenómeno del Niño..." / "El contexto general de este plan de trabajo...") -- ya
  // no van en el documento, queda solo el título de la sección.
  const out = [
    // 31/08/2026: título corregido -- la plantilla real dice "PLAN DE INTERVENCIÓN ANTE EL ESTADO
    // DE ALERTA..." (antes acá decía "PLAN DE TRABAJO ANTE EL ESTADO..."). Se mantiene la
    // inconsistencia real de la plantilla (Arial Narrow, sin color rojo) para este encabezado.
    titulo2(`${numero}PLAN DE INTERVENCIÓN ANTE EL ESTADO DE ALERTA DEL FENÓMENO EL NIÑO 2026-2027`, { color: null, font: 'Arial Narrow' }),
  ]

  // 4.1 -- PUNTOS CRÍTICOS EN UN ESCENARIO SEVERO IDENTIFICADOS POR EL MVCS (31/08/2026: antes acá
  // solo iba una tabla de presupuesto genérica bajo "ESCENARIOS IDENTIFICADOS EN EL PLAN DE
  // TRABAJO", sin el detalle de puntos que trae la plantilla real). El listado de puntos
  // priorizados es la misma tabla de "programadas" (data.programadasDetalle, en vivo) que antes se
  // mostraba aparte en la sección de Intervenciones -- se mueve para acá porque es justamente el
  // listado que la plantilla real trae en el 4.1 ("va el cuadro con esas columnas", a pedido de
  // Franco). El cuadro de "puntos críticos restantes" es un campo curado a mano por región (ver
  // data.puntosCriticosRestantes en src/data/regions/tumbes.js), sacado del Excel RANKING_710.
  const severo = esc.find((e) => /severo|severa/i.test(e.condicion || ''))
  if (severo) {
    out.push(titulo2(`${numeroSub}PUNTOS CRÍTICOS EN UN ESCENARIO SEVERO IDENTIFICADOS POR EL MVCS`, { color: null, font: 'Arial Narrow' }))
    // 01/09/2026 -- texto exacto que envió Franco para este párrafo (antes decía "puntos de
    // intervención... priorizados según criterios..."). El número de priorizados sale de
    // data.programadasDetalle (en vivo) -- es el mismo "main de las programadas" que arma el
    // cuadro que va justo debajo.
    if (severo.intervenciones != null) {
      out.push(
        parrafo(
          `En el departamento de ${regionLabel} se han identificado ${fmtNum(severo.intervenciones)} puntos críticos ante un escenario severo del Fenómeno El Niño, de estos puntos se han priorizados ${fmtNum(data.programadasDetalle?.length ?? 0)}, sin ser limitativas, según los criterios de vulnerabilidad, recurrencia y población afectada, así como la participación de los gobiernos Regionales y Locales las siguientes intervenciones:`
        )
      )
    }
    // 01/09/2026 -- a pedido de Franco: en el cuerpo va solo el resumen por provincia/distrito
    // (mismo formato que el cuadro del punto 3); el detalle completo (ficha técnica, descripción,
    // fechas, vol/km/pob) se movió al Anexo -- ver seccionAnexo() y tablaProgramadas().
    const resumenPriorizadas = tablaConteoProvinciaDistrito(data.programadasDetalle, 'N° PUNTOS CRÍTICOS PRIORIZADOS')
    if (resumenPriorizadas) out.push(resumenPriorizadas)
    out.push(...tablaPuntosCriticosRestantes(data.puntosCriticosRestantes))
    out.push(
      parrafo([run({ text: `Presupuesto ${regionLabel}: `, bold: true }), run({ text: `${fmtSoles(severo.presupuesto)}.`, bold: true })])
    )
    out.push(
      parrafo([
        run({
          text: `(Recursos solicitados al MEF, cuyo monto a nivel nacional equivale a ${fmtSoles(PRESUPUESTO_NACIONAL_SEVERO)})`,
          bold: true,
        }),
      ])
    )
  }

  // Otros escenarios (p.ej. "Condiciones Moderadas"): 01/09/2026 -- a pedido de Franco ("este
  // cuadro no va"), se dejó de mostrar este bloque -- no forma parte de las 5 secciones de la
  // plantilla real (que solo trae el Escenario Severo en la 4.1). Se deja "esc"/"otros" filtrado
  // por si se necesita más adelante, pero ya no se renderiza nada de acá.
  return out
}

// ---------------------------------------------------------------------------
// ANEXO -- agregado 01/09/2026 a pedido de Franco ("el cuadro detalle va en los anexos"): reúne al
// final del documento las tablas de detalle completo que antes iban en el cuerpo (punto 3, 4.1 y
// 4.2) y que ahí se reemplazaron por el resumen provincia/distrito -- ver
// tablaConteoProvinciaDistrito(), seccionFEN() y seccionPuntosCriticos(). "Detalle de ejecución"
// (por punto, con ficha/descripción/fechas) sale de mapaIntervenciones.js -- solo confiable en las
// regiones donde reconcilia con el total oficial (ver mapaEjecutadasReconciliaConTotal()); en las
// demás se muestra una nota en vez de un cuadro vacío o con datos que no cuadran.
// ---------------------------------------------------------------------------
function seccionAnexo(data, regionLabel, regionId) {
  const hayEjecucion = mapaEjecutadasReconciliaConTotal(regionId, data.ejecutadasTotal)
  const hayPriorizadas = !!data.programadasDetalle?.length
  const hayPuntosCriticosANA = !!data.puntosCriticos?.length
  if (!hayEjecucion && !hayPriorizadas && !hayPuntosCriticosANA) return []

  const out = [titulo2('ANEXO')]

  out.push(titulo2('Detalle de ejecución', { color: null, size: 22 }))
  if (hayEjecucion) {
    const puntos = mapaIntervenciones[regionId].filter((p) => p.estado === 'Ejecutada' || p.estado === 'En ejecución')
    out.push(
      ...tablaEjecutadas(puntos, {
        intro: `Se registran ${fmtNum(puntos.length)} intervenciones ejecutadas o en ejecución, de acuerdo al siguiente detalle:`,
      })
    )
  } else {
    out.push(parrafo('Detalle de ejecución por punto no disponible aún para esta región.'))
  }

  if (hayPriorizadas) {
    out.push(titulo2('Priorizadas', { color: null, size: 22 }))
    out.push(...tablaProgramadas(data.programadasDetalle, regionLabel))
  }

  if (hayPuntosCriticosANA) {
    out.push(titulo2('Puntos críticos ANA', { color: null, size: 22 }))
    out.push(...tablaPuntosCriticos(data.puntosCriticos))
  }

  return out
}

// ---------------------------------------------------------------------------
// Ensamblado del documento
// ---------------------------------------------------------------------------
export async function construirAyudaMemoria(data, regionId) {
  const regionLabel = data.meta?.region?.replace(/^Región\s+/i, '') || regionId
  const hoy = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const membreteBytes = await cargarMembrete()

  // Un solo tipo de hoja, todo en vertical -- igual que la plantilla real
  // (que nunca usa páginas apaisadas; las tablas anchas como "programadas"
  // usan letra chica en vez de girar la hoja). Antes se armaba en dos
  // secciones (una vertical y una apaisada para las tablas más anchas), pero
  // el usuario pidió que todas las hojas queden en posición vertical.
  // Numeración de secciones (agregada 31/08/2026 para calzar con la plantilla real, que numera
  // 1. Antecedentes / 2. Actividades Principales / 3. Intervenciones / 4. Plan de Intervención
  // (con 4.1 Severo y 4.2 Acuerdo Multisectorial) / 5. Relación de Activo y Personal -- en las
  // regiones sin Escenario Severo ni puntos críticos ANA curados (Puno, Tacna, etc.) la sección 4
  // entera desaparece (ver seccionFEN) y "Relación de Activo y Personal" pasa a ser la 4, no la 5.
  const tienePlanFEN = !!(data.escenarios && data.escenarios.length)
  const numFlota = tienePlanFEN ? 5 : 4

  const contenido = [
    parrafo(run({ text: hoy, color: COLOR_SECCION, size: 26 }), { alignment: AlignmentType.RIGHT }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        run({ text: `PROGRAMA NUESTRAS CIUDADES: PNC MAQUINARIAS EN EL DEPARTAMENTO DE ${regionLabel.toUpperCase()}`, bold: true, color: COLOR_TITULO, size: 28 }),
      ],
    }),
    ...seccionAntecedentes(data, regionLabel, 1, 2),
    ...seccionNarrativa(data, regionLabel, regionId, 3),
    // El listado de "programadas" se muestra acá solo cuando no hay sección 4.1 (Plan FEN /
    // Escenario Severo) a la cual moverlo -- ver comentario grande en seccionFEN().
    ...(tienePlanFEN ? [] : seccionProgramadas(data, regionLabel)),
    ...seccionFEN(data, regionLabel, tienePlanFEN ? 4 : null),
    ...seccionPuntosCriticos(data, regionLabel, tienePlanFEN ? 4 : null, regionId),
    ...seccionFlota(data, numFlota),
    // 01/09/2026 -- a pedido de Franco ("esta parte no va"): se quitó "Acuerdos Puntos Críticos --
    // todos los responsables" (seccionTodosResponsables) del documento completo -- no es parte de
    // las 5 secciones de la plantilla real, era contenido extra que se había agregado antes. La
    // función se deja definida por si se necesita más adelante, pero ya no se llama acá.
    ...seccionAnexo(data, regionLabel, regionId),
  ]

  // Márgenes reales de la plantilla (asimétricos: izquierdo 1133, resto 1440;
  // distancia de encabezado/pie 720) -- ver comentario de cabecera del archivo.
  const margenPagina = { top: 1440, bottom: 1440, left: 1133, right: 1440, header: 720, footer: 720 }

  return new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } }, // 11pt por defecto
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_WIDTH, height: PAGE_HEIGHT, orientation: PageOrientation.PORTRAIT }, // tamaño real de la plantilla
            margin: margenPagina,
          },
        },
        headers: { default: crearEncabezado(membreteBytes) },
        footers: { default: crearPie() },
        children: contenido,
      },
    ],
  })
}

export async function descargarAyudaMemoria(data, regionId) {
  const doc = await construirAyudaMemoria(data, regionId)
  const blob = await Packer.toBlob(doc)
  const nombreRegion = (data.meta?.region || regionId).replace(/^Región\s+/i, '').replace(/\s+/g, '_')
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Ayuda_Memoria_${nombreRegion}_${fecha}.docx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

// ---------------------------------------------------------------------------
// Ayuda Memoria por ÁMBITO (provincia/distrito) -- agregado 31/08/2026 a pedido
// de Franco: "sacar una Ayuda memoria en la plataforma web de: Juliaca (distrito
// de la provincia de San Román), Huancané (provincia), Puno (provincia)". Misma
// plantilla visual que construirAyudaMemoria(), pero acotada a un subconjunto de
// provincias/distritos dentro de un departamento, y sin las secciones que no
// tienen esa granularidad (narrativa de ejecutadas, escenarios FEN, todos los
// responsables) -- ver comentario grande de obtenerAmbitoDisponible() más arriba
// sobre qué partes de los datos sí se pueden filtrar en vivo y cuáles no.
// ---------------------------------------------------------------------------
export async function construirAyudaMemoriaFiltrada(data, regionId, seleccion) {
  const regionLabel = data.meta?.region?.replace(/^Región\s+/i, '') || regionId
  const hoy = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const alcanceTexto = describirSeleccion(seleccion)

  const membreteBytes = await cargarMembrete()

  const filasProgramadas = filtrarPorAmbito(data.programadasDetalle, seleccion)
  const filasPuntosCriticos = filtrarPorAmbito(data.puntosCriticos, seleccion)
  const filasEjecutadas = filtrarEjecutadasPorAmbito(regionId, seleccion) // null = región sin mapaIntervenciones.js

  const contenido = [
    parrafo(run({ text: hoy, color: COLOR_SECCION, size: 26 }), { alignment: AlignmentType.RIGHT }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        run({ text: `PROGRAMA NUESTRAS CIUDADES: PNC MAQUINARIAS EN EL DEPARTAMENTO DE ${regionLabel.toUpperCase()}`, bold: true, color: COLOR_TITULO, size: 28 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [run({ text: `Ámbito: ${alcanceTexto}`, bold: true, color: COLOR_SECCION, size: 22 })],
    }),
    ...seccionAntecedentes(data, regionLabel),
    ...seccionAlcance(seleccion, regionLabel),
    ...titulo2Ejecutadas(regionLabel),
    ...(filasEjecutadas !== null
      ? tablaEjecutadas(filasEjecutadas, { mostrarVacio: true })
      : notaEjecutadasNoFiltrable(data, regionLabel)),
    ...tablaProgramadas(filasProgramadas, regionLabel, { mostrarVacio: true }),
    ...(data.puntosCriticos && data.puntosCriticos.length ? tablaPuntosCriticos(filasPuntosCriticos, { mostrarVacio: true }) : []),
    ...(data.flota && data.flota.length
      ? [
          parrafo(
            'La flota y capacidad operativa que se detalla a continuación corresponde a toda la Unidad Básica Operativa (UBO) del departamento; no se contabiliza de forma exclusiva para el ámbito seleccionado.'
          ),
          ...seccionFlota(data),
        ]
      : []),
  ]

  const margenPagina = { top: 1440, bottom: 1440, left: 1133, right: 1440, header: 720, footer: 720 }

  return new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_WIDTH, height: PAGE_HEIGHT, orientation: PageOrientation.PORTRAIT },
            margin: margenPagina,
          },
        },
        headers: { default: crearEncabezado(membreteBytes) },
        footers: { default: crearPie() },
        children: contenido,
      },
    ],
  })
}

function titulo2Ejecutadas(regionLabel) {
  return [titulo2(`Intervenciones ejecutadas y en ejecución en ${regionLabel} -- ámbito seleccionado.`, { size: 24 })]
}

// Solo se usa cuando la región no tiene entrada en mapaIntervenciones.js (ver
// filtrarEjecutadasPorAmbito) -- hoy eso es un puñado de las 25 regiones; para el resto sí hay
// datos reales por punto y se usa tablaEjecutadas() en su lugar.
function notaEjecutadasNoFiltrable(data, regionLabel) {
  if (!data.ejecutadasTotal) return []
  return [
    parrafo(
      `Nota: el registro de intervenciones EJECUTADAS de la fuente actual solo está disponible a nivel departamental (${regionLabel}), por lo que no es posible desagregarlo de forma confiable para el ámbito seleccionado; por ese motivo no se incluye en este documento.`
    ),
  ]
}

export async function descargarAyudaMemoriaFiltrada(data, regionId, seleccion) {
  const doc = await construirAyudaMemoriaFiltrada(data, regionId, seleccion)
  const blob = await Packer.toBlob(doc)
  const nombreRegion = (data.meta?.region || regionId).replace(/^Región\s+/i, '').replace(/\s+/g, '_')
  const alcanceSlug = [...seleccion.keys()].join('-').replace(/\s+/g, '_')
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Ayuda_Memoria_${nombreRegion}_${alcanceSlug}_${fecha}.docx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}
