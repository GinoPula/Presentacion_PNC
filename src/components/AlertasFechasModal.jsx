import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineX,
  HiOutlineExclamationCircle,
  HiOutlineSearch,
  HiOutlineLockClosed,
  HiOutlineKey,
  HiOutlineLogout,
} from 'react-icons/hi'
import { getAlertasFechas, tipoAlertaLabel, tipoAlertaTone } from '../lib/alertasFechas'
import { Badge } from './UI'

// ---------------------------------------------------------------------------
// Candado de acceso -- agregado 14/09/2026 a pedido de Franco: esta información (intervenciones
// cuyo estado en el MAIN quedó desactualizado frente a la fecha real) es de uso interno, no para
// que cualquier visitante del sitio la vea. Franco pidió explícitamente la opción rápida
// ("Candado simple") sabiendo su límite: el sitio se compila como un solo archivo HTML con todo
// el JS y los datos ya incluidos ahí, así que esto es un candado de navegador (evita toparse con
// el detalle por accidente), NO seguridad real -- alguien que revise el código fuente de la
// página igual podría llegar a src/data/alertasFechas.json. El único que necesita entrar es
// Franco mismo, como administrador.
//
// Para cambiar el usuario/clave: reemplaza ADMIN_USER, y genera un hash nuevo pegando esto en la
// consola del navegador (con la clave que quieras) y copiando el resultado en ADMIN_PASS_SHA256:
//
//   await crypto.subtle.digest('SHA-256', new TextEncoder().encode('tu-clave-nueva'))
//     .then(b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''))
//
// Usuario/clave de fábrica (CAMBIAR antes de usar en serio): franco / PNC-Atrasos-2026
const ADMIN_USER = 'franco'
const ADMIN_PASS_SHA256 = '7cdfc8c0ad52fea4418814ae059a7b486696226d7ed9c841755511ba10079a6d'
const SESSION_KEY = 'pnc_alertas_admin_v1'

async function sha256Hex(text) {
  const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function sesionActiva() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function guardarSesion() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Navegador sin sessionStorage disponible (modo privado estricto, etc.) -- se pedirá la
    // clave de nuevo la próxima vez, no es grave.
  }
}

function cerrarSesion() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // no-op
  }
}

