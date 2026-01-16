<template>
  <div id="app" class="w-full">
    <!-- Video de fondo a pantalla completa (solo en Home) -->
    <template v-if="$route.name === 'Home'">
      <video
        class="fixed inset-0 w-full h-full object-cover -z-10"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/assets/fondoMobile.mp4" type="video/mp4" />
      </video>

      <div class="fixed inset-0 bg-black/70 -z-10"></div>

      <!-- Contenido sobre el video -->
      <div class="relative z-10 w-full">
        <router-view />
      </div>
    </template>

    <!-- Para otras rutas (sin video) -->
    <template v-else>
      <router-view />
    </template>

    <!-- Footer global (aparece en todas las vistas) -->
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Footer from './components/common/Footer.vue'
const route = useRoute()
</script>
