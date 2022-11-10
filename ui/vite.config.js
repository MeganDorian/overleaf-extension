import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  base: '/ui/dist/',
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        settings: resolve(__dirname, 'settings.html')
      }
    },
    minify: false,
    sourcemap: true,
  }
})
