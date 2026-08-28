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
    { provincia: 'Chincha', distrito: 'Alto Laran', sector: 'Portachuelo', ficha: 'FTR-MC-PREV N° 0094-2026-ANA-AAA.CHCH-ALA.SJ', actividad: 'Limpieza, descolmatación y conformación de bordos en la margen derecha del río Chico', meta: 0.8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 215 },
    { provincia: 'Chincha', distrito: 'Chincha Baja', sector: 'Cañapay-Valencia', ficha: 'FTR-CB-PREV N° 0431-2026-ANA-AAA.CHCH-ALA.SJ', actividad: 'Limpieza, descolmatación, construcción de dique con enrocado en la margen izquierda del río Matagente', meta: 1.55, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 220 },
    { provincia: 'Ica', distrito: 'Ica', sector: 'Puente Grau-Puente Cutervo', ficha: 'FTR-CB-PREV N° 0155-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, construcción de dique con enrocado en la margen derecha del río Ica', meta: 0.04, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 3000 },
    { provincia: 'Ica', distrito: 'Ica', sector: 'Santiago', ficha: 'FTR-MC-PREV N° 0267-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en la margen izquierda del río Ica', meta: 4.229, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Ica', distrito: 'La Tinguiña', sector: 'Chanchajalla', ficha: 'FTR-CB-PREV N° 0058-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Ica', meta: 0.38, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2500 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Virgen de Chapi', ficha: 'FTR-CB-PREV N° 0160-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Ica', meta: 0.55, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 40 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'La Colmena', ficha: 'FTR-CB-PREV N° 0162-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Ica', meta: 0.21, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 5 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Paralla', ficha: 'FTR-MC-PREV N° 0168-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 1.67, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Santa Ana II', ficha: 'FTR-MC-PREV N° 0174-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Bocatoma Molinos', ficha: 'FTR-MC-PREV N° 0164-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', meta: 0.925, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 6 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada La Banda', ficha: 'FTR-MC-PREV N° 0167-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.71, unidad: 'Km', responsable: 'MVCS', poblacion: null },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Tiraxi', ficha: 'FTR-MC-PREV N° 0171-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', meta: 0.65, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 6 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada Huamani', ficha: 'FTR-MC-PREV N° 0173-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 0.56, unidad: 'Km', responsable: 'MVCS', poblacion: 300 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Casa Blanca', ficha: 'FTR-CB-PREV N° 0153-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, construcción de dique con enrocado en ambas margenes del río Ica', meta: 6.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 150 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Huamani', ficha: 'FTR-CB-PREV N° 0383-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y construcción de dique enrocado en la margen derecha del río Ica', meta: 2.825, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 28 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 1-2-3-4-5', ficha: 'FTR-MC-PREV N° 0216-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa Eulalia', meta: 1.99, unidad: 'Km', responsable: 'MVCS', poblacion: 2078 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 6-7', ficha: 'FTR-MC-PREV N° 0217-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformacion de bordos en el río Santa', meta: 1.19, unidad: 'Km', responsable: 'MVCS', poblacion: 1243 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 8', ficha: 'FTR-MC-PREV N° 0218-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.22, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 231 },
    { provincia: 'Ica', distrito: 'San José de Los Molinos', sector: 'Dique 9', ficha: 'FTR-MC-PREV N° 0219-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chusgón', meta: 0.91, unidad: 'Km', responsable: 'MVCS', poblacion: 950 },
    { provincia: 'Ica', distrito: 'San Juan Bautista', sector: 'El Olivo', ficha: 'FTR-MC-PREV N° 0166-2025-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1236 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Santiaguillo', ficha: 'FTR-CB-PREV N° 0082-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y y conformación de bordos en la margen izquierda y derecha del río Ica', meta: 3.97, unidad: 'Km', responsable: 'DEFENSA', poblacion: 350 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Sacta', ficha: 'FTR-CB-PREV N° 0154-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, construcción de dique con enrocado en ambas margenes del río Ica', meta: 3.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 22 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Pampa Los Castillos', ficha: 'FTR-MC-PREV N° 0090-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Cocharcas', meta: 5.02, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 722 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Santiago 1', ficha: 'FTR-MC-PREV N° 0268-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Ica', meta: 1.26, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Ica', distrito: 'Yauca del Rosario', sector: 'Quebrada Cansas Parte Media', ficha: 'FTR-MC-PREV N° 0041-2026-ANA-AAA.CHCH-ALA.I', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.12, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 4500 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huayanto', ficha: 'FTR-CB-PREV N° 0484-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada La Cárcel (Río Udima)', meta: 2.2, unidad: 'Km', responsable: 'MVCS', poblacion: 23 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Pacra', ficha: 'FTR-CB-PREV N° 0486-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pisco', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Muralla', ficha: 'FTR-CB-PREV N° 0487-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pisco', meta: 0.33, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Granadayoc', ficha: 'FTR-CB-PREV N° 0488-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 1.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Reposo', ficha: 'FTR-CB-PREV N° 0489-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Pisco', meta: 2.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 110 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano', ficha: 'FTR-CB-PREV N° 0490-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Pisco', meta: 2.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano Pueblo', ficha: 'FTR-CB-PREV N° 0491-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de borodos en el río Chicama', meta: 1.5, unidad: 'Km', responsable: 'MVCS', poblacion: 200 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Quitasol', ficha: 'FTR-CB-PREV N° 0716-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y protección con muro de concreto ciclopeo en la margen derecha e izquierda de la quebrada Veladero', meta: 2.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 150 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Pacra II', ficha: 'FTR-MC-PREV N° 0107-2026-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', meta: 0.96, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 18 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Reposo-Llauta Marmolina', ficha: 'FTR-MC-PREV N° 0118-2026-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', meta: 4.14, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 51 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Pacae', ficha: 'FTR-CB-PREV N° 0271-2026-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Pisco', meta: 0.85, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Cuchilla Nueva', ficha: 'FTR-CB-PREV N° 0710-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Mataguey', ficha: 'FTR-CB-PREV N° 0711-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 2.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'El Palmar', ficha: 'FTR-CB-PREV N° 0712-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'La Floresta', ficha: 'FTR-CB-PREV N° 0713-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 2.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Parihuana', ficha: 'FTR-CB-PREV N° 0714-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Tambo Colorado', ficha: 'FTR-CB-PREV N° 0715-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', meta: 1.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Huaya Chica', ficha: 'FTR-CB-PREV N° 0718-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', meta: 1.8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Dos Palmas', ficha: 'FTR-CB-PREV N° 0666-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Manrique', ficha: 'FTR-CB-PREV N° 0667-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Pacae', ficha: 'FTR-CB-PREV N° 0668-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', meta: 1.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Manrique-Condor', ficha: 'FTR-CB-PREV N° 0669-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', meta: 1.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Captación Figueroa', ficha: 'FTR-CB-PREV N° 0478-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 0.46, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Huamani', ficha: 'FTR-CB-PREV N° 0480-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 0.17, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Santa Clara-Cavero', ficha: 'FTR-CB-PREV N° 0476-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', meta: 2.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Chacarilla-Mencia', ficha: 'FTR-CB-PREV N° 0479-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', meta: 1.13, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Puente Huamani', ficha: 'FTR-CB-PREV N° 0482-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Túpac Amaru Inca', sector: 'Capazul', ficha: 'FTR-CB-PREV N° 0477-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pisco', distrito: 'Túpac Amaru Inca', sector: 'Nuñez', ficha: 'FTR-CB-PREV N° 0481-2025-ANA-AAA.CHCH-ALA.P', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
  ],
  todosResponsablesResumen: { ana: 0, midagri: 45, defensa: 2, mtc: 0, mvcs: 7, total: 54 },

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
