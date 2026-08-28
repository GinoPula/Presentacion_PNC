// Región nueva (agregada 25/08/2026). Intervenciones ejecutadas/en ejecución/
// programadas, convenios y flota vienen directo de Producción vía el pipeline
// (pipeline/generar_todas_regiones.py) -- correr ese script para reemplazar
// los ceros de ./_generated/la-libertad.js con los datos reales.
// puntosCriticos: actualizado 27/08/2026 con 'MVCS_Intervenciones_FEN_actualizado_56fichas.xlsx'
// (hoja "MVCS - Intervenciones FEN", filtrado por Departamento=La Libertad, 6 fichas --
// reemplaza el listado anterior de 9 fichas de 'EXCEL_CONSOLIDADO_569...xlsx', que ANA
// actualizó retirando/reasignando fichas fuera del alcance de MVCS). Solo se tomaron los
// campos que usa el sitio (provincia/distrito/ficha/descripción/km) -- el archivo también
// trae columnas de presupuesto "estandarizado" con un factor de ajuste y una excepción
// puntual para la ficha de Chicama; no se usaron (ver aviso aparte a Franco).
// escenarios: presupuesto de 'DATA_PRESUPUESTO_REGIONES_NORTE_1.xlsx' (fila LA
// LIBERTAD); cantidad de intervenciones contada de 'MODO_MODERADO_LIBERTAD_1.xlsx'
// (25 filas) y 'MODO_SEVERO_LIBERTAD_1.xlsx' (67 filas).
// galeria: 4 fotos recibidas (25/08/2026), con sus códigos de ficha técnica.
// capacidad y personal de UBO quedan pendientes (todavía no llegó esa ficha).
//
// todosResponsables (28/08/2026, piloto Ayuda Memoria): filas de
// 'EXCEL_CONSOLIDADO_569_oficial_PARA_OFICIALIZAR_1.xlsx', hoja CONSOLIDADO,
// filtrado a DEPARTAMENTO=La Libertad (59 filas) -- reemplaza la imagen que
// el MAIN pega al final de la Ayuda Memoria ("Acuerdos Puntos Críticos ANA")
// con una tabla real de todos los responsables (ANA, ANA CONTRATA, DEFENSA,
// MTC, MVCS -- MVCS es Vivienda). OJO: el total de este archivo a nivel
// nacional es 569, no 536 como mencionó Franco -- pendiente confirmar si es
// el mismo archivo o si hay uno más nuevo. Tampoco trae Puno ni Tacna (el
// archivo cubre Ancash/Arequipa/Ica/La Libertad/Lambayeque/Lima/Piura/Tumbes),
// así que esas 2 regiones se quedan sin esta tabla hasta tener su fuente.
//
// ayudaMemoriaDisponible: activa el botón "Generar Ayuda Memoria" en la web
// (src/lib/ayudaMemoria.js) -- solo La Libertad por ahora (piloto).
//
// ayudaMemoriaNarrativa: los párrafos de la Ayuda Memoria agrupan las
// intervenciones por ACTIVIDAD ("limpieza y descolmatación" vs
// "transitabilidad"), que es un campo DISTINTO del que ya usamos en
// ejecutadasPorTipo (ese agrupa por nivel de urgencia: Emergencia/
// Prevención/Urgente atención -- confirmado comparando los mismos totales:
// 31 ejecutadas 2026 en ambos, pero agrupadas distinto). No se pudo
// automatizar esta parte todavía porque no tengo el nombre de la columna de
// actividad en pnc.tb_em_intervencion -- pendiente confirmar con Franco. Los
// números de abajo son estáticos, copiados tal cual de 'AM LA LIBERTAD
// 250826 v2 1.docx' (el año 2025 ya cerrado no cambia; 2026 y en ejecución sí
// van a quedar desactualizados a medida que avance el año -- avisar cuando se
// identifique el campo correcto para automatizar esto también).
import datosBD from './_generated/la-libertad'

