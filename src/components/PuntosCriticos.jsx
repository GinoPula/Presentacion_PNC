import { HiOutlineLocationMarker, HiOutlineIdentification } from 'react-icons/hi'
import { Reveal, SectionHeading, Card, Badge } from './UI'
import { fmtDecimal } from '../lib/format'

export default function PuntosCriticos({ data }) {
  const { puntosCriticos } = data
  return (
    <section id="puntos-criticos" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="ANA · Acuerdo Multisectorial"
          title="Puntos críticos asignados al MVCS"
          description="Sectores identificados por la Autoridad Nacional del Agua dentro del acuerdo multisectorial, cuya intervención de limpieza y descolmatación fue asignada al Ministerio de Vivienda, Construcción y Saneamiento."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {puntosCriticos.map((p, i) => (
            <Reveal key={p.fichaTecnica || `${p.distrito}-${i}`} delay={i * 0.08}>
              <Card className="h-full p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-ink">
                    <HiOutlineLocationMarker className="text-brand-soft" />
                    {p.distrito}, {p.provincia}
                  </div>
                  {p.sector && <Badge>{p.sector}</Badge>}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-dim">{p.descripcion}</p>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <HiOutlineIdentification className="shrink-0 text-ink-mute" />
                  <span className="truncate font-tabular text-xs text-ink-mute">{p.fichaTecnica}</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-[11px] uppercase tracking-wide text-ink-mute">Meta de intervención</span>
                  <span className="font-tabular text-sm font-semibold text-ink">{fmtDecimal(p.metaKm)} km</span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
