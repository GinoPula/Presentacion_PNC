import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { HiOutlineLocationMarker, HiOutlineExternalLink } from 'react-icons/hi'
import { Reveal, SectionHeading, Card } from './UI'
import { fmtInt, fmtDecimal } from '../lib/format'
import mapaIntervenciones from '../data/mapaIntervenciones'
import mapaLimites from '../data/mapaLimites'
import { REGION_LIST } from '../data/regions'

const ESRI_TOPO_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'

// Puntos de las 8 regiones combinados en un solo universo, cada uno etiquetado con su región --
// para la vista "Mapa general" de la pestaña Global. Se arma una sola vez (los datos son estáticos).
//
// 02/09/2026 -- mapaIntervenciones.js ahora puede traer puntos con "lat"/"lng" en null (el pipeline
// los incluye igual, sin coordenada, para no perder su provincia/distrito en el cuadro resumen del
// Ayuda Memoria -- ver comentario de formatear_puntos_mapa() en generar_todas_regiones.py). Este
// mapa sí necesita coordenada para dibujar un pin, así que se filtran acá -- el comportamiento del
// mapa no cambia frente a como era antes de ese fix.
const tienenCoordenada = (p) => p.lat != null && p.lng != null

const allRegionsPoints = REGION_LIST.flatMap((r) =>
  (mapaIntervenciones[r.id] || [])
    .filter(tienenCoordenada)
    .map((p) => ({ ...p, region: r.id, regionLabel: r.shortLabel })),
)

const ANA_REPORTE_RIESGOS_URL = 'https://ginopula.github.io/ReporteRiesgos/'

const ESTADO_COLOR = {
  Ejecutada: '#16a34a',
  'En ejecución': '#f2a900',
}

function toSentence(s) {
  if (!s) return ''
  return s.charAt(0) + s.slice(1).toLowerCase()
}

// Varias intervenciones (p. ej. sucesivas visitas al mismo punto de agua) comparten exactamente
// las mismas coordenadas en el sistema fuente. Sin separarlas, sus marcadores quedan apilados y
// solo el de encima se puede seleccionar. Las distribuye en una pequeña espiral (patrón de
// phyllotaxis) alrededor del punto real, sin alterar la ubicación que se usa para encuadrar el mapa.
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const SPREAD_STEP_M = 24

function spreadCoincidentPoints(points) {
  const groups = new Map()
  points.forEach((p) => {
    const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(p)
  })

  const out = []
  groups.forEach((group) => {
    if (group.length === 1) {
      out.push({ ...group[0], renderLat: group[0].lat, renderLng: group[0].lng })
      return
    }
    group.forEach((p, i) => {
      const radiusM = SPREAD_STEP_M * Math.sqrt(i + 1)
      const angle = i * GOLDEN_ANGLE
      const dLat = (radiusM * Math.cos(angle)) / 111320
      const dLng = (radiusM * Math.sin(angle)) / (111320 * Math.cos((p.lat * Math.PI) / 180))
      out.push({ ...p, renderLat: p.lat + dLat, renderLng: p.lng + dLng })
    })
  })
  return out
}

function popupHtml(p) {
  const ubic = [p.distrito, p.sector].filter(Boolean).join(' · ')
  const color = ESTADO_COLOR[p.estado] ?? '#94a3b8'
  const ubicacion = p.regionLabel ? `${p.regionLabel} · ${p.provincia}${ubic ? ' · ' + ubic : ''}` : `${p.provincia}${ubic ? ' · ' + ubic : ''}`
  return `
    <div class="mapa-popup">
      <div class="mapa-popup-head">
        <span>${p.ficha ?? 'S/N'}</span>
        <span style="color:${color}">${p.estado}</span>
      </div>
      <div class="mapa-popup-body">
        <div class="mapa-popup-tipo">${p.tipo}</div>
        <p class="mapa-popup-desc">${toSentence(p.descripcion)}</p>
        <div class="mapa-popup-row"><span>Ubicación</span><b>${ubicacion}</b></div>
        <div class="mapa-popup-row"><span>Fechas</span><b>${p.fechaInicio ?? '—'} — ${p.fechaFin ?? '—'}</b></div>
        <div class="mapa-popup-row"><span>Pob. beneficiada</span><b>${fmtInt(p.poblacion ?? 0)}</b></div>
        <div class="mapa-popup-row"><span>Vol. ejecutado</span><b>${fmtDecimal(p.volumen ?? 0)} m³</b></div>
        ${p.enlace ? `<a href="${p.enlace}" target="_blank" rel="noopener noreferrer" class="mapa-popup-link">Ver ficha técnica ↗</a>` : ''}
      </div>
    </div>
  `
}

