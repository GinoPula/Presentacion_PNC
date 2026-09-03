// Datos de la región Arequipa.
// Región nueva agregada el 29/08/2026 (Franco: "comencemos por arequipa, excepto las fotos" --
// segundo departamento nuevo del sitio después de Lima).
//
// Ejecutadas/en ejecución/programadas + mapa de intervenciones + convenios + flota: TODAVÍA NO
// corridas contra Producción -- ./_generated/arequipa.js es el placeholder en cero (nunca
// inventado). Para llenarlo con datos reales, correr:
//   python pipeline/generar_todas_regiones.py --repo "D:\Presentacion_PNC" --regiones arequipa --git-push
//
// Presupuesto/Escenarios FEN: sin fuente para Arequipa todavía (mismo criterio que Lima/Puno/
// Tacna) -- se omite la sección en vez de mostrar un presupuesto en cero que no es real.
//
// Puntos críticos (mismo criterio que Lima/Ancash/La Libertad): del consolidado 536
// ('EXCEL_CONSOLIDADO_536_PARA_MIDAGRI_14.08.2026_VF_REV_ANA.xlsx', hoja CONSOLIDADO), filtrado
// por DEPARTAMENTO = Arequipa (95 filas) y, dentro de esas, RESPONSABLE = MVCS (23 filas) --
// distinto del acumulado por entidad de la Ayuda Memoria, que sigue siendo
// todosResponsablesResumen.
//
// todosResponsables: igual método que Lima/Ancash/La Libertad -- las 95 filas de Arequipa del
// mismo consolidado 536, columna RESPONSABLE tal cual (en Arequipa solo aparecen MIDAGRI y MVCS,
// sin ANA/DEFENSA/MTC -- confirmado, no es un error de filtro). actividad/meta/unidad son solo
// referenciales (no se muestran en el documento, igual que en las demás regiones).
//
// Galería: pendiente a propósito (Franco: "excepto las fotos") -- src/data/galeria/arequipa.json
// queda vacío hasta que se cure el set de fotos, igual que se hizo con Lima al principio.
//
// ayudaMemoriaDisponible: activado igual que Lima -- sin Word curado a mano, usa el párrafo
// automático de src/lib/ayudaMemoria.js (seccionNarrativa) a partir de datos en vivo.
import datosBD from './_generated/arequipa'
import galeria from '../galeria/arequipa.json'

