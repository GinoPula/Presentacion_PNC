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
import galeria from '../galeria/ancash.json'

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
    { provincia: 'Bolognesi', distrito: 'Huasta', sector: 'San Isidro', ficha: 'FTR-CB-PREV N° 0538-2025 ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.19, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Carlos Fermin Fitzcarrald', distrito: 'San Luis', sector: 'Chacapata', ficha: 'FTR-CB-PREV N° 0826-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Potrero Las Yeguas (Pampa Las Yeguas)', meta: 0.18, unidad: 'Km', responsable: 'MVCS', poblacion: 50 },
    { provincia: 'Casma', distrito: 'Yautan', sector: 'Pueblo Yautan', ficha: 'FTR-MC-PREV N° 0188-2026-ANA-AAA.HCH-ALA.CHUARMEY', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Yautan', meta: 1.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1200 },
    { provincia: 'Casma', distrito: 'Yautan', sector: 'Tomeque', ficha: 'FTR-MC-PREV N° 0189-2026-ANA-AAA.HCH-ALA.CHUARMEY', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Tomeque', meta: 2.445, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 320 },
    { provincia: 'Huari', distrito: 'Uco', sector: 'Batan', ficha: 'FTR-CB-PREV N° 0926-2025-ANA-AAA.M-ALA.HUARI', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 0.22, unidad: 'Km', responsable: 'MTC', poblacion: 10 },
    { provincia: 'Huari', distrito: 'Uco', sector: 'Tarapampa', ficha: 'FTR-CB-PREV N° 0927-2025-ANA-AAA.M-ALA.HUARI', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Lacramarca', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Mariscal Luzuriaga', distrito: 'Lucma', sector: 'Charac', ficha: 'FTR-CB-PREV N° 0823-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y construción de bordos en el río Piura', meta: 0.34, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 56 },
    { provincia: 'Mariscal Luzuriaga', distrito: 'Lucma', sector: 'Masqui', ficha: 'FTR-CB-PREV N° 0824-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y construción de bordos en la quebrada Hualtacal', meta: 0.68, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 48 },
    { provincia: 'Mariscal Luzuriaga', distrito: 'Lucma', sector: 'Quishuar', ficha: 'FTR-CB-PREV N° 0825-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Corrales (Corral del Medio)', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 20 },
    { provincia: 'Pomabamba', distrito: 'Parobamba', sector: 'Parobamba', ficha: 'FTR-MC-PREV N° 0570-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 0.87, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 400 },
    { provincia: 'Pomabamba', distrito: 'Pomabamba', sector: 'Geusha-Angascancha', ficha: 'FTR-CB-PREV N° 0835-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 9.61, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Pomabamba', distrito: 'Pomabamba', sector: 'Parco', ficha: 'FTR-CB-PREV N° 0836-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nanchoc', meta: 0.66, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Pomabamba', distrito: 'Pomabamba', sector: 'Jancapampa', ficha: 'FTR-CB-PREV N° 0837-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Olmos', meta: 0.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Río Lacramarca Puente Panamericana', ficha: 'FTR-CB-PREV N° 0080-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique enrocado en ambas margenes del río Lacramarca', meta: 0.22, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 7456 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Río Lacramarca Puente Pardo', ficha: 'FTR-CB-PREV N° 0081-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique enrocado en ambas margenes del río Lacramarca', meta: 0.36, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 7472 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Jose', ficha: 'FTR-CB-PREV N° 0094-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en la margen derecha e izquierda del río Lacramarca', meta: 0.24, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 500 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Santa Clemencia', ficha: 'FTR-CB-PREV N° 0095-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en la margen derecha e izquierda del río Lacramarca', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 519 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'La Cantera I', ficha: 'FTR-CB-PREV N° 0096-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Puchka', meta: 0.1, unidad: 'Km', responsable: 'ANA', poblacion: 200 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Cerro Blanco I', ficha: 'FTR-CB-PREV N° 0097-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Huaura', meta: 0.04, unidad: 'Km', responsable: 'ANA', poblacion: 40 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'La Cantera II', ficha: 'FTR-CB-PREV N° 0098-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Puchka', meta: 0.1, unidad: 'Km', responsable: 'ANA', poblacion: 180 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Nazario', ficha: 'FTR-CB-PREV N° 0099-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado y espigones en la margen izquierda del río Santa', meta: 0.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Isidro Recto I', ficha: 'FTR-CB-PREV N° 0100-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado y espigones en la margen izquierda del río Santa', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 160 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Isidro Recto II', ficha: 'FTR-CB-PREV N° 0101-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado y espigones en la margen izquierda del río Santa', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Isidro Curvo', ficha: 'FTR-CB-PREV N° 0102-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado y espigones en la margen izquierda del río Santa', meta: 0.08, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'San Gabriel', ficha: 'FTR-CB-PREV N° 0381-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y construción de dique con enrocado en la margen izquierda del río Santa', meta: 0.67, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Conventillo 2-Suchiman', ficha: 'FTR-CB-PREV N° 0975-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.57, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Mantas Tramo II', ficha: 'FTR-CB-PREV N° 0976-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 1.04, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Conventillo 1-Suchiman', ficha: 'FTR-CB-PREV N° 0977-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y  conformación de bordos en el río Santa', meta: 1.56, unidad: 'Km', responsable: 'ANA', poblacion: 100 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'La Curva del Diablo', ficha: 'FTR-CB-PREV N° 0978-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación en el río Reque', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'La Vibora 1-Rinconada', ficha: 'FTR-CB-PREV N° 0979-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 1.08, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'La Vibora 2-Rinconada', ficha: 'FTR-CB-PREV N° 0980-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Mantas Tramo I', ficha: 'FTR-CB-PREV N° 0981-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 1.22, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Toma 47-Suchiman', ficha: 'FTR-CB-PREV N° 0982-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos de la quebrada Huayanto', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Cascajal Bajo-La Cuadra', ficha: 'FTR-MC-PREV N° 0125-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatcaión y conformación de bordos en el río Santa', meta: 3.8, unidad: 'Km', responsable: 'MVCS', poblacion: 724 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Cascajal', ficha: 'FTR-MC-PREV N° 0126-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 3.1, unidad: 'Km', responsable: 'MVCS', poblacion: 2788 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Tambo Real', ficha: 'FTR-MC-PREV N° 0127-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 3.4, unidad: 'Km', responsable: 'MVCS', poblacion: 2788 },
    { provincia: 'Santa', distrito: 'Cáceres del Perú', sector: 'Macracancha', ficha: 'FTR-CB-PREV N° 0918-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 0.85, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Santa', distrito: 'Cáceres del Perú', sector: 'Ullumaquin', ficha: 'FTR-MC-PREV N° 0116-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en la margen derecha del río Jimbe (Nepeña)', meta: 0.18, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 30 },
    { provincia: 'Santa', distrito: 'Moro', sector: 'Vinchamarcachica-Paredones', ficha: 'FTR-CB-PREV N° 0922-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 0.58, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Santa', distrito: 'Moro', sector: 'Villa Las Mercedes-Puente Moro', ficha: 'FTR-CB-PREV N° 0923-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chilca', meta: 1.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 30 },
    { provincia: 'Santa', distrito: 'Moro', sector: 'Huarcos', ficha: 'FTR-MC-PREV N° 0113-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en la margen izquierda del río Loco', meta: 0.25, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 80 },
    { provincia: 'Santa', distrito: 'Moro', sector: 'Mishan Tomeque', ficha: 'FTR-MC-PREV N° 0114-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Nepeña', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 25 },
    { provincia: 'Santa', distrito: 'Moro', sector: 'Virahuanca', ficha: 'FTR-MC-PREV N° 0117-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza y descolmatación en el cauce del río Loco', meta: 0.25, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'Puente Blanco-San José', ficha: 'FTR-CB-PREV N° 0919-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 500 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'Puente Colorao-Cocharcas', ficha: 'FTR-CB-PREV N° 0920-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 1.55, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'Villa Las Mercedes-Puente Moro', ficha: 'FTR-CB-PREV N° 0921-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pata', meta: 0.42, unidad: 'Km', responsable: 'ANA', poblacion: 68 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'Cerro Blanco', ficha: 'FTR-MC-PREV N° 0111-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza y descolmatación en el cauce del río Nepeña', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'Pasamayito', ficha: 'FTR-MC-PREV N° 0112-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Nepeña', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Santa', distrito: 'Nepeña', sector: 'San Jacinto Villafana', ficha: 'FTR-MC-PREV N° 0115-2026-ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en la margen derecha del río Nepeña', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 40 },
    { provincia: 'Santa', distrito: 'Samanco', sector: 'Huambacho El Arenal-Huambacho La Huaca', ficha: 'FTR-CB-PREV N° 0916-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 3.0, unidad: 'Km', responsable: 'ANA', poblacion: 2500 },
    { provincia: 'Santa', distrito: 'Samanco', sector: 'Cay Cay - Huambacho El Arenal', ficha: 'FTR-CB-PREV N° 0917-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos  en el río Santa', meta: 3.1, unidad: 'Km', responsable: 'ANA', poblacion: 1500 },
    { provincia: 'Sihuas', distrito: 'Sihuas', sector: 'Lucerito-Chirimoyo', ficha: 'FTR-CB-PREV N° 0833-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.74, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Sihuas', distrito: 'Sihuas', sector: 'Mitobamba', ficha: 'FTR-CB-PREV N° 0834-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.68, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Sihuas', distrito: 'Sihuas', sector: 'Huáscar', ficha: 'FTR-MC-PREV N° 0569-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 0.32, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
  ],
  todosResponsablesResumen: { ana: 9, midagri: 40, defensa: 0, mtc: 1, mvcs: 4, total: 54 },

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

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/ancash.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Ancash',
  ],
}
