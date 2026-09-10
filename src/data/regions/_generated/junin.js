// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 19, m3: 177464.0, km: 12.29, poblacion: 269942, provincias: ['Chanchamayo', 'Chupaca', 'Huancayo', 'Satipo', 'Tarma'] },
    { tipo: 'Prevención', cantidad: 14, m3: 89995.0, km: 9.14, poblacion: 263890, provincias: ['Chanchamayo', 'Concepcion', 'Huancayo', 'Satipo'] },
    { tipo: 'Urgente atención', cantidad: 1, m3: 120.0, km: 0.33, poblacion: 1580, provincias: ['Chupaca'] },
  ],
  ejecutadasTotal: { cantidad: 34, m3: 267579.0, m3AguaPotable: 120.0, km: 21.76, poblacion: 535412 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 8, m3: 100890.0, km: 8.2, poblacion: 7650, provincias: ['Chanchamayo', 'Huancayo', 'Jauja'] },
    { tipo: 'Prevención', cantidad: 30, m3: 201680.0, km: 36.0, poblacion: 57522, provincias: ['Chanchamayo', 'Concepcion', 'Huancayo', 'Jauja', 'Tarma'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 38, m3: 302570.0, m3AguaPotable: 0.0, km: 44.2, poblacion: 65172 },

  enEjecucion: [
    { provincia: 'Huancayo', distrito: 'Chupuro', tipo: 'Emergencia', descripcion: ' LIMPIEZA Y REMOCION DE ESCOMBROS A CONSECUENCIA DEL SISMO GRADO 5.1 DEL 18 DE JULIO DEL 2026 QUE\nINTERRUMPEN LA TRANSITABILIDAD EN EL DISTRITO DE CHUPURO, PROVINCIA DE HUANCAYO, REGION JUNI    ', inicio: '02/09/2026', fin: '01/10/2026', volAcum: 4970.0, kmAcum: 2.56, poblacion: 360 },
    { provincia: 'Huancayo', distrito: 'Viques', tipo: 'Emergencia', descripcion: 'LIMPIEZA Y REMOCION DE ESCOMBROS A CONSECUENCIA DEL SISMO GRADO 5.1 DEL 18 DE JULIO DEL 2026 QUE INTERRUMPEN LA TRANSITABILIDAD EN EL DISTRITO DE VIQUES, PROVINCIA DE HUANCAYO, REGION JUNIN     ', inicio: '02/09/2026', fin: '01/10/2026', volAcum: 3860.0, kmAcum: 1.39, poblacion: 336 },
    { provincia: 'Chupaca', distrito: 'Chongos Bajo', tipo: 'Emergencia', descripcion: ' LIMPIEZA Y REMOCION DE ESCOMBROS PARA LA TRANSITABILIDAD DE VIAS EN C.P DE CHONGOS BAJO ETAPA 3 Y ALEDAÑOS, DISTRITO DE CHONGOS BAJO, PROVINCIA DE CHUPACA, REGION JUNIN   ', inicio: '04/09/2026', fin: '03/10/2026', volAcum: 3630.0, kmAcum: 1.74, poblacion: 595 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', cantidad: 5, metaVol: 46834.82, metaKm: 3.16, poblacion: 6860 },
    { provincia: 'Concepcion', distrito: 'Concepcion', cantidad: 1, metaVol: 6500.0, metaKm: 0.15, poblacion: 1200 },
    { provincia: 'Concepcion', distrito: 'Matahuasi', cantidad: 1, metaVol: 5714.0, metaKm: 1.0, poblacion: 300 },
    { provincia: 'Huancayo', distrito: 'Pucara', cantidad: 1, metaVol: 16702.3, metaKm: 3.16, poblacion: 770 },
    { provincia: 'Huancayo', distrito: 'Quichuay', cantidad: 1, metaVol: 13601.81, metaKm: 1.99, poblacion: 300 },
    { provincia: 'Jauja', distrito: 'Jauja', cantidad: 1, metaVol: 5820.02, metaKm: 1.0, poblacion: 5160 },
    { provincia: 'Jauja', distrito: 'Julcan', cantidad: 1, metaVol: 8400.0, metaKm: 0.54, poblacion: 480 },
    { provincia: 'Jauja', distrito: 'Masma', cantidad: 2, metaVol: 14000.0, metaKm: 3.0, poblacion: 1200 },
    { provincia: 'Tarma', distrito: 'Tarma', cantidad: 1, metaVol: 7414.4, metaKm: 1.8, poblacion: 3200 },
  ],
  programadasTotal: { cantidad: 14, metaVol: 124987.35, metaKm: 15.8, poblacion: 19470 },

  programadasDetalle: [
    { provincia: 'Jauja', distrito: 'Masma', sector: 'Zona Urbana', ficha: '006-2026-LD-P-JUN', descripcion: ' "LIMPIEZA, DESCOLMATACION Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL CAUCE DEL RIO MASMA  DE LA  PROG. 0+000 A LA PROG. 1+500, VARIOS SECTORES AMBAS MARGENES, EN LA ZONA URBANA DEL DISTRITO DE MASMA, PROVINCIA DE JAUJA, REGION JUNIN"-00                   ', fechaInicio: '01/09/2026', fechaFin: '15/09/2026', metaVol: 7000.0, metaKm: 1.5, poblacion: 600 },
    { provincia: 'Huancayo', distrito: 'Pucara', sector: 'Zona Urbana', ficha: '005-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUES CON MATERIAL PROPIO DEL CAUCE DEL RIO CHANCHAS VARIOS TRAMOS DE LA PROG. 0+000 A LA PROG. 3+158 AMBAS MARGENES, EN LA ZONA URBANA DEL DISTRITO DE PUCARA, PROVINCIA HUANCAYO, REGION JUNIN-00        ', fechaInicio: '01/09/2026', fechaFin: '15/09/2026', metaVol: 16702.3, metaKm: 3.16, poblacion: 770 },
    { provincia: 'Jauja', distrito: 'Julcan', sector: 'Río Yacus', ficha: '021-2026-LD-P-JUN', descripcion: ' "LIMPIEZA, DESCOLMATACION Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL CAUCE DEL RIO YACUS  DE LA  PROG. 0+000 A LA PROG. 0+540 AMBAS MARGENES, EN LA ZONA URBANA DEL DISTRITO DE JULCAN, PROVINCIA DE JAUJA, REGION JUNIN"-00              ', fechaInicio: '01/09/2026', fechaFin: '14/09/2026', metaVol: 8400.0, metaKm: 0.54, poblacion: 480 },
    { provincia: 'Concepcion', distrito: 'Matahuasi', sector: 'Zona Urbana', ficha: '003-2026-LD-P-JUN', descripcion: ' "LIMPIEZA, DESCOLMATACION, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL RIO SECO,  DE LA  PROG. 0+000 A LA PROG. 0+500, AMBAS MÁRGENES, EN LA ZONA URBANA DEL DISTRITO DE MATAHUASI, PROVINCIA DE CONCEPCIÓN, REGION JUNIN"-00                  ', fechaInicio: '09/09/2026', fechaFin: '22/09/2026', metaVol: 5714.0, metaKm: 1.0, poblacion: 300 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Zona Urbana', ficha: '002-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO GAROU, PROG. 0+000 A LA PROG. 0+625.13 KM EN AMBAS MARGENES DE LA ZONA URBANA DE LA MERCED, DISTRITO Y PROVINCIA DE CHANCHAMAYO-REGION JUNIN', fechaInicio: '15/09/2026', fechaFin: '29/09/2026', metaVol: 8215.97, metaKm: 0.62, poblacion: 720 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Rio Garou', ficha: '001-2026-LD-P-JUN', descripcion: 'LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA RIO GAROU, DESDE LA PROG 0+000 A LA PROG 0+700, EN LA ZONA URBANA DEL DISTRITO DE CHANCHAMAYO, PROVINCIA DE CHANCHAMAYO, REGION JUNIN-00    ', fechaInicio: '18/09/2026', fechaFin: '02/10/2026', metaVol: 16000.0, metaKm: 0.3, poblacion: 3500 },
    { provincia: 'Tarma', distrito: 'Tarma', sector: 'Zona Urbana', ficha: '011-2026-LD-P-JUN', descripcion: ' "LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO MANIACO AMBAS MÁRGENES, DE LA PROG. 0+000 A LA PROG. 1+820, EN LA ZONA URBANA DEL DISTRITO DE TARMA, PROVINCIA DE TARMA, REGIÓN JUNIN"-00                    ', fechaInicio: '18/09/2026', fechaFin: '01/10/2026', metaVol: 7414.4, metaKm: 1.8, poblacion: 3200 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Rio Quisque', ficha: '018-2026-LD-P-JUN', descripcion: '  "LIMPIEZA, DESCOLMATACION, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL RÍO QUISQUE,  DE LA  PROG. 0+000 A LA PROG. 0+354 AMBAS MÁRGENES, EN LA ZONA URBANA DEL DISTRITO DE CHANCHAMAYO, PROVINCIA DE CHANCHAMAYO, REGION JUNIN"-00                  ', fechaInicio: '05/10/2026', fechaFin: '18/10/2026', metaVol: 3500.0, metaKm: 0.35, poblacion: 300 },
    { provincia: 'Jauja', distrito: 'Masma', sector: 'Zona Urbana', ficha: '007-2026-LD-P-JUN', descripcion: ' LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUES CON MATERIAL PROPIO DEL CAUCE DEL RIO MASMA, DE LA PROG 0+000 A LA PROG 1+500, EN VARIOS SECTORES DEL DISTRITO DE MASMA, PROVINCIA DE JAUJA, REGION JUNIN-00    ', fechaInicio: '05/10/2026', fechaFin: '18/10/2026', metaVol: 7000.0, metaKm: 1.5, poblacion: 600 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Zona Urbana', ficha: '020-2026-LD-P-JUN', descripcion: ' "LIMPIEZA, DESCOLMATACION, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL RÍO REITHER,  DE LA  PROG. 0+000 A LA PROG. 1+000 AMBAS MÁRGENES, EN LA ZONA URBANA DEL DISTRITO DE CHANCHAMAYO, PROVINCIA DE CHANCHAMAYO, REGION JUNIN"-00                    ', fechaInicio: '07/10/2026', fechaFin: '20/10/2026', metaVol: 8750.0, metaKm: 1.09, poblacion: 900 },
    { provincia: 'Concepcion', distrito: 'Concepcion', sector: 'Rio Achamayo', ficha: '024-2026-LD-P-JUN', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO EN EL RÍO ACHAMAYO, DE LA PROG 0+000 A LA PROG. 0+500, MARGEN DERECHA, DEL DISTRITO DE INGENIO, PROVINCIA DE CONCEPCION, DEPARTAMENTO JUNIN"               ', fechaInicio: '07/10/2026', fechaFin: '21/10/2026', metaVol: 6500.0, metaKm: 0.15, poblacion: 1200 },
    { provincia: 'Jauja', distrito: 'Jauja', sector: 'Zona Urbana', ficha: '009-2026-LD-P-JUN', descripcion: ' LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO YANAJA, DE LA PROG. 0+000 A LA PROG.1+005.93 KM EN LA ZONA URBANA DE APATA, DISTRITO DE JAUJA, PROVINCIA DE JAUJA-REGION JUNIN-00 ', fechaInicio: '01/11/2026', fechaFin: '20/11/2026', metaVol: 5820.02, metaKm: 1.0, poblacion: 5160 },
    { provincia: 'Huancayo', distrito: 'Quichuay', sector: 'Zona Urbana', ficha: '008-2026-LD-P-JUN', descripcion: ' LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO ACHAMAYO DE LA  PROG. 0+000 A LA PROG. 1+993.98 MARGEN DERECHA, EN LA ZONA URBANA DEL DISTRITO DE QUICHUAY, PROVINCIA DE HUANCAYO, DEPARTAMENTO DE JUNIN-00 ', fechaInicio: '01/11/2026', fechaFin: '14/11/2026', metaVol: 13601.81, metaKm: 1.99, poblacion: 300 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Zona Urbana', ficha: '010-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO GAROU, PROG. 0+000 A LA PROG. 0+788.93 KM TRAMO II EN AMBAS MARGENES DE LA ZONA URBANA DE LA MERCED, DISTRITO Y PROVINCIA DE CHANCHAMAYO-REGION JUNIN', fechaInicio: '01/11/2026', fechaFin: '15/11/2026', metaVol: 10368.85, metaKm: 0.79, poblacion: 1440 },
  ],

  conveniosCount: 3,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 29/04/2027' },
    { entidad: 'Municipalidad Distrital Cochas', detail: 'hasta 05/11/2026' },
    { entidad: 'Municipalidad Distrital Rio Tambo', detail: 'hasta 27/02/2027' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGO-049'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'Caterpillar', codigos: ['JLX00220', 'JLX00221'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['M5K00335'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001612', 'D001609'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10887', 'A10857'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10876', '85515'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-577'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-004'], estado: 'inoperativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['284924'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81469'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Hino', codigos: ['EGR-381'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-829'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 3, marca: 'Mercedes Benz', codigos: ['EGV-812', 'EGV-796', 'EGV-760'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGM-832', 'EGM-871'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGN-513', 'EGN-108'], estado: 'inoperativo' },
  ],
  flotaTotal: 23,
}
