import { ref, computed } from 'vue'
import { auth } from '../services/firebase'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'

export const useAuth = () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  // Login con email y contraseña
  const login = async (email, password) => {
    isLoading.value = true
    error.value = null
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return userCredential.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Registrar nuevo usuario
  const register = async (email, password) => {
    isLoading.value = true
    error.value = null
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return userCredential.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Escuchar cambios de autenticación
  const initAuthListener = () => {
    return onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser
    })
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initAuthListener
  }
}
