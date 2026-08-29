import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineCog,
  HiOutlineX,
  HiOutlineKey,
  HiOutlineUpload,
  HiOutlinePhotograph,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi'
import { REGION_LIST } from '../data/regions'
import { fileToJpegBase64 } from '../lib/imageUpload'
import {
  getToken,
  setToken as saveToken,
  clearToken,
  verifyToken,
  getJsonFile,
  putJsonFile,
  putFile,
  utf8ToBase64,
  REPO_ACTIONS_URL,
  REPO_TOKEN_SETTINGS_URL,
} from '../lib/githubCms'

const ESTADOS = ['Ejecutada', 'En ejecución']

function galeriaPath(regionId) {
  return `src/data/galeria/${regionId}.json`
}

// Solo se activa con ?admin=1 en la URL -- el propietario la guarda como marcador. La única
// protección real es el token de GitHub (nadie más lo tiene); esto solo evita que un visitante
// normal se tope con el panel por accidente.
function isAdminUrl() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('admin') === '1'
}

export default function AdminPanel({ regionId, isGlobal }) {
  const [enabled] = useState(isAdminUrl)
  const [open, setOpen] = useState(false)
  const [token, setTokenState] = useState(getToken)
  const [tokenInput, setTokenInput] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [authError, setAuthError] = useState('')
  const [repoInfo, setRepoInfo] = useState(null)

  const defaultRegion = !isGlobal && regionId ? regionId : REGION_LIST[0].id
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion)
  useEffect(() => {
    if (!isGlobal && regionId) setSelectedRegion(regionId)
  }, [regionId, isGlobal])

  const [entries, setEntries] = useState([])
  const [entriesSha, setEntriesSha] = useState(null)
  const [loadingEntries, setLoadingEntries] = useState(false)
  const [entriesError, setEntriesError] = useState('')

  const [file, setFile] = useState(null)
  const [codigo, setCodigo] = useState('')
  const [estado, setEstado] = useState('Ejecutada')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveOk, setSaveOk] = useState(false)

  const regionLabel = useMemo(() => REGION_LIST.find((r) => r.id === selectedRegion)?.shortLabel ?? selectedRegion, [selectedRegion])

  async function loadEntries(region) {
    if (!token) return
    setLoadingEntries(true)
    setEntriesError('')
    try {
      const { entries: list, sha } = await getJsonFile(galeriaPath(region), token)
      setEntries(list)
      setEntriesSha(sha)
    } catch (err) {
      setEntriesError(err.message)
    } finally {
      setLoadingEntries(false)
    }
  }

  useEffect(() => {
    if (open && token && repoInfo) loadEntries(selectedRegion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, token, repoInfo, selectedRegion])

  async function handleVerify(t) {
    setVerifying(true)
    setAuthError('')
    try {
      const info = await verifyToken(t)
      saveToken(t)
      setTokenState(t)
      setRepoInfo(info)
    } catch (err) {
      setAuthError(err.message)
      setRepoInfo(null)
    } finally {
      setVerifying(false)
    }
  }

  function handleLogout() {
    clearToken()
    setTokenState('')
    setTokenInput('')
    setRepoInfo(null)
    setEntries([])
    setEntriesSha(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file || !codigo.trim() || saving) return
    setSaving(true)
    setSaveError('')
    setSaveOk(false)
    try {
      const nextId = entries.reduce((max, it) => Math.max(max, it.id || 0), 0) + 1
      const imgSlug = `${selectedRegion}-${nextId}`
      const base64 = await fileToJpegBase64(file)

      await putFile({
        path: `src/assets/photos/${imgSlug}.jpg`,
        contentBase64: base64,
        message: `Agrega foto ${imgSlug} vía panel del propietario`,
        token,
      })

      const nextEntries = [...entries, { id: nextId, codigo: codigo.trim(), estado, img: imgSlug }]
      const result = await putJsonFile({
        path: galeriaPath(selectedRegion),
        entries: nextEntries,
        sha: entriesSha,
        message: `Agrega ficha "${codigo.trim()}" a la galería de ${regionLabel}`,
        token,
      })

      setEntries(nextEntries)
      setEntriesSha(result.content.sha)
      setFile(null)
      setCodigo('')
      setEstado('Ejecutada')
      const fileInput = document.getElementById('admin-panel-file-input')
      if (fileInput) fileInput.value = ''
      setSaveOk(true)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(entry) {
    if (!window.confirm(`¿Quitar "${entry.codigo}" de la galería de ${regionLabel}? La foto no se borra del repositorio, solo deja de mostrarse.`)) return
    try {
      const nextEntries = entries.filter((e) => e.id !== entry.id)
      const result = await putJsonFile({
        path: galeriaPath(selectedRegion),
        entries: nextEntries,
        sha: entriesSha,
        message: `Quita ficha "${entry.codigo}" de la galería de ${regionLabel}`,
        token,
      })
      setEntries(nextEntries)
      setEntriesSha(result.content.sha)
    } catch (err) {
      setEntriesError(err.message)
    }
  }

  if (!enabled) return null

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setOpen(true)}
        aria-label="Panel del propietario"
        title="Panel del propietario"
        className="fixed bottom-6 right-6 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-surface-2/90 text-ink-dim shadow-2xl backdrop-blur-md transition-colors hover:bg-surface-3 hover:text-ink"
      >
        <HiOutlineCog size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/80 p-4 py-10 backdrop-blur-sm sm:p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-surface-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-2">
                  <HiOutlinePhotograph className="text-brand-soft" />
                  <h2 className="font-display text-base font-semibold text-ink">Panel del propietario · Galería</h2>
                </div>
                <button onClick={() => setOpen(false)} className="text-ink-mute hover:text-ink" aria-label="Cerrar">
                  <HiOutlineX size={18} />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
                {!token || !repoInfo ? (
                  <TokenGate
                    tokenInput={tokenInput}
                    setTokenInput={setTokenInput}
                    onVerify={handleVerify}
                    verifying={verifying}
                    error={authError}
                    hasStoredToken={!!token}
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-good/25 bg-good/[0.06] px-4 py-2.5 text-xs text-[#3ddc3d]">
                      <span className="flex items-center gap-1.5">
                        <HiOutlineCheckCircle /> Conectado a {repoInfo.full_name} (rama main)
                      </span>
                      <button onClick={handleLogout} className="font-medium text-ink-mute underline decoration-dotted hover:text-ink">
                        Cambiar token
                      </button>
                    </div>

                    <label className="mb-1.5 mt-5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Región</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand/50"
                    >
                      {REGION_LIST.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>

                    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Foto</label>
                        <input
                          id="admin-panel-file-input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-ink-dim file:mr-3 file:rounded-full file:border-0 file:bg-white/[0.08] file:px-3.5 file:py-2 file:text-xs file:font-medium file:text-ink hover:file:bg-white/[0.12]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">
                          Ficha / descripción de la foto
                        </label>
                        <input
                          type="text"
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                          placeholder="Ej. 063-2026-LD-PI-TUM"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink-mute focus:border-brand/50"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Estado</label>
                        <select
                          value={estado}
                          onChange={(e) => setEstado(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand/50"
                        >
                          {ESTADOS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      {saveError && (
                        <div className="flex items-start gap-2 rounded-xl border border-critical/30 bg-critical/[0.08] px-3.5 py-2.5 text-xs text-[#ff8080]">
                          <HiOutlineExclamationCircle className="mt-0.5 shrink-0" />
                          {saveError}
                        </div>
                      )}
                      {saveOk && (
                        <div className="flex items-start gap-2 rounded-xl border border-good/25 bg-good/[0.06] px-3.5 py-2.5 text-xs text-[#3ddc3d]">
                          <HiOutlineCheckCircle className="mt-0.5 shrink-0" />
                          Guardado. El sitio se actualiza solo en 1-2 minutos —{' '}
                          <a href={REPO_ACTIONS_URL} target="_blank" rel="noopener noreferrer" className="underline">
                            ver el progreso del despliegue ↗
                          </a>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={!file || !codigo.trim() || saving}
                        className="flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <HiOutlineUpload size={16} />
                        {saving ? 'Publicando…' : `Publicar en galería de ${regionLabel}`}
                      </button>
                    </form>

                    <div className="mt-7 border-t border-white/[0.06] pt-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                          Fotos actuales · {regionLabel}
                        </h3>
                        {loadingEntries && <span className="text-[11px] text-ink-mute">Cargando…</span>}
                      </div>
                      {entriesError && <p className="text-xs text-[#ff8080]">{entriesError}</p>}
                      <ul className="flex flex-col gap-2">
                        {entries.map((it) => (
                          <li
                            key={it.id}
                            className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                          >
                            <div className="min-w-0">
                              <div className="truncate text-sm text-ink">{it.codigo}</div>
                              <div className="text-[11px] text-ink-mute">
                                {it.estado} · {it.img}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDelete(it)}
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-mute hover:bg-critical/10 hover:text-[#ff8080]"
                              aria-label={`Quitar ${it.codigo}`}
                            >
                              <HiOutlineTrash size={15} />
                            </button>
                          </li>
                        ))}
                        {!loadingEntries && entries.length === 0 && (
                          <li className="text-xs text-ink-mute">Todavía no hay fotos guardadas para esta región.</li>
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function TokenGate({ tokenInput, setTokenInput, onVerify, verifying, error, hasStoredToken }) {
  return (
    <div>
      <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs leading-relaxed text-ink-dim">
        <HiOutlineInformationCircle className="mt-0.5 shrink-0 text-ink-mute" />
        <span>
          Para publicar fotos necesitas un token de acceso de GitHub, con permiso de escritura solo sobre este repositorio. Se guarda
          únicamente en este navegador (nunca se sube al sitio ni se comparte).
        </span>
      </div>

      <label className="mb-1.5 mt-4 block text-xs font-semibold uppercase tracking-wide text-ink-mute">Token de GitHub</label>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-brand/50">
        <HiOutlineKey className="shrink-0 text-ink-mute" size={16} />
        <input
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          placeholder="github_pat_…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
        />
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-critical/30 bg-critical/[0.08] px-3.5 py-2.5 text-xs text-[#ff8080]">
          <HiOutlineExclamationCircle className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={() => onVerify(tokenInput.trim())}
        disabled={!tokenInput.trim() || verifying}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:opacity-50"
      >
        {verifying ? 'Verificando…' : hasStoredToken ? 'Guardar nuevo token' : 'Conectar'}
      </button>

      <details className="mt-5 text-xs text-ink-mute">
        <summary className="cursor-pointer font-medium text-ink-dim">¿Cómo consigo un token?</summary>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 leading-relaxed">
          <li>
            Entra a{' '}
            <a href={REPO_TOKEN_SETTINGS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-soft underline">
              github.com/settings/personal-access-tokens/new ↗
            </a>{' '}
            (inicia sesión con tu cuenta de GitHub si te lo pide).
          </li>
          <li>En "Repository access" elige "Only select repositories" y selecciona Presentacion_PNC.</li>
          <li>
            En "Permissions" → "Repository permissions" busca "Contents" y ponlo en <b>Read and write</b>.
          </li>
          <li>Genera el token y cópialo (empieza con "github_pat_").</li>
          <li>Pégalo arriba y presiona Conectar.</li>
        </ol>
      </details>
    </div>
  )
}
