// Exportación del Reporte Diario de Intervenciones (Excel .xlsx y PDF) con un diseño ejecutivo
// mejorado respecto al Excel plano que se arma manualmente hoy, pero manteniendo las mismas
// columnas y la misma fuente de datos (ESTADO = "EN EJECUCIÓN" del MAIN nacional).
import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const COLOR_BRAND = 'E0293D' // rojo PNC
const COLOR_NAVY = '0C1220' // fondo oscuro del sitio
const COLOR_NAVY_SOFT = '121A2C'
const COLOR_BLUE = '2A78D6'
const COLOR_AMBER = 'F2A900'
const COLOR_WHITE = 'FFFFFF'
const COLOR_INK_DIM = '5B6479'

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
  const { meta, items, total, porTipo } = reporte
  const wb = new ExcelJS.Workbook()
  wb.creator = 'PNC Maquinarias'
  wb.created = new Date()

  const ws = wb.addWorksheet('Reporte Diario', {
    views: [{ showGridLines: false }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 },
  })

  const COLS = [
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
  titleCell.value = 'Reporte Ejecutivo de Intervenciones en Ejecución'
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
  const kpis = [
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

  // --- Filas de datos -------------------------------------------------------------------
  items.forEach((it, i) => {
    const rowIdx = headerRowIdx + 1 + i
    const row = ws.getRow(rowIdx)
    row.getCell(1).value = it.n
    row.getCell(2).value = it.deptoLabel
    row.getCell(3).value = it.provincia
    row.getCell(4).value = it.distrito
    row.getCell(5).value = it.tipo
    row.getCell(6).value = it.descripcion
    row.getCell(7).value = it.marcoLegal
    row.getCell(8).value = it.fechaInicio
    row.getCell(9).value = it.fechaFin
    row.getCell(10).value = it.maquinaria.join(', ')

    row.eachCell((cell) => {
      cell.alignment = { vertical: 'top', wrapText: true }
      cell.font = { size: 9.5, color: { argb: 'FF1A2338' } }
      cell.border = { bottom: { style: 'hair', color: { argb: 'FFE2E5EA' } } }
      if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7F8FA' } }
    })

    const tipoColorMap = { PREVENCIÓN: COLOR_BLUE, 'URGENTE ATENCIÓN': COLOR_AMBER, EMERGENCIA: COLOR_BRAND }
    row.getCell(5).font = { bold: true, size: 9.5, color: { argb: 'FF' + (tipoColorMap[it.tipo] || COLOR_INK_DIM) } }
  })

  const footerRowIdx = headerRowIdx + 1 + items.length + 1
  ws.mergeCells(footerRowIdx, 1, footerRowIdx, COLS.length)
  ws.getCell(footerRowIdx, 1).value = 'Sistema en tiempo real PNC Maquinarias — Ministerio de Vivienda, Construcción y Saneamiento'
  ws.getCell(footerRowIdx, 1).font = { italic: true, size: 8.5, color: { argb: 'FF' + COLOR_INK_DIM } }

  const buffer = await wb.xlsx.writeBuffer()
  descargarBlob(buffer, `${nombreArchivo('reporte-diario', scopeLabel)}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

// ---------------------------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------------------------
export function exportarReporteDiarioPdf(reporte, scopeLabel) {
  const { meta, items, total, porTipo } = reporte
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
  doc.text('Reporte Ejecutivo de Intervenciones', margin, 62)

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
  const kpis = [
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
  autoTable(doc, {
    startY: tableStartY,
    margin: { left: margin, right: margin },
    head: [['N°', 'Departamento', 'Provincia / Distrito', 'Tipo', 'Descripción de la intervención', 'Equipo / maquinaria desplegada']],
    body: items.map((it) => [
      it.n,
      it.deptoLabel,
      `${it.provincia} / ${it.distrito}`,
      it.tipo,
      it.descripcion,
      it.maquinaria.join(', '),
    ]),
    styles: { fontSize: 7.5, cellPadding: 4, valign: 'top', textColor: [26, 35, 56] },
    headStyles: { fillColor: [12, 18, 32], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    alternateRowStyles: { fillColor: [247, 248, 250] },
    columnStyles: {
      0: { cellWidth: 24 },
      1: { cellWidth: 70 },
      2: { cellWidth: 90 },
      3: { cellWidth: 68 },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 150 },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 3) {
        const tipo = data.cell.raw
        const colorMap = { 'PREVENCIÓN': [42, 120, 214], 'URGENTE ATENCIÓN': [242, 169, 0], EMERGENCIA: [224, 41, 61] }
        const c = colorMap[tipo]
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

  doc.save(`${nombreArchivo('reporte-diario', scopeLabel)}.pdf`)
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
