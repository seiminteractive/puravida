import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuth } from '../composables/useAuth'

export const useAuthStore = defineStore('auth', () => {
  const { 
    user, 
    isLoading, 
    error, 
    isAuthenticated, 
    login,
    register, 
    logout, 
    initAuthListener 
  } = useAuth()

  // Verificar si el usuario es admin comparando con el email del .env
  const isAdmin = computed(() => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    const userEmail = user.value?.email
    console.log('🔐 Admin check:', { adminEmail, userEmail, match: userEmail === adminEmail })
    return isAuthenticated.value && userEmail === adminEmail
  })

  const loginUser = async (email, password) => {
    try {
      await login(email, password)
      return true
    } catch (err) {
      console.error('Login error:', err)
      return false
    }
  }

  const registerUser = async (email, password) => {
    try {
      await register(email, password)
      return true
    } catch (err) {
      console.error('Register error:', err)
      return false
    }
  }

  const logoutUser = async () => {
    try {
      await logout()
      return true
    } catch (err) {
      console.error('Logout error:', err)
      return false
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    loginUser,
    registerUser,
    logoutUser,
    initAuthListener
  }
})
