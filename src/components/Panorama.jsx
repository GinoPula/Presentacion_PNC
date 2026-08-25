import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { HiOutlineTruck, HiOutlineGlobeAlt, HiOutlineUsers, HiOutlineCube, HiOutlineOfficeBuilding } from 'react-icons/hi'
import { Reveal, SectionHeading, StatTile, Card } from './UI'
import { fmtInt, fmtDecimal } from '../lib/format'

const seriesColors = ['#2a78d6', '#eb6834', '#1baf7a']

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-white/10 bg-surface-3 px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-ink">{label}</div>
      <div className="mt-0.5 text-ink-dim">{payload[0].value} intervenciones</div>
    </div>
  )
}

export default function Panorama({ data }) {
  const { ejecutadasPorTipo, ejecutadasTotal, conveniosVigentes, conveniosCount, flotaTotal, meta } = data
  const chartData = ejecutadasPorTipo.map((d) => ({ name: d.tipo, cantidad: d.cantidad }))

  return (
    <section id="panorama" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Panorama 2026"
          title="El estado operativo de la región en un vistazo"
          description={`Resultados acumulados de las intervenciones ejecutadas por el Programa Nuestras Ciudades en ${meta.region} durante 2026, entre prevención, emergencia y atención urgente.`}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            icon={<HiOutlineCube />}
            value={fmtInt(ejecutadasTotal.cantidad)}
            label="Intervenciones ejecutadas"
            sub={`${fmtInt(conveniosCount)} convenios vigentes activos`}
            accent="brand"
            delay={0}
          />
          <StatTile
            icon={<HiOutlineGlobeAlt />}
            value={fmtInt(ejecutadasTotal.m3)}
            label="m³ de material removido"
            sub={`${fmtDecimal(ejecutadasTotal.km)} km de cauces / vías atendidos`}
            accent="series1"
            delay={0.05}
          />
          <StatTile
            icon={<HiOutlineUsers />}
            value={fmtInt(ejecutadasTotal.poblacion)}
            label="Población beneficiada"
            sub="Acumulado de intervenciones ejecutadas"
            accent="series3"
            delay={0.1}
          />
          <StatTile
            icon={<HiOutlineTruck />}
            value={flotaTotal}
            label="Unidades de maquinaria y flota"
            sub="Asignadas a la UBO"
            accent="amber"
            delay={0.15}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-3">
            <Card className="h-full p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">Intervenciones ejecutadas por tipo</h3>
                  <p className="mt-1 text-sm text-ink-mute">Cantidad de intervenciones · 2026</p>
                </div>
              </div>
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }} barCategoryGap="28%">
                    <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis type="number" tick={{ fill: '#7c8393', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: '#aab1c0', fontSize: 13 }}
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} content={<ChartTooltip />} />
                    <Bar dataKey="cantidad" radius={[0, 6, 6, 0]} maxBarSize={28}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={seriesColors[i % seriesColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {ejecutadasPorTipo.map((d, i) => (
                  <div key={d.tipo} className="flex items-center gap-2 text-xs text-ink-mute">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: seriesColors[i] }} />
                    {d.tipo} · {fmtInt(d.m3)} m³
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <Card className="flex h-full flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <HiOutlineOfficeBuilding className="text-brand-soft" />
                <h3 className="font-display text-lg font-semibold text-ink">Convenios vigentes</h3>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                {conveniosVigentes.map((c) => (
                  <div key={c.entidad} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="text-sm font-medium text-ink">{c.entidad}</span>
                    <span className="whitespace-nowrap font-tabular text-xs text-ink-mute">{c.detail}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-ink-mute">
                Convenios de colaboración interinstitucional suscritos entre el PNC y las entidades solicitantes, vigentes para la ejecución de intervenciones programadas.
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
