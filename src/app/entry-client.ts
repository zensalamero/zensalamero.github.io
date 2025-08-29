import '@/assets/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { createHead } from '@vueuse/head'
import { routes } from '@/app/router'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async ({ app, router, isClient }) => {
    app.use(router)
    // Only install createHead once, outside of ViteSSG callback if needed
    app.use(createHead())

    // register tsparticles only on client
    if (isClient) {
      const { default: Particles } = await import('@tsparticles/vue3')
      const { loadSlim } = await import('@tsparticles/slim') // or '@tsparticles/engine' for full
      app.use(Particles, {
        init: async (engine) => {
          await loadSlim(engine) // use loadFull(engine) for all features
        },
      })
    }
  },
)
