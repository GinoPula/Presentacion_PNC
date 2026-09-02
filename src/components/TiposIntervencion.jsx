import { HiOutlineDocumentText } from 'react-icons/hi'
import { Reveal, SectionHeading, Card, Badge } from './UI'
import { tiposIntervencion, marcoLegalTipos } from '../data/shared'

import foto1 from '../assets/photos/tipo-1.jpg'
import foto2 from '../assets/photos/tipo-2.jpg'
import foto3 from '../assets/photos/tipo-3.jpg'
import foto4 from '../assets/photos/tipo-4.jpg'
import foto5 from '../assets/photos/tipo-5.jpg'
import foto6 from '../assets/photos/tipo-6.jpg'

const fotos = { 1: foto1, 2: foto2, 3: foto3, 4: foto4, 5: foto5, 6: foto6 }

export default function TiposIntervencion() {
  return (
    <section id="tipos-intervencion" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Marco operativo"
          title="Tipos de intervenciones"
          description="Seis modalidades de intervención con maquinaria pesada del PNC, activadas según el nivel de urgencia y respaldadas por su base legal correspondiente. Va a ser igual para todas las UBOs."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiposIntervencion.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <Card className="group h-full overflow-hidden p-0 transition-colors hover:bg-surface-3/60">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={fotos[t.id]}
                    alt={t.titulo}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white shadow-lg shadow-black/30">
                    {t.id}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-base font-semibold leading-snug text-ink">{t.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{t.desc}</p>
                  <div className="mt-4">
                    <Badge tone="brand">{t.base}</Badge>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Card className="mt-6 flex items-start gap-3 p-6 sm:p-7">
            <HiOutlineDocumentText className="mt-0.5 shrink-0 text-ink-mute" />
            <p className="text-sm leading-relaxed text-ink-dim">
              <span className="font-semibold text-ink-mute">Marco legal: </span>
              {marcoLegalTipos}
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
