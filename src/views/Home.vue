<template>
  <div class="home-root">
    <!-- Fixed hero video layer -->
    <div class="home-hero-video-layer" aria-hidden="true">
      <video class="home-hero-video" autoplay muted loop playsinline preload="auto">
        <source src="/assets/fondoMobile.mp4" type="video/mp4" />
      </video>
      <div class="home-hero-video-dim"></div>
    </div>

    <!-- Mask that hides the video after the hero section -->
    <div class="home-video-mask-after-hero" aria-hidden="true"></div>

    <!-- Background Icons Scattered -->
    <div class="home-bg-icons" aria-hidden="true">
      <img src="/assets/iconoEventos2.png" alt="" class="icon icon-1" />
      <img src="/assets/iconoComunidad2.png" alt="" class="icon icon-2" />
      <img src="/assets/iconoExperiencia1.png" alt="" class="icon icon-3" />
      <img src="/assets/iconoEventos3.png" alt="" class="icon icon-4" />
      <img src="/assets/iconoComunidad3.png" alt="" class="icon icon-5" />
      <img src="/assets/iconoExperiencia1.png" alt="" class="icon icon-6" />
      <img src="/assets/iconoEventos2.png" alt="" class="icon icon-7" />
      <img src="/assets/iconoComunidad3.png" alt="" class="icon icon-8" />
    </div>

    <!-- Subtle black overlay to reduce icon opacity -->
    <div class="home-bg-dim" aria-hidden="true"></div>

    <!-- Content on top of background -->
    <div class="home-content">
      <!-- Intro Screen -->
      <IntroScreen />

      <!-- Navbar (Fixed) -->
      <Navbar />

    <!-- Hero Section -->
    <section class="w-full min-h-screen flex flex-col justify-between pb-8 pt-20 relative z-20">
      <!-- Espaciador arriba -->
      <div></div>

      <!-- Contenido central - En el medio de la pantalla -->
      <div class="flex flex-col items-center justify-center text-center px-6">
        <!-- Frase espiritual principal -->
        <p class="font-secondary text-white text-xs uppercase tracking-widest opacity-70 mb-6">
          Ritual contemporáneo
        </p>

        <!-- Logo tipográfico como texto principal -->
        <div class="mb-2 flex justify-center max-w-full">
          <img
            src="/assets/logoTipograficoBlancoCortado.png"
            alt="Pura Vida"
            class="h-auto max-h-24 w-auto px-5 md:h-24"
          />
        </div>

        <!-- Descripción corta centrada -->
        <p class="font-secondary text-white text-sm leading-relaxed max-w-sm opacity-90 font-light mt-4">
          Energía que eleva. Diseño que guía.
        </p>
      </div>

      <!-- Botón único abajo -->
      <div class="flex justify-center px-6">
        <button
          class="py-3 text-white font-primary font-semibold transition-all hover:opacity-70 flex items-center justify-center gap-2"
          @click="scrollToEvents"
        >
          <img
            ref="eventoIcon"
            src="/assets/iconoEventos1.png"
            alt="Eventos"
            class="w-5 h-5"
          />
          Ver eventos
        </button>
      </div>
    </section>

    <!-- Carrusel de Eventos -->
    <EventCarousel />

    <!-- Sección About -->
    <AboutSection />

    <!-- Carrusel de Fechas Pasadas (Oculto temporalmente) -->
    <!-- <PastEventsCarousel /> -->

    <!-- WhatsApp CTA -->
    <WhatsAppCTA />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue'
import IntroScreen from '../components/common/IntroScreen.vue'
import EventCarousel from '../components/common/EventCarousel.vue'
import PastEventsCarousel from '../components/common/PastEventsCarousel.vue'
import AboutSection from '../components/common/AboutSection.vue'
import WhatsAppCTA from '../components/common/WhatsAppCTA.vue'
import { useRotatingIcon } from '../composables/useRotatingIcon'

const eventoIcon = useRotatingIcon(8)

const scrollToEvents = () => {
  const el = document.getElementById('eventos')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.home-root {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #000;
}

.home-hero-video-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.home-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

.home-hero-video-dim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

.home-video-mask-after-hero {
  position: absolute;
  top: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 1; /* above video, below icons + content */
  pointer-events: none;
}

.home-bg-icons {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.home-bg-dim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.70);
  pointer-events: none;
  z-index: 3;
}

.home-content {
  position: relative;
  z-index: 4;
}

.icon {
  position: absolute;
  opacity: 0.25;
}

.icon-1 {
  top: 47rem;
  left: 20px;
  width: 48rem;
  height: 48rem;
}

.icon-2 {
  top: 48%;
  right: -5rem;
  width: 56rem;
  height: 56rem;
}

.icon-3 {
  bottom: 20rem;
  left: 40rem;
  width: 54rem;
  height: 54rem;
}

.icon-4 {
  top: 140rem;
  right: 35rem;
  width: 66rem;
  height: 66rem;
}

.icon-5 {
  bottom: -15rem;
  right: -15rem;
  width: 48rem;
  height: 48rem;
}

.icon-6 {
  top: 40%;
  left: -25rem;
  width: 60rem;
  height: 60rem;
  opacity: 0.4;
}

.icon-7 {
  bottom: 5rem;
  right: 65rem;
  width: 54rem;
  height: 54rem;
}

.icon-8 {
  top: 70rem;
  right: -30rem;
  width: 60rem;
  height: 60rem;
}

/* Mobile Media Query - Reducir tamaño de iconos */
@media (max-width: 768px) {
  .icon-1 {
    width: 24rem;
    height: 24rem;
    top: 53rem;
    left: 8rem;
    opacity: .4;
  }

  .icon-2 {
    width: 28rem;
    height: 28rem;
    top: 65rem;
    right: 10rem;
    opacity: .4;
  }

  .icon-3 {
    width: 20rem;
    height: 20rem;
    bottom: 23rem;
    left: 5rem;
    opacity: .4;
  }

  .icon-4 {
    width: 30rem;
    height: 30rem;
    top: 110rem;
    right: 8rem;
    opacity: .4;
  }

  .icon-5 {
    width: 24rem;
    height: 24rem;
    bottom: 5rem;
    right: 10rem;
    opacity: .4;
  }

  .icon-6 {
    width: 28rem;
    height: 28rem;
    top: 55%;
    left: 10rem;
    opacity: .4;
  }

  .icon-7 {
    width: 20rem;
    height: 20rem;
    bottom: -5rem;
    right: -5rem;
    opacity: .4;
  }

  .icon-8 {
    width: 26rem;
    height: 26rem;
    top: 90rem;
    right: -10rem;
    opacity: .4;
  }
}
</style>
