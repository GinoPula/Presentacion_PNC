// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 8, m3: 36662.0, km: 1.92, poblacion: 7712 },
    { tipo: 'Prevención', cantidad: 15, m3: 112514.0, km: 9.68, poblacion: 15888 },
    { tipo: 'Urgente atención', cantidad: 8, m3: 20694.7, km: 43.8, poblacion: 2741 },
  ],
  ejecutadasTotal: { cantidad: 31, m3: 169870.7, km: 55.4, poblacion: 26341 },

  enEjecucion: [
    { provincia: 'Sanchez Carrion', distrito: 'Chugay', tipo: 'Urgente atención', descripcion: 'MEJORAMIENTO DE LA TRANSITABILIDAD DE LA VIA DE ACCESO DENTRO DEL CENTRO POBLADO CANUCUBAMBA - SAN JUAN, DISTRITO DE CHUGAY PROVINCIA SÁNCHEZ CARRIÓN DEPARTAMENTO LA LIBERTAD  ', inicio: '10/08/2026', fin: '27/08/2026', volAcum: 1930.0, poblacion: 256 },
    { provincia: 'Sanchez Carrion', distrito: 'Chugay', tipo: 'Urgente atención', descripcion: 'MEJORAMIENTO DE LA TRANSITABILIDAD DE LA VIA DE ACCESO DENTRO DEL CENTRO POBLADO ZANCOBAMBA – EL ROLLO, DISTRITO DE CHUGAY PROVINCIA SÁNCHEZ CARRIÓN DEPARTAMENTO LA LIBERTAD ', inicio: '13/08/2026', fin: '27/08/2026', volAcum: 1302.0, poblacion: 346 },
    { provincia: 'Gran Chimu', distrito: 'Cascas', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA SAN FELIPE SECTOR CONODEN, DISTRITO DE CASCAS, PROVINCIA GRAN CHIMU, DEPARTAMENTO DE LA LIBERTAD', inicio: '20/08/2026', fin: '29/08/2026', volAcum: 1650.0, poblacion: 321 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Ascope', distrito: 'Chicama', cantidad: 1, metaVol: 8850.0, metaKm: 1.1, poblacion: 1750 },
    { provincia: 'Ascope', distrito: 'Magdalena De Cao', cantidad: 1, metaVol: 7981.0, metaKm: 2.8, poblacion: 714 },
    { provincia: 'Ascope', distrito: 'Santiago De Cao', cantidad: 3, metaVol: 950.0, metaKm: 1.75, poblacion: 3888 },
    { provincia: 'Gran Chimu', distrito: 'Cascas', cantidad: 1, metaVol: 8550.0, metaKm: 0.5, poblacion: 121 },
    { provincia: 'Gran Chimu', distrito: 'Marmot', cantidad: 1, metaVol: 9500.0, metaKm: 0.5, poblacion: 204 },
    { provincia: 'Sanchez Carrion', distrito: 'Sarin', cantidad: 4, metaVol: 49645.0, metaKm: 2.08, poblacion: 2476 },
    { provincia: 'Trujillo', distrito: 'Laredo', cantidad: 3, metaVol: 40050.0, metaKm: 2.7, poblacion: 2500 },
    { provincia: 'Trujillo', distrito: 'Poroto', cantidad: 1, metaVol: 24600.0, metaKm: 0.9, poblacion: 522 },
    { provincia: 'Trujillo', distrito: 'Simbal', cantidad: 1, metaVol: 16140.0, metaKm: 0.75, poblacion: 1200 },
    { provincia: 'Viru', distrito: 'Chao', cantidad: 4, metaVol: 64700.0, metaKm: 3.8, poblacion: 1596 },
  ],
  programadasTotal: { cantidad: 20, metaVol: 230966.0, metaKm: 16.88, poblacion: 14971 },

  conveniosCount: 5,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 29/09/2027' },
    { entidad: 'Municipalidad Provincial Gran Chimu', detail: 'hasta 15/10/2026' },
    { entidad: 'Municipalidad Provincial Ascope', detail: 'hasta 20/11/2026' },
    { entidad: 'Municipalidad Provincial Pacasmayo', detail: 'hasta 27/04/2027' },
    { entidad: 'Municipalidad Distrital Quiruvilca', detail: 'hasta 07/10/2026' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-983'], estado: 'operativo' },
    { tipo: 'Camión grúa', cantidad: 1, marca: 'Iveco', codigos: ['EGQ-986'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00778'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001604', 'D001607'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10075'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'John Deere', codigos: ['810399', '810409'], estado: 'inoperativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'John Deere', codigos: ['282259'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAK-053'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGV-951'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-758'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Volvo', codigos: ['EAJ-379'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286754'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Caterpillar', codigos: ['J8B05109', 'AE800573'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81370'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 7, marca: 'Mercedes Benz', codigos: ['EGV-831', 'EGV-791', 'EAJ-393', 'EAJ-398', 'EGV-853', 'EGV-795', 'EGV-818'], estado: 'operativo' },
  ],
  flotaTotal: 24,
}
