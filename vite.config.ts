import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  plugins: [vue(), vueJsx(), ...(process.env.NODE_ENV === 'development' ? [vueDevTools()] : [])],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
