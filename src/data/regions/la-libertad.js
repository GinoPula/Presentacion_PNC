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
// todosResponsables (RECONSTRUIDO 28/08/2026): antes salía de
// 'EXCEL_CONSOLIDADO_569_oficial_PARA_OFICIALIZAR_1.xlsx' (59 filas, con una
// categoría propia "ANA CONTRATA"). Franco reportó que esa versión contaba 7
// fichas MVCS cuando debían ser 6 -- al investigar, subió el consolidado más
// reciente ('EXCEL_CONSOLIDADO_536_PARA_MIDAGRI_14.08.2026_VF_REV_ANA.xlsx',
// hoja CONSOLIDADO, 536 filas reales a nivel nacional). Ese archivo nuevo no
// tiene la categoría "ANA CONTRATA" -- su columna RESPONSABLE solo trae
// ANA/MIDAGRI/MVCS/DEFENSA/MTC. Al comparar fichas de muestra, se confirmó
// que no es un simple cambio de nombre (algunas fichas "ANA CONTRATA" viejas
// no existen en absoluto en el archivo nuevo), así que Franco decidió (mensaje
// del 28/08/2026) reconstruir esta tabla ENTERA desde el archivo nuevo,
// usando su columna RESPONSABLE tal cual -- la categoría "ANA CONTRATA" ya no
// existe, ahora es "MIDAGRI" en su lugar (ver también src/lib/ayudaMemoria.js,
// tabla resumen). Con esto, La Libertad pasó de 58 a 63 filas (mvcs bajó de
// 7 a 6, correcto; midagri/ex-anaContrata subió de 43 a 48). Los campos
// ficha/provincia/distrito/sector/responsable vienen tal cual del Excel;
// actividad/meta/unidad se guardan como referencia pero OJO: el texto de
// "NOMBRE DE ACTIVIDAD" de este archivo nacional es genérico/reutilizado por
// río (no siempre describe la ubicación exacta de esa fila) -- no importa
// para el documento porque esos 3 campos no se muestran en la Ayuda Memoria
// (solo se usan responsable/provincia/distrito para la tabla dinámica y el
// conteo). Este archivo nuevo tampoco trae Puno ni Tacna (cubre Ancash/
// Arequipa/Ica/La Libertad/Lambayeque/Lima/Piura/Tumbes) -- esas 2 regiones
// se quedan sin esta tabla hasta tener su fuente.
//
// ayudaMemoriaDisponible: activa el botón "Generar Ayuda Memoria" en la web
// (src/lib/ayudaMemoria.js) -- disponible en las 8 regiones desde 28/08/2026;
// esta tabla de "todos los responsables" en particular solo en las 6 regiones
// que cubre el consolidado nuevo (ver arriba).
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
import galeria from '../galeria/la-libertad.json'

