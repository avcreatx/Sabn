import { fileURLToPath } from 'node:url'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [nitro()],
  resolve: {
    alias: {
      '#modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '#common': fileURLToPath(new URL('./src/common', import.meta.url))
    }
  }
})
