export function fmtNumber(n, opts = {}) {
  if (n === null || n === undefined) return '—'
  return new Intl.NumberFormat('es-PE', opts).format(n)
}

export function fmtInt(n) {
  if (n === null || n === undefined) return '—'
  return fmtNumber(n, { maximumFractionDigits: 0 })
}

export function fmtDecimal(n, digits = 2) {
  if (n === null || n === undefined) return '—'
  return fmtNumber(n, { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function fmtCurrency(n) {
  if (n === null || n === undefined) return '—'
  return 'S/ ' + fmtNumber(n, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
