import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { preloadVideos } from './services/preloadService'
import './styles/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Preload videos antes de montar la app
preloadVideos().then(() => {
  app.mount('#app')
}).catch(() => {
  // Montar incluso si falla el preload
  app.mount('#app')
})
