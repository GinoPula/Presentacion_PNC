import { HiOutlineClipboardCheck, HiOutlineLightningBolt, HiOutlineExclamation, HiOutlineDocumentText } from 'react-icons/hi'
import { Reveal, SectionHeading, Card } from './UI'
import { clasificacion, directivas } from '../data/shared'

const icons = [HiOutlineClipboardCheck, HiOutlineClipboardCheck, HiOutlineExclamation, HiOutlineLightningBolt]

export default function Clasificacion() {
  return (
    <section id="clasificacion" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Marco normativo"
          title="Clasificación de intervenciones"
          description="Cuatro rutas de activación definen cómo el PNC moviliza maquinaria y personal, según el nivel de urgencia y el respaldo institucional de cada intervención."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {clasificacion.map((c, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <Card className="group h-full p-6 transition-colors hover:bg-surface-3/60 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-lg text-brand-soft">
                      <Icon />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">Tipo {c.id.toString().padStart(2, '0')}</div>
                      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{c.titulo}</h3>
                      <div className="mt-0.5 text-xs font-medium text-brand-soft">{c.subtitulo}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-dim">{c.desc}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <Card className="mt-6 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <HiOutlineDocumentText className="text-ink-mute" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-mute">Base normativa</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {directivas.map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
