import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineX,
  HiOutlineExclamationCircle,
  HiOutlineSearch,
  HiOutlineLockClosed,
  HiOutlineKey,
  HiOutlineLogout,
  HiOutlineDownload,
  HiOutlineDocumentText,
} from 'react-icons/hi'
import { getAlertasFechas, tipoAlertaLabel, tipoAlertaTone } from '../lib/alertasFechas'
import { exportarAlertasFechasExcel, exportarAlertasFechasPdf } from '../lib/exportAlertasFechas'
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

// Mismos 3 tipos de intervención que ya usa el resto del sitio (ver buscadorIntervenciones.js /
// ReporteDiarioModal.jsx) -- se muestran como chip solo si realmente aparecen en los atrasos.
const TIPOS_ORDEN = ['PREVENCIÓN', 'URGENTE ATENCIÓN', 'EMERGENCIA']
const TIPO_BADGE = {
  'PREVENCIÓN': 'border-series-1/30 bg-series-1/10 text-series-1',
  'URGENTE ATENCIÓN': 'border-amber/30 bg-amber/10 text-amber',
  EMERGENCIA: 'border-brand/30 bg-brand/10 text-brand-soft',
}
const ESTADO_BADGE = {
  'EN EJECUCIÓN': 'border-critical/40 bg-critical/10 text-[#ff8080]',
  PROGRAMADA: 'border-amber/30 bg-amber/10 text-amber',
}

