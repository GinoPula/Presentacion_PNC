import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX, HiOutlineDownload, HiOutlineDocumentText, HiOutlineExclamationCircle } from 'react-icons/hi'
import { getReporteDiario } from '../lib/reporteDiario'
import { exportarReporteDiarioExcel, exportarReporteDiarioPdf } from '../lib/exportReporteDiario'

const TIPO_BADGE = {
  'PREVENCIÓN': 'border-series-1/30 bg-series-1/10 text-series-1',
  'URGENTE ATENCIÓN': 'border-amber/30 bg-amber/10 text-amber',
  EMERGENCIA: 'border-brand/30 bg-brand/10 text-brand-soft',
}

export default function ReporteDiarioModal({ open, onClose, regionId, regionLabel }) {
  const [descargando, setDescargando] = useState(false)
  const scopeLabel = regionId ? regionLabel : null
  const reporte = useMemo(() => getReporteDiario(regionId), [regionId])

  if (!open) return null

  const { meta, items, total, porTipo } = reporte

  const kpis = [
    { value: total, label: 'Intervenciones activas', color: 'text-brand-soft' },
    { value: porTipo['PREVENCIÓN'] || 0, label: 'Prevención y limpieza', color: 'text-series-1' },
    { value: porTipo['URGENTE ATENCIÓN'] || 0, label: 'Urgente atención', color: 'text-amber' },
    { value: porTipo['EMERGENCIA'] || 0, label: 'Declaradas emergencia', color: 'text-brand-soft' },
  ]

  async function handleExcel() {
    setDescargando(true)
    try {
      await exportarReporteDiarioExcel(reporte, scopeLabel)
    } catch (err) {
      console.error('No se pudo exportar el Excel:', err)
      window.alert('No se pudo generar el Excel. Revisa la consola para más detalle.')
    } finally {
      setDescargando(false)
    }
  }

  function handlePdf() {
    try {
      exportarReporteDiarioPdf(reporte, scopeLabel)
    } catch (err) {
      console.error('No se pudo exportar el PDF:', err)
      window.alert('No se pudo generar el PDF. Revisa la consola para más detalle.')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-surface-0 shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-white/[0.06] bg-surface-1 px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-soft">
                  Programa Nuestras Ciudades — PNC Maquinarias
                </span>
                <h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Reporte Ejecutivo de <span className="text-brand-soft">Intervenciones</span>
                </h2>
                <p className="mt-1.5 text-sm text-ink-dim">
                  {scopeLabel
                    ? `Consolidado Regional de Operaciones y Despliegue de Maquinaria en Campo · ${scopeLabel}`
                    : 'Consolidado Nacional de Operaciones y Despliegue de Maquinaria en Campo'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-ink-mute">
                  <div>
                    Corte: <span className="font-tabular font-medium text-ink-dim">{meta.fechaCorte}</span>
                  </div>
                  <div>
                    <span className="font-tabular font-medium text-ink-dim">{meta.horaCorte} hrs</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>
            </div>

            {/* KPI cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-white/[0.06] bg-surface-2/60 px-4 py-3.5">
                  <div className={`font-tabular font-display text-2xl font-bold tracking-tight sm:text-3xl ${k.color}`}>{k.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">{k.label}</div>
                </div>
              ))}
            </div>

            {/* Export buttons */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                onClick={handleExcel}
                disabled={descargando}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink disabled:opacity-50"
              >
                <HiOutlineDownload size={15} />
                {descargando ? 'Generando…' : 'Descargar Excel'}
              </button>
              <button
                onClick={handlePdf}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink"
              >
                <HiOutlineDocumentText size={15} />
                Descargar PDF
              </button>
            </div>
          </div>

          {/* Tabla */}
          <div className="scroll-thin max-h-[55vh] overflow-auto px-2 sm:px-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
                <HiOutlineExclamationCircle size={28} className="text-ink-mute" />
                <p className="text-sm text-ink-dim">
                  {scopeLabel
                    ? `No hay intervenciones en ejecución registradas en ${scopeLabel} al corte actual.`
                    : 'No hay intervenciones en ejecución registradas al corte actual.'}
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 bg-surface-1">
                  <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
                    <th className="px-3 py-3">N°</th>
                    <th className="px-3 py-3">Departamento</th>
                    <th className="px-3 py-3">Provincia / Distrito</th>
                    <th className="px-3 py-3">Tipo</th>
                    <th className="px-3 py-3">Descripción de la intervención</th>
                    <th className="px-3 py-3">Equipo / maquinaria desplegada</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.idIntervencion + it.n} className="border-b border-white/[0.05] align-top odd:bg-white/[0.015]">
                      <td className="px-3 py-3 font-tabular text-ink-mute">{it.n}</td>
                      <td className="px-3 py-3 font-medium text-ink">{it.deptoLabel}</td>
                      <td className="px-3 py-3 text-ink-dim">
                        {it.provincia} / {it.distrito}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${TIPO_BADGE[it.tipo] || 'border-white/10 bg-white/[0.06] text-ink-dim'}`}>
                          {it.tipo}
                        </span>
                      </td>
                      <td className="max-w-[360px] px-3 py-3 text-ink-dim">{it.descripcion}</td>
                      <td className="max-w-[280px] px-3 py-3 text-xs text-ink-mute">{it.maquinaria.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="border-t border-white/[0.06] bg-surface-1 px-6 py-3 text-center text-[11px] text-ink-mute sm:px-8">
            Sistema en tiempo real PNC Maquinarias — Ministerio de Vivienda, Construcción y Saneamiento
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
