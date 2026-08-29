// Exportación del Reporte Diario / Buscador de Intervenciones (Excel .xlsx y PDF).
//
// 29/08/2026 -- extendido para el Buscador de intervenciones (ver src/lib/buscadorIntervenciones.js):
// el mismo exportador ahora sirve tanto al Reporte Diario de siempre (ESTADO = "EN EJECUCIÓN") como
// a una búsqueda combinada (EN EJECUCIÓN + EJECUTADA + PROGRAMADA). Para que el reporte recurrente
// que ya recibe el Ministerio no cambie, las columnas EXTRA (Estado, Ficha, Población, Volumen) solo
// aparecen cuando el resultado realmente incluye intervenciones que no son "EN EJECUCIÓN" -- si el
// usuario no toca los filtros, el Excel/PDF sale exactamente igual que antes.
import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import reporteDiarioData from '../data/reporteDiario.json'

const COLOR_BRAND = 'E0293D' // rojo PNC
const COLOR_NAVY = '0C1220' // fondo oscuro del sitio
const COLOR_NAVY_SOFT = '121A2C'
const COLOR_BLUE = '2A78D6'
const COLOR_AMBER = 'F2A900'
const COLOR_GREEN = '1BAF7A'
const COLOR_WHITE = 'FFFFFF'
const COLOR_INK_DIM = '5B6479'

function esExtendido(items) {
  return items.some((it) => it.estado && it.estado !== 'EN EJECUCIÓN')
}

// El objeto `reporte` puede venir de dos fuentes distintas -- getReporteDiario() (trae `porTipo`)
// o buscarIntervenciones() (trae `porEstado`, no `porTipo`) -- así que el conteo por tipo se
// recalcula siempre aquí mismo a partir de `items`, sin asumir qué trae `reporte`.
const TIPOS_KPI = ['PREVENCIÓN', 'URGENTE ATENCIÓN', 'EMERGENCIA']
function porTipoDe(items) {
  return TIPOS_KPI.reduce((acc, t) => ({ ...acc, [t]: items.filter((it) => it.tipo === t).length }), {})
}

function metaDe(reporte) {
  return reporte.meta || reporteDiarioData.meta
}

function tituloAlcance(scopeLabel) {
  return scopeLabel ? `Consolidado Regional · ${scopeLabel}` : 'Consolidado Nacional de Operaciones y Despliegue de Maquinaria en Campo'
}

function nombreArchivo(prefix, scopeLabel) {
  const fecha = new Date().toISOString().slice(0, 10)
  const alcance = scopeLabel ? scopeLabel.toLowerCase().replace(/\s+/g, '-') : 'nacional'
  return `${prefix}_${alcance}_${fecha}`
}