export default {
  id: 'arequipa',
  label: 'Región Arequipa',
  shortLabel: 'Arequipa',

  meta: {
    region: 'Región Arequipa',
    programa: 'Programa Nuestras Ciudades',
    seccion: 'Maquinarias',
    periodo: '2026',
  },

  ...datosBD,

  puntosCriticos: [
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Urb. San Rafael-Puente Concordia Aguas Abajo', fichaTecnica: 'FTR-CB-PREV N° 0105-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Nepeña', metaKm: 1.2 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Concordia Aguas Arriba', fichaTecnica: 'FTR-CB-PREV N° 0106-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chiquiquintay', metaKm: 0.36 },
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Los Arrayanes', fichaTecnica: 'FTR-CB-PREV N° 0117-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chambara', metaKm: 0.44 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Los Arrayanes', fichaTecnica: 'FTR-CB-PREV N° 0118-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Huaura', metaKm: 0.44 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Arquillo', fichaTecnica: 'FTR-CB-PREV N° 0120-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Santa', metaKm: 0.863 },
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Urb. Mariscal 3 Etapa', fichaTecnica: 'FTR-CB-PREV N° 0122-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', metaKm: 1.36 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Los Angeles', fichaTecnica: 'FTR-CB-PREV N° 0124-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Loco', metaKm: 1.2 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Cerrillos', fichaTecnica: 'FTR-CB-PREV N° 0139-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Pomabamba', metaKm: 0.5 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 1.ª Etapa-3', fichaTecnica: 'FTR-CB-PREV N° 0140-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Cascajal', metaKm: 0.23 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 2.ª Etapa', fichaTecnica: 'FTR-CB-PREV N° 0151-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformacion de bordos en el río Santa', metaKm: 0.8 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Avenida 54', fichaTecnica: 'FTR-CB-PREV N° 0152-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Santa', metaKm: 1.58 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Los Pioneros de Cayma', fichaTecnica: 'FTR-CB-PREV N° 0168-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Corrales', metaKm: 0.85 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Parque del Niño', fichaTecnica: 'FTR-CB-PREV N° 0169-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Condebamba', metaKm: 0.85 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asociación 1° de Junio', fichaTecnica: 'FTR-CB-PREV N° 0173-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Santa', metaKm: 2.76 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Urb. Alto Cayma-Urb. Las Malvinas', fichaTecnica: 'FTR-CB-PREV N° 0174-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Huancano', metaKm: 3.6 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asociación Rafael Belaunde Diez Canseco', fichaTecnica: 'FTR-CB-PREV N° 0175-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Maquerhua', metaKm: 2.46 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Bello Horizonte', fichaTecnica: 'FTR-MC-PREV N° 0134-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Cachipampa', metaKm: 2.02 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Paraiso y Villa Continental', fichaTecnica: 'FTR-MC-PREV N° 0135-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', metaKm: 2.38 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Deam Valdivia', fichaTecnica: 'FTR-MC-PREV N° 0152-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Putaca (Qda. Parco Grande)', metaKm: 1.6 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Valdivia Aguas Arriba', fichaTecnica: 'FTR-MC-PREV N° 0153-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Santa', metaKm: 1.4 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Complejo 11 de Mayo', fichaTecnica: 'FTR-MC-PREV N° 0158-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Acarí', metaKm: 1.06 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Cerrillos-Fundo Cabrerías', fichaTecnica: 'FTR-MC-PREV N° 0164-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en el río Taymi', metaKm: 2.16 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asoc. Villarreal Chumbivilca', fichaTecnica: 'FTR-MC-PREV N° 0165-2026-ANA-AAA.CO-ALA.CH', descripcion: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chiquiquintay', metaKm: 0.73 },
  ],
  escenarios: null,

  // Sin fuente de capacidad de flota (Estado_Maquinarias) filtrada por Arequipa todavía --
  // se deja vacío (nunca inventado) hasta correr el pipeline o recibir el Excel de flota.
  capacidad: [],

  // Sin fuente para personal de la UBO Arequipa todavía -- se deja vacío (el sitio muestra
  // "Información pendiente de la UBO" en vez de un total de 0 inventado).
  personalUBO: [],

  // todosResponsables: ver comentario arriba del archivo.
  todosResponsables: [
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Humarote', ficha: 'FTR-CB-PREV N° 0018-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Acarí', meta: 0.72, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Humarote Bajo', ficha: 'FTR-CB-PREV N° 0019-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Acarí', meta: 0.635, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Huarato', ficha: 'FTR-CB-PREV N° 0021-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Acarí', meta: 0.45, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Amato', ficha: 'FTR-CB-PREV N° 0022-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Acarí', meta: 0.74, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 60 },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Malco II', ficha: 'FTR-CB-PREV N° 0024-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Yauca', meta: 0.26, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Chocavento', ficha: 'FTR-CB-PREV N° 0025-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Acarí', meta: 0.8, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Chocavento II', ficha: 'FTR-CB-PREV N° 0026-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Acarí', meta: 0.645, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Lucasi Alto', ficha: 'FTR-CB-PREV N° 0027-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Acarí', meta: 0.365, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Lucasi Bajo', ficha: 'FTR-CB-PREV N° 0028-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Acarí', meta: 0.42, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Acarí Pueblo', ficha: 'FTR-CB-PREV N° 0029-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Acarí', meta: 0.74, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Acarí', sector: 'Tambo Viejo', ficha: 'FTR-CB-PREV N° 0030-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Protección con enrocado en la margen derecha del río Acarí', meta: 1.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Marcahue', ficha: 'FTR-CB-PREV N° 0032-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación, conformación de bordos en el río Yauca', meta: 0.13, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 50 },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Huaychamaca', ficha: 'FTR-CB-PREV N° 0033-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y cconformación de bordos en la quebrada sin nombre', meta: 0.19, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Huaychamaca', ficha: 'FTR-CB-PREV N° 0034-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda de la quebrada Quicacha', meta: 0.18, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 15 },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Irurupa', ficha: 'FTR-CB-PREV N° 0035-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 0.17, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Irurupa II', ficha: 'FTR-CB-PREV N° 0036-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha de la quebrada Puicuto', meta: 0.13, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Sahuara', ficha: 'FTR-CB-PREV N° 0037-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Chaparra', meta: 0.355, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Huambo', ficha: 'FTR-CB-PREV N° 0038-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 0.16, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Molino Tiruque', ficha: 'FTR-CB-PREV N° 0039-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chili', meta: 0.135, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Quicacha', sector: 'Arasqui La Victoria', ficha: 'FTR-CB-PREV N° 0040-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Chaparra', meta: 0.365, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Monte Quemado', ficha: 'FTR-CB-PREV N° 0041-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha e izquierda del río Chaparra', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 100 },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Cascajal', ficha: 'FTR-CB-PREV N° 0042-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Escaleria', meta: 0.08, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Parco Puquio Viña Grande I', ficha: 'FTR-CB-PREV N° 0043-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Chaparra', meta: 0.135, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Azocaya', ficha: 'FTR-CB-PREV N° 0044-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Chaparra', meta: 0.295, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Achanizo', ficha: 'FTR-CB-PREV N° 0045-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Chaparra', meta: 0.35, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Chaparra', sector: 'Huancalpa', ficha: 'FTR-CB-PREV N° 0046-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Chaparra', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Jaqui', sector: 'Lampilla', ficha: 'FTR-CB-PREV N° 0050-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen izquierda del río Yauca', meta: 0.475, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Jaqui', sector: 'Mochica Baja', ficha: 'FTR-CB-PREV N° 0051-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Yauca', meta: 0.88, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Jaqui', sector: 'Colca', ficha: 'FTR-CB-PREV N° 0052-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen izquierda del río Yauca', meta: 0.745, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Caravelí', distrito: 'Jaqui', sector: 'Uchuani', ficha: 'FTR-CB-PREV N° 0053-2026-ANA-AAA.CHCH-ALA.CHA', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Yauca', meta: 0.33, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'La Ribereña', ficha: 'FTR-CB-PREV N° 0113-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Chullo', meta: 0.126, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 30 },
    { provincia: 'Arequipa', distrito: 'Sachaca', sector: 'Backus', ficha: 'FTR-CB-PREV N° 0115-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 0.69, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Arequipa', distrito: 'Sachaca', sector: 'Backus Aguas Abajo', ficha: 'FTR-CB-PREV N° 0116-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chullo', meta: 1.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 85 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 1.ª Etapa-1', ficha: 'FTR-CB-PREV N° 0125-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos y poza de disipación en la quebrada Gamarra', meta: 0.075, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 32 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 1.ª Etapa-2', ficha: 'FTR-CB-PREV N° 0126-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos y poza de disipación en la quebrada Gamarra', meta: 0.283, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 96 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Cercado 2-Puente San Isisdro', ficha: 'FTR-CB-PREV N° 0158-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chili', meta: 0.21, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 70 },
    { provincia: 'Arequipa', distrito: 'Sachaca', sector: 'Janter-Puente Tingo', ficha: 'FTR-CB-PREV N° 0159-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Chili', meta: 0.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Puente de Fierro', ficha: 'FTR-CB-PREV N° 0160-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen derecha del río Chili', meta: 0.395, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 180 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Vallecito', ficha: 'FTR-CB-PREV N° 0161-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chili', meta: 0.17, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 180 },
    { provincia: 'Arequipa', distrito: 'Jacobo Hunter', sector: 'Tiabaya-Puente Beily', ficha: 'FTR-CB-PREV N° 0163-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y construcción de dique con enrocado en la margen izquierda del río Chili', meta: 0.58, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 8 },
    { provincia: 'Arequipa', distrito: 'Tiabaya', sector: 'Puente Tiabaya', ficha: 'FTR-CB-PREV N° 0167-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Chili', meta: 0.87, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Tingo', ficha: 'FTR-CB-PREV N° 0183-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 0.28, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 96 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Puente Ernesto Gunther', ficha: 'FTR-CB-PREV N° 0193-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 1.062, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 180 },
    { provincia: 'Arequipa', distrito: 'Jacobo Hunter', sector: 'Puente Ernesto Gunther', ficha: 'FTR-CB-PREV N° 0194-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 1.064, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 115 },
    { provincia: 'Arequipa', distrito: 'Jacobo Hunter', sector: 'Club de Abogados', ficha: 'FTR-CB-PREV N° 0195-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Los Incas', meta: 0.52, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 160 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Club de Abogados', ficha: 'FTR-CB-PREV N° 0196-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 0.15, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 240 },
    { provincia: 'Arequipa', distrito: 'José Luis Bustamante y Rivero', sector: 'Universidad Continental', ficha: 'FTR-CB-PREV N° 0202-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y construcción de muro de concreto armado en la margen izquierda de la quebrada Los Incas', meta: 0.245, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 105 },
    { provincia: 'Arequipa', distrito: 'Socabaya', sector: 'Puente de la Amistad Aguas Abajo', ficha: 'FTR-CB-PREV N° 0220-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 2.6, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 600 },
    { provincia: 'Arequipa', distrito: 'Jacobo Hunter', sector: 'Las Peñas y Puente de la Amistad', ficha: 'FTR-CB-PREV N° 0221-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 3.468, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 750 },
    { provincia: 'Arequipa', distrito: 'Socabaya', sector: 'Las Peñas y Avenida Socabaya', ficha: 'FTR-CB-PREV N° 0222-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada S/N', meta: 1.163, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 450 },
    { provincia: 'Arequipa', distrito: 'José Luis Bustamante y Rivero', sector: 'Villa Santa Luisa', ficha: 'FTR-CB-PREV N° 0227-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y construcción de muro de concreto armado en la margen derecha de la quebrada S/N', meta: 0.212, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 650 },
    { provincia: 'Condesuyos', distrito: 'Andaray', sector: 'Ochuro', ficha: 'FTR-CB-PREV N° 0231-2026-ANA-AAA.CO-ALA.OP', actividad: 'Limpieza, descolmatación y confomación de bordos en la quebrada Escaleria', meta: 0.2, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 6 },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Carrizal', ficha: 'FTR-CB-PREV N° 0866-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Tambo', meta: 0.235, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Checa', ficha: 'FTR-CB-PREV N° 0867-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Tambo', meta: 0.363, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'El Toro', ficha: 'FTR-CB-PREV N° 0868-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Tambo', meta: 0.7, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Bocatoma Jusiem', ficha: 'FTR-CB-PREV N° 0870-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Tambo', meta: 0.24, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 40 },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Pablo Camilo', ficha: 'FTR-CB-PREV N° 0884-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Tambo', meta: 0.135, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Pascana', ficha: 'FTR-CB-PREV N° 0885-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Tambo', meta: 0.34, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Puerto Viejo-Ayanquera', ficha: 'FTR-CB-PREV N° 0886-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen derecha del río Tambo', meta: 1.03, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Islay', distrito: 'Cocachacra', sector: 'Santa Rosa', ficha: 'FTR-CB-PREV N° 0888-2025-ANA-AAA.CO-ALA.TAT', actividad: 'Limpieza, descolmatación y conformación de dique con enrocado en la margen izquierda del río Tambo', meta: 0.53, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Bajo Puente Grau', ficha: 'FTR-MC-PREV N° 0154-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce del río Chili', meta: 0.4, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 295 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Puente San Martín', ficha: 'FTR-MC-PREV N° 0155-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce del río Chili', meta: 0.63, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 350 },
    { provincia: 'Arequipa', distrito: 'Jacobo Hunter', sector: 'Terminal Terrestre', ficha: 'FTR-MC-PREV N° 0171-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Los Incas', meta: 0.39, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 80 },
    { provincia: 'Arequipa', distrito: 'José Luis Bustamante y Rivero', sector: 'Los Incas', ficha: 'FTR-MC-PREV N° 0172-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada Los Incas', meta: 1.29, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 850 },
    { provincia: 'Arequipa', distrito: 'José Luis Bustamante y Rivero', sector: 'La Cantuta', ficha: 'FTR-MC-PREV N° 0174-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y confomación de bordos en el río Piura', meta: 0.13, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 300 },
    { provincia: 'Arequipa', distrito: 'José Luis Bustamante y Rivero', sector: 'Puente Acomayo aguas arriba y abajo', ficha: 'FTR-MC-PREV N° 0187-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce de la quebrada S/N', meta: 1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 1200 },
    { provincia: 'Arequipa', distrito: 'Uchumayo', sector: 'Bocatoma Socosani', ficha: 'FTR-MC-PREV N° 0266-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce del río Chili', meta: 0.1, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Arequipa', distrito: 'Tiabaya', sector: 'La Piscina', ficha: 'FTR-MC-PREV N° 0302-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Chili', meta: 0.61, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 10 },
    { provincia: 'Arequipa', distrito: 'Uchumayo', sector: 'Congata', ficha: 'FTR-MC-PREV N° 0303-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en ambas margenes del río Chili', meta: 0.34, unidad: 'Km', responsable: 'MIDAGRI', poblacion: null },
    { provincia: 'Arequipa', distrito: 'Socabaya', sector: 'Cinco Ramos', ficha: 'FTR-MC-PREV N° 0655-2025-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Socabaya', meta: 0.14, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 200 },
    { provincia: 'Arequipa', distrito: 'Socabaya', sector: 'El Medio y Molino', ficha: 'FTR-MC-PREV N° 0657-2025-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos con material propio en ambas margenes del río Socabaya (Río Postreros)', meta: 0.68, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 120 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Chichas y la Polvora', ficha: 'FTR-MC-PREV N° 0658-2025-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza y descolmatación para el mantenimiento del cauce del río Chili', meta: 0.21, unidad: 'Km', responsable: 'MIDAGRI', poblacion: 94 },
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Urb. San Rafael-Puente Concordia Aguas Abajo', ficha: 'FTR-CB-PREV N° 0105-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Nepeña', meta: 1.2, unidad: 'Km', responsable: 'MVCS', poblacion: 680 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Concordia Aguas Arriba', ficha: 'FTR-CB-PREV N° 0106-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chiquiquintay', meta: 0.36, unidad: 'Km', responsable: 'MVCS', poblacion: 200 },
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Los Arrayanes', ficha: 'FTR-CB-PREV N° 0117-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chambara', meta: 0.44, unidad: 'Km', responsable: 'MVCS', poblacion: 260 },
    { provincia: 'Arequipa', distrito: 'Arequipa', sector: 'Los Arrayanes', ficha: 'FTR-CB-PREV N° 0118-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Huaura', meta: 0.44, unidad: 'Km', responsable: 'MVCS', poblacion: 140 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Arquillo', ficha: 'FTR-CB-PREV N° 0120-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 0.863, unidad: 'Km', responsable: 'MVCS', poblacion: 650 },
    { provincia: 'Arequipa', distrito: 'Yanahuara', sector: 'Urb. Mariscal 3 Etapa', ficha: 'FTR-CB-PREV N° 0122-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 1.36, unidad: 'Km', responsable: 'MVCS', poblacion: 1280 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Los Angeles', ficha: 'FTR-CB-PREV N° 0124-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Loco', meta: 1.2, unidad: 'Km', responsable: 'MVCS', poblacion: 800 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Cerrillos', ficha: 'FTR-CB-PREV N° 0139-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Pomabamba', meta: 0.5, unidad: 'Km', responsable: 'MVCS', poblacion: 560 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 1.ª Etapa-3', ficha: 'FTR-CB-PREV N° 0140-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Cascajal', meta: 0.23, unidad: 'Km', responsable: 'MVCS', poblacion: 270 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Fundo Cabreria 2.ª Etapa', ficha: 'FTR-CB-PREV N° 0151-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformacion de bordos en el río Santa', meta: 0.8, unidad: 'Km', responsable: 'MVCS', poblacion: 140 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Avenida 54', ficha: 'FTR-CB-PREV N° 0152-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.58, unidad: 'Km', responsable: 'MVCS', poblacion: 840 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Los Pioneros de Cayma', ficha: 'FTR-CB-PREV N° 0168-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Corrales', meta: 0.85, unidad: 'Km', responsable: 'MVCS', poblacion: 360 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Parque del Niño', ficha: 'FTR-CB-PREV N° 0169-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Condebamba', meta: 0.85, unidad: 'Km', responsable: 'MVCS', poblacion: 430 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asociación 1° de Junio', ficha: 'FTR-CB-PREV N° 0173-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 2.76, unidad: 'Km', responsable: 'MVCS', poblacion: 1260 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Urb. Alto Cayma-Urb. Las Malvinas', ficha: 'FTR-CB-PREV N° 0174-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Huancano', meta: 3.6, unidad: 'Km', responsable: 'MVCS', poblacion: 1440 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asociación Rafael Belaunde Diez Canseco', ficha: 'FTR-CB-PREV N° 0175-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Maquerhua', meta: 2.46, unidad: 'Km', responsable: 'MVCS', poblacion: 1080 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Bello Horizonte', ficha: 'FTR-MC-PREV N° 0134-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Cachipampa', meta: 2.02, unidad: 'Km', responsable: 'MVCS', poblacion: 720 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Paraiso y Villa Continental', ficha: 'FTR-MC-PREV N° 0135-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Chicama', meta: 2.38, unidad: 'Km', responsable: 'MVCS', poblacion: 600 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Deam Valdivia', ficha: 'FTR-MC-PREV N° 0152-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Putaca (Qda. Parco Grande)', meta: 1.6, unidad: 'Km', responsable: 'MVCS', poblacion: 1380 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Puente Valdivia Aguas Arriba', ficha: 'FTR-MC-PREV N° 0153-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Santa', meta: 1.4, unidad: 'Km', responsable: 'MVCS', poblacion: 830 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Complejo 11 de Mayo', ficha: 'FTR-MC-PREV N° 0158-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Acarí', meta: 1.06, unidad: 'Km', responsable: 'MVCS', poblacion: 380 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Villa Cerrillos-Fundo Cabrerías', ficha: 'FTR-MC-PREV N° 0164-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en el río Taymi', meta: 2.16, unidad: 'Km', responsable: 'MVCS', poblacion: 520 },
    { provincia: 'Arequipa', distrito: 'Cayma', sector: 'Asoc. Villarreal Chumbivilca', ficha: 'FTR-MC-PREV N° 0165-2026-ANA-AAA.CO-ALA.CH', actividad: 'Limpieza, descolmatación y conformación de bordos en la quebrada Chiquiquintay', meta: 0.73, unidad: 'Km', responsable: 'MVCS', poblacion: 600 },
  ],
  todosResponsablesResumen: { ana: 0, midagri: 72, defensa: 0, mtc: 0, mvcs: 23, total: 95 },

  ayudaMemoriaDisponible: true,

  // Galería editable desde el panel del propietario (agregar ?admin=1 a la URL) --
  // los datos viven en src/data/galeria/arequipa.json, el panel los actualiza vía la API de GitHub.
  galeria,

  fuentes: [
    'Programa Nuestras Ciudades (PNC) — Ministerio de Vivienda, Construcción y Saneamiento',
    'Autoridad Nacional del Agua (ANA) — Consolidado nacional de puntos críticos',
    'Unidad Básica Operativa (UBO) Arequipa',
  ],
}
