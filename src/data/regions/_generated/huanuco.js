// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 3, m3: 9177.4, km: 1.7, poblacion: 1758, provincias: ['Huanuco', 'Leoncio Prado', 'Puerto Inca'] },
    { tipo: 'Prevención', cantidad: 13, m3: 72774.0, km: 7.05, poblacion: 13330, provincias: ['Ambo', 'Huanuco', 'Leoncio Prado', 'Marañon', 'Puerto Inca'] },
    { tipo: 'Urgente atención', cantidad: 1, m3: 2350.0, km: 0.24, poblacion: 120, provincias: ['Ambo'] },
  ],
  ejecutadasTotal: { cantidad: 17, m3: 84301.4, m3AguaPotable: 0.0, km: 8.99, poblacion: 15208 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 8, m3: 57334.0, km: 7.22, poblacion: 4038, provincias: ['Huanuco'] },
    { tipo: 'Prevención', cantidad: 23, m3: 227090.0, km: 16.43, poblacion: 12288, provincias: ['Ambo', 'Huanuco', 'Leoncio Prado', 'Marañon', 'Puerto Inca'] },
    { tipo: 'Urgente atención', cantidad: 3, m3: 3625.0, km: 3.61, poblacion: 9900, provincias: ['Ambo', 'Leoncio Prado', 'Puerto Inca'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 34, m3: 288049.0, m3AguaPotable: 0.0, km: 27.26, poblacion: 26226 },

  enEjecucion: [
    { provincia: 'Ambo', distrito: 'Ambo', tipo: 'Prevención', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN, Y ELIMINACIÓN DE MATERIAL DESCOLMATADO, DEL RIO HUALLAGA, DE LA PROG. 0+000 A LA PROG. 0+175 KM, SEGUNDO TRAMO, MARGEN DERECHA, SECTOR HUANCAPATA, EN LA ZONA URBANA DEL DISTRITO DE AMBO, PROVINCIA AMBO, REGIÓN HUÁNUCO".      ', inicio: '18/08/2026', fin: '01/09/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 3000 },
    { provincia: 'Leoncio Prado', distrito: 'Jose Crespo Y Castillo', tipo: 'Prevención', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN Y CONFORMACION DE DIQUE EN LA MARGEN IZQUIERDA DEL RIO AUCAYACU, SECTOR 27 DE MAYO ENTRE EL KM 00+000 Y KM 00+625 KM , DISTRITO DE JOSE CRESPO Y CASTILLO, PROVINCIA DE LEONCIO PRADO, DEPARTAMENTO HUANUCO"       ', inicio: '19/08/2026', fin: '02/09/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: null },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Ambo', distrito: 'San Rafael', cantidad: 2, metaVol: 21100.0, metaKm: 2.0, poblacion: 740 },
    { provincia: 'Huanuco', distrito: 'Amarilis', cantidad: 3, metaVol: 52349.11, metaKm: 2.32, poblacion: 3000 },
    { provincia: 'Huanuco', distrito: 'Churubamba', cantidad: 1, metaVol: 12000.0, metaKm: 1.5, poblacion: 350 },
    { provincia: 'Huanuco', distrito: 'Huanuco', cantidad: 3, metaVol: 18500.0, metaKm: 2.1, poblacion: 1870 },
    { provincia: 'Huanuco', distrito: 'Pillco Marca', cantidad: 1, metaVol: 8000.0, metaKm: 0.5, poblacion: 650 },
    { provincia: 'Leoncio Prado', distrito: 'Jose Crespo Y Castillo', cantidad: 2, metaVol: 8000.0, metaKm: 1.1, poblacion: 1050 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', cantidad: 2, metaVol: 19760.0, metaKm: 1.1, poblacion: 700 },
  ],
  programadasTotal: { cantidad: 14, metaVol: 139709.11, metaKm: 10.62, poblacion: 8360 },

  programadasDetalle: [
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', sector: 'Río Pozuzo', ficha: 'N° 008-2026-LD-P-HCO.', descripcion: ' LIMPIEZA, DESCOLMATACION Y CONFORMACION  DE DIQUE CON MATERIAL DE PRESTAMOS EN EL RIO POZUZO DE LA PROGRASIVA 0+300 A LA PROGRESIVA 0+600, DISTRITO DE CODO DEL POZUZO, PROVINCIA PUERTO INCA, REGION HUANUCO.-00      ', fechaInicio: '01/09/2026', fechaFin: '30/09/2026', metaVol: 10760.0, metaKm: 0.3, poblacion: 350 },
    { provincia: 'Huanuco', distrito: 'Amarilis', sector: 'Quebrada San Cristobal', ficha: 'N° 004-2026-LD-P-HCO.', descripcion: '"LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA DEL CERRO SAN CRISTOBAL, DE LA PROG. 0+000 A LA PROG. 0+050, EN LA ZONA URBANA DEL DISTRITO DE AMARILIS, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO"-00       ', fechaInicio: '01/09/2026', fechaFin: '30/09/2026', metaVol: 27000.0, metaKm: 0.58, poblacion: 1800 },
    { provincia: 'Huanuco', distrito: 'Amarilis', sector: 'Río Huallaga', ficha: 'N° 005-2026-LD-P-HCO.', descripcion: '"LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO DEL CAUCE DEL RÍO HUALLAGA, EN LA URB. HUAYOPAMPA, MARGEN DERECHA, DE LA PROG. 0+000 A LA PROG. 0+750, EN LA ZONA URBANA DEL DISTRITO DE AMARILIS, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO"-00       ', fechaInicio: '01/09/2026', fechaFin: '30/09/2026', metaVol: 10349.11, metaKm: 0.74, poblacion: 600 },
    { provincia: 'Huanuco', distrito: 'Churubamba', sector: 'Quebrada Chinobamba', ficha: 'N° 015-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACION, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO DEL CAUCE DE LA QUEBRADA CHINOBAMBA, DE LA  PROG. 0+000 A LA PROG. 1+500, MARGEN DERECHA, DEL DISTRITO DE CHURUBAMBA, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO”-00    ', fechaInicio: '01/09/2026', fechaFin: '30/09/2026', metaVol: 12000.0, metaKm: 1.5, poblacion: 350 },
    { provincia: 'Huanuco', distrito: 'Huanuco', sector: 'Quebrada Tingo Ragra', ficha: 'N° 011-2026-LD-P-HCO.', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DE LAS QUEBRADAS SECAS TINGORAGRA Y VIA CRUCIS AMBAS MARGENES, DESDE LA PROG. 0+000 A LA 0+300 DISTRITO DE HUANUCO, PROVINCIA DE HUANUCO Y DEPARTAMENTO DE HUANUCO-00      ', fechaInicio: '03/09/2026', fechaFin: '17/09/2026', metaVol: 4000.0, metaKm: 0.3, poblacion: 250 },
    { provincia: 'Huanuco', distrito: 'Pillco Marca', sector: 'Río Huancachupa', ficha: 'N° 014-2026-LD-P-HCO.', descripcion: '"LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL CAUCE DEL RÍO HUANCACHUPA AMBAS MÁRGENES, DE LA PROG. 0+000 A LA PROG. 0+480, EN LA ZONA URBANA DEL DISTRITO DE PILLCO MARCA, PROVINCIA DE HUÁNUCO, REGION HUÁNUCO"-00   ', fechaInicio: '03/09/2026', fechaFin: '17/09/2026', metaVol: 8000.0, metaKm: 0.5, poblacion: 650 },
    { provincia: 'Ambo', distrito: 'San Rafael', sector: 'Río Huallaga', ficha: 'N° 010-2026-LD-P-HCO', descripcion: '"LIMPIEZA, DESCOLMATACIÓN, ENCAUZAMIENTO, CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO Y ELIMINACIÓN DE MATERIAL DESCOLMATADO, DEL RÍO HUALLAGA, DE LA PROG. 0+000 A LA PROG. 1+400, SECTOR 01 DE MAYO, EN LA ZONA URBANA DEL DISTRITO DE SAN RAFAEL, PROVINCIA AMBO, REGIÓN HUÁNUCO"-00                  ', fechaInicio: '05/09/2026', fechaFin: '29/09/2026', metaVol: 12600.0, metaKm: 1.3, poblacion: 380 },
    { provincia: 'Huanuco', distrito: 'Huanuco', sector: 'Quebrada Huayco', ficha: 'N° 016-2026-LD-P-HCO.', descripcion: '"LIMPIEZA, DESCOLMATACION Y ELIMINACIÓN DE MATERIAL DESCOLMATADO, DEL CAUCE DE LA QUEBRADA HUAICO, DE LA  PROG. 0+000 A LA PROG. 1+300, AMBAS MÁRGENES, EN EL AA.HH. LA FLORIDA, DEL DISTRITO DE HUÁNUCO, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO”  ', fechaInicio: '15/09/2026', fechaFin: '09/10/2026', metaVol: 8000.0, metaKm: 1.3, poblacion: 870 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', sector: '', ficha: 'N° 019-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN Y ELIMINACIÓN DE MATERIAL DESCOLMATADO, DEL RÍO COLORADO, DE LA PROGRESIVA 0+000 A LA PROGRESIVA 0+780, AMBAS MÁRGENES, EN EL CASERÍO NUEVA YORK, EN LA ZONA URBANA DEL DISTRITO DE CODO DEL POZUZO, PROVINCIA PUERTO INCA, REGIÓN HUÁNUCO"-00     ', fechaInicio: '01/10/2026', fechaFin: '30/10/2026', metaVol: 9000.0, metaKm: 0.8, poblacion: 350 },
    { provincia: 'Huanuco', distrito: 'Amarilis', sector: 'Quebrada Jancao', ficha: 'N° 003-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA Y DESCOLMATACION DEL CAUCE DE LA QUEBRADA JANCAO, AMBAS MÁRGENES, DE LA PROG. 0+000 A LA PROG. 1+000, EN LA ZONA URBANA DEL DISTRITO DE AMARILIS, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO”-00     ', fechaInicio: '01/10/2026', fechaFin: '30/10/2026', metaVol: 15000.0, metaKm: 1.0, poblacion: 600 },
    { provincia: 'Huanuco', distrito: 'Huanuco', sector: 'Río Huallaga', ficha: 'N° 017-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO DEL CAUCE DEL RÍO HUALLAGA, EN LA URB. SAN GERMÁN, MARGEN DERECHA, DE LA PROG. 0+000 A LA PROG. 0+450, EN LA ZONA URBANA DEL DISTRITO DE AMARILIS, PROVINCIA DE HUÁNUCO, REGIÓN HUÁNUCO"-00   ', fechaInicio: '05/10/2026', fechaFin: '29/10/2026', metaVol: 6500.0, metaKm: 0.5, poblacion: 750 },
    { provincia: 'Leoncio Prado', distrito: 'Jose Crespo Y Castillo', sector: 'Río Huallaga', ficha: 'N° 021-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN, ENCAUZAMIENTO, CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO Y ELIMINACIÓN DE MATERIAL DESCOLMATADO DEL CAUCE DEL RÍO HUALLAGA, EN DIFERENTES TRAMOS, EN LA ZONA URBANA DEL CASERÍO SAN JOSÉ DE PUCANTE, DISTRITO DE JOSÉ CRESPO Y CASTILLO, PROVINCIA DE LEONCIO PRADO, REGIÓN HUÁNUCO"-00 ', fechaInicio: '02/11/2026', fechaFin: '26/11/2026', metaVol: 5500.0, metaKm: 0.6, poblacion: 850 },
    { provincia: 'Leoncio Prado', distrito: 'Jose Crespo Y Castillo', sector: 'Río Sangapilla', ficha: 'N° 020-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN DEL CAUCE DEL RÍO SANGAPILLA, DE LA PROG. 0+000 A LA PROG. 0+500, MARGEN DERECHA, EN LA ZONA URBANA DEL DISTRITO DE JOSÉ CRESPO Y CASTILLO, PROVINCIA DE LEONCIO PRADO, REGIÓN HUÁNUCO"-00   ', fechaInicio: '08/11/2026', fechaFin: '22/11/2026', metaVol: 2500.0, metaKm: 0.5, poblacion: 200 },
    { provincia: 'Ambo', distrito: 'San Rafael', sector: 'Río Huallaga', ficha: 'N° 022-2026-LD-P-HCO.', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN, ENCAUZAMIENTO, CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO Y ELIMINACIÓN DE MATERIAL DESCOLMATADO, DEL RÍO HUALLAGA, DE LA PROG. 0+000 A LA PROG. 0+700, DEL SECTOR SAUNAG, EN LA ZONA URBANA DEL DISTRITO DE SAN RAFAEL, PROVINCIA AMBO, REGIÓN HUÁNUCO"-00   ', fechaInicio: '01/12/2026', fechaFin: '30/12/2026', metaVol: 8500.0, metaKm: 0.7, poblacion: 360 },
  ],

  conveniosCount: 8,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 24/02/2027' },
    { entidad: 'Municipalidad Provincial Ambo', detail: 'hasta 07/10/2026' },
    { entidad: 'Municipalidad Provincial Huanuco', detail: 'hasta 19/08/2027' },
    { entidad: 'Municipalidad Distrital Luyando', detail: 'hasta 07/11/2026' },
    { entidad: 'Municipalidad Distrital Codo Del Pozuzo', detail: 'hasta 13/11/2026' },
    { entidad: 'Municipalidad Distrital Amarilis', detail: 'hasta 14/11/2026' },
    { entidad: 'Municipalidad Distrital Jose Crespo Y Castillo', detail: 'hasta 25/11/2026' },
    { entidad: 'Municipalidad Distrital San Francisco De Cayran', detail: 'hasta 03/12/2026' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-984'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'Caterpillar', codigos: ['JLX00245', 'JLX00821'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10096'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'John Deere', codigos: ['810156', '810397'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'Caterpillar', codigos: ['LMST05753'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'John Deere', codigos: ['272094'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-412'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-104'], estado: 'inoperativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286758'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81478'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-841', 'EGV-798'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 7, marca: 'Scania', codigos: ['EGN-536', 'EGM-810', 'EGN-535', 'EGM-934', 'EGN-507', 'EGM-820', 'EGM-776'], estado: 'operativo' },
  ],
  flotaTotal: 21,
}
