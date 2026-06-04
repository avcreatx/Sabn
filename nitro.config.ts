import process from 'node:process'
import { defineConfig } from 'nitro'

const preset = process.env.WORKERS_CI ? 'cloudflare_module' : undefined

export default defineConfig({
  preset,
  compatibilityDate: '2024-09-19',
  serverEntry: './src/server.ts',
  cloudflare: {
    deployConfig: true,
    nodeCompat: true
  }
})
