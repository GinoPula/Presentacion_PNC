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
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Santiaguillo', fichaTecnica: 'FTR-CB-PREV N° 0082-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen izquierda y derecha del río Ica', metaKm: 3.97 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Dique 1-2-3-4-5', fichaTecnica: 'FTR-MC-PREV N° 0216-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera', metaKm: 1.99 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Paralla', fichaTecnica: 'FTR-MC-PREV N° 0168-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', metaKm: 1.67 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huayanto', fichaTecnica: 'FTR-CB-PREV N° 0484-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Huayanto', metaKm: 2.2 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Dique 6-7', fichaTecnica: 'FTR-MC-PREV N° 0217-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera', metaKm: 1.19 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Dique 9', fichaTecnica: 'FTR-MC-PREV N° 0219-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en la quebrada La Yesera', metaKm: 0.91 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano Pueblo', fichaTecnica: 'FTR-CB-PREV N° 0491-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y protección con muro de concreto ciclopeo en ambas margenes de la quebrada Huancano', metaKm: 1.5 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada La Banda', fichaTecnica: 'FTR-MC-PREV N° 0167-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada La Banda', metaKm: 0.71 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Quebrada Huamani', fichaTecnica: 'FTR-MC-PREV N° 0173-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Huamani', metaKm: 0.56 },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Santa Clara-cavero', fichaTecnica: 'FTR-CB-PREV N° 0476-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', metaKm: 2.6 },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Dos Palmas', fichaTecnica: 'FTR-CB-PREV N° 0666-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', metaKm: 2.0 },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Manrique', fichaTecnica: 'FTR-CB-PREV N° 0667-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', metaKm: 0.3 },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Pacae', fichaTecnica: 'FTR-CB-PREV N° 0668-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', metaKm: 1.7 },
    { provincia: 'Pisco', distrito: 'Independencia', sector: 'Manrique-condor', fichaTecnica: 'FTR-CB-PREV N° 0669-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del Río Pisco', metaKm: 1.4 },
    { provincia: 'Pisco', distrito: 'Túpac Amaru Inca', sector: 'Capazul', fichaTecnica: 'FTR-CB-PREV N° 0477-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 1.5 },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Captación Figueroa', fichaTecnica: 'FTR-CB-PREV N° 0478-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 0.46 },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Chacarilla-mencia', fichaTecnica: 'FTR-CB-PREV N° 0479-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', metaKm: 1.13 },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Huamani', fichaTecnica: 'FTR-CB-PREV N° 0480-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 0.17 },
    { provincia: 'Pisco', distrito: 'Túpac Amaru Inca', sector: 'Nuñez', fichaTecnica: 'FTR-CB-PREV N° 0481-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 0.4 },
    { provincia: 'Pisco', distrito: 'San Clemente', sector: 'Puente Huamani', fichaTecnica: 'FTR-CB-PREV N° 0482-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', metaKm: 0.15 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Granadayoc', fichaTecnica: 'FTR-CB-PREV N° 0488-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y protección con muro de concreto ciclopeo en ambas margenes del río Pisco', metaKm: 1.1 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Reposo', fichaTecnica: 'FTR-CB-PREV N° 0489-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Pisco', metaKm: 2.1 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano', fichaTecnica: 'FTR-CB-PREV N° 0490-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Pisco', metaKm: 2.4 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Cuchilla Nueva', fichaTecnica: 'FTR-CB-PREV N° 0710-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 1.0 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Mataguey', fichaTecnica: 'FTR-CB-PREV N° 0711-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 2.5 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'El Palmar', fichaTecnica: 'FTR-CB-PREV N° 0712-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 2.0 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'La Floresta', fichaTecnica: 'FTR-CB-PREV N° 0713-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 2.2 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Parihuana', fichaTecnica: 'FTR-CB-PREV N° 0714-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Pisco', metaKm: 0.6 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Tambo Colorado', fichaTecnica: 'FTR-CB-PREV N° 0715-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', metaKm: 1.4 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Quitasol', fichaTecnica: 'FTR-CB-PREV N° 0716-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y protección con muro de concreto ciclopeo en la margen derecha e izquierda de la quebrada Veladero', metaKm: 2.5 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'San Vicente Bajo', fichaTecnica: 'FTR-CB-PREV N° 0717-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', metaKm: 0.4 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Huaya Chica', fichaTecnica: 'FTR-CB-PREV N° 0718-2025-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Pisco', metaKm: 1.8 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Virgen De Chapi', fichaTecnica: 'FTR-CB-PREV N° 0160-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Ica', metaKm: 0.55 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'La Colmena', fichaTecnica: 'FTR-CB-PREV N° 0162-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Ica', metaKm: 0.21 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Bocatoma Molinos', fichaTecnica: 'FTR-MC-PREV N° 0164-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', metaKm: 0.925 },
    { provincia: 'Ica', distrito: 'San Juan Bautista', sector: 'El Olivo', fichaTecnica: 'FTR-MC-PREV N° 0166-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', metaKm: 2.0 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Tiraxi', fichaTecnica: 'FTR-MC-PREV N° 0171-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', metaKm: 0.65 },
    { provincia: 'Ica', distrito: 'Ocucaje', sector: 'Santa Ana Ii', fichaTecnica: 'FTR-MC-PREV N° 0174-2025-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Ica', metaKm: 0.2 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Pampa Los Castillos', fichaTecnica: 'FTR-MC-PREV N° 0090-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Cocharcas', metaKm: 5.02 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano I', fichaTecnica: 'FTR-MC-PREV N° 0091-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.7 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Huancano Ii', fichaTecnica: 'FTR-MC-PREV N° 0092-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.1 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Galeria Filtrante', fichaTecnica: 'FTR-MC-PREV N° 0105-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.16 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'San Vicente Bajo', fichaTecnica: 'FTR-MC-PREV N° 0106-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.4 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Pacra Ii', fichaTecnica: 'FTR-MC-PREV N° 0107-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 0.96 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Granadayocc', fichaTecnica: 'FTR-MC-PREV N° 0108-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.3 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Quitasol-la Quinga', fichaTecnica: 'FTR-MC-PREV N° 0109-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 1.6 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Uchiza', fichaTecnica: 'FTR-MC-PREV N° 0110-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 0.87 },
    { provincia: 'Pisco', distrito: 'Huancano', sector: 'Reposo-llauta Marmolina', fichaTecnica: 'FTR-MC-PREV N° 0118-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Pisco', metaKm: 4.14 },
    { provincia: 'Chincha', distrito: 'Alto Laran', sector: 'Portachuelo', fichaTecnica: 'FTR-MC-PREV N° 0094-2026-ANA-AAA.CHCH-ALA.SJ', descripcion: 'Limpieza, descolmatación y conformación de bordos en la margen derecha del río Chico', metaKm: 0.8 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Localidad De Huarangal', fichaTecnica: 'FTR-CB-PREV N° 0085-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación, construcción de muro de concreto armado en la margen izquierda del río Tingue', metaKm: 0.724 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Tingo', fichaTecnica: 'FTR-MC-PREV N° 0136-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tingo', metaKm: 4.26 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Cocharcas', fichaTecnica: 'FTR-MC-PREV N° 0137-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Rosario', metaKm: 6.17 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Pampahuasi', fichaTecnica: 'FTR-MC-PREV N° 0138-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tingo', metaKm: 5.94 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Palmar- Carhua', fichaTecnica: 'FTR-MC-PREV N° 0139-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tingo', metaKm: 5.8 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Cerrillos-palmar', fichaTecnica: 'FTR-MC-PREV N° 0140-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tingo', metaKm: 3.46 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Espinal-huambo', fichaTecnica: 'FTR-MC-PREV N° 0141-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tingo', metaKm: 5.95 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Orongocucho I', fichaTecnica: 'FTR-MC-PREV N° 0142-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Orongocucho', metaKm: 5.6 },
    { provincia: 'Ica', distrito: 'Yauca Del Rosario', sector: 'Orongocucho Ii', fichaTecnica: 'FTR-MC-PREV N° 0143-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Orongocucho', metaKm: 5.19 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Casa Blanca', fichaTecnica: 'FTR-CB-PREV N° 0153-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación, construcción de dique con enrocado en ambas margenes del río Ica', metaKm: 6.2 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Sacta', fichaTecnica: 'FTR-CB-PREV N° 0154-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación, construcción de dique con enrocado en ambas margenes del río Ica', metaKm: 3.3 },
    { provincia: 'Ica', distrito: 'Ica', sector: 'Puente Grau-puente Cutervo', fichaTecnica: 'FTR-CB-PREV N° 0155-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación, construcción de dique con enrocado en la margen derecha del río Ica', metaKm: 0.04 },
    { provincia: 'Pisco', distrito: 'Humay', sector: 'Pacae', fichaTecnica: 'FTR-CB-PREV N° 0271-2026-ANA-AAA.CHCH-ALA.P', descripcion: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Pisco', metaKm: 0.85 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Rancheria', fichaTecnica: 'FTR-MC-PREV N° 0233-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Ica', metaKm: 2.565 },
    { provincia: 'Ica', distrito: 'Ica', sector: 'Santiago', fichaTecnica: 'FTR-MC-PREV N° 0267-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en la margen izquierda del río Ica', metaKm: 4.229 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Santiago 1', fichaTecnica: 'FTR-MC-PREV N° 0268-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Ica', metaKm: 1.26 },
    { provincia: 'Ica', distrito: 'San José De Los Molinos', sector: 'Huamani', fichaTecnica: 'FTR-CB-PREV N° 0383-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y construcción de dique enrocado en la margen derecha del río Ica', metaKm: 2.825 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Pampa Tingue I', fichaTecnica: 'FTR-MC-PREV N° 0272-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en ambas margenes de la quebrada Tingue', metaKm: 4.9 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Pampa San Antonio', fichaTecnica: 'FTR-MC-PREV N° 0273-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en ambas margenes de la quebrada Tingue', metaKm: 7.6 },
    { provincia: 'Ica', distrito: 'Santiago', sector: 'Pampa Los Castillos Ii', fichaTecnica: 'FTR-MC-PREV N° 0274-2026-ANA-AAA.CHCH-ALA.I', descripcion: 'Limpieza, descolmatación y conformación de bordos en ambas margenes de la quebrada Tingue', metaKm: 2.06 },  ],

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
