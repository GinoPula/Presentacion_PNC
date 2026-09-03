// Datos extraídos de "REGIÓN PUNO AL 1508.pptx"
// Nota: el PPT original no incluye escenarios FEN/presupuesto ni puntos críticos ANA para esta región.
// La fila "Total general" de la tabla de ejecutadas venía copiada del reporte de Tumbes (error del
// documento fuente); aquí se muestra el total recalculado a partir de las filas por tipo de actividad.

// Actualizado: intervenciones ejecutadas/en ejecución/programadas desde el reporte
// 'inter_20260819114828.xlsx' exportado del MAIN (19/08/2026). Lo demás (convenios,
// puntos críticos, escenarios, flota, personal, galería) sigue viniendo del PPT/AM.
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' -- de paso se corrigió un bug del
// pipeline: el m3/km de "ejecutadas" usaba META_VOL/META_KM (la meta contratada) en vez de
// ACUMULADO_VOL/ACUMULADO_KM (el avance físico realmente registrado); esto sobreestimaba
// el volumen/km ejecutado en todas las regiones. Cantidad y población no se vieron afectadas.
// Refrescado otra vez el mismo día con inter_20260824204815.xlsx (~9h después, sin cambio de
// lógica) para reflejar los avances incrementales del MAIN.
import datosBD from './_generated/puno'
import galeria from '../galeria/puno.json'

export default {
  id: 'puno',
  label: 'Región Puno',
  shortLabel: 'Puno',

  meta: {
    region: 'Región Puno',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: '2026',
  },

  ...datosBD,

  // Ayuda Memoria (habilitado 28/08/2026 -- extendido desde el piloto de La Libertad).
  // La sección "Acuerdos Puntos Críticos -- todos los responsables" no aparece
  // todavía en esta región: falta confirmar con Franco el mapeo de categorías
  // (ANA / ANA CONTRATA / DEFENSA / MTC / MVCS) contra el consolidado nuevo
  // antes de extender esa tabla más allá de La Libertad. El resto del
  // documento (antecedentes, narrativa, programadas, puntos críticos ANA,
  // flota, plan FEN/escenarios) sí sale con datos reales de esta región.
  ayudaMemoriaDisponible: true,

  puntosCriticos: null,
  escenarios: null,

  capacidad: [
    { label: 'Maquinaria pesada', valor: 12 },
    { label: 'Volquetes', valor: 8 },
    { label: 'Vehículos de apoyo', valor: 3 },
  ],

  personalUBO: [
    { rol: 'Coordinador regional', cantidad: 1 },
    { rol: 'Administrativo', cantidad: 1 },
    { rol: 'Analista', cantidad: 1 },
    { rol: 'Técnico mecánico', cantidad: 1 },
    { rol: 'Operadores', cantidad: 2 },
  ],

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/puno.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Unidad Básica Operativa (UBO) Puno',
  ],
}
