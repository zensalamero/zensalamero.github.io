import 'vite-ssg'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { writeFileSync } from 'fs'
import path from 'path'

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
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
})
