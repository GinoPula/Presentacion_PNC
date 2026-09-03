import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineCheckCircle } from 'react-icons/hi'
import { Reveal, SectionHeading, Card, StatTile } from './UI'
import { fmtCurrency, fmtInt, fmtDecimal } from '../lib/format'

const palette = ['#2a78d6', '#eb6834']

// Mismos 5 ítems que el resumen de la Vista General (ver RESUMEN_ITEMS en PresupuestoGeneral.jsx
// y el comentario grande junto a presupuestoFenResumenGlobal en src/data/global.js) -- agregado
// 03/09/2026 a pedido de Franco: quería este mismo detalle también por región, no solo a nivel
// nacional. Misma fuente y mismo criterio, filtrado por departamento en vez de sumado a nivel país
// -- ver el comentario junto a `presupuestoFenResumen` en cada archivo de región que lo trae.
const RESUMEN_ITEMS = (r) => [
  {
    label: 'Puntos Críticos',
    text: `Intervención en ${fmtInt(r.puntosCriticos)} puntos críticos identificados en la región.`,
  },
  {
    label: 'Descolmatación',
    text: `Movimiento de ${fmtDecimal(r.materialM3 / 1000000, 1)} millones de m³ de material excedente.`,
  },
  {
    label: 'Longitud de Cauces',
    text: `Limpieza y adecuación en ${fmtDecimal(r.longitudKm, 1)} Km de cauces.`,
  },
  {
    label: 'Impacto Social',
    text: `${fmtDecimal(r.poblacionBeneficiada / 1000000, 1)} millones de personas protegidas y beneficiadas.`,
  },
  {
    label: 'Demanda MEF',
    text: `Solicitud de demanda presupuestal por ${fmtCurrency(r.demandaMef)}.`,
  },
]

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

export default function Escenarios({ data }) {
  const { escenarios, presupuestoFenResumen } = data
  const seriesColors = Object.fromEntries(escenarios.map((e, i) => [e.nombre, palette[i % palette.length]]))
  const chartData = ['Mantenimiento', 'Combustible', 'Personal'].map((rubro) => {
    const key = rubro === 'Mantenimiento' ? 'mantenimiento' : rubro === 'Combustible' ? 'combustible' : 'personal'
    const row = { rubro }
    escenarios.forEach((e) => {
      row[e.nombre] = e[key]
    })
    return row
  })

  const presupuestos = escenarios.map((e) => e.presupuesto)
  const brecha = presupuestos.length > 1 ? (Math.max(...presupuestos) / Math.min(...presupuestos)).toFixed(1) : null

  return (
    <section id="escenarios" className="relative border-t border-white/[0.05] bg-surface-1 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Fenómeno El Niño · Presupuesto"
          title={brecha ? `${escenarios.length} escenarios, una brecha de ${brecha}x en el presupuesto` : 'Escenarios de presupuesto ante el FEN'}
          description="Proyección de costos operativos frente al Fenómeno El Niño (FEN), según la severidad de las condiciones climáticas esperadas en la región."
        />

        {presupuestoFenResumen && (
          <Reveal delay={0.02} className="mt-10">
            <Card className="p-6 sm:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                Demanda presupuestal oficial ante el MEF · corte {presupuestoFenResumen.fechaCorte}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {RESUMEN_ITEMS(presupuestoFenResumen).map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-sm leading-relaxed text-ink-dim">
                    <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-series-1" />
                    <span>
                      <span className="font-semibold text-ink">{item.label}:</span> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {escenarios.map((e) => (
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
                <div className="mt-1 text-xs text-ink-mute">Presupuesto total estimado · {fmtInt(e.intervenciones)} intervenciones</div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-6">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Composición del presupuesto por rubro</h3>
                <p className="mt-1 text-sm text-ink-mute">Mantenimiento, combustible y personal — comparativo por escenario</p>
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
                  {escenarios.map((e) => (
                    <Bar key={e.nombre} dataKey={e.nombre} fill={seriesColors[e.nombre]} radius={[4, 4, 0, 0]} maxBarSize={44} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
