// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 1, m3: 5400.0, km: 0.08, poblacion: 400, provincias: ['Chachapoyas'] },
  ],
  ejecutadasTotal: { cantidad: 1, m3: 5400.0, m3AguaPotable: 0.0, km: 0.08, poblacion: 400 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 3, m3: 4120.0, km: null, poblacion: 7375, provincias: ['Utcubamba'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 3, m3: 4120.0, m3AguaPotable: 1260.0, km: 0.0, poblacion: 7375 },

  enEjecucion: [
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Bongara', distrito: 'San Carlos', cantidad: 1, metaVol: 10944.0, metaKm: 1.52, poblacion: 489 },
    { provincia: 'Utcubamba', distrito: 'Bagua Grande', cantidad: 1, metaVol: 19890.81, metaKm: 1.98, poblacion: 416 },
  ],
  programadasTotal: { cantidad: 2, metaVol: 30834.81, metaKm: 3.5, poblacion: 905 },

  programadasDetalle: [
    { provincia: 'Utcubamba', distrito: 'Bagua Grande', sector: 'C.P. Goncha', ficha: '002-2026-LDP-AMZ', descripcion: ' “DESCOLMATACION Y ENCAUZAMIENTO CON MATERIAL PROPIO DE LA QUEBRADA GONCHA DESDE LA PROGRESIVA 0+000 HASTA LA PROGRESIVA\n1+891 – DEL CENTRO POBLADO DE GONCHA, DISTRITO DE BAGUA GRANDE, PROVINCIA DE UTCUBAMBA, REGIÓN AMAZONAS”-00                                    ', fechaInicio: '20/08/2026', fechaFin: '18/09/2026', metaVol: 19890.81, metaKm: 1.98, poblacion: 416 },
    { provincia: 'Bongara', distrito: 'San Carlos', sector: 'Mancomunidad San Carlos', ficha: ' N° 004-2026-LDP-AMZ', descripcion: ' “LIMPIEZA, DESCOLMATACIÓN, ENCAUZAMIENTO Y ELIMINACION DEL TRAMO I DE LA QUEBRADA DON HUAYCO DESDE LA PROGRESIVA 0+000.00 A LA PROGRESIVA 1+520.00, EN EL MANCOMUNIDAD SAN CARLOS, DISTRITO DE SAN CARLOS, PROVINCIA BONGARA, REGIÓN AMAZONAS”-00                      ', fechaInicio: '12/09/2026', fechaFin: '06/10/2026', metaVol: 10944.0, metaKm: 1.52, poblacion: 489 },
  ],

  conveniosCount: 3,
  conveniosVigentes: [
    { entidad: 'Municipalidad Provincial Chachapoyas', detail: 'hasta 30/12/2026' },
    { entidad: 'Municipalidad Distrital San Carlos', detail: 'hasta 13/03/2027' },
    { entidad: 'Municipalidad Distrital Omia', detail: 'hasta 18/06/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGN-106', 'EGM-978'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGO-052'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'Caterpillar', codigos: ['JLX00219', 'M5K00334'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810148'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10913', '85464'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'Caterpillar', codigos: ['LMST05747'], estado: 'operativo' },
    { tipo: 'Motoniveladora', cantidad: 2, marca: 'Caterpillar', codigos: ['SZL03379', 'SZL03378'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-825'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-723'], estado: 'operativo' },
    { tipo: 'Rodillo compactador', cantidad: 2, marca: 'Hamm', codigos: ['H1762469', 'H1762462'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81371'], estado: 'inoperativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81492'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 9, marca: 'Mercedes Benz', codigos: ['EGV-785', 'EGV-830', 'EGV-797', 'EGV-835', 'EGV-826', 'EGV-810', 'EGV-819', 'EGV-848', 'EGV-774'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-847'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 4, marca: 'Scania', codigos: ['EGM-882', 'EGM-833', 'EGN-591', 'EGM-788'], estado: 'operativo' },
  ],
  flotaTotal: 31,
}
