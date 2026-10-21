// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 7, m3: 37110.0, km: 2.08, poblacion: 4864, provincias: ['Tacna'] },
    { tipo: 'Prevención', cantidad: 15, m3: 81695.0, km: 4.25, poblacion: 22464, provincias: ['Tacna'] },
    { tipo: 'Urgente atención', cantidad: 11, m3: 13718.8, km: 14.56, poblacion: 5828, provincias: ['Tacna'] },
  ],
  ejecutadasTotal: { cantidad: 33, m3: 132523.8, m3AguaPotable: 4561.8, km: 20.89, poblacion: 33156 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 14, m3: 98606.6, km: 4.7, poblacion: 12128, provincias: ['Tacna'] },
    { tipo: 'Prevención', cantidad: 24, m3: 124649.0, km: 7.48, poblacion: 28527, provincias: ['Tacna'] },
    { tipo: 'Urgente atención', cantidad: 16, m3: 27502.2, km: 48.62, poblacion: 6192, provincias: ['Jorge Basadre', 'Tacna'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 54, m3: 250757.8, m3AguaPotable: 12987.8, km: 60.8, poblacion: 46847 },

  enEjecucion: [
    { provincia: 'Jorge Basadre', distrito: 'Ite', tipo: 'Emergencia', descripcion: ' DISTRIBUCION TEMPORAL DE AGUA PARA CONSUMO HUMANO PARA LA POBLACION DE ITE Y ANEXOS - I ETAPA, DISTRITO DE ITE, PROVINCIA DE JORGE BASADRE, REGION DE TACNA      ', inicio: '09/10/2026', fin: '07/12/2026', volAcum: 0.0, kmAcum: 0.0, poblacion: 850 },
    { provincia: 'Tacna', distrito: 'Sama', tipo: 'Urgente atención', descripcion: ' DISTRIBUCION TEMPORAL DE AGUA PARA CONSUMO HUMANO PARA LA POBLACION DE SAMA Y ANEXOS - V ETAPA, DISTRITO DE SAMA, PROVINCIA DE TACNA, REGION DE TACNA          ', inicio: '13/10/2026', fin: '11/12/2026', volAcum: 120.0, kmAcum: 0.0, poblacion: 420 },
    { provincia: 'Tacna', distrito: 'Pachia', tipo: 'Prevención', descripcion: ' LIMPIEZA Y ENCAUZAMIENTO EN LA QUEBRADA CHUCHUCO, SECTOR RESERVORIO DE AGUA PARA LA POBLACION DE CALIENTES, DISTRITO DE PACHIA, PROVINCIA DE TACNA, REGION DE TACNA.      ', inicio: '16/10/2026', fin: '24/10/2026', volAcum: 1600.0, kmAcum: 0.11, poblacion: 250 },
    { provincia: 'Tacna', distrito: 'Tacna', tipo: 'Prevención', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO CAPLINA, SECTOR AGUAS ABAJO DE BALNEARIO CALIENTES, DISTRITO DE PACHIA, PROVINCIA DE TACNA, REGION DE TACNA       ', inicio: '19/10/2026', fin: '02/11/2026', volAcum: 1300.0, kmAcum: 0.09, poblacion: 250 },
    { provincia: 'Tacna', distrito: 'Inclan', tipo: 'Emergencia', descripcion: 'DISTRIBUCION TEMPORAL DE AGUA PARA CONSUMO HUMANO PARA LA POBLACION DE INCLAN Y ANEXOS IV ETAPA, DISTRITO DE INCLAN, PROVINCIA DE TACNA, REGION DE TACNA          ', inicio: '20/10/2026', fin: '18/12/2026', volAcum: 15.0, kmAcum: 0.0, poblacion: 550 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Tacna', distrito: 'Calana', cantidad: 1, metaVol: 8000.0, metaKm: 0.4, poblacion: 10000 },
    { provincia: 'Tacna', distrito: 'Pachia', cantidad: 3, metaVol: 25975.0, metaKm: 0.85, poblacion: 13389 },
    { provincia: 'Tacna', distrito: 'Sama', cantidad: 1, metaVol: 2940.0, metaKm: 6.0, poblacion: 300 },
    { provincia: 'Tacna', distrito: 'Tacna', cantidad: 1, metaVol: 4320.0, metaKm: 0.2, poblacion: 1000 },
  ],
  programadasTotal: { cantidad: 6, metaVol: 41235.0, metaKm: 7.45, poblacion: 24689 },

  programadasDetalle: [
    { provincia: 'Tacna', distrito: 'Pachia', sector: 'Aguas Abajo De Bocatoma Challata', ficha: '051-2026-LD-P-TAC', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO CAPLINA, SECTOR AGUAS ABAJO DE BOCATOMA CHALLATA, DISTRITO DE PACHIA, PROVINCIA DE TACNA, REGION DE TACNA     ', fechaInicio: '26/10/2026', fechaFin: '09/11/2026', metaVol: 6800.0, metaKm: 0.25, poblacion: 2389 },
    { provincia: 'Tacna', distrito: 'Pachia', sector: 'Bocatoma Chuschuco Ii Etapa', ficha: '033-2026-LD-P-TAC', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO UCHUSUMA, SECTOR BOCATOMA CHUSCHUCO II ETAPA, DISTRITO DE PACHIA, PROVINCIA DE TACNA, REGION DE TACNA                ', fechaInicio: '02/11/2026', fechaFin: '21/11/2026', metaVol: 11175.0, metaKm: 0.3, poblacion: 10000 },
    { provincia: 'Tacna', distrito: 'Tacna', sector: 'Puente Cerro Blanco', ficha: '027-2026-LD-P-TAC', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO CAPLINA, SECTOR PUENTE CERRO BLANCO, DISTRITO DE CALANA, PROVINCIA DE TACNA, REGION DE TACNA-00                                     ', fechaInicio: '16/11/2026', fechaFin: '25/11/2026', metaVol: 4320.0, metaKm: 0.2, poblacion: 1000 },
    { provincia: 'Tacna', distrito: 'Pachia', sector: 'Bocatoma Challata Ii Etapa', ficha: '036-2026-LD-P-TAC', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO CAPLINA, SECTOR BOCATOMA CHALLATA II ETAPA, DISTRITO DE PACHIA, PROVINCIA DE TACNA, REGION DE TACNA  ', fechaInicio: '22/11/2026', fechaFin: '11/12/2026', metaVol: 8000.0, metaKm: 0.3, poblacion: 1000 },
    { provincia: 'Tacna', distrito: 'Calana', sector: 'Recodo', ficha: '007-2026-LD-P-TAC', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO CAPLINA, SECTOR RECODO, DISTRITO DE CALANA, PROVINCIA DE TACNA, REGION DE TACNA-00         ', fechaInicio: '01/12/2026', fechaFin: '15/12/2026', metaVol: 8000.0, metaKm: 0.4, poblacion: 10000 },
    { provincia: 'Tacna', distrito: 'Sama', sector: 'Junta Vecinal Buena Vista - I Etapa', ficha: '045-2026-MTV-U-TAC', descripcion: ' MEJORAMIENTO DE LA TRANSTIBALIDAD DE LAS VIAS DE ACCESO PARA LA DISTRIBUCION DE AGUA PARA CONSUMO SECTOR JUNTA VECINAL BUENA VISTA I ETAPA, DISTRITO DE SAMA, PROVINCIA DE TACNA. REGION DE TECNA              ', fechaInicio: '01/12/2026', fechaFin: '20/12/2026', metaVol: 2940.0, metaKm: 6.0, poblacion: 300 },
  ],

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'vence 10/11/2026 (a un mes de caducar)' },
    { entidad: 'Municipalidad Provincial Tacna', detail: 'hasta 19/02/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 3, marca: 'Mercedes Benz', codigos: ['EGO-007', 'EGM-996', 'EGN-975'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-945'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGM-008'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Caterpillar', codigos: ['JLX00222'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810311'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['85422', 'A10893'], estado: 'inoperativo' },
    { tipo: 'Mini cargador', cantidad: 2, marca: 'John Deere', codigos: ['G275475', '282134'], estado: 'operativo' },
    { tipo: 'Motoniveladora', cantidad: 1, marca: 'Caterpillar', codigos: ['SZL03377'], estado: 'operativo' },
    { tipo: 'Plataforma', cantidad: 3, marca: 'ACS', codigos: ['EGR-071', 'EGR-072', 'EGR-070'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-058'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-105'], estado: 'operativo' },
    { tipo: 'Rodillo compactador', cantidad: 1, marca: 'Hamm', codigos: ['H1762420'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81435'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 3, marca: 'Mercedes Benz', codigos: ['EGV-834', 'EGV-816', 'EGV-789'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Scania', codigos: ['EGM-987', 'EGM-783'], estado: 'operativo' },
  ],
  flotaTotal: 24,
}
