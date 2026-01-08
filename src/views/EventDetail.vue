<template>
  <div class="event-detail-view">
    <!-- Luces de fondo decorativas -->
    <div class="bg-light-cyan-1"></div>
    <div class="bg-light-indigo"></div>
    <div class="bg-light-yellow"></div>
    <!-- Video Section (3/4 height, fixed background) -->
    <section class="video-section">
      <video autoplay muted loop playsinline class="hero-video">
        <source src="/assets/promo_lineup.mp4" type="video/mp4" />
      </video>
      
      <!-- Dark overlay -->
      <div class="video-dark-overlay"></div>
      
      <!-- Back button (outside overlay for positioning) -->
      <router-link to="/" class="back-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </router-link>
      
      <!-- Event info overlay -->
      <div class="video-content-overlay">
        
        <!-- Top right logo/info -->
        <div class="video-top-right">
          <img src="/assets/isotipoBlanco.png" alt="Pura Vida" class="video-logo" />
          <p class="video-weekend"></p>
        </div>

        <!-- Main content center -->
        <div class="event-hero-info">
          <div class="event-hero-badge">
            <span>PURA:VIDA PRESENTS</span>
          </div>
          <h1 class="event-hero-title">Mariano Mellino</h1>
          <div class="event-hero-details">
            <p class="hero-location">Hotel Termas de Victoria, Entre Ríos</p>
          </div>
          
          <!-- Circular icons section -->
          <div class="event-hero-icons">
            <div class="hero-icon-item">
              <img src="/assets/iconoEventos3.png" alt="Eventos" />
            </div>
            <div class="hero-icon-item">
              <img src="/assets/iconoComunidad3.png" alt="Comunidad" />
            </div>
            <div class="hero-icon-item">
              <img src="/assets/iconoExperiencia1.png" alt="Experiencia" />
            </div>
          </div>
        </div>

        <!-- Bottom left info -->
        <div class="video-bottom-left">
          <p class="bottom-date">17 JUL</p>
          <p class="bottom-subtitle">Ritual de conexión bajo las estrellas</p>
        </div>
      </div>
    </section>

    <!-- Content Wrapper -->
    <div class="event-content pv-surface">
      <!-- DJs/Artistas Section -->
      <section class="py-3 px-3 sm:py-4 sm:px-4 border-t border-white border-opacity-10 flex flex-col items-center">
        <!-- Header -->
        <div class="text-center mb-2">
          <h2 class="font-napzer sm:text-lg text-white font-semibold tracking-wide text-2xl lg:text-4xl mt-6">ARTISTAS</h2>
          <p class="font-standard text-xs text-cyan-400 mt-0.5 lg:text-1xl">Desliza para conocer</p>
        </div>

        <!-- Get Tickets Button -->
        <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="inline-block mb-2 px-3 sm:px-4 py-1 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-semibold uppercase tracking-wider rounded-full transition-all">
          Entradas
        </a>

        <!-- Carousel -->
        <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg py-6">
          <Swiper
          :modules="modules"
          :slides-per-view="1"
          :centered-slides="true"
          :loop="true"
          :space-between="0"
          class="djs-carousel"
          >
            <SwiperSlide v-for="(artist, index) in djArtists" :key="artist.id" class="artist-slide">
              <div class="artist-card">
                <div class="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-cyan-400 bg-opacity-10">
                  <img :src="artist.image" :alt="artist.name" class="artist-image w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div class="absolute bottom-0 left-0 right-0 p-2">
                    <h3 class="font-napzer text-xs sm:text-sm text-white font-semibold leading-tight">{{ artist.name }}</h3>
                    <p class="font-standard text-xs text-cyan-400 mt-0.5 leading-none">{{ artist.genre }}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <!-- Mesas Section -->
      <section class="mesas-section">
        <div class="mesas-container">
          <!-- Columna izquierda - Contenido -->
          <div class="mesas-content">
            <div class="mesas-text-group">
              <h2 class="mesas-title">Mesas VIP & Backstage</h2>
              <p class="mesas-subtitle">Viví la experiencia más exclusiva de Pura Vida</p>
              <p class="mesas-description">Consultá por beneficios y disponibilidad para reservar tu espacio en la mejor zona del evento</p>
            </div>
            <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="mesas-btn">
              <img ref="mesasIcon" src="/assets/iconoEventos3.png" alt="Contactar" class="btn-rotating-icon" />
              <span>Consultar mesas VIP</span>
            </a>
          </div>

          <!-- Columna derecha - Imagen -->
          <div class="mesas-image-wrapper">
            <img src="/assets/mesas.png" alt="Mesas" class="mesas-image" @click="openImage('mesas')" />
          </div>
        </div>
      </section>

      <!-- Experiencia Completa Section -->
      <section class="experiencia-section">
        <div class="experiencia-container">
          <!-- Header -->
          <div class="experiencia-header">
            <h2 class="experiencia-title">Experiencia Completa</h2>
            <p class="experiencia-subtitle">Disfrutá Pura Vida sin preocuparte por nada</p>
          </div>

          <!-- Grid de bloques -->
          <div class="experiencia-blocks">
            <!-- Hospedaje Block -->
            <div class="experiencia-block">
              <div class="block-media">
                <video autoplay muted loop playsinline class="block-video" @click="openImage('hospedaje')">
                  <source src="/assets/VIDEO_PLAZAS.mp4" type="video/mp4" />
                </video>
              </div>
              <div class="block-content">
                <h3 class="block-title">Hospedaje</h3>
                <p class="block-description">Opciones de hospedaje cercanas y seguras para tu descanso</p>
              </div>
            </div>

            <!-- Traslado Block -->
            <div class="experiencia-block">
              <div class="block-media">
                <img src="/assets/transporte.png" alt="Traslado" class="block-image" @click="openImage('traslados')" />
              </div>
              <div class="block-content">
                <h3 class="block-title">Traslado</h3>
                <p class="block-description">Transporte cómodo y coordinado ida y vuelta desde CABA</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="experiencia-cta">
            <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="experiencia-btn">
              <img ref="experienciaIcon" src="/assets/iconoComunidad3.png" alt="Contactar" class="btn-rotating-icon" />
              <span>Consulta por nuestra experiencia</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRotatingIcon } from '../composables/useRotatingIcon'
