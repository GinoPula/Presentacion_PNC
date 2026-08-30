// Datos de la región Junín.
// Región nueva agregada el 30/08/2026 (Franco: "termina las demas regiones que faltan" --
// tercer lote de departamentos nuevos del sitio, después de Lima y Arequipa).
//
// A diferencia de Lima/Arequipa/Ancash/Ica/La Libertad/Lambayeque/Piura/Tumbes, para
// Junín NO hay Excel consolidado de fichas MVCS/ANA (el consolidado de 536 fichas solo
// cubre esas 8) ni el archivo de presupuesto Moderado/Severo -- por eso puntosCriticos,
// escenarios, capacidad y personalUBO quedan vacíos (null/[]) en vez de inventados, mismo
// criterio que ya se usaba para Puno/Tacna.
//
// Ejecutadas/en ejecución/programadas + mapa de intervenciones + convenios + flota: TODAVÍA NO
// corridas contra Producción -- ./_generated/junin.js es el placeholder en cero (nunca
// inventado). Para llenarlo con datos reales, correr:
//   python pipeline/generar_todas_regiones.py --repo "D:\Presentacion_PNC" --regiones junin --git-push
//
// ayudaMemoriaDisponible: activado igual que Lima/Arequipa -- sin Word curado a mano, usa el
// párrafo automático de src/lib/ayudaMemoria.js (seccionNarrativa) a partir de datos en vivo.
//
// Galería: vacía a propósito -- no se curó set de fotos para este departamento.
import datosBD from './_generated/junin'
import galeria from '../galeria/junin.json'

export default {
  id: 'junin',
  label: 'Región Junín',
  shortLabel: 'Junín',

  meta: {
    region: 'Región Junín',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  ayudaMemoriaDisponible: true,

  puntosCriticos: null,
  escenarios: null,

  capacidad: [],
  personalUBO: [],

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/junin.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
  ],
}
