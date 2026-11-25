// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 24, m3: 230549.0, km: 42.63, poblacion: 271453, provincias: ['Chanchamayo', 'Chupaca', 'Huancayo', 'Satipo', 'Tarma'] },
    { tipo: 'Prevención', cantidad: 19, m3: 136795.0, km: 19.81, poblacion: 271090, provincias: ['Chanchamayo', 'Concepcion', 'Huancayo', 'Jauja', 'Satipo'] },
    { tipo: 'Urgente atención', cantidad: 1, m3: 120.0, km: 0.33, poblacion: 1580, provincias: ['Chupaca'] },
  ],
  ejecutadasTotal: { cantidad: 44, m3: 367464.0, m3AguaPotable: 120.0, km: 62.78, poblacion: 544123 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 8, m3: 100890.0, km: 8.2, poblacion: 7650, provincias: ['Chanchamayo', 'Huancayo', 'Jauja'] },
    { tipo: 'Prevención', cantidad: 30, m3: 201680.0, km: 36.0, poblacion: 57522, provincias: ['Chanchamayo', 'Concepcion', 'Huancayo', 'Jauja', 'Tarma'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 38, m3: 302570.0, m3AguaPotable: 0.0, km: 44.2, poblacion: 65172 },

  enEjecucion: [
    { provincia: 'Huancayo', distrito: 'Chilca', tipo: 'Prevención', descripcion: 'LIMPIEZA, DESCOLMATACION, ENCAUZAMIENTO Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO DEL RIO MANTARO,  DE LA  PROG. 0+000 A LA PROG. 0+948.50 EN LA ZONA URBANA DEL DISTRITO DE CHILCA, PROVINCIA DE HUANCAYO, REGION JUNIN', inicio: '19/11/2026', fin: '03/12/2026', volAcum: 2070.0, kmAcum: 0.48, poblacion: 1000, poblacionSinDuplicar: 1000 },
    { provincia: 'Jauja', distrito: 'Julcan', tipo: 'Prevención', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE DIQUE CON MATERIAL PROPIO EN EL RÍO JULCÁN, PROG. 0+000 A LA PROG. 2+425.61 KM, MARGEN IZQUIERDA, EN LA ZONA URBANA DE JULCÁN, DISTRITO DE JULCÁN, PROVINCIA DE JAUJA, REGIÓN JUNÍN”', inicio: '20/11/2026', fin: '26/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 15000, poblacionSinDuplicar: 15000 },
    { provincia: 'Satipo', distrito: 'Rio Tambo', tipo: 'Prevención', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE DIQUES CON MATERIAL PROPIO DEL CAUCE DEL RÍO QUEMPIRI EN LA PROGRESIVA 0+000 AL 1+381.75 KM DEL C.P. FE SELVA DE ORO EN EL DISTRITO DE RÍO TAMBO, PROVINCIA DE SATIPO, DEPARTAMENTO DE JUNÍN  ', inicio: '25/11/2026', fin: '04/12/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 400, poblacionSinDuplicar: 400 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', cantidad: 3, metaVol: 31153.99, metaKm: 2.82, poblacion: 6140 },
    { provincia: 'Huancayo', distrito: 'Chilca', cantidad: 1, metaVol: 14250.0, metaKm: 0.68, poblacion: 1200 },
    { provincia: 'Huancayo', distrito: 'Quichuay', cantidad: 1, metaVol: 5383.47, metaKm: 0.64, poblacion: 1848 },
  ],
  programadasTotal: { cantidad: 5, metaVol: 50787.46, metaKm: 4.14, poblacion: 9188 },

  programadasDetalle: [
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Zona Urbana', ficha: '002-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO GAROU, PROG. 0+000 A LA PROG. 0+625.13 KM EN AMBAS MARGENES DE LA ZONA URBANA DE LA MERCED, DISTRITO Y PROVINCIA DE CHANCHAMAYO-REGION JUNIN      ', fechaInicio: '27/11/2026', fechaFin: '11/12/2026', metaVol: 8215.97, metaKm: 0.62, poblacion: 720, poblacionSinDuplicar: 720 },
    { provincia: 'Huancayo', distrito: 'Quichuay', sector: 'Zona Urbana', ficha: '078-2026-LD-P-JUN', descripcion: ' LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO CON MATERIAL PROPIO DEL RIO ACHAMAYO DE LA  PROG. 0+000 A LA PROG. 0+636.92 KM, EN LA ZONA URBANA DEL DISTRITO DE QUICHUAY, PROVINCIA DE HUANCAYO, DEPARTAMENTO DE JUNIN ', fechaInicio: '29/11/2026', fechaFin: '13/12/2026', metaVol: 5383.47, metaKm: 0.64, poblacion: 1848, poblacionSinDuplicar: 1848 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Rio Toro', ficha: '001-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION ENCAUZAMIENTO Y CONFORMACION DE DIQUES CON MATERIAL PROPIO, DEL RIO TORO DESDE LA PROGRESIVA 0+000 AL 0+681.98 EN LA ZONA URBANA DE LA MERCED, DISTRITO Y PROVINCIA DE\nCHANCHAMAYO, REGION JUNIN   ', fechaInicio: '02/12/2026', fechaFin: '16/12/2026', metaVol: 16000.0, metaKm: 0.3, poblacion: 3500, poblacionSinDuplicar: 3500 },
    { provincia: 'Chanchamayo', distrito: 'Chanchamayo', sector: 'Zona Urbana', ficha: '068-2026-LD-P-JUN', descripcion: 'LIMPIEZA, DESCOLMATACION Y ENCAUZAMIENTO DEL RIO GAROU, PROG. 0+000 A LA PROG. 1+897.11 KM TRAMO III DE LAZONA URBANA DE LA MERCED, DISTRITO Y PROVINCIA DE CHANCHAMAYO-REGION JUNIN    ', fechaInicio: '02/12/2026', fechaFin: '16/12/2026', metaVol: 6938.02, metaKm: 1.9, poblacion: 1920, poblacionSinDuplicar: 1920 },
    { provincia: 'Huancayo', distrito: 'Chilca', sector: 'Río Ali', ficha: '082-2026-LD-P-JUN', descripcion: ' LIMPIEZA, DESCOLMATACION Y ELIMINACIÓN DE MATERIAL DESCOLMATADO DEL CAUCE DEL RÍO ALI, DE LA PROG. 0+300 A LA PROG. 0+980, AMBAS MÁRGENES, EN LA ZONA URBANA DEL DISTRITO DE CHILCA, PROVINCIA DE HUANCAYO, REGION JUNIN        \n ', fechaInicio: '05/12/2026', fechaFin: '19/12/2026', metaVol: 14250.0, metaKm: 0.68, poblacion: 1200, poblacionSinDuplicar: 1200 },
  ],

  puntosCriticos: [
  ],

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 29/04/2027' },
    { entidad: 'Municipalidad Distrital Rio Tambo', detail: 'hasta 27/02/2027' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGO-049'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['M5K00335'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'Caterpillar', codigos: ['JLX00220', 'JLX00221'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001609', 'D001612'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10887', 'A10857'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10876', '85515'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-577'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-004'], estado: 'inoperativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['284924'], estado: 'inoperativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'New Holland', codigos: ['NNHH09046'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81469'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Hino', codigos: ['EGR-381'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 4, marca: 'Mercedes Benz', codigos: ['EGV-829', 'EGV-796', 'EGV-760', 'EGV-812'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGM-832', 'EGM-871'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGN-513', 'EGN-108'], estado: 'inoperativo' },
  ],
  flotaTotal: 24,
}
