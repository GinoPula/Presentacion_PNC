import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineX, HiOutlineDocumentDownload, HiOutlineExclamationCircle, HiChevronDown, HiChevronUp, HiOutlinePlus } from 'react-icons/hi'
import { obtenerAmbitoDisponible, descargarAyudaMemoriaFiltrada } from '../lib/ayudaMemoria'

const plural = (n, singular, pl = `${singular}s`) => (n === 1 ? singular : pl)

// Modal para generar una Ayuda Memoria acotada a solo algunas provincias/distritos
// de un departamento -- agregado 31/08/2026 a pedido de Franco (caso concreto:
// Puno -> provincias de Puno y Huancané, y solo el distrito de Juliaca dentro de
// la provincia de San Román). Patrón visual calcado de ReporteDiarioModal.jsx.
//
// Estado interno: 'seleccion' es un Map<provincia, 'todos' | Set<distrito>> --
// exactamente la forma que espera filtrarPorAmbito()/descargarAyudaMemoriaFiltrada()
// en src/lib/ayudaMemoria.js, así que no hace falta traducir nada al generar.
//
// 'extras' guarda distritos agregados a mano por el usuario que todavía no
// aparecen en los datos en vivo (obtenerAmbitoDisponible solo lista distritos
// que ya tienen alguna fila en programadasDetalle/puntosCriticos) -- caso real:
// Juliaca (San Román) no tiene ninguna intervención programada registrada
// todavía, así que no sale en la lista aunque el usuario la necesite. El
// documento generado igual queda correcto: si no hay filas para ese distrito,
// la sección lo dice explícitamente ("No se registran... para el ámbito
// seleccionado") en vez de omitirlo en silencio -- ver tablaProgramadas()/
// tablaPuntosCriticos() con mostrarVacio:true en ayudaMemoria.js.
export default function AyudaMemoriaFiltroModal({ open, onClose, data, regionId, regionLabel }) {
  const [seleccion, setSeleccion] = useState(new Map())
  const [expandida, setExpandida] = useState(new Set())
  const [extras, setExtras] = useState(new Map())
  const [nuevoDistrito, setNuevoDistrito] = useState({})
  const [generando, setGenerando] = useState(false)

  const ambitoBase = useMemo(() => (data ? obtenerAmbitoDisponible(data) : []), [data])
  // Mezcla los distritos en vivo con los agregados a mano, para mostrarlos juntos.
  const ambito = useMemo(
    () =>
      ambitoBase.map(({ provincia, distritos }) => {
        const extra = extras.get(provincia)
        if (!extra || !extra.size) return { provincia, distritos }
        const combinados = [...new Set([...distritos, ...extra])].sort((a, b) => a.localeCompare(b, 'es'))
        return { provincia, distritos: combinados }
      }),
    [ambitoBase, extras]
  )

  if (!open) return null

  const totalProvincias = seleccion.size
  const totalDistritos = [...seleccion.entries()].reduce((acc, [prov, v]) => {
    const disponibles = ambito.find((a) => a.provincia === prov)?.distritos.length ?? 0
    return acc + (v === 'todos' ? disponibles : v.size)
  }, 0)

  function toggleProvincia(provincia) {
    setSeleccion((prev) => {
      const next = new Map(prev)
      if (next.has(provincia)) next.delete(provincia)
      else next.set(provincia, 'todos')
      return next
    })
    setExpandida((prev) => {
      const next = new Set(prev)
      if (!seleccion.has(provincia)) next.add(provincia) // al marcarla, desplegar sus distritos
      return next
    })
  }

  function toggleExpandida(provincia) {
    setExpandida((prev) => {
      const next = new Set(prev)
      if (next.has(provincia)) next.delete(provincia)
      else next.add(provincia)
      return next
    })
  }

  function toggleDistrito(provincia, distrito, todosDistritos) {
    setSeleccion((prev) => {
      const next = new Map(prev)
      const actual = next.get(provincia)
      const setActual = actual === 'todos' || actual === undefined ? new Set(todosDistritos) : new Set(actual)
      if (setActual.has(distrito)) setActual.delete(distrito)
      else setActual.add(distrito)
      if (setActual.size === 0) {
        next.delete(provincia) // sin distritos marcados = provincia entera queda destildada
      } else if (setActual.size === todosDistritos.length) {
        next.set(provincia, 'todos')
      } else {
        next.set(provincia, setActual)
      }
      return next
    })
  }

  function agregarDistritoManual(provincia, todosDistritosPrevios) {
    const nombre = (nuevoDistrito[provincia] || '').trim()
    if (!nombre) return
    const yaExiste = todosDistritosPrevios.some((d) => d.toLowerCase() === nombre.toLowerCase())
    if (!yaExiste) {
      setExtras((prev) => {
        const next = new Map(prev)
        const set = new Set(next.get(provincia) || [])
        set.add(nombre)
        next.set(provincia, set)
        return next
      })
    }
    setNuevoDistrito((prev) => ({ ...prev, [provincia]: '' }))
    // Marca el distrito recién agregado como seleccionado (sin tocar el resto de la selección).
    setSeleccion((prev) => {
      const next = new Map(prev)
      const actual = next.get(provincia)
      if (actual === 'todos') return next // 'todos' ya lo cubre
      const setActual = new Set(actual || [])
      setActual.add(nombre)
      next.set(provincia, setActual)
      return next
    })
  }

  async function handleGenerar() {
    if (generando || !seleccion.size) return
    setGenerando(true)
    try {
      await descargarAyudaMemoriaFiltrada(data, regionId, seleccion)
    } catch (err) {
      console.error('No se pudo generar la Ayuda Memoria por ámbito:', err)
      window.alert('No se pudo generar el documento. Revisa la consola para más detalle.')
    } finally {
      setGenerando(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-surface-0 shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-white/[0.06] bg-surface-1 px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-soft">
                  Programa Nuestras Ciudades — PNC Maquinarias
                </span>
                <h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Ayuda Memoria por <span className="text-brand-soft">ámbito</span>
                </h2>
                <p className="mt-1.5 text-sm text-ink-dim">
                  Elige provincias y, si hace falta, solo algunos distritos dentro de {regionLabel} — se genera un solo documento acotado a esa selección, con la misma plantilla.
                </p>
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

          {/* Lista de provincias/distritos */}
          <div className="scroll-thin max-h-[50vh] overflow-auto px-6 py-4 sm:px-8">
            {ambito.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
                <HiOutlineExclamationCircle size={28} className="text-ink-mute" />
                <p className="text-sm text-ink-dim">
                  No hay provincias/distritos con datos filtrables en {regionLabel} todavía.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {ambito.map(({ provincia, distritos }) => {
                  const marcada = seleccion.has(provincia)
                  const valor = seleccion.get(provincia)
                  const abierta = expandida.has(provincia)
                  return (
                    <li key={provincia} className="rounded-xl border border-white/[0.06] bg-surface-2/60">
                      <div className="flex items-center gap-3 px-3.5 py-2.5">
                        <input
                          id={`prov-${provincia}`}
                          type="checkbox"
                          checked={marcada}
                          onChange={() => toggleProvincia(provincia)}
                          className="h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.03] accent-brand"
                        />
                        <label htmlFor={`prov-${provincia}`} className="flex-1 cursor-pointer text-sm font-medium text-ink">
                          Provincia de {provincia}
                        </label>
                        <span className="text-[11px] text-ink-mute">
                          {marcada && valor !== 'todos'
                            ? `${valor.size}/${distritos.length} ${plural(distritos.length, 'distrito')}`
                            : `${distritos.length} ${plural(distritos.length, 'distrito')}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpandida(provincia)}
                          aria-label={abierta ? 'Contraer distritos' : 'Ver distritos'}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-mute transition-colors hover:bg-white/[0.06] hover:text-ink"
                        >
                          {abierta ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
                        </button>
                      </div>
                      {abierta && (
                        <div className="border-t border-white/[0.06] px-3.5 py-2.5">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
                            {distritos.map((distrito) => {
                              const checked = marcada && (valor === 'todos' || valor.has(distrito))
                              return (
                                <label key={distrito} className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-dim">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleDistrito(provincia, distrito, distritos)}
                                    className="h-3.5 w-3.5 shrink-0 rounded border-white/20 bg-white/[0.03] accent-brand"
                                  />
                                  {distrito}
                                </label>
                              )
                            })}
                          </div>
                          {/* Un distrito que todavía no tiene ninguna fila en vivo (programadas/puntos
                              críticos) no aparece arriba -- se puede agregar a mano igual: el documento
                              lo va a mostrar como "sin intervenciones registradas", no lo va a inventar. */}
                          <div className="mt-2 flex items-center gap-2 border-t border-white/[0.05] pt-2">
                            <input
                              type="text"
                              value={nuevoDistrito[provincia] || ''}
                              onChange={(e) => setNuevoDistrito((prev) => ({ ...prev, [provincia]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  agregarDistritoManual(provincia, distritos)
                                }
                              }}
                              placeholder="Otro distrito sin intervenciones registradas aún (p. ej. Juliaca)…"
                              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-ink placeholder:text-ink-mute focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => agregarDistritoManual(provincia, distritos)}
                              className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[12px] font-medium text-ink-dim transition-colors hover:bg-white/[0.08] hover:text-ink"
                            >
                              <HiOutlinePlus size={14} />
                              Agregar
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] bg-surface-1 px-6 py-5 sm:px-8">
            <p className="mb-3 text-[12px] text-ink-mute">
              Nota: las intervenciones EJECUTADAS solo están disponibles a nivel departamental en la fuente actual y no se incluyen en el documento filtrado (ver el aviso dentro del propio documento). Sí se filtran las intervenciones programadas y los puntos críticos.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] font-medium text-ink-mute">
                {totalProvincias
                  ? `${totalProvincias} ${plural(totalProvincias, 'provincia')} ${plural(totalProvincias, 'seleccionada', 'seleccionadas')} · ${totalDistritos} ${plural(totalDistritos, 'distrito')}`
                  : 'Selecciona al menos una provincia'}
              </span>
              <button
                onClick={handleGenerar}
                disabled={generando || !seleccion.size}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/10 px-4 py-2.5 text-[13px] font-medium text-brand-soft transition-colors hover:bg-brand/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <HiOutlineDocumentDownload size={16} />
                {generando ? 'Generando…' : 'Generar Ayuda Memoria'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
