// Datos de la región Lambayeque (6ta región, agregada el 24/08/2026).
//
// Ejecutadas/en ejecución/programadas + mapa: reporte 'inter_20260824112857.xlsx' exportado
// del MAIN (24/08/2026) — validado contra los totales narrados en la Memoria de Ayuda
// Lambayeque (31 ejecutadas 2026, 5 en ejecución, 13 programadas: coinciden exactamente,
// incluyendo la población beneficiada por tipo de actividad). El m3/km usa ACUMULADO_VOL/
// ACUMULADO_KM (avance real), no META_VOL/META_KM (meta contratada) — ver nota en
// mapaIntervenciones.js sobre el bug de pipeline corregido en este mismo refresco.
//
// Convenios y flota: el usuario no subió PNC_CONVENIOS.xlsx / Estado_Maquinarias.xlsx
// específicos para esta ronda de Lambayeque, así que se reutilizaron los mismos archivos
// nacionales ya usados para Ancash (filtrados a UBO=LAMBAYEQUE): PNC_CONVENIOS.xlsx (corte
// 19/08/2026) y Estado_Maquinarias.xlsx (corte 14/08/2026 -- snapshot algo más antiguo que
// el resto de los datos de esta región; avisar si se consigue uno más fresco).
//
// Escenarios FEN/presupuesto: DATA_PRESUPUESTO_REGIONES_NORTE.xlsx (fila Lambayeque).
// Ese archivo no trae el número de intervenciones proyectadas por escenario -- se deja en
// blanco ("—") en vez de inventarlo, igual que en Ancash.
//
// Puntos críticos ANA: EXCEL_CONSOLIDADO_569_oficial_PARA_OFICIALIZAR_1.xlsx, hoja
// CONSOLIDADO, filtrado a DEPARTAMENTO=Lambayeque (37 puntos -- a diferencia de las otras
// regiones, aquí el usuario subió la base completa de ANA en vez de un extracto curado, así
// que se muestran los 37 sin recortar).
//
// Personal UBO: sin fuente todavía — sección queda vacía hasta contar con ese dato (igual
// que Ancash).
//
// Fotos: las 4 subidas por el usuario, ligadas a sus fichas técnicas según su propio texto
// (016 = ejecutada Lambayeque/Lambayeque, 029 = ejecutada Pimentel/Chiclayo, 032 = en
// ejecución Pimentel/Chiclayo, 036 = ejecutada Monsefú/Chiclayo) — confirmado el estado y
// distrito/provincia de cada ficha contra el mapa antes de asignarlas.
//
// Refrescado otra vez el mismo día con 'inter_20260824204815.xlsx' (~9h después, sin cambio
// de lógica) para reflejar avances incrementales del MAIN en programadas y en ejecución.
import datosBD from './_generated/lambayeque'

export default {
  id: 'lambayeque',
  label: 'Región Lambayeque',
  shortLabel: 'Lambayeque',

  meta: {
    region: 'Región Lambayeque',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  puntosCriticos: [
    { provincia: 'Chiclayo', distrito: 'Patapo', sector: 'La Cria', fichaTecnica: 'FTR-CB-PREV N° 0736-2025-ANA-AAA.JZ-ALA.CHL', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado, en la margen izquierda de la quebrada La Cria.', metaKm: 0.29 },
    { provincia: 'Chiclayo', distrito: 'Chongoyape', sector: 'Cuculi', fichaTecnica: 'FTR-CB-PREV N° 0735-2025-ANA-AAA.JZ-ALA.CHL', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado, en la margen derecha de la quebrada Cuculi (Chumillan).', metaKm: 1.23 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Sanquelito 2-CP. Mocape', fichaTecnica: 'FTR-MC-PREV N° 0677-2025-ANA-AAA.JZ-ALA.MOLL', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Algodones (Río Doris).', metaKm: 0.48 },
  ],

  escenarios: [
    {
      nombre: 'Escenario N° 1',
      condicion: 'Condiciones Moderadas',
      presupuesto: 410958.9,
      mantenimiento: 148142.46,
      combustible: 147741.62,
      personal: 115074.82,
      intervenciones: null,
    },
    {
      nombre: 'Escenario N° 2',
      condicion: 'Condiciones Severas',
      presupuesto: 1232876.71,
      mantenimiento: 444427.38,
      combustible: 443224.86,
      personal: 345224.47,
      intervenciones: null,
    },
  ],

  capacidad: [
    { label: 'Maquinaria pesada', valor: 7 },
    { label: 'Volquetes', valor: 7 },
    { label: 'Cisternas', valor: 3 },
    { label: 'Vehículos de apoyo', valor: 6 },
  ],

  personalUBO: [],

  galeria: [
    { id: 1, codigo: '016-2026-LD-PI-LAM', estado: 'Ejecutada', img: 'lambayeque-1' },
    { id: 2, codigo: '029-2026-LD-P-LAM', estado: 'Ejecutada', img: 'lambayeque-2' },
    { id: 3, codigo: '032-2026-LD-P-LAM', estado: 'En ejecución', img: 'lambayeque-3' },
    { id: 4, codigo: '036-2026-LD-P-LAM', estado: 'Ejecutada', img: 'lambayeque-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Lambayeque',
  ],
}
