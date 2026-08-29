import { motion } from 'framer-motion'
import { HiOutlineArrowDown } from 'react-icons/hi'
import heroBg from '../assets/photos/hero-bg.jpg'
import logoMvcs from '../assets/logos/logo-mvcs.png'
import RegionSwitcher from './RegionSwitcher'
import { GLOBAL_ID, REGION_LIST } from '../data/regions'
import { ejecutadasTotalGlobal, flotaTotalGlobal } from '../data/global'
import { fmtInt, joinNombres } from '../lib/format'

export default function HeroGlobal({ onRegionChange }) {
  const nombresRegiones = joinNombres(REGION_LIST.map((r) => r.shortLabel))
  const quickStats = [
    { value: fmtInt(ejecutadasTotalGlobal.cantidad), label: 'Intervenciones ejecutadas' },
    { value: fmtInt(ejecutadasTotalGlobal.poblacion), label: 'Población beneficiada' },
    { value: flotaTotalGlobal, label: 'Unidades operativas' },
  ]

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface-0">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-[0.22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-0/85 to-surface-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-0 via-surface-0/40 to-transparent" />
      </div>
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <motion.div
        aria-hidden
        className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <img src={logoMvcs} alt="Ministerio de Vivienda, Construcción y Saneamiento" className="h-8 w-auto opacity-90 sm:h-9" />
            <span className="h-6 w-px bg-white/15" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-mute">Gobierno del Perú</span>
          </div>
          <RegionSwitcher regionId={GLOBAL_ID} onChange={onRegionChange} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-soft" />
          Programa Nuestras Ciudades · Maquinarias
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl"
        >
          Vista <span className="text-brand-soft">General</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-dim sm:text-xl"
        >
          Panorama nacional de las {REGION_LIST.length} regiones donde opera PNC Maquinarias — {nombresRegiones} — corte a Agosto 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-8 sm:gap-6"
        >
          {quickStats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="font-tabular font-display text-xl font-bold tracking-tight text-ink sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-[11px] leading-snug text-ink-mute sm:text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#estado-general"
        aria-label="Ir al estado operativo general"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/15 text-ink-dim backdrop-blur-sm transition-colors hover:text-ink"
      >
        <HiOutlineArrowDown />
      </motion.a>
    </section>
  )
}
