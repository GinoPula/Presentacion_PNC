// Exportación de Alertas de Fechas Vencidas (Excel .xlsx y PDF) -- agregado 15/09/2026 a pedido
// de Franco, mismo patrón/estilo que src/lib/exportReporteDiario.js para que los reportes del
// sitio se vean consistentes entre sí. Recibe siempre el conjunto ya filtrado (UBO / tipo / estado
// / fecha) que arma AlertasFechasModal.jsx -- lo que se ve en pantalla es lo que se exporta.
import ExcelJS from 'exceljs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const COLOR_BRAND = 'E0293D' // rojo PNC
const COLOR_NAVY = '0C1220'
const COLOR_NAVY_SOFT = '121A2C'
const COLOR_AMBER = 'F2A900'
const COLOR_CRITICAL = 'FF5C5C'
const COLOR_WHITE = 'FFFFFF'
const COLOR_INK_DIM = '5B6479'

function nombreArchivo(prefix, scopeLabel) {
  const fecha = new Date().toISOString().slice(0, 10)
  const alcance = scopeLabel ? scopeLabel.toLowerCase().replace(/\s+/g, '-') : 'nacional'
  return `${prefix}_${alcance}_${fecha}`
}

function tituloAlcance(scopeLabel) {
  return scopeLabel ? `Alertas · ${scopeLabel}` : 'Alertas a nivel nacional (todas las UBO)'
}

function tipoAlertaLabel(tipoAlerta) {
  return tipoAlerta === 'PROGRAMADA_ATRASADA' ? 'Programada sin iniciar' : 'En ejecución sin cerrar'
}

