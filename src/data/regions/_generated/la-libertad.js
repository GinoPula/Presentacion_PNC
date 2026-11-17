// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 9, m3: 44962.0, km: 2.1, poblacion: 7856, provincias: ['Ascope', 'Gran Chimu', 'Sanchez Carrion', 'Trujillo'] },
    { tipo: 'Prevención', cantidad: 22, m3: 191403.0, km: 13.51, poblacion: 36760, provincias: ['Ascope', 'Chepen', 'Gran Chimu', 'Pacasmayo', 'Sanchez Carrion', 'Santiago De Chuco', 'Trujillo'] },
    { tipo: 'Urgente atención', cantidad: 12, m3: 30232.7, km: 57.21, poblacion: 3758, provincias: ['Sanchez Carrion', 'Santiago De Chuco'] },
  ],
  ejecutadasTotal: { cantidad: 43, m3: 266597.7, m3AguaPotable: 0.0, km: 72.82, poblacion: 48374 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 6, m3: 20449.5, km: 9.32, poblacion: 32132, provincias: ['Gran Chimu', 'Trujillo'] },
    { tipo: 'Prevención', cantidad: 33, m3: 240619.5, km: 16.2, poblacion: 32009, provincias: ['Ascope', 'Gran Chimu', 'Pataz', 'Sanchez Carrion', 'Trujillo'] },
    { tipo: 'Urgente atención', cantidad: 14, m3: 51328.5, km: 50.31, poblacion: 11179, provincias: ['Ascope', 'Sanchez Carrion', 'Santiago De Chuco'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 53, m3: 312397.5, m3AguaPotable: 0.0, km: 75.82, poblacion: 75320 },

  enEjecucion: [
    { provincia: 'Trujillo', distrito: 'Huanchaco', tipo: 'Prevención', descripcion: 'CONFORMACIÓN DE DIQUE CON MATERIAL DE APORTE PARA LA ESTABILIZACIÓN DE TALUDES EN EL PROYECTO: QUEBRADA EL LEÓN, SECTOR CANAL NORTE, DISTRITO DE HUANCHACO, PROVINCIA DE TRUJILLO, DEPARTAMENTO DE LA LIBERTAD   ', inicio: '09/10/2026', fin: '22/11/2026', volAcum: 1640.0, kmAcum: 0.04, poblacion: 45024, poblacionSinDuplicar: 45024 },
    { provincia: 'Sanchez Carrion', distrito: 'Huamachuco', tipo: 'Emergencia', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN PARA EL MANTENIMIENTO DE CAUCE DE LA QUEBRADA DE LOS PAJARITOS, SECTOR N°06, DISTRITO DE HUAMACHUCO, PROVINCIA DE SANCHEZ CARRION, DEPARTAMENTO DE LA LIBERTAD. DS180-P         ', inicio: '11/11/2026', fin: '18/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 320, poblacionSinDuplicar: 320 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Ascope', distrito: 'Santiago De Cao', cantidad: 2, metaVol: 700.0, metaKm: 1.25, poblacion: 2388 },
    { provincia: 'Sanchez Carrion', distrito: 'Cochorco', cantidad: 1, metaVol: 897.0, metaKm: 0.23, poblacion: 120 },
    { provincia: 'Santiago De Chuco', distrito: 'Sitabamba', cantidad: 1, metaVol: 649.0, metaKm: 0.17, poblacion: 80 },
    { provincia: 'Trujillo', distrito: 'Laredo', cantidad: 1, metaVol: 15200.0, metaKm: 1.0, poblacion: 500 },
    { provincia: 'Viru', distrito: 'Chao', cantidad: 2, metaVol: 29700.0, metaKm: 1.8, poblacion: 296 },
  ],
  programadasTotal: { cantidad: 7, metaVol: 47146.0, metaKm: 4.45, poblacion: 3384 },

  programadasDetalle: [
    { provincia: 'Santiago De Chuco', distrito: 'Sitabamba', sector: 'Chagabara', ficha: '081-2026-LD-E-LIB', descripcion: ' LIMPIEZA Y DESCOLMATACION PARA EL MANTENIMIENTO DEL CAUCE DE LA QUEBRADA CHAGAVARA CHICA, SECTOR CHAGABARA, DISTRITO DE SITABAMBA, PROVINCIA DE SANTIAGO DE CHUCO, DEPARTAMENTO DE LA LIBERTAD DS180-P          ', fechaInicio: '19/11/2026', fechaFin: '03/12/2026', metaVol: 649.0, metaKm: 0.17, poblacion: 80, poblacionSinDuplicar: 80 },
    { provincia: 'Trujillo', distrito: 'Laredo', sector: 'Menocucho', ficha: '010-2026-LD-P-LIB', descripcion: ' LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA AVENDAñO SECTOR MENOCUCHO, DISTRITO LAREDO, PROVINCIA DE TRUJILLO, DEPARTAMENTO LA LIBERTAD-00   ', fechaInicio: '23/11/2026', fechaFin: '02/12/2026', metaVol: 15200.0, metaKm: 1.0, poblacion: 500, poblacionSinDuplicar: 500 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Tizal', ficha: '060-2026-LD-P-LIB', descripcion: 'LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUE CON MATERIAL PROPIO DEL RIO CHOROBAL, SECTOR EL TIZAL, DISTRITO DE CHAO, PROVINCIA DE VIRU, DEPARTAMENTO DE LA LIBERTAD           ', fechaInicio: '24/11/2026', fechaFin: '08/12/2026', metaVol: 16500.0, metaKm: 0.9, poblacion: 148, poblacionSinDuplicar: 148 },
    { provincia: 'Sanchez Carrion', distrito: 'Cochorco', sector: 'Corrales', ficha: '079-2026-LD-E-LIB', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE BORDOS EN EL CAUCE DE LA QUEBRADA CAFE, SECTOR CORRALES, DISTRITO DE COCHORCO, PROVINCIA DE SANCHEZ CARRION, DEPARTAMENTO DE LA LIBERTAD.  DS180-P        ', fechaInicio: '05/12/2026', fechaFin: '21/12/2026', metaVol: 897.0, metaKm: 0.23, poblacion: 120, poblacionSinDuplicar: 120 },
    { provincia: 'Viru', distrito: 'Chao', sector: 'Puente Tizal', ficha: '061-2026-LD-P-LIB', descripcion: 'LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUE CON MATERIAL PROPIO DEL RIO CHOROBAL, SECTOR PUENTE EL TIZAL, DISTRITO DE CHAO, PROVINCIA DE VIRU, DEPARTAMENTO DE LA LIBERTAD   ', fechaInicio: '09/12/2026', fechaFin: '23/12/2026', metaVol: 13200.0, metaKm: 0.9, poblacion: 148, poblacionSinDuplicar: 148 },
    { provincia: 'Ascope', distrito: 'Santiago De Cao', sector: 'Sumanique', ficha: '023-2026-LD-P-LIB', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL DREN SUMANIQUE, SECTOR CARTAVIO, DISTRITO DE SANTIAGO DE CAO, PROVINCIA DE ASCOPE, DEPARTAMENTO DE LA LIBERTAD   ', fechaInicio: '15/12/2026', fechaFin: '23/12/2026', metaVol: 250.0, metaKm: 0.35, poblacion: 1194, poblacionSinDuplicar: 1194 },
    { provincia: 'Ascope', distrito: 'Santiago De Cao', sector: 'San Jose - Sumanique', ficha: '025-2026-LD-P-LIB', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CANAL DREN PONGOCHONGO, SECTOR SUMANIQUE, DISTRITO SANTIAGO DE CAO, PROVINCIA DE ASCOPE, DEPARTAMENTO DE LA LIBERTAD    ', fechaInicio: '23/12/2026', fechaFin: '01/01/2027', metaVol: 450.0, metaKm: 0.9, poblacion: 1194, poblacionSinDuplicar: 1194 },
  ],

  puntosCriticos: [
    { provincia: 'Ascope', distrito: 'Chicama', sector: 'Huabalito', fichaTecnica: '075-2026-LD-E-LIB', descripcion: 'LIMPIEZA, DESCOLMATACIÓN Y CONFORMACION DE DIQUE CON MATERIAL PROPIO EN EL MARGEN IZQUIERDO DEL RIO CHICAMA, SECTOR HUABALITO, DISTRITO DE CHICAMA, PROVINCIA DE ASCOPE, DEPARTAMENTO DE LA LIBERTAD DS180-P       ', estado: 'Ejecutada', mes: '', metaKm: 1.65, metaVol: 69258.0, poblacion: 144 },
    { provincia: 'Sanchez Carrion', distrito: 'Cochorco', sector: 'Corrales', fichaTecnica: '079-2026-LD-E-LIB', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE BORDOS EN EL CAUCE DE LA QUEBRADA CAFE, SECTOR CORRALES, DISTRITO DE COCHORCO, PROVINCIA DE SANCHEZ CARRION, DEPARTAMENTO DE LA LIBERTAD.  DS180-P        ', estado: 'Programada', mes: 'Diciembre', metaKm: 0.23, metaVol: 897.0, poblacion: 120 },
    { provincia: 'Sanchez Carrion', distrito: 'Huamachuco', sector: 'Los Pajaritos', fichaTecnica: '080-2026-LD-E-LIB', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN PARA EL MANTENIMIENTO DE CAUCE DE LA QUEBRADA DE LOS PAJARITOS, SECTOR N°06, DISTRITO DE HUAMACHUCO, PROVINCIA DE SANCHEZ CARRION, DEPARTAMENTO DE LA LIBERTAD. DS180-P         ', estado: 'En ejecución', mes: '', metaKm: 0.12, metaVol: 324.0, poblacion: 320 },
    { provincia: 'Santiago De Chuco', distrito: 'Sitabamba', sector: 'Chagabara', fichaTecnica: '081-2026-LD-E-LIB', descripcion: ' LIMPIEZA Y DESCOLMATACION PARA EL MANTENIMIENTO DEL CAUCE DE LA QUEBRADA CHAGAVARA CHICA, SECTOR CHAGABARA, DISTRITO DE SITABAMBA, PROVINCIA DE SANTIAGO DE CHUCO, DEPARTAMENTO DE LA LIBERTAD DS180-P          ', estado: 'Programada', mes: 'Noviembre', metaKm: 0.17, metaVol: 649.0, poblacion: 80 },
  ],

  conveniosCount: 4,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 29/09/2027' },
    { entidad: 'Municipalidad Provincial Ascope', detail: 'vence 20/11/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Provincial Pacasmayo', detail: 'hasta 27/04/2027' },
    { entidad: 'Municipalidad Provincial Gran Chimu', detail: 'hasta 15/10/2027' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-983'], estado: 'operativo' },
    { tipo: 'Camión grúa', cantidad: 1, marca: 'Iveco', codigos: ['EGQ-986'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00778'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'John Deere', codigos: ['D001604', 'D001607'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10075'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'John Deere', codigos: ['810399', '810409'], estado: 'operativo' },
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
