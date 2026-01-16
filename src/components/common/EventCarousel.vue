<template>
  <div id="eventos" class="events-section">
    <!-- HEADER SECTION -->
    <div class="events-header-wrapper">
      <div class="events-header-container">
        <div class="events-header">
          <div class="title-group">
            <h2 class="events-title">Próximos Festivales & Eventos</h2>
          </div>
          <router-link to="/calendar" class="calendar-btn">
            <img ref="btnIcon" src="/assets/iconoEventos3.png" alt="Calendario" class="btn-icon" />
            <span>CALENDARIO</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- CAROUSEL SECTION -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando eventos...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>❌ {{ error }}</p>
    </div>

    <SwiperCarousel 
      v-else-if="events.length > 0"
      :events="events"
      @cardClick="goToEventDetail"
      @infoClick="goToEventDetail"
      @ticketsClick="handleTicketsClick"
    />

    <div v-else class="no-events">
      <p>No hay eventos disponibles</p>
    </div>
  </div>

  <!-- Tickets Modal - Teleported to body to escape Swiper's transform -->
  <Teleport to="body">
    <div v-if="showTicketsModal" class="modal-overlay" @click.self="showTicketsModal = false">
      <div class="modal-content">
        <button @click="showTicketsModal = false" class="modal-close">&times;</button>
        <h3 class="modal-title">Seleccioná una ticketera</h3>
        <div class="modal-tickets">
          <a
            v-for="ticket in selectedEvent?.tickets"
            :key="`${ticket.id}-${ticket.url || ticket.link_url}`"
            :href="ticket.url || ticket.link_url"
            target="_blank"
            rel="noopener noreferrer"
            class="modal-ticket-btn"
          >
            <span>{{ ticket.name || ticket.ticketer_name }}</span>
            <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchEvents } from '../../services/apiService'
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import SwiperCarousel from './SwiperCarousel.vue'

// Teleport está disponible globalmente en Vue 3

const router = useRouter()
const events = ref([])
const loading = ref(true)
const error = ref(null)

// Modal de tickets
const showTicketsModal = ref(false)
const selectedEvent = ref(null)

// Icono rotativo del botón
const btnIcon = useRotatingIcon(8)

const goToEventDetail = (event) => {
  router.push(`/event/${event.id}`)
}

const handleTicketsClick = (event) => {
  if (!event.tickets || event.tickets.length === 0) {
    return
  }
  
  if (event.tickets.length === 1) {
    // Un solo ticket, redirigir directo
    window.open(event.tickets[0].url || event.tickets[0].link_url, '_blank')
  } else {
    // Múltiples tickets, abrir modal para seleccionar
    selectedEvent.value = event
    showTicketsModal.value = true
  }
}

// Controlar scroll del body cuando el modal está abierto
watch(showTicketsModal, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

onMounted(async () => {
  try {
    const response = await fetchEvents()
    const dataArray = response.data || response
    
    // Transformar datos de la API al formato esperado
    events.value = (Array.isArray(dataArray) ? dataArray : []).map(event => ({
      id: event.id,
      dj: event.dj || 'DJ Desconocido',
      fecha: [event.fecha_dia, event.fecha_mes],
      fecha_dia: event.fecha_dia || null,
      fecha_mes: event.fecha_mes || null,
      lugar: event.lugar || 'Por definir',
      descripcion: event.descripcion || '',
      title: event.title || event.dj || 'Evento sin nombre',
      media_url: event.media_url || 'https://via.placeholder.com/600x400?text=Evento',
      tickets: event.tickets || [],
      ...event
    }))
    
    loading.value = false
  } catch (err) {
    console.error('Error loading events:', err)
    error.value = 'Error cargando eventos'
    loading.value = false
  }
})
</script>

<style scoped>
.events-section {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-bottom: 3rem;
}

/* HEADER SECTION */
.events-header-wrapper {
  width: 100%;
  padding: 3rem 1.5rem 2rem 1.5rem;
  position: relative;
  z-index: 1;
}

.events-header-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

@media (min-width: 768px) {
  .events-header-wrapper {
    padding: 3rem 2rem 2rem 2rem;
  }

  .events-header-container {
    max-width: 100%;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .events-header-wrapper {
    padding: 3rem 3rem 2rem 3rem;
  }

  .events-header-container {
    max-width: 100%;
    padding: 0 3rem;
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
}

@media (min-width: 768px) {
  .events-header {
    flex-direction: row;
    align-items: center;
  }
}

.title-group {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  border: 0.5px solid #fff;
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

/* LOADING & ERROR STATES */
.loading-state,
.error-state,
.no-events {
  width: 100%;
  flex: 1;
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
.error-state p,
.no-events p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  margin: 0;
}

.error-state p {
  color: #ff6b6b;
}

/* Tickets Modal */
/* ================== MODAL STYLES ================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(6px);
  padding: 1rem;
}

/* Deshabilitar scroll de la página cuando modal está abierto */
:global(body.modal-open) {
  overflow: hidden;
}

.modal-content {
  background: #000;
  border: 1px solid rgba(79, 72, 152, 0.15);
  border-radius: 1.2rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.modal-close:hover {
  color: #4F4898;
  transform: rotate(90deg);
}

.modal-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.35rem;
  color: #fff;
  margin: 0 0 1.75rem 0;
  text-align: center;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.modal-tickets {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.modal-ticket-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(79, 72, 152, 0.05);
  border: 1px solid rgba(79, 72, 152, 0.15);
  border-radius: 0.8rem;
  color: #51C1E1;
  text-decoration: none;
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.25s ease;
  cursor: pointer;
}

.modal-ticket-btn:hover {
  background: rgba(79, 72, 152, 0.1);
  border-color: #4F4898;
  color: #4F4898;
  transform: translateX(4px);
}

.modal-ticket-btn:active {
  transform: translateX(2px);
}

.external-icon {
  width: 16px;
  height: 16px;
  margin-left: 0.75rem;
  transition: transform 0.25s ease;
}

.modal-ticket-btn:hover .external-icon {
  transform: translateX(3px);
}

@media (min-width: 768px) {
  .modal-content {
    padding: 2.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>
