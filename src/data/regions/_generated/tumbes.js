// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 9, m3: 32995.25, km: 6.97, poblacion: 8931, provincias: ['Contralmirante Villar', 'Tumbes', 'Zarumilla'] },
    { tipo: 'Prevención', cantidad: 23, m3: 75793.85, km: 11.05, poblacion: 19682, provincias: ['Contralmirante Villar', 'Tumbes'] },
    { tipo: 'Urgente atención', cantidad: 13, m3: 7815.0, km: null, poblacion: 17744, provincias: ['Tumbes'] },
  ],
  ejecutadasTotal: { cantidad: 45, m3: 116604.1, m3AguaPotable: 7815.0, km: 18.02, poblacion: 46357 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 5, m3: 22587.25, km: 6.57, poblacion: 4619, provincias: ['Tumbes'] },
    { tipo: 'Prevención', cantidad: 49, m3: 159311.48, km: 34.0, poblacion: 69230, provincias: ['Contralmirante Villar', 'Tumbes', 'Zarumilla'] },
    { tipo: 'Urgente atención', cantidad: 22, m3: 13504.0, km: 2.68, poblacion: 20109, provincias: ['Tumbes'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 76, m3: 195402.73, m3AguaPotable: 8490.0, km: 43.25, poblacion: 93958 },

  enEjecucion: [
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL SECTOR DE SAN ISIDRO DEL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES  ', inicio: '07/09/2026', fin: '04/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 1356 },
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: '"ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES” ', inicio: '14/09/2026', fin: '13/10/2026', volAcum: 75.0, kmAcum: 0.0, poblacion: 1356 },
    { provincia: 'Tumbes', distrito: 'La Cruz', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA LOS AGURTO, EN EL SECTOR LAS GARDENIAS DEL DISTRITO DE LA CRUZ, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES ', inicio: '15/09/2026', fin: '18/09/2026', volAcum: 235.0, kmAcum: 0.07, poblacion: 325 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Contralmirante Villar', distrito: 'Canoas De Punta Sal', cantidad: 1, metaVol: 1400.0, metaKm: 0.5, poblacion: 1737 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', cantidad: 1, metaVol: 4830.0, metaKm: 0.6, poblacion: 910 },
    { provincia: 'Contralmirante Villar', distrito: 'Zorritos', cantidad: 1, metaVol: 28852.0, metaKm: 1.15, poblacion: 2800 },
    { provincia: 'Tumbes', distrito: 'Corrales', cantidad: 2, metaVol: 6486.0, metaKm: 1.06, poblacion: 1405 },
    { provincia: 'Tumbes', distrito: 'La Cruz', cantidad: 2, metaVol: 3054.0, metaKm: 0.46, poblacion: 1775 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', cantidad: 1, metaVol: 4200.0, metaKm: 0.3, poblacion: 269 },
    { provincia: 'Tumbes', distrito: 'Tumbes', cantidad: 4, metaVol: 30329.6, metaKm: 3.16, poblacion: 12604 },
    { provincia: 'Zarumilla', distrito: 'Papayal', cantidad: 1, metaVol: 900.0, metaKm: 0.36, poblacion: 500 },
  ],
  programadasTotal: { cantidad: 13, metaVol: 80051.6, metaKm: 7.59, poblacion: 22000 },

  programadasDetalle: [
    { provincia: 'Tumbes', distrito: 'Tumbes', sector: '', ficha: '021-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA PEDREGAL TRAMO II, EN EL DISTRITO DE TUMBES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES” -00   ', fechaInicio: '19/09/2026', fechaFin: '03/10/2026', metaVol: 12000.0, metaKm: 1.04, poblacion: 5016 },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'Malval', ficha: '073-2026-LD-E-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA BOLIVAR, EN EL SECTOR MALVAL DEL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ', fechaInicio: '25/09/2026', fechaFin: '09/10/2026', metaVol: 3375.0, metaKm: 0.45, poblacion: 527 },
    { provincia: 'Tumbes', distrito: 'Tumbes', sector: 'José Lishner Tudela Y Alipio Rosales', ficha: '020-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA PEDREGAL, EN LOS SECTORES DE JOSÉ LISHNER TUDELA Y ALIPIO ROSALES DEL DISTRITO DE TUMBES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES” -00  ', fechaInicio: '04/10/2026', fechaFin: '18/10/2026', metaVol: 12000.0, metaKm: 1.05, poblacion: 6005 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', sector: 'Vista Hermosa', ficha: '074-2026-LD-E-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA RICA PLAYA, EN EL SECTOR VISTA HERMOSA DEL DISTRITO DE SAN JACINTO, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES  ', fechaInicio: '10/10/2026', fechaFin: '24/10/2026', metaVol: 4200.0, metaKm: 0.3, poblacion: 269 },
    { provincia: 'Tumbes', distrito: 'Tumbes', sector: '', ficha: '042-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA PEDREGAL, EN EL SECTOR CIUDADELA DE NOÉ DEL DISTRITO DE TUMBES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES”-00         ', fechaInicio: '19/10/2026', fechaFin: '28/10/2026', metaVol: 4760.0, metaKm: 0.85, poblacion: 1413 },
    { provincia: 'Tumbes', distrito: 'Corrales', sector: 'San Isidro', ficha: '063-2026-LD-PI-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA EL NIÑO, LOCALIDAD SAN ISIDRO, DISTRITO CORRALES, PROVINCIA TUMBES, DEPARTAMENTO TUMBES   ', fechaInicio: '29/10/2026', fechaFin: '01/11/2026', metaVol: 3111.0, metaKm: 0.61, poblacion: 878 },
    { provincia: 'Contralmirante Villar', distrito: 'Canoas De Punta Sal', sector: 'La Bombonera', ficha: '013-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA LA BOMBONERA, EN EL SECTOR DE LA BOMBONERA DEL DISTRITO DE CANOAS DE PUNTA SAL, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES” -00      ', fechaInicio: '02/11/2026', fechaFin: '08/11/2026', metaVol: 1400.0, metaKm: 0.5, poblacion: 1737 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', sector: 'Cañaveral', ficha: '015-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA MANUEL OTERO, EN LA LOCALIDAD DE CAÑAVERAL DEL DISTRITO DE CASITAS, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES" -00     ', fechaInicio: '05/11/2026', fechaFin: '14/11/2026', metaVol: 4830.0, metaKm: 0.6, poblacion: 910 },
    { provincia: 'Zarumilla', distrito: 'Papayal', sector: '', ficha: '018-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA LA ANTENA, EN EL DISTRITO DE PAPAYAL, PROVINCIA DE ZARUMILLA, DEPARTAMENTO DE TUMBES” -00   ', fechaInicio: '09/11/2026', fechaFin: '16/11/2026', metaVol: 900.0, metaKm: 0.36, poblacion: 500 },
    { provincia: 'Contralmirante Villar', distrito: 'Zorritos', sector: '', ficha: '022-2026-LD-PI-TUM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA NUEVO PARAISO, EN EL DISTRITO DE ZORRITOS, PROVINCIA DE CONTRALMIRANTE VILLAR, DEPARTAMENTO DE TUMBES”  -00 ', fechaInicio: '17/11/2026', fechaFin: '28/11/2026', metaVol: 28852.0, metaKm: 1.15, poblacion: 2800 },
    { provincia: 'Tumbes', distrito: 'Tumbes', sector: '', ficha: '062-2026-LD-PI-TUM', descripcion: '  “LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA 12 DE SETIEMBRE, EN EL DISTRITO DE TUMBES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES”\t\t\t\t\n      ', fechaInicio: '29/11/2026', fechaFin: '05/12/2026', metaVol: 1569.6, metaKm: 0.22, poblacion: 170 },
    { provincia: 'Tumbes', distrito: 'La Cruz', sector: 'San Jose', ficha: '065-2026-LD-PI-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA AFLUENTE SAN JOSÉ, SECTOR SAN JOSÉ, DISTRITO LA CRUZ, PROVINCIA TUMBES, DEPARTAMENTO TUMBES   ', fechaInicio: '06/12/2026', fechaFin: '09/12/2026', metaVol: 504.0, metaKm: 0.16, poblacion: 1024 },
    { provincia: 'Tumbes', distrito: 'La Cruz', sector: 'El Charan', ficha: '064-2026-LD-PI-TUM', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DE LA QUEBRADA AFLUENTE EL CHARÁN, SECTOR EL CHARÁN, DISTRITO LA CRUZ, PROVINCIA TUMBES, DEPARTAMENTO TUMBES          ', fechaInicio: '10/12/2026', fechaFin: '15/12/2026', metaVol: 2550.0, metaKm: 0.3, poblacion: 751 },
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
    { tipo: 'Volquete', cantidad: 8, marca: 'Mercedes Benz', codigos: ['EAJ-392', 'EGV-799', 'EGV-820', 'EGV-779', 'EGV-839', 'EAJ-394', 'EAJ-395', 'EGV-838'], estado: 'operativo' },
  ],
  flotaTotal: 22,
}
