<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-box">
        <h1 class="login-title">Pura Vida Admin</h1>
        <p class="login-subtitle">Inicia sesión para continuar</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="ejemplo@gmail.com"
              required 
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              id="password"
              v-model="password" 
              type="password" 
              placeholder="Tu contraseña"
              required 
              class="form-input"
            />
          </div>

          <button 
            type="submit" 
            :disabled="authStore.isLoading"
            class="btn-login"
          >
            {{ authStore.isLoading ? 'Cargando...' : 'Ingresar' }}
          </button>

          <p v-if="authStore.error" class="error-message">
            ⚠️ {{ authStore.error }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return
  }
  
  const success = await authStore.loginUser(email.value, password.value)
  if (success) {
    router.push('/admin')
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  font-family: 'Standard', sans-serif;
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

.login-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(79, 72, 152, 0.15);
  border-radius: 1.2rem;
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
}

.login-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  text-align: center;
}

.login-subtitle {
  font-size: 0.9rem;
  color: #999;
  text-align: center;
  margin: 0 0 2rem 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.85rem;
  color: #ccc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(79, 72, 152, 0.15);
  border-radius: 0.6rem;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  border-color: #4F4898;
  box-shadow: 0 0 0 3px rgba(79, 72, 152, 0.1);
}

.form-input::placeholder {
  color: #666;
}

.btn-login {
  padding: 0.85rem 1.5rem;
  background: #4F4898;
  color: white;
  border: none;
  border-radius: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.btn-login:hover:not(:disabled) {
  background: #6558c0;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 72, 152, 0.3);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.85rem;
  text-align: center;
  margin: 0;
  padding: 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 0.5rem;
}
</style>
