// Datos extraídos de "REGIÓN TUMBES AL 1508.pptx"

// Actualizado: intervenciones ejecutadas/en ejecución/programadas desde el reporte
// 'inter_20260819114828.xlsx' exportado del MAIN (19/08/2026). Lo demás (convenios,
// puntos críticos, escenarios, flota, personal, galería) sigue viniendo del PPT/AM.
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' -- de paso se corrigió un bug del
// pipeline: el m3/km de "ejecutadas" usaba META_VOL/META_KM (la meta contratada) en vez de
// ACUMULADO_VOL/ACUMULADO_KM (el avance físico realmente registrado); esto sobreestimaba
// el volumen/km ejecutado en todas las regiones. Cantidad y población no se vieron afectadas.
// Refrescado otra vez el mismo día con inter_20260824204815.xlsx (~9h después, sin cambio de
// lógica) para reflejar los avances incrementales del MAIN.
import datosBD from './_generated/tumbes'

export default {
  id: 'tumbes',
  label: 'Región Tumbes',
  shortLabel: 'Tumbes',

  meta: {
    region: 'Región Tumbes',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  // Ayuda Memoria (habilitado 28/08/2026 -- extendido desde el piloto de La Libertad).
  ayudaMemoriaDisponible: true,

  // todosResponsables (agregado 28/08/2026): igual método que La Libertad --
  // filas de 'EXCEL_CONSOLIDADO_536_PARA_MIDAGRI_14.08.2026_VF_REV_ANA.xlsx',
  // hoja CONSOLIDADO, filtrado por DEPARTAMENTO, columna RESPONSABLE tal cual
  // (ANA/MIDAGRI/MVCS/DEFENSA/MTC). Ver comentario completo en
  // src/data/regions/la-libertad.js sobre por qué no existe "ANA CONTRATA" y
  // por qué actividad/meta/unidad son solo referenciales (no se muestran en
  // el documento).

  todosResponsables: [
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'CP. San Isidro', ficha: 'FTR-CB-PREV N° 1012-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación, consformación de bordos en la quebrada Cansas', meta: 0.82, unidad: 'Km', responsable: 'ANA', poblacion: 383 },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Cristales-Malval', ficha: 'FTR-CB-PREV N° 1027-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Gamarra', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Malval', ficha: 'FTR-MC-PREV N° 0665-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa Eulalia', meta: 0.45, unidad: 'Km', responsable: 'MVCS', poblacion: 502 },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'Cerro Blanco 1 (MD)', ficha: 'FTR-CB-PREV N° 0316-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.7, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'Cabuyal', ficha: 'FTR-MC-PREV N° 0129-2026-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Motupe', meta: 3.2, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'La Inverna', ficha: 'FTR-MC-PREV N° 0161-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos  y poza de disipación en la quebrada Gamarra', meta: 0.8, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1400 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vista Hermosa', ficha: 'FTR-CB-PREV N° 0169-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.6, unidad: 'Km', responsable: 'MVCS', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Pechichal', ficha: 'FTR-CB-PREV N° 1026-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Tumbes', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'El Peligro', ficha: 'FTR-CB-PREV N° 1028-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.86, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'La Peña', ficha: 'FTR-MC-PREV N° 0143-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Huayo Ingenio', meta: 1.15, unidad: 'Km', responsable: 'DEFENSA', poblacion: 4375 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vaqueria', ficha: 'FTR-MC-PREV N° 0195-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 0.59, unidad: 'Km', responsable: 'ANA', poblacion: 350 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'naranjo-Casablanqueada', ficha: 'FTR-MC-PREV N° 0685-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tumbes', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: 1250 },
    { provincia: 'Tumbes', distrito: 'San Juan de la Virgen', sector: 'Puerto el Cura-Pampagrande', ficha: 'FTR-CB-PREV N° 0123-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Utcubamba', meta: 0.41, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Juan de la Virgen', sector: 'Cerro Blanco 2', ficha: 'FTR-CB-PREV N° 0315-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 0.6, unidad: 'Km', responsable: 'ANA', poblacion: 270 },
    { provincia: 'Zarumilla', distrito: 'Matapalo', sector: 'Matapalo', ficha: 'FTR-MC-PREV N° 0196-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Loco (Quebrada río Loco)', meta: 2.4, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
  ],
  todosResponsablesResumen: { ana: 10, midagri: 0, defensa: 3, mtc: 0, mvcs: 2, total: 15 },

  puntosCriticos: [
    {
      provincia: 'Tumbes',
      distrito: 'San Jacinto',
      sector: 'Vista Hermosa',
      fichaTecnica: 'FTR-CB-PREV N° 0169-2025-ANA-AAA.JZ-ALA.T',
      descripcion: 'Limpieza, descolmatación y conformación de dique enrocado en la margen derecha e izquierda de la quebrada Rica Playa.',
      metaKm: 0.6,
    },
    {
      provincia: 'Tumbes',
      distrito: 'Corrales',
      sector: 'Malval',
      fichaTecnica: 'FTR-MC-PREV N° 0665-2025-ANA-AAA.JZ-ALA.T',
      descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Bolívar.',
      metaKm: 0.45,
    },
  ],

  escenarios: [
    {
      nombre: 'Escenario N° 1',
      condicion: 'Condiciones Moderadas',
      presupuesto: 547945.2,
      mantenimiento: 197523.28,
      combustible: 196988.83,
      personal: 153433.1,
      intervenciones: 16,
    },
    {
      nombre: 'Escenario N° 2',
      condicion: 'Condiciones Severas',
      presupuesto: 2705479.45,
      mantenimiento: 975271.2,
      combustible: 972632.34,
      personal: 757575.91,
      intervenciones: 79,
    },
  ],

  capacidad: [
    { label: 'Maquinaria pesada', valor: 8 },
    { label: 'Volquetes', valor: 8 },
    { label: 'Cisternas agua potable', valor: 2 },
    { label: 'Vehículos de apoyo', valor: 4 },
  ],

  personalUBO: [
    { rol: 'Coordinador regional', cantidad: 1 },
    { rol: 'Administrativo', cantidad: 1 },
    { rol: 'Analista', cantidad: 1 },
    { rol: 'Técnico mecánico', cantidad: 1 },
    { rol: 'Operadores', cantidad: 2 },
  ],

  galeria: [
    { id: 1, codigo: '053-2026-LD-PI-TUM', estado: 'Ejecutada', img: 'tumbes-1' },
    { id: 2, codigo: '017-2026-LD-PI-TUM', estado: 'Ejecutada', img: 'tumbes-2' },
    { id: 3, codigo: '067-2026-AA-U-TUM', estado: 'En ejecución', img: 'tumbes-3' },
    { id: 4, codigo: '058-2026-LD-PI-TUM', estado: 'Ejecutada', img: 'tumbes-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Tumbes',
  ],
}
