// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 7, m3: 51780.85, km: 8.75, poblacion: 18930, provincias: ['Carlos Fermin Fitzcarrald', 'Huarmey', 'Santa'] },
    { tipo: 'Prevención', cantidad: 60, m3: 213897.0, km: 23.0, poblacion: 57326, provincias: ['Bolognesi', 'Huaraz', 'Huarmey', 'Ocros', 'Recuay', 'Yungay'] },
    { tipo: 'Urgente atención', cantidad: 9, m3: 9448.0, km: 6.3, poblacion: 6071, provincias: ['Huaraz', 'Recuay'] },
  ],
  ejecutadasTotal: { cantidad: 76, m3: 275125.85, m3AguaPotable: 570.0, km: 38.06, poblacion: 82327 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 10, m3: 25200.68, km: 2.14, poblacion: 29765, provincias: ['Huaraz', 'Recuay'] },
    { tipo: 'Prevención', cantidad: 55, m3: 174038.79, km: 29.64, poblacion: 159864, provincias: ['Bolognesi', 'Carhuaz', 'Huaraz', 'Huarmey', 'Ocros', 'Recuay', 'Santa', 'Sihuas'] },
    { tipo: 'Urgente atención', cantidad: 5, m3: 954.05, km: null, poblacion: 3012, provincias: ['Huaraz', 'Santa'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 70, m3: 200193.52, m3AguaPotable: 1135.73, km: 31.78, poblacion: 192641 },

  enEjecucion: [
    { provincia: 'Santa', distrito: 'Chimbote', tipo: 'Prevención', descripcion: 'LIMPIEZA, DESCOLMATACIÓN Y ELIMINACIÓN DE MATERIAL EXCEDENTE DEL CAUCE DEL RÍO LACRAMARCA, SECTOR VILLA MARÍA – 3 DE OCTUBRE, DISTRITO DE CHIMBOTE, PROVINCIA DEL SANTA, DEPARTAMENTO DE ÁNCASH          ', inicio: '28/08/2026', fin: '30/11/2026', volAcum: 24430.0, kmAcum: 2.84, poblacion: 7456, poblacionSinDuplicar: 7456 },
    { provincia: 'Santa', distrito: 'Chimbote', tipo: 'Emergencia', descripcion: ' LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA CASCAJAL SECTOR TAMBO REAL, DISTRITO DE CHIMBOTE, PROVINCIA DE SANTA, DEPARTAMENTO ANCASH  DS180-P    ', inicio: '18/11/2026', fin: '05/12/2026', volAcum: 1654.4, kmAcum: 0.46, poblacion: 350, poblacionSinDuplicar: 350 },
    { provincia: 'Recuay', distrito: 'Pararin', tipo: 'Prevención', descripcion: 'LIMPIEZA, DESCOLMATACION Y REFORZAMIENTO DE DIQUE DE LA QUEBRADA CUYASH - TRAMO I DEL CENTRO POBLADO DE MANDAHUAZ, DISTRITO DE PARARIN, PROVINCIA DE RECUAY, DEPARTAMENTO DE ANCASH', inicio: '19/11/2026', fin: '25/11/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 89, poblacionSinDuplicar: 89 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Huaraz', distrito: 'Huaraz', cantidad: 1, metaVol: 2400.0, metaKm: 0.12, poblacion: 432 },
    { provincia: 'Recuay', distrito: 'Pararin', cantidad: 1, metaVol: 4815.0, metaKm: 0.45, poblacion: 882 },
    { provincia: 'Santa', distrito: 'Nuevo Chimbote', cantidad: 1, metaVol: 12075.0, metaKm: 2.54, poblacion: 2080 },
  ],
  programadasTotal: { cantidad: 3, metaVol: 19290.0, metaKm: 3.11, poblacion: 3394 },

  programadasDetalle: [
    { provincia: 'Recuay', distrito: 'Pararin', sector: 'Rinconada', ficha: '130-2026-LDP-ANC', descripcion: ' LIMPIEZA, DESCOLMATACION Y REFORZAMIENTO DE DIQUE DE LA QUEBRADA CORRALILLO - TRAMO I DEL CENTRO POBLADO DE RINCONADA, DISTRITO DE PARARIN, PROVINCIA DE RECUAY, DEPARTAMENTO DE ANCASH', fechaInicio: '26/11/2026', fechaFin: '02/12/2026', metaVol: 4815.0, metaKm: 0.45, poblacion: 882, poblacionSinDuplicar: 882 },
    { provincia: 'Santa', distrito: 'Nuevo Chimbote', sector: '3 De Octubre', ficha: '110-2026-LDP-ANC-ANIN', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y REFORZAMIENTO DE DIQUE EN EL RÍO LACRAMARCA EN LA LOCALIDAD DE 3 DE OCTUBRE, DISTRITO DE NUEVO CHIMBOTE, PROVINCIA DE SANTA, DEPARTAMENTO DE ÁNCASH      ', fechaInicio: '01/12/2026', fechaFin: '17/12/2026', metaVol: 12075.0, metaKm: 2.54, poblacion: 2080, poblacionSinDuplicar: 2080 },
    { provincia: 'Huaraz', distrito: 'Huaraz', sector: 'Quechcap', ficha: '141-2026-LDP-ANC', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE TALUD EN LA MARGEN DERECHA DEL RÍO SANTA, SECTOR PREDIO DOS – QUECHCAP TRAMO III, DISTRITO DE HUARAZ, PROVINCIA HUARAZ, REGIÓN ANCASH  ', fechaInicio: '04/12/2026', fechaFin: '08/12/2026', metaVol: 2400.0, metaKm: 0.12, poblacion: 432, poblacionSinDuplicar: 432 },
  ],

  puntosCriticos: [
    { provincia: 'Carlos Fermin Fitzcarrald', distrito: 'San Luis', sector: 'Chacapata', fichaTecnica: '115-2026-LDE-ANC', descripcion: ' LIMPIEZA Y DESCOLMATACIÓN EN AMBAS MARGENES DEL RIO TAMBILLOS, SECTOR CHACAPATA, DISTRITO DE SAN LUIS, PROVINCIA DE CARLOS FERMIN FITZCARRALD, DEPARTAMENTO DE ANCASH   DS180-R     ', estado: 'Ejecutada', mes: '', metaKm: 0.83, metaVol: 6640.0, poblacion: 500 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Tambo Real', fichaTecnica: '118-2026-LDE-ANC', descripcion: ' LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA CASCAJAL SECTOR TAMBO REAL, DISTRITO DE CHIMBOTE, PROVINCIA DE SANTA, DEPARTAMENTO ANCASH  DS180-P    ', estado: 'En ejecución', mes: '', metaKm: 3.4, metaVol: 11475.0, poblacion: 350 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Cascajal', fichaTecnica: '117-2026-LDE-ANC', descripcion: ' LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA CASCAJAL SECTOR CASCAJAL, DISTRITO DE CHIMBOTE, PROVINCIA DE SANTA, DEPARTAMENTO ANCASH  DS180-P     ', estado: 'Ejecutada', mes: '', metaKm: 3.1, metaVol: 10462.5, poblacion: 120 },
    { provincia: 'Santa', distrito: 'Chimbote', sector: 'Cascajal Bajo – La Cuadra', fichaTecnica: '116-2026-LDE-ANC', descripcion: ' LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA CASCAJAL SECTOR CASCAJAL BAJO - LA CUADRA, DISTRITO DE CHIMBOTE, PROVINCIA DE SANTA, DEPARTAMENTO ANCASH DS180-P    ', estado: 'Ejecutada', mes: '', metaKm: 3.8, metaVol: 12825.0, poblacion: 250 },
  ],

  conveniosCount: 4,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 03/03/2027' },
    { entidad: 'Municipalidad Provincial Yungay', detail: 'hasta 07/07/2027' },
    { entidad: 'Municipalidad Provincial Huaraz', detail: 'hasta 21/07/2027' },
    { entidad: 'Municipalidad Provincial Casma', detail: 'hasta 21/08/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-994'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-025'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Toyota', codigos: ['EAJ-733'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'John Deere', codigos: ['D001597'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10127'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10129'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['D523228'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10879', '85461'], estado: 'inoperativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAJ-572'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-601'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EAJ-560', 'EGN-071'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Komatsu', codigos: ['82454', '81373'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-808'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGM-924', 'EGM-824'], estado: 'operativo' },
  ],
  flotaTotal: 18,
}
