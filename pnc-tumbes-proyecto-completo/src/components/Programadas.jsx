import { Reveal, SectionHeading, TableShell, StatTile } from './UI'
import { HiOutlineCalendar, HiOutlineMap, HiOutlineUserGroup } from 'react-icons/hi'
import { fmtInt, fmtDecimal } from '../lib/format'

export default function Programadas({ data }) {
  const { programadas, programadasTotal } = data
  let lastProvincia = null
  return (
    <section id="programadas" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Planificación"
          title={`${fmtInt(programadasTotal.cantidad)} intervenciones programadas para 2026`}
          description="Distribución por provincia y distrito de las intervenciones de prevención programadas, con sus metas de volumen, kilómetros y población objetivo."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatTile icon={<HiOutlineCalendar />} value={fmtInt(programadasTotal.cantidad)} label="Intervenciones programadas" accent="brand" />
          <StatTile icon={<HiOutlineMap />} value={`${fmtDecimal(programadasTotal.metaKm)} km`} label="Meta de kilómetros / cauces" sub={`${fmtInt(programadasTotal.metaVol)} m³ meta de volumen`} accent="series1" delay={0.05} />
          <StatTile icon={<HiOutlineUserGroup />} value={fmtInt(programadasTotal.poblacion)} label="Población objetivo" accent="series3" delay={0.1} />
        </div>

        <Reveal delay={0.1} className="mt-8">
          <TableShell>
            <thead>
              <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-ink-mute">
                <th className="px-5 py-3.5 font-medium">Provincia</th>
                <th className="px-5 py-3.5 font-medium">Distrito</th>
                <th className="px-5 py-3.5 text-right font-medium">Cant.</th>
                <th className="px-5 py-3.5 text-right font-medium">Meta vol. (m³)</th>
                <th className="px-5 py-3.5 text-right font-medium">Meta km</th>
                <th className="px-5 py-3.5 text-right font-medium">Pob. benef.</th>
              </tr>
            </thead>
            <tbody>
              {programadas.map((r, i) => {
                const showProvincia = r.provincia !== lastProvincia
                lastProvincia = r.provincia
                return (
                  <tr key={i} className="border-b border-white/[0.04] text-sm last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-medium text-ink">{showProvincia ? r.provincia : <span className="text-ink-mute/40">—</span>}</td>
                    <td className="px-5 py-3.5 text-ink-dim">{r.distrito}</td>
                    <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{r.cantidad}</td>
                    <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtDecimal(r.metaVol)}</td>
                    <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtDecimal(r.metaKm)}</td>
                    <td className="px-5 py-3.5 text-right font-tabular text-ink-dim">{fmtInt(r.poblacion)}</td>
                  </tr>
                )
              })}
              <tr className="bg-white/[0.03] text-sm font-semibold text-ink">
                <td className="px-5 py-3.5" colSpan={2}>Total general</td>
                <td className="px-5 py-3.5 text-right font-tabular">{programadasTotal.cantidad}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtDecimal(programadasTotal.metaVol)}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtDecimal(programadasTotal.metaKm)}</td>
                <td className="px-5 py-3.5 text-right font-tabular">{fmtInt(programadasTotal.poblacion)}</td>
              </tr>
            </tbody>
          </TableShell>
        </Reveal>
      </div>
    </section>
  )
}
