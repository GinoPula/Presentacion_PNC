// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 5, m3: 19770.0, km: 1.54, poblacion: 1620, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
    { tipo: 'Prevención', cantidad: 16, m3: 109966.96, km: 19.39, poblacion: 9330, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
  ],
  ejecutadasTotal: { cantidad: 21, m3: 129736.96, m3AguaPotable: 0.0, km: 20.93, poblacion: 10950 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 7, m3: 92354.0, km: 3.9, poblacion: 2195, provincias: ['Abancay', 'Aymaraes'] },
    { tipo: 'Prevención', cantidad: 13, m3: 133101.66, km: 10.84, poblacion: 9983, provincias: ['Abancay', 'Andahuaylas', 'Aymaraes'] },
    { tipo: 'Urgente atención', cantidad: 6, m3: 14615.76, km: 3.39, poblacion: 5220, provincias: ['Abancay', 'Aymaraes'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 26, m3: 240071.42, m3AguaPotable: 0.0, km: 18.12, poblacion: 17398 },

  enEjecucion: [
    { provincia: 'Antabamba', distrito: 'Juan Espinoza Medrano', tipo: 'Prevención', descripcion: '" LIMPIEZA, DESCOLMATACIóN Y CONFORMACIóN DE BORDOS CON MATERIAL PROPIO, DEL CAUCE DEL RíO MOLLEBAMBA, SECTOR MOLLEBAMBA, DEL KM 0+00 AL KM 2+180 DEL DISTRITO DE JUAN ESPINOZA MEDRANO- PROV. ANTABAMBA-DEPARTAMENTO APURIMAC".                   ', inicio: '15/10/2026', fin: '24/11/2026', volAcum: 750.0, kmAcum: 0.05, poblacion: 50 },
    { provincia: 'Abancay', distrito: 'Abancay', tipo: 'Emergencia', descripcion: ' “LIMPIEZA, DESCOLMATACIÓN Y CONFORMACION DE DIQUE CON MATERIAL PROPIO MARGEN IZQUIERDA DE LA QUEBRADA PURUCHACA, DE LA PROGRESIVA KM 0+000 AL KM 0+400, EN EL SECTOR AYMAS, DISTRITO DE ABANCAY, PROVINCIA DE ABANCAY, REGIÓN APURÍMAC”.          ', inicio: '27/10/2026', fin: '21/11/2026', volAcum: 550.0, kmAcum: 0.06, poblacion: 500 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Abancay', distrito: 'Abancay', cantidad: 3, metaVol: 20509.5, metaKm: 3.71, poblacion: 2100 },
    { provincia: 'Abancay', distrito: 'Curahuasi', cantidad: 1, metaVol: 14383.8, metaKm: 1.22, poblacion: 214 },
    { provincia: 'Abancay', distrito: 'Pichirhua', cantidad: 1, metaVol: 7470.0, metaKm: 0.63, poblacion: 350 },
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', cantidad: 2, metaVol: 17118.11, metaKm: 2592.65, poblacion: 1900 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', cantidad: 3, metaVol: 3000.0, metaKm: 0.1, poblacion: 50 },
    { provincia: 'Aymaraes', distrito: 'Sañayca', cantidad: 1, metaVol: 12300.0, metaKm: 1.02, poblacion: 500 },
    { provincia: 'Aymaraes', distrito: 'Tapairihua', cantidad: 2, metaVol: 42640.0, metaKm: 0.4, poblacion: 550 },
  ],
  programadasTotal: { cantidad: 13, metaVol: 117421.41, metaKm: 2599.73, poblacion: 5664 },

  programadasDetalle: [
    { provincia: 'Abancay', distrito: 'Abancay', sector: 'Paltaypata/Rio Mariño', ficha: 'FTI N.º 051-2026-LD-E-APU', descripcion: '" LIMPIEZA, DESCOLMATACIÓN DE LA QUEBRADA MARIÑO TRAMO I, DE LA PROGRESIVA KM 0+000 AL KM 0+900, EN EL SECTOR PALTAYPATA, DISTRITO DE ABANCAY, PROVINCIA DE ABANCAY, REGIÓN APURÍMAC"', fechaInicio: '10/11/2026', fechaFin: '27/11/2026', metaVol: 3150.0, metaKm: 0.9, poblacion: 600 },
    { provincia: 'Aymaraes', distrito: 'Sañayca', sector: 'Chacapuente/Rio Chalhuanca', ficha: 'FTI N° 025-2026-LDP-APU (FTR-MC-PREV N° 0432-2025-ANA-AAA.PA-ALA.MAP).', descripcion: '" LIMPIEZA, DESCOLMATACIóN Y CONFORMACIóN DE BORDOS CON MATERIAL PROPIO, DEL CAUCE DEL RíO CHALHUANCA, SECTOR CHACAPUENTE-SAÑAYCA-AYMARAES-APURIMAC"         ', fechaInicio: '10/11/2026', fechaFin: '09/12/2026', metaVol: 12300.0, metaKm: 1.02, poblacion: 500 },
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', sector: 'Puente Ccoyahuacho – Puente Catatay (Kilometro 0+000 Al Km 2+650 )/Rio Chumbao', ficha: 'FTI 005-2026-LD-P-APU', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO CHUMBAO DEL KILOMETRO 0+000 AL KM 2+650 (PUENTE CCOYAHUACHO – PUENTE CATATAY) DISTRITO SAN JERÓNIMO, PROVINCIA DE ANDAHUAYLAS, DEPARTAMENTO APURÍMAC-00          ', fechaInicio: '15/11/2026', fechaFin: '14/12/2026', metaVol: 9451.1, metaKm: 2.65, poblacion: 650 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', sector: 'Chancahua', ficha: 'FTI N° 049-2026-LDP-APU', descripcion: ' "ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN DERECHA DEL RIO CHALHUANCA PROGRESIVA KM 0+000 A KM 0+400 EN EL SECTOR CHANCAHUA, DISTRITO DE CHALHUANCA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC"', fechaInicio: '20/11/2026', fechaFin: '04/12/2026', metaVol: 0.0, metaKm: 0.0, poblacion: null },
    { provincia: 'Abancay', distrito: 'Abancay', sector: 'Villa Rene/Quebrada Marcahuasi.', ficha: 'FTI N° 047-2026-LDP-APU.', descripcion: ' "LIMPIEZA Y DESCOLMATACION DE LA QUEBRADA MARCAHUASI, DE LA PROGRESIVA  KM 0+000 AL KM 0+975, EN EL SECTOR VILLA RENE, DISTRITO DE ABANCAY, PROVINCIA DE ABANCAY, REGION APURIMAC".     ', fechaInicio: '01/12/2026', fechaFin: '30/12/2026', metaVol: 6337.5, metaKm: 0.97, poblacion: 600 },
    { provincia: 'Abancay', distrito: 'Pichirhua', sector: 'La Comunidad De Chalhuaní/ Rio Chucupaya.', ficha: 'FTI 004-2026-LDP-APU', descripcion: '   ¨LIMPIEZA Y DESCOLMATACIÓN DE LAS QUEBRADAS DE LOS RÍOS, CHUCUPAYA TRAMO I PROGRESIVA 0+00 A 0+160 KM, CHARAURO TRAMO II PROGRESIVA 0+00 A 0+120 KM, CHARAURO TRAMO III PROGRESIVA 0+00 A 0+350 KM, DE LA COMUNIDAD DE CHALHUANÍ, DISTRITO DE PICHIRHUA, PROVINCIA DE ABANCAY, REGIÓN APURÍMAC¨-00   ', fechaInicio: '01/12/2026', fechaFin: '20/12/2026', metaVol: 7470.0, metaKm: 0.63, poblacion: 350 },
    { provincia: 'Aymaraes', distrito: 'Tapairihua', sector: 'Socco Baja/Rio Antabamba', ficha: 'FTI N° 016-2026-LDP-APU', descripcion: '  “ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN DERECHO DEL RIO ANTABAMBA PROGRESIVA KM 0+000 A KM 0+200 EN EL SECTOR SOCCO BAJA, DISTRITO DE TAPAYRIHUA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC"  -00   ', fechaInicio: '01/12/2026', fechaFin: '21/12/2026', metaVol: 20800.0, metaKm: 0.2, poblacion: 250 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', sector: 'Unchiña', ficha: 'FTI N° 050-2026-LDP-APU', descripcion: '" ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN IZQUIERDO Y DERECHO DE LA QUEBRADA UNCHIÑA  PROGRESIVA KM 0+000 A KM 0+900, DISTRITO DE CHALHUANCA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC".  ', fechaInicio: '01/12/2026', fechaFin: '25/12/2026', metaVol: 0.0, metaKm: 0.0, poblacion: null },
    { provincia: 'Abancay', distrito: 'Curahuasi', sector: 'Lucmos/Rio Lucmos', ficha: 'FTI N°011-2026-LD-P-APU', descripcion: '  “LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO LUCMOS, EN EL SECTOR CHECCEMAYO, DE LA PROGRESIVA 0+00 KM A LA PROGRESIVA 1+220 KM, DISTRITO DE CURAHUASI, PROVINCIA DE ABANCAY, REGION APURIMAC”-00      ', fechaInicio: '01/12/2026', fechaFin: '24/12/2026', metaVol: 14383.8, metaKm: 1.22, poblacion: 214 },
    { provincia: 'Abancay', distrito: 'Abancay', sector: 'Atumpata/Quebrada Puruchaca.', ficha: 'FTI N°010-2026-LD-P-APU', descripcion: '  LIMPIEZA Y DESCOLMATACIÓN DE LA QUEBRADA PURUCHACA, DE LA PROG. KM 0+000 A KM 1+837, SECTOR ATUMPATA, DISTRITO Y PROVINCIA DE ABANCAY, REGIÓN APURÍMAC-00       ', fechaInicio: '03/12/2026', fechaFin: '29/12/2026', metaVol: 11022.0, metaKm: 1.84, poblacion: 900 },
    { provincia: 'Aymaraes', distrito: 'Chalhuanca', sector: 'Pauccaraya/Rio Chalhuanca', ficha: 'FTI 034-2026-LDE-APU.', descripcion: '“ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DE PROGRESIVA KM 0+000 A KM 0+100 EN EL SECTOR DE PAUCCARAYA EN LA MARGEN DERECHA, DISTRITO DE CHALHUANCA, PROVINCIA DE AYMARAES, REGIÓN APURÍMAC".        ', fechaInicio: '07/12/2026', fechaFin: '13/12/2026', metaVol: 3000.0, metaKm: 0.1, poblacion: 50 },
    { provincia: 'Aymaraes', distrito: 'Tapairihua', sector: 'Mochocco/Rio Antabamba', ficha: 'FTI N° 017-2026-LDP-APU', descripcion: '  “ENCAUZAMIENTO Y REFORZAMIENTO DE DIQUES DEL CAUCE EN MARGEN DERECHO DEL RIO ANTABAMBA PROGRESIVA KM 0+000 A KM 0+200 EN EL SECTOR MOCHOCCO, DISTRITO DE TAPAYRIHUA, PROVINCIA DE AYMARAES, REGIÓN APURIMAC"-00        ', fechaInicio: '14/12/2026', fechaFin: '03/01/2027', metaVol: 21840.0, metaKm: 0.2, poblacion: 300 },
    { provincia: 'Andahuaylas', distrito: 'San Jeronimo', sector: 'Rio Chumbao (2+650 Al Km 5+240 )/Rio Chumbao', ficha: 'FTI 006-2026-LD-P-APU', descripcion: '  LIMPIEZA Y DESCOLMATACIÓN DEL CAUCE DEL RIO CHUMBAO DEL KILOMETRO 2+650 AL KM 5+240 (PUENTE CATATAY – PUENTE MERCADO DE PAPAS) DISTRITO SAN JERÓNIMO, PROVINCIA DE ANDAHUAYLAS, DEPARTAMENTO APURÍMAC-00      ', fechaInicio: '17/12/2026', fechaFin: '15/01/2027', metaVol: 7667.01, metaKm: 2590.0, poblacion: 1250 },
  ],

  conveniosCount: 16,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: '1 convenio vigente' },
    { entidad: 'Municipalidad Provincial', detail: '4 convenios vigentes' },
    { entidad: 'Municipalidad Distrital', detail: '11 convenios vigentes' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGR-087'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 3, marca: 'Caterpillar', codigos: ['JLX00277', 'JLX00247', 'JLX00832'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810370'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Komatsu', codigos: ['85423'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAK-048'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-851'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286608'], estado: 'inoperativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Komatsu', codigos: ['81442', '82538'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-792'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-803', 'EGV-778'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 4, marca: 'Scania', codigos: ['EGM-828', 'EGM-781', 'EGM-872', 'EGM-777'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Scania', codigos: ['EGM-780'], estado: 'inoperativo' },
  ],
  flotaTotal: 19,
}
