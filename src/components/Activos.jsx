import { HiOutlineTruck, HiOutlineUserCircle } from 'react-icons/hi'
import { Reveal, SectionHeading, Card, Badge, TableShell, StatTile } from './UI'

export default function Activos({ data }) {
  const { flota, flotaTotal, capacidad, personalUBO, shortLabel } = data
  const equipoTotal = personalUBO.reduce((s, p) => s + p.cantidad, 0)

  return (
    <section id="activos" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={`Unidad Básica Operativa · ${shortLabel}`}
          title="Activos asignados y personal"
          description={
            personalUBO.length > 0
              ? `${flotaTotal} unidades de maquinaria y flota vehicular, y un equipo de ${equipoTotal} profesionales, sostienen la operación de la UBO en la región.`
              : `${flotaTotal} unidades de maquinaria y flota vehicular sostienen la operación de la UBO en la región.`
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {capacidad.map((c, i) => (
            <StatTile key={c.label} value={c.valor} label={c.label} accent={i === 0 ? 'brand' : i === 1 ? 'amber' : i === 2 ? 'series1' : 'series3'} delay={i * 0.05} icon={<HiOutlineTruck />} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-3">
            <TableShell>
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-ink-mute">
                  <th className="px-3 py-2.5 sm:px-5 sm:py-3.5 font-medium">Tipo de unidad</th>
                  <th className="px-3 py-2.5 sm:px-5 sm:py-3.5 font-medium">Marca</th>
                  <th className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-right font-medium">Cant.</th>
                  <th className="px-3 py-2.5 sm:px-5 sm:py-3.5 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {flota.map((f, i) => (
                  <tr key={`${f.tipo}-${f.marca}-${i}`} className="border-b border-white/[0.04] text-xs last:border-0 hover:bg-white/[0.02] sm:text-sm">
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 font-medium text-ink">
                      {f.tipo}
                      <div className="mt-0.5 font-tabular text-[11px] text-ink-mute">{f.codigos.join(' · ')}</div>
                    </td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-ink-dim">{f.marca}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-right font-tabular text-ink-dim">{f.cantidad}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5">
                      <Badge tone={f.estado === 'operativo' ? 'good' : 'critical'}>{f.estado === 'operativo' ? 'Operativo' : 'Inoperativo'}</Badge>
                      {f.nota && <div className="mt-1 font-tabular text-[10px] text-ink-mute">{f.nota}</div>}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.03] text-xs font-semibold text-ink sm:text-sm">
                  <td className="px-3 py-2.5 sm:px-5 sm:py-3.5" colSpan={2}>
                    Total inventario
                  </td>
                  <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-right font-tabular">{flotaTotal}</td>
                  <td className="px-3 py-2.5 sm:px-5 sm:py-3.5" />
                </tr>
              </tbody>
            </TableShell>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <Card className="flex h-full flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <HiOutlineUserCircle className="text-brand-soft" />
                <h3 className="font-display text-lg font-semibold text-ink">Personal UBO</h3>
              </div>
              {personalUBO.length > 0 ? (
                <>
                  <ul className="flex flex-col divide-y divide-white/[0.06]">
                    {personalUBO.map((p) => (
                      <li key={p.rol} className="flex items-center justify-between py-3">
                        <span className="text-sm text-ink-dim">{p.rol}</span>
                        <span className="font-tabular text-sm font-semibold text-ink">{p.cantidad}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Total equipo</span>
                    <span className="font-tabular text-base font-bold text-ink">{equipoTotal}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-ink-mute">Información pendiente de la UBO.</p>
              )}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
