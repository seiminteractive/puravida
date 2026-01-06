import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import EventDetail from './views/EventDetail.vue'

const routes = [
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Siempre hace scroll a 0 cuando cambias de ruta
    return { top: 0, left: 0 }
  },
})

export default router