// ---------------------------------------------------------------------------------------------
// Excel
// ---------------------------------------------------------------------------------------------
export async function exportarAlertasFechasExcel(reporte, scopeLabel) {
  const { items, total, programadas, enEjecucion, mayorAtraso, meta } = reporte

  const wb = new ExcelJS.Workbook()
  wb.creator = 'PNC Maquinarias'
  wb.created = new Date()

  const ws = wb.addWorksheet('Alertas de Fechas Vencidas', {
    views: [{ showGridLines: false }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 },
  })

  const COLS = [
    { header: 'N°', key: 'n', width: 6 },
    { header: 'Alerta', key: 'alerta', width: 22 },
    { header: 'UBO / Departamento', key: 'departamento', width: 18 },
    { header: 'Provincia', key: 'provincia', width: 16 },
    { header: 'Distrito', key: 'distrito', width: 16 },
    { header: 'Sector', key: 'sector', width: 16 },
    { header: 'Tipo', key: 'tipo', width: 16 },
    { header: 'Ficha', key: 'ficha', width: 14 },
    { header: 'Descripción', key: 'descripcion', width: 50 },
    { header: 'Marco legal', key: 'marcoLegal', width: 20 },
    { header: 'Fecha inicio', key: 'fechaInicio', width: 12 },
    { header: 'Fecha término', key: 'fechaFin', width: 12 },
    { header: 'Días de atraso', key: 'diasAtraso', width: 13 },
  ]
  ws.columns = COLS
  ws.pageSetup.printTitlesRow = '9:9'

  // --- Encabezado ejecutivo ---------------------------------------------------------------
  ws.mergeCells(1, 1, 1, COLS.length)
  ws.getCell(1, 1).value = 'PROGRAMA NUESTRAS CIUDADES — PNC MAQUINARIAS'
  ws.getCell(1, 1).font = { color: { argb: 'FF' + COLOR_BRAND }, bold: true, size: 10 }
  ws.getRow(1).height = 20

  ws.mergeCells(2, 1, 2, COLS.length)
  const titleCell = ws.getCell(2, 1)
  titleCell.value = 'Alertas de Fechas Vencidas'
  titleCell.font = { bold: true, size: 18, color: { argb: 'FF' + COLOR_NAVY } }
  ws.getRow(2).height = 28

  ws.mergeCells(3, 1, 3, COLS.length)
  const subCell = ws.getCell(3, 1)
  subCell.value = tituloAlcance(scopeLabel)
  subCell.font = { italic: true, size: 11, color: { argb: 'FF' + COLOR_INK_DIM } }
  ws.getRow(3).height = 18

  ws.mergeCells(4, 1, 4, COLS.length)
  ws.getCell(4, 1).value = `Corte: ${meta?.fechaCorte || '—'}  ·  ${meta?.horaCorte ? `${meta.horaCorte} hrs` : ''}  ·  Uso interno`
  ws.getCell(4, 1).font = { size: 10, color: { argb: 'FF' + COLOR_INK_DIM } }
  ws.getRow(5).height = 6

  // --- Tarjetas KPI (fila 6) --------------------------------------------------------------
  const kpiRow = 6
  const kpis = [
    { label: 'Total de atrasos', value: total, color: COLOR_NAVY },
    { label: 'Programadas sin iniciar', value: programadas, color: COLOR_AMBER },
    { label: 'En ejecución sin cerrar', value: enEjecucion, color: COLOR_CRITICAL },
    { label: 'Mayor atraso (días)', value: mayorAtraso || 0, color: COLOR_NAVY },
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

  const alertaColIdx = COLS.findIndex((c) => c.key === 'alerta') + 1
  const diasColIdx = COLS.findIndex((c) => c.key === 'diasAtraso') + 1

  // --- Filas de datos -------------------------------------------------------------------
  items.forEach((it, i) => {
    const rowIdx = headerRowIdx + 1 + i
    const row = ws.getRow(rowIdx)
    row.getCell(1).value = it.n
    row.getCell(2).value = tipoAlertaLabel(it.tipoAlerta)
    row.getCell(3).value = it.deptoLabel
    row.getCell(4).value = it.provincia
    row.getCell(5).value = it.distrito
    row.getCell(6).value = it.sector || '—'
    row.getCell(7).value = it.tipo || '—'
    row.getCell(8).value = it.ficha || '—'
    row.getCell(9).value = it.descripcion
    row.getCell(10).value = it.marcoLegal || '—'
    row.getCell(11).value = it.fechaInicio || '—'
    row.getCell(12).value = it.fechaFin || '—'
    row.getCell(13).value = it.diasAtraso

    row.eachCell((cell) => {
      cell.alignment = { vertical: 'top', wrapText: true }
      cell.font = { size: 9.5, color: { argb: 'FF1A2338' } }
      cell.border = { bottom: { style: 'hair', color: { argb: 'FFE2E5EA' } } }
      if (i % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7F8FA' } }
    })

    const alertaCell = row.getCell(alertaColIdx)
    alertaCell.font = {
      bold: true,
      size: 9.5,
      color: { argb: 'FF' + (it.tipoAlerta === 'PROGRAMADA_ATRASADA' ? COLOR_AMBER : COLOR_CRITICAL) },
    }
    const diasCell = row.getCell(diasColIdx)
    diasCell.font = { bold: true, size: 9.5, color: { argb: 'FF' + COLOR_CRITICAL } }
    diasCell.alignment = { vertical: 'top', horizontal: 'right' }
  })

  const footerRowIdx = headerRowIdx + 1 + items.length + 1
  ws.mergeCells(footerRowIdx, 1, footerRowIdx, COLS.length)
  ws.getCell(footerRowIdx, 1).value =
    'Sistema en tiempo real PNC Maquinarias — uso interno. No cambia el estado en el MAIN, solo avisa.'
  ws.getCell(footerRowIdx, 1).font = { italic: true, size: 8.5, color: { argb: 'FF' + COLOR_INK_DIM } }

  const buffer = await wb.xlsx.writeBuffer()
  descargarBlob(buffer, `${nombreArchivo('alertas-fechas-vencidas', scopeLabel)}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

// ---------------------------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------------------------
export function exportarAlertasFechasPdf(reporte, scopeLabel) {
  const { items, total, programadas, enEjecucion, mayorAtraso, meta } = reporte
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 32

  // Franja "eyebrow"
  doc.setFillColor(242, 169, 0)
  doc.setTextColor(12, 18, 32)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  const eyebrow = 'USO INTERNO · SOLO ADMINISTRADOR'
  const eyebrowW = doc.getTextWidth(eyebrow) + 16
  doc.roundedRect(margin, 24, eyebrowW, 16, 3, 3, 'F')
  doc.text(eyebrow, margin + 8, 34.5)

  // Título
  doc.setTextColor(12, 18, 32)
  doc.setFontSize(20)
  doc.text('Alertas de Fechas Vencidas', margin, 62)

  // Subtítulo
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(91, 100, 121)
  doc.text(tituloAlcance(scopeLabel), margin, 78)

  // Corte (esquina derecha)
  doc.setFontSize(9.5)
  const corteTxt = `Corte: ${meta?.fechaCorte || '—'}  ·  ${meta?.horaCorte ? `${meta.horaCorte} hrs` : ''}`
  doc.text(corteTxt, pageWidth - margin - doc.getTextWidth(corteTxt), 34)

  doc.setDrawColor(242, 169, 0)
  doc.setLineWidth(1.2)
  doc.line(margin, 88, pageWidth - margin, 88)

  // Tarjetas KPI -- OJO: las tarjetas se dibujan con fondo navy (setFillColor(12,18,32)) más
  // abajo, así que el valor NUNCA puede ir en ese mismo navy (quedaría invisible, texto sobre
  // fondo del mismo color) -- blanco para los neutros, el color de acento para los que ya
  // resaltan por sí solos.
  const kpis = [
    { label: 'TOTAL DE ATRASOS', value: total, color: [255, 255, 255] },
    { label: 'PROGRAMADAS SIN INICIAR', value: programadas, color: [242, 169, 0] },
    { label: 'EN EJECUCIÓN SIN CERRAR', value: enEjecucion, color: [224, 41, 61] },
    { label: 'MAYOR ATRASO (DÍAS)', value: mayorAtraso || 0, color: [255, 255, 255] },
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

  const head = [['N°', 'Alerta', 'UBO', 'Provincia / Distrito', 'Tipo', 'Ficha', 'Descripción', 'Fecha inicio', 'Fecha término', 'Días']]

  const body = items.map((it) => [
    it.n,
    tipoAlertaLabel(it.tipoAlerta),
    it.deptoLabel,
    `${it.provincia} / ${it.distrito}`,
    it.tipo || '—',
    it.ficha || '—',
    it.descripcion,
    it.fechaInicio || '—',
    it.fechaFin || '—',
    it.diasAtraso,
  ])

  const columnStyles = {
    0: { cellWidth: 18 },
    1: { cellWidth: 64 },
    2: { cellWidth: 56 },
    3: { cellWidth: 78 },
    4: { cellWidth: 56 },
    5: { cellWidth: 46 },
    6: { cellWidth: 'auto' },
    7: { cellWidth: 52 },
    8: { cellWidth: 56 },
    9: { cellWidth: 30, halign: 'right' },
  }

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
      if (data.column.index === 1) {
        const esProgramada = data.cell.raw === tipoAlertaLabel('PROGRAMADA_ATRASADA')
        data.cell.styles.textColor = esProgramada ? [242, 169, 0] : [224, 41, 61]
        data.cell.styles.fontStyle = 'bold'
      }
      if (data.column.index === 9) {
        data.cell.styles.textColor = [224, 41, 61]
        data.cell.styles.fontStyle = 'bold'
      }
    },
    didDrawPage: () => {
      const str = 'Sistema en tiempo real PNC Maquinarias — uso interno. No cambia el estado en el MAIN, solo avisa.'
      doc.setFontSize(7.5)
      doc.setTextColor(150, 156, 168)
      doc.setFont('helvetica', 'italic')
      doc.text(str, margin, doc.internal.pageSize.getHeight() - 14)
    },
  })

  doc.save(`${nombreArchivo('alertas-fechas-vencidas', scopeLabel)}.pdf`)
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
