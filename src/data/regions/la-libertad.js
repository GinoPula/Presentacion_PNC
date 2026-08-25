// Región nueva (agregada 25/08/2026). Intervenciones ejecutadas/en ejecución/
// programadas, convenios y flota vienen directo de Producción vía el pipeline
// (pipeline/generar_todas_regiones.py) -- correr ese script para reemplazar
// los ceros de ./_generated/la-libertad.js con los datos reales.
// puntosCriticos: extraído de 'EXCEL_CONSOLIDADO_569_oficial_PARA_OFICIALIZAR_1.xlsx'
// (hoja "RELACION FTR 2026", filtrado por DEPARTAMENTO=LA LIBERTAD, 9 fichas).
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
    { provincia: 'Ascope', distrito: 'Casa Grande', fichaTecnica: 'FTR-MC-PREV N° 0201-2026-ANA-AAA.HCH-ALA.CHICAMA', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce de la quebrada San Jose Alto (La Culebra).', metaKm: 1.0 },
    { provincia: 'Virú', distrito: 'Chao', fichaTecnica: 'FTR-MC-PREV N° 0177-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal.', metaKm: 3.0 },
    { provincia: 'Virú', distrito: 'Chao', fichaTecnica: 'FTR-MC-PREV N° 0178-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Chorobal.', metaKm: 3.53 },
    { provincia: 'Virú', distrito: 'Chao', fichaTecnica: 'FTR-MC-PREV N° 0179-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña.', metaKm: 3.16 },
    { provincia: 'Virú', distrito: 'Chao', fichaTecnica: 'FTR-MC-PREV N° 0180-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Huamanzaña.', metaKm: 3.0 },
    { provincia: 'Virú', distrito: 'Chao', fichaTecnica: 'FTR-MC-PREV N° 0181-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza, descolmatación y conformación de bordos con material propio del cauce del río Tutumo.', metaKm: 1.5 },
    { provincia: 'Pacasmayo', distrito: 'Guadalupe', fichaTecnica: 'FTR-MC-PREV N° 0281-2026-ANA-AAA.JZ-ALA.J', descripcion: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque.', metaKm: 4.0 },
    { provincia: 'Pacasmayo', distrito: 'San José', fichaTecnica: 'FTR-MC-PREV N° 0282-2026-ANA-AAA.JZ-ALA.J', descripcion: 'Limpieza, descolmatación y conformación de bordo con material propio del río Jequetepeque.', metaKm: 0.35 },
    { provincia: 'Virú', distrito: 'Virú', fichaTecnica: 'FTR-MC-PREV N° 0278-2026-ANA-AAA.HCH-ALA.MVCHAO', descripcion: 'Limpieza y descolmatación para el mantenimiento del cauce en el río Huacapongo.', metaKm: 0.39 },
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
