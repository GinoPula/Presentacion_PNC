import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineExclamation } from 'react-icons/hi'
import { Reveal, SectionHeading, Card } from './UI'
import { fmtCurrency, fmtInt } from '../lib/format'
import { escenariosGlobal, regionesConEscenarios, regionesSinEscenarios, programadasCantidadGlobal } from '../data/global'
import { REGION_LIST } from '../data/regions'

const palette = ['#2a78d6', '#eb6834']

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-surface-3 px-3.5 py-2.5 text-xs shadow-xl">
      <div className="mb-1.5 font-semibold text-ink">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-ink-dim">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-tabular text-ink">{fmtCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function PresupuestoGeneral() {
  if (!escenariosGlobal) return null

  const seriesColors = Object.fromEntries(escenariosGlobal.map((e, i) => [e.nombre, palette[i % palette.length]]))
  const chartData = ['Mantenimiento', 'Combustible', 'Personal'].map((rubro) => {
    const key = rubro === 'Mantenimiento' ? 'mantenimiento' : rubro === 'Combustible' ? 'combustible' : 'personal'
    const row = { rubro }
    escenariosGlobal.forEach((e) => {
      row[e.nombre] = e[key]
    })
    return row
  })

  const nombresRegiones = regionesConEscenarios.map((r) => r.shortLabel).join(', ')

  return (
    <section id="presupuesto" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Fenómeno El Niño · Presupuesto nacional"
          title="Presupuesto general ante el FEN"
          description={`Suma de los escenarios Moderado y Severo de las ${regionesConEscenarios.length} regiones con esta data (${nombresRegiones}). ${regionesSinEscenarios.map((r) => r.shortLabel).join(', ')} aún no tienen esta información — quedan fuera del total hasta contar con su fuente.`}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {escenariosGlobal.map((e) => (
            <Reveal key={e.nombre} delay={e.nombre.includes('1') ? 0 : 0.08}>
              <Card className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">{e.nombre}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{e.condicion}</h3>
                  </div>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg"
                    style={{ background: `${seriesColors[e.nombre]}1A`, color: seriesColors[e.nombre] }}
                  >
                    {e.condicion.includes('Severas') ? <HiOutlineExclamationCircle /> : <HiOutlineCurrencyDollar />}
                  </span>
                </div>
                <div className="mt-5 font-tabular font-display text-3xl font-bold text-ink sm:text-4xl">{fmtCurrency(e.presupuesto)}</div>
                <div className="mt-1 text-xs text-ink-mute">Presupuesto total estimado · {regionesConEscenarios.length} regiones</div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-6">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Composición del presupuesto por rubro</h3>
                <p className="mt-1 text-sm text-ink-mute">Mantenimiento, combustible y personal — comparativo nacional por escenario</p>
              </div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: 4, right: 8, top: 4, bottom: 4 }} barGap={6} barCategoryGap="26%">
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="rubro" tick={{ fill: '#aab1c0', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                  <YAxis
                    tick={{ fill: '#7c8393', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `S/ ${Math.round(v / 1000)}k`}
                    width={64}
                  />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, color: '#aab1c0', paddingTop: 12 }}
                    formatter={(v) => <span style={{ color: '#aab1c0' }}>{v}</span>}
                  />
                  {escenariosGlobal.map((e) => (
                    <Bar key={e.nombre} dataKey={e.nombre} fill={seriesColors[e.nombre]} radius={[4, 4, 0, 0]} maxBarSize={44} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <Card className="flex items-start gap-3 border-warn/25 bg-warn/[0.05] p-6 sm:p-7">
            <HiOutlineExclamation className="mt-0.5 shrink-0 text-warn" />
            <p className="text-sm leading-relaxed text-ink-dim">
              <span className="font-semibold text-warn">Pendiente: </span>
              presupuesto de las {fmtInt(programadasCantidadGlobal)} intervenciones "Programadas" a nivel nacional. El reporte del
              sistema MAIN no trae este monto para prácticamente ninguna de las {REGION_LIST.length} regiones (las columnas de monto
              contratado y ejecutado están vacías, salvo un puñado de filas de Tacna) — queda fuera de este presupuesto hasta contar
              con una fuente que sí lo tenga.
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
