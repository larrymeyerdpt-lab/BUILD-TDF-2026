import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Produces one self-contained index.html (JS + CSS inlined) that opens by double-clicking.
// Map tiles and the weather forecast still load over the internet.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: { outDir: 'dist-standalone', assetsInlineLimit: 100000000, cssCodeSplit: false },
})
