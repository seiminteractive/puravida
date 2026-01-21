import { useAuthStore } from '../stores/authStore'

export const setupRouterGuards = (router) => {
  let authInitialized = false

  router.beforeEach((to, from, next) => {
    try {
      if (!to || !to.meta) {
        next()
        return
      }

      const authStore = useAuthStore()
      
      if (authStore.user) {
        authInitialized = true
      }
      
      if (!authInitialized && (!from || from.name === null)) {
        next()
        return
      }
      
      // Si la ruta requiere autenticación
      if (to.meta.requiresAuth) {
        // Verificar que esté autenticado Y sea admin
        if (!authStore.isAuthenticated) {
          next('/login')
        } else if (!authStore.isAdmin) {
          // Está logueado pero no es admin
          console.warn('Acceso denegado: usuario no es admin')
          authStore.logoutUser()
          next('/login')
        } else {
          next()
        }
      } 
      // Si está en login y ya está autenticado como admin
      else if (to.path === '/login' && authStore.isAuthenticated) {
        if (authStore.isAdmin) {
          next('/admin')
        } else {
          // Logueado pero no es admin, hacer logout
          authStore.logoutUser()
          next()
        }
      } 
      else {
        next()
      }
    } catch (error) {
      console.error('Router guard error:', error)
      next()
    }
  })
}