// Encuadra el mapa (con zoom animado y margen) sobre el ámbito territorial elegido. Se reutiliza
// tanto al cambiar el filtro como al pulsar "Acercar" manualmente.
function flyToScope(map, allPoints, scopedPoints, distrito) {
  const target = scopedPoints.length ? scopedPoints : allPoints
  if (!target.length) return
  const bounds = L.latLngBounds(target.map((p) => [p.lat, p.lng]))
  map.flyToBounds(bounds, {
    padding: distrito ? [60, 60] : [40, 40],
    maxZoom: distrito ? 15 : 13,
    duration: 0.9,
  })
}

// Resalta el ámbito territorial elegido con los límites geográficos reales (departamento siempre
// como referencia tenue, y la provincia/distrito elegidos remarcados encima) — igual que el mapa
// de ReporteRiesgos, en vez de un recuadro rectangular aproximado.
function drawBoundary(boundaryLayer, limites, provincia, distrito) {
  if (!boundaryLayer || !limites) return
  boundaryLayer.clearLayers()

  if (limites.departamento) {
    L.geoJSON(limites.departamento, {
      style: { color: '#e0293d', weight: 1.5, opacity: 0.45, fill: false, dashArray: '5 6', interactive: false },
    }).addTo(boundaryLayer)
  }

  if (provincia && limites.provincias?.[provincia]) {
    L.geoJSON(limites.provincias[provincia], {
      style: {
        color: '#e0293d',
        weight: 2.5,
        opacity: 0.9,
        fill: true,
        fillColor: '#e0293d',
        fillOpacity: 0.05,
        interactive: false,
      },
    }).addTo(boundaryLayer)
  }

  if (distrito) {
    const key = `${provincia}|${distrito}`
    const geom = limites.distritos?.[key] ?? limites.provincias?.[provincia]
    if (geom) {
      L.geoJSON(geom, {
        style: {
          color: '#e0293d',
          weight: 2.5,
          opacity: 0.95,
          fill: true,
          fillColor: '#e0293d',
          fillOpacity: 0.1,
          dashArray: '2 6',
          interactive: false,
        },
      }).addTo(boundaryLayer)
    }
  }
}

function LayerToggle({ active, tone, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`mapfp-toggle ${tone} ${active ? 'on' : ''}`}>
      <span className="mapfp-sw" />
      {children}
    </button>
  )
}

