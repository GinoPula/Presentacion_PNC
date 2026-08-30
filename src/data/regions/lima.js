// Datos de la región Lima.
// Región nueva agregada el 29/08/2026 (Franco: "empecemos por Lima" -- primer departamento
// nuevo del sitio, además de las 8 regiones originales).
//
// Ejecutadas/en ejecución/programadas + mapa de intervenciones + convenios + flota: ya
// corridas contra Producción (29/08/2026, commit 3c4de5a) -- ./_generated/lima.js tiene
// datos reales, no el placeholder inicial. Para refrescar más adelante:
//   python pipeline/generar_todas_regiones.py --repo "D:\Presentacion_PNC" --regiones lima --git-push
//
// Presupuesto/Escenarios FEN (corregido 30/08/2026 -- Franco notó la omisión): SÍ hay fila de
// Lima en 'DATA_PRESUPUESTO_REGIONES_NORTE_1.xlsx' (la misma fuente que usan Piura/Ancash/
// Lambayeque/La Libertad/Tumbes), con su desglose Moderado/Severo de mantenimiento, combustible
// y personal -- se había omitido por error, confundiéndolo con otro dato distinto (el reporte
// nacional inter_20260824204815.xlsx, que sí trae 119 filas de Lima pero con MONTO_CONTRATADO/
// MONTO_EJECUTADO en cero/nulo -- eso es un dato aparte, de "ejecutadasPorTipo", no de este
// escenario FEN). igual que en Piura/Ancash, esa hoja no trae el número de intervenciones
// proyectadas por escenario -- queda en null en vez de inventarlo.
//
// Puntos críticos (agregado 29/08/2026, aclarado por Franco): NO viene de un extracto ANA
// aparte -- sale del mismo consolidado 536 usado para todosResponsables, filtrando además
// por RESPONSABLE = MVCS (igual patrón que Ancash/La Libertad: sus 4/varios puntos críticos
// también son justo sus filas con RESPONSABLE=MVCS). Para Lima son 3 fichas. Esto es distinto
// del acumulado por entidad de la Ayuda Memoria, que sigue siendo todosResponsablesResumen.
//
// todosResponsables (agregado 29/08/2026): igual método que Ancash/La Libertad -- filas de
// 'EXCEL_CONSOLIDADO_536_PARA_MIDAGRI_14.08.2026_VF_REV_ANA.xlsx', hoja CONSOLIDADO, filtrado
// por DEPARTAMENTO = Lima (142 filas), columna RESPONSABLE tal cual (ANA/MIDAGRI/MVCS/
// DEFENSA/MTC -- este archivo no tiene la categoría "ANA CONTRATA" de versiones viejas, ver
// el comentario largo en la-libertad.js sobre por qué). actividad/meta/unidad son solo
// referenciales (no se muestran en el documento, igual que en las demás regiones).
import datosBD from './_generated/lima'
import galeria from '../galeria/lima.json'

