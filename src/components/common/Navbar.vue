<template>
  <nav :class="['fixed top-0 w-full flex items-center justify-center px-6 md:px-12 py-12 md:py-4 z-[9999] transition-all duration-300', scrollY > 0 ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent']">
    <!-- Navigation Links Left (Desktop) -->
    <div class="hidden md:flex items-center gap-12 pr-12 menu-left">
      <a
        href="#eventos"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Eventos
      </a>
      <a
        href="#contacto"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Contacto
      </a>
    </div>

    <!-- Logo (Center on Desktop, Left on Mobile) -->
    <div class="flex-shrink-0 md:pl-12 md:pr-12 absolute left-6 md:static">
      <img
        src="/assets/isotipoBlanco.png"
        alt="Pura Vida"
        class="w-10 h-10"
      />
    </div>

    <!-- Navigation Links Right (Desktop) -->
    <div class="hidden md:flex items-center gap-12 pl-12 menu-right">
      <a
        href="#experiencias"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Experiencias
      </a>
      <a
        href="#nosotros"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Nosotros
      </a>
    </div>

    <!-- Hamburger Menu Button (Mobile) -->
    <button
      @click="toggleMenu"
      class="md:hidden flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity z-50 absolute right-6"
      aria-label="Toggle menu"
    >
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'rotate-45 translate-y-2']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'opacity-0']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && '-rotate-45 -translate-y-2']"></span>
    </button>

    <!-- Fullscreen Menu (Mobile) -->
    <transition name="menu-fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black z-1000 flex flex-col items-start justify-center pl-8 md:hidden">
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const scrollY = ref(0)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// Detectar scroll
const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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

.menu-left {
  padding-right: 7rem;
  gap: 7rem;
}

.menu-right {
  padding-left: 7rem;
  gap: 7rem;
}
</style>
