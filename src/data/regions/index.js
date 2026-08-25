import tumbes from './tumbes'
import puno from './puno'
import tacna from './tacna'
import piura from './piura'
import ancash from './ancash'
import lambayeque from './lambayeque'
import ica from './ica'
import laLibertad from './la-libertad'

export const regions = { tumbes, puno, tacna, piura, ancash, lambayeque, ica, 'la-libertad': laLibertad }

export const REGION_LIST = [tumbes, puno, tacna, piura, ancash, lambayeque, ica, laLibertad].map((r) => ({ id: r.id, label: r.label, shortLabel: r.shortLabel }))

export const DEFAULT_REGION = 'tumbes'
