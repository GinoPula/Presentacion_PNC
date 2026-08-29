// Panel del propietario (?admin=1): guarda fotos y fichas directo en el repositorio de GitHub
// usando la API de "Contents", desde el propio navegador -- sin backend propio. Cada guardado
// es un commit a `main`, que dispara el mismo GitHub Action que ya despliega el sitio
// (.github/workflows/deploy.yml), así que el cambio se ve publicado en 1-2 minutos.
//
// El token de acceso NUNCA se guarda en el código ni se sube al repositorio: el propietario lo
// pega una vez en el panel y queda solo en el localStorage de su propio navegador. Cada llamada
// sale directo del navegador hacia api.github.com (que soporta CORS para este uso desde 2021).

const OWNER = 'GinoPula'
const REPO = 'Presentacion_PNC'
const BRANCH = 'main'
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`

const TOKEN_KEY = 'pnc_admin_gh_token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // localStorage puede fallar en modo incógnito estricto -- el panel simplemente pedirá el
    // token de nuevo en la próxima visita, sin romper nada.
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* noop */
  }
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

// Codificación base64 segura para UTF-8 (btoa solo entiende Latin1; los códigos/descripciones
// pueden traer tildes o "ñ").
export function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

export function base64ToUtf8(b64) {
  const binary = atob(b64.replace(/\n/g, ''))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

async function readError(res) {
  try {
    const json = await res.json()
    return json.message || res.statusText
  } catch {
    return res.statusText
  }
}

// Envuelve fetch para distinguir un fallo de RED (sin conexión, CORS, DNS, etc. -- el navegador
// solo reporta "Failed to fetch") de un error real de la API, y mostrar algo entendible.
async function safeFetch(url, options) {
  try {
    return await fetch(url, options)
  } catch {
    throw new Error('No se pudo conectar con GitHub. Revisa tu conexión a internet e inténtalo de nuevo.')
  }
}

// Confirma que el token es válido y que tiene permiso de escritura sobre el repositorio.
export async function verifyToken(token) {
  const res = await safeFetch(API_BASE, { headers: authHeaders(token) })
  if (res.status === 401) throw new Error('El token no es válido (o ya venció).')
  if (res.status === 404) throw new Error('El token no tiene acceso a este repositorio.')
  if (!res.ok) throw new Error(`No se pudo verificar el token: ${await readError(res)}`)
  const json = await res.json()
  if (json.permissions && json.permissions.push === false) {
    throw new Error('El token no tiene permiso de escritura (push) sobre este repositorio.')
  }
  return json
}

// Lee un archivo del repo. Devuelve null si no existe (404) -- útil para "crear si no existe".
export async function getFile(path, token) {
  const res = await safeFetch(`${API_BASE}/contents/${encodeURI(path)}?ref=${BRANCH}`, { headers: authHeaders(token) })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`No se pudo leer ${path}: ${await readError(res)}`)
  return res.json()
}

// Crea o actualiza un archivo (commit directo a la rama configurada).
export async function putFile({ path, contentBase64, message, sha, token }) {
  const res = await safeFetch(`${API_BASE}/contents/${encodeURI(path)}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: contentBase64, sha: sha || undefined, branch: BRANCH }),
  })
  if (!res.ok) throw new Error(`No se pudo guardar ${path}: ${await readError(res)}`)
  return res.json()
}

// Lee y parsea un JSON de datos del repo (p. ej. src/data/galeria/<region>.json).
// Devuelve { entries, sha } -- sha se necesita para la próxima actualización de ese archivo.
export async function getJsonFile(path, token) {
  const file = await getFile(path, token)
  if (!file) return { entries: [], sha: null }
  return { entries: JSON.parse(base64ToUtf8(file.content)), sha: file.sha }
}

export async function putJsonFile({ path, entries, sha, message, token }) {
  const contentBase64 = utf8ToBase64(JSON.stringify(entries, null, 2) + '\n')
  return putFile({ path, contentBase64, message, sha, token })
}

export const REPO_ACTIONS_URL = `https://github.com/${OWNER}/${REPO}/actions`
export const REPO_TOKEN_SETTINGS_URL = 'https://github.com/settings/personal-access-tokens/new'
