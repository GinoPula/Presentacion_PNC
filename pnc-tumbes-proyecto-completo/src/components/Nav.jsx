import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import RegionSwitcher from './RegionSwitcher'

export default function Nav({ data, regionId, onRegionChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#panorama', label: 'Panorama' },
    { href: '#clasificacion', label: 'Clasificación' },
    { href: '#tipos-intervencion', label: 'Tipos' },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
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

        <div className="hidden items-center gap-2 lg:flex">
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
