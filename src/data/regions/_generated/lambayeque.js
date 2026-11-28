// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 10, m3: 103948.75, km: 9.66, poblacion: 18546, provincias: ['Chiclayo', 'Lambayeque'] },
    { tipo: 'Prevención', cantidad: 26, m3: 153226.35, km: 57.48, poblacion: 64810, provincias: ['Chiclayo', 'Ferreñafe', 'Lambayeque'] },
    { tipo: 'Urgente atención', cantidad: 7, m3: 6332.0, km: null, poblacion: 14931, provincias: ['Chiclayo', 'Lambayeque'] },
  ],
  ejecutadasTotal: { cantidad: 43, m3: 263507.1, m3AguaPotable: 6332.0, km: 67.14, poblacion: 98287 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 4, m3: 68560.0, km: 6.05, poblacion: 8861, provincias: ['Chiclayo', 'Lambayeque'] },
    { tipo: 'Prevención', cantidad: 24, m3: 174019.0, km: 48.17, poblacion: 89138, provincias: ['Chiclayo', 'Ferreñafe', 'Lambayeque'] },
    { tipo: 'Urgente atención', cantidad: 6, m3: 37761.0, km: 17.0, poblacion: 16958, provincias: ['Chiclayo', 'Lambayeque'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 34, m3: 280340.0, m3AguaPotable: 2761.0, km: 71.22, poblacion: 114957 },

  enEjecucion: [
    { provincia: 'Lambayeque', distrito: 'Olmos', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO Y DISTRIBUCION DE AGUA POTABLE A DIFERENTES CASERIOS DEL DISTRITO DE OLMOS, PROVINCIA DE LAMBAYEQUE, REGION LAMBAYEQUE.     ', inicio: '16/10/2026', fin: '14/12/2026', volAcum: 316.0, kmAcum: 0.0, poblacion: 3350, poblacionSinDuplicar: 3350 },
    { provincia: 'Chiclayo', distrito: 'Lagunas', tipo: 'Urgente atención', descripcion: ' ABASTECIMIENTO DE AGUA POTABLE A DIFERENTES SECTORES DEL DISTRITO DE LAGUNAS, PROVINCIA DE CHICLAYO, REGION LAMBAYEQUE   ', inicio: '12/11/2026', fin: '29/12/2026', volAcum: 210.0, kmAcum: 0.0, poblacion: 1100, poblacionSinDuplicar: 1100 },
    { provincia: 'Lambayeque', distrito: 'Motupe', tipo: 'Emergencia', descripcion: '“LIMPIEZA, DESCOLMATACIÓN Y REFORZAMIENTO DE MARGENES EROSIONADAS DEL RIO “CHINIAMA”, SECTOR “RIO SECO”  DEL CENTRO POBLADO EL ARROZAL DEL DISTRITO DE MOTUPE, PROVINCIA DE LAMBAYEQUE, REGIÓN LAMBAYEQUE”   ', inicio: '18/11/2026', fin: '13/12/2026', volAcum: 5800.0, kmAcum: 0.2, poblacion: 593, poblacionSinDuplicar: 593 },
    { provincia: 'Chiclayo', distrito: 'La Victoria', tipo: 'Prevención', descripcion: '  LIMPIEZA Y DESCOLMATACION DE 3.22 KM DEL CANAL TOCNOPE, ENTRE LOS SECTORES CHACUPE Y URB SANTA ROSA, EN EL DISTRITO DE LA VICTORIA, PROVINCIA DE CHICLAYO, REGION LAMBAYEQUE -00          ', inicio: '21/11/2026', fin: '13/12/2026', volAcum: 540.0, kmAcum: 0.27, poblacion: 7500, poblacionSinDuplicar: 7500 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Chiclayo', distrito: 'Chiclayo', cantidad: 1, metaVol: 8200.0, metaKm: 1.6, poblacion: 13250 },
    { provincia: 'Chiclayo', distrito: 'Pimentel', cantidad: 1, metaVol: 2078.45, metaKm: 7.2, poblacion: 0 },
    { provincia: 'Lambayeque', distrito: 'Olmos', cantidad: 2, metaVol: 22500.0, metaKm: 1.25, poblacion: 2800 },
  ],
  programadasTotal: { cantidad: 4, metaVol: 32778.45, metaKm: 10.05, poblacion: 16050 },

  programadasDetalle: [
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: '', ficha: '038-2026 -LD-P-LAM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DE 0.50 KM DE LA QUEBRADA “GRANDE” EN EL CASERIO “NICHIPO” DEL DISTRITO DE OLMOS, PROVINCIA DE LAMBAYEQUE, REGIÓN LAMBAYEQUE”              ', fechaInicio: '25/10/2026', fechaFin: '07/11/2026', metaVol: 15000.0, metaKm: 0.5, poblacion: 800, poblacionSinDuplicar: 800 },
    { provincia: 'Lambayeque', distrito: 'Olmos', sector: 'Caserio Nichipo', ficha: '023-2026 -LD-P-LAM', descripcion: '“LIMPIEZA Y DESCOLMATACIÓN DE 0.75 KM DE LA QUEBRADA “PALO BLANCO” EN EL CASERIO “NICHIPO” DEL DISTRITO DE OLMOS, PROVINCIA DE LAMBAYEQUE, REGIÓN LAMBAYEQUE”       ', fechaInicio: '28/10/2026', fechaFin: '08/11/2026', metaVol: 7500.0, metaKm: 0.75, poblacion: 2000, poblacionSinDuplicar: 2000 },
    { provincia: 'Chiclayo', distrito: 'Chiclayo', sector: 'Sectores Pp. Jj. Santo Toribio De Mogrovejo, Urb. Miraflores, Alojamiento Derrama Magisterial, Urb. Ciudad De Chofer Y Praderas Del Sol', ficha: '030-2026 -LD-P-LAM', descripcion: ' “LIMPIEZA Y DESCOLMATACIÓN DE 1.60 KM DEL CANAL “COIS” ENTRE LOS SECTORES PP. JJ. SANTO TORIBIO DE MOGROVEJO, URB. MIRAFLORES, ALOJAMIENTO DERRAMA MAGISTERIAL, URB. CIUDAD DE CHOFER Y PRADERAS DEL SOL, EN EL DISTRITO Y PROVINCIA DE CHICLAYO, REGIÓN LAMBAYEQUE” -00           ', fechaInicio: '23/11/2026', fechaFin: '29/11/2026', metaVol: 8200.0, metaKm: 1.6, poblacion: 13250, poblacionSinDuplicar: 13250 },
    { provincia: 'Chiclayo', distrito: 'Pimentel', sector: '', ficha: '063-2026 -LD-P-LAM', descripcion: ' “LIMPIEZA Y DESCOLMATACIÓN DEL CANAL  "ESCUTE” ENTRE LOS SECTORES PP. JJ. AMPLIACIÓN VICTOR RAÚL HAYA DE LA TORRE, URB. SANTA MARGARITA, CONDOMINIO VILLA CLUB PALMERAS, CONDOMINO NUESTRA SEÑORA DE LA PAZ, CONDOMINIO VILLA LOS SAUCES, URBANIZACIÓN EL SANTUARIO, URB. LOS TREBOLES, URB. LAS LOMAS DE PIMENTEL, LA GARITA I Y II, CONDOMINO LA JOYITA, LA JOYITA I Y II, CONDOMINIO ALAMEDA, CONDOMINO REAL, RESIDENCIAL LOMAS DE SAN AGUSTIN, URB. SOL DE PIMENTEL, EN EL DISTRITO DE PIMENTEL, PROVINCIA DE CHICLAYO, REGIÓN LAMBAYEQUE”     ', fechaInicio: '16/12/2026', fechaFin: '14/01/2027', metaVol: 2078.45, metaKm: 7.2, poblacion: null, poblacionSinDuplicar: null },
  ],

  puntosCriticos: [
    { provincia: 'Chiclayo', distrito: 'Chongoyape', sector: 'Cuculi', fichaTecnica: '060-2026-LD-E-LAM', descripcion: '"LIMPIEZA Y DESCOLMATACIÓN DE LA QUEBRADA “CHUMILLAN”, EN EL CENTRO POBLADO “CUCULI” DEL DISTRITO DE CHONGOYAPE, PROVINCIA DE CHICLAYO, REGION LAMBAYEQUE "   DS180-P        ', estado: 'Ejecutada', mes: '', metaKm: 1.83, metaVol: 19215.0, poblacion: 1422 },
    { provincia: 'Chiclayo', distrito: 'Patapo', sector: 'La Cria', fichaTecnica: '061-2026-LD-E-LAM', descripcion: 'LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUE CON MATERIAL PROPIO EN LA MARGEN IZQUIERDA DE LA QUEBRADA “LA CRIA” EN EL CENTRO POBLADO “LA CRIA” EN EL DISTRITO DE PATAPO, PROVINCIA DE CHICLAYO, REGION LAMBAYEQUE  DS180-P        ', estado: 'Ejecutada', mes: '', metaKm: 0.29, metaVol: 10042.7, poblacion: 2886 },
  ],

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'vence 07/12/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Distrital Olmos', detail: 'vence 28/12/2026 (a un mes de caducar)' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Hino', codigos: ['EAA-171'], estado: 'operativo' },
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-884'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-938'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-972'], estado: 'operativo' },
    { tipo: 'Camión grúa', cantidad: 1, marca: 'Iveco', codigos: ['EGQ-981'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'John Deere', codigos: ['D001614'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Caterpillar', codigos: ['TJT10108', 'TJT10111'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'John Deere', codigos: ['G287730'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAK-067'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGW-174'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-721'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Volvo', codigos: ['EAJ-387'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286748'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Caterpillar', codigos: ['AE800570'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81446'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 7, marca: 'Mercedes Benz', codigos: ['EAJ-423', 'EAJ-396', 'EGV-821', 'EGV-788', 'EGV-833', 'EGV-824', 'EGV-827'], estado: 'operativo' },
  ],
  flotaTotal: 23,
}
