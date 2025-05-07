// src/entry-client.ts
import '@/assets/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createHead } from '@vueuse/head'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    // ← no `history: ` at all
  },
  ({ app, router }) => {
    app.use(router)
    app.use(createHead())
  },
)
