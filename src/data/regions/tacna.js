// Datos extraídos de "REGIÓN TACNA AL 1508.pptx"
// Nota: el PPT original no incluye escenarios FEN/presupuesto ni puntos críticos ANA para esta región.

// Actualizado: intervenciones ejecutadas/en ejecución/programadas desde el reporte
// 'inter_20260819114828.xlsx' exportado del MAIN (19/08/2026). Lo demás (convenios,
// puntos críticos, escenarios, flota, personal, galería) sigue viniendo del PPT/AM.
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' -- de paso se corrigió un bug del
// pipeline: el m3/km de "ejecutadas" usaba META_VOL/META_KM (la meta contratada) en vez de
// ACUMULADO_VOL/ACUMULADO_KM (el avance físico realmente registrado); esto sobreestimaba
// el volumen/km ejecutado en todas las regiones. Cantidad y población no se vieron afectadas.
// Refrescado otra vez el mismo día con inter_20260824204815.xlsx (~9h después, sin cambio de
// lógica) para reflejar los avances incrementales del MAIN.
import datosBD from './_generated/tacna'

export default {
  id: 'tacna',
  label: 'Región Tacna',
  shortLabel: 'Tacna',

  meta: {
    region: 'Región Tacna',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
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
    { label: 'Maquinaria pesada', valor: 9 },
    { label: 'Volquetes', valor: 5 },
    { label: 'Cisternas', valor: 4 },
    { label: 'Vehículos de apoyo', valor: 6 },
  ],

  personalUBO: [
    { rol: 'Coordinador regional', cantidad: 1 },
    { rol: 'Administrativo', cantidad: 1 },
    { rol: 'Técnico mecánico', cantidad: 1 },
    { rol: 'Operadores', cantidad: 2 },
  ],

  galeria: [
    { id: 1, codigo: '017-2026-LD-P-TAC', estado: 'Ejecutada', img: 'tacna-1' },
    { id: 2, codigo: '042-2026-LD-E-TAC', estado: 'Ejecutada', img: 'tacna-2' },
    { id: 3, codigo: '044-2026-AA-U-TAC', estado: 'En ejecución', img: 'tacna-3' },
    { id: 4, codigo: '044-2026-AA-U-TAC', estado: 'En ejecución', img: 'tacna-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Unidad Básica Operativa (UBO) Tacna',
  ],
}
