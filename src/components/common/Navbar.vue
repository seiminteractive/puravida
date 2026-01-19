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
      <a href="/">
        <img
          src="/assets/isotipoBlanco.png"
          alt="Pura Vida"
          class="w-10 h-10"
        />
      </a>
    </div>

    <!-- Navigation Links Right (Desktop) -->
    <div class="hidden md:flex items-center gap-12 pl-12 menu-right">
      <a
        href="/calendar"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Experiencias
      </a>
      <a
        href="#experiencias"
        class="font-secondary text-sm uppercase tracking-widest text-white hover:text-yellow-400 transition-colors"
      >
        Nosotros
      </a>
    </div>

    <!-- Hamburger Menu Button (Mobile) -->
    <button
      @click="toggleMenu"
      class="md:hidden flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity absolute right-6 hamburger-btn"
      aria-label="Toggle menu"
    >
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'rotate-45 translate-y-2']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && 'opacity-0']"></span>
      <span :class="['h-0.5 w-6 bg-white transition-all', isOpen && '-rotate-45 -translate-y-2']"></span>
    </button>
  </nav>

  <!-- Fullscreen Menu (Mobile) - Teleported to body -->
  <Teleport to="body">
    <transition name="menu-fade">
      <div v-if="isOpen" class="fullscreen-menu md:hidden">
        <!-- Close Button -->
        <button
          @click="closeMenu"
          class="close-menu-btn"
          aria-label="Close menu"
        >
          <span class="close-line close-line-1"></span>
          <span class="close-line close-line-2"></span>
        </button>

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
            href="/calendar"
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
            href="#experiencias"
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
  </Teleport>
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
.hamburger-btn {
  z-index: 10000;
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

<style>
/* Global styles for Teleported menu */
.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 2rem;
}

.close-menu-btn {
  position: absolute;
  top: 2.2rem;
  right: 1.5rem;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10000;
}

.close-line {
  position: absolute;
  width: 24px;
  height: 2px;
  background: #fff;
  top: 50%;
  left: 0;
}

.close-line-1 {
  transform: rotate(45deg);
}

.close-line-2 {
  transform: rotate(-45deg);
}

.close-menu-btn:hover .close-line {
  opacity: 0.7;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
