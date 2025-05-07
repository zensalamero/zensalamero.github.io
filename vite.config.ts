import 'vite-ssg'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // this is needed only if you're deploying to GitHub Pages repo path
  build: {
    outDir: 'dist',
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  plugins: [
    vue(),
    ...(process.env.NODE_ENV === 'development' ? [vueDevTools()] : []),
    {
      name: 'write-cname',
      closeBundle() {
        writeFileSync('dist/CNAME', 'zense.dev')
      },
    },
  ],

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
