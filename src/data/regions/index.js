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
import amazonas from './amazonas'
import apurimac from './apurimac'
import ayacucho from './ayacucho'
import cajamarca from './cajamarca'
import callao from './callao'
import cusco from './cusco'
import huancavelica from './huancavelica'
import huanuco from './huanuco'
import junin from './junin'
import loreto from './loreto'
import madreDeDios from './madre-de-dios'
import moquegua from './moquegua'
import pasco from './pasco'
import sanMartin from './san-martin'
import ucayali from './ucayali'

const REGIONES = [
  tumbes, puno, tacna, piura, ancash, lambayeque, ica, laLibertad, lima, arequipa,
  amazonas, apurimac, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, junin, loreto,
  madreDeDios, moquegua, pasco, sanMartin, ucayali,
]

export const regions = Object.fromEntries(REGIONES.map((r) => [r.id, r]))

export const REGION_LIST = REGIONES.map((r) => ({ id: r.id, label: r.label, shortLabel: r.shortLabel }))

export const DEFAULT_REGION = 'tumbes'

// Pestaña "Vista General" (agregado nacional) -- se agrega como primera entrada del selector,
// junto a las 25 regiones reales (los 24 departamentos del Perú + Callao). Ver src/data/global.js
// para los datos agregados.
export const GLOBAL_ID = 'global'

export const VIEW_LIST = [{ id: GLOBAL_ID, label: 'Vista General', shortLabel: 'Global' }, ...REGION_LIST]

export const DEFAULT_VIEW = GLOBAL_ID
