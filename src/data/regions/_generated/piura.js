// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 17, m3: 103415.33, km: 25.0, poblacion: 29096 },
    { tipo: 'Prevención', cantidad: 27, m3: 152411.68, km: 49.36, poblacion: 113557 },
    { tipo: 'Urgente atención', cantidad: 8, m3: 34607.5, km: 28.15, poblacion: 9758 },
  ],
  ejecutadasTotal: { cantidad: 52, m3: 290434.51, km: 102.52, poblacion: 152411 },

  enEjecucion: [
    { provincia: 'Morropon', distrito: 'Chulucanas', tipo: 'Emergencia', descripcion: ' LIMPIEZA, DESCOLMATACION Y CONFORMACION DE DIQUE, DE LA QUEBRADA LA PEÑA - TRAMO II, CASERIO DE LA PEÑA, DISTRITO DE CHULUCANAS, PROVINCIA DE MORROPÓN, DEPARTAMENTO PIURA  ', inicio: '06/08/2026', fin: '30/08/2026', volAcum: 4200.0, poblacion: 110 },
    { provincia: 'Huancabamba', distrito: 'Canchaque', tipo: 'Emergencia', descripcion: '"LEVANTAMIENTO DE ESCOMBROS QUE INTERRUMPEN LA TRANSITABILIDAD DEL CAMINO VECINAL ENTRE LOS TRAMOS DE PAPAYAL BAJO, MONTE GRANDE, PIEDRA BLANCA, PAPAYAL ALTO, HUAMALA ALTO, HUAMALA BAJO Y SOCCHA ALTA, DISTRITO DE CANCHAQUE - PROVINCIA DE HUANCABAMBA - DEPARTAMENTO DE PIURA"', inicio: '19/08/2026', fin: '07/09/2026', volAcum: 2000.0, poblacion: 372 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Huancabamba', distrito: 'Huancabamba', cantidad: 5, metaVol: 32201.23, metaKm: 2.23, poblacion: 23725 },
    { provincia: 'Morropon', distrito: 'Chalaco', cantidad: 1, metaVol: 2417.4, metaKm: 2.0, poblacion: 1250 },
    { provincia: 'Morropon', distrito: 'Chulucanas', cantidad: 7, metaVol: 40497.5, metaKm: 5.93, poblacion: 21229 },
    { provincia: 'Morropon', distrito: 'Morropon', cantidad: 10, metaVol: 23996.9, metaKm: 7.45, poblacion: 14420 },
    { provincia: 'Morropon', distrito: 'Salitral', cantidad: 2, metaVol: 29900.0, metaKm: 2.76, poblacion: 1600 },
    { provincia: 'Morropon', distrito: 'San Juan De Bigote', cantidad: 2, metaVol: 19864.0, metaKm: 1.82, poblacion: 670 },
    { provincia: 'Morropon', distrito: 'Santa Catalina De Mossa', cantidad: 1, metaVol: 20625.0, metaKm: 0.55, poblacion: 950 },
    { provincia: 'Morropon', distrito: 'Santo Domingo', cantidad: 1, metaVol: 7167.6, metaKm: 0.54, poblacion: 212 },
    { provincia: 'Piura', distrito: 'Castilla', cantidad: 4, metaVol: 23946.8, metaKm: 3.67, poblacion: 14770 },
    { provincia: 'Piura', distrito: 'Catacaos', cantidad: 2, metaVol: 4000.5, metaKm: 2.05, poblacion: 3380 },
    { provincia: 'Piura', distrito: 'Cura Mori', cantidad: 2, metaVol: 7140.0, metaKm: 1.0, poblacion: 30000 },
    { provincia: 'Piura', distrito: 'Piura', cantidad: 1, metaVol: 7700.0, metaKm: 0.77, poblacion: 2000 },
    { provincia: 'Piura', distrito: 'Tambo Grande', cantidad: 3, metaVol: 4797.59, metaKm: 3.17, poblacion: 14250 },
    { provincia: 'Piura', distrito: 'Veintiseis De Octubre', cantidad: 5, metaVol: 52382.75, metaKm: 8.01, poblacion: 28849 },
  ],
  programadasTotal: { cantidad: 46, metaVol: 276637.27, metaKm: 41.95, poblacion: 157305 },

  conveniosCount: 23,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: '1 convenio vigente' },
    { entidad: 'Municipalidad Provincial', detail: '1 convenio vigente' },
    { entidad: 'Municipalidad Distrital', detail: '21 convenios vigentes' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 5, marca: 'Mercedes Benz', codigos: ['EGM-995', 'EGN-029', 'EGN-011', 'EGN-003', 'EGN-012'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-975'], estado: 'operativo' },
    { tipo: 'Camión de auxilio mecánico', cantidad: 1, marca: 'Hino', codigos: ['EAJ-979'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 2, marca: 'Mitsubishi', codigos: ['EGO-003', 'EGM-051'], estado: 'operativo' },
    { tipo: 'Camión grúa', cantidad: 1, marca: 'Iveco', codigos: ['EGQ-995'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 2, marca: 'Caterpillar', codigos: ['JLX00828', 'JLX00829'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 3, marca: 'John Deere', codigos: ['D001580', 'D001578', 'D001587'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Caterpillar', codigos: ['TJT10107', 'TJT10095'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 3, marca: 'John Deere', codigos: ['810139', 'D810495', '810396'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['810371'], estado: 'inoperativo', nota: 'Falla en el módulo de control electrónico. HT N° 124313' },
    { tipo: 'Mini cargador', cantidad: 3, marca: 'John Deere', codigos: ['G278945', 'G278937', 'G261847'], estado: 'operativo' },
    { tipo: 'Motoniveladora', cantidad: 1, marca: 'Caterpillar', codigos: ['SZL03374'], estado: 'operativo' },
    { tipo: 'Plataforma', cantidad: 1, marca: 'ACS', codigos: ['EGR-068'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAK-083'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGV-817'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-852'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 1, marca: 'Volvo', codigos: ['EAJ-376'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 2, marca: 'John Deere', codigos: ['C429243', '285270'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Caterpillar', codigos: ['J8B05113', 'AE800572'], estado: 'operativo' },
    { tipo: 'Tractor sobre oruga', cantidad: 1, marca: 'Komatsu', codigos: ['81437'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 9, marca: 'Mercedes Benz', codigos: ['EGV-769', 'EAJ-455', 'EAJ-400', 'EGV-809', 'EAJ-390', 'EGV-822', 'EGV-783', 'EGV-807', 'EGV-770'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-802', 'EGV-804'], estado: 'inoperativo', nota: 'EGV-802: falla en la transmisión. EGV-804: reparación de alternador y aire acondicionado' },
  ],
  flotaTotal: 46,
}
