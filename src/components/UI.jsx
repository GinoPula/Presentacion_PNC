import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 24, className = '', as: As = motion.div, ...rest }) {
  return (
    <As
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </As>
  )
}

export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 id={id} className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-balance text-base leading-relaxed text-ink-dim">{description}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`card-glow rounded-2xl border border-white/[0.06] bg-surface-2/60 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function StatTile({ icon, value, label, sub, delay = 0, accent = 'brand' }) {
  const accentMap = {
    brand: 'text-brand-soft',
    amber: 'text-amber',
    series1: 'text-series-1',
    series3: 'text-series-3',
    ink: 'text-ink',
  }
  return (
    <Reveal delay={delay}>
      {/* 02/09/2026 -- a pedido de Franco (responsive en celular): antes el valor era
          text-3xl fijo -- con totales nacionales grandes (ej. "1,843,854") en una tarjeta
          de 2 columnas (~155px) el número se salía de la tarjeta y empujaba el ancho de
          toda la página. Se achica en celular y vuelve al tamaño de siempre desde sm:. */}
      <Card className="flex h-full flex-col gap-3 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          {icon && <span className={`text-xl ${accentMap[accent]}`}>{icon}</span>}
        </div>
        <div className={`font-tabular font-display text-xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${accentMap[accent]}`}>
          {value}
        </div>
        <div className="text-sm font-medium text-ink">{label}</div>
        {sub && <div className="text-xs text-ink-mute">{sub}</div>}
      </Card>
    </Reveal>
  )
}

export function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-white/[0.06] text-ink-dim border-white/10',
    good: 'bg-good/10 text-[#3ddc3d] border-good/30',
    critical: 'bg-critical/10 text-[#ff8080] border-critical/30',
    brand: 'bg-brand/10 text-brand-soft border-brand/30',
    amber: 'bg-amber/10 text-amber border-amber/30',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function TableShell({ children }) {
  return (
    <div className="scroll-thin overflow-x-auto rounded-2xl border border-white/[0.06] bg-surface-2/60">
      {/* 02/09/2026 -- a pedido de Franco: más compacto en celular. min-width más bajo + letra más
          chica en pantallas angostas para que quepan más columnas antes de tener que deslizar; a
          partir de sm: vuelve al tamaño de siempre. El deslizado horizontal (overflow-x-auto de
          arriba) sigue como respaldo para las tablas que de todos modos no entran. */}
      <table className="w-full min-w-[480px] border-collapse text-left text-xs sm:min-w-[560px] sm:text-sm">{children}</table>
    </div>
  )
}
