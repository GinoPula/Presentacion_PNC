import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX, HiOutlineDocumentDownload, HiOutlineClipboardList, HiOutlineBookOpen, HiOutlineFilter } from 'react-icons/hi'
import RegionSwitcher from './RegionSwitcher'
import ReporteDiarioModal from './ReporteDiarioModal'
import AyudaMemoriaFiltroModal from './AyudaMemoriaFiltroModal'
import { descargarAyudaMemoria, descargarAyudaMemoriaMinistro, obtenerAmbitoDisponible } from '../lib/ayudaMemoria'
import { GLOBAL_ID } from '../data/regions'

export default function Nav({ data, regionId, onRegionChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [generando, setGenerando] = useState(false)
  const [generandoMinistro, setGenerandoMinistro] = useState(false)
  const [reporteAbierto, setReporteAbierto] = useState(false)
  const [filtroAbierto, setFiltroAbierto] = useState(false)
  const isGlobal = regionId === GLOBAL_ID
  // El reporte diario se filtra al departamento seleccionado en ese momento (si no es Vista
  // General); en Vista General muestra el consolidado nacional, igual al Excel que se le envía
  // al Ministro.
  const reporteRegionId = isGlobal ? null : regionId
  const reporteRegionLabel = isGlobal ? null : data.shortLabel || data.meta?.region
  // Ayuda Memoria por ámbito (agregado 31/08/2026): solo tiene sentido si hay provincias/distritos
  // con datos filtrables (programadasDetalle/puntosCriticos) en la región activa.
  const ambitoDisponible = !isGlobal && data.ayudaMemoriaDisponible ? obtenerAmbitoDisponible(data, regionId) : []

  async function handleAyudaMemoria() {
    if (generando || isGlobal) return
    setGenerando(true)
    try {
      await descargarAyudaMemoria(data, regionId)
    } catch (err) {
      console.error('No se pudo generar la Ayuda Memoria:', err)
      window.alert('No se pudo generar la Ayuda Memoria. Revisa la consola para más detalle.')
    } finally {
      setGenerando(false)
    }
  }

  // 02/09/2026 -- a pedido de Franco: versión más corta de la Ayuda Memoria pensada para el
  // Ministro (sin el Anexo de detalle ficha por ficha, con una portada de Resumen Ejecutivo en
  // vez de Antecedentes/Principales Actividades) -- ver comentario grande junto a
  // construirAyudaMemoriaMinistro() en src/lib/ayudaMemoria.js.
  async function handleAyudaMemoriaMinistro() {
    if (generandoMinistro || isGlobal) return
    setGenerandoMinistro(true)
    try {
      await descargarAyudaMemoriaMinistro(data, regionId)
    } catch (err) {
      console.error('No se pudo generar la Ayuda Memoria (versión Ministro):', err)
      window.alert('No se pudo generar la Ayuda Memoria (versión Ministro). Revisa la consola para más detalle.')
    } finally {
      setGenerandoMinistro(false)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = isGlobal
    ? [
        { href: '#estado-general', label: 'Estado general' },
        { href: '#clasificacion', label: 'Clasificación' },
        { href: '#tipos-intervencion', label: 'Tipos' },
        { href: '#mapa', label: 'Mapa' },
        data.escenarios && { href: '#presupuesto', label: 'Presupuesto' },
        { href: '#maquinaria', label: 'Maquinarias' },
        { href: '#galeria', label: 'Galería' },
      ].filter(Boolean)
    : [
        { href: '#panorama', label: 'Panorama' },
        { href: '#intervenciones', label: 'Intervenciones' },
        { href: '#programadas', label: 'Programadas' },
        { href: '#mapa', label: 'Mapa' },
        data.puntosCriticos && { href: '#puntos-criticos', label: 'Puntos críticos' },
        data.escenarios && { href: '#escenarios', label: 'Presupuesto' },
        { href: '#activos', label: 'Activos' },
        { href: '#galeria', label: 'Galería' },
      ].filter(Boolean)

  function handleRegionChange(id) {
    setOpen(false)
    onRegionChange(id)
  }

  return (
    // OJO (03/09/2026, bug reportado por Franco): ReporteDiarioModal y AyudaMemoriaFiltroModal
    // van FUERA del <header>, no adentro. El <header> usa backdrop-blur-md cuando hay scroll, y
    // backdrop-filter (igual que filter/transform) convierte a ese elemento en el "contenedor" de
    // cualquier descendiente position:fixed -- así, el modal (que también es fixed inset-0) dejaba
    // de cubrir toda la pantalla y quedaba encajado dentro de la altura de la barra de navegación,
    // viéndose como una franja angosta arriba con la página de fondo visible debajo.
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/[0.06] bg-surface-0/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-6 py-4">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">PNC</span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-ink">{data.meta.region}</span>
            <span className="text-[11px] text-ink-mute">Maquinarias · {data.meta.periodo}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            onClick={() => setReporteAbierto(true)}
            title="Reporte Diario"
            aria-label="Ver Reporte Diario"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/10 px-3 py-2 text-[13px] font-medium text-brand-soft transition-colors hover:bg-brand/15 2xl:px-3.5"
          >
            <HiOutlineClipboardList size={16} />
            <span className="hidden 2xl:inline">Reporte Diario</span>
          </button>
          {data.ayudaMemoriaDisponible && (
            <button
              onClick={handleAyudaMemoria}
              disabled={generando}
              title={generando ? 'Generando…' : 'Ayuda Memoria'}
              aria-label={generando ? 'Generando Ayuda Memoria' : 'Generar Ayuda Memoria'}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink disabled:opacity-50 2xl:px-3.5"
            >
              <HiOutlineDocumentDownload size={16} />
              <span className="hidden 2xl:inline">{generando ? 'Generando…' : 'Ayuda Memoria'}</span>
            </button>
          )}
          {data.ayudaMemoriaDisponible && (
            <button
              onClick={handleAyudaMemoriaMinistro}
              disabled={generandoMinistro}
              title={generandoMinistro ? 'Generando…' : 'Ayuda Memoria (versión Ministro, resumida)'}
              aria-label={generandoMinistro ? 'Generando Ayuda Memoria versión Ministro' : 'Generar Ayuda Memoria versión Ministro'}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink disabled:opacity-50 2xl:px-3.5"
            >
              <HiOutlineDocumentDownload size={16} />
              <span className="hidden 2xl:inline">{generandoMinistro ? 'Generando…' : 'Ayuda Memoria (Ministro)'}</span>
            </button>
          )}
          {ambitoDisponible.length > 0 && (
            <button
              onClick={() => setFiltroAbierto(true)}
              title="Ayuda Memoria por ámbito (provincia / distrito)"
              aria-label="Generar Ayuda Memoria por ámbito"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink 2xl:px-3.5"
            >
              <HiOutlineFilter size={16} />
              <span className="hidden 2xl:inline">Ayuda Memoria por ámbito</span>
            </button>
          )}
          <a
            href={`${import.meta.env.BASE_URL}guia-uso-pnc-maquinarias.html`}
            download="Guia-de-uso-PNC-Maquinarias.html"
            title="Guía de uso"
            aria-label="Descargar guía de uso de la plataforma"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink 2xl:px-3.5"
          >
            <HiOutlineBookOpen size={16} />
            <span className="hidden 2xl:inline">Guía de uso</span>
          </a>
          <RegionSwitcher regionId={regionId} onChange={handleRegionChange} />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-ink lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-surface-0/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-4">
              <RegionSwitcher regionId={regionId} onChange={handleRegionChange} variant="mobile" />
              <button
                onClick={() => {
                  setOpen(false)
                  setReporteAbierto(true)
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-brand/30 bg-brand/10 px-3 py-2.5 text-sm font-medium text-brand-soft"
              >
                <HiOutlineClipboardList size={16} />
                Reporte Diario
              </button>
              {data.ayudaMemoriaDisponible && (
                <button
                  onClick={handleAyudaMemoria}
                  disabled={generando}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-ink-dim disabled:opacity-50"
                >
                  <HiOutlineDocumentDownload size={16} />
                  {generando ? 'Generando…' : 'Descargar Ayuda Memoria'}
                </button>
              )}
              {data.ayudaMemoriaDisponible && (
                <button
                  onClick={handleAyudaMemoriaMinistro}
                  disabled={generandoMinistro}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-ink-dim disabled:opacity-50"
                >
                  <HiOutlineDocumentDownload size={16} />
                  {generandoMinistro ? 'Generando…' : 'Ayuda Memoria (Ministro)'}
                </button>
              )}
              {ambitoDisponible.length > 0 && (
                <button
                  onClick={() => {
                    setOpen(false)
                    setFiltroAbierto(true)
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-ink-dim"
                >
                  <HiOutlineFilter size={16} />
                  Ayuda Memoria por ámbito
                </button>
              )}
              <a
                href={`${import.meta.env.BASE_URL}guia-uso-pnc-maquinarias.html`}
                download="Guia-de-uso-PNC-Maquinarias.html"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-ink-dim"
              >
                <HiOutlineBookOpen size={16} />
                Guía de uso
              </a>
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-dim hover:bg-white/[0.06] hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      </header>

      <ReporteDiarioModal
        open={reporteAbierto}
        onClose={() => setReporteAbierto(false)}
        regionId={reporteRegionId}
        regionLabel={reporteRegionLabel}
      />

      <AyudaMemoriaFiltroModal
        open={filtroAbierto}
        onClose={() => setFiltroAbierto(false)}
        data={data}
        regionId={regionId}
        regionLabel={data.shortLabel || data.meta?.region}
      />
    </>
  )
}
