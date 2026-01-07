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
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="24"
        :breakpoints="breakpoints"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :loop="true"
        :centered-slides="false"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
        class="swiper-container"
      >
        <SwiperSlide v-for="(event, index) in events" :key="event.id" class="swiper-slide">
          <EventCard 
            :event="event" 
            :is-active="activeSlideIndex === index"
            :is-adjacent="isAdjacentCard(index)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import EventCard from './EventCard.vue'
import { getEvents } from '../../services/eventsService'
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import { useScrollFadeInElements } from '../../composables/useScrollFadeIn'

const modules = [Navigation, Pagination, Autoplay]
const events = getEvents()
const activeSlideIndex = ref(0)

const isAdjacentCard = (index) => {
  const prev = (activeSlideIndex.value - 1 + events.length) % events.length
  const next = (activeSlideIndex.value + 1) % events.length
  return index === prev || index === next
}

const breakpoints = {
  320: {
    slidesPerView: 1.2,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 1.2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 1.3,
    spaceBetween: 16,
    centeredSlides: true,
  },
}


// Icono rotativo del botón
const btnIcon = useRotatingIcon(8)

// Scroll fade-in para elementos internos
useScrollFadeInElements('.event-card')
useScrollFadeInElements('.events-title')
useScrollFadeInElements('.calendar-btn')

const onSwiperInit = (swiper) => {
  updateActiveIndex(swiper)
}

const onSlideChange = (swiper) => {
  updateActiveIndex(swiper)
}

const updateActiveIndex = (swiper) => {
  // Con loop: true, swiper.realIndex te da el índice real sin duplicados
  const index = swiper.realIndex
  activeSlideIndex.value = index
}
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
  padding: 2rem 0 4rem 0;
  position: relative;
  z-index: 1;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 0.2);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 18px;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
}

:deep(.swiper-pagination) {
  bottom: 0;
}
</style>