// ---------------------------------------------------------------------------------------------
// Excel
// ---------------------------------------------------------------------------------------------
export async function exportarReporteDiarioExcel(reporte, scopeLabel) {
  const { items, total, porEstado } = reporte
  const porTipo = porTipoDe(items)
  const meta = metaDe(reporte)
  const extendido = esExtendido(items)

  const wb = new ExcelJS.Workbook()
  wb.creator = 'PNC Maquinarias'
  wb.created = new Date()

  const ws = wb.addWorksheet('Reporte Diario', {
    views: [{ showGridLines: false }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 },
  })

  const COLS = extendido
    ? [
        { header: 'N°', key: 'n', width: 6 },
        { header: 'Estado', key: 'estado', width: 14 },
        { header: 'Departamento', key: 'departamento', width: 16 },
        { header: 'Provincia', key: 'provincia', width: 16 },
        { header: 'Distrito', key: 'distrito', width: 16 },
        { header: 'Sector', key: 'sector', width: 16 },
        { header: 'Tipo', key: 'tipo', width: 16 },
        { header: 'Descripción de la intervención', key: 'descripcion', width: 50 },
        { header: 'Ficha', key: 'ficha', width: 12 },
        { header: 'Marco legal', key: 'marcoLegal', width: 22 },
        { header: 'Fecha inicio', key: 'fechaInicio', width: 12 },
        { header: 'Fecha fin', key: 'fechaFin', width: 12 },
        { header: 'Población', key: 'poblacion', width: 12 },
        { header: 'Volumen (m³ / km)', key: 'volumen', width: 16 },
        { header: 'Equipo / maquinaria desplegada', key: 'maquinaria', width: 40 },
      ]
    : [
        { header: 'N°', key: 'n', width: 6 },
        { header: 'Departamento', key: 'departamento', width: 16 },
        { header: 'Provincia', key: 'provincia', width: 16 },
        { header: 'Distrito', key: 'distrito', width: 16 },
        { header: 'Tipo', key: 'tipo', width: 16 },
        { header: 'Descripción de la intervención', key: 'descripcion', width: 60 },
        { header: 'Marco legal', key: 'marcoLegal', width: 26 },
        { header: 'Fecha inicio', key: 'fechaInicio', width: 12 },
        { header: 'Fecha fin', key: 'fechaFin', width: 12 },
        { header: 'Equipo / maquinaria desplegada', key: 'maquinaria', width: 46 },
      ]
  ws.columns = COLS
  // Repite el encabezado de la tabla (fila 9, ver más abajo) en cada página al imprimir/exportar.
  ws.pageSetup.printTitlesRow = '9:9'

  // --- Encabezado ejecutivo ---------------------------------------------------------------
  ws.mergeCells(1, 1, 1, COLS.length)
  ws.getCell(1, 1).value = 'PROGRAMA NUESTRAS CIUDADES — PNC MAQUINARIAS'
  ws.getCell(1, 1).font = { color: { argb: 'FF' + COLOR_BRAND }, bold: true, size: 10 }
  ws.getRow(1).height = 20

  ws.mergeCells(2, 1, 2, COLS.length)
  const titleCell = ws.getCell(2, 1)
  titleCell.value = extendido ? 'Resultados de Búsqueda de Intervenciones' : 'Reporte Ejecutivo de Intervenciones en Ejecución'
  titleCell.font = { bold: true, size: 18, color: { argb: 'FF' + COLOR_NAVY } }
  ws.getRow(2).height = 28

  ws.mergeCells(3, 1, 3, COLS.length)
  const subCell = ws.getCell(3, 1)
  subCell.value = tituloAlcance(scopeLabel)
  subCell.font = { italic: true, size: 11, color: { argb: 'FF' + COLOR_INK_DIM } }
  ws.getRow(3).height = 18

  ws.mergeCells(4, 1, 4, COLS.length)
  ws.getCell(4, 1).value = `Corte: ${meta.fechaCorte}  ·  ${meta.horaCorte} hrs`
  ws.getCell(4, 1).font = { size: 10, color: { argb: 'FF' + COLOR_INK_DIM } }
  ws.getRow(5).height = 6

  // --- Tarjetas KPI (fila 6) --------------------------------------------------------------
  const kpiRow = 6
  const kpis = extendido
    ? [
        { label: 'Resultados encontrados', value: total, color: COLOR_NAVY },
        { label: 'En ejecución', value: porEstado?.['EN EJECUCIÓN'] || 0, color: COLOR_BRAND },
        { label: 'Ejecutadas', value: porEstado?.['EJECUTADA'] || 0, color: COLOR_GREEN },
        { label: 'Programadas', value: porEstado?.['PROGRAMADA'] || 0, color: COLOR_BLUE },
      ]
    : [
        { label: 'Intervenciones activas', value: total, color: COLOR_BRAND },
        { label: 'Prevención y limpieza', value: porTipo['PREVENCIÓN'] || 0, color: COLOR_BLUE },
        { label: 'Urgente atención', value: porTipo['URGENTE ATENCIÓN'] || 0, color: COLOR_AMBER },
        { label: 'Declaradas emergencia', value: porTipo['EMERGENCIA'] || 0, color: COLOR_BRAND },
      ]
  const span = Math.max(2, Math.floor(COLS.length / kpis.length))
  kpis.forEach((kpi, i) => {
    const startCol = 1 + i * span
    const endCol = i === kpis.length - 1 ? COLS.length : startCol + span - 1
    ws.mergeCells(kpiRow, startCol, kpiRow, endCol)
    ws.mergeCells(kpiRow + 1, startCol, kpiRow + 1, endCol)
    const valueCell = ws.getCell(kpiRow, startCol)
    valueCell.value = kpi.value
    valueCell.font = { bold: true, size: 20, color: { argb: 'FF' + kpi.color } }
    valueCell.alignment = { horizontal: 'left' }
    const labelCell = ws.getCell(kpiRow + 1, startCol)
    labelCell.value = kpi.label.toUpperCase()
    labelCell.font = { size: 9, bold: true, color: { argb: 'FF' + COLOR_INK_DIM } }
  })
  ws.getRow(kpiRow).height = 26
  ws.getRow(kpiRow + 1).height = 16
  ws.getRow(kpiRow + 2).height = 10

  // --- Encabezado de tabla ------------------------------------------------------------------
  const headerRowIdx = kpiRow + 3
  const headerRow = ws.getRow(headerRowIdx)
  COLS.forEach((c, i) => {
    const cell = headerRow.getCell(i + 1)
    cell.value = c.header
    cell.font = { bold: true, color: { argb: 'FF' + COLOR_WHITE }, size: 10 }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_NAVY_SOFT } }
    cell.alignment = { vertical: 'middle', wrapText: true }
    cell.border = { bottom: { style: 'thin', color: { argb: 'FF' + COLOR_BRAND } } }
  })
  headerRow.height = 22

  const tipoColorMap = { PREVENCIÓN: COLOR_BLUE, 'URGENTE ATENCIÓN': COLOR_AMBER, EMERGENCIA: COLOR_BRAND }
  const estadoColorMap = { 'EN EJECUCIÓN': COLOR_BRAND, EJECUTADA: COLOR_GREEN, PROGRAMADA: COLOR_BLUE }
  const tipoColIdx = COLS.findIndex((c) => c.key === 'tipo') + 1
  const estadoColIdx = COLS.findIndex((c) => c.key === 'estado') + 1

  // --- Filas de datos -------------------------------------------------------------------
  items.forEach((it, i) => {
    const rowIdx = headerRowIdx + 1 + i
    const row = ws.getRow(rowIdx)
    let col = 1
    row.getCell(col++).value = it.n
    if (extendido) row.getCell(col++).value = it.estado
    row.getCell(col++).value = it.deptoLabel
    row.getCell(col++).value = it.provincia
    row.getCell(col++).value = it.distrito
    if (extendido) row.getCell(col++).value = it.sector || '—'
    row.getCell(col++).value = it.tipo || '—'
    row.getCell(col++).value = it.descripcion
    if (extendido) {
      row.getCell(col++).value = it.ficha || '—'
    }
    row.getCell(col++).value = it.marcoLegal || '—'
    row.getCell(col++).value = it.fechaInicio || '—'
    row.getCell(col++).value = it.fechaFin || '—'
    if (extendido) {
      row.getCell(col++).value = it.poblacion ?? '—'
      row.getCell(col++).value = it.volumen ?? '—'
    }
    row.getCell(col++).value = it.maquinaria.length ? it.maquinaria.join(', ') : '—'

    row.eachCell((cell) => {
      cell.alignment = { vertical: 'top', wrapText: true }
      cell.font = { size: 9.5, color: { argb: 'FF1A2338' } }
      cell.border = { bottom: { style: 'hair', color: { argb: 'FFE2E5EA' } } }
      if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7F8FA' } }
    })

    if (estadoColIdx > 0) {
      const estadoCell = row.getCell(estadoColIdx)
      estadoCell.font = { bold: true, size: 9.5, color: { argb: 'FF' + (estadoColorMap[estadoCell.value] || COLOR_INK_DIM) } }
    }
    const tipoCell = row.getCell(tipoColIdx)
    if (tipoCell.value && tipoColorMap[tipoCell.value]) {
      tipoCell.font = { bold: true, size: 9.5, color: { argb: 'FF' + tipoColorMap[tipoCell.value] } }
    }
  })

  const footerRowIdx = headerRowIdx + 1 + items.length + 1
  ws.mergeCells(footerRowIdx, 1, footerRowIdx, COLS.length)
  ws.getCell(footerRowIdx, 1).value = 'Sistema en tiempo real PNC Maquinarias — Ministerio de Vivienda, Construcción y Saneamiento'
  ws.getCell(footerRowIdx, 1).font = { italic: true, size: 8.5, color: { argb: 'FF' + COLOR_INK_DIM } }

  const buffer = await wb.xlsx.writeBuffer()
  const prefix = extendido ? 'buscador-intervenciones' : 'reporte-diario'
  descargarBlob(buffer, `${nombreArchivo(prefix, scopeLabel)}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

// ---------------------------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------------------------
export function exportarReporteDiarioPdf(reporte, scopeLabel) {
  const { items, total, porEstado } = reporte
  const porTipo = porTipoDe(items)
  const meta = metaDe(reporte)
  const extendido = esExtendido(items)
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 32

  // Franja "eyebrow"
  doc.setFillColor(224, 41, 61)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  const eyebrow = 'PROGRAMA NUESTRAS CIUDADES — PNC MAQUINARIAS'
  const eyebrowW = doc.getTextWidth(eyebrow) + 16
  doc.roundedRect(margin, 24, eyebrowW, 16, 3, 3, 'F')
  doc.text(eyebrow, margin + 8, 34.5)

  // Título
  doc.setTextColor(12, 18, 32)
  doc.setFontSize(20)
  doc.text(extendido ? 'Resultados de Búsqueda de Intervenciones' : 'Reporte Ejecutivo de Intervenciones', margin, 62)

  // Subtítulo
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(91, 100, 121)
  doc.text(tituloAlcance(scopeLabel), margin, 78)

  // Corte (esquina derecha)
  doc.setFontSize(9.5)
  const corteTxt = `Corte: ${meta.fechaCorte}  ·  ${meta.horaCorte} hrs`
  doc.text(corteTxt, pageWidth - margin - doc.getTextWidth(corteTxt), 34)

  doc.setDrawColor(224, 41, 61)
  doc.setLineWidth(1.2)
  doc.line(margin, 88, pageWidth - margin, 88)

  // Tarjetas KPI
  const kpis = extendido
    ? [
        { label: 'RESULTADOS ENCONTRADOS', value: total, color: [12, 18, 32] },
        { label: 'EN EJECUCIÓN', value: porEstado?.['EN EJECUCIÓN'] || 0, color: [224, 41, 61] },
        { label: 'EJECUTADAS', value: porEstado?.['EJECUTADA'] || 0, color: [27, 175, 122] },
        { label: 'PROGRAMADAS', value: porEstado?.['PROGRAMADA'] || 0, color: [42, 120, 214] },
      ]
    : [
        { label: 'INTERVENCIONES ACTIVAS', value: total, color: [224, 41, 61] },
        { label: 'PREVENCIÓN Y LIMPIEZA', value: porTipo['PREVENCIÓN'] || 0, color: [42, 120, 214] },
        { label: 'URGENTE ATENCIÓN', value: porTipo['URGENTE ATENCIÓN'] || 0, color: [242, 169, 0] },
        { label: 'DECLARADAS EMERGENCIA', value: porTipo['EMERGENCIA'] || 0, color: [224, 41, 61] },
      ]
  const cardGap = 12
  const cardW = (pageWidth - margin * 2 - cardGap * (kpis.length - 1)) / kpis.length
  const cardY = 100
  const cardH = 48
  kpis.forEach((kpi, i) => {
    const x = margin + i * (cardW + cardGap)
    doc.setFillColor(12, 18, 32)
    doc.roundedRect(x, cardY, cardW, cardH, 4, 4, 'F')
    doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2])
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text(String(kpi.value), x + 12, cardY + 28)
    doc.setTextColor(200, 205, 214)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.text(kpi.label, x + 12, cardY + 40)
  })

  const tableStartY = cardY + cardH + 20

  const head = extendido
    ? [['N°', 'Estado', 'Departamento', 'Provincia / Distrito', 'Tipo', 'Descripción de la intervención', 'Ficha', 'Fecha inicio – fin', 'Detalle / maquinaria']]
    : [['N°', 'Departamento', 'Provincia / Distrito', 'Tipo', 'Descripción de la intervención', 'Equipo / maquinaria desplegada']]

  const body = extendido
    ? items.map((it) => [
        it.n,
        it.estado,
        it.deptoLabel,
        `${it.provincia} / ${it.distrito}`,
        it.tipo || '—',
        it.descripcion,
        it.ficha || '—',
        `${it.fechaInicio || '—'} – ${it.fechaFin || '—'}`,
        it.maquinaria.length ? it.maquinaria.join(', ') : it.marcoLegal || '—',
      ])
    : items.map((it) => [it.n, it.deptoLabel, `${it.provincia} / ${it.distrito}`, it.tipo, it.descripcion, it.maquinaria.join(', ')])

  const columnStyles = extendido
    ? {
        0: { cellWidth: 20 },
        1: { cellWidth: 56 },
        2: { cellWidth: 60 },
        3: { cellWidth: 82 },
        4: { cellWidth: 58 },
        5: { cellWidth: 'auto' },
        6: { cellWidth: 42 },
        7: { cellWidth: 68 },
        8: { cellWidth: 110 },
      }
    : {
        0: { cellWidth: 24 },
        1: { cellWidth: 70 },
        2: { cellWidth: 90 },
        3: { cellWidth: 68 },
        4: { cellWidth: 'auto' },
        5: { cellWidth: 150 },
      }

  const tipoColIdx = extendido ? 4 : 3
  const estadoColorMap = { 'EN EJECUCIÓN': [224, 41, 61], EJECUTADA: [27, 175, 122], PROGRAMADA: [42, 120, 214] }
  const tipoColorMap = { 'PREVENCIÓN': [42, 120, 214], 'URGENTE ATENCIÓN': [242, 169, 0], EMERGENCIA: [224, 41, 61] }

  autoTable(doc, {
    startY: tableStartY,
    margin: { left: margin, right: margin },
    head,
    body,
    styles: { fontSize: 7.5, cellPadding: 4, valign: 'top', textColor: [26, 35, 56] },
    headStyles: { fillColor: [12, 18, 32], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    alternateRowStyles: { fillColor: [247, 248, 250] },
    columnStyles,
    didParseCell: (data) => {
      if (data.section !== 'body') return
      if (data.column.index === tipoColIdx) {
        const c = tipoColorMap[data.cell.raw]
        if (c) {
          data.cell.styles.textColor = c
          data.cell.styles.fontStyle = 'bold'
        }
      }
      if (extendido && data.column.index === 1) {
        const c = estadoColorMap[data.cell.raw]
        if (c) {
          data.cell.styles.textColor = c
          data.cell.styles.fontStyle = 'bold'
        }
      }
    },
    didDrawPage: () => {
      const str = 'Sistema en tiempo real PNC Maquinarias — Ministerio de Vivienda, Construcción y Saneamiento'
      doc.setFontSize(7.5)
      doc.setTextColor(150, 156, 168)
      doc.setFont('helvetica', 'italic')
      doc.text(str, margin, doc.internal.pageSize.getHeight() - 14)
    },
  })

  const prefix = extendido ? 'buscador-intervenciones' : 'reporte-diario'
  doc.save(`${nombreArchivo(prefix, scopeLabel)}.pdf`)
}

function descargarBlob(buffer, filename, mime) {
  const blob = new Blob([buffer], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
