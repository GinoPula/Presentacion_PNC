// Datos extraídos de "REGIÓN PUNO AL 1508.pptx"
// Nota: el PPT original no incluye escenarios FEN/presupuesto ni puntos críticos ANA para esta región.
// La fila "Total general" de la tabla de ejecutadas venía copiada del reporte de Tumbes (error del
// documento fuente); aquí se muestra el total recalculado a partir de las filas por tipo de actividad.

// Actualizado: intervenciones ejecutadas/en ejecución/programadas desde el reporte
// 'inter_20260819114828.xlsx' exportado del MAIN (19/08/2026). Lo demás (convenios,
// puntos críticos, escenarios, flota, personal, galería) sigue viniendo del PPT/AM.
// Refrescado 24/08/2026 con 'inter_20260824112857.xlsx' -- de paso se corrigió un bug del
// pipeline: el m3/km de "ejecutadas" usaba META_VOL/META_KM (la meta contratada) en vez de
// ACUMULADO_VOL/ACUMULADO_KM (el avance físico realmente registrado); esto sobreestimaba
// el volumen/km ejecutado en todas las regiones. Cantidad y población no se vieron afectadas.
// Refrescado otra vez el mismo día con inter_20260824204815.xlsx (~9h después, sin cambio de
// lógica) para reflejar los avances incrementales del MAIN.
import datosBD from './_generated/puno'

export default {
  id: 'puno',
  label: 'Región Puno',
  shortLabel: 'Puno',

  meta: {
    region: 'Región Puno',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: 'Agosto 2026',
  },

  ...datosBD,

  puntosCriticos: null,
  escenarios: null,

  capacidad: [
    { label: 'Maquinaria pesada', valor: 12 },
    { label: 'Volquetes', valor: 8 },
    { label: 'Vehículos de apoyo', valor: 3 },
  ],

  personalUBO: [
    { rol: 'Coordinador regional', cantidad: 1 },
    { rol: 'Administrativo', cantidad: 1 },
    { rol: 'Analista', cantidad: 1 },
    { rol: 'Técnico mecánico', cantidad: 1 },
    { rol: 'Operadores', cantidad: 2 },
  ],

  galeria: [
    { id: 1, codigo: 'FTI N° 028-2026-LDE-PUN', estado: 'Ejecutada', img: 'puno-1' },
    { id: 2, codigo: 'FTI N° 030-2026-LDP-PUN', estado: 'Ejecutada', img: 'puno-2' },
    { id: 3, codigo: 'FTI N° 043-2026-LDP-PUN', estado: 'Ejecutada', img: 'puno-3' },
    { id: 4, codigo: 'FTI N° 010-2026-LDE-PUN', estado: 'Ejecutada', img: 'puno-4' },
  ],

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Unidad Básica Operativa (UBO) Puno',
  ],
}
