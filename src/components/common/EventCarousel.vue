<template>
  <div id="eventos" class="events-section">
    
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

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando eventos...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>❌ {{ error }}</p>
      </div>

      <div v-else-if="!loading && !error" class="artistas-carousel-wrapper">
        <Swiper
        :modules="modules"
        :slides-per-view="1"
        :centered-slides="true"
        :loop="renderedEvents.length > 1"
        :space-between="0"
        class="djs-carousel"
        >
          <SwiperSlide v-for="(event, index) in renderedEvents" :key="`event-${event.id}-${index}`" class="artist-slide">
            <div class="event-card" @click="goToEventDetail(event.id)">
              <div class="event-background">
                <video
                  v-if="event.imagen.includes('.mp4')"
                  autoplay
                  muted
                  loop
                  playsinline
                  class="event-media"
                >
                  <source :src="event.imagen" type="video/mp4" />
                </video>
                <img v-else :src="event.imagen" alt="Event" class="event-media" />

                <!-- Fecha en esquina superior -->
                <div class="event-date">
                  <div class="date-item">
                    <span class="date-label">DÍA</span>
                    <span class="date-number">{{ event.fecha[0] }}</span>
                  </div>
                  <div class="date-item">
                    <span class="date-label">MES</span>
                    <span class="date-number">{{ event.fecha[1] }}</span>
                  </div>
                </div>

                <!-- Info superpuesta en la parte inferior -->
                <div class="event-info">
                  <h3 class="event-dj">{{ event.dj }}</h3>
                  <p class="event-location">{{ event.lugar }}</p>
                  <p class="event-description">{{ event.descripcion }}</p>
                  <div class="event-actions">
                    <button class="event-btn" @click.stop="handleTicketsClick(event)">Tickets</button>
                    <button class="event-btn" @click.stop="goToEventDetail(event.id)">Info</button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>

  <!-- Tickets Modal -->
  <div v-if="showTicketsModal" class="modal-overlay" @click.self="showTicketsModal = false">
    <div class="modal-content">
      <button @click="showTicketsModal = false" class="modal-close">&times;</button>
      <h3 class="modal-title">Comprá tu entrada</h3>
      <div class="modal-tickets">
        <a
          v-for="ticket in selectedEvent?.tickets"
          :key="ticket.id"
          :href="ticket.link_url"
          target="_blank"
          rel="noopener noreferrer"
          class="modal-ticket-btn"
        >
          <span>{{ ticket.ticketer_name }}</span>
          <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { ref, onMounted, computed } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import EventCard from './EventCard.vue'
import { fetchEvents } from '../../services/apiService'
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import { useScrollFadeInElements } from '../../composables/useScrollFadeIn'
import { useRouter } from 'vue-router'

const router = useRouter()
const modules = [Pagination]
const events = ref([])
const loading = ref(true)
const error = ref(null)

// Modal de tickets
const showTicketsModal = ref(false)
const selectedEvent = ref(null)

// Icono rotativo del botón
const btnIcon = useRotatingIcon(8)

const goToEventDetail = (id) => {
  router.push(`/event/${id}`)
}

const handleTicketsClick = (event) => {
  if (!event.tickets || event.tickets.length === 0) {
    return
  }
  
  if (event.tickets.length === 1) {
    // Un solo ticket, redirigir directo
    window.open(event.tickets[0].link_url, '_blank')
  } else {
    // Múltiples tickets, abrir modal
    selectedEvent.value = event
    showTicketsModal.value = true
  }
}

// Computed para replicar eventos si hay menos de 3
const renderedEvents = computed(() => {
  const base = Array.isArray(events.value) ? events.value : []
  if (base.length === 0) return []
  
  // Si hay menos de 3 eventos, replicamos hasta tener al menos 3
  if (base.length < 3) {
    const result = []
    while (result.length < 3) {
      result.push(...base)
    }
    return result.slice(0, 3)
  }
  
  return base
})

onMounted(async () => {
  try {
    const response = await fetchEvents()
    const dataArray = response.data || response
    
    // Transformar datos de la API al formato esperado por EventCard
    events.value = (Array.isArray(dataArray) ? dataArray : []).map(event => ({
      id: event.id,
      dj: event.dj || 'DJ Desconocido',
      fecha: [event.fecha_dia, event.fecha_mes],
      lugar: event.lugar || 'Por definir',
      descripcion: event.descripcion || '',
      imagen: event.media_url || event.artists?.[0]?.image_url || 'https://via.placeholder.com/600x400?text=Evento',
      // Mantener datos originales también
      ...event
    }))
    
    // Scroll fade-in para elementos internos (después de que eventos se cargan)
    setTimeout(() => {
      useScrollFadeInElements('.event-card')
      useScrollFadeInElements('.events-title')
      useScrollFadeInElements('.calendar-btn')
    }, 100)
    
    loading.value = false
  } catch (err) {
    console.error('Error loading events:', err)
    error.value = 'Error cargando eventos'
    loading.value = false
  }
})
</script>

<style scoped>
.event-card {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}


.event-card:hover {
  transform: scale(1.02);
}

.event-background {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  min-height: 500px;
  overflow: hidden;
}

.event-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.event-date {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  min-width: 50px;
}

.date-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: #000;
  letter-spacing: 0.05em;
}

.date-number {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  line-height: 1;
}

.event-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(26, 26, 26, 0.95), transparent);
  z-index: 20;
}

.event-dj {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.event-location {
  font-family: 'Standard', sans-serif;
  font-size: 0.875rem;
  color: #999;
  margin: 0 0 0.75rem 0;
}

.event-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.875rem;
  color: #ccc;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.event-actions {
  display: flex;
  gap: 1rem;
}

.event-btn {
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.event-btn:hover {
  background: #fff;
  color: #000;
}

.artistas-carousel-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 0.5rem 0;
}

@media (min-width: 1024px) {
  .artistas-carousel-wrapper {
    max-width: 600px;
    padding: 0.5rem 0;
  }
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

/* All other slides */
:deep(.swiper-slide-active ~ .artist-slide),
:deep(.artist-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)) {
  opacity: 0.3;
  transform: scale(0.88);
}

.events-section {
  min-height: 100vh;
  padding: 3rem 1.5rem;
  background: transparent;
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

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  z-index: 1;
  position: relative;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #51C1E1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  margin: 0;
}

.error-state {
  text-align: center;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 1rem;
  background: rgba(255, 107, 107, 0.05);
  position: relative;
  z-index: 1;
}

.error-state p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #ff6b6b;
  margin: 0;
}

.events-container {
  width: 100%;
  max-width: 500px !important;
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
  display: flex;
  justify-content: center;
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

/* Tickets Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: black;
  border: 1px solid rgba(81, 193, 225, 0.3);
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.modal-close:hover {
  opacity: 1;
}

.modal-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 1.5rem 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-tickets {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-ticket-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: transparent;
  border: 1px solid #51C1E1;
  border-radius: 1rem;
  color: #51C1E1;
  text-decoration: none;
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
}

.modal-ticket-btn:hover {
  background: rgba(81, 193, 225, 0.2);
  border-color: #FFD25C;
  color: #FFD25C;
  transform: scale(1.02);
}

.external-icon {
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
}

@media (min-width: 768px) {
  .modal-content {
    padding: 2.5rem;
  }

  .modal-title {
    font-size: 1.8rem;
  }
}
</style>
