import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX, HiOutlineCamera, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Reveal, SectionHeading, Badge } from './UI'
import { galeriaGlobal } from '../data/global'
import { REGION_LIST } from '../data/regions'

// Patrón amplio (no solo "-1".."-9") para que las fotos agregadas desde el panel del
// propietario (?admin=1), con cualquier numeración o extensión, se resuelvan igual.
const images = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
function resolveImg(key) {
  const match = Object.entries(images).find(([path]) => path.split('/').pop().replace(/\.[a-zA-Z0-9]+$/, '') === key)
  return match ? match[1] : undefined
}

const CARD_WIDTH = 288
const GAP = 18

export default function GaleriaGlobal() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(null)

  function scrollByCards(dir) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (CARD_WIDTH + GAP), behavior: 'smooth' })
  }

  return (
    <section id="galeria" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={`Evidencia fotográfica · ${REGION_LIST.length} regiones`}
            title="Galería nacional de intervenciones"
            description={`Registro fotográfico de las ${REGION_LIST.length} regiones en un solo carrusel, con su código de ficha técnica correspondiente.`}
          />
          <div className="flex shrink-0 gap-2 pb-1">
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-colors hover:bg-white/[0.08]"
            >
              <HiOutlineChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-colors hover:bg-white/[0.08]"
            >
              <HiOutlineChevronRight size={18} />
            </button>
          </div>
        </div>

        <Reveal delay={0.08}>
          <div ref={trackRef} className="scroll-thin mt-9 flex snap-x snap-mandatory gap-[18px] overflow-x-auto pb-3">
            {galeriaGlobal.map((g) => (
              <button
                key={g.key}
                onClick={() => setActive(g)}
                className="group relative block w-[288px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={resolveImg(g.img)}
                    alt={`Intervención ${g.codigo}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge tone={g.estado === 'Ejecutada' ? 'good' : 'amber'}>{g.estado}</Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{g.regionLabel}</div>
                    <div className="mt-0.5 flex items-center gap-1.5 font-tabular text-xs font-medium text-white/90">
                      <HiOutlineCamera />
                      {g.codigo}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={resolveImg(active.img)} alt={active.codigo} className="max-h-[85vh] w-full object-contain bg-surface-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-5">
                <div>
                  <div className="font-tabular text-sm font-semibold text-white">{active.codigo}</div>
                  <div className="text-xs text-white/70">
                    {active.regionLabel} · {active.estado}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                aria-label="Cerrar"
              >
                <HiOutlineX />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