export default {
  id: 'lima',
  label: 'Región Lima',
  shortLabel: 'Lima',

  meta: {
    region: 'Región Lima',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  // puntosCriticos (agregado 29/08/2026): igual criterio que Ancash/La Libertad -- del mismo
  // consolidado 536 (CONSOLIDADO, filtrado DEPARTAMENTO=Lima), las fichas con RESPONSABLE=MVCS
  // (Vivienda) son las que se muestran en esta sección del sitio -- para Lima son 3 (coincide
  // con mvcs:3 en todosResponsablesResumen abajo). Esto es distinto del acumulado por entidad
  // que va en la Ayuda Memoria (ese sigue siendo todosResponsablesResumen, sin tocar).
  puntosCriticos: [
    {
      provincia: 'Huarochiri',
      distrito: 'Ricardo Palma',
      sector: 'Pascana III',
      fichaTecnica: 'FTR-MC-PREV N° 0018-2026-ANA-AAA.CF-ALA.CHRL',
      descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Río Seco-Toro Cocha.',
      metaKm: 0.05,
    },
    {
      provincia: 'Huarochiri',
      distrito: 'Huachupampa',
      sector: 'Pongo',
      fichaTecnica: 'FTR-CB-PREV N° 0372-2025-ANA-AAA.CF-ALA.CHRL',
      descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Chico.',
      metaKm: 0.43,
    },
    {
      provincia: 'Huarochiri',
      distrito: 'Santa Cruz de Cocachacra',
      sector: 'Corcona',
      fichaTecnica: 'FTR-MC-PREV N° 0100-2026-ANA-AAA.CF-ALA.CHRL',
      descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Huaura.',
      metaKm: 0.5,
    },
  ],
  escenarios: [
    { nombre: 'Escenario N° 1', condicion: 'Condiciones Moderadas', presupuesto: 924657.54, mantenimiento: 333320.54, combustible: 332418.65, personal: 258918.35, intervenciones: null },
    { nombre: 'Escenario N° 2', condicion: 'Condiciones Severas', presupuesto: 8082191.78, mantenimiento: 2913468.4, combustible: 2905585.22, personal: 2263138.16, intervenciones: null },
  ],

  // Sin fuente de capacidad de flota (Estado_Maquinarias) filtrada por Lima todavía --
  // se deja vacío (nunca inventado) hasta correr el pipeline o recibir el Excel de flota.
  capacidad: [],

  // Sin fuente para personal de la UBO Lima todavía -- se deja vacío (el sitio muestra
  // "Información pendiente de la UBO" en vez de un total de 0 inventado).
  personalUBO: [],

  // todosResponsables: ver comentario arriba del archivo.
  todosResponsables: [
    { provincia: 'Lima', distrito: 'Chaclacayo', sector: 'Puente Morón hasta el sector Cultura y Progreso', ficha: 'FTR-MC-PREV N° 0243-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chilca', meta: 4.4, unidad: 'Km', responsable: 'ANA', poblacion: 2000 },
    { provincia: 'Huaral', distrito: 'Aucallama', sector: 'Saume Lindero', ficha: 'FTR-CB-PREV N° 0461-2025 ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Pastoraiz', meta: 0.5, unidad: 'Km', responsable: 'ANA', poblacion: 58 },
    { provincia: 'Lima', distrito: 'Ate', sector: 'Puente Ferrocarril Huachipa-Puente San Roque', ficha: 'FTR-MC-PREV N° 0361-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nepeña', meta: 1.82, unidad: 'Km', responsable: 'ANA', poblacion: 5000 },
    { provincia: 'Lima', distrito: 'Chaclacayo', sector: 'Santa Ines Puente Huampani', ficha: 'FTR-MC-PREV N° 0413-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos y poza de disipación en la quebrada Pastoraiz', meta: 2.58, unidad: 'Km', responsable: 'ANA', poblacion: 1350 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Tramo 4', ficha: 'FTR-CB-PREV N° 1052-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 0.65, unidad: 'Km', responsable: 'ANA', poblacion: 1200 },
    { provincia: 'Lima', distrito: 'San Juan De Lurigancho', sector: 'Puente Nuevo-Cruce Linea 1 Metro Lima', ficha: 'FTR-MC-PREV N° 0360-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: 2500 },
    { provincia: 'Lima', distrito: 'San Juan De Lurigancho', sector: 'Urb. Manuel Scorza-Campoy', ficha: 'FTR-MC-PREV N° 0012-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Zaña', meta: 1.4, unidad: 'Km', responsable: 'ANA', poblacion: 5000 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Tramo 5', ficha: 'FTR-CB-PREV N° 1053-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.12, unidad: 'Km', responsable: 'ANA', poblacion: 600 },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Malecón Lurín desde el Jr. Los Pinos hasta el Puente de la antigua Panamericana Sur', ficha: 'FTR-MC-PREV N° 0392-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Tarayo', meta: 0.33, unidad: 'Km', responsable: 'ANA', poblacion: 1250 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Urb. Alameda de Ñaña Etapa 1', ficha: 'FTR-MC-PREV N° 0074-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1250 },
    { provincia: 'Lima', distrito: 'Carmen de la Legua Reynoso', sector: 'Urb. Playa Rimac', ficha: 'FTR-MC-PREV N° 0078-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 10000 },
    { provincia: 'Huarochiri', distrito: 'Huachupampa', sector: 'Autisha', ficha: 'FTR-CB-PREV N° 0373-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chilca', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 12 },
    { provincia: 'Huarochiri', distrito: 'Huachupampa', sector: 'Pongo', ficha: 'FTR-CB-PREV N° 0374-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chilca', meta: 0.61, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 10 },
    { provincia: 'Lima', distrito: 'Cieneguilla', sector: 'Sauce Alto, Malecón Lurín Primera Etapa', ficha: 'FTR-MC-PREV N° 0372-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chancay', meta: 4.78, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 3560 },
    { provincia: 'Huaral', distrito: 'Atavillos Bajo', sector: 'Rampe II', ficha: 'FTR-MC-PREV N° 0324-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Ceniza', meta: 0.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 160 },
    { provincia: 'Huaral', distrito: 'Atavillos Bajo', sector: 'Huayopampa', ficha: 'FTR-MC-PREV N° 0325-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y construción de bordos en el río Mala', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 156 },
    { provincia: 'Huaral', distrito: 'Atavillos Bajo', sector: 'Cutopuquio-La Perla', ficha: 'FTR-MC-PREV N° 0326-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Matagente', meta: 0.22, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 66 },
    { provincia: 'Huaral', distrito: 'Atavillos Bajo', sector: 'Pichiquillin-La Perla', ficha: 'FTR-MC-PREV N° 0327-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Ica', meta: 0.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 81 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Puente La Perla', ficha: 'FTR-MC-PREV N° 0328-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Ica', meta: 0.34, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Inquirhuay-Cucapunco', ficha: 'FTR-MC-PREV N° 0329-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Ica', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Jillichuy-Cucapunco', ficha: 'FTR-MC-PREV N° 0330-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Pisco', meta: 0.32, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'San Miguel De Acos', sector: 'Puente Oquendo', ficha: 'FTR-MC-PREV N° 0332-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 1.18, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 320 },
    { provincia: 'Huaral', distrito: 'San Miguel De Acos', sector: 'Puente Acos-Río Chancay Huaral', ficha: 'FTR-MC-PREV N° 0333-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.36, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 5 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Cucapunco', ficha: 'FTR-MC-PREV N° 0334-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.37, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 201 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Huaranguito', ficha: 'FTR-MC-PREV N° 0335-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.06, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Cucapunco', ficha: 'FTR-MC-PREV N° 0336-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.045, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 84 },
    { provincia: 'Huaral', distrito: 'Aucallama', sector: 'Rompetoldo-Pacaybamba', ficha: 'FTR-MC-PREV N° 0337-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.38, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 156 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Cerro Burro Alancho', ficha: 'FTR-MC-PREV N° 0338-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.046, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'San Miguel De Acos', sector: 'Llerhuanca San José', ficha: 'FTR-MC-PREV N° 0339-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.045, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Picay', ficha: 'FTR-MC-PREV N° 0343-2025-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.38, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Huayo Ingenio', ficha: 'FTR-CB-PREV N° 0460-2025 ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río acari', meta: 0.015, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 7 },
    { provincia: 'Huaral', distrito: 'Sumbilca', sector: 'Tarayo', ficha: 'FTR-CB-PREV N° 0462-2025 ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.02, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 3 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'Cochas', ficha: 'FTR-MC-PREV N° 0152-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.16, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'Corral Quemado', ficha: 'FTR-MC-PREV N° 0255-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.11, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 40 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'San Juan De Correviento', ficha: 'FTR-MC-PREV N° 0305-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.72, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1250 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'Torihuasi', ficha: 'FTR-MC-PREV N° 0310-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 90 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Quipico', ficha: 'FTR-CB-PREV N° 0175-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Yauca', meta: 2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 92 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Chambara Alta', ficha: 'FTR-CB-PREV N° 0176-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 2.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Lule Alto', ficha: 'FTR-CB-PREV N° 0177-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 160 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Puente La Hoyada', ficha: 'FTR-CB-PREV N° 0178-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 0.74, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 90 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Puente Balta', ficha: 'FTR-CB-PREV N° 0179-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y cconformación de bordos en la quebrada sin nombre', meta: 0.18, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 160 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Chiquiquintay 1', ficha: 'FTR-CB-PREV N° 0180-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y cconformación de bordos en la quebrada Quicacha', meta: 0.48, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 144 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Chiquiquintay 2', ficha: 'FTR-CB-PREV N° 0181-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Puicuto', meta: 0.97, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 140 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Santa Elvira', ficha: 'FTR-CB-PREV N° 0182-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chaparra', meta: 1.63, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1400 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Puente Balta', ficha: 'FTR-CB-PREV N° 0183-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chili', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 320 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'El Catalino', ficha: 'FTR-CB-PREV N° 0184-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chili', meta: 0.47, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 196 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Tres Montones', ficha: 'FTR-CB-PREV N° 0187-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chili', meta: 1.51, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 80 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Mani', ficha: 'FTR-MC-PREV N° 0205-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Chili', meta: 0.43, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Cajatambo', distrito: 'Manas', sector: 'Caya', ficha: 'FTR-CB-PREV N° 0369-2025-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Chullo', meta: 1.64, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cajatambo', distrito: 'Manas', sector: 'Pucan 2', ficha: 'FTR-CB-PREV N° 0371-2025-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y confomación de bordos y poza de disipación en la quebrada Gamarra', meta: 0.022, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Manchay Alto', ficha: 'FTR-MC-PREV N° 0637-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos y poza de disipación en la quebrada Gamarra', meta: 0.73, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Puente Guayabo', ficha: 'FTR-MC-PREV N° 0639-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chili', meta: 0.73, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Allauca', sector: 'KM 117', ficha: 'FTR-CB-PREV N° 0986-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Yauyos', distrito: 'Allauca', sector: 'Km 89 Carretera Yauyos', ficha: 'FTR-CB-PREV N° 0672-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Zuñiga', sector: 'Campanahuasi', ficha: 'FTR-CB-PREV N° 0673-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Mala', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Zuñiga', sector: 'San Juan', ficha: 'FTR-CB-PREV N° 0674-2025-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Santa Eulalia', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huarochiri', distrito: 'San Mateo', sector: 'Tambo de Viso', ficha: 'FTR-CB-PREV N° 1055-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Huayaringa 2', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Santa María', sector: 'Bocatoma Santa Rosalia', ficha: 'FTR-MC-PREV N° 0176-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Mariano Melgar', meta: 1.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Huaura', distrito: 'Santa María', sector: 'El Ingenio', ficha: 'FTR-MC-PREV N° 0177-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Mariano Melgar 2', meta: 1.64, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Huaura', distrito: 'Huaura', sector: 'Humaya', ficha: 'FTR-MC-PREV N° 0178-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pativilca', meta: 0.75, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Huaura', sector: 'Humaya II', ficha: 'FTR-MC-PREV N° 0179-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pativilca', meta: 0.51, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Santa María', sector: 'San Jorge', ficha: 'FTR-MC-PREV N° 0180-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Huaura', sector: 'Balconcillo', ficha: 'FTR-MC-PREV N° 0181-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Huaura', sector: 'Vilcahuaura', ficha: 'FTR-MC-PREV N° 0182-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.78, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Aguas abajo del Puente Tingo', ficha: 'FTR-MC-PREV N° 0183-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1492 },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Aguas abajo del Puente Tingo', ficha: 'FTR-MC-PREV N° 0184-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos enel río Chancay', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Desembocadura del río Checras', ficha: 'FTR-MC-PREV N° 0185-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Las Minas', ficha: 'FTR-MC-PREV N° 0186-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pisco', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Piedra Blanca', ficha: 'FTR-MC-PREV N° 0187-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pisco', meta: 0.84, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Piedra Blanca', ficha: 'FTR-MC-PREV N° 0188-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Palcaura', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Maray I', ficha: 'FTR-MC-PREV N° 0189-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Checras', meta: 7.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Maray II', ficha: 'FTR-MC-PREV N° 0190-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Jausha', meta: 0.41, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Canin Parte Baja', ficha: 'FTR-MC-PREV N° 0191-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Checras', meta: 1.45, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaura', distrito: 'Checras', sector: 'Pampagrande', ficha: 'FTR-MC-PREV N° 0192-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Checras', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Oyon', distrito: 'Oyon', sector: 'Quichas', ficha: 'FTR-MC-PREV N° 0193-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Quichas', meta: 0.74, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 360 },
    { provincia: 'Oyon', distrito: 'Oyon', sector: 'Chuñupampa', ficha: 'FTR-MC-PREV N° 0194-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Quichas', meta: 0.75, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 240 },
    { provincia: 'Huaura', distrito: 'Sayan', sector: 'Cuchunchin-Río Chico', ficha: 'FTR-MC-PREV N° 0269-2025-ANA-AAA.CF-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chico', meta: 0.19, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'San Juan De Lurigancho', sector: 'Puente peatonal Malecón Checa-Puente Las Lomas', ficha: 'FTR-MC-PREV N° 0359-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del Río Rímac', meta: 0.79, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1000 },
    { provincia: 'Huarochiri', distrito: 'Santa Cruz de Cocachacra', sector: 'Oscolla Parte Alta', ficha: 'FTR-MC-PREV N° 0103-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Rímac', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 400 },
    { provincia: 'Huarochiri', distrito: 'Santa Cruz de Cocachacra', sector: 'Corcona', ficha: 'FTR-MC-PREV N° 0104-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Rímac', meta: 1.95, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2000 },
    { provincia: 'Cañete', distrito: 'Chilca', sector: 'Pacayal', ficha: 'FTR-CB-PREV N° 0076-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y construción de dique transversal y poza de disipación en la quebrada Chilca', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Chilca', sector: 'Cerro León', ficha: 'FTR-CB-PREV N° 0078-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y construción de dique transversal y poza de disipación en la quebrada Chilca', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Cañete', distrito: 'Chilca', sector: 'Unto Chico', ficha: 'FTR-CB-PREV N° 0079-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y construción de dique transversal y poza de disipación en la quebrada Chilca', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Cerro Pan de Azucar', ficha: 'FTR-MC-PREV N° 0234-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.76, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Picapiedra', ficha: 'FTR-MC-PREV N° 0236-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.77, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Camal', ficha: 'FTR-MC-PREV N° 0237-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.44, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Venturosa y Palmas', ficha: 'FTR-MC-PREV N° 0269-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Quebrada Verde y Casa Blanca', ficha: 'FTR-MC-PREV N° 0270-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.9, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 250 },
    { provincia: 'Huaral', distrito: 'Aucallama', sector: 'Bocatoma Salinas Alta-Manchuria', ficha: 'FTR-CB-PREV N° 0386-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y construcción de dique enrocado en la margen izquierda del río Chancay', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 282 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'San Bartolo', ficha: 'FTR-CB-PREV N° 0384-2026-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y construción de canal de concreto armado en la quebrada Ceniza', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1200 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'Bocatoma Tutumo', ficha: 'FTR-CB-PREV N° 0411-2026-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y construción de dique enrocado en la margen derecha e izquierda del río Mala', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Puente Manchay', ficha: 'FTR-MC-PREV N° 0636-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.67, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Cardal', ficha: 'FTR-MC-PREV N° 0235-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Lurín', meta: 0.78, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Pachacamac', sector: 'Manchay Lote B', ficha: 'FTR-MC-PREV N° 0638-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.66, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Puente Morón-Puente Huamaní', ficha: 'FTR-MC-PREV N° 0085-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Rímac', meta: 1.25, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 3000 },
    { provincia: 'Cañete', distrito: 'San Vicente de Cañete', sector: 'Bocatoma La Pinta', ficha: 'FTR-CB-PREV N° 0287-2026-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cañete', meta: 0.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Puente Lurín-Malecón Las Palmas', ficha: 'FTR-MC-PREV N° 0584-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 525 },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Puente Lurín-Malecón Los Huertos', ficha: 'FTR-MC-PREV N° 0585-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.62, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 615 },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Santo Domingo de Chagña', ficha: 'FTR-MC-PREV N° 0586-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 845 },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'Puente Lurín-Malecón Los Olivares', ficha: 'FTR-MC-PREV N° 0587-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.42, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 210 },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'El Platanal Bocatoma Lurín', ficha: 'FTR-MC-PREV N° 0588-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.75, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 175 },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'Checta', ficha: 'FTR-MC-PREV N° 0316-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la margen izquierda del río Chillón', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 40 },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'Puente Macas I', ficha: 'FTR-MC-PREV N° 0317-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Chillón', meta: 0.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'Puente Macas II', ficha: 'FTR-MC-PREV N° 0318-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Chillón', meta: 0.75, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 140 },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'El Olivar', ficha: 'FTR-MC-PREV N° 0319-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Chillón', meta: 1.35, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'Puente Arahuay', ficha: 'FTR-MC-PREV N° 0320-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce del río Quisquichaca', meta: 0.95, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Canta', distrito: 'Santa Rosa de Quives', sector: 'La Cabaña', ficha: 'FTR-MC-PREV N° 0321-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Cañón', meta: 0.25, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 96 },
    { provincia: 'Cañete', distrito: 'Calango', sector: 'Puente Correviento', ficha: 'FTR-CB-PREV N° 0440-2026-ANA-AAA.CF-ALA.MOC', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Mala', meta: 0.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huarochiri', distrito: 'Santo Domingo de Olleros', sector: 'Caputish', ficha: 'FTR-MC-PREV N° 0310-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Caputish', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Huarochiri', distrito: 'Santo Domingo de Olleros', sector: 'Chichacara-Pulacama', ficha: 'FTR-MC-PREV N° 0311-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Calahuaya', meta: 2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 86 },
    { provincia: 'Huarochiri', distrito: 'Santo Domingo de Olleros', sector: 'Cucucli', ficha: 'FTR-MC-PREV N° 0312-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Cuculi', meta: 2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 480 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Huaynani', ficha: 'FTR-MC-PREV N° 0313-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la margen derecha del río Santa Eulalia', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 42 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Casa Grande-Chune', ficha: 'FTR-CB-PREV N° 0475-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Santa Eulalia', meta: 1.105, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 80 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Chingolay', ficha: 'FTR-CB-PREV N° 0412-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Chingolay', meta: 0.055, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 260 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Huayaringa 2', ficha: 'FTR-CB-PREV N° 0413-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Huayaringa 2', meta: 0.055, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1200 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Mariano Melgar', ficha: 'FTR-CB-PREV N° 0414-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Mariano Melgar', meta: 0.025, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 348 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Mariano Melgar 2', ficha: 'FTR-CB-PREV N° 0415-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Mariano Melgar 2', meta: 0.025, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Barranca', distrito: 'Supe', sector: 'Caral-Chupacigarro', ficha: 'FTR-MC-PREV N° 0208-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Supe', meta: 1.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Barranca', distrito: 'Supe', sector: 'Chupacigarro, Llamahuaca-Pando, Hurihuas', ficha: 'FTR-MC-PREV N° 0209-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Supe', meta: 3.38, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Barranca', distrito: 'Supe', sector: 'Pulancache Bajo', ficha: 'FTR-MC-PREV N° 0214-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Supe', meta: 1.54, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Barranca', distrito: 'Supe', sector: 'Pulancache', ficha: 'FTR-MC-PREV N° 0215-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Supe', meta: 0.97, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 180 },
    { provincia: 'Barranca', distrito: 'Pativilca', sector: 'C.P. Simón Bolívar', ficha: 'FTR-CB-PREV N° 0270-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pativilca', meta: 2.54, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Barranca', distrito: 'Barranca', sector: 'Vinto Bajo', ficha: 'FTR-CB-PREV N° 0465-2026-ANA-AAA.CF-ALA.B', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Pativilca', meta: 4.36, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Huaral', sector: 'Bocatoma Chancay Huaral-Camino Caqui', ficha: 'FTR-CB-PREV N° 0467-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 1.27, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 236 },
    { provincia: 'Huaral', distrito: 'Aucallama', sector: 'Barraje Huando-Río Pisquillo', ficha: 'FTR-CB-PREV N° 0468-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.66, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 85 },
    { provincia: 'Huaral', distrito: 'Huaral', sector: 'Barraje Huando-Río Pisquillo', ficha: 'FTR-CB-PREV N° 0469-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 0.24, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 38 },
    { provincia: 'Huaral', distrito: 'Huaral', sector: 'Lunavilca-Pasamayo Bajo', ficha: 'FTR-CB-PREV N° 0470-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 2.98, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 68 },
    { provincia: 'Huaral', distrito: 'Chancay', sector: 'Puente Chancay Aguas Arriba', ficha: 'FTR-CB-PREV N° 0385-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos enel río Chancay', meta: 0.35, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Huaral', distrito: 'Aucallama', sector: 'Lunavilca-Pasamayo Bajo', ficha: 'FTR-CB-PREV N° 0471-2026-ANA-AAA.CF-ALA.CHH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chancay-Huaral', meta: 2.55, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Lima', distrito: 'Lurín', sector: 'PTAR Sedapal-Santa Rosa', ficha: 'FTR-MC-PREV N° 0589-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio, del cauce del río Lurín', meta: 0.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 105 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Atarjea Sedapal', ficha: 'FTR-MC-PREV N° 0075-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Reque', meta: 3, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1000 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Puente Los Angeles Aguas Arriba', ficha: 'FTR-MC-PREV N° 0080-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tumbes', meta: 2.58, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1550 },
    { provincia: 'Cañete', distrito: 'Chilca', sector: 'Las Palmas', ficha: 'FTR-CB-PREV N° 0077-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos de la quebrada Rica Playa', meta: 0.5, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Bocatoma Huachipa-Pte. Ferrocarril Huachipa', ficha: 'FTR-MC-PREV N° 0159-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos y poza de disipación en la quebrada S/N', meta: 1.5, unidad: 'Km', responsable: 'DEFENSA', poblacion: 500 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Campanillas Santa María y Campanilla California', ficha: 'FTR-MC-PREV N° 0009-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.73, unidad: 'Km', responsable: 'DEFENSA', poblacion: 2000 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Pablo Patron', ficha: 'FTR-MC-PREV N° 0695-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Zaña', meta: 0.6, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1000 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Cañaverales', ficha: 'FTR-MC-PREV N° 0694-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pativilca', meta: 0.58, unidad: 'Km', responsable: 'DEFENSA', poblacion: 3000 },
    { provincia: 'Lima', distrito: 'Lurigancho', sector: 'Cantuta', ficha: 'FTR-MC-PREV N° 0019-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Santa Elvira', meta: 0.23, unidad: 'Km', responsable: 'DEFENSA', poblacion: 2200 },
    { provincia: 'Huarochiri', distrito: 'Santa Eulalia', sector: 'Tramo 6', ficha: 'FTR-CB-PREV N° 1054-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Chingolay', meta: 0.18, unidad: 'Km', responsable: 'MTC', poblacion: 800 },
    { provincia: 'Huarochiri', distrito: 'Ricardo Palma', sector: 'Pascana III', ficha: 'FTR-MC-PREV N° 0018-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Río Seco-Toro Cocha', meta: 0.05, unidad: 'Km', responsable: 'MVCS', poblacion: 75 },
    { provincia: 'Huarochiri', distrito: 'Huachupampa', sector: 'Pongo', ficha: 'FTR-CB-PREV N° 0372-2025-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chico', meta: 0.43, unidad: 'Km', responsable: 'MVCS', poblacion: 50 },
    { provincia: 'Huarochiri', distrito: 'Santa Cruz de Cocachacra', sector: 'Corcona', ficha: 'FTR-MC-PREV N° 0100-2026-ANA-AAA.CF-ALA.CHRL', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Huaura', meta: 0.5, unidad: 'Km', responsable: 'MVCS', poblacion: 50 },
  ],
  todosResponsablesResumen: { ana: 9, midagri: 121, defensa: 8, mtc: 1, mvcs: 3, total: 142 },

  // ayudaMemoriaDisponible (agregado 29/08/2026): activa el botón "Generar Ayuda Memoria" en la
  // web. Lima NO tiene un Word de Ayuda Memoria curado a mano (a diferencia de las 8 regiones
  // originales) -- pero ya no hace falta uno: el jefe de Franco pidió retirar la narrativa
  // histórica 2025 (ver src/lib/ayudaMemoria.js, seccionNarrativa), así que Lima simplemente usa
  // el párrafo genérico automático que ya arma esa función a partir de datos en vivo
  // (data.ejecutadasTotal.cantidad + meta.periodo) cuando no hay ayudaMemoriaNarrativa curada --
  // sin necesidad de un documento fuente. Este es el camino a seguir para las próximas regiones
  // nuevas (p. ej. Arequipa): activar este flag alcanza, no hace falta pedir un Word aparte.
  ayudaMemoriaDisponible: true,

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/lima.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Consolidado nacional de puntos críticos',
    'Unidad Básica Operativa (UBO) Lima',
  ],
}
