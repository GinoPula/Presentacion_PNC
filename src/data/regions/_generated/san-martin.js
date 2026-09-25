// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 4, m3: 14139.15, km: 7.17, poblacion: 1400, provincias: ['Moyobamba', 'Picota'] },
    { tipo: 'Urgente atención', cantidad: 13, m3: 24654.6, km: 21.98, poblacion: 9900, provincias: ['Bellavista', 'Lamas', 'Moyobamba', 'Rioja'] },
  ],
  ejecutadasTotal: { cantidad: 17, m3: 38793.75, m3AguaPotable: 6555.0, km: 29.14, poblacion: 11300 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 9, m3: 15750.7, km: 8.98, poblacion: 3266, provincias: ['Moyobamba', 'Picota', 'San Martin'] },
    { tipo: 'Prevención', cantidad: 2, m3: 10737.5, km: 2.24, poblacion: 450, provincias: ['Moyobamba'] },
    { tipo: 'Urgente atención', cantidad: 24, m3: 38222.04, km: 24.0, poblacion: 16120, provincias: ['Bellavista', 'El Dorado', 'Moyobamba', 'Picota', 'Rioja', 'San Martin'] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 35, m3: 64710.24, m3AguaPotable: 10890.0, km: 35.22, poblacion: 19836 },

  enEjecucion: [
    { provincia: 'San Martin', distrito: 'El Porvenir', tipo: 'Urgente atención', descripcion: 'MEJORAMIENTO DE LA TRANSITABILIDAD DE LAS CALLES Y VÍAS DE ACCESO DE LA LOCALIDAD DE PELEJO, DISTRITO DE EL PORVENIR, PROVINCIA SAN MARTÍN, REGIÓN SAN MARTIN        ', inicio: '31/07/2026', fin: '30/09/2026', volAcum: 1035.0, kmAcum: 1.84, poblacion: 550 },
    { provincia: 'Picota', distrito: 'San Hilarion', tipo: 'Prevención', descripcion: ' LIMPIEZA Y REFORZAMIENTO DE DEFENSA RIBEREÑA MARGEN IZQUIERDA DEL RIO SISA TRAMO I, DISTRITO DE SAN HILARIÓN, PROVINCIA DE PICOTA, REGIÓN SAN MARTÍN                ', inicio: '08/09/2026', fin: '30/09/2026', volAcum: 1810.0, kmAcum: 0.18, poblacion: 500 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', tipo: 'Urgente atención', descripcion: 'ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN      ', inicio: '15/09/2026', fin: '14/10/2026', volAcum: 375.0, kmAcum: 0.0, poblacion: 1125 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Bellavista', distrito: 'San Pablo', cantidad: 1, metaVol: 2800.0, metaKm: 1.9, poblacion: 650 },
    { provincia: 'Picota', distrito: 'San Hilarion', cantidad: 2, metaVol: 5050.0, metaKm: 0.5, poblacion: 800 },
    { provincia: 'Rioja', distrito: 'Nueva Cajamarca', cantidad: 2, metaVol: 12100.0, metaKm: 0.55, poblacion: 2050 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', cantidad: 3, metaVol: 3510.0, metaKm: 0.0, poblacion: 3375 },
    { provincia: 'Rioja', distrito: 'Yuracyacu', cantidad: 1, metaVol: 8700.0, metaKm: 0.7, poblacion: 750 },
  ],
  programadasTotal: { cantidad: 9, metaVol: 32160.0, metaKm: 3.65, poblacion: 7625 },

  programadasDetalle: [
    { provincia: 'Bellavista', distrito: 'San Pablo', sector: 'Fausa Lamista', ficha: '039-2026-MTV-U-SAM', descripcion: ' MEJORAMIENTO DE LA TRANSITABILIDAD DE LAS CALLES Y VÍAS DE ACCESO DE LA LOCALIDAD DE FAUSA LAMISTA, DISTRITO DE SAN PABLO, PROVINCIA BELLAVISTA, REGIÓN SAN MARTIN', fechaInicio: '30/09/2026', fechaFin: '14/10/2026', metaVol: 2800.0, metaKm: 1.9, poblacion: 650 },
    { provincia: 'Picota', distrito: 'San Hilarion', sector: 'San Hilarión', ficha: '041-2026-LD-PI-SAM', descripcion: ' LIMPIEZA Y REFORZAMIENTO DE DEFENSA RIBEREÑA MARGEN IZQUIERDA DEL RIO SISA TRAMO II, DISTRITO DE SAN HILARIÓN, PROVINCIA DE PICOTA, REGIÓN SAN MARTÍN   ', fechaInicio: '05/10/2026', fechaFin: '14/10/2026', metaVol: 2250.0, metaKm: 0.25, poblacion: 400 },
    { provincia: 'Rioja', distrito: 'Nueva Cajamarca', sector: 'Nueva Cajamarca', ficha: '020-2026-LD-PI-SAM', descripcion: 'LIMPIEZA, DESCOLMATACIÓN DE MATERIAL ALUVIONICO, DESDE LA PROG. 0+000 KM A LA PROGRESIVA 0+200 KM RIO YURACYACU TRAMO I, DISTRITO DE NUEVA CAJAMARCA, PROVINCIA DE RIOJA, REGION SAN MARTÍN               ', fechaInicio: '14/10/2026', fechaFin: '28/10/2026', metaVol: 5800.0, metaKm: 0.2, poblacion: 850 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', sector: 'Centro, Los Angeles Y Miraflores', ficha: '008-2026-AA-U-SAM', descripcion: 'ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN    ', fechaInicio: '19/10/2026', fechaFin: '17/11/2026', metaVol: 1170.0, metaKm: 0.0, poblacion: 1125 },
    { provincia: 'Picota', distrito: 'San Hilarion', sector: 'San Hilarión', ficha: '042-2026-LD-PI-SAM', descripcion: ' LIMPIEZA Y REFORZAMIENTO DE DEFENSA RIBEREÑA MARGEN IZQUIERDA DEL RIO SISA TRAMO III, DISTRITO DE SAN HILARIÓN, PROVINCIA DE PICOTA, REGIÓN SAN MARTÍN', fechaInicio: '09/11/2026', fechaFin: '20/11/2026', metaVol: 2800.0, metaKm: 0.25, poblacion: 400 },
    { provincia: 'Rioja', distrito: 'Nueva Cajamarca', sector: 'Nueva Cajamarca', ficha: '027-2026-LD-PI-SAM', descripcion: 'LIMPIEZA, DESCOLMATACIÓN Y ELIMINACIÓN DE MATERIAL ALUVIÓNICO DESDE LA PROG. 0+000 KM A LA PROGRESIVA 0+350 KM RÍO YURACYACU TRAMO II, DISTRITO DE NUEVA CAJAMARCA, PROVINCIA DE RIOJA,  REGIÓN SAN MARTÍN        ', fechaInicio: '16/11/2026', fechaFin: '29/11/2026', metaVol: 6300.0, metaKm: 0.35, poblacion: 1200 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', sector: 'Centro, Los Angeles Y Miraflores', ficha: '009-2026-AA-U-SAM', descripcion: 'ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN', fechaInicio: '16/11/2026', fechaFin: '15/12/2026', metaVol: 1170.0, metaKm: 0.0, poblacion: 1125 },
    { provincia: 'Rioja', distrito: 'Yuracyacu', sector: 'Yuracyacu', ficha: '026-2026-LD-PI-SAM', descripcion: 'LIMPIEZA, DESCOLMATACIÓN Y ENCAUZAMIENTO CON MATERIAL PROPIO DEL RIO YURACYACU TRAMO I, DE LA PROG. 0+000 KM A LA 0+540 KM, Y TRAMO II, DE LA PROG. 0+900 KM A LA 1+150 KM, EN LA LOCALIDAD DE YURACYACU, DISTRITO DE YURACYACU, PROVINCIA RIOJA, REGIÓN          ', fechaInicio: '08/12/2026', fechaFin: '20/12/2026', metaVol: 8700.0, metaKm: 0.7, poblacion: 750 },
    { provincia: 'Rioja', distrito: 'Pardo Miguel', sector: 'Centro, Los Angeles Y Miraflores', ficha: '040-2026-AA-U-SAM', descripcion: ' ABASTECIMIENTO DE AGUA POTABLE PARA EL CONSUMO HUMANO EN EL SECTOR CENTRO, LOS ANGELES Y MIRAFLORES, DEL DISTRITO DE PARDO MIGUEL, PROVINCIA DE RIOJA, REGIÓN SAN MARTÍN', fechaInicio: '14/12/2026', fechaFin: '12/01/2027', metaVol: 1170.0, metaKm: 0.0, poblacion: 1125 },
  ],

  conveniosCount: 1,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 18/02/2027' },
  ],

  flota: [
    { tipo: 'Camión cisterna de agua', cantidad: 1, marca: 'Mercedes Benz', codigos: ['EGN-010'], estado: 'operativo' },
    { tipo: 'Camioneta', cantidad: 1, marca: 'Mitsubishi', codigos: ['EGM-011'], estado: 'operativo' },
    { tipo: 'Cargador frontal', cantidad: 1, marca: 'Kawasaki', codigos: ['70J12945'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'John Deere', codigos: ['D810312'], estado: 'operativo' },
    { tipo: 'Excavadora hidráulica', cantidad: 1, marca: 'Komatsu', codigos: ['85469'], estado: 'inoperativo' },
    { tipo: 'Plataforma', cantidad: 2, marca: 'ACS', codigos: ['EGR-075', 'EGR-074'], estado: 'operativo' },
    { tipo: 'Retroexcavadora', cantidad: 1, marca: 'John Deere', codigos: ['286603'], estado: 'operativo' },
    { tipo: 'Rodillo compactador', cantidad: 1, marca: 'Hamm', codigos: ['H1762467'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 1, marca: 'Hino', codigos: ['EGR-389'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 2, marca: 'Mercedes Benz', codigos: ['EGV-854', 'EGV-867'], estado: 'operativo' },
    { tipo: 'Volquete', cantidad: 3, marca: 'Scania', codigos: ['EGN-589', 'EGN-496', 'EGN-511'], estado: 'operativo' },
  ],
  flotaTotal: 15,
}
