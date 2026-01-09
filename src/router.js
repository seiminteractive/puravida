import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import EventDetail from './views/EventDetail.vue'
import AdminPanel from './views/AdminPanel.vue'

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
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