import { getDJArtists } from '../services/eventsService'

const modules = [Pagination]
const djArtists = getDJArtists()


const onDJSwiperInit = () => {
  // Initialized
}

const onDJSlideChange = () => {
  // Slide changed
}

const eventIcon = useRotatingIcon(8)
const mesasIcon = useRotatingIcon(8)
const experienciaIcon = useRotatingIcon(8)

const openImage = (type) => {
  // Por ahora solo log, luego implementaremos modal
  console.log(`Abriendo ${type}`)
}
</script>

<style scoped>
.event-detail-view {
  width: 100%;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* Background Lights */
.bg-light-cyan-1 {
  position: fixed;
  top: 200px;
  right: -50px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.35) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
}

.bg-light-indigo {
  position: fixed;
  top: 600px;
  left: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79, 72, 152, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
}

.bg-light-yellow {
  position: fixed;
  bottom: 200px;
  right: 30%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(255, 210, 92, 1) 0%, transparent 90%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
}

/* Video Section - 3/4 of viewport, fixed background */
.video-section {
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: visible;
  z-index: 10;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.video-content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 2;
  overflow: visible;
}

.video-top-right {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

.video-logo {
  width: 60px;
  height: 60px;
  opacity: 0.8;
}

.video-weekend {
  font-family: 'Standard', sans-serif;
  font-size: 0.65rem;
  color: #999;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.video-bottom-left {
  position: absolute;
  bottom: 3.5rem;
  left: 1.5rem;
}

.bottom-date {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #FFD25C;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.bottom-subtitle {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #999;
  margin: 0;
  font-weight: 300;
  max-width: 200px;
  line-height: 1.4;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  z-index: 3;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.event-hero-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  align-items: center;
  max-width: 600px;
}

.event-hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  width: fit-content;
}

.event-hero-badge span {
  font-family: 'Standard', sans-serif;
  font-size: 0.7rem;
  color: #4F4898;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.event-hero-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 3rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
  line-height: 1.1;
}

.event-hero-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-date {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.25rem;
  color: #FFD25C;
  margin: 0;
  font-weight: 600;
}

.hero-location {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  margin: 0;
  font-weight: 300;
}

.event-hero-icons {
  position: absolute;
  bottom: -28px;
  left: 0;
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  z-index: 15;
  width: 100%;
  padding: 0 1.5rem;
}

