<template>
  <nav class="fixed top-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-[9999]">
    <!-- Logo con espacio seguro -->
    <div class="flex-shrink-0">
      <img
        src="/assets/isotipoBlanco.png"
        alt="Pura Vida"
        class="w-14 h-14"
      />
    </div>

    <!-- Hamburger Menu Button -->
    <button
      @click="toggleMenu"
      class="flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity z-50"
      aria-label="Toggle menu"
    >
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'rotate-45 translate-y-2']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'opacity-0']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && '-rotate-45 -translate-y-2']"></span>
    </button>

    <!-- Fullscreen Menu -->
    <transition name="menu-fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black z-1000 flex flex-col items-start justify-center pl-8">
        <!-- Menu Links -->
        <nav class="flex flex-col gap-20">
          <a
            href="#eventos"
            @click="closeMenu"
            class="flex items-center gap-4 font-primary text-4xl text-white hover:text-yellow-400 transition-colors group"
          >
            <img
              src="/assets/iconoEventos3.png"
              alt="Eventos"
              class="w-12 h-12"
            />
            Eventos
          </a>
          <a
            href="#contacto"
            @click="closeMenu"
            class="flex items-center gap-4 font-primary text-4xl text-white hover:text-yellow-400 transition-colors group"
          >
            <img
              src="/assets/iconoComunidad3.png"
              alt="Contacto"
              class="w-12 h-12"
            />
            Contacto
          </a>
          <a
            href="#experiencias"
            @click="closeMenu"
            class="flex items-center gap-4 font-primary text-4xl text-white hover:text-yellow-400 transition-colors group"
          >
            <img
              src="/assets/iconoExperiencia1.png"
              alt="Experiencias"
              class="w-12 h-12"
            />
            Experiencias
          </a>
          <a
            href="#nosotros"
            @click="closeMenu"
            class="flex items-center gap-4 font-primary text-4xl text-white hover:text-yellow-400 transition-colors group"
          >
            <img
              src="/assets/isotipoBlanco.png"
              alt="Nosotros"
              class="w-12 h-12"
            />
            Nosotros
          </a>
        </nav>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// Animar iconos cuando el menú se abre
watch(isOpen, (newVal) => {
  if (newVal) {
    const icons = document.querySelectorAll('.group img')
    icons.forEach((icon, index) => {
      gsap.to(icon, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'linear',
        delay: index * 0.1,
      })
    })
  } else {
    // Limpiar animaciones cuando se cierra
    const icons = document.querySelectorAll('.group img')
    icons.forEach((icon) => {
      gsap.killTweensOf(icon)
      gsap.set(icon, { rotation: 0 })
    })
  }
})
</script>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
