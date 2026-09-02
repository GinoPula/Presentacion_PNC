import { HiOutlineTruck } from 'react-icons/hi'
import { Reveal, SectionHeading, Badge, TableShell, StatTile } from './UI'

export default function Activos({ data }) {
  const { flota, flotaTotal, capacidad, shortLabel } = data

  return (
    <section id="activos" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={`Unidad Básica Operativa · ${shortLabel}`}
          title="Activos asignados"
          description={`${flotaTotal} unidades de maquinaria y flota vehicular sostienen la operación de la UBO en la región.`}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {capacidad.map((c, i) => (
            <StatTile key={c.label} value={c.valor} label={c.label} accent={i === 0 ? 'brand' : i === 1 ? 'amber' : i === 2 ? 'series1' : 'series3'} delay={i * 0.05} icon={<HiOutlineTruck />} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
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
      </div>
    </section>
  )
}
