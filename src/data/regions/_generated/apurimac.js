// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 6, m3: 23970.0, km: 1.93, poblacion: 2120, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
    { tipo: 'Prevención', cantidad: 16, m3: 109966.96, km: 19.39, poblacion: 9330, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
  ],
  ejecutadasTotal: { cantidad: 22, m3: 133936.96, m3AguaPotable: 0.0, km: 21.32, poblacion: 11450 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 7, m3: 92354.0, km: 3.9, poblacion: 2195, provincias: ['Abancay', 'Aymaraes'] },
    { tipo: 'Prevención', cantidad: 13, m3: 133101.66, km: 10.84, poblacion: 9983, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
    { tipo: 'Urgente atención', cantidad: 6, m3: 14615.76, km: 3.39, poblacion: 5220, provincias: ['Abancay', 'Aymaraes'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 26, m3: 240071.42, m3AguaPotable: 0.0, km: 18.12, poblacion: 17398 },

  enEjecucion: [
    { provincia: 'Antabamba', distrito: 'Juan Espinoza Medrano', tipo: 'Prevención', descripcion: '" LIMPIEZA, DESCOLMATACIóN Y CONFORMACIóN DE BORDOS CON MATERIAL PROPIO, DEL CAUCE DEL RíO MOLLEBAMBA, SECTOR MOLLEBAMBA, DEL KM 0+00 AL KM 2+180 DEL DISTRITO DE JUAN ESPINOZA MEDRANO- PROV. ANTABAMBA-DEPARTAMENTO APURIMAC".                      ', inicio: '15/10/2026', fin: '24/11/2026', volAcum: 10300.0, kmAcum: 1.3, poblacion: 50, poblacionSinDuplicar: 50 },
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO CHUMBAO DEL KILOMETRO 0+000 AL KM 2+650 (PUENTE CCOYAHUACHO – PUENTE CATATAY) DISTRITO SAN JERÓNIMO, PROVINCIA DE ANDAHUAYLAS, DEPARTAMENTO APURÍMAC-00             ', inicio: '20/11/2026', fin: '10/12/2026', volAcum: 1750.0, kmAcum: 0.65, poblacion: 650, poblacionSinDuplicar: 650 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', cantidad: 1, metaVol: 7667.01, metaKm: 2.59, poblacion: 1250 },
    { provincia: 'Aymaraes', distrito: 'Capaya', cantidad: 1, metaVol: 12300.0, metaKm: 1.02, poblacion: 300 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', cantidad: 1, metaVol: 5906.5, metaKm: 0.6, poblacion: 0 },
  ],
  programadasTotal: { cantidad: 3, metaVol: 25873.51, metaKm: 4.21, poblacion: 1550 },

  programadasDetalle: [
    { provincia: 'Aymaraes', distrito: 'Capaya', sector: 'Chacapuente/Rio Chalhuanca', ficha: 'FTI N° 025-2026-LDP-APU (FTR-MC-PREV N° 0432-2025-ANA-AAA.PA-ALA.MAP).', descripcion: '" ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN IZQUIERDO Y DERECHO DEL RIO CHALHUANCA PROGRESIVA KM 0+000 A KM 0+350 EN EL SECTOR CHACAPUENTE, DISTRITO DE CAPAYA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC"            ', fechaInicio: '25/11/2026', fechaFin: '24/12/2026', metaVol: 12300.0, metaKm: 1.02, poblacion: 300, poblacionSinDuplicar: 300 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', sector: 'Unchiña', ficha: 'FTI N° 050-2026-LDP-APU', descripcion: '" ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN IZQUIERDO Y DERECHO DE LA QUEBRADA PUENTE BALLON  PROGRESIVA KM 0+000 A KM 0+900, DISTRITO DE CHALHUANCA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC".     ', fechaInicio: '01/12/2026', fechaFin: '25/12/2026', metaVol: 5906.5, metaKm: 0.6, poblacion: null, poblacionSinDuplicar: null },
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', sector: 'Puente Catatay – Puente Mercado De Papas (2+650 Al Km 5+240 )/Rio Chumbao', ficha: 'FTI 006-2026-LD-P-APU', descripcion: '  LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO CHUMBAO DEL KILOMETRO 2+650 AL KM 5+240 (PUENTE CATATAY – PUENTE MERCADO DE PAPAS) DISTRITO SAN JERÓNIMO, PROVINCIA DE ANDAHUAYLAS, DEPARTAMENTO APURÍMAC-00         ', fechaInicio: '11/12/2026', fechaFin: '30/12/2026', metaVol: 7667.01, metaKm: 2.59, poblacion: 1250, poblacionSinDuplicar: 1250 },
  ],

  puntosCriticos: [
  ],

  conveniosCount: 11,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: '1 convenio vigente' },
    { entidad: 'Municipalidad Provincial', detail: '1 convenio vigente' },
    { entidad: 'Municipalidad Distrital', detail: '9 convenios vigentes' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGR-087'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 3, marca: 'Caterpillar', codigos: ['JLX00277', 'JLX00247', 'JLX00832'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810370'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Komatsu', codigos: ['85423'], estado: 'inoperativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAK-048'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-851'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286608'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Komatsu', codigos: ['81442', '82538'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-792'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-803', 'EGV-778'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 4, marca: 'Scania', codigos: ['EGM-828', 'EGM-781', 'EGM-872', 'EGM-777'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Scania', codigos: ['EGM-780'], estado: 'inoperativo' },
  ],
  flotaTotal: 19,
}
