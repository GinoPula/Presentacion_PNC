// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 5, m3: 31332.0, km: 1.19, poblacion: 16650 },
    { tipo: 'Prevención', cantidad: 12, m3: 85706.58, km: 4.17, poblacion: 11300 },
    { tipo: 'Urgente atención', cantidad: 5, m3: 3720.0, km: null, poblacion: 3750 },
  ],
  ejecutadasTotal: { cantidad: 22, m3: 120758.58, km: 5.36, poblacion: 31700 },

  enEjecucion: [
    { provincia: 'Palpa', distrito: 'Rio Grande', tipo: 'Urgente atención', descripcion: ' DISTRIBUCIÓN DE AGUA PARA CONSUMO HUMANO POR PERSISTENCIA DE NECESIDAD EN CENTROS POBLADOS DEL DISTRITO DE RIO GRANDE, PROVINCIA PALPA, DEPARTAMENTO ICA.    ', inicio: '24/08/2026', fin: '22/09/2026', volAcum: 30.0, poblacion: 750 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Ica', distrito: 'San Jose De Los Molinos', cantidad: 1, metaVol: 7029.0, metaKm: 0.11, poblacion: 1800 },
    { provincia: 'Nasca', distrito: 'Nasca', cantidad: 5, metaVol: 40610.0, metaKm: 1.55, poblacion: 5140 },
    { provincia: 'Nasca', distrito: 'Vista Alegre', cantidad: 3, metaVol: 27852.0, metaKm: 0.98, poblacion: 870 },
    { provincia: 'Palpa', distrito: 'Llipata', cantidad: 1, metaVol: 13300.0, metaKm: 0.38, poblacion: 90 },
    { provincia: 'Pisco', distrito: 'Pisco', cantidad: 2, metaVol: 4276.0, metaKm: 1.17, poblacion: 1140 },
  ],
  programadasTotal: { cantidad: 12, metaVol: 93067.0, metaKm: 4.19, poblacion: 9040 },

  conveniosCount: 6,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 26/09/2026' },
    { entidad: 'Municipalidad Provincial Nasca', detail: 'hasta 27/09/2026' },
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
