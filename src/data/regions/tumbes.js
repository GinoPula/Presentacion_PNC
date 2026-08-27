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
