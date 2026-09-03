import { HiOutlineTruck } from 'react-icons/hi'
import { Reveal, SectionHeading, Card } from './UI'
import { flotaTotalGlobal, regionFlotaRanking, totalUBO } from '../data/global'

const maxValor = Math.max(...regionFlotaRanking.map((r) => r.value)) || 1

export default function MaquinariaGeneral() {
  return (
    <section id="maquinaria" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={`Unidades Básicas Operativas · ${totalUBO} departamentos`}
          title="Cantidad total de maquinarias"
          description={`Flota vehicular y de maquinaria pesada asignada a las ${totalUBO} UBOs regionales, sumada a nivel nacional.`}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <Card className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
              <HiOutlineTruck className="text-2xl text-amber" />
              <div className="font-tabular font-display text-5xl font-bold tracking-tight text-amber">{flotaTotalGlobal}</div>
              <div className="text-sm font-medium text-ink">unidades totales</div>
              <div className="text-xs text-ink-mute">Suma de las {totalUBO} UBOs</div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full p-6 sm:p-7">
              <div className="text-sm font-semibold text-ink">Flota por UBO</div>
              <div className="mt-5 flex flex-col gap-3">
                {regionFlotaRanking.map((r) => (
                  <div key={r.id} className="flex items-center gap-4">
                    <div className="w-24 shrink-0 text-sm text-ink-dim">{r.name}</div>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full rounded-full bg-amber" style={{ width: `${(r.value / maxValor) * 100}%` }} />
                    </div>
                    <div className="w-8 shrink-0 text-right font-tabular text-sm text-ink">{r.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
