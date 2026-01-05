<template>
  <div class="w-full">
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
        <div class="mb-2 flex justify-center">
          <img
            src="/assets/logoTipograficoBlancoCortado.png"
            alt="Pura Vida"
            class="h-70 w-auto px-5"
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

    <!-- Carrusel de Fechas Pasadas -->
    <PastEventsCarousel />

    <!-- WhatsApp CTA -->
    <WhatsAppCTA />
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
