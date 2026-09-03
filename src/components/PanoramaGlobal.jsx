import { HiOutlineTruck, HiOutlineGlobeAlt, HiOutlineUsers, HiOutlineCube } from 'react-icons/hi'
import { Reveal, SectionHeading, StatTile, Card } from './UI'
import { fmtInt, fmtDecimal } from '../lib/format'
import { ejecutadasTotalGlobal, conveniosCountGlobal, flotaTotalGlobal, regionEjecutadasRanking, totalUBO } from '../data/global'

const maxValor = Math.max(...regionEjecutadasRanking.map((r) => r.value)) || 1

export default function PanoramaGlobal() {
  return (
    <section id="estado-general" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Panorama nacional · 2026"
          title="Estado operativo general de las regiones"
          description={`Resultados acumulados del Programa Nuestras Ciudades a través de las ${totalUBO} Unidades Básicas Operativas (UBO), entre prevención, emergencia y atención urgente, durante 2026.`}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            icon={<HiOutlineCube />}
            value={fmtInt(ejecutadasTotalGlobal.cantidad)}
            label="Intervenciones ejecutadas"
            sub={`${fmtInt(conveniosCountGlobal)} convenios vigentes activos`}
            accent="brand"
            delay={0}
          />
          <StatTile
            icon={<HiOutlineGlobeAlt />}
            value={fmtInt(ejecutadasTotalGlobal.m3)}
            label="m³ de material removido"
            sub={`${fmtDecimal(ejecutadasTotalGlobal.km)} km de cauces / vías atendidos`}
            accent="series1"
            delay={0.05}
          />
          <StatTile
            icon={<HiOutlineUsers />}
            value={fmtInt(ejecutadasTotalGlobal.poblacion)}
            label="Población beneficiada"
            sub="Acumulado de intervenciones ejecutadas"
            accent="series3"
            delay={0.1}
          />
          <StatTile
            icon={<HiOutlineTruck />}
            value={flotaTotalGlobal}
            label="Unidades de maquinaria y flota"
            sub={`Suma de las ${totalUBO} UBOs regionales`}
            accent="amber"
            delay={0.15}
          />
        </div>

        <Reveal delay={0.2} className="mt-6">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Intervenciones ejecutadas por UBO</h3>
                <p className="mt-1 text-sm text-ink-mute">Cantidad de intervenciones · 2026 · mayor a menor</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {regionEjecutadasRanking.map((r) => (
                <div key={r.id} className="flex items-center gap-4">
                  <div className="w-24 shrink-0 text-sm text-ink-dim">{r.name}</div>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-series-1"
                      style={{ width: `${(r.value / maxValor) * 100}%` }}
                    />
                  </div>
                  <div className="w-9 shrink-0 text-right font-tabular text-sm text-ink">{r.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