function AdminLogin({ onSuccess }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [verificando, setVerificando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (verificando) return
    setVerificando(true)
    setError('')
    try {
      const hash = await sha256Hex(pass)
      if (user.trim().toLowerCase() === ADMIN_USER && hash === ADMIN_PASS_SHA256) {
        guardarSesion()
        onSuccess()
      } else {
        setError('Usuario o contraseña incorrectos.')
      }
    } finally {
      setVerificando(false)
    }
  }

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-dim">
          <HiOutlineLockClosed size={22} />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">Acceso restringido</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
          Esta información es de uso interno. Ingresa con tu usuario y contraseña de administrador para verla.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-3 text-left">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Usuario</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Contraseña</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-brand/50">
              <HiOutlineKey className="shrink-0 text-ink-mute" size={16} />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-transparent text-sm text-ink outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-critical/30 bg-critical/[0.08] px-3.5 py-2.5 text-xs text-[#ff8080]">
              <HiOutlineExclamationCircle className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!user.trim() || !pass || verificando}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:opacity-50"
          >
            {verificando ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AlertasContenido({ regionId, regionLabel, onClose, onLogout }) {
  const [q, setQ] = useState('')
  const scopeLabel = regionId ? regionLabel : null

  const reporte = useMemo(() => getAlertasFechas(regionId), [regionId])

  const qNorm = q.trim().toLowerCase()
  const items = qNorm
    ? reporte.items.filter((it) =>
        [it.deptoLabel, it.provincia, it.distrito, it.sector, it.ficha, it.descripcion]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(qNorm),
      )
    : reporte.items

  const mostrarFicha = items.some((it) => it.ficha)

  const kpis = [
    { value: reporte.total, label: 'Total de atrasos', color: 'text-ink' },
    { value: reporte.programadas, label: 'Programadas sin iniciar', color: 'text-amber' },
    { value: reporte.enEjecucion, label: 'En ejecución sin cerrar', color: 'text-[#ff8080]' },
    { value: reporte.mayorAtraso ? `${reporte.mayorAtraso} d.` : '—', label: 'Mayor atraso', color: 'text-ink' },
  ]

  return (
    <>
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-surface-1 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber">
              Uso interno · Solo administrador
            </span>
            <h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Alertas de <span className="text-amber">Fechas Vencidas</span>
            </h2>
            <p className="mt-1.5 text-sm text-ink-dim">
              {scopeLabel
                ? `Estados desactualizados frente al MAIN · ${scopeLabel}`
                : 'Estados desactualizados frente al MAIN, a nivel nacional'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-xs text-ink-mute">
              <div>
                Corte: <span className="font-tabular font-medium text-ink-dim">{reporte.meta?.fechaCorte || '—'}</span>
              </div>
              <div>
                <span className="font-tabular font-medium text-ink-dim">{reporte.meta?.horaCorte ? `${reporte.meta.horaCorte} hrs` : ''}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink"
            >
              <HiOutlineX size={18} />
            </button>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-mute">
          Intervenciones PROGRAMADA cuya fecha de inicio ya pasó, o EN EJECUCIÓN cuya fecha de fin ya pasó, sin margen de días. Esto no
          cambia el estado en el MAIN -- solo avisa para que se revise y corrija a mano.
        </p>

        {/* Buscador */}
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <HiOutlineSearch className="shrink-0 text-ink-mute" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por departamento, distrito, sector o ficha…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
        </div>

        {/* KPI cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/[0.06] bg-surface-2/60 px-4 py-3.5">
              <div className={`font-tabular font-display text-2xl font-bold tracking-tight sm:text-3xl ${k.color}`}>{k.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="scroll-thin max-h-[55vh] overflow-auto px-2 sm:px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <HiOutlineExclamationCircle size={28} className="text-ink-mute" />
            <p className="text-sm text-ink-dim">
              {reporte.total === 0
                ? `Sin atrasos${scopeLabel ? ` en ${scopeLabel}` : ''} -- todo coincide con la fecha real.`
                : 'No se encontraron resultados con ese filtro.'}
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px] border-collapse text-left text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-surface-1">
              <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">N°</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Alerta</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Departamento</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Provincia / Distrito</th>
                {mostrarFicha && <th className="px-2.5 py-2 sm:px-3 sm:py-3">Ficha</th>}
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Descripción</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Fecha vencida</th>
                <th className="px-2.5 py-2 text-right sm:px-3 sm:py-3">Días de atraso</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={`${it.tipoAlerta}-${it.idIntervencion}`} className="border-b border-white/[0.05] align-top odd:bg-white/[0.015]">
                  <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-tabular text-ink-mute">{it.n}</td>
                  <td className="px-2.5 py-2 sm:px-3 sm:py-3">
                    <Badge tone={tipoAlertaTone(it.tipoAlerta)}>{tipoAlertaLabel(it.tipoAlerta)}</Badge>
                  </td>
                  <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-medium text-ink">{it.deptoLabel}</td>
                  <td className="px-2.5 py-2 sm:px-3 sm:py-3 text-ink-dim">
                    {it.provincia} / {it.distrito}
                  </td>
                  {mostrarFicha && <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-tabular text-xs text-ink-mute">{it.ficha || '—'}</td>}
                  <td className="max-w-[340px] px-2.5 py-2 sm:px-3 sm:py-3 text-ink-dim">{it.descripcion}</td>
                  <td className="px-2.5 py-2 font-tabular text-xs text-ink-mute sm:px-3 sm:py-3">
                    {it.tipoAlerta === 'PROGRAMADA_ATRASADA' ? it.fechaInicio : it.fechaFin || '—'}
                  </td>
                  <td className="px-2.5 py-2 text-right font-tabular font-semibold text-[#ff8080] sm:px-3 sm:py-3">{it.diasAtraso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] bg-surface-1 px-6 py-3 text-[11px] text-ink-mute sm:px-8">
        <span>Sistema en tiempo real PNC Maquinarias — uso interno</span>
        <button onClick={onLogout} className="flex items-center gap-1.5 font-medium text-ink-mute underline decoration-dotted hover:text-ink">
          <HiOutlineLogout size={13} />
          Cerrar sesión
        </button>
      </div>
    </>
  )
}

export default function AlertasFechasModal({ open, onClose, regionId, regionLabel }) {
  const [authed, setAuthed] = useState(sesionActiva)

  if (!open) return null

  function handleClose() {
    onClose()
  }

  function handleLogout() {
    cerrarSesion()
    setAuthed(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-surface-0 shadow-2xl"
        >
          {!authed ? (
            <>
              <div className="flex justify-end border-b border-white/[0.06] bg-surface-1 px-6 py-4">
                <button
                  onClick={handleClose}
                  aria-label="Cerrar"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>
              <AdminLogin onSuccess={() => setAuthed(true)} />
            </>
          ) : (
            <AlertasContenido regionId={regionId} regionLabel={regionLabel} onClose={handleClose} onLogout={handleLogout} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
