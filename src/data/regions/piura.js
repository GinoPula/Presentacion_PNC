// Datos extraídos de "REGION PIURA AL 1508.pptx" y "AM PIURA al 18.08.2026 V2.docx".
// Intervenciones ejecutadas/en ejecución/programadas actualizadas desde el reporte
// 'inter_20260819114828.xlsx' exportado del MAIN (19/08/2026). Lo demás (convenios,
// puntos críticos ANA, escenarios FEN, flota, personal, galería) viene del PPT/AM.
// Nota: los puntos críticos de Piura no traen "sector" en la fuente (a diferencia de Tumbes).
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' -- de paso se corrigió un bug del
// pipeline: el m3/km de "ejecutadas" usaba META_VOL/META_KM (la meta contratada) en vez de
// ACUMULADO_VOL/ACUMULADO_KM (el avance físico realmente registrado); esto sobreestimaba
// el volumen/km ejecutado en todas las regiones. Cantidad y población no se vieron afectadas.
// Refrescado otra vez el mismo día con inter_20260824204815.xlsx (~9h después, sin cambio de
// lógica) para reflejar los avances incrementales del MAIN.
import datosBD from './_generated/piura'

export default {
  id: 'piura',
  label: 'Región Piura',
  shortLabel: 'Piura',

  meta: {
    region: 'Región Piura',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  puntosCriticos: [
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Coyona', fichaTecnica: 'FTR-MC-PREV N° 0647-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Singocate.', metaKm: 1.8 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Canchaque, Mishahuaca', fichaTecnica: 'FTR-CB-PREV N° 0819-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas márgenes de la quebrada Limón.', metaKm: 2.34 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Potreros', fichaTecnica: 'FTR-MC-PREV N° 0167-2026-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Los Potreros.', metaKm: 0.45 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Shuturumbe', fichaTecnica: 'FTR-MC-PREV N° 0646-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Shuturumbe (Qda. La Ramada).', metaKm: 1.0 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'El Progreso', fichaTecnica: 'FTR-CB-PREV N° 0983-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas márgenes de la quebrada El Progreso.', metaKm: 1.2 },
    { provincia: 'Huancabamba', distrito: 'San Miguel del Faique', sector: 'San Cristóbal', fichaTecnica: 'FTR-MC-PREV N° 0168-2026-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Antonio.', metaKm: 0.44 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'Hualcas', fichaTecnica: 'FTR-MC-PREV N° 0661-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Cementerio.', metaKm: 1.22 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Cashupampa', fichaTecnica: 'FTR-MC-PREV N° 0645-2025-ANA-AAA.JZ-ALA.APH', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Chorro Blanco.', metaKm: 0.25 },
  ],

  escenarios: [
    {
      nombre: 'Escenario N° 1',
      condicion: 'Condiciones Moderadas',
      presupuesto: 993150.69,
      mantenimiento: 358010.95,
      combustible: 357042.25,
      personal: 278097.49,
      intervenciones: 29,
    },
    {
      nombre: 'Escenario N° 2',
      condicion: 'Condiciones Severas',
      presupuesto: 4310859.67,
      mantenimiento: 1551287.02,
      combustible: 1551287.02,
      personal: 1208285.63,
      intervenciones: 126,
    },
  ],

  capacidad: [
    { label: 'Maquinaria pesada', valor: 20 },
    { label: 'Volquetes', valor: 11 },
    { label: 'Cisternas agua potable', valor: 5 },
    { label: 'Vehículos de apoyo', valor: 10 },
  ],

  personalUBO: [
    { rol: 'Coordinador regional', cantidad: 1 },
    { rol: 'Administrativo', cantidad: 1 },
    { rol: 'Analista', cantidad: 1 },
    { rol: 'Técnico mecánico', cantidad: 1 },
    { rol: 'Operadores', cantidad: 4 },
  ],

  galeria: [
    { id: 1, codigo: 'FTI N°044-2026-LD-PI-PIU', estado: 'Ejecutada', img: 'piura-1' },
    { id: 2, codigo: 'FTI Nº083-2026-LD-P-PIU', estado: 'Ejecutada', img: 'piura-2' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Piura',
  ],
}
