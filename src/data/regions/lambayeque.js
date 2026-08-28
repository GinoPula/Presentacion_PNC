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
    { provincia: 'Chiclayo', distrito: 'Cayalti', sector: 'Puente Fierro', ficha: 'FTR-CB-PREV N° 0059-2026-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en ambas margenes del río Zaña', meta: 2.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Chongoyape', sector: 'Pampa Grande', ficha: 'FTR-CB-PREV N° 0258-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cascajal', meta: 0.65, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Chongoyape', sector: 'Cuculi', ficha: 'FTR-CB-PREV N° 0735-2025-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 1.23, unidad: 'Km', responsable: 'MVCS', poblacion: 1422 },
    { provincia: 'Chiclayo', distrito: 'Lagunas', sector: 'Pueblo Libre-Peroles', ficha: 'FTR-CB-PREV N° 0540-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 0.63, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Chiclayo', distrito: 'Monsefu', sector: 'CC. San Pedro', ficha: 'FTR-CB-PREV N° 0083-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 3.45, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Monsefu', sector: 'Cerro San Bartolo 1', ficha: 'FTR-CB-PREV N° 0260-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Reque', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Chiclayo', distrito: 'Monsefu', sector: 'Cerro San Bartolo 2', ficha: 'FTR-CB-PREV N° 0261-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Reque', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 98 },
    { provincia: 'Chiclayo', distrito: 'Nueva Arica', sector: 'El Palmo', ficha: 'FTR-CB-PREV N° 0469-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Nanchoc', meta: 1.12, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Nueva Arica', sector: 'Collao', ficha: 'FTR-CB-PREV N° 0470-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el Río Pisco', meta: 0.75, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Nueva Arica', sector: 'Dos Cruces', ficha: 'FTR-CB-PREV N° 0471-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el Río Pisco', meta: 0.82, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Oyotun', sector: 'Chumbenique 1', ficha: 'FTR-CB-PREV N° 0061-2026-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chancay', meta: 1.6, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Oyotun', sector: 'Chumbenique 2', ficha: 'FTR-CB-PREV N° 0062-2026-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos y poza de disipación en la quebrada S/N', meta: 0.65, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Oyotun', sector: 'Chumbenique 3', ficha: 'FTR-CB-PREV N° 0063-2026-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Lacramarca', meta: 1.54, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Oyotun', sector: 'Algarrobal Alto', ficha: 'FTR-CB-PREV N° 0064-2026-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en la margen derecha del río Nanchoc', meta: 0.8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 4 },
    { provincia: 'Chiclayo', distrito: 'Oyotún', sector: 'El Espinal', ficha: 'FTR-CB-PREV N° 0466-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el cauce del río Rímac', meta: 1.04, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 32 },
    { provincia: 'Chiclayo', distrito: 'Oyotún', sector: 'El Ocho', ficha: 'FTR-CB-PREV N° 0467-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el Río Pisco', meta: 2.23, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 32 },
    { provincia: 'Chiclayo', distrito: 'Oyotún', sector: 'Macuaco', ficha: 'FTR-CB-PREV N° 0474-2025-ANA-AAA.JZ-ALA.Z', actividad: 'Limpieza, descolmatación y conformación de bordos en el Río Pisco', meta: 2.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 36 },
    { provincia: 'Chiclayo', distrito: 'Patapo', sector: 'La Cria', ficha: 'FTR-CB-PREV N° 0736-2025-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nanchoc', meta: 0.29, unidad: 'Km', responsable: 'MVCS', poblacion: 2886 },
    { provincia: 'Chiclayo', distrito: 'Pucala', sector: 'Botadero', ficha: 'FTR-CB-PREV N° 0254-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Reque', meta: 1.727, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 21 },
    { provincia: 'Chiclayo', distrito: 'Pucala', sector: 'San Roque', ficha: 'FTR-CB-PREV N° 0256-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en ambas margenes del río Reque', meta: 1.39, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Pucala', sector: 'San Roque-Huaca de Piedra', ficha: 'FTR-CB-PREV N° 0257-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en ambas margenes del río Reque', meta: 0.956, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Chiclayo', distrito: 'Saña', sector: 'Cholocal', ficha: 'FTR-CB-PREV N° 0255-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen izquierda del río Reque', meta: 0.27, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 24 },
    { provincia: 'Chiclayo', distrito: 'Tuman', sector: 'Rinconazo', ficha: 'FTR-CB-PREV N° 0259-2026-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en ambas margenes del río Reque', meta: 3.444, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 205 },
    { provincia: 'Ferreñafe', distrito: 'Incahuasi', sector: 'Laquipampa', ficha: 'FTR-CB-PREV N° 0739-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.32, unidad: 'Km', responsable: 'ANA', poblacion: 269 },
    { provincia: 'Ferreñafe', distrito: 'Incahuasi', sector: 'La Isla', ficha: 'FTR-MC-PREV N° 0289-2026-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: 120 },
    { provincia: 'Ferreñafe', distrito: 'Manuel Antonio Mesones Muro', sector: 'Mesones Muro', ficha: 'FTR-CB-PREV N° 0737-2025-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pijobamba', meta: 1.88, unidad: 'Km', responsable: 'ANA', poblacion: 30 },
    { provincia: 'Ferreñafe', distrito: 'Manuel Antonio Mesones Muro', sector: 'Mesones Muro', ficha: 'FTR-CB-PREV N° 0738-2025-ANA-AAA.JZ-ALA.CHL', actividad: 'Limpieza, descolmatación y construcción de bordos en el río Santa Eulalia', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 34843 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'La Florida', ficha: 'FTR-MC-PREV N° 0120-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Las Ovejas', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'Manchuria', ficha: 'FTR-MC-PREV N° 0290-2026-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 3.0, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'El Palto', ficha: 'FTR-MC-PREV N° 0552-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río La Leche', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'San Juan II', ficha: 'FTR-MC-PREV N° 0553-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río La Leche', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'Mayascon-Compuerta Batan Grande', ficha: 'FTR-MC-PREV N° 0554-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada La Naranja (Qda. El Ocho)', meta: 0.5, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'Mochumi Viejo-Canal Firruñaf', ficha: 'FTR-MC-PREV N° 0696-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río La Leche', meta: 0.65, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'Canal Mochumi Viejo', ficha: 'FTR-MC-PREV N° 0697-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río La Leche', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 350 },
    { provincia: 'Ferreñafe', distrito: 'Pitipo', sector: 'Canal La Garza', ficha: 'FTR-MC-PREV N° 0698-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.3, unidad: 'Km', responsable: 'ANA', poblacion: 200 },
    { provincia: 'Lambayeque', distrito: 'Morrope', sector: 'El Hornito-La Colorada', ficha: 'FTR-MC-PREV N° 0288-2026-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tumbes', meta: 0.875, unidad: 'Km', responsable: 'ANA', poblacion: 1500 },
    { provincia: 'Lambayeque', distrito: 'Motupe', sector: 'San Isidro', ficha: 'FTR-CB-PREV N° 0856-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chipillico', meta: 1.9, unidad: 'Km', responsable: 'ANA', poblacion: 2100 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Pañala Bajo', ficha: 'FTR-CB-PREV N° 0156-2026-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y construcción de geobolsas, en la margen derecha e izquierda del río Olmos', meta: 5.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 260 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Ancol', ficha: 'FTR-CB-PREV N° 0785-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 0.67, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 462 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Playa Cascajal', ficha: 'FTR-CB-PREV N° 0786-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Limón', meta: 1.445, unidad: 'Km', responsable: 'ANA', poblacion: 560 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Cerro La Virgen', ficha: 'FTR-MC-PREV N° 0473-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Insculas', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Sanquelito-CP. Mocape', ficha: 'FTR-MC-PREV N° 0551-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el Río Pisco', meta: 2.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 320 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Sanquelito 2-CP. Mocape', ficha: 'FTR-MC-PREV N° 0677-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Jancapampa', meta: 0.48, unidad: 'Km', responsable: 'MVCS', poblacion: null },
    { provincia: 'Lambayeque', distrito: 'Salas', sector: 'La Pilca', ficha: 'FTR-CB-PREV N° 0348-2025-ANA-AAA.JZ-ALA.MOLL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa Eulalia', meta: 1.7, unidad: 'Km', responsable: 'ANA', poblacion: 2000 },
  ],
  todosResponsablesResumen: { ana: 13, midagri: 26, defensa: 2, mtc: 0, mvcs: 3, total: 44 },

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