export default {
  id: 'la-libertad',
  label: 'Región La Libertad',
  shortLabel: 'La Libertad',

  meta: {
    region: 'Región La Libertad',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: '2026',
  },

  ...datosBD,

  todosResponsables: [
    { provincia: 'Ascope', distrito: 'Ascope', sector: 'Ascope', ficha: 'FTR-CB-PREV N° 1081-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Ascope', distrito: 'Ascope', sector: 'Facala', ficha: 'FTR-CB-PREV N° 1082-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 0.42, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Ascope', distrito: 'Casa Grande', sector: 'Mocan', ficha: 'FTR-MC-PREV N° 0119-2026-ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 620 },
    { provincia: 'Ascope', distrito: 'Casa Grande', sector: 'Mocan II', ficha: 'FTR-MC-PREV N° 0163-2026-ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Jose Alto (La Culebra)', meta: 1.415, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 620 },
    { provincia: 'Ascope', distrito: 'Casa Grande', sector: 'Chacarilla', ficha: 'FTR-MC-PREV N° 0201-2026-ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Sihuas', meta: 1.0, unidad: 'Km', responsable: 'DEFENSA', poblacion: 620 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Mala Muerte', ficha: 'FTR-CB-PREV N° 1076-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de dique enrocado en la margen izquierda del río Chicama', meta: 0.24, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 25 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Huabalito', ficha: 'FTR-CB-PREV N° 1077-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 1.65, unidad: 'Km', responsable: 'MVCS', poblacion: 132 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Jaguey', ficha: 'FTR-CB-PREV N° 1078-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y consformación de bordos en la quebrada S/N', meta: 1.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Pampas de Jaguey', ficha: 'FTR-CB-PREV N° 1079-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tumbes', meta: 1.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 10 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Compuerta Salinar', ficha: 'FTR-CB-PREV N° 1080-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nanchoc', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Puente Careaga', ficha: 'FTR-CB-PREV N° 1083-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Tambo', meta: 1.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Gran Chimu', distrito: 'Cascas', sector: 'Cojitambo', ficha: 'FTR-CB-PREV N° 0434-2025 ANA-AAA.HCH-ALA.CHICAMA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.645, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 3825 },
    { provincia: 'Pacasmayo', distrito: 'Guadalupe', sector: 'Pellejito-La Barranca', ficha: 'FTR-MC-PREV N° 0279-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 0.27, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pacasmayo', distrito: 'Guadalupe', sector: 'Pellejito-La Barranca 2', ficha: 'FTR-MC-PREV N° 0280-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 0.125, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pacasmayo', distrito: 'Guadalupe', sector: 'Isla de Faclo-La Barranca', ficha: 'FTR-MC-PREV N° 0281-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 4.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pacasmayo', distrito: 'San José', sector: 'Las Vegas-Chafan', ficha: 'FTR-MC-PREV N° 0282-2026-ANA-AAA.JZ-ALA.J', actividad: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque', meta: 0.35, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Calquiche', ficha: 'FTR-MC-PREV N° 0544-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Viuco', meta: 0.42, unidad: 'Km', responsable: 'MVCS', poblacion: 20 },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Vijus', ficha: 'FTR-MC-PREV N° 0545-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1200 },
    { provincia: 'Pataz', distrito: 'Pataz', sector: 'Caserio Pueblo Nuevo', ficha: 'FTR-MC-PREV N° 0546-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, Descolmatcaión y conformación de bordos en la quebrada Quinllan', meta: 0.1, unidad: 'Km', responsable: 'MVCS', poblacion: 100 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'La Viña', ficha: 'FTR-CB-PREV N° 0318-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Ica', meta: 1.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 280 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Corrales', ficha: 'FTR-CB-PREV N° 0319-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Ica', meta: 1.72, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 240 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Chagualito', ficha: 'FTR-CB-PREV N° 0320-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Los Incas', meta: 0.54, unidad: 'Km', responsable: 'MTC', poblacion: 240 },
    { provincia: 'Sanchez Carrión', distrito: 'Cochorco', sector: 'Corrales', ficha: 'FTR-MC-PREV N° 0276-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada El Catalino', meta: 0.23, unidad: 'Km', responsable: 'MVCS', poblacion: 120 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'El Pallar', ficha: 'FTR-CB-PREV N° 0908-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 64 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Candopata', ficha: 'FTR-CB-PREV N° 0911-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 2.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 700 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'San Salvador', ficha: 'FTR-MC-PREV N° 0624-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.77, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'La Polvora', ficha: 'FTR-MC-PREV N° 0625-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 210 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'N° 6', ficha: 'FTR-MC-PREV N° 0628-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Gorgor', meta: 0.266, unidad: 'Km', responsable: 'MVCS', poblacion: 320 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Coipin', ficha: 'FTR-MC-PREV N° 0629-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 45 },
    { provincia: 'Sanchez Carrión', distrito: 'Huamachuco', sector: 'Tucupina', ficha: 'FTR-MC-PREV N° 0630-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.46, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Sanchez Carrión', distrito: 'Sanagoran', sector: 'Vilcas', ficha: 'FTR-CB-PREV N° 0910-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 86 },
    { provincia: 'Sanchez Carrión', distrito: 'Sanagoran', sector: 'Sanagoran', ficha: 'FTR-MC-PREV N° 0631-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.425, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Santiago de Chuco', distrito: 'Sitabamba', sector: 'Pijobamba', ficha: 'FTR-CB-PREV N° 0942-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Veladero', meta: 0.906, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Santiago de Chuco', distrito: 'Sitabamba', sector: 'Chagabara', ficha: 'FTR-MC-PREV N° 0641-2025-ANA-AAA.M-ALA.H', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Tres Montones', meta: 0.289, unidad: 'Km', responsable: 'MVCS', poblacion: 80 },
    { provincia: 'Trujillo', distrito: 'El Porvenir', sector: 'El Baden', ficha: 'FTR-MC-PREV N° 0040-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.22, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1128 },
    { provincia: 'Trujillo', distrito: 'Laredo', sector: 'Jesús María', ficha: 'FTR-MC-PREV N° 0623-2025-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Moche', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 225 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'San Jorge Alto y Palotal', ficha: 'FTR-MC-PREV N° 0177-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 116 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Palotal y Cerro Cabras', ficha: 'FTR-MC-PREV N° 0178-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal', meta: 3.53, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 152 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Huasaquito', ficha: 'FTR-MC-PREV N° 0179-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña', meta: 3.16, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 600 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Santa Rita Alta', ficha: 'FTR-MC-PREV N° 0180-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña', meta: 3.0, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 800 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Tutumo', ficha: 'FTR-MC-PREV N° 0181-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tutumo', meta: 1.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 92 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Santa Rita Baja y Coronado', ficha: 'FTR-MC-PREV N° 0251-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamansaña', meta: 3.83, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 150 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Chao Alto y San Carlos', ficha: 'FTR-MC-PREV N° 0252-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamansaña', meta: 3.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Pampas de Tizal', ficha: 'FTR-MC-PREV N° 0254-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 2.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 240 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Pampas de Tizal y CP Chao', ficha: 'FTR-MC-PREV N° 0255-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 2.65, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2400 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'CP Chao y El Inca', ficha: 'FTR-MC-PREV N° 0256-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 4.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2400 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'El Inca y Palermo', ficha: 'FTR-MC-PREV N° 0257-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 3.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2450 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Palermo y San Jorge Alto', ficha: 'FTR-MC-PREV N° 0258-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 4.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 2450 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Bocana, Medanos y Laramie', ficha: 'FTR-MC-PREV N° 0259-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chao (río Chorobal)', meta: 5.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'El progreso y Santa Rita Baja', ficha: 'FTR-MC-PREV N° 0260-2026-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamansaña', meta: 3.42, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 150 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Cerro Loreto-Tanguche', ficha: 'FTR-CB-PREV N° 0351-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Zaña', meta: 0.75, unidad: 'Km', responsable: 'ANA', poblacion: 25 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'El Pozo-Tanguche', ficha: 'FTR-CB-PREV N° 0353-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 0.71, unidad: 'Km', responsable: 'ANA', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario 2-Tanguche', ficha: 'FTR-CB-PREV N° 0356-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.65, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario Las Torres', ficha: 'FTR-CB-PREV N° 0357-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Toma de Captación Ponte', ficha: 'FTR-CB-PREV N° 0358-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 20 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Captación Tanguche', ficha: 'FTR-CB-PREV N° 0359-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.5, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Cerro Loreto', ficha: 'FTR-CB-PREV N° 0360-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 1.8, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Pantano 2 El Carmen Tanguche', ficha: 'FTR-CB-PREV N° 0361-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 1.3, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 25 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Quebrada El Brujo-Pampa Blanca Tanguche', ficha: 'FTR-CB-PREV N° 0362-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Huaura', meta: 1.65, unidad: 'Km', responsable: 'ANA', poblacion: 50 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Seminario 1-Tanguche', ficha: 'FTR-CB-PREV N° 0363-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pisco', meta: 0.54, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 20 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'Toma Antigua Tanguche', ficha: 'FTR-CB-PREV N° 0364-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nepeña', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: 20 },
    { provincia: 'Virú', distrito: 'Chao', sector: 'San Carlos Bajo II', ficha: 'FTR-MC-PREV N° 0701-2025-ANA-AAA.HCH-ALA.MVCHAO', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Ingenio', meta: 1.0, unidad: 'Km', responsable: 'ANA', poblacion: 109 },
    { provincia: 'Virú', distrito: 'Guadalupito', sector: 'Sarcope-Tanguche', ficha: 'FTR-CB-PREV N° 0355-2025 ANA-AAA.HCH-ALA.SLN', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Piura', meta: 0.5, unidad: 'Km', responsable: 'ANA', poblacion: null },
  ],
  todosResponsablesResumen: { ana: 7, midagri: 48, defensa: 1, mtc: 1, mvcs: 6, total: 63 },

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

  // Resumen del Presupuesto FEN para esta región (agregado 03/09/2026, a pedido de Franco: el
  // mismo detalle que se armó para la Vista General -- ver comentario grande junto a
  // presupuestoFenResumenGlobal en src/data/global.js) -- mismas 2 fuentes, filtradas por
  // Departamento = LA LIBERTAD:
  //   puntosCriticos/materialM3/poblacionBeneficiada/demandaMef: "Demandas 2026 FEN- Formato
  //     Cronograma Meta Fisica FINALV2_010926.xlsx" (fila a fila, 62 filas de La Libertad).
  //   longitudKm: "programacion_no_fen.xlsx", hoja FINAL, fila LA LIBERTAD -- es la única de las
  //     dos que trae Km.
  presupuestoFenResumen: {
    fechaCorte: '01/09/2026',
    puntosCriticos: 62,
    materialM3: 379871.02,
    longitudKm: 49.33,
    poblacionBeneficiada: 112019,
    demandaMef: 1534493.1,
  },

  capacidad: [],

  personalUBO: [],

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/la-libertad.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Acuerdo Multisectorial de Puntos Críticos',
    'Unidad Básica Operativa (UBO) La Libertad',
  ],
}
