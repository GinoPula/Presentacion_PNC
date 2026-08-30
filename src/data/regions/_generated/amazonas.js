// GENERADO AUTOMATICAMENTE por generar_todas_regiones.py -- no editar a mano.
// Este archivo se sobreescribe completo en cada corrida del pipeline de datos.
//
// PLACEHOLDER (30/08/2026): Amazonas se acaba de registrar en el pipeline
// (DEPARTAMENTOS / DEPARTAMENTO_BBOX en generar_todas_regiones.py) pero
// todavía no se corrió contra Producción desde esta sesión -- estos valores
// están en cero a propósito (nunca inventados) hasta que Franco corra:
//   python pipeline/generar_todas_regiones.py --repo "D:\Presentacion_PNC" --regiones amazonas --git-push
export default {
  ejecutadasPorTipo: [
    { tipo: 'Emergencia', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
    { tipo: 'Prevención', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
    { tipo: 'Urgente atención', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
  ],
  ejecutadasTotal: { cantidad: 0, m3: 0, km: 0, poblacion: 0 },

  anioAnterior: '2025',
  ejecutadasPorTipoAnioAnterior: [
    { tipo: 'Emergencia', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
    { tipo: 'Prevención', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
    { tipo: 'Urgente atención', cantidad: 0, m3: 0, km: 0, poblacion: 0, provincias: [] },
  ],
  ejecutadasTotalAnioAnterior: { cantidad: 0, m3: 0, km: 0, poblacion: 0 },

  enEjecucion: [],

  programadasCols: ['provincia', 'distrito'],
  programadas: [],
  programadasTotal: { cantidad: 0, metaVol: 0, metaKm: 0, poblacion: 0 },

  programadasDetalle: [],

  conveniosCount: 0,
  conveniosVigentes: [],

  flota: [],
  flotaTotal: 0,
}
