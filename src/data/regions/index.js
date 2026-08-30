import tumbes from './tumbes'
import puno from './puno'
import tacna from './tacna'
import piura from './piura'
import ancash from './ancash'
import lambayeque from './lambayeque'
import ica from './ica'
import laLibertad from './la-libertad'
import lima from './lima'
import arequipa from './arequipa'

export const regions = { tumbes, puno, tacna, piura, ancash, lambayeque, ica, 'la-libertad': laLibertad, lima, arequipa }

export const REGION_LIST = [tumbes, puno, tacna, piura, ancash, lambayeque, ica, laLibertad, lima, arequipa].map((r) => ({ id: r.id, label: r.label, shortLabel: r.shortLabel }))

export const DEFAULT_REGION = 'tumbes'

// Pestaña "Vista General" (agregado nacional) -- se agrega como primera entrada del selector,
// junto a las 8 regiones reales. Ver src/data/global.js para los datos agregados.
export const GLOBAL_ID = 'global'

export const VIEW_LIST = [{ id: GLOBAL_ID, label: 'Vista General', shortLabel: 'Global' }, ...REGION_LIST]

export const DEFAULT_VIEW = GLOBAL_ID
