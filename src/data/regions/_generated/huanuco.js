// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 3, m3: 9177.4, km: 1.7, poblacion: 1758, provincias: ['Huanuco', 'Leoncio Prado', 'Puerto Inca'] },
    { tipo: 'Prevención', cantidad: 18, m3: 93890.25, km: 489.38, poblacion: 17832, provincias: ['Ambo', 'Dos De Mayo', 'Huanuco', 'Leoncio Prado', 'Marañon', 'Puerto Inca'] },
    { tipo: 'Urgente atención', cantidad: 1, m3: 2350.0, km: 0.24, poblacion: 120, provincias: ['Ambo'] },
  ],
  ejecutadasTotal: { cantidad: 22, m3: 105417.65, m3AguaPotable: 0.0, km: 491.32, poblacion: 19710 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 8, m3: 57334.0, km: 7.22, poblacion: 4038, provincias: ['Huanuco'] },
    { tipo: 'Prevención', cantidad: 23, m3: 227090.0, km: 16.43, poblacion: 12288, provincias: ['Ambo', 'Huanuco', 'Leoncio Prado', 'Marañon', 'Puerto Inca'] },
    { tipo: 'Urgente atención', cantidad: 3, m3: 3625.0, km: 3.61, poblacion: 9900, provincias: ['Ambo', 'Leoncio Prado', 'Puerto Inca'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 34, m3: 288049.0, m3AguaPotable: 0.0, km: 27.26, poblacion: 26226 },

  enEjecucion: [
    { provincia: 'Huanuco', distrito: 'Huanuco', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACION DEL CAUCE DE LAS QUEBRADAS SECAS TINGORAGRA Y VIA CRUCIS AMBAS MARGENES, DESDE LA PROG. 0+000 A LA 0+300 DISTRITO DE HUANUCO, PROVINCIA DE HUANUCO Y DEPARTAMENTO DE HUANUCO-00                 ', inicio: '11/11/2026', fin: '25/11/2026', volAcum: 112.5, kmAcum: 0.03, poblacion: 380, poblacionSinDuplicar: 380 },
    { provincia: 'Dos De Mayo', distrito: 'La Union', tipo: 'Prevención', descripcion: '"LIMPIEZA, DESCOLMATACIóN, ENCAUZAMIENTO Y CONFORMACIóN DE DIQUES EN AMBAS MáRGENES DEL RíO VIZCARRA, SEGUNDO TRAMO, ENTRE EL KM 00+000 Y EL KM 00+820, SECTOR URBANO, DISTRITO DE LA UNIóN, PROVINCIA DE DOS DE MAYO, DEPARTAMENTO DE HUáNUCO"     ', inicio: '16/11/2026', fin: '30/11/2026', volAcum: 6356.07, kmAcum: 1.03, poblacion: 500, poblacionSinDuplicar: 500 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Dos De Mayo', distrito: 'La Union', cantidad: 1, metaVol: 5775.0, metaKm: 0.33, poblacion: 150 },
    { provincia: 'Huanuco', distrito: 'Huanuco', cantidad: 2, metaVol: 9420.0, metaKm: 2.19, poblacion: 800 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', cantidad: 3, metaVol: 20004.0, metaKm: 1.72, poblacion: 830 },
  ],
  programadasTotal: { cantidad: 6, metaVol: 35199.0, metaKm: 4.24, poblacion: 1780 },

  programadasDetalle: [
    { provincia: 'Huanuco', distrito: 'Huanuco', sector: 'Qda Tingoragra', ficha: '052-2026-LD-P-HCO', descripcion: 'LIMPIEZA, DESCOLMATACIóN Y ELIMINACIóN DE MATERIAL DESCOLMATADO, DEL CAUCE DE LA QUEBRADA TINGORAGRA, DE LA PROG. 0+000 A LA PROG. 0+1050, TRAMO II ,SECTOR LAS MORAS, DISTRITO, PROVINCIA Y DEPARTAMENTO DE HUáNUCO', fechaInicio: '23/11/2026', fechaFin: '07/12/2026', metaVol: 4480.0, metaKm: 1.05, poblacion: 320, poblacionSinDuplicar: 320 },
    { provincia: 'Huanuco', distrito: 'Huanuco', sector: 'Rio Higuieras', ficha: '053-2026-LD-P-HCO', descripcion: 'LIMPIEZA, DESCOLMATACIóN Y ELIMINACION DE MATERIAL DESCOLMATADO, DEL RíO HIGUERAS, DE LA PROG. 0+000 A LA PROG. 1+140, DEL SECTOR PUENTE TINGO, EN LA ZONA URBANA DE LA PROVINCIA DE HUáNUCO, REGION HUáNUCO ', fechaInicio: '25/11/2026', fechaFin: '09/12/2026', metaVol: 4940.0, metaKm: 1.14, poblacion: 480, poblacionSinDuplicar: 480 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', sector: 'Huampal', ficha: 'N° 056-2026-LD-P-HCO', descripcion: ' "LIMPIEZA, DESCOLMATACIÓN Y ELIMINACIÓN DE MATERIAL DESCOLMATADO DEL CAUCE DEL RÍO HUAMPAL, DE LA PROGRESIVA 0+000 A LA PROGRESIVA 0+465, MARGEN DERECHA, EN LA ZONA URBANA DEL DISTRITO DE CODO DEL POZUZO, PROVINCIA PUERTO INCA, REGIÓN HUÁNUCO"      ', fechaInicio: '26/11/2026', fechaFin: '10/12/2026', metaVol: 4960.0, metaKm: 0.47, poblacion: 330, poblacionSinDuplicar: 330 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', sector: 'Cp Huitoyacu', ficha: '036-2026-LD-P-HCO.', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y ENCAUZAMIENTO EN EL RIO HUITO, TRAMO I - ENTRE EL KM 00+000 Y EL KM 00+608, SECTOR HUITOYACU, DISTRITO DE CODO DEL POZUZO, PROVINCIA DE PUERTO INCA, DEPARTAMENTO DE HUANUCO ', fechaInicio: '01/12/2026', fechaFin: '15/12/2026', metaVol: 8512.0, metaKm: 0.61, poblacion: 250, poblacionSinDuplicar: 250 },
    { provincia: 'Dos De Mayo', distrito: 'La Union', sector: 'Sector Urbano', ficha: '051-2026-LD-P-HCO', descripcion: ' LIMPIEZA, DESCOLMATACIóN, ENCAUZAMIENTO Y CONFORMACION DE DIQUES EN AMBAS MARGENES DEL RIO CHACAMAYO, ENTRE EL KM 00+000 Y EL KM 00+330, SECTOR URBANO, DISTRITO DE LA UNION, PROVINCIA DE DOS DE MAYO, DEPARTAMENTO DE HUáNUCO   ', fechaInicio: '01/12/2026', fechaFin: '15/12/2026', metaVol: 5775.0, metaKm: 0.33, poblacion: 150, poblacionSinDuplicar: 150 },
    { provincia: 'Puerto Inca', distrito: 'Codo Del Pozuzo', sector: 'Rio Huitoyacu', ficha: '054-2026-LD-P-HCO', descripcion: 'LIMPIEZA, DESCOLMATACIÓN Y ENCAUZAMIENTO EN EL RIO HUITO, TRAMO II - ENTRE EL KM 00+000 Y EL KM 00+650, SECTOR HUITOYACU, DISTRITO DE CODO DEL POZUZO, PROVINCIA DE PUERTO INCA, DEPARTAMENTO DE HUANUCO', fechaInicio: '14/12/2026', fechaFin: '28/12/2026', metaVol: 6532.0, metaKm: 0.65, poblacion: 250, poblacionSinDuplicar: 250 },
  ],

  puntosCriticos: [
  ],

  conveniosCount: 4,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 24/02/2027' },
    { entidad: 'Municipalidad Provincial Huanuco', detail: 'hasta 19/08/2027' },
    { entidad: 'Municipalidad Distrital Jose Crespo Y Castillo', detail: 'vence 25/11/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Distrital San Francisco De Cayran', detail: 'vence 03/12/2026 (a un mes de caducar)' },
  ],

  flota: [
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGL-984'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00245'], estado: 'inoperativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00821'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Caterpillar', codigos: ['TJT10096'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810156'], estado: 'inoperativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810397'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'Caterpillar', codigos: ['LMST05753'], estado: 'operativo' },
    { tipo: 'Mini cargador', cantidad: 1, marca: 'John Deere', codigos: ['272094'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-412'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-104'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286758'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81478'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-841', 'EGV-798'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 4, marca: 'Scania', codigos: ['EGN-536', 'EGM-934', 'EGN-507', 'EGM-820'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGN-535', 'EGM-776'], estado: 'inoperativo' },
  ],
  flotaTotal: 20,
}
