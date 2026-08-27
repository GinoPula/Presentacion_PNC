// Datos de la región Ancash.
// Ejecutadas/en ejecución/programadas + mapa: reporte 'inter_20260819114828.xlsx' exportado
// del MAIN (19/08/2026) — validado contra los totales narrados en la Memoria de Ayuda Ancash
// (52 ejecutadas 2026, 2 en ejecución, 20 programadas: coinciden exactamente).
// Convenios: PNC_CONVENIOS.xlsx (corte 19/08/2026, filtrado UBO=Ancash).
// Flota: Estado_Maquinarias.xlsx (corte 19/08/2026, filtrado UBO=Ancash).
// Escenarios FEN/presupuesto: DATA_PRESUPUESTO_REGIONES_NORTE.xlsx (fila Ancash).
// Puntos críticos ANA: extracto proporcionado por el usuario del acuerdo multisectorial.
// Personal UBO: sin fuente todavía — sección queda vacía hasta contar con ese dato.
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' (53 ejecutadas 2026, +1 desde el
// 19/08). De paso se corrigió un bug del pipeline: el m3/km de "ejecutadas" usaba
// META_VOL/META_KM (la meta contratada) en vez de ACUMULADO_VOL/ACUMULADO_KM (el avance
// físico realmente registrado); esto sobreestimaba el volumen/km ejecutado en todas las
// regiones. Cantidad y población no se vieron afectadas por ese bug.
// Refrescado otra vez el mismo día con 'inter_20260824204815.xlsx' (~9h después, sin cambio
// de lógica): +1 programada (Yungay/Shupluy) y avance en las 2 intervenciones en ejecución.
import datosBD from './_generated/ancash'

export default {
  id: 'ancash',
  label: 'Región Ancash',
  shortLabel: 'Ancash',

  meta: {
    region: 'Región Ancash',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  puntosCriticos: [
    {
      provincia: 'Santa',
      distrito: 'Chimbote',
      sector: 'Cascajal Bajo-La Cuadra',
      fichaTecnica: 'FTR-MC-PREV N° 0125-2026-ANA-AAA.HCH-ALA.SLN',
      descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Cascajal.',
      metaKm: 3.8,
    },
    {
      provincia: 'Santa',
      distrito: 'Chimbote',
      sector: 'Cascajal',
      fichaTecnica: 'FTR-MC-PREV N° 0126-2026-ANA-AAA.HCH-ALA.SLN',
      descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio de la quebrada Cascajal.',
      metaKm: 3.1,
    },
    {
      provincia: 'Carlos Fermín Fitzcarrald',
      distrito: 'San Luis',
      sector: 'Chacapata',
      fichaTecnica: 'FTR-CB-PREV N° 0826-2025-ANA-AAA.M-ALA.POMA',
      descripcion: 'Limpieza, descolmatación y conformación de muro de gaviones en ambas márgenes del río Tambillos.',
      metaKm: 0.18,
    },
    {
      provincia: 'Santa',
      distrito: 'Chimbote',
      sector: 'Tambo Real',
      fichaTecnica: 'FTR-MC-PREV N° 0127-2026-ANA-AAA.HCH-ALA.SLN',
      descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Cascajal.',
      metaKm: 3.4,
    },
  ],

  // Presupuesto por escenario: DATA_PRESUPUESTO_REGIONES_NORTE.xlsx no trae el número de
  // intervenciones proyectadas por escenario (sí lo traía el PPT de Piura) — queda en null
  // en vez de inventarlo; el componente lo muestra como "—".
  escenarios: [
    { nombre: 'Escenario N° 1', condicion: 'Condiciones Moderadas', presupuesto: 273972.6, mantenimiento: 98761.64, combustible: 98494.41, personal: 76716.55, intervenciones: null },
    { nombre: 'Escenario N° 2', condicion: 'Condiciones Severas', presupuesto: 3595890.41, mantenimiento: 1296246.53, combustible: 1292739.19, personal: 1006904.69, intervenciones: null },
  ],

  capacidad: [
    { label: 'Maquinaria pesada', valor: 9 },
    { label: 'Volquetes', valor: 2 },
    { label: 'Cisternas', valor: 2 },
    { label: 'Vehículos de apoyo', valor: 5 },
  ],

  // Sin fuente para personal de la UBO Ancash todavía — se deja vacío (el sitio muestra
  // "Información pendiente de la UBO" en vez de un total de 0 inventado).
  personalUBO: [],

  galeria: [
    { id: 1, codigo: '089-2026-LDP-ANC', estado: 'En ejecución', img: 'ancash-1' },
    { id: 2, codigo: '100-2026-LDP-ANC', estado: 'Ejecutada', img: 'ancash-2' },
    { id: 3, codigo: '093-2026-LDP-ANC', estado: 'Ejecutada', img: 'ancash-3' },
    { id: 4, codigo: '071-2026-LDP-ANC', estado: 'Ejecutada', img: 'ancash-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Ancash',
  ],
}