export default function MapaIntervenciones({ regionId, shortLabel, isGlobal = false }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersLayerRef = useRef(null)
  const boundaryLayerRef = useRef(null)
  const prevFilterKeyRef = useRef('')

  const allPoints = isGlobal ? allRegionsPoints : (mapaIntervenciones[regionId] || []).filter(tienenCoordenada)

  const [showEjecutada, setShowEjecutada] = useState(true)
  const [showEnEjecucion, setShowEnEjecucion] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [provincia, setProvincia] = useState('')
  const [distrito, setDistrito] = useState('')

  const limites = isGlobal ? (selectedRegion ? mapaLimites[selectedRegion] || null : null) : mapaLimites[regionId] || null

  // En la vista Global, el filtro de Región acota el universo antes de provincia/distrito. En una
  // página regional este filtro no existe y regionPoints == allPoints siempre.
  const regionPoints = useMemo(
    () => (isGlobal && selectedRegion ? allPoints.filter((p) => p.region === selectedRegion) : allPoints),
    [allPoints, isGlobal, selectedRegion],
  )

  // Universo de puntos según las capas activas (Ejecutadas / En ejecución). El filtro territorial
  // (provincia/distrito) se arma sobre este universo, para que sus opciones reflejen siempre el
  // estado de ejecución elegido — si solo hay "En ejecución" activado, provincia y distrito solo
  // ofrecen las zonas que tienen intervenciones en ejecución.
  const layerPoints = useMemo(
    () => regionPoints.filter((p) => (p.estado === 'Ejecutada' ? showEjecutada : showEnEjecucion)),
    [regionPoints, showEjecutada, showEnEjecucion],
  )

  // Universo de puntos según las capas activas, pero SIN acotar por la región ya elegida -- se usa
  // solo para calcular qué regiones ofrecer en el selector "Región" de la vista Global. (03/09/2026,
  // a pedido de Franco: "cuando selecciono el filtro ejecucion en region me sale 8 pero en el listado
  // me aparecen todas" -- el listado de regiones debe acotarse a las capas activas, igual que ya
  // pasa con provincia/distrito. No puede calcularse a partir de layerPoints porque ese ya está
  // acotado a selectedRegion, y con una región ya elegida el resultado sería siempre esa sola.)
  const layerPointsSinRegion = useMemo(
    () => allPoints.filter((p) => (p.estado === 'Ejecutada' ? showEjecutada : showEnEjecucion)),
    [allPoints, showEjecutada, showEnEjecucion],
  )
  const regionesDisponibles = useMemo(() => new Set(layerPointsSinRegion.map((p) => p.region)), [layerPointsSinRegion])
  const regionesFiltradas = useMemo(() => REGION_LIST.filter((r) => regionesDisponibles.has(r.id)), [regionesDisponibles])

  const provincias = useMemo(() => [...new Set(layerPoints.map((p) => p.provincia))].sort(), [layerPoints])
  const distritos = useMemo(
    () => (provincia ? [...new Set(layerPoints.filter((p) => p.provincia === provincia).map((p) => p.distrito))].sort() : []),
    [layerPoints, provincia],
  )

  // Puntos dentro del filtro territorial (región/provincia/distrito), sin importar las capas
  // activas — se usa para encuadrar el mapa y para los contadores "En esta vista".
  const scopedPoints = useMemo(
    () => regionPoints.filter((p) => (!provincia || p.provincia === provincia) && (!distrito || p.distrito === distrito)),
    [regionPoints, provincia, distrito],
  )
  // Puntos realmente dibujados en el mapa: filtro territorial + capas activas.
  const filteredPoints = useMemo(
    () => scopedPoints.filter((p) => (p.estado === 'Ejecutada' ? showEjecutada : showEnEjecucion)),
    [scopedPoints, showEjecutada, showEnEjecucion],
  )

  const ejecutadasCount = scopedPoints.filter((p) => p.estado === 'Ejecutada').length
  const enEjecucionCount = scopedPoints.filter((p) => p.estado === 'En ejecución').length

  function handleRegionChange(v) {
    setSelectedRegion(v)
    setProvincia('')
    setDistrito('')
  }

  function handleProvinciaChange(v) {
    setProvincia(v)
    setDistrito('')
  }

  function resetFiltro() {
    setSelectedRegion('')
    setProvincia('')
    setDistrito('')
  }

  // Si al cambiar de capa la región elegida deja de tener intervenciones del estado activo (o, en
  // cascada, si la provincia/distrito elegidos dejan de tener intervenciones del estado activo), se
  // limpian solos para no dejar el filtro apuntando a una selección vacía.
  useEffect(() => {
    if (isGlobal && selectedRegion && !regionesDisponibles.has(selectedRegion)) {
      setSelectedRegion('')
      setProvincia('')
      setDistrito('')
    } else if (provincia && !provincias.includes(provincia)) {
      setProvincia('')
      setDistrito('')
    } else if (distrito && !distritos.includes(distrito)) {
      setDistrito('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionesDisponibles, provincias, distritos])

  // Inicializa el mapa una vez por región (se remonta solo al cambiar de región).
  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    })
    mapRef.current = map

    L.tileLayer(ESRI_TOPO_URL, { attribution: 'Tiles &copy; Esri', maxZoom: 17 }).addTo(map)
    boundaryLayerRef.current = L.layerGroup().addTo(map)

    if (allPoints.length) {
      map.fitBounds(L.latLngBounds(allPoints.map((p) => [p.lat, p.lng])), { padding: [40, 40], maxZoom: 13 })
    } else {
      map.setView([-9.2, -75.0], 5)
    }

    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    const t = setTimeout(() => map.invalidateSize(), 300)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
      map.remove()
      mapRef.current = null
      boundaryLayerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId])

  // Redibuja los marcadores cuando cambia lo que debe mostrarse (capas y/o filtro territorial).
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (markersLayerRef.current) map.removeLayer(markersLayerRef.current)
    const group = L.layerGroup()
    const spread = spreadCoincidentPoints(filteredPoints)
    const ordered = spread.sort((a, b) => (a.estado === b.estado ? 0 : a.estado === 'En ejecución' ? 1 : -1))
    ordered.forEach((p) => {
      const color = ESTADO_COLOR[p.estado] ?? '#94a3b8'
      L.circleMarker([p.renderLat, p.renderLng], {
        radius: p.estado === 'En ejecución' ? 8 : 6,
        fillColor: color,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.92,
      })
        .addTo(group)
        .bindPopup(popupHtml(p), { maxWidth: 280 })
    })
    group.addTo(map)
    markersLayerRef.current = group
  }, [filteredPoints])

  // Vuela con zoom animado y margen hacia la región/provincia/distrito elegido (no reacciona al
  // solo activar/desactivar capas).
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const key = `${selectedRegion}|${provincia}|${distrito}`
    if (key === prevFilterKeyRef.current) return
    prevFilterKeyRef.current = key
    flyToScope(map, regionPoints, scopedPoints, distrito)
    drawBoundary(boundaryLayerRef.current, limites, provincia, distrito)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, provincia, distrito])

  function handleAcercar() {
    const map = mapRef.current
    if (!map) return
    flyToScope(map, regionPoints, scopedPoints, distrito)
    drawBoundary(boundaryLayerRef.current, limites, provincia, distrito)
  }

  const regionActualLabel = isGlobal && selectedRegion ? REGION_LIST.find((r) => r.id === selectedRegion)?.shortLabel : null
  const scopeLabel = provincia
    ? `${distrito ? distrito + ', ' : ''}${provincia}${regionActualLabel ? ', ' + regionActualLabel : ''}`
    : regionActualLabel || (isGlobal ? 'Vista nacional completa' : 'Vista regional completa')

  return (
    <section id="mapa" className="relative border-t border-white/[0.05] bg-surface-0 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={isGlobal ? `Georreferenciado · ${REGION_LIST.length} regiones` : 'Georreferenciado'}
          title={isGlobal ? 'Mapa general de intervenciones' : 'Mapa de intervenciones'}
          description={
            isGlobal
              ? `Ubicación de las intervenciones ejecutadas y en ejecución en las ${REGION_LIST.length} regiones, con ficha técnica, fechas y avance de cada punto. Filtra por región, provincia y distrito.`
              : `Ubicación de las intervenciones ejecutadas y en ejecución en ${shortLabel}, con ficha técnica, fechas y avance de cada punto. Activa o desactiva capas y filtra por provincia y distrito.`
          }
        />

        <Reveal delay={0.08} className="mt-10">
          <Card className="p-4 sm:p-5">
            <div className="mapfp-section flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="mapfp-panel">
                <div className="mapfp-title">Filtro territorial</div>
                <div className="mapfp-sub">{scopeLabel}</div>

                {isGlobal && (
                  <>
                    <label className="mapfp-lbl" htmlFor="mapfp-region">
                      Región
                    </label>
                    <select id="mapfp-region" className="mapfp-select" value={selectedRegion} onChange={(e) => handleRegionChange(e.target.value)}>
                      <option value="">Todas ({regionesFiltradas.length})</option>
                      {regionesFiltradas.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.shortLabel}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <label className="mapfp-lbl" htmlFor="mapfp-provincia">
                  Provincia
                </label>
                <select id="mapfp-provincia" className="mapfp-select" value={provincia} onChange={(e) => handleProvinciaChange(e.target.value)}>
                  <option value="">Todas</option>
                  {provincias.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <label className="mapfp-lbl" htmlFor="mapfp-distrito">
                  Distrito
                </label>
                <select
                  id="mapfp-distrito"
                  className="mapfp-select"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  disabled={!provincia}
                >
                  <option value="">Todos</option>
                  {distritos.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <div className="mapfp-btns">
                  <button type="button" className="mapfp-btn primary" onClick={handleAcercar}>
                    Acercar
                  </button>
                  <button type="button" className="mapfp-btn" onClick={resetFiltro} disabled={!provincia && !distrito}>
                    Restablecer ámbito
                  </button>
                </div>

                <div className="mapfp-divider" />
                <div className="mapfp-mini-lbl">Capas del mapa</div>
                <LayerToggle active={showEjecutada} tone="ejecutada" onClick={() => setShowEjecutada((v) => !v)}>
                  Ejecutadas
                </LayerToggle>
                <LayerToggle active={showEnEjecucion} tone="enejecucion" onClick={() => setShowEnEjecucion((v) => !v)}>
                  En ejecución
                </LayerToggle>

                <div className="mapfp-mini-lbl mapfp-mini-lbl--tight">En esta vista</div>
                <div className="mapfp-mini-row">
                  <span>Ejecutadas</span>
                  <b>{fmtInt(ejecutadasCount)}</b>
                </div>
                <div className="mapfp-mini-row">
                  <span>En ejecución</span>
                  <b>{fmtInt(enEjecucionCount)}</b>
                </div>
                <div className="mapfp-mini-row">
                  <span>Total</span>
                  <b>{fmtInt(scopedPoints.length)}</b>
                </div>
              </div>

              <div className="mapfp-center">
                <div ref={containerRef} className="leaflet-dark-theme h-[420px] w-full rounded-xl sm:h-[520px]" />
                <div className="mapfp-legend">
                  <span>
                    <span className="mapfp-ld" style={{ background: ESTADO_COLOR.Ejecutada }} />
                    Ejecutada
                  </span>
                  <span>
                    <span className="mapfp-ld" style={{ background: ESTADO_COLOR['En ejecución'] }} />
                    En ejecución
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {isGlobal && (
          <Reveal delay={0.12} className="mt-4">
            <a
              href={ANA_REPORTE_RIESGOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-surface-2/60 p-5 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-colors hover:bg-surface-3/60 sm:p-6"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-lg text-brand-soft">
                  <HiOutlineLocationMarker />
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">ANA · Acuerdo Multisectorial</div>
                  <div className="mt-0.5 font-display text-base font-semibold text-ink">Ver puntos críticos del ANA</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-ink-dim">
                    Abre el reporte de riesgos de la Autoridad Nacional del Agua, con el detalle georreferenciado de los puntos
                    críticos a nivel nacional.
                  </div>
                </div>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink transition-colors group-hover:bg-white/[0.08]">
                <HiOutlineExternalLink size={16} />
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
