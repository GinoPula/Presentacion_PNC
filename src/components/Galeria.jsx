import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX, HiOutlineCamera } from 'react-icons/hi'
import { Reveal, SectionHeading, Badge } from './UI'

const images = import.meta.glob('../assets/photos/*-[1-9].jpg', { eager: true, import: 'default' })
function resolveImg(key) {
  const match = Object.entries(images).find(([path]) => path.includes(`/${key}.jpg`))
  return match ? match[1] : undefined
}

export default function Galeria({ data }) {
  const { galeria } = data
  const [active, setActive] = useState(null)

  return (
    <section id="galeria" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Evidencia fotográfica"
          title="Intervenciones ejecutadas y en ejecución"
          description="Registro fotográfico georreferenciado de las intervenciones de maquinaria en campo, con su código de ficha técnica correspondiente."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galeria.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06}>
              <button
                onClick={() => setActive(g)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.06] text-left"
              >
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
                  <div className="flex items-center gap-1.5 font-tabular text-xs font-medium text-white/90">
                    <HiOutlineCamera />
                    {g.codigo}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
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
                  <div className="text-xs text-white/70">{active.estado}</div>
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