function Chip({ active, onClick, tone, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
        active
          ? tone || 'border-brand/40 bg-brand/15 text-brand-soft'
          : 'border-white/10 bg-white/[0.03] text-ink-mute hover:bg-white/[0.06] hover:text-ink-dim'
      }`}
    >
      {children}
    </button>
  )
}

// "DD/MM/YYYY" (formato que ya usa todo el pipeline) -> timestamp, para poder compararla contra
// los <input type="date"> del filtro de fecha (que entregan "YYYY-MM-DD").
function parseFechaDMY(s) {
  if (!s) return null
  const [d, m, y] = s.split('/').map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d).getTime()
}

function fechaVencidaDe(it) {
  return it.tipoAlerta === 'PROGRAMADA_ATRASADA' ? it.fechaInicio : it.fechaFin
}

function AlertasContenido({ regionId, regionLabel, onClose, onLogout }) {
  const [q, setQ] = useState('')
  const [uboSel, setUboSel] = useState('')
  const [tiposSel, setTiposSel] = useState([])
  const [estadosSel, setEstadosSel] = useState([])
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [descargandoExcel, setDescargandoExcel] = useState(false)
  const scopeLabel = regionId ? regionLabel : null

  // Universo ya escalado a la región activa (o nacional) -- las opciones de los filtros salen de
  // acá, sin recortar por los OTROS filtros, para que las listas no se acorten solas mientras se
  // filtra (mismo criterio que un buscador normal).
  const base = useMemo(() => getAlertasFechas(regionId), [regionId])

  const ubos = useMemo(() => [...new Set(base.items.map((it) => it.deptoLabel))].sort((a, b) => a.localeCompare(b)), [base.items])
  const tiposDisponibles = useMemo(() => TIPOS_ORDEN.filter((t) => base.items.some((it) => it.tipo === t)), [base.items])
  const estadosDisponibles = useMemo(
    () => [...new Set(base.items.map((it) => it.estado))].filter(Boolean).sort((a, b) => a.localeCompare(b)),
    [base.items],
  )

  const desdeMs = fechaDesde ? new Date(`${fechaDesde}T00:00:00`).getTime() : null
  const hastaMs = fechaHasta ? new Date(`${fechaHasta}T23:59:59`).getTime() : null
  const qNorm = q.trim().toLowerCase()

  const filtrado = base.items.filter((it) => {
    if (uboSel && it.deptoLabel !== uboSel) return false
    if (tiposSel.length > 0 && !tiposSel.includes(it.tipo)) return false
    if (estadosSel.length > 0 && !estadosSel.includes(it.estado)) return false
    if (desdeMs || hastaMs) {
      const vencidaMs = parseFechaDMY(fechaVencidaDe(it))
      if (vencidaMs === null) return false
      if (desdeMs && vencidaMs < desdeMs) return false
      if (hastaMs && vencidaMs > hastaMs) return false
    }
    if (qNorm) {
      const haystack = [it.deptoLabel, it.provincia, it.distrito, it.sector, it.ficha, it.descripcion, it.tipo]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(qNorm)) return false
    }
    return true
  })

  // Renumerado + KPIs sobre el resultado YA filtrado -- lo que se ve en pantalla es lo mismo que
  // cuentan las tarjetas y lo que se exporta a Excel/PDF.
  const items = filtrado.map((it, i) => ({ ...it, n: i + 1 }))
  const programadas = items.filter((it) => it.tipoAlerta === 'PROGRAMADA_ATRASADA').length
  const enEjecucion = items.filter((it) => it.tipoAlerta === 'EN_EJECUCION_ATRASADA').length
  const mayorAtraso = items.reduce((max, it) => Math.max(max, it.diasAtraso || 0), 0)
  const reporteFiltrado = { items, total: items.length, programadas, enEjecucion, mayorAtraso, meta: base.meta }

  const hayFiltrosActivos = Boolean(uboSel || tiposSel.length || estadosSel.length || fechaDesde || fechaHasta || q.trim())

  function limpiarFiltros() {
    setQ('')
    setUboSel('')
    setTiposSel([])
    setEstadosSel([])
    setFechaDesde('')
    setFechaHasta('')
  }

  function toggleTipo(tipo) {
    setTiposSel((prev) => (prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]))
  }

  function toggleEstado(estado) {
    setEstadosSel((prev) => (prev.includes(estado) ? prev.filter((e) => e !== estado) : [...prev, estado]))
  }

  async function handleExcel() {
    setDescargandoExcel(true)
    try {
      await exportarAlertasFechasExcel(reporteFiltrado, scopeLabel)
    } catch (err) {
      console.error('No se pudo exportar el Excel de Alertas:', err)
      window.alert('No se pudo generar el Excel. Revisa la consola para más detalle.')
    } finally {
      setDescargandoExcel(false)
    }
  }

  function handlePdf() {
    try {
      exportarAlertasFechasPdf(reporteFiltrado, scopeLabel)
    } catch (err) {
      console.error('No se pudo exportar el PDF de Alertas:', err)
      window.alert('No se pudo generar el PDF. Revisa la consola para más detalle.')
    }
  }

  const mostrarFicha = items.some((it) => it.ficha)
  const mostrarTipo = tiposDisponibles.length > 0

  const kpis = [
    { value: reporteFiltrado.total, label: 'Total de atrasos', color: 'text-ink' },
    { value: programadas, label: 'Programadas sin iniciar', color: 'text-amber' },
    { value: enEjecucion, label: 'En ejecución sin cerrar', color: 'text-[#ff8080]' },
    { value: mayorAtraso ? `${mayorAtraso} d.` : '—', label: 'Mayor atraso', color: 'text-ink' },
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
                Corte: <span className="font-tabular font-medium text-ink-dim">{base.meta?.fechaCorte || '—'}</span>
              </div>
              <div>
                <span className="font-tabular font-medium text-ink-dim">{base.meta?.horaCorte ? `${base.meta.horaCorte} hrs` : ''}</span>
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

        {/* Buscador + filtros */}
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-surface-2/60 p-4">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <HiOutlineSearch className="shrink-0 text-ink-mute" size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por departamento, distrito, sector o ficha…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-mute">UBO</label>
              <select
                value={uboSel}
                onChange={(e) => setUboSel(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-ink outline-none focus:border-brand/50"
              >
                <option value="">Todas</option>
                {ubos.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Desde</label>
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-ink outline-none focus:border-brand/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Hasta</label>
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-ink outline-none focus:border-brand/50"
              />
            </div>

            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-ink-mute hover:bg-white/[0.06] hover:text-ink-dim"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {(estadosDisponibles.length > 0 || tiposDisponibles.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {estadosDisponibles.length > 0 && (
                <>
                  <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Estado:</span>
                  {estadosDisponibles.map((estado) => (
                    <Chip key={estado} active={estadosSel.includes(estado)} tone={ESTADO_BADGE[estado]} onClick={() => toggleEstado(estado)}>
                      {estado}
                    </Chip>
                  ))}
                </>
              )}
              {tiposDisponibles.length > 0 && (
                <>
                  <span className="ml-3 mr-1 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Tipo:</span>
                  {tiposDisponibles.map((tipo) => (
                    <Chip key={tipo} active={tiposSel.includes(tipo)} tone={TIPO_BADGE[tipo]} onClick={() => toggleTipo(tipo)}>
                      {tipo}
                    </Chip>
                  ))}
                </>
              )}
            </div>
          )}
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

        {/* Export buttons */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            onClick={handleExcel}
            disabled={descargandoExcel || items.length === 0}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink disabled:opacity-50"
          >
            <HiOutlineDownload size={15} />
            {descargandoExcel ? 'Generando…' : 'Descargar Excel'}
          </button>
          <button
            onClick={handlePdf}
            disabled={items.length === 0}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink disabled:opacity-50"
          >
            <HiOutlineDocumentText size={15} />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="scroll-thin max-h-[55vh] overflow-auto px-2 sm:px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <HiOutlineExclamationCircle size={28} className="text-ink-mute" />
            <p className="text-sm text-ink-dim">
              {base.total === 0
                ? `Sin atrasos${scopeLabel ? ` en ${scopeLabel}` : ''} -- todo coincide con la fecha real.`
                : 'No se encontraron resultados con esos filtros.'}
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[1050px] border-collapse text-left text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-surface-1">
              <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">N°</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Alerta</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">UBO</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Provincia / Distrito</th>
                {mostrarTipo && <th className="px-2.5 py-2 sm:px-3 sm:py-3">Tipo</th>}
                {mostrarFicha && <th className="px-2.5 py-2 sm:px-3 sm:py-3">Ficha</th>}
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Descripción</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Fecha inicio</th>
                <th className="px-2.5 py-2 sm:px-3 sm:py-3">Fecha término</th>
                <th className="px-2.5 py-2 text-right sm:px-3 sm:py-3">Días de atraso</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const inicioEsVencida = it.tipoAlerta === 'PROGRAMADA_ATRASADA'
                return (
                  <tr key={`${it.tipoAlerta}-${it.idIntervencion}`} className="border-b border-white/[0.05] align-top odd:bg-white/[0.015]">
                    <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-tabular text-ink-mute">{it.n}</td>
                    <td className="px-2.5 py-2 sm:px-3 sm:py-3">
                      <Badge tone={tipoAlertaTone(it.tipoAlerta)}>{tipoAlertaLabel(it.tipoAlerta)}</Badge>
                    </td>
                    <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-medium text-ink">{it.deptoLabel}</td>
                    <td className="px-2.5 py-2 sm:px-3 sm:py-3 text-ink-dim">
                      {it.provincia} / {it.distrito}
                    </td>
                    {mostrarTipo && (
                      <td className="px-2.5 py-2 sm:px-3 sm:py-3">
                        {it.tipo ? (
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${TIPO_BADGE[it.tipo] || 'border-white/10 bg-white/[0.06] text-ink-dim'}`}
                          >
                            {it.tipo}
                          </span>
                        ) : (
                          <span className="text-ink-mute">—</span>
                        )}
                      </td>
                    )}
                    {mostrarFicha && <td className="px-2.5 py-2 sm:px-3 sm:py-3 font-tabular text-xs text-ink-mute">{it.ficha || '—'}</td>}
                    <td className="max-w-[300px] px-2.5 py-2 sm:px-3 sm:py-3 text-ink-dim">{it.descripcion}</td>
                    <td
                      className={`px-2.5 py-2 font-tabular text-xs sm:px-3 sm:py-3 ${inicioEsVencida ? 'font-semibold text-amber' : 'text-ink-mute'}`}
                    >
                      {it.fechaInicio || '—'}
                    </td>
                    <td
                      className={`px-2.5 py-2 font-tabular text-xs sm:px-3 sm:py-3 ${!inicioEsVencida ? 'font-semibold text-[#ff8080]' : 'text-ink-mute'}`}
                    >
                      {it.fechaFin || '—'}
                    </td>
                    <td className="px-2.5 py-2 text-right font-tabular font-semibold text-[#ff8080] sm:px-3 sm:py-3">{it.diasAtraso}</td>
                  </tr>
                )
              })}
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
