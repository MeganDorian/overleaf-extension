import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/ui/dist/',
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        settings: resolve(__dirname, 'settings.html')
      }
    }
  }
})
