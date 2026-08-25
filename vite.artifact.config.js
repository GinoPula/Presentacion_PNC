import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Config used ONLY to produce a single self-contained HTML file (used for the
// Cowork artifact preview). The regular vite.config.js is what ships in the repo.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 100 * 1024 * 1024, // inline every asset as base64
    cssCodeSplit: false,
    chunkSizeWarningLimit: 10000,
  },
})
