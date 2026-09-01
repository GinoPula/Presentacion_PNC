// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Urgente atención', cantidad: 17, m3: 39135.0, km: 22.5, poblacion: 45407, provincias: ['Maynas'] },
  ],
  ejecutadasTotal: { cantidad: 17, m3: 39135.0, m3AguaPotable: 6120.0, km: 22.5, poblacion: 45407 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 2, m3: 5736.0, km: 4.78, poblacion: 9300, provincias: ['Maynas'] },
    { tipo: 'Urgente atención', cantidad: 41, m3: 83571.0, km: 52.67, poblacion: 99052, provincias: ['Alto Amazonas', 'Maynas'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 43, m3: 89307.0, m3AguaPotable: 14160.0, km: 57.45, poblacion: 108352 },

  enEjecucion: [
    { provincia: 'Maynas', distrito: 'San Juan Bautista', tipo: 'Urgente atención', descripcion: 'CARGUÍO Y TRASLADO DE MATERIAL DE PRÉSTAMO PARA RELLENOS DE VÍAS DE ACCESO EN EL CENTRO POBLADO NINARUMI DEL DISTRITO DE SAN JUAN BAUTISTA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO. ', inicio: '17/07/2026', fin: '28/08/2026', volAcum: 2380.0, kmAcum: 2.6, poblacion: 4000 },
    { provincia: 'Maynas', distrito: 'San Juan Bautista', tipo: 'Urgente atención', descripcion: 'LIMPIEZA Y DESCOLMATACION DE CAUCES DE CANALES EN CENTRO POBLADO NINARUMI, DISTRITO DE SAN JUAN BAUTISTA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO.              ', inicio: '17/07/2026', fin: '28/08/2026', volAcum: 4080.0, kmAcum: 3.25, poblacion: 4000 },
    { provincia: 'Maynas', distrito: 'San Juan Bautista', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN LA NUEVA CIUDAD DE BELÉN - VARILLALITO, DISTRITO DE SAN JUAN BAUTISTA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO.  ', inicio: '08/08/2026', fin: '06/09/2026', volAcum: 500.0, kmAcum: 0.0, poblacion: 1000 },
    { provincia: 'Maynas', distrito: 'Punchana', tipo: 'Urgente atención', descripcion: 'CARGUÍO Y TRASLADO DE MATERIAL DE PRÉSTAMO PARA RELLENOS DE VÍAS DE ACCESOS EN LOS AA.HH. NUESTRA SEÑORA DE LA SALUD, SANTA MARIA DEL AMAZONAS Y DELICIA MANZUR, DISTRITO DE PUNCHANA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO', inicio: '14/08/2026', fin: '12/09/2026', volAcum: 1330.0, kmAcum: 0.95, poblacion: 3800 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Maynas', distrito: 'Iquitos', cantidad: 1, metaVol: 3400.0, metaKm: 2.1, poblacion: 3500 },
    { provincia: 'Maynas', distrito: 'Punchana', cantidad: 1, metaVol: 680.0, metaKm: 0.0, poblacion: 780 },
    { provincia: 'Maynas', distrito: 'San Juan Bautista', cantidad: 1, metaVol: 720.0, metaKm: 0.0, poblacion: 1000 },
  ],
  programadasTotal: { cantidad: 3, metaVol: 4800.0, metaKm: 2.1, poblacion: 5280 },

  programadasDetalle: [
    { provincia: 'Maynas', distrito: 'Iquitos', sector: 'Aa. Hh. Los Algarrobos', ficha: '020-2026-LD-U-LOR', descripcion: 'LIMPIEZA Y DESCOLMATACION DE CANALES EN EL AA.HH. LOS ALGARROBOS, DISTRITO DE IQUITOS, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO.            ', fechaInicio: '10/09/2026', fechaFin: '24/09/2026', metaVol: 3400.0, metaKm: 2.1, poblacion: 3500 },
    { provincia: 'Maynas', distrito: 'San Juan Bautista', sector: 'Nueva Ciudad De Belen - Varillalito', ficha: '023-2026-AA-U-LOR', descripcion: 'ABASTECIMIENTO DE AGUA POTABLE PARA CONSUMO HUMANO EN LA NUEVA CIUDAD DE BELÉN - VARILLALITO, DISTRITO DE SAN JUAN BAUTISTA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO.      ', fechaInicio: '12/11/2026', fechaFin: '11/12/2026', metaVol: 720.0, metaKm: 0.0, poblacion: 1000 },
    { provincia: 'Maynas', distrito: 'Punchana', sector: 'Punchana', ficha: '024-2026-AA-U-LOR', descripcion: 'ABASTECIMIENTO DE AGUA PARA CONSUMO HUMANO EN EL DISTRITO DE PUNCHANA, PROVINCIA DE MAYNAS, DEPARTAMENTO DE LORETO.        ', fechaInicio: '02/12/2026', fechaFin: '31/12/2026', metaVol: 680.0, metaKm: 0.0, poblacion: 780 },
  ],

  conveniosCount: 1,
  conveniosVigentes: [
    { entidad: 'Municipalidad Distrital Punchana', detail: 'hasta 10/12/2026' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 2, marca: 'Hino', codigos: ['EGQ-789', 'EGO-773'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-968'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00249'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'Caterpillar', codigos: ['LMST05745'], estado: 'operativo' },
    { tipo: 'Plataforma', cantidad: 1, marca: 'ACS', codigos: ['EGR-069'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['284005'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Hino', codigos: ['EGP-009'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-806'], estado: 'operativo' },
  ],
  flotaTotal: 9,
}
