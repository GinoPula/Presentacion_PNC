// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 11, m3: 40395.25, km: 7.66, poblacion: 9727, provincias: ['Contralmirante Villar', 'Tumbes', 'Zarumilla'] },
    { tipo: 'Prevención', cantidad: 29, m3: 109666.95, km: 15.06, poblacion: 34356, provincias: ['Contralmirante Villar', 'Tumbes'] },
    { tipo: 'Urgente atención', cantidad: 15, m3: 9315.0, km: null, poblacion: 20456, provincias: ['Tumbes'] },
  ],
  ejecutadasTotal: { cantidad: 55, m3: 159377.2, m3AguaPotable: 9315.0, km: 22.72, poblacion: 64539 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 5, m3: 22587.25, km: 6.57, poblacion: 4619, provincias: ['Tumbes'] },
    { tipo: 'Prevención', cantidad: 49, m3: 158711.48, km: 33.94, poblacion: 69230, provincias: ['Contralmirante Villar', 'Tumbes', 'Zarumilla'] },
    { tipo: 'Urgente atención', cantidad: 22, m3: 13564.0, km: 2.68, poblacion: 20109, provincias: ['Tumbes'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 76, m3: 194862.73, m3AguaPotable: 8550.0, km: 43.19, poblacion: 93958 },

  enEjecucion: [
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: ' ABASTECIMIENTO DE AGUA PARA EL CONSUMO HUMANO EN EL SECTOR DE SAN ISIDRO DEL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES ', inicio: '23/10/2026', fin: '21/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 1356, poblacionSinDuplicar: 1356 },
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: ' ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES ', inicio: '26/10/2026', fin: '24/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 1385, poblacionSinDuplicar: 1385 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', tipo: 'Emergencia', descripcion: ' LIMPIEZA DE ESCOMBROS Y RECUPERACIÓN DE LA TRANSITABILIDAD EN LOS CENTROS POBLADOS CAÑAVERAL - LA CHOZA DEL DISTRITO DE CASITAS, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES', inicio: '05/11/2026', fin: '19/11/2026', volAcum: 1750.0, kmAcum: 2.25, poblacion: 1516, poblacionSinDuplicar: 1516 },
    { provincia: 'Contralmirante Villar', distrito: 'Zorritos', tipo: 'Prevención', descripcion: ' LIMPIEZA Y DESCOLMATACION DEL CAUCE DE LA QUEBRADA COSTA VERDE, EN EL SECTOR SÁNCHEZ CARRIÓN DEL DISTRITO DE ZORRITOS, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES', inicio: '17/11/2026', fin: '21/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 1031, poblacionSinDuplicar: 1031 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', tipo: 'Emergencia', descripcion: ' ATENCIÓN DE LA TRANSITABILIDAD DE LA VÍA EN LOS SECTORES MANUEL OTERO - BELLA VISTA DEL DISTRITO DE CASITAS, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES ', inicio: '20/11/2026', fin: '26/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 1516, poblacionSinDuplicar: 1516 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Contralmirante Villar', distrito: 'Canoas De Punta Sal', cantidad: 1, metaVol: 11000.0, metaKm: 1.0, poblacion: 1043 },
    { provincia: 'Tumbes', distrito: 'Corrales', cantidad: 1, metaVol: 3111.0, metaKm: 0.61, poblacion: 878 },
    { provincia: 'Zarumilla', distrito: 'Aguas Verdes', cantidad: 2, metaVol: 7960.0, metaKm: 2.75, poblacion: 1020 },
    { provincia: 'Zarumilla', distrito: 'Papayal', cantidad: 1, metaVol: 900.0, metaKm: 0.36, poblacion: 500 },
  ],
  programadasTotal: { cantidad: 5, metaVol: 22971.0, metaKm: 4.72, poblacion: 3441 },

  programadasDetalle: [
    { provincia: 'Contralmirante Villar', distrito: 'Canoas De Punta Sal', sector: 'Balneario Turistico Punta Sal', ficha: '085-2026-LD-PI-TUM', descripcion: 'LIMPIEZA Y DESCOOLMATACIÓN DEL CAUCE DE LA QUEBRADA EL BALNEARIO, EN EL SECTOR BALNEARIO TURISTICO PUNTA SAL DEL DISTRITO DE CANOAS DE PUNTA SAL, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES', fechaInicio: '23/11/2026', fechaFin: '06/12/2026', metaVol: 11000.0, metaKm: 1.0, poblacion: 1043, poblacionSinDuplicar: 1043 },
    { provincia: 'Zarumilla', distrito: 'Aguas Verdes', sector: '', ficha: '080-2026-LD-E-TUM', descripcion: ' ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DE LA QUEBRADA PIEDRITAS, EN EL SECTOR AGUAS ABAJO MARGEN DERECHA DEL DISTRITO DE AGUAS VERDES, PROVINCIA DE ZARUMILLA, DEPARTAMENTO DE TUMBES ', fechaInicio: '30/11/2026', fechaFin: '14/12/2026', metaVol: 4600.0, metaKm: 1.15, poblacion: 204, poblacionSinDuplicar: 204 },
    { provincia: 'Zarumilla', distrito: 'Aguas Verdes', sector: 'El Canario - San Martin', ficha: '082-2026-LETV-E-TUM', descripcion: ' LIMPIEZA DE ESCOMBROS Y RECUPERACION DE LA TRANSITABILIDAD EN LOS SECTORES EL CANARIO - SAN MARTIN DEL DISTRITO DE AGUAS VERDES, PROVINCIA DE ZARUMILLA, DEPARTAMENTO DE TUMBES', fechaInicio: '30/11/2026', fechaFin: '', metaVol: 3360.0, metaKm: 1.6, poblacion: 816, poblacionSinDuplicar: 816 },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'San Isidro', ficha: '063-2026-LD-PI-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA EL NIÑO, LOCALIDAD SAN ISIDRO, DISTRITO CORRALES, PROVINCIA TUMBES, DEPARTAMENTO TUMBES      ', fechaInicio: '07/12/2026', fechaFin: '10/12/2026', metaVol: 3111.0, metaKm: 0.61, poblacion: 878, poblacionSinDuplicar: 878 },
    { provincia: 'Zarumilla', distrito: 'Papayal', sector: '', ficha: '018-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA LA ANTENA, EN EL DISTRITO DE PAPAYAL, PROVINCIA DE ZARUMILLA, DEPARTAMENTO DE TUMBES” -00     ', fechaInicio: '09/12/2026', fechaFin: '16/12/2026', metaVol: 900.0, metaKm: 0.36, poblacion: 500, poblacionSinDuplicar: 500 },
  ],

  puntosCriticos: [
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Malval', fichaTecnica: '073-2026-LD-E-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA BOLIVAR, EN EL SECTOR MALVAL DEL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES\tDS180-P\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t         ', estado: 'Ejecutada', mes: '', metaKm: 0.45, metaVol: 3375.0, poblacion: 527 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vista Hermosa', fichaTecnica: '074-2026-LD-E-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA RICA PLAYA, EN EL SECTOR VISTA HERMOSA DEL DISTRITO DE SAN JACINTO, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES  DS180-P        ', estado: 'Ejecutada', mes: '', metaKm: 0.3, metaVol: 4200.0, poblacion: 269 },
  ],

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 03/07/2027' },
    { entidad: 'Municipalidad Distrital La Cruz', detail: 'hasta 19/05/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGN-007', 'EGM-976'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-002'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGM-052'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001608', 'D001613'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Caterpillar', codigos: ['TJT10112', 'TJT10094'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 2, marca: 'John Deere', codigos: ['G282145', 'G282149'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGW-173'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Volvo', codigos: ['EAJ-355'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['285283'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Caterpillar', codigos: ['AE800571'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 7, marca: 'Mercedes Benz', codigos: ['EAJ-392', 'EGV-799', 'EGV-820', 'EGV-779', 'EGV-839', 'EAJ-395', 'EGV-838'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EAJ-394'], estado: 'inoperativo' },
  ],
  flotaTotal: 22,
}
