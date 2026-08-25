import logoMvcs from '../assets/logos/logo-mvcs.png'
import { Reveal } from './UI'

export default function Footer({ data }) {
  const { fuentes, meta } = data
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-surface-0">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-28">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-mute">Programa Nuestras Ciudades</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">¡Gracias!</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-ink-dim">
            {meta.region} · {meta.seccion} · {meta.periodo}. Información sistematizada a partir del reporte operativo
            del PNC para consulta y seguimiento institucional.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-4">
            <img src={logoMvcs} alt="Ministerio de Vivienda, Construcción y Saneamiento" className="h-8 w-auto opacity-80" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-2 border-t border-white/[0.06] pt-8 text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Fuentes</span>
            <ul className="flex flex-col gap-1.5">
              {fuentes.map((f) => (
                <li key={f} className="text-xs text-ink-mute">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-10 text-[11px] text-ink-mute/70">
          Sitio generado a partir del reporte original en PowerPoint — {meta.region}, {meta.periodo}.
        </p>
      </div>
    </footer>
  )
}
