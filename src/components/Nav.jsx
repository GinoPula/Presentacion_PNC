import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX, HiOutlineDocumentDownload } from 'react-icons/hi'
import RegionSwitcher from './RegionSwitcher'
import { descargarAyudaMemoria } from '../lib/ayudaMemoria'
import { GLOBAL_ID } from '../data/regions'

export default function Nav({ data, regionId, onRegionChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [generando, setGenerando] = useState(false)
  const isGlobal = regionId === GLOBAL_ID

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
        { href: '#activos', label: 'Activos y personal' },
        { href: '#galeria', label: 'Galería' },
      ].filter(Boolean)

  function handleRegionChange(id) {
    setOpen(false)
    onRegionChange(id)
  }

  return (
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
  )
}
