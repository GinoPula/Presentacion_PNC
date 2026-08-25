// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 9, m3: 32995.25, km: 6.97, poblacion: 8931 },
    { tipo: 'Prevención', cantidad: 23, m3: 75793.85, km: 11.05, poblacion: 19682 },
    { tipo: 'Urgente atención', cantidad: 11, m3: 6315.0, km: null, poblacion: 15032 },
  ],
  ejecutadasTotal: { cantidad: 43, m3: 115104.1, km: 18.02, poblacion: 43645 },

  enEjecucion: [
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL SECTOR DE SAN ISIDRO DEL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES', inicio: '30/07/2026', fin: '28/08/2026', volAcum: 585, poblacion: 1356 },
    { provincia: 'Tumbes', distrito: 'Corrales', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL DISTRITO DE CORRALES, PROVINCIA DE TUMBES, DEPARTAMENTO DE TUMBES”', inicio: '07/08/2026', fin: '05/09/2026', volAcum: 405, poblacion: 1356 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Contralmirante Villar', distrito: 'Canoas De Punta Sal', cantidad: 2, metaVol: 3728.0, metaKm: 1.08, poblacion: 3237 },
    { provincia: 'Contralmirante Villar', distrito: 'Casitas', cantidad: 2, metaVol: 7454.0, metaKm: 1.25, poblacion: 1510 },
    { provincia: 'Contralmirante Villar', distrito: 'Zorritos', cantidad: 1, metaVol: 28852.0, metaKm: 1.15, poblacion: 2800 },
    { provincia: 'Tumbes', distrito: 'Corrales', cantidad: 1, metaVol: 3111.0, metaKm: 0.61, poblacion: 878 },
    { provincia: 'Tumbes', distrito: 'La Cruz', cantidad: 2, metaVol: 3054.0, metaKm: 0.46, poblacion: 1775 },
    { provincia: 'Tumbes', distrito: 'San Jacinto', cantidad: 1, metaVol: 1120.0, metaKm: 0.4, poblacion: 840 },
    { provincia: 'Tumbes', distrito: 'Tumbes', cantidad: 4, metaVol: 30329.6, metaKm: 3.16, poblacion: 12604 },
    { provincia: 'Zarumilla', distrito: 'Papayal', cantidad: 2, metaVol: 1600.0, metaKm: 0.37, poblacion: 1000 },
  ],
  programadasTotal: { cantidad: 15, metaVol: 79248.6, metaKm: 8.48, poblacion: 24644 },

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'GORE Tumbes', detail: 'hasta 03.07.2027' },
    { entidad: 'Distrito La Cruz', detail: 'hasta 19.05.2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGM-976', 'EGN-007'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-002'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGM-052'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001608', 'D001613'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Caterpillar', codigos: ['TJT10094', 'TJT10112'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 2, marca: 'John Deere', codigos: ['G282145', 'G282149'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGW-173'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Volvo', codigos: ['EAJ-355'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['285283'], estado: 'inoperativo', nota: 'HT N° 134741-2026' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Caterpillar', codigos: ['AE800571'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 8, marca: 'Mercedes Benz', codigos: ['EAJ-392', 'EAJ-394', 'EAJ-395', 'EGV-779', 'EGV-799', 'EGV-820', 'EGV-838', 'EGV-839'], estado: 'operativo' },
  ],
  flotaTotal: 22,
}
