// Redimensiona y comprime una foto en el navegador antes de subirla, para no llenar el
// repositorio de fotos de varios MB directo de celular. Devuelve el base64 (sin el prefijo
// "data:...;base64,") listo para la API de GitHub.
export function fileToJpegBase64(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('El archivo no parece ser una imagen válida.'))
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(dataUrl.split(',')[1])
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
