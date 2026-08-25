// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 4, m3: 15908.0, km: 1.05, poblacion: 18060 },
    { tipo: 'Prevención', cantidad: 41, m3: 136690.0, km: 15.55, poblacion: 43117 },
    { tipo: 'Urgente atención', cantidad: 8, m3: 3290.0, km: 6.11, poblacion: 4595 },
  ],
  ejecutadasTotal: { cantidad: 53, m3: 155888.0, km: 22.71, poblacion: 65772 },

  enEjecucion: [
    { provincia: 'Yungay', distrito: 'Shupluy', tipo: 'Prevención', descripcion: ' LIMPIEZA Y DESCOLMATACIÓN DE LA QUEBRADA SANTO TORIBIO TRAMO I, DISTRITO DE SHUPLUY, PROVINCIA DE YUNGAY, REGION ANCASH   ', inicio: '13/08/2026', fin: '24/08/2026', volAcum: 3676.0, poblacion: 2516 },
    { provincia: 'Huaraz', distrito: 'Huaraz', tipo: 'Prevención', descripcion: ' LIMPIEZA, DESCOLMATACIÓN Y CONFORMACIÓN DE TALUD EN AMBAS MARGENES DEL RÍO SANTA, SECTOR SAN PEDRO, DISTRITO DE HUARAZ, PROVINCIA HUARAZ, REGIÓN ANCASH ', inicio: '21/08/2026', fin: '03/09/2026', volAcum: 2760.0, poblacion: 154 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Carhuaz', distrito: 'Acopampa', cantidad: 1, metaVol: 4950.0, metaKm: 1.1, poblacion: 965 },
    { provincia: 'Huaraz', distrito: 'Independencia', cantidad: 1, metaVol: 4238.55, metaKm: 0.68, poblacion: 240 },
    { provincia: 'Huari', distrito: 'Chavin De Huantar', cantidad: 1, metaVol: 504.56, metaKm: 0.21, poblacion: 131 },
    { provincia: 'Huarmey', distrito: 'Huarmey', cantidad: 6, metaVol: 30920.0, metaKm: 3.58, poblacion: 2400 },
    { provincia: 'Huaylas', distrito: 'Pueblo Libre', cantidad: 4, metaVol: 30542.15, metaKm: 2.38, poblacion: 1024 },
    { provincia: 'Ocros', distrito: 'Cochas', cantidad: 1, metaVol: 19328.94, metaKm: 0.6, poblacion: 340 },
    { provincia: 'Recuay', distrito: 'Catac', cantidad: 5, metaVol: 37342.5, metaKm: 2.81, poblacion: 433 },
    { provincia: 'Recuay', distrito: 'Recuay', cantidad: 2, metaVol: 8250.0, metaKm: 0.45, poblacion: 4650 },
    { provincia: 'Recuay', distrito: 'Ticapampa', cantidad: 1, metaVol: 597.55, metaKm: 0.17, poblacion: 50 },
    { provincia: 'Santa', distrito: 'Samanco', cantidad: 1, metaVol: 10509.6, metaKm: 1.62, poblacion: 300 },
    { provincia: 'Santa', distrito: 'Santa', cantidad: 1, metaVol: 4725.0, metaKm: 0.15, poblacion: 300 },
    { provincia: 'Yungay', distrito: 'Shupluy', cantidad: 1, metaVol: 2268.0, metaKm: 0.36, poblacion: 2516 },
    { provincia: 'Yungay', distrito: 'Yungay', cantidad: 2, metaVol: 2784.0, metaKm: 0.58, poblacion: 1112 },
  ],
  programadasTotal: { cantidad: 27, metaVol: 156960.85, metaKm: 14.68, poblacion: 14461 },

  conveniosCount: 5,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 03/03/2027' },
    { entidad: 'Municipalidad Provincial Yungay', detail: 'hasta 07/07/2027' },
    { entidad: 'Municipalidad Provincial Huaraz', detail: 'hasta 21/07/2027' },
    { entidad: 'Municipalidad Provincial Casma', detail: 'hasta 21/08/2027' },
    { entidad: 'Municipalidad Distrital Independencia', detail: 'vence 29/08/2026 (a un mes de caducar)' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGM-994'], estado: 'operativo' },
    { tipo: 'Camión cisterna de combustible', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-025'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Toyota', codigos: ['EAJ-733'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'John Deere', codigos: ['D001597'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Caterpillar', codigos: ['TJT10127', 'TJT10129'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['D523228'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 2, marca: 'Komatsu', codigos: ['A10879', '85461'], estado: 'inoperativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'Industria Firme', codigos: ['EAJ-572'], estado: 'operativo' },
    { tipo: 'Plataforma (cama baja)', cantidad: 1, marca: 'RMB Sateci', codigos: ['EGO-601'], estado: 'operativo' },
    { tipo: 'Remolcador', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EAJ-560', 'EGN-071'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'New Holland', codigos: ['NNHH09046'], estado: 'operativo', nota: 'Movilizada a la UBO Junín para atención de emergencia.' },
    { tipo: 'Tractor sobre oruga', cantidad: 2, marca: 'Komatsu', codigos: ['81373', '82454'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGV-808'], estado: 'inoperativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Scania', codigos: ['EGM-824'], estado: 'operativo' },
  ],
  flotaTotal: 18,
}
