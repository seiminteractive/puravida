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

      <!-- Sección de carrousel destacado (Carousel de Swiper) -->
      <section class="featured-carousel-section">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando eventos...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>❌ {{ error }}</p>
        </div>

        <!-- Carousel Swiper -->
        <SwiperCarousel 
          v-else
          :events="events"
          @cardClick="goToEventDetail"
          @infoClick="goToEventDetail"
          @ticketsClick="handleTicketsClick"
        />
      </section>

      <!-- Separador -->
      <div class="section-divider"></div>

      <!-- Sección de eventos por mes - MINIMALISTA CON PREVIEW VIDEO -->
      <section class="events-by-month-section">
        <div class="events-by-month-wrapper">
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

        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/common/Navbar.vue'
import { fetchEvents } from '../services/apiService'
import { useRotatingIcon } from '../composables/useRotatingIcon'
import SwiperCarousel from '../components/common/SwiperCarousel.vue'

const router = useRouter()
const events = ref([])
const loading = ref(true)
const error = ref(null)
const currentSlide = ref(0)
let autoplayInterval = null

// Hacer que el icono gire
const headerIcon = useRotatingIcon(8)

const goToEventDetail = (event) => {
  router.push(`/event/${event.id}`)
}

const handleTicketsClick = (event) => {
  if (!event.tickets || event.tickets.length === 0) {
    return
  }
  
  if (event.tickets.length === 1) {
    window.open(event.tickets[0].link_url, '_blank')
  } else {
    // Multiple tickets could show a modal here
    window.open(event.tickets[0].link_url, '_blank')
  }
}


// Transformar datos de API al formato esperado
const transformEventData = (event) => ({
  id: event.id,
  dj: event.dj || 'DJ Desconocido',
  fecha: [event.fecha_dia, event.fecha_mes],
  lugar: event.lugar || 'Por definir',
  descripcion: event.descripcion || '',
  imagen: event.media_url || event.artists?.[0]?.image_url || 'https://via.placeholder.com/600x400?text=Evento',
  ...event
})

// Agrupar eventos por mes/año
const eventsByMonth = computed(() => {
  const grouped = {}
  
  events.value.forEach(event => {
    const monthMap = {
      '01': 'Enero',
      '02': 'Febrero',
      '03': 'Marzo',
      '04': 'Abril',
      '05': 'Mayo',
      '06': 'Junio',
      '07': 'Julio',
      '08': 'Agosto',
      '09': 'Septiembre',
      '10': 'Octubre',
      '11': 'Noviembre',
      '12': 'Diciembre',
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

onMounted(async () => {
  try {
    const response = await fetchEvents()
    const dataArray = response.data || response
    
    events.value = (Array.isArray(dataArray) ? dataArray : []).map(transformEventData)
    loading.value = false
  } catch (err) {
    console.error('Error loading events:', err)
    error.value = 'Error cargando eventos'
    loading.value = false
  }
})

</script>

<style scoped>
.calendar-view {
  width: 100%;
  min-height: 100vh;
  background: #000;
  position: relative;
}

.bg-light-cyan-2 {
  position: absolute;
  top: 65%;
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

@media (min-width: 1024px) {
  .calendar-header {
    padding: 2rem 4rem;
    gap: 2rem;
  }
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

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  position: relative;
  z-index: 1;
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

.loading-state p,
.error-state p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  margin: 0;
}

.error-state p {
  color: #ff6b6b;
}

/* SECCIÓN CARROUSEL - SWIPER */
.featured-carousel-section {
  background: #000;
  position: relative;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 210, 92, 0.2), transparent);
  margin: 2rem 0;
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
  line-clamp: 2;
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
