<template>
  <div class="calendar-view">
    <!-- Luces de fondo cyan esparcidas -->
    <div class="bg-light-cyan-1"></div>
    <div class="bg-light-cyan-2"></div>
    <div class="bg-light-cyan-3"></div>
    
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido scrolleable -->
    <div class="calendar-content">
      <!-- Header -->
      <div class="calendar-header">
        <router-link to="/" class="back-btn">← Volver</router-link>
        <div class="header-title-group">
          <img ref="headerIcon" src="/assets/iconoEventos3.png" alt="Eventos" class="header-icon" />
          <h1 class="page-title">Upcoming events</h1>
        </div>
      </div>

      <!-- Sección de carrousel destacado (MISMA ESTÉTICA QUE EventCarousel) -->
      <section class="featured-carousel-section">
        <div class="carousel-wrapper">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="24"
            :pagination="{ clickable: true, dynamicBullets: true }"
            :loop="true"
            class="swiper-container"
          >
            <SwiperSlide v-for="event in allEvents" :key="event.id" class="swiper-slide">
              <EventCard :event="event" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <!-- Separador -->
      <div class="section-divider"></div>

      <!-- Sección de eventos por mes - MINIMALISTA CON PREVIEW VIDEO -->
      <section class="events-by-month-section">
        <div v-for="month in eventsByMonth" :key="month.monthYear" class="month-group">
          <h3 class="month-title">{{ month.monthYear }}</h3>
          
          <div class="events-minimal-list">
            <div v-for="event in month.events" :key="event.id" class="event-minimal-card">
              <!-- Video preview mini izquierda -->
              <div class="event-video-preview">
                <video
                  v-if="event.imagen.includes('.mp4')"
                  autoplay
                  muted
                  loop
                  class="preview-video"
                >
                  <source :src="event.imagen" type="video/mp4" />
                </video>
                <div v-else class="preview-placeholder"></div>
              </div>

              <!-- Información derecha -->
              <div class="event-minimal-info">
                <div class="info-header">
                  <h4 class="event-dj-name">{{ event.dj }}</h4>
                  <span class="event-date">{{ event.fecha[0] }}/{{ event.fecha[1] }}</span>
                </div>
                <p class="event-location">{{ event.lugar }}</p>
                <p class="event-short-desc">{{ event.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Navbar from '../components/common/Navbar.vue'
import EventCard from '../components/common/EventCard.vue'
import { getEvents, getPastEvents } from '../services/eventsService'
import { useRotatingIcon } from '../composables/useRotatingIcon'

const modules = [Navigation, Pagination, Autoplay]
const allEvents = computed(() => [...getEvents(), ...getPastEvents()])

// Hacer que el icono gire
const headerIcon = useRotatingIcon(8)

// Agrupar eventos por mes/año
const eventsByMonth = computed(() => {
  const grouped = {}
  
  allEvents.value.forEach(event => {
    const monthMap = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    }
    
    const monthName = monthMap[event.fecha[1]]
    const year = '2025'
    const monthYear = `${monthName}, ${year}`
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = []
    }
    
    grouped[monthYear].push(event)
  })
  
  return Object.entries(grouped).map(([monthYear, events]) => ({
    monthYear,
    events: events.sort((a, b) => parseInt(a.fecha[0]) - parseInt(b.fecha[0])),
  }))
})
</script>

<style scoped>
.calendar-view {
  width: 100%;
  min-height: 100vh;
  background: #000;
  position: relative;
}

.bg-light-cyan-1 {
  position: absolute;
  top: 30%;
  left: 25%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(81, 193, 225, .17) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.bg-light-cyan-2 {
  position: absolute;
  top: 50%;
  right: 30%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.17) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.bg-light-cyan-3 {
  position: absolute;
  bottom: 5%;
  left: 30%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.calendar-content {
  padding-top: 80px;
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.calendar-header {
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.header-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.back-btn {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #999;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  white-space: nowrap;
}

.back-btn:hover {
  color: #FFD25C;
  padding-left: 1.5rem;
}

.page-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
}

/* SECCIÓN CARROUSEL - MISMA ESTÉTICA QUE EventCarousel */
.featured-carousel-section {
  padding: 3rem 1.5rem;
  background: #000;
  position: relative;
}

.carousel-wrapper {
  width: 100%;
}

.swiper-container {
  width: 100%;
  padding-bottom: 3rem;
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

.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 210, 92, 0.2), transparent);
}

/* SECCIÓN MINIMALISTA CON PREVIEW VIDEO */
.events-by-month-section {
  padding: 3rem 1.5rem;
}

.month-group {
  margin-bottom: 3.5rem;
}

.month-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 1.75rem 0;
  font-weight: 600;
}

.events-minimal-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.event-minimal-card {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background: rgba(255, 210, 92, 0.01);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 210, 92, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
}

.event-minimal-card:hover {
  background: rgba(255, 210, 92, 0.03);
  border-color: rgba(255, 210, 92, 0.12);
}

.event-video-preview {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(81, 193, 225, 0.1), rgba(255, 210, 92, 0.05));
  border: 1px solid rgba(255, 210, 92, 0.1);
}

.preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.event-minimal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.event-dj-name {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
}

.event-date {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #51C1E1;
  font-weight: 600;
  flex-shrink: 0;
}

.event-location {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #51C1E1;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.event-short-desc {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #999;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .calendar-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
  }

  .header-title-group {
    width: 100%;
  }

  .header-icon {
    width: 40px;
    height: 40px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .back-btn {
    font-size: 0.85rem;
  }

  .featured-carousel-section {
    padding: 2rem 1.5rem;
  }

  .events-by-month-section {
    padding: 2rem 1.5rem;
  }

  .event-video-preview {
    width: 100px;
    height: 100px;
  }

  .event-dj-name {
    font-size: 1rem;
  }

  .month-title {
    font-size: 1.25rem;
  }
}
</style>
