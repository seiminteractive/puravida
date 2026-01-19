import { useAuthStore } from '../stores/authStore'

export const setupRouterGuards = (router) => {
  let authInitialized = false

  router.beforeEach((to, from, next) => {
    try {
      // Proteger contra rutas nulas
      if (!to || !to.meta) {
        next()
        return
      }

      const authStore = useAuthStore()
      
      // Si el usuario existe, marcar como inicializado
      if (authStore.user) {
        authInitialized = true
      }
      
      // Si aún no se ha verificado la autenticación y es la navegación inicial, permitir pasar
      if (!authInitialized && (!from || from.name === null)) {
        next()
        return
      }
      
      // Si la ruta requiere autenticación y no está autenticado
      if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
      } 
      // Si está en login y ya está autenticado, redirige a admin
      else if (to.path === '/login' && authStore.isAuthenticated) {
        next('/admin')
      } 
      // Si no, continúa normalmente
      else {
        next()
      }
    } catch (error) {
      console.error('Router guard error:', error)
      next()
    }
  })
}