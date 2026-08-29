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

// Une una lista de nombres al estilo español ("Tumbes, Piura y Áncash") -- usado para
// que los textos de la Vista General ("Panorama nacional de las N regiones... ") se
// armen solos a partir de REGION_LIST, en vez de quedar una lista fija que hay que
// acordarse de actualizar a mano cada vez que se agrega una región nueva (Lima, Arequipa).
export function joinNombres(lista) {
  if (!lista || lista.length === 0) return ''
  if (lista.length === 1) return lista[0]
  return `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}`
}
