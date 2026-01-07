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
      <section class="artists-section">
        <!-- Get Tickets Button -->
        <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="event-tickets-btn">
          Obtener Entradas
        </a>

        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="24"
          :pagination="{ clickable: true, dynamicBullets: true }"
          class="djs-swiper"
        >
          <SwiperSlide class="dj-slide">
            <img src="/assets/djPrincipal.png" alt="DJ Principal" class="dj-image" />
          </SwiperSlide>
          <SwiperSlide class="dj-slide">
            <img src="/assets/dj2.png" alt="DJ 2" class="dj-image" />
          </SwiperSlide>
          <SwiperSlide class="dj-slide">
            <img src="/assets/dj3.png" alt="DJ 3" class="dj-image" />
          </SwiperSlide>
          <SwiperSlide class="dj-slide">
            <img src="/assets/dj4.png" alt="DJ 4" class="dj-image" />
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Mesas Section -->
      <section class="sales-section mesas-section">
        <div class="mesas-header">
          <h2 class="mesas-title">MESAS</h2>
        </div>
        <img src="/assets/mesas.png" alt="Mesas" class="mesas-image" @click="openImage('mesas')" />
        <div class="mesas-footer">
          <p class="mesas-description">Reserva tu espacio exclusivo para disfrutar de la mejor experiencia</p>
          <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="mesas-btn">
            <img ref="mesasIcon" src="/assets/iconoEventos3.png" alt="Contactar" class="btn-rotating-icon" />
            Contactar
          </a>
        </div>
      </section>

      <!-- Hospedaje Section -->
      <section class="sales-section hospedaje-section">
        <div class="hospedaje-header">
          <h2 class="hospedaje-title">HOSPEDAJE</h2>
        </div>
        <video autoplay muted loop playsinline class="hospedaje-video" @click="openImage('hospedaje')">
          <source src="/assets/VIDEO_PLAZAS.mp4" type="video/mp4" />
        </video>
        <div class="hospedaje-footer">
          <p class="hospedaje-description">Alojamiento cómodo y exclusivo para tu estadía</p>
          <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="hospedaje-btn">
            <img ref="hospedajeIcon" src="/assets/iconoEventos3.png" alt="Contactar" class="btn-rotating-icon" />
            Contactar
          </a>
        </div>
      </section>

      <!-- Traslados Section -->
      <section class="sales-section traslados-section">
        <div class="traslados-header">
          <h2 class="traslados-title">TRASLADOS</h2>
        </div>
        <img src="/assets/transporte.png" alt="Traslados" class="traslados-image" @click="openImage('traslados')" />
        <div class="traslados-footer">
          <p class="traslados-description">Transporte seguro y cómodo desde CABA</p>
          <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" class="traslados-btn">
            <img ref="trasladosIcon" src="/assets/iconoEventos3.png" alt="Contactar" class="btn-rotating-icon" />
            Contactar
          </a>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRotatingIcon } from '../composables/useRotatingIcon'

const modules = [Pagination]
const eventIcon = useRotatingIcon(8)
const mesasIcon = useRotatingIcon(8)
const hospedajeIcon = useRotatingIcon(8)
const trasladosIcon = useRotatingIcon(8)

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
  height: 40px;
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

/* Artists Section */
.artists-section {
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.djs-swiper {
  width: 100%;
  padding: 2rem 0 4rem 0;
}

.dj-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dj-image {
  width: 310px;
  height: 560px;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 20px 60px rgba(81, 193, 225, 0.15);
  transition: all 0.3s ease;
}

.dj-slide:hover .dj-image {
  box-shadow: 0 30px 80px rgba(81, 193, 225, 0.25);
  transform: scale(1.02);
}

/* Mesas Section */
.mesas-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem !important;
}

.mesas-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.mesas-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.mesas-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.mesas-image:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(255, 210, 92, 0.2);
}

.mesas-footer {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.mesas-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-weight: 300;
}

.mesas-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: .5px solid #fff;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mesas-btn:hover {
  border-color: #FFD25C;
  color: #FFD25C;
  transform: scale(1.05);
}

.btn-rotating-icon {
  width: 24px;
  height: 24px;
}

/* Hospedaje Section */
.hospedaje-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem !important;
}

.hospedaje-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.hospedaje-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.hospedaje-video {
  width: 100%;
  max-width: 400px;
  height: 600px;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  object-fit: cover;
}

.hospedaje-video:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(81, 193, 225, 0.2);
}

.hospedaje-footer {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.hospedaje-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-weight: 300;
}

.hospedaje-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: .5px solid #fff;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hospedaje-btn:hover {
  border-color: #FFD25C;
  color: #FFD25C;
  transform: scale(1.05);
}

/* Traslados Section */
.traslados-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem !important;
}

.traslados-header {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.traslados-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.traslados-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.traslados-image:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(255, 210, 92, 0.2);
}

.traslados-footer {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.traslados-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-weight: 300;
}

.traslados-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: .5px solid #fff;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.traslados-btn:hover {
  border-color: #FFD25C;
  color: #FFD25C;
  transform: scale(1.05);
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
