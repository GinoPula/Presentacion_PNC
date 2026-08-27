// Datos de la región Ica (7ma región, agregada el 25/08/2026).
//
// Ejecutadas/en ejecución/programadas + mapa: reporte 'inter_20260824204815.xlsx' exportado
// del MAIN (24/08/2026) — validado contra los totales narrados en la Memoria de Ayuda Ica
// (22 ejecutadas 2026, 1 en ejecución, 12 programadas: coinciden exactamente). El m3/km usa
// ACUMULADO_VOL/ACUMULADO_KM (avance real), no META_VOL/META_KM (meta contratada).
//
// Convenios y flota: el usuario no subió PNC_CONVENIOS.xlsx / Estado_Maquinarias.xlsx
// específicos para esta ronda de Ica, así que se reutilizaron los mismos archivos nacionales
// ya usados para Ancash/Lambayeque (filtrados a UBO=ICA): PNC_CONVENIOS.xlsx (corte
// 19/08/2026, 6 convenios vigentes de 19 registrados) y Estado_Maquinarias.xlsx (corte
// 14/08/2026, 14 unidades: 13 operativas y 1 inoperativa).
//
// Escenarios FEN/presupuesto: sin fuente para Ica. 'DATA_PRESUPUESTO_REGIONES_NORTE.xlsx'
// (usado en Piura/Tumbes/Lambayeque/Ancash) está circunscrito a las regiones del norte
// (Piura, Tumbes, Lambayeque, La Libertad, Ancash, Cajamarca, Lima) y no incluye una fila
// para Ica, que es una región de la costa centro-sur. Se deja la sección sin datos
// (escenarios: null, igual que Tacna) en vez de inventar cifras — si el usuario consigue un
// archivo de presupuesto FEN que sí cubra Ica, se puede completar después.
//
// Puntos críticos ANA: EXCEL_CONSOLIDADO_569_oficial_PARA_OFICIALIZAR_1.xlsx, hoja
// CONSOLIDADO, filtrado a DEPARTAMENTO=Ica (69 puntos -- el usuario subió la base completa de
// ANA en vez de un extracto curado, así que se muestran los 69 sin recortar, igual que en
// Lambayeque).
//
// Personal UBO: sin fuente todavía — sección queda vacía hasta contar con ese dato (igual que
// Ancash/Lambayeque).
//
// Fotos: las 4 subidas por el usuario, ligadas a sus fichas técnicas según su propio texto
// (041 = ejecutada San José de los Molinos/Ica, sector Yancay; 039 = ejecutada Nasca/Nasca,
// sector San Mauricio; 020 = ejecutada Nasca/Nasca, sector Curve; 035 = ejecutada San José de
// los Molinos/Ica, sector Ranchería) — confirmado el estado y distrito/provincia de cada
// ficha contra el mapa antes de asignarlas.
import datosBD from './_generated/ica'

export default {
  id: 'ica',
  label: 'Región Ica',
  shortLabel: 'Ica',

  meta: {
    region: 'Región Ica',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  puntosCriticos: [
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 1-2-3-4-5', fichaTecnica: 'FTR-MC-PREV N° 0216-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera.', metaKm: 1.99 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huayanto', fichaTecnica: 'FTR-CB-PREV N° 0484-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas márgenes de la quebrada Huayanto.', metaKm: 2.2 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 6-7', fichaTecnica: 'FTR-MC-PREV N° 0217-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera.', metaKm: 1.19 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 9', fichaTecnica: 'FTR-MC-PREV N° 0219-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera.', metaKm: 0.91 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano Pueblo', fichaTecnica: 'FTR-CB-PREV N° 0491-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y protección con muro de concreto ciclopeo en ambas márgenes de la quebrada Huancano.', metaKm: 1.5 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada La Banda', fichaTecnica: 'FTR-MC-PREV N° 0167-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada La Banda.', metaKm: 0.71 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada Huamani', fichaTecnica: 'FTR-MC-PREV N° 0173-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Huamani.', metaKm: 0.56 },
  ],

  escenarios: null,

  capacidad: [
    { label: 'Maquinaria pesada', valor: 6 },
    { label: 'Volquetes', valor: 3 },
    { label: 'Cisternas', valor: 2 },
    { label: 'Vehículos de apoyo', valor: 3 },
  ],

  personalUBO: [],

  galeria: [
    { id: 1, codigo: 'FT I N°041-2026-LDP-ICA', estado: 'Ejecutada', img: 'ica-1' },
    { id: 2, codigo: 'FT I N°039-2026-LDP-ICA', estado: 'Ejecutada', img: 'ica-2' },
    { id: 3, codigo: 'FTI N°020-2026-LDP-ICA', estado: 'Ejecutada', img: 'ica-3' },
    { id: 4, codigo: 'FT I N°035-2026-LDP-ICA', estado: 'Ejecutada', img: 'ica-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Ica',
  ],
}
