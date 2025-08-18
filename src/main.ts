import { createApp } from 'vue'
import App from '@app/App.vue'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles' // loads all features

const app = createApp(App)

app.use(Particles, {
  init: async (engine) => {
    // this loads all tsparticles presets & shapes
    await loadFull(engine)
  },
})

app.mount('#app')
