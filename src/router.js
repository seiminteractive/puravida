import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import EventDetail from './views/EventDetail.vue'
import AdminPanel from './views/AdminPanel.vue'
import LoginView from './views/LoginView.vue'
import { setupRouterGuards } from './router/guards'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Siempre scroll al top cuando se navega
    return { top: 0, behavior: 'instant' }
  }
})

// Configurar guards de autenticación
setupRouterGuards(router)

export default router
