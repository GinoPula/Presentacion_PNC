// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 7, m3: 37110.0, km: 2.08, poblacion: 4864 },
    { tipo: 'Prevención', cantidad: 12, m3: 66850.0, km: 3.15, poblacion: 20914 },
    { tipo: 'Urgente atención', cantidad: 9, m3: 12513.2, km: 14.56, poblacion: 4858 },
  ],
  ejecutadasTotal: { cantidad: 28, m3: 116473.2, km: 19.79, poblacion: 30636 },

  enEjecucion: [
    { provincia: 'Tacna', distrito: 'Sama', tipo: 'Urgente atención', descripcion: ' DISTRIBUCION TEMPORAL DE AGUA PARA CONSUMO HUMANO PARA LA POBLACION DE SAMA Y ANEXOS IV ETAPA, DISTRITO DE SAMA, PROVINCIA DE TACNA, REGION DE TACNA  ', inicio: '10/08/2026', fin: '08/10/2026', volAcum: 155.0, poblacion: 420 },
    { provincia: 'Tacna', distrito: 'La Yarada Los Palos', tipo: 'Prevención', descripcion: ' LIMPIEZA Y DESCOLMATACION EN EL CAUCE DEL RIO SECO, SECTOR PUENTE LOS PALOS AGUAS ARRIBA, DISTRITO LA  YARADA LOS PALOS, PROVINCIA DE TACNA. REGION DE TACNA                   ', inicio: '17/08/2026', fin: '29/08/2026', volAcum: 3050.0, poblacion: 700 },
    { provincia: 'Tacna', distrito: 'Inclan', tipo: 'Urgente atención', descripcion: ' DISTRIBUCION TEMPORAL DE AGUA PARA CONSUMO HUMANO PARA LA POBLACION DE INCLAN Y ANEXOS III ETAPA, DISTRITO DE INCLAN, PROVINCIA DE TACNA, REGION DE TACNA   ', inicio: '18/08/2026', fin: '16/10/2026', volAcum: 90.0, poblacion: 550 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Jorge Basadre', distrito: 'Locumba', cantidad: 1, metaVol: 6000.0, metaKm: 0.4, poblacion: 200 },
    { provincia: 'Tacna', distrito: 'Calana', cantidad: 2, metaVol: 13640.0, metaKm: 0.8, poblacion: 10350 },
    { provincia: 'Tacna', distrito: 'Inclan', cantidad: 2, metaVol: 18000.0, metaKm: 0.6, poblacion: 1200 },
    { provincia: 'Tacna', distrito: 'Pachia', cantidad: 2, metaVol: 17000.0, metaKm: 0.5, poblacion: 3062 },
    { provincia: 'Tacna', distrito: 'Palca', cantidad: 2, metaVol: 8000.0, metaKm: 1.6, poblacion: 176 },
    { provincia: 'Tacna', distrito: 'Sama', cantidad: 2, metaVol: 10000.0, metaKm: 10.4, poblacion: 1050 },
    { provincia: 'Tacna', distrito: 'Tacna', cantidad: 1, metaVol: 4320.0, metaKm: 0.2, poblacion: 1000 },
  ],
  programadasTotal: { cantidad: 12, metaVol: 76960.0, metaKm: 14.5, poblacion: 17038 },

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 10/11/2026' },
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
