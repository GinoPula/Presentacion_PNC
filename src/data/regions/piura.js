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
import galeria from '../galeria/piura.json'

export default {
  id: 'piura',
  label: 'Región Piura',
  shortLabel: 'Piura',

  meta: {
    region: 'Región Piura',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: '2026',
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
    { provincia: 'Ayabaca', distrito: 'Ayabaca', sector: 'Sausal del Quiroz', ficha: 'FTR-MC-PREV N° 0191-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada mangos', meta: 1.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Ayabaca', distrito: 'Paimas', sector: 'Piedra Negra', ficha: 'FTR-MC-PREV N° 0101-2025-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos  y poza de disipación en la quebrada Pastoraiz', meta: 1.64, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Ayabaca', distrito: 'Paimas', sector: 'Corrales', ficha: 'FTR-MC-PREV N° 0102-2025-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos el río Santa', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Ayabaca', distrito: 'Paimas', sector: 'Algodonal', ficha: 'FTR-MC-PREV N° 0247-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Algodonal', meta: 0.57, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Ayabaca', distrito: 'Paimas', sector: 'Culqui', ficha: 'FTR-MC-PREV N° 0248-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Las Masas', meta: 2.17, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 609 },
    { provincia: 'Ayabaca', distrito: 'Paimas', sector: 'Zamba', ficha: 'FTR-MC-PREV N° 0374-2025-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del cauce del río Chipillico', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Ayabaca', distrito: 'Suyo', sector: 'Santa Rosa', ficha: 'FTR-MC-PREV N° 0133-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Suyo', meta: 1.35, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Canchaque, Mishahuaca', ficha: 'FTR-CB-PREV N° 0819-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 2.34, unidad: 'Km', responsable: 'MVCS', poblacion: 970 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Potreros', ficha: 'FTR-MC-PREV N° 0167-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 0.45, unidad: 'Km', responsable: 'MVCS', poblacion: 24 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Cashupampa', ficha: 'FTR-MC-PREV N° 0645-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa Eulalia', meta: 0.25, unidad: 'Km', responsable: 'MVCS', poblacion: 180 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Shuturumbe', ficha: 'FTR-MC-PREV N° 0646-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Jimbe (Río Nepeña)', meta: 1.0, unidad: 'Km', responsable: 'MVCS', poblacion: 90 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', sector: 'Coyona', ficha: 'FTR-MC-PREV N° 0647-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 1.8, unidad: 'Km', responsable: 'MVCS', poblacion: 450 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'El Progreso', ficha: 'FTR-CB-PREV N° 0983-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nepeña', meta: 1.2, unidad: 'Km', responsable: 'MVCS', poblacion: 154 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'Chignia Baja', ficha: 'FTR-CB-PREV N° 0984-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación en la quebrada Los Incas', meta: 1.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 161 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'Chignia Alta', ficha: 'FTR-MC-PREV N° 0660-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chaparra', meta: 0.91, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 271 },
    { provincia: 'Huancabamba', distrito: 'Huarmaca', sector: 'Hualcas', ficha: 'FTR-MC-PREV N° 0661-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada La Colpa', meta: 1.22, unidad: 'Km', responsable: 'MVCS', poblacion: 128 },
    { provincia: 'Huancabamba', distrito: 'San Miguel del Faique', sector: 'Las Huacas', ficha: 'FTR-CB-PREV N° 0985-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 1.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 265 },
    { provincia: 'Huancabamba', distrito: 'San Miguel del Faique', sector: 'San Cristóbal', ficha: 'FTR-MC-PREV N° 0168-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Masqui', meta: 0.44, unidad: 'Km', responsable: 'MVCS', poblacion: 60 },
    { provincia: 'Morropón', distrito: 'Buenos Aires', sector: 'Casero La Toma-La Matanza', ficha: 'FTR-CB-PREV N°0001-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformacion de bordos en el río Reque', meta: 0.16, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 108 },
    { provincia: 'Morropón', distrito: 'Buenos Aires', sector: 'La Toma', ficha: 'FTR-CB-PREV N°0291-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en ambas margenes del río Piura', meta: 0.05, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 108 },
    { provincia: 'Morropón', distrito: 'Chulucanas', sector: 'El Milagro-La Encantada', ficha: 'FTR-CB-PREV N°0806-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tumbes', meta: 2.9, unidad: 'Km', responsable: 'ANA', poblacion: 6500 },
    { provincia: 'Morropón', distrito: 'Chulucanas', sector: 'Filtraciones', ficha: 'FTR-MC-PREV N° 0086-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformacion de bordos en el río Zaña', meta: 2.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Morropón', distrito: 'La Matanza', sector: 'Yecala', ficha: 'FTR-MC-PREV N° 0662-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Cuculi (Chumillan)', meta: 1.1, unidad: 'Km', responsable: 'ANA', poblacion: 600 },
    { provincia: 'Morropón', distrito: 'Morropón', sector: 'San Luis', ficha: 'FTR-MC-PREV N° 0391-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Puicuto', meta: 0.9, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Morropón', distrito: 'Morropón', sector: 'Charanal 2', ficha: 'FTR-MC-PREV N° 0621-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chaparra', meta: 0.87, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 550 },
    { provincia: 'Morropón', distrito: 'Salitral', sector: 'Potreros', ficha: 'FTR-MC-PREV N° 0101-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Piura', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 12 },
    { provincia: 'Morropón', distrito: 'San Juan de Bigote', sector: 'Quemazon y Dotor', ficha: 'FTR-MC-PREV N° 0663-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chaparra', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 500 },
    { provincia: 'Morropón', distrito: 'San Juan de Bigote', sector: 'Bigote, Manzanares, San Juan Bautista y Bado de Garzas', ficha: 'FTR-MC-PREV N° 0664-2025-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Los Incas', meta: 5.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1600 },
    { provincia: 'Morropón', distrito: 'Santa Catalina de Mossa', sector: 'Linderos de Maray', ficha: 'FTR-CB-PREV N°0315-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y construción de muro de concreto armado, en ambas margenes de la quebrada Hualtacal', meta: 1.52, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 175 },
    { provincia: 'Morropón', distrito: 'Santa Catalina de Mossa', sector: 'Linderos de Maray', ficha: 'FTR-CB-PREV N°0316-2026-ANA-AAA.JZ-ALA.APH', actividad: 'Limpieza, descolmatación y construción de muro de gaviones en la margen derecha del río Corrales (Corral del Medio)', meta: 4.63, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 270 },
    { provincia: 'Paita', distrito: 'La Huaca', sector: 'Tamarindo-La Huaca', ficha: 'FTR-MC-PREV N° 0418-2025-ANA-AAA.JZ-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada La Cria', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: 700 },
    { provincia: 'Piura', distrito: 'Castilla', sector: 'El Papayo', ficha: 'FTR-CB-PREV N° 0359-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 2.212, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Piura', distrito: 'Castilla', sector: 'Río Seco', ficha: 'FTR-CB-PREV N° 0361-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 2.115, unidad: 'Km', responsable: 'ANA', poblacion: 500 },
    { provincia: 'Piura', distrito: 'Castilla', sector: 'San Fernando-San Vicente', ficha: 'FTR-MC-PREV N° 0591-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Zaña', meta: 4.0, unidad: 'Km', responsable: 'ANA', poblacion: 1000 },
    { provincia: 'Piura', distrito: 'Catacaos', sector: 'La Legua, Palo Parado, Paredones, Monte Castillo', ficha: 'FTR-CB-PREV N° 0374-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 5.14, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1500 },
    { provincia: 'Piura', distrito: 'Catacaos', sector: 'Simbila', ficha: 'FTR-MC-PREV N° 0081-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.69, unidad: 'Km', responsable: 'DEFENSA', poblacion: 2390 },
    { provincia: 'Piura', distrito: 'Catacaos', sector: 'La Legua', ficha: 'FTR-MC-PREV N° 0082-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chancay', meta: 0.52, unidad: 'Km', responsable: 'DEFENSA', poblacion: 200 },
    { provincia: 'Piura', distrito: 'Catacaos', sector: 'Juan de Mori', ficha: 'FTR-MC-PREV N° 0083-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y cy conformación de bordos en ambas margenes del río Samanco (Río Nepeña)', meta: 1.4, unidad: 'Km', responsable: 'DEFENSA', poblacion: 12124 },
    { provincia: 'Piura', distrito: 'Catacaos', sector: 'Monte Sullon', ficha: 'FTR-MC-PREV N° 0084-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.19, unidad: 'Km', responsable: 'DEFENSA', poblacion: 200 },
    { provincia: 'Piura', distrito: 'Cura Mori', sector: 'Nuevo Zona More-Nuevo San Antonio', ficha: 'FTR-CB-PREV N° 0364-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada El Progreso', meta: 2.72, unidad: 'Km', responsable: 'ANA', poblacion: 80 },
    { provincia: 'Piura', distrito: 'Curamori', sector: 'Chato Chico', ficha: 'FTR-MC-PREV N° 0594-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos  en el río Tumbes', meta: 1.9, unidad: 'Km', responsable: 'ANA', poblacion: 800 },
    { provincia: 'Piura', distrito: 'Curamori', sector: 'Chato Curamori', ficha: 'FTR-MC-PREV N° 0595-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambillos', meta: 2.15, unidad: 'Km', responsable: 'ANA', poblacion: 500 },
    { provincia: 'Piura', distrito: 'El Tallan', sector: 'Nuevo Sinchao Chico-Nuevo Tallan-El Tabanco', ficha: 'FTR-CB-PREV N° 0365-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tumbes', meta: 6.2, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Piura', distrito: 'La Arena', sector: 'Nuevo Casarana-Mocara', ficha: 'FTR-CB-PREV N° 0375-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río La Leche (Río Moyan)', meta: 1.43, unidad: 'Km', responsable: 'DEFENSA', poblacion: 250 },
    { provincia: 'Piura', distrito: 'La Arena', sector: 'Casarana-Puente Independencia', ficha: 'FTR-MC-PREV N° 0596-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.8, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1500 },
    { provincia: 'Piura', distrito: 'Las Lomas', sector: 'Huachuma Alta', ficha: 'FTR-CB-PREV N° 0302-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Pastoraiz', meta: 1.72, unidad: 'Km', responsable: 'ANA', poblacion: 110 },
    { provincia: 'Piura', distrito: 'Las Lomas', sector: 'Puente Las Lomas', ficha: 'FTR-MC-PREV N° 0100-2025-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chipillico', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 450 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Ejidos de Huan-Ejidos de Mariposa', ficha: 'FTR-CB-PREV N° 0360-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nanchoc', meta: 1.863, unidad: 'Km', responsable: 'ANA', poblacion: 80 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Los Ejidos del Norte', ficha: 'FTR-CB-PREV N° 0362-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 1.136, unidad: 'Km', responsable: 'ANA', poblacion: 2121 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Coscobamba', ficha: 'FTR-CB-PREV N° 0363-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y y conformación de bordos en ambas margenes del río Samanco (Río Nepeña)', meta: 2.842, unidad: 'Km', responsable: 'DEFENSA', poblacion: 50 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Cerezal y El Papayo', ficha: 'FTR-MC-PREV N° 0414-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.9, unidad: 'Km', responsable: 'ANA', poblacion: 500 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Ejidos-Puente Bolognesi', ficha: 'FTR-MC-PREV N° 0590-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y y conformación de bordos en el río Piura', meta: 4.85, unidad: 'Km', responsable: 'ANA', poblacion: 15000 },
    { provincia: 'Piura', distrito: 'Piura', sector: 'Mariposa-Santa Ana', ficha: 'FTR-MC-PREV N° 0592-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Pastoraiz', meta: 1.6, unidad: 'Km', responsable: 'ANA', poblacion: 500 },
    { provincia: 'Piura', distrito: 'Tambo Grande', sector: 'San Martíin', ficha: 'FTR-MC-PREV N° 0314-2025-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Salas', meta: 2.0, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Las Zapatas', ficha: 'FTR-CB-PREV N° 0343-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 2.658, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Tambo Grande', ficha: 'FTR-CB-PREV N° 0344-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y construcción de dique enrocado en la margen derecha del río Piura', meta: 1.357, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 26254 },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Progreso Alto', ficha: 'FTR-CB-PREV N° 0345-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y construcción de geobolsas en la margen izquierda del río Piura', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 537 },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'La Peñita y Santa Paula', ficha: 'FTR-CB-PREV N° 0346-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y construcción de geobolsas en la margen derecha del río Piura', meta: 3.017, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2181 },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Locuto', ficha: 'FTR-CB-PREV N° 0358-2026-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Grande', meta: 1.366, unidad: 'Km', responsable: 'ANA', poblacion: 2008 },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Las Huacas', ficha: 'FTR-MC-PREV N° 0130-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Francisco', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Chipillico Alto', ficha: 'FTR-MC-PREV N° 0131-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Francisco', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 75 },
    { provincia: 'Piura', distrito: 'Tambogrande', sector: 'Jimenez', ficha: 'FTR-MC-PREV N° 0190-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Carneros', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Piura', distrito: 'Ventiseis de Octubre', sector: 'Los Pajaritos', ficha: 'FTR-MC-PREV N° 0593-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 2.3, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Sechura', distrito: 'Sechura', sector: 'Dique Virrilá', ficha: 'FTR-CB-PREV N° 0797-2025-ANA-AAA.JZ-ALA.MBP', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Piura', meta: 0.321, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15000 },
    { provincia: 'Sullana', distrito: 'Querecotillo', sector: 'Potreritos', ficha: 'FTR-MC-PREV N° 0035-2026-ANA-AAA.JZ-ALA.CH', actividad: 'Limpieza, descolmatación y conformación en el río Lacramarca', meta: 1.8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Sullana', distrito: 'Querecotillo', sector: 'Potreritos 2', ficha: 'FTR-MC-PREV N° 0265-2026-ANA-AAA.JZ-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chira', meta: 0.55, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Sullana', distrito: 'Sullana', sector: 'Limonal', ficha: 'FTR-MC-PREV N° 0034-2026-ANA-AAA.JZ-ALA.CH', actividad: 'Limpieza, descolmatación y consformación de bordos en el río Lacramarca', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Sullana', distrito: 'Sullana', sector: 'Jibito', ficha: 'FTR-MC-PREV N° 0128-2026-ANA-AAA.JZ-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chira', meta: 0.9, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Sullana', distrito: 'Sullana', sector: 'Somate Alto', ficha: 'FTR-MC-PREV N° 0132-2026-ANA-AAA.JZ-ALA.SL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Carbajal', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 10 },
  ],
  todosResponsablesResumen: { ana: 22, midagri: 31, defensa: 8, mtc: 0, mvcs: 8, total: 69 },

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

  // Resumen del Presupuesto FEN para esta región (agregado 03/09/2026, a pedido de Franco: el
  // mismo detalle que se armó para la Vista General -- ver comentario grande junto a
  // presupuestoFenResumenGlobal en src/data/global.js) -- mismas 2 fuentes, filtradas por
  // Departamento = PIURA:
  //   puntosCriticos/materialM3/poblacionBeneficiada/demandaMef: "Demandas 2026 FEN- Formato
  //     Cronograma Meta Fisica FINALV2_010926.xlsx" (fila a fila, 118 filas de Piura).
  //   longitudKm: "programacion_no_fen.xlsx", hoja FINAL, fila PIURA -- es la única de las dos que
  //     trae Km.
  presupuestoFenResumen: {
    fechaCorte: '01/09/2026',
    puntosCriticos: 118,
    materialM3: 1375023.3,
    longitudKm: 179.638,
    poblacionBeneficiada: 357577,
    demandaMef: 5554421.54,
  },

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

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/piura.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Piura',
  ],
}
