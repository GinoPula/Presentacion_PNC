// Contenido normativo compartido por todas las regiones (idéntico en los tres PPT fuente).

export const clasificacion = [
  {
    id: 1,
    titulo: 'Prevención Programada',
    subtitulo: 'Plazo mayor a 15 días',
    desc: 'Actividades coordinadas por el PNC y la Entidad Solicitante, mediante un Convenio de Colaboración Interinstitucional previamente suscrito.',
  },
  {
    id: 2,
    titulo: 'Prevención Programada',
    subtitulo: 'Plazo menor a 15 días',
    desc: 'Actividades de acción rápida coordinadas por el PNC y la Entidad Solicitante, mediante un Convenio de Colaboración Interinstitucional previamente suscrito.',
  },
  {
    id: 3,
    titulo: 'Declaratoria de Estado de Emergencia',
    subtitulo: 'Sin convenio previo',
    desc: 'Actividades ejecutadas por el PNC que no requieren la suscripción de un convenio y que responden a una Declaratoria de Estado de Emergencia establecida por el Gobierno Central.',
  },
  {
    id: 4,
    titulo: 'Situaciones de Urgencia',
    subtitulo: 'Sin convenio ni declaratoria',
    desc: 'Actividades ejecutadas por el PNC que no requieren convenio ni declaratoria de emergencia, sustentadas por la Entidad Solicitante mediante Acuerdo de Concejo.',
  },
]

export const directivas = [
  'Directiva de Programa N° 01-2024-VIVIENDA-VMVU/PNC: "Procedimiento para la ejecución de intervenciones a cargo del Programa Nuestras Ciudades del Ministerio de Vivienda, Construcción y Saneamiento".',
  'Directiva de Programa N° 001-2020-VIVIENDA/VMVU/PNC: "Procedimiento para la formulación, Gestión, Suscripción y ejecución de convenios de colaboración interinstitucional y sus adendas, en el ámbito del Programa Nuestras Ciudades" y modificatoria.',
]

// Tipos de intervenciones con maquinaria — extraído de la presentación nacional del PNC
// (slides "Tipos de intervenciones"). Contenido idéntico para las tres regiones.
export const tiposIntervencion = [
  {
    id: 1,
    titulo: 'Limpieza y descolmatación',
    desc: 'De cauces de ríos, quebradas, drenes y canales.',
    base: 'Programadas · DS · AC',
  },
  {
    id: 2,
    titulo: 'Encauzamiento y reforzamiento',
    desc: 'De diques de ríos, quebradas, drenes y canales.',
    base: 'Programadas · DS · AC',
  },
  {
    id: 3,
    titulo: 'Distribución y abastecimiento de agua',
    desc: 'Distribución de agua (DS) / abastecimiento de agua potable (AC) a la población afectada.',
    base: 'DS · AC',
  },
  {
    id: 4,
    titulo: 'Limpieza de escombros',
    desc: 'Por desastres que interrumpen la transitabilidad de las calles o vías.',
    base: 'DS',
  },
  {
    id: 5,
    titulo: 'Remoción y limpieza de escombros',
    desc: 'En poblaciones afectadas por fenómenos naturales.',
    base: 'AC',
  },
  {
    id: 6,
    titulo: 'Mejoramiento de la transitabilidad',
    desc: 'De calles y vías de acceso dentro de los centros poblados.',
    base: 'AC',
  },
]

export const marcoLegalTipos =
  'Prevención: Convenio de colaboración · DS: Decreto supremo de emergencia · AC: Acuerdo de Consejo.'