.hero-icon-item {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.hero-icon-item:hover {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.hero-icon-item img {
  width: 28px;
  height: 28px;
  opacity: 1;
}

.event-tickets-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: #FFD25C;
  color: #000;
  text-decoration: none;
  border-radius: 2rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.event-tickets-btn:hover {
  background: #FFE47C;
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 210, 92, 0.4);
}

/* Event Info Section */
.event-info-section {
  position: relative;
  z-index: 20;
  padding: 4rem 1.5rem 3rem;
  background: #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-container {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.title-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.event-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.event-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2.2rem;
  margin: 0;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
}

.event-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.75rem 0;
  margin-bottom: 2rem;
}

.badge-date {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  color: #FFD25C;
  font-weight: 500;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.badge-location {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #999;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.event-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-weight: 300;
  max-width: 600px;
}

.tickets-btn {
  display: inline-block;
  padding: 0.75rem 2.5rem;
  background: #FFD25C;
  color: #000;
  border-radius: 2rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 1rem;
}

.tickets-btn:hover {
  background: #FFE47C;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 210, 92, 0.3);
}

.djs-carousel {
  width: 100%;
  padding-bottom: 1rem;
  overflow: visible;
  display: flex;
  justify-content: center;
}

.artist-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.4;
  transform: scale(0.8);
  padding: 0 6px;
}

/* Active slide - main card */
:deep(.swiper-slide-active.artist-slide) {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

/* Adjacent slides - prev and next */
:deep(.swiper-slide-prev.artist-slide),
:deep(.swiper-slide-next.artist-slide) {
  opacity: 0.65;
  transform: scale(0.88);
}

:deep(.swiper-wrapper) {
  align-items: center;
}

:deep(.swiper-slide) {
  height: auto;
  width: 220px;
}

/* All other slides */
:deep(.swiper-slide-active ~ .artist-slide),
:deep(.artist-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)) {
  opacity: 0.3;
  transform: scale(0.88);
}

.artist-card {
  width: 100%;
  cursor: pointer;
}

.artist-image {
  transition: transform 0.3s ease;
}

:deep(.swiper-slide-active) .artist-image {
  transform: scale(1.03);
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3) !important;
  width: 5px !important;
  height: 5px !important;
  margin: 0 2px !important;
  transition: all 0.3s ease !important;
}

:deep(.swiper-pagination-bullet-active) {
  background: #51C1E1 !important;
  width: 8px !important;
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}

/* Mesas Section */
.mesas-section {
  padding: 4rem 1.5rem;
  background: #000;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mesas-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .mesas-container {
    grid-template-columns: 40% 60%;
  }
}

.mesas-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

.mesas-text-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mesas-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .mesas-title {
    font-size: 1.75rem;
  }
}

.mesas-subtitle {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #51C1E1;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.mesas-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

.mesas-image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) {
  .mesas-image-wrapper {
    transform: translateY(-2rem);
  }
}

.mesas-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(81, 193, 225, 0.2);
}

.mesas-image:hover {
  transform: scale(1.03);
  box-shadow: 0 25px 60px rgba(81, 193, 225, 0.25);
}

.mesas-btn {
  display: inline-flex;
  background: transparent;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1rem;
  border: .5px solid #fff;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #000;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
  color: #fff;

}

.btn-rotating-icon {
  width: 32px;
  height: 32px;
}

/* Experiencia Completa Section */
.experiencia-section {
  padding: 4rem 1.5rem;
  background: #000;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.experiencia-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.experiencia-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.experiencia-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .experiencia-title {
    font-size: 1.75rem;
  }
}

.experiencia-subtitle {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #51C1E1;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.experiencia-blocks {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .experiencia-blocks {
    grid-template-columns: repeat(2, 1fr);
  }
}

.experiencia-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.experiencia-block:hover {
  transform: translateY(-5px);
}

.block-media {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  aspect-ratio: 4 / 5;
}

.block-video,
.block-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.875rem;
}

.block-media:hover .block-video,
.block-media:hover .block-image {
  transform: scale(1.03);
}

.block-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
}

.block-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.block-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

.experiencia-cta {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.experiencia-btn {
  padding: 1rem 1rem;
  background: transparent;
  border: .5px solid #fff;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
  text-decoration: none;
}


/* Content Sections */
.event-content {
  position: relative;
  z-index: 5;
  padding: 0;
  background: #000;
}

.sales-section {
  padding: 3rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: black;
}

.section-with-image {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.section-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  opacity: 0.9;
}

.section-info {
  flex: 1;
}

.section-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #FFD25C;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.section-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.contact-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #FFD25C;
  color: #000;
  border-radius: 2rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-btn:hover {
  background: #FFE47C;
  transform: translateY(-2px);
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #FFD25C;
}

:deep(.swiper-pagination) {
  bottom: 0;
}
</style>
