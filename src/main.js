import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import './styles/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Esperar a que el router esté listo antes de inicializar auth
router.isReady().then(() => {
  const authStore = useAuthStore()
  authStore.initAuthListener()
})

app.mount('#app')
