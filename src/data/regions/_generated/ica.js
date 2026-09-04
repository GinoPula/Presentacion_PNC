// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 5, m3: 31332.0, km: 1.19, poblacion: 16650, provincias: ['Ica', 'Nasca'] },
    { tipo: 'Prevención', cantidad: 12, m3: 85706.58, km: 4.17, poblacion: 11300, provincias: ['Ica', 'Nasca'] },
    { tipo: 'Urgente atención', cantidad: 5, m3: 3720.0, km: null, poblacion: 3750, provincias: ['Palpa'] },
  ],
  ejecutadasTotal: { cantidad: 22, m3: 120758.58, m3AguaPotable: 3720.0, km: 5.36, poblacion: 31700 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 3, m3: 27960.0, km: 2.03, poblacion: 1880, provincias: ['Ica'] },
    { tipo: 'Prevención', cantidad: 29, m3: 208057.5, km: 7.58, poblacion: 18587, provincias: ['Nasca', 'Pisco'] },
    { tipo: 'Urgente atención', cantidad: 8, m3: 4543.0, km: 0.33, poblacion: 4780, provincias: ['Nasca', 'Palpa'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 40, m3: 240560.5, m3AguaPotable: 3585.0, km: 9.94, poblacion: 25247 },

  enEjecucion: [
    { provincia: 'Palpa', distrito: 'Rio Grande', tipo: 'Urgente atención', descripcion: ' DISTRIBUCIÓN DE AGUA PARA CONSUMO HUMANO POR PERSISTENCIA DE NECESIDAD EN CENTROS POBLADOS DEL DISTRITO DE RIO GRANDE, PROVINCIA PALPA, DEPARTAMENTO ICA.    ', inicio: '24/08/2026', fin: '22/09/2026', volAcum: 150.0, kmAcum: 0.0, poblacion: 750 },
    { provincia: 'Ica', distrito: 'San Jose De Los Molinos', tipo: 'Prevención', descripcion: 'DESCOLMATACIÓN Y CONFORMACION DE DIQUE CON MATERIAL PROPIO, QUEBRADA YESERA, SECTOR YESERA, DISTRITO DE SAN JOSE DE LOS MOLINOS, PROVINCIA DE ICA, DEPARTAMENTO ICA                 ', inicio: '26/08/2026', fin: '09/09/2026', volAcum: 7400.0, kmAcum: 0.1, poblacion: 1800 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Nasca', distrito: 'Nasca', cantidad: 5, metaVol: 40610.0, metaKm: 1.55, poblacion: 5140 },
    { provincia: 'Nasca', distrito: 'Vista Alegre', cantidad: 3, metaVol: 27852.0, metaKm: 0.98, poblacion: 870 },
    { provincia: 'Palpa', distrito: 'Llipata', cantidad: 1, metaVol: 13300.0, metaKm: 0.38, poblacion: 90 },
    { provincia: 'Pisco', distrito: 'Pisco', cantidad: 2, metaVol: 4276.0, metaKm: 1.17, poblacion: 1140 },
  ],
  programadasTotal: { cantidad: 11, metaVol: 86038.0, metaKm: 4.08, poblacion: 7240 },

  programadasDetalle: [
    { provincia: 'Nasca', distrito: 'Nasca', sector: 'San Mauricio', ficha: 'FT I N°037-2026-LDP- ICA', descripcion: 'DESCOLMATACION Y ENCAUZAMIENTO DEL CAUCE DEL RIO AJA SECTOR SAN MAURICIO TRAMO I, DISTRITO DE NASCA, PROVINCIA DE NASCA – REGION ICA    ', fechaInicio: '12/09/2026', fechaFin: '26/09/2026', metaVol: 7290.0, metaKm: 0.27, poblacion: 470 },
    { provincia: 'Nasca', distrito: 'Nasca', sector: 'San Mauricio', ficha: 'FT I N°038-2026-LDP- ICA', descripcion: ' DESCOLMATACION Y ENCAUZAMIENTO DEL CAUCE DEL RIO AJA SECTOR SAN MAURICIO TRAMO II, DISTRITO DE NASCA, PROVINCIA DE NASCA – REGION ICA  ', fechaInicio: '21/09/2026', fechaFin: '05/10/2026', metaVol: 7020.0, metaKm: 0.26, poblacion: 470 },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Pachinga', ficha: 'FT I N°008-2026-LDP- ICA', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DE DREN PACHINGA, SECTOR PACHINGA , DEL DISTRITO PISCO, PROVINCIA PISCO, DPTO ICA-00              ', fechaInicio: '28/09/2026', fechaFin: '04/10/2026', metaVol: 3340.0, metaKm: 0.86, poblacion: 580 },
    { provincia: 'Nasca', distrito: 'Vista Alegre', sector: 'Copara La Joya', ficha: 'FT I N°004-2026-LDP- ICA', descripcion: ' LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RIO LAS TRANCAS, SECTOR COPARA LA JOYA, DISTRITO DE VISTA ALEGRE, PROVINCIA NASCA ,REGION ICA-00      ', fechaInicio: '01/10/2026', fechaFin: '15/10/2026', metaVol: 12852.0, metaKm: 0.48, poblacion: 90 },
    { provincia: 'Nasca', distrito: 'Vista Alegre', sector: 'Copara La Joya', ficha: 'FT I N°006-2026-LDP- ICA', descripcion: ' LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RIO LAS TRANCAS, SECTOR COPARA LA JOYA TRAMO II, DISTRITO DE VISTA ALEGRE, PROVINCIA NASCA, REGION ICA-00     ', fechaInicio: '02/10/2026', fechaFin: '08/10/2026', metaVol: 4500.0, metaKm: 0.15, poblacion: 400 },
    { provincia: 'Palpa', distrito: 'Llipata', sector: 'Arenal', ficha: 'FT I N°009-2025-LDP- ICA', descripcion: 'LIMPIEZA Y  DESCOLMATACION  EN EL CAUCE DEL RIO VIZCAS, SECTOR ARENAL, DISTRITO LLIPATA, PROVINCIA DE PALPA, DPTO ICA        ', fechaInicio: '15/10/2026', fechaFin: '29/10/2026', metaVol: 13300.0, metaKm: 0.38, poblacion: 90 },
    { provincia: 'Nasca', distrito: 'Nasca', sector: 'Matara', ficha: 'FT I N°002-2026-LDP- ICA', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RÍO AJA SECTOR MATARA TRAMO I, DISTRITO NASCA, PROVINCIA NASCA - REGION ICA-00                 ', fechaInicio: '01/11/2026', fechaFin: '12/11/2026', metaVol: 9000.0, metaKm: 0.37, poblacion: 600 },
    { provincia: 'Pisco', distrito: 'Pisco', sector: 'Pachinga', ficha: 'FT I N°012-2026-LDP- ICA', descripcion: ' LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL DREN PACHINGA, SECTOR PACHINGA TRAMO I, DISTRITO PISCO, PROVINCIA PISCO, DPTO ICA.-00         ', fechaInicio: '11/11/2026', fechaFin: '13/11/2026', metaVol: 936.0, metaKm: 0.31, poblacion: 560 },
    { provincia: 'Nasca', distrito: 'Nasca', sector: 'Matara', ficha: 'FT I N°015-2026-LDP- ICA', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RÍO AJA SECTOR MATARA TRAMO II, DISTRITO NASCA, PROVINCIA NASCA - REGION ICA-00     ', fechaInicio: '15/11/2026', fechaFin: '26/11/2026', metaVol: 10500.0, metaKm: 0.35, poblacion: 600 },
    { provincia: 'Nasca', distrito: 'Nasca', sector: 'Cantayo', ficha: 'FT I N°003-2026-LDP- ICA', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RÍO TIERRAS BLANCAS SECTOR CANTAYO TRAMO I, DISTRITO NASCA, PROVINCIA NASCA - REGION ICA-00                   ', fechaInicio: '11/12/2026', fechaFin: '20/12/2026', metaVol: 6800.0, metaKm: 0.3, poblacion: 3000 },
    { provincia: 'Nasca', distrito: 'Vista Alegre', sector: 'Copara La Joya', ficha: 'FT I N°007-2026-LDP- ICA', descripcion: ' LIMPIEZA Y DESCOLMATACION DEL CAUCE DEL RIO LAS TRANCAS, SECTOR COPARA LA JOYA TRAMO I, DISTRITO DE VISTA ALEGRE, PROVINCIA NASCA, REGION ICA-00      ', fechaInicio: '16/12/2026', fechaFin: '30/12/2026', metaVol: 10500.0, metaKm: 0.35, poblacion: 380 },
  ],

  conveniosCount: 6,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'vence 26/09/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Provincial Nasca', detail: 'vence 27/09/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Provincial Pisco', detail: 'hasta 24/11/2026' },
    { entidad: 'Municipalidad Provincial Palpa', detail: 'hasta 26/05/2027' },
    { entidad: 'Municipalidad Distrital San Jose De Los Molinos', detail: 'hasta 01/02/2027' },
    { entidad: 'Municipalidad Distrital Santiago', detail: 'hasta 11/02/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-013'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-939'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Toyota', codigos: ['EAJ-734'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'John Deere', codigos: ['D001595'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['D523572'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Komatsu', codigos: ['85404'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAJ-545'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EAJ-543'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 3, marca: 'Komatsu', codigos: ['82542', '81436', '81386'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 3, marca: 'Scania', codigos: ['EGM-823', 'EGM-925', 'EGM-829'], estado: 'operativo' },
  ],
  flotaTotal: 14,
}
