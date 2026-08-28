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
// Estilos base -- extraídos del .docx real (ver comentario de cabecera)
// ---------------------------------------------------------------------------
const FONT = 'Calibri'
const COLOR_TITULO = 'CC0000' // título principal
const COLOR_SECCION = 'C00000' // encabezados de sección (la mayoría)
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

function celda(texto, { header = false, width, align = AlignmentType.LEFT, bold = false, fill = HEADER_FILL, textColor = HEADER_TEXT, fontSize = CELL_FONT_SIZE } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
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
function seccionAntecedentes() {
  return [
    titulo2('Antecedentes.'),
    parrafo([
      run({ text: 'PNC-MAQUINARIAS ', bold: true }),
      'del Programa Nuestras Ciudades realiza trabajos de prevención y mitigación de riesgos a nivel nacional para proteger a las poblaciones más vulnerables del país. Este pool de maquinaria está a disposición para realizar trabajos de prevención y atender emergencias causadas por fenómenos naturales o climatológicos como huaicos, desbordes de ríos, sismos y terremotos.',
    ]),
    parrafo([
      run({ text: 'PNC-MAQUINARIAS ', bold: true }),
      'realiza intervenciones de PREVENCIÓN, URGENCIA (intervenciones que se realizan por un acuerdo de concejo) e intervenciones de EMERGENCIA (requiere Decreto de Emergencia PCM). Las intervenciones se realizan en zonas donde existen viviendas, para protección de equipamiento e infraestructura urbana.',
    ]),
    titulo2('Principales Actividades.', { color: null }),
    bullet('Limpieza y descolmatación de drenes, quebradas, canales y ríos y conformación de diques de protección, hasta garantizar la escorrentía y desfogue de las aguas.'),
    bullet('Limpieza de escombros por desastres y nivelación de terrenos para damnificados.'),
    bullet('Mejoramiento de la transitabilidad de calles y vías de acceso dentro de centros poblados urbanos y rurales.'),
    bullet('Abastecimiento y distribución de agua potable.'),
    parrafo(
      'Las intervenciones del programa se realizan a solicitud de las autoridades distritales, provinciales y regionales, para lo cual se suscriben Convenios de Cooperación Interinstitucional, con el fin de salvaguardar la vida de la población ubicada en las zonas más vulnerables del Perú.'
    ),
    parrafo(
      'Actualmente, el PNC Maquinarias cuenta con 19 UBOs ubicadas en los departamentos de Lima, Ayacucho, Cusco, Ancash, Ica, Arequipa, Tacna, Loreto, Tumbes, Lambayeque, La Libertad, Piura, Junín, Amazonas, San Martín, Cajamarca, Puno, Apurímac y Huánuco.'
    ),
    parrafo([
      run({ text: 'Durante el año 2025, el MVCS a través del Programa Nuestras Ciudades ', bold: true }),
      run({ text: 'suscribió un total de 118 Convenios', bold: true }),
      ' de Colaboración Interinstitucional con entidades de los tres niveles de gobierno, para realizar labores de prevención a nivel nacional.',
    ]),
    parrafo([
      run({ text: 'A nivel nacional y durante el 2025, ', bold: true }),
      'el Ministerio de Vivienda realizó ',
      run({ text: '733', bold: true }),
      ' trabajos de limpieza y descolmatación, en cerca de ',
      run({ text: '536', bold: true }),
      ' kilómetros de ríos y quebradas a nivel nacional. Más de ',
      run({ text: '14,501,022', bold: true }),
      ' pobladores se beneficiaron con las labores que se realizaron en puntos críticos de las regiones de Lima, Piura, Puno, San Martín, Tacna, Tumbes, Amazonas, entre otras.',
    ]),
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

function seccionNarrativa(data, regionLabel) {
  const n = data.ayudaMemoriaNarrativa
  if (!n) {
    return [
      titulo2(`Intervenciones de PNC Maquinarias en la región ${regionLabel}.`, { size: 24 }),
      parrafo(
        `Durante el ${data.periodoActual || 'periodo actual'}, el PNC Maquinarias en la región ${regionLabel} ha ejecutado ${fmtNum(data.ejecutadasTotal?.cantidad)} intervenciones.`
      ),
    ]
  }
  const anios = Object.keys(n).filter((k) => /^\d{4}$/.test(k)).sort()
  const out = [titulo2(`Intervenciones de PNC Maquinarias en la región ${regionLabel}.`, { size: 24 })]
  for (const anio of anios) {
    const bloque = n[anio]
    out.push(parrafo(`Durante el ${anio}, el PNC Maquinarias en la región ${regionLabel} ha ejecutado ${bloque.total} intervenciones.`))
    bloque.porActividad.forEach((a) => out.push(parrafoActividad(a)))
  }
  if (n.enEjecucion) {
    out.push(parrafo(`Asimismo, se vienen ejecutando ${n.enEjecucion.total} intervenciones.`))
    n.enEjecucion.porActividad.forEach((a) => out.push(parrafoActividad(a)))
  }
  return out
}

// ---------------------------------------------------------------------------
// Tabla de programadas (en vivo) -- en el original va con encabezado celeste
// ---------------------------------------------------------------------------
function seccionProgramadas(data, regionLabel) {
  const filas = (data.programadasDetalle || []).map((p) => ({
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
  if (!filas.length) return []
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

// ---------------------------------------------------------------------------
// Puntos críticos ANA (en vivo)
// ---------------------------------------------------------------------------
function seccionPuntosCriticos(data) {
  const pc = data.puntosCriticos || []
  if (!pc.length) return []
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
      `En la región ${regionLabel} se han identificado ${resumen?.total ?? tr.length} puntos críticos a cargo de los distintos responsables del Acuerdo Multisectorial (ANA, ANA Contrata, Defensa, MTC y MVCS -- Vivienda), de acuerdo al siguiente detalle:`
    ),
  ]
  if (resumen) {
    out.push(
      tabla(
        [
          { clave: 'ana', titulo: 'ANA', peso: 0.13, align: AlignmentType.RIGHT },
          { clave: 'anaContrata', titulo: 'ANA CONTRATA', peso: 0.22, align: AlignmentType.RIGHT },
          { clave: 'defensa', titulo: 'DEFENSA', peso: 0.16, align: AlignmentType.RIGHT },
          { clave: 'mtc', titulo: 'MTC', peso: 0.13, align: AlignmentType.RIGHT },
          { clave: 'mvcs', titulo: 'MVCS (VIVIENDA)', peso: 0.22, align: AlignmentType.RIGHT },
          { clave: 'total', titulo: 'TOTAL', peso: 0.14, align: AlignmentType.RIGHT },
        ],
        [
          {
            ana: fmtNum(resumen.ana),
            anaContrata: fmtNum(resumen.anaContrata),
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
function seccionFlota(data) {
  const flota = data.flota || []
  if (!flota.length) return []
  const filasFlota = []
  flota.forEach((f) => {
    f.codigos.forEach((cod, i) => {
      filasFlota.push({
        tipo: i === 0 ? f.tipo.toUpperCase() : '',
        cantidad: i === 0 ? f.cantidad : '',
        codigo: cod,
        marca: f.marca.toUpperCase(),
        estado: f.estado.toUpperCase(),
      })
    })
  })
  const enMantenimiento = flota.filter((f) => f.estado === 'inoperativo' && f.nota)

  const out = [
    titulo2('MAQUINARIAS Y VEHÍCULOS DE LA UBO'),
    tabla(
      [
        { clave: 'tipo', titulo: 'TIPO UNIDAD', peso: 0.24 },
        { clave: 'cantidad', titulo: 'CANTIDAD', peso: 0.1, align: AlignmentType.RIGHT },
        { clave: 'codigo', titulo: 'CÓDIGO', peso: 0.2 },
        { clave: 'marca', titulo: 'MARCA', peso: 0.2 },
        { clave: 'estado', titulo: 'ESTADO', peso: 0.26 },
      ],
      filasFlota
    ),
    parrafo(`Total de la flota: ${fmtNum(data.flotaTotal ?? flota.reduce((a, f) => a + f.cantidad, 0))} unidades.`),
  ]

  if (enMantenimiento.length) {
    out.push(titulo2('MAQUINARIAS Y VEHÍCULOS EN MANTENIMIENTO'))
    out.push(
      tabla(
        [
          { clave: 'tipo', titulo: 'TIPO UNIDAD', peso: 0.2 },
          { clave: 'codigo', titulo: 'CÓDIGO', peso: 0.15 },
          { clave: 'marca', titulo: 'MARCA', peso: 0.15 },
          { clave: 'nota', titulo: 'ESTADO / OBSERVACIÓN', peso: 0.5 },
        ],
        enMantenimiento.flatMap((f) =>
          f.codigos.map((cod) => ({
            tipo: f.tipo.toUpperCase(),
            codigo: cod,
            marca: f.marca.toUpperCase(),
            nota: `INOPERATIVO -- ${f.nota}`,
          }))
        )
      )
    )
  }
  return out
}

// ---------------------------------------------------------------------------
// Plan FEN (fijo, con el nombre de región insertado) + Escenarios (en vivo)
// ---------------------------------------------------------------------------
function seccionFEN(data, regionLabel) {
  const out = [
    titulo2('PLAN DE TRABAJO ANTE EL ESTADO DE ALERTA DEL FENÓMENO DEL NIÑO 2026-2027', { color: null, font: 'Arial Narrow' }),
    parrafo(
      `Con el fin de afrontar el Fenómeno del Niño 2026-2027, se estableció un plan de trabajo como estrategia operativa del Programa Nuestras Ciudades – Maquinarias, para la ejecución de intervenciones preventivas orientadas a reducir la vulnerabilidad y el riesgo de afectación de la población e infraestructura expuesta a inundaciones, desbordes de ríos, activación de quebradas y otros peligros asociados al Fenómeno El Niño Costero 2026-2027 en la región ${regionLabel}, mediante la optimización de la capacidad operativa institucional, la priorización de puntos críticos y la articulación con los gobiernos regionales y locales.`
    ),
    parrafo(
      'El contexto general de este plan de trabajo son los comunicados oficiales de la Comisión Multisectorial Encargada del Estudio Nacional del Fenómeno El Niño (ENFEN), que mantiene el estado de "Alerta de El Niño Costero", estimando que dicho fenómeno se prolongue hasta el verano de 2027, con mayor probabilidad de magnitud fuerte entre junio y septiembre de 2026, disminuyendo a moderada hacia fin de año.'
    ),
  ]
  const esc = data.escenarios
  if (esc && esc.length) {
    out.push(titulo2('ESCENARIOS IDENTIFICADOS EN EL PLAN DE TRABAJO', { color: null, font: 'Arial Narrow' }))
    esc.forEach((e) => {
      out.push(
        parrafo([run({ text: `Escenario Operativo ${e.nombre}: ${e.condicion}`, bold: true })])
      )
      out.push(
        parrafo([
          run({ text: `Presupuesto ante el Escenario ${e.nombre}: `, bold: true }),
          run({ text: fmtSoles(e.presupuesto), bold: true }),
        ])
      )
      out.push(
        tabla(
          [
            { clave: 'departamento', titulo: 'DEPARTAMENTO', peso: 0.24 },
            { clave: 'mantenimiento', titulo: 'MANTENIMIENTO', peso: 0.22, align: AlignmentType.RIGHT },
            { clave: 'combustible', titulo: 'COMBUSTIBLE', peso: 0.22, align: AlignmentType.RIGHT },
            { clave: 'personal', titulo: 'PERSONAL', peso: 0.18, align: AlignmentType.RIGHT },
            { clave: 'intervenciones', titulo: 'N° INTERV.', peso: 0.14, align: AlignmentType.RIGHT },
          ],
          [
            {
              departamento: regionLabel.toUpperCase(),
              mantenimiento: fmtSoles(e.mantenimiento),
              combustible: fmtSoles(e.combustible),
              personal: fmtSoles(e.personal),
              intervenciones: e.intervenciones != null ? fmtNum(e.intervenciones) : '—',
            },
          ]
        )
      )
    })
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
  const contenido = [
    parrafo(run({ text: hoy, color: COLOR_SECCION, size: 26 }), { alignment: AlignmentType.RIGHT }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        run({ text: `PNC MAQUINARIAS EN EL DEPARTAMENTO DE ${regionLabel.toUpperCase()}`, bold: true, color: COLOR_TITULO, size: 28 }),
      ],
    }),
    ...seccionAntecedentes(),
    ...seccionNarrativa(data, regionLabel),
    ...seccionProgramadas(data, regionLabel),
    ...seccionPuntosCriticos(data),
    ...seccionFlota(data),
    ...seccionFEN(data, regionLabel),
    ...seccionTodosResponsables(data, regionLabel),
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
