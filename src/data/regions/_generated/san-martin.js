// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 4, m3: 14139.15, km: 7.17, poblacion: 1400, provincias: ['Moyobamba', 'Picota'] },
    { tipo: 'Prevención', cantidad: 2, m3: 5250.0, km: 0.55, poblacion: 900, provincias: ['Picota'] },
    { tipo: 'Urgente atención', cantidad: 17, m3: 28119.6, km: 24.83, poblacion: 13000, provincias: ['Bellavista', 'Lamas', 'Moyobamba', 'Rioja', 'San Martin'] },
  ],
  ejecutadasTotal: { cantidad: 23, m3: 47508.75, m3AguaPotable: 8595.0, km: 32.54, poblacion: 15300 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 9, m3: 15750.7, km: 8.98, poblacion: 3266, provincias: ['Moyobamba', 'Picota', 'San Martin'] },
    { tipo: 'Prevención', cantidad: 2, m3: 10737.5, km: 2.24, poblacion: 450, provincias: ['Moyobamba'] },
    { tipo: 'Urgente atención', cantidad: 24, m3: 38222.04, km: 24.0, poblacion: 16120, provincias: ['Bellavista', 'El Dorado', 'Moyobamba', 'Picota', 'Rioja', 'San Martin'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 35, m3: 64710.24, m3AguaPotable: 10890.0, km: 35.22, poblacion: 19836 },

  enEjecucion: [
    { provincia: 'Moyobamba', distrito: 'Soritor', tipo: 'Urgente atención', descripcion: ' MEJORAMIENTO DE LA TRANSITABILIDAD DE LA VÍA DE ACCESO AL CASERÍO LUZ DEL ORIENTE, DISTRITO DE SORITOR, PROVINCIA DE MOYOBAMBA, REGIÓN SAN MARTIN        ', inicio: '27/10/2026', fin: '03/12/2026', volAcum: 1200.0, kmAcum: 2.0, poblacion: 700, poblacionSinDuplicar: 700 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Rioja', distrito: 'Pardo Miguel', cantidad: 2, metaVol: 2340.0, metaKm: 0.0, poblacion: 2250 },
  ],
  programadasTotal: { cantidad: 2, metaVol: 2340.0, metaKm: 0.0, poblacion: 2250 },

  programadasDetalle: [
    { provincia: 'Rioja', distrito: 'Pardo Miguel', sector: 'Centro, Los Angeles Y Miraflores', ficha: '009-2026-AA-U-SAM', descripcion: 'ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN   ', fechaInicio: '24/11/2026', fechaFin: '23/12/2026', metaVol: 1170.0, metaKm: 0.0, poblacion: 1125, poblacionSinDuplicar: 1125 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', sector: 'Centro, Los Angeles Y Miraflores', ficha: '040-2026-AA-U-SAM', descripcion: ' ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN ', fechaInicio: '14/12/2026', fechaFin: '12/01/2027', metaVol: 1170.0, metaKm: 0.0, poblacion: 1125, poblacionSinDuplicar: 1125 },
  ],

  puntosCriticos: [
  ],

  conveniosCount: 1,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 18/02/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-010'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGM-011'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Kawasaki', codigos: ['70J12945'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['D810312'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Komatsu', codigos: ['85469'], estado: 'inoperativo' },
    { tipo: 'Plataforma', cantidad: 2, marca: 'ACS', codigos: ['EGR-075', 'EGR-074'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286603'], estado: 'operativo' },
    { tipo: 'Rodillo compactador', cantidad: 1, marca: 'Hamm', codigos: ['H1762467'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Hino', codigos: ['EGR-389'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-854', 'EGV-867'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 3, marca: 'Scania', codigos: ['EGN-589', 'EGN-496', 'EGN-511'], estado: 'operativo' },
  ],
  flotaTotal: 15,
}
