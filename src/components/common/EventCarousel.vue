<template>
  <div id="eventos" class="events-section pv-surface">
    <!-- Luz de fondo cyan -->
    <div class="light-cyan"></div>
    
    <!-- Contenedor principal -->
    <div class="events-container">
      <!-- Título -->
      <div class="events-header">
        <div class="title-group">
          <h2 class="events-title">Próximos Festivales & Eventos</h2>
        </div>
        <router-link to="/calendar" class="calendar-btn">
            <img ref="btnIcon" src="/assets/iconoEventos3.png" alt="Calendario" class="btn-icon" />
            <span>CALENDARIO</span>
        </router-link>  
      </div>

      <!-- Swiper Carousel -->
      <div class="carousel-wrapper">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :centered-slides="true"
          :loop="true"
          :space-between="0"
          class="swiper-container"
        >
          <SwiperSlide v-for="(event, index) in events" :key="event.id" class="event-slide">
            <EventCard 
              :event="event"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import EventCard from './EventCard.vue'
import { getEvents } from '../../services/eventsService'
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import { useScrollFadeInElements } from '../../composables/useScrollFadeIn'

const modules = [Pagination]
const events = getEvents()

// Icono rotativo del botón
const btnIcon = useRotatingIcon(8)

// Scroll fade-in para elementos internos
useScrollFadeInElements('.event-card')
useScrollFadeInElements('.events-title')
useScrollFadeInElements('.calendar-btn')
</script>

<style scoped>
.events-section {
  min-height: 100vh;
  padding: 3rem 1.5rem;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.light-cyan {
  position: absolute;
  top: -10%;
  right: -20%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.events-container {
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 1;
}

@media (min-width: 768px) {
  .events-container {
    max-width: 650px;
  }
}

@media (min-width: 1024px) {
  .events-container {
    max-width: 950px;
  }
}

.carousel-wrapper {
  width: 100%;
  padding: 2rem 0;
}

.events-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .events-header {
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.5rem;
  }
}

.title-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.events-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
}

@media (min-width: 768px) {
  .events-title {
    font-size: 2rem;
  }
}

.calendar-btn {
  padding: 0.5rem 1rem;
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

.btn-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .btn-icon {
    width: 32px;
    height: 32px;
  }
}

.calendar-btn:hover {
  opacity: 0.7;
}

.swiper-container {
  width: 100%;
  overflow: visible;
}

.event-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.4;
  transform: scale(0.8);
  padding: 0 6px;
}

/* Active slide - main card */
:deep(.swiper-slide-active.event-slide) {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

/* Adjacent slides - prev and next */
:deep(.swiper-slide-prev.event-slide),
:deep(.swiper-slide-next.event-slide) {
  opacity: 0.2;
  transform: scale(0.88);
}

:deep(.swiper-wrapper) {
  align-items: center;
}

:deep(.swiper-slide) {
  height: auto;
  width: 220px;
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
  padding-top: 1rem;
}
</style>
