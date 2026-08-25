import { HiOutlineClock } from 'react-icons/hi'
import { Reveal, SectionHeading, Card, Badge, TableShell } from './UI'
import { fmtInt, fmtDecimal } from '../lib/format'

export default function Intervenciones({ data }) {
  const { ejecutadasPorTipo, ejecutadasTotal, enEjecucion, meta } = data
  return (
    <section id="intervenciones" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Intervenciones 2026"
          title="Detalle de lo ejecutado e intervenciones en curso"
          description={`Desglose por tipo de actividad de las ${fmtInt(ejecutadasTotal.cantidad)} intervenciones ejecutadas en el año, más las que continúan en ejecución en ${meta.region}.`}
        />

        <Reveal delay={0.05} className="mt-10">
          <TableShell>
            <thead>
              <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-ink-mute">
                <th className="px-5 py-3.5 font-medium">Tipo de actividad</th>
                <th className="px-5 py-3.5 text-right font-medium">Cant. int.</th>
                <th className="px-5 py-3.5 text-right font-medium">m³ removidos</th>
                <th className="px-5 py-3.5 text-right font-medium">Km atendidos</th>
                <th className="px-5 py-3.5 text-right font-medium">Pob. beneficiada</th>
              </tr>
            </thead>
            <tbody>
              {ejecutadasPorTipo.map((r) => (
                <tr key={r.tipo} className="border-b border-white/[0.04] text-sm last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 font-medium text-ink">{r.tipo}</td>
                  <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtInt(r.cantidad)}</td>
                  <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtDecimal(r.m3)}</td>
                  <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{r.km === null ? '—' : fmtDecimal(r.km)}</td>
                  <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtInt(r.poblacion)}</td>
                </tr>
              ))}
              <tr className="bg-white/[0.03] text-sm font-semibold text-ink">
                <td className="px-5 py-3.5">Total general</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtInt(ejecutadasTotal.cantidad)}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtDecimal(ejecutadasTotal.m3)}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtDecimal(ejecutadasTotal.km)}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtInt(ejecutadasTotal.poblacion)}</td>
              </tr>
            </tbody>
          </TableShell>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="mb-5 flex items-center gap-2">
            <HiOutlineClock className="text-amber" />
            <h3 className="font-display text-lg font-semibold text-ink">En ejecución ahora</h3>
            <Badge tone="amber">{enEjecucion.length} activas</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {enEjecucion.map((e, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                      {e.provincia} · {e.distrito}
                    </div>
                    <h4 className="mt-1 font-display text-base font-semibold leading-snug text-ink">{e.descripcion}</h4>
                  </div>
                  <Badge tone="amber">{e.tipo}</Badge>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-ink-mute">Vigencia</div>
                    <div className="mt-1 font-tabular text-xs text-ink-dim">
                      {e.inicio} — {e.fin}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-ink-mute">Vol. acumulado</div>
                    <div className="mt-1 font-tabular text-sm font-semibold text-ink">{fmtInt(e.volAcum)} m³</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-ink-mute">Pob. beneficiada</div>
                    <div className="mt-1 font-tabular text-sm font-semibold text-ink">{fmtInt(e.poblacion)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