export default {
  id: 'la-libertad',
  label: 'Región La Libertad',
  shortLabel: 'La Libertad',

  meta: {
    region: 'Región La Libertad',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  todosResponsables: [
    { provincia: 'Virú', distrito: 'Chao', sector: 'Cerro Loreto-Tanguche', ficha: 'FTR-CB-PREV N° 0351-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.75, unidad: 'Km', responsable: 'ANA', poblacion: 25 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'El Pozo-Tanguche', ficha: 'FTR-CB-PREV N° 0353-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.71, unidad: 'Km', responsable: 'ANA', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Guadalupito', sector: 'Sarcope-Tanguche', ficha: 'FTR-CB-PREV N° 0355-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.5, unidad: 'Km', responsable: 'ANA', poblacion: null },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Huabalito', ficha: 'FTR-CB-PREV N° 1077-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 1.65, unidad: 'Km', responsable: 'MVCS', poblacion: 132 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'San Carlos Bajo II', ficha: 'FTR-MC-PREV N° 0701-2025-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en la margen izquierda del río Huamanzaña', meta: 1, unidad: 'Km', responsable: 'ANA', poblacion: 109 },
    { provincia: 'Ascope', distrito: 'Casa Grande', sector: 'Chacarilla', ficha: 'FTR-MC-PREV N° 0201-2026-ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Jose Alto (La Culebra)', meta: 1, unidad: 'Km', responsable: 'DEFENSA', poblacion: 620 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Cerro Loreto', ficha: 'FTR-CB-PREV N° 0360-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Protección con espigones, en la margen derecha del río Santa', meta: 1.8, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Toma Antigua Tanguche', ficha: 'FTR-CB-PREV N° 0364-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Protección con espigones en la margen derecha del río Santa', meta: 1, unidad: 'Km', responsable: 'ANA', poblacion: 20 },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Calquiche', ficha: 'FTR-MC-PREV N° 0544-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Calquiche', meta: 0.42, unidad: 'Km', responsable: 'MVCS', poblacion: 20 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Quebrada El Brujo-Pampa Blanca Tanguche', ficha: 'FTR-CB-PREV N° 0362-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Protección con espigones en la margen derecha del río Santa', meta: 1.65, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Corrales', ficha: 'FTR-MC-PREV N° 0276-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Café', meta: 0.23, unidad: 'Km', responsable: 'MVCS', poblacion: 120 },
    { provincia: 'Santiago de Chuco', distrito: 'Sitabamba', sector: 'Chagabara', ficha: 'FTR-MC-PREV N° 0641-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Chagaraba Chica', meta: 0.289, unidad: 'Km', responsable: 'MVCS', poblacion: 80 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'N° 6', ficha: 'FTR-MC-PREV N° 0628-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada De Los Pajaritos', meta: 0.266, unidad: 'Km', responsable: 'MVCS', poblacion: 320 },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Caserio Pueblo Nuevo', ficha: 'FTR-MC-PREV N° 0546-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Guadalupe', meta: 0.1, unidad: 'Km', responsable: 'MVCS', poblacion: 100 },
    { provincia: 'Sanchez Carrión', distrito: 'Chugay', sector: 'Chugay', ficha: 'FTR-MC-PREV N° 0640-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Miraflores', meta: 0.221, unidad: 'Km', responsable: 'MVCS', poblacion: 100 },
    { provincia: 'Gran Chimu', distrito: 'Cascas', sector: 'Cojitambo', ficha: 'FTR-CB-PREV N° 0434-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y construcción de muro de concreto armado, en la margen derecha del río Chicama', meta: 0.645, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 3825 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario 2-Tanguche', ficha: 'FTR-CB-PREV N° 0356-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.65, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Toma de Captación Ponte', ficha: 'FTR-CB-PREV N° 0358-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.5, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 20 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Captación Tanguche', ficha: 'FTR-CB-PREV N° 0359-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.5, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Pantano 2 El Carmen Tanguche', ficha: 'FTR-CB-PREV N° 0361-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Protección con espigones en la margen derecha del río Santa', meta: 1.3, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 25 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario 1-Tanguche', ficha: 'FTR-CB-PREV N° 0363-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Protección con espigones en la margen derecha del río Santa', meta: 0.54, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 20 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'San Salvador', ficha: 'FTR-MC-PREV N° 0624-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Salvador', meta: 0.77, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 50 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'La Polvora', ficha: 'FTR-MC-PREV N° 0625-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada 9 de Octubre', meta: 0.5, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 210 },
    { provincia: 'Sanchez Carrión', distrito: 'Curgos', sector: 'Yanasara', ficha: 'FTR-MC-PREV N° 0626-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Chiquichal', meta: 0.9, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 52 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Coipin', ficha: 'FTR-MC-PREV N° 0629-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Jardin Coipin', meta: 0.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 45 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Tucupina', ficha: 'FTR-MC-PREV N° 0630-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Tucupina', meta: 0.46, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 120 },
    { provincia: 'Sanchez Carrión', distrito: 'Sanagoran', sector: 'Sanagoran', ficha: 'FTR-MC-PREV N° 0631-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Yamobamba', meta: 0.425, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 50 },
    { provincia: 'Sanchez Carrión', distrito: 'Curgos', sector: 'El Eden', ficha: 'FTR-CB-PREV N° 0902-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Cerpaquiño', meta: 0.38, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 25 },
    { provincia: 'Sanchez Carrión', distrito: 'Curgos', sector: 'Yanasara', ficha: 'FTR-CB-PREV N° 0907-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Curgos', meta: 1.275, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 8 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'El Pallar', ficha: 'FTR-CB-PREV N° 0908-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Chusgón', meta: 0.4, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 64 },
    { provincia: 'Sanchez Carrión', distrito: 'Marcabal', sector: 'Nayguapata', ficha: 'FTR-CB-PREV N° 0909-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Chusgón', meta: 0.2, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 21 },
    { provincia: 'Sanchez Carrión', distrito: 'Sanagoran', sector: 'Vilcas', ficha: 'FTR-CB-PREV N° 0910-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Condebamba', meta: 0.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 86 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Candopata', ficha: 'FTR-CB-PREV N° 0911-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Grande', meta: 2, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 700 },
    { provincia: 'Sanchez Carrión', distrito: 'Curgos', sector: 'Yanasara', ficha: 'FTR-CB-PREV N° 0912-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Lorichuco', meta: 1.73, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 160 },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Vijus', ficha: 'FTR-MC-PREV N° 0545-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Del Tingo', meta: 3, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 1200 },
    { provincia: 'Pataz', distrito: 'Huaylillas', sector: 'Huaylillas', ficha: 'FTR-CB-PREV N° 0827-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de muro de gaviones en la margen derecha del río Cajas', meta: 0.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 75 },
    { provincia: 'Pataz', distrito: 'Santiago de Challas', sector: 'Challas', ficha: 'FTR-CB-PREV N° 0828-2025-ANA-AAA.M-ALA.POMA', actividad: 'Limpieza, descolmatación y conformación de muro de gaviones en ambas margenes de la quebrada Guechiragra', meta: 0.84, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 150 },
    { provincia: 'Sanchez Carrión', distrito: 'Chugay', sector: 'Cienego', ficha: 'FTR-CB-PREV N° 0941-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Chusgón', meta: 1.077, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 96 },
    { provincia: 'Santiago de Chuco', distrito: 'Sitabamba', sector: 'Pijobamba', ficha: 'FTR-CB-PREV N° 0942-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes del río Pijobamba', meta: 0.906, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 60 },
    { provincia: 'Bolivar', distrito: 'Bambamarca', sector: 'Calemar', ficha: 'FTR-CB-PREV N° 0944-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Sioner', meta: 2.62, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 200 },
    { provincia: 'Bolivar', distrito: 'Condomarca', sector: 'Nuevo Condomarca', ficha: 'FTR-CB-PREV N° 0945-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Sucnaya', meta: 0.416, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 23 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario Las Torres', ficha: 'FTR-CB-PREV N° 0357-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Santa', meta: 0.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 15 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'La Viña', ficha: 'FTR-CB-PREV N° 0318-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Utcubamba', meta: 1.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 280 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Corrales', ficha: 'FTR-CB-PREV N° 0319-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Corrales', meta: 1.72, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 240 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Chagualito', ficha: 'FTR-CB-PREV N° 0320-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en ambas margenes de la quebrada Cachipampa', meta: 0.54, unidad: 'Km', responsable: 'MTC', poblacion: 240 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Jaguey', ficha: 'FTR-CB-PREV N° 1078-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 1.6, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 50 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Pampas de Jaguey', ficha: 'FTR-CB-PREV N° 1079-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 1, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 10 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Compuerta Salinar', ficha: 'FTR-CB-PREV N° 1080-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 0.5, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 50 },
    { provincia: 'Ascope', distrito: 'Ascope', sector: 'Ascope', ficha: 'FTR-CB-PREV N° 1081-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen derecha del río Chicama', meta: 0.4, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 120 },
    { provincia: 'Ascope', distrito: 'Ascope', sector: 'Facala', ficha: 'FTR-CB-PREV N° 1082-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen derecha del río Chicama', meta: 0.42, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 200 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Puente Careaga', ficha: 'FTR-CB-PREV N° 1083-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 1.1, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 200 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'San Jorge Alto y Palotal', ficha: 'FTR-MC-PREV N° 0177-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal', meta: 3, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 116 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Palotal y Cerro Cabras', ficha: 'FTR-MC-PREV N° 0178-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal', meta: 3.53, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 152 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Huasaquito', ficha: 'FTR-MC-PREV N° 0179-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña', meta: 3.16, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 600 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Santa Rita Alta', ficha: 'FTR-MC-PREV N° 0180-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña', meta: 3, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 800 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Tutumo', ficha: 'FTR-MC-PREV N° 0181-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tutumo', meta: 1.5, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 92 },
    { provincia: 'Pacasmayo', distrito: 'Guadalupe', sector: 'Isla de Faclo-La Barranca', ficha: 'FTR-MC-PREV N° 0281-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 4, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: null },
    { provincia: 'Pacasmayo', distrito: 'San José', sector: 'Las Vegas-Chafan', ficha: 'FTR-MC-PREV N° 0282-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 0.35, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: null },
    { provincia: 'Viru', distrito: 'Viru', sector: 'San Nicolas', ficha: 'FTR-MC-PREV N° 0278-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce en el río Huacapongo', meta: 0.39, unidad: 'Km', responsable: 'ANA CONTRATA', poblacion: 80 },
  ],
  todosResponsablesResumen: { ana: 7, anaContrata: 43, defensa: 1, mtc: 1, mvcs: 7, total: 59 },

  ayudaMemoriaDisponible: true,

  ayudaMemoriaNarrativa: {
    2025: {
      total: 53,
      porActividad: [
        { actividad: 'limpieza y descolmatación', cantidad: 36, provincias: ['Trujillo', 'Ascope', 'Pataz', 'Sánchez Carrión', 'Gran Chimú'], m3: 259662, volquetadas: 17310, km: 20.515, poblacion: 48141 },
        { actividad: 'transitabilidad', cantidad: 17, provincias: ['Trujillo', 'Sánchez Carrión', 'Santiago de Chuco'], m3: 25738, volquetadas: 1715, km: 27.1, poblacion: 27179 },
      ],
    },
    2026: {
      total: 31,
      porActividad: [
        { actividad: 'limpieza y descolmatación', cantidad: 22, provincias: ['Trujillo', 'Ascope', 'Chepén', 'Sánchez Carrión', 'Gran Chimú'], m3: 148405, volquetadas: 9893, km: 6.504, poblacion: 18419 },
        { actividad: 'transitabilidad', cantidad: 9, provincias: ['Sánchez Carrión', 'Santiago de Chuco'], m3: 21465.7, volquetadas: 1431, km: 48.9, poblacion: 7922 },
      ],
    },
    enEjecucion: {
      total: 3,
      porActividad: [
        { actividad: 'limpieza y descolmatación', cantidad: 1, provincias: ['Gran Chimú'], m3: 1650, volquetadas: 110, km: 0.06, poblacion: 321 },
        { actividad: 'transitabilidad', cantidad: 2, provincias: ['Sánchez Carrión'], m3: 3232, volquetadas: 215, km: 4.66, poblacion: 602 },
      ],
    },
  },

  puntosCriticos: [
    { provincia: 'Ascope', distrito: 'Chicama', fichaTecnica: 'FTR-CB-PREV N° 1077-2025 ANA-AAA.HCH-ALA.CHICAMA', descripcion: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama.', metaKm: 1.65 },
    { provincia: 'Pataz', distrito: 'Pataz', fichaTecnica: 'FTR-MC-PREV N° 0544-2025-ANA-AAA.M-ALA.H', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Calquiche.', metaKm: 0.42 },
    { provincia: 'Sánchez Carrión', distrito: 'Cochorco', fichaTecnica: 'FTR-MC-PREV N° 0276-2025-ANA-AAA.M-ALA.H', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Café.', metaKm: 0.23 },
    { provincia: 'Santiago de Chuco', distrito: 'Sitabamba', fichaTecnica: 'FTR-MC-PREV N° 0641-2025-ANA-AAA.M-ALA.H', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Chagaraba Chica.', metaKm: 0.289 },
    { provincia: 'Sánchez Carrión', distrito: 'Huamachuco', fichaTecnica: 'FTR-MC-PREV N° 0628-2025-ANA-AAA.M-ALA.H', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada De Los Pajaritos.', metaKm: 0.266 },
    { provincia: 'Pataz', distrito: 'Pataz', fichaTecnica: 'FTR-MC-PREV N° 0546-2025-ANA-AAA.M-ALA.H', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada Guadalupe.', metaKm: 0.1 },
  ],

  escenarios: [
    {
      nombre: 'Escenario N° 1',
      condicion: 'Condiciones Moderadas',
      presupuesto: 616438.35,
      mantenimiento: 222213.69,
      combustible: 221612.43,
      personal: 172612.23,
      intervenciones: 25,
    },
    {
      nombre: 'Escenario N° 2',
      condicion: 'Condiciones Severas',
      presupuesto: 2294520.55,
      mantenimiento: 827128.74,
      combustible: 824890.72,
      personal: 642501.09,
      intervenciones: 67,
    },
  ],

  capacidad: [],

  personalUBO: [],

  galeria: [
    { id: 1, codigo: '066-2026-MTV-U-LIB', estado: 'Ejecutada', img: 'la-libertad-1' },
    { id: 2, codigo: '050-2026-LD-E-LIB', estado: 'Ejecutada', img: 'la-libertad-2' },
    { id: 3, codigo: '018-2026-LD-E-LIB', estado: 'Ejecutada', img: 'la-libertad-3' },
    { id: 4, codigo: '059-2026-MTV-U-LIB', estado: 'Ejecutada', img: 'la-libertad-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) La Libertad',
  ],
}
