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
// Actualizado 31/08/2026: presupuesto del Escenario Severo (ver comentario junto a 'escenarios'
// más abajo) con la Exposición de Motivos del Decreto Supremo de transferencia FEN 2026-2027.
import datosBD from './_generated/tumbes'
import galeria from '../galeria/tumbes.json'

export default {
  id: 'tumbes',
  label: 'Región Tumbes',
  shortLabel: 'Tumbes',

  meta: {
    region: 'Región Tumbes',
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
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'CP. San Isidro', ficha: 'FTR-CB-PREV N° 1012-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación, consformación de bordos en la quebrada Cansas', meta: 0.82, unidad: 'Km', responsable: 'ANA', poblacion: 383 },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Cristales-Malval', ficha: 'FTR-CB-PREV N° 1027-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Gamarra', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Malval', ficha: 'FTR-MC-PREV N° 0665-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa Eulalia', meta: 0.45, unidad: 'Km', responsable: 'MVCS', poblacion: 502 },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'Cerro Blanco 1 (MD)', ficha: 'FTR-CB-PREV N° 0316-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.7, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'Cabuyal', ficha: 'FTR-MC-PREV N° 0129-2026-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Motupe', meta: 3.2, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', sector: 'La Inverna', ficha: 'FTR-MC-PREV N° 0161-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos  y poza de disipación en la quebrada Gamarra', meta: 0.8, unidad: 'Km', responsable: 'DEFENSA', poblacion: 1400 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vista Hermosa', ficha: 'FTR-CB-PREV N° 0169-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.6, unidad: 'Km', responsable: 'MVCS', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Pechichal', ficha: 'FTR-CB-PREV N° 1026-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Tumbes', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'El Peligro', ficha: 'FTR-CB-PREV N° 1028-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.86, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'La Peña', ficha: 'FTR-MC-PREV N° 0143-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Huayo Ingenio', meta: 1.15, unidad: 'Km', responsable: 'DEFENSA', poblacion: 4375 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vaqueria', ficha: 'FTR-MC-PREV N° 0195-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 0.59, unidad: 'Km', responsable: 'ANA', poblacion: 350 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'naranjo-Casablanqueada', ficha: 'FTR-MC-PREV N° 0685-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tumbes', meta: 1.3, unidad: 'Km', responsable: 'ANA', poblacion: 1250 },
    { provincia: 'Tumbes', distrito: 'San Juan de la Virgen', sector: 'Puerto el Cura-Pampagrande', ficha: 'FTR-CB-PREV N° 0123-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Utcubamba', meta: 0.41, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Tumbes', distrito: 'San Juan de la Virgen', sector: 'Cerro Blanco 2', ficha: 'FTR-CB-PREV N° 0315-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 0.6, unidad: 'Km', responsable: 'ANA', poblacion: 270 },
    { provincia: 'Zarumilla', distrito: 'Matapalo', sector: 'Matapalo', ficha: 'FTR-MC-PREV N° 0196-2025-ANA-AAA.JZ-ALA.T', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Loco (Quebrada río Loco)', meta: 2.4, unidad: 'Km', responsable: 'DEFENSA', poblacion: null },
  ],
  todosResponsablesResumen: { ana: 10, midagri: 0, defensa: 3, mtc: 0, mvcs: 2, total: 15 },

  // Presupuesto de la sección "Acuerdo Multisectorial" (ver puntosCriticos abajo) -- este campo se
  // usó hasta el 01/09/2026 (venía de la Ayuda Memoria de referencia que envió Franco el
  // 31/08/2026: S/380,893). Ese mismo día Franco pidió que el monto de las 8 regiones con puntos
  // críticos ANA saliera de una sola fuente/metodología ("BASE_DATOS.xlsx"), así que ahora se usa
  // PRESUPUESTO_MULTISECTORIAL_POR_REGION en ayudaMemoria.js (que da S/768,196.67 para Tumbes con
  // esa fuente -- distinto a este valor viejo). Se deja el campo comentado en vez de borrarlo por
  // si hace falta volver al monto anterior.
  // presupuestoAcuerdoMultisectorial: 380893.0,

  // "Puntos críticos restantes" (79 identificados - 15 priorizados en programadasDetalle = 64) --
  // agregado 31/08/2026 a partir del Excel 'RANKING 710 SEVERO PROG FINAL PARA 724.xlsx' que
  // Franco envió, mismo dato que ya se completó a mano en el .docx de referencia (cuadro
  // PROVINCIA/DISTRITO/N° INTERVENCIÓN de la sección 4.1). Se porta acá para que el generador web
  // también lo muestre, en vez de quedar solo en el Word editado a mano.
  puntosCriticosRestantes: [
    { provincia: 'Contralmirante Villar', distrito: 'Canoas de Punta Sal', cantidad: 8 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', cantidad: 5 },
    { provincia: 'Contralmirante Villar', distrito: 'Zorritos', cantidad: 10 },
    { provincia: 'Tumbes', distrito: 'Corrales', cantidad: 9 },
    { provincia: 'Tumbes', distrito: 'La Cruz', cantidad: 5 },
    { provincia: 'Tumbes', distrito: 'Pampas de Hospital', cantidad: 4 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', cantidad: 3 },
    { provincia: 'Tumbes', distrito: 'Tumbes', cantidad: 12 },
    { provincia: 'Zarumilla', distrito: 'Aguas Verdes', cantidad: 1 },
    { provincia: 'Zarumilla', distrito: 'La Cruz', cantidad: 1 },
    { provincia: 'Zarumilla', distrito: 'Matapalo', cantidad: 3 },
    { provincia: 'Zarumilla', distrito: 'Papayal', cantidad: 2 },
    { provincia: 'Zarumilla', distrito: 'Zarumilla', cantidad: 1 },
  ],

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
    // Escenario Severo actualizado 31/08/2026 con la "Exposición de Motivos" del Decreto Supremo
    // que autoriza la Transferencia de Partidas para el FEN 2026-2027 (a cargo del MVCS). Esta
    // cifra es la BRECHA de recursos adicionales que el Programa le pide al MEF -- no el costo
    // operativo total del escenario -- para las 79 intervenciones de Tumbes (mismo número que ya
    // veníamos usando; el Cuadro 3 del decreto lo confirma). Reemplaza el valor anterior (que salía
    // de 'DATA_PRESUPUESTO_REGIONES_NORTE_1.xlsx', un costo operativo estimado más amplio):
    //   mantenimiento: suma de las líneas de repuestos/lubricantes con UBO=TUMBES en el detalle de
    //     "Necesidad de bienes para mantenimiento" del decreto (S/253,050 -- el decreto no da un
    //     total de mantenimiento por UBO, solo por tipo de gasto a nivel nacional, así que se sumó
    //     a mano cada línea con UBO=Tumbes).
    //   combustible: Cuadro 6 "Combustible requerido para intervenciones preventivas", fila TUMBES.
    //   personal: Cuadro 7 "Operadores/conductores" (S/220,800) + Cuadro 8 "Servicios de gestión
    //     operativa en UBOs" (S/196,800), fila/bloque TUMBES de cada uno -- el decreto trata ambos
    //     como parte de "Locación de servicios".
    {
      nombre: 'Escenario N° 2',
      condicion: 'Condiciones Severas',
      presupuesto: 1458150.0,
      mantenimiento: 253050.0,
      combustible: 787500.0,
      personal: 417600.0,
      intervenciones: 79,
    },
  ],

  // Resumen del Presupuesto FEN para esta región (agregado 03/09/2026, a pedido de Franco: el
  // mismo detalle que se armó para la Vista General -- ver comentario grande junto a
  // presupuestoFenResumenGlobal en src/data/global.js) -- mismas 2 fuentes, filtradas por
  // Departamento = TUMBES:
  //   puntosCriticos/materialM3/poblacionBeneficiada/demandaMef: "Demandas 2026 FEN- Formato
  //     Cronograma Meta Fisica FINALV2_010926.xlsx" (fila a fila, 75 filas de Tumbes).
  //   longitudKm: "programacion_no_fen.xlsx", hoja FINAL, fila TUMBES -- es la única de las dos
  //     que trae Km.
  // OJO: 75 puntos críticos (este resumen) vs. las 79 "intervenciones" del Escenario Severo de
  // arriba -- son 2 fuentes distintas (el Excel de demanda MEF vs. el Decreto Supremo de
  // Transferencia de Partidas), igual que ya se explica en el comentario del Escenario Severo.
  presupuestoFenResumen: {
    fechaCorte: '01/09/2026',
    puntosCriticos: 75,
    materialM3: 467336.22,
    longitudKm: 63.463,
    poblacionBeneficiada: 104056,
    demandaMef: 1887809.73,
  },

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

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/tumbes.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) Tumbes',
  ],
}
