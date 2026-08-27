// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 6, m3: 43762.0, km: 6.69, poblacion: 9430 },
    { tipo: 'Prevención', cantidad: 21, m3: 118026.35, km: 47.62, poblacion: 42210 },
    { tipo: 'Urgente atención', cantidad: 4, m3: 2788.0, km: null, poblacion: 9381 },
  ],
  ejecutadasTotal: { cantidad: 31, m3: 164576.35, km: 54.31, poblacion: 61021 },

  enEjecucion: [
    { provincia: 'Chiclayo', distrito: 'Lagunas', tipo: 'Urgente atención', descripcion: '  ABASTECIMIENTO DE AGUA POTABLE A DIFERENTES SECTORES DEL DISTRITO DE LAGUNAS, PROVINCIA DE CHICLAYO, REGIÓN LAMBAYEQUE            ', inicio: '15/07/2026', fin: '12/09/2026', volAcum: 1050.0, poblacion: null },
    { provincia: 'Lambayeque', distrito: 'Olmos', tipo: 'Urgente atención', descripcion: ' ABASTECIMIENTO Y DISTRIBUCION DE AGUA POTABLE A DIFERENTES CASERIOS DEL DISTRITO DE OLMOS, PROVINCIA DE LAMBAYEQUE, REGION LAMBAYEQUE ', inicio: '12/08/2026', fin: '10/10/2026', volAcum: 66.0, poblacion: 3350 },
    { provincia: 'Chiclayo', distrito: 'Lagunas', tipo: 'Prevención', descripcion: '  “LIMPIEZA Y DESCOLMATACIÓN DE 3.0 KM DEL DREN GUADALUPE EN EL SECTOR "VIRGEN DEL CARMEN" DE LA LOCALIDAD DE MOCUPE DEL DISTRITO DE LAGUNAS MOCUPE, PROVINCIA DE CHICLAYO, REGIÓN LAMBAYEQUE”-00            ', inicio: '13/08/2026', fin: '26/08/2026', volAcum: 9600.0, poblacion: 950 },
    { provincia: 'Chiclayo', distrito: 'Pimentel', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DEL CANAL “PRENDIMIENTO” EN LOS SECTORES DE LAS URB. INGENIERO I Y II Y LA PRADERA, DISTRITO DE PIMENTEL, PROVINCIA DE CHICLAYO, REGIÓN LAMBAYEQUE-00                  ', inicio: '18/08/2026', fin: '29/08/2026', volAcum: 1090.0, poblacion: 10200 },
    { provincia: 'Lambayeque', distrito: 'Chochope', tipo: 'Prevención', descripcion: 'LIMPIEZA Y DESCOLMATACIÓN DE 4.90 KM DE LA QUEBRADA “MERCEDES” ENTRE LOS SECTORES “CHOCHOPE” Y “PARRANAL” DEL DISTRITO DE CHOCHOPE, PROVINCIA DE LAMBAYEQUE, REGIÓN LAMBAYEQUE.       ', inicio: '24/08/2026', fin: '06/09/2026', volAcum: 2770.0, poblacion: 1200 },
  ],

  programadasCols: ['provincia', 'distrito'],
  programadas: [
    { provincia: 'Chiclayo', distrito: 'Chiclayo', cantidad: 1, metaVol: 8200.0, metaKm: 1.6, poblacion: 13250 },
    { provincia: 'Chiclayo', distrito: 'Chongoyape', cantidad: 1, metaVol: 13725.0, metaKm: 1.83, poblacion: 1422 },
    { provincia: 'Chiclayo', distrito: 'La Victoria', cantidad: 1, metaVol: 2620.75, metaKm: 3.22, poblacion: 7500 },
    { provincia: 'Chiclayo', distrito: 'Patapo', cantidad: 2, metaVol: 11639.66, metaKm: 1.65, poblacion: 12986 },
    { provincia: 'Chiclayo', distrito: 'Tuman', cantidad: 1, metaVol: 8400.0, metaKm: 3.15, poblacion: 2600 },
    { provincia: 'Ferreñafe', distrito: 'Pueblo Nuevo', cantidad: 1, metaVol: 5800.0, metaKm: 1.3, poblacion: 1535 },
    { provincia: 'Lambayeque', distrito: 'Jayanca', cantidad: 1, metaVol: 21000.0, metaKm: 3.0, poblacion: 1200 },
    { provincia: 'Lambayeque', distrito: 'Motupe', cantidad: 2, metaVol: 32700.0, metaKm: 0.75, poblacion: 1123 },
    { provincia: 'Lambayeque', distrito: 'Olmos', cantidad: 3, metaVol: 57300.0, metaKm: 1.73, poblacion: 2950 },
  ],
  programadasTotal: { cantidad: 13, metaVol: 161385.41, metaKm: 18.23, poblacion: 44566 },

  conveniosCount: 2,
  conveniosVigentes: [
    { entidad: 'Gobierno Regional', detail: 'hasta 07/12/2026' },
    { entidad: 'Municipalidad Distrital Olmos', detail: 'hasta 28/12/2026' },
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
