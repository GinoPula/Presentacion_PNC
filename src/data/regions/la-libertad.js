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
