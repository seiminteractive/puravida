<template>
  <div class="event-detail-view">
    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando evento...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <p>Error cargando evento: {{ error }}</p>
      <router-link to="/" class="back-link">Volver</router-link>
    </div>

    <!-- Event content -->
    <div v-else>
      <!-- Video Section (3/4 height, fixed background) -->
      <section class="video-section">
        <video v-if="isVideoMedia" autoplay muted loop playsinline class="hero-video">
          <source :src="heroMedia" type="video/mp4">
        </video>
        <img v-else :src="heroMedia" alt="Event" class="hero-image">
        
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
            <img src="/assets/isotipoBlanco.png" alt="Pura Vida" class="video-logo">
            <p class="video-weekend"></p>
          </div>

          <!-- Main content center -->
          <div class="event-hero-info">
            <div class="event-hero-badge">
              <span>PURA:VIDA PRESENTS</span>
            </div>
            <h1 class="event-hero-title">{{ event?.dj || 'DJ Desconocido' }}</h1>
            <div class="event-hero-details">
              <p class="hero-location">{{ event?.lugar || 'Ubicación no disponible' }}</p>
            </div>
            
            <!-- Circular icons section -->
            <div class="event-hero-icons">
              <div class="hero-icon-item">
                <img src="/assets/iconoEventos3.png" alt="Eventos">
              </div>
              <div class="hero-icon-item">
                <img src="/assets/iconoComunidad3.png" alt="Comunidad">
              </div>
              <div class="hero-icon-item">
                <img src="/assets/iconoExperiencia1.png" alt="Experiencia">
              </div>
            </div>
          </div>

          <!-- Bottom left info -->
          <div class="video-bottom-left">
            <p class="bottom-date">{{ formatDate(event?.fecha_dia, event?.fecha_mes) }}</p>
            <p class="bottom-subtitle">{{ event?.descripcion || 'Descripción no disponible' }}</p>
          </div>
        </div>
      </section>

      <!-- Content Wrapper -->
      <div class="event-content pv-surface">
      <!-- DJs/Artistas Section -->
      <section class="artistas-section">
        <!-- Tickets Header Container -->
        <div class="entradas-header-container">
          <!-- Title -->
          <h2 class="entradas-header-title">Viví la experiencia completa</h2>
          
          <!-- Description -->
          <p class="entradas-header-desc">Acceso a la mejor música, ambiente exclusivo y conexión espiritual con nuestra comunidad</p>
        </div>

        <!-- Get Tickets Button -->
        <button 
          @click="handleTicketsClick(event)"
          class="entradas-btn"
        >
          Obtener Entradas
        </button>

        <!-- Carousel -->
        <div class="artistas-carousel-wrapper">
          <SwiperCarousel 
            :events="djEventsForCarousel"
            :hideDetails="true"
            @cardClick="handleArtistClick"
          />
        </div>
      </section>

      <!-- Mesas Section -->
      <section class="mesas-section" v-if="event?.mesas?.enabled">
        <div class="mesas-container">
          <!-- Columna izquierda - Contenido -->
          <div class="mesas-content">
            <div class="mesas-text-group">
              <h2 class="mesas-title">Mesas VIP & Backstage</h2>
              <p class="mesas-subtitle">Viví la experiencia más exclusiva de Pura Vida</p>
              <p class="mesas-description">{{ event.mesas.description || 'Consultá por beneficios y disponibilidad para reservar tu espacio en la mejor zona del evento' }}</p>
            </div>
            <a
              href="https://wa.me/5493415492478?text=%C2%A1Hola%20Pura%20Vida!%20Me%20interesa%20reservar%20una%20mesa%20VIP%20para%20el%20evento."
              target="_blank"
              rel="noopener"
              class="mesas-btn"
            >
              <img ref="mesasIcon" src="/assets/iconoEventos3.png" alt="Contactar" class="btn-rotating-icon" />
              <span>Consultar mesas VIP</span>
            </a>
          </div>

          <!-- Columna derecha - Imagen -->
          <div class="mesas-image-wrapper">
                <img :src="event.mesas.image_url" alt="Mesas" class="mesas-image" @click="openImage('mesas')">
          </div>
        </div>
      </section>

      <!-- Experiencia Completa Section -->
      <section v-if="lodgingData?.enabled || transportsData.length > 0" class="experiencia-section">
        <div class="experiencia-container">
          <!-- Header -->
          <div class="experiencia-header text-left sm:text-center">
            <h2 class="experiencia-title">Experiencia Completa</h2>
            <p class="experiencia-subtitle">Disfrutá Pura Vida sin preocuparte por nada</p>
          </div>

          <!-- Grid de bloques -->
          <div class="experiencia-blocks" :class="activeBlocksCount === 1 ? 'single-block' : ''">
            <!-- Hospedaje Block -->
            <div v-if="lodgingData && lodgingData.enabled" class="experiencia-block">
              <!-- Title -->
              <h3 class="block-title-top">Hospedaje</h3>
              <!-- Media Card -->
              <div class="block-media">
                <video v-if="lodgingData.image_url?.includes('mp4')" autoplay muted loop playsinline class="block-video" @click="openImage('hospedaje')">
                  <source :src="lodgingData.image_url" type="video/mp4">
                </video>
                <img v-else :src="lodgingData.image_url" alt="Hospedaje" class="block-image" @click="openImage('hospedaje')">
              </div>
              <!-- Description & Button -->
              <div class="block-content">
                <p class="block-description">{{ lodgingData.description || 'Opciones de hospedaje cercanas y seguras para tu descanso' }}</p>
                <a
              href="https://wa.me/5493415492478?text=%C2%A1Hola%20Pura%20Vida!%20Me%20gustar%C3%ADa%20consultar%20las%20opciones%20de%20hospedaje%20para%20el%20evento."
              target="_blank"
              rel="noopener"
              class="block-btn"
            >
                  <img src="/assets/iconoEventos3.png" alt="Consultar" class="block-btn-icon">
                  <span class="block-btn-text">Consultar hospedaje</span>
                </a>
              </div>
            </div>

            <!-- Traslado Block -->
            <div v-for="transport in transportsData" :key="transport.id" class="experiencia-block">
              <!-- Title -->
              <h3 class="block-title-top">Traslados</h3>
              <!-- Media Card -->
              <div class="block-media">
                <img :src="transport.image_url" :alt="transport.transport_name" class="block-image" @click="openImage('traslados')">
              </div>
              <!-- Description & Button -->
              <div class="block-content">
                <p class="block-description">{{ transport.description || 'Transporte cómodo y coordinado de ida y vuelta.' }}</p>
                <button @click="handleTransportClick(transport)" class="block-btn">
                  <img src="/assets/iconoEventos3.png" alt="Consultar" class="block-btn-icon">
                  <span class="block-btn-text">Consultar traslados</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Transport Contacts Modal -->
      <Teleport to="body">
        <div v-if="showTransportModal" class="modal-overlay" @click.self="showTransportModal = false">
          <div class="modal-content">
            <button @click="showTransportModal = false" class="modal-close">&times;</button>
            <h3 class="modal-title">Contactos de Traslados</h3>
            <div class="modal-contacts">
              <a
                v-for="contact in selectedTransport?.contacts"
                :key="contact.id || contact.contact"
                :href="`https://wa.me/${typeof contact === 'string' ? contact.replace(/\D/g, '') : contact.contact.replace(/\D/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-contact-btn"
              >
                <img src="/assets/iconoEventos3.png" alt="WhatsApp" class="modal-contact-icon">
                <span v-if="typeof contact === 'string'">{{ contact }}</span>
                <span v-else>{{ contact.name ? `${contact.name} - ${contact.contact}` : contact.contact }}</span>
              </a>
            </div>
          </div>
          </div>
        </Teleport>
        </div>

      <!-- Tickets Modal -->
      <div v-if="showTicketsModal" class="modal-overlay" @click.self="showTicketsModal = false">
        <div class="modal-content">
          <button @click="showTicketsModal = false" class="modal-close">&times;</button>
          <h3 class="modal-title">Seleccioná una ticketera</h3>
          <div class="modal-tickets">
            <a
              v-for="ticket in event?.tickets"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRotatingIcon } from '../composables/useRotatingIcon'
import { fetchEventById } from '../services/apiService'
import SwiperCarousel from '../components/common/SwiperCarousel.vue'
const route = useRoute()
const router = useRouter()

// Estado
const event = ref(null)
const loading = ref(true)
const error = ref(null)
const showTicketsModal = ref(false)

// Computed properties para datos del evento
const heroMedia = computed(() => {
  if (!event.value?.media_url) return '/assets/promo_lineup.mp4'
  return event.value.media_url
})

const isVideoMedia = computed(() => {
  const url = heroMedia.value
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('video')
})

const djEventsForCarousel = computed(() => {
  return (event.value?.artists || []).map(a => ({
    id: a.id,
    title: a.artist_name,
    media_url: a.image_url,
    fecha_dia: event.value?.fecha_dia,
    fecha_mes: event.value?.fecha_mes,
    tickets: []
  }))
})

const lodgingData = computed(() => {
  if (!event.value?.lodging || !event.value.lodging.enabled) return null
  return event.value.lodging
})

const transportsData = computed(() => {
  if (!event.value?.transports_enabled) return []
  return (event.value?.transports || [])
})

const activeBlocksCount = computed(() => {
  let count = 0
  if (lodgingData.value?.enabled) count++
  if (transportsData.value.length > 0) count += transportsData.value.length
  return count
})

// Icones rotativos
const mesasIcon = useRotatingIcon(8)
const experienciaIcon = useRotatingIcon(8)

// Modal de transporte
const showTransportModal = ref(false)
const selectedTransport = ref(null)

const formatDate = (dia, mes) => {
  const monthMap = {
    '01': 'ENE', '02': 'FEB', '03': 'MAR', '04': 'ABR',
    '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AGO',
    '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DIC'
  }
  const monthStr = String(mes).padStart(2, '0')
  return `${String(dia).padStart(2, '0')} ${monthMap[monthStr] || monthStr}`
}

const getWhatsAppNumber = (contacts) => {
  if (!Array.isArray(contacts) || contacts.length === 0) return '5493415492478'
  const contact = contacts[0]
  const num = typeof contact === 'string' ? contact : contact.contact
  return num ? num.replace(/\D/g, '') : '5493415492478'
}

const getLodgingWhatsApp = () => {
  if (!lodgingData.value?.whatsapp_number) return '5493415492478'
  return lodgingData.value.whatsapp_number.replace(/\D/g, '')
}

const getMesasWhatsApp = () => {
  return event.value?.mesas?.whatsapp_number 
    ? event.value.mesas.whatsapp_number.replace(/\D/g, '')
    : '5493415492478'
}

const openWhatsAppWithMessage = (type) => {
  const messages = {
    hospedaje: '¡Hola Pura Vida! Me gustaría consultar las opciones de hospedaje para el evento.',
    mesas: '¡Hola Pura Vida! Me interesa reservar una mesa VIP para el evento.',
    traslados: '¡Hola Pura Vida! Me gustaría información sobre los servicios de traslado.'
  }
  
  const message = messages[type] || 'Hola Pura Vida!'
  const encodedMessage = encodeURIComponent(message)
  
  let whatsappNumber = '+5493415492478'
  
  if (type === 'hospedaje') {
    whatsappNumber = getLodgingWhatsApp()
  } else if (type === 'mesas') {
    whatsappNumber = getMesasWhatsApp()
  }
  
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
}

const handleTransportClick = (transport) => {
  if (transport.contacts && transport.contacts.length > 1) {
    selectedTransport.value = transport
    showTransportModal.value = true
  } else {
    const contact = transport.contacts?.[0] || '5493415492478'
    const number = typeof contact === 'string' ? contact : contact.contact
    const whatsapp = number.replace(/\D/g, '')
    const message = encodeURIComponent('¡Hola Pura Vida! Me gustaría información sobre los servicios de traslado.')
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank')
  }
}

const handleArtistClick = (artist) => {
  // Handle artist click - can be used for future navigation
}

const handleTicketsClick = (event) => {
  if (!event.tickets || event.tickets.length === 0) {
    return
  }
  
  if (event.tickets.length === 1) {
    window.open(event.tickets[0].url || event.tickets[0].link_url, '_blank')
  } else {
    // Múltiples tickets, abrir modal para seleccionar
    showTicketsModal.value = true
  }
}

// Controlar scroll del body cuando los modales están abiertos
watch([showTicketsModal, showTransportModal], ([ticketsOpen, transportOpen]) => {
  if (ticketsOpen || transportOpen) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

onMounted(async () => {
  try {
    const eventId = route.params.id
    const response = await fetchEventById(eventId)
    const eventData = response.data || response
    event.value = eventData
  } catch (err) {
    console.error('Error cargando evento:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  })
})

const openImage = (type) => {
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

.loading-container,
.error-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 5;
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

.loading-container p,
.error-container p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  margin: 0;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #51C1E1;
  color: #000;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-link:hover {
  background: #6ADDEE;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  z-index: 50;
}

@media (min-width: 1024px) {
  .video-section {
    height: 100vh;
  }
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
  background: rgba(0, 0, 0, 0.85);
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

@media (min-width: 1024px) {
  .video-top-right {
    top: 2rem;
    right: 2rem;
  }
}

.video-logo {
  width: 60px;
  height: 60px;
  opacity: 0.8;
}

@media (min-width: 1024px) {
  .video-logo {
    width: 80px;
    height: 80px;
  }
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

@media (min-width: 1024px) {
  .video-bottom-left {
    bottom: 5rem;
    left: 3rem;
  }
}

.bottom-date {
  font-family: 'Standerd Bold', sans-serif;
  font-size: 1.75rem;
  color: #51C1E1;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  letter-spacing: 0.05em;
}

@media (min-width: 1024px) {
  .bottom-date {
    font-size: 2.5rem;
  }
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

@media (min-width: 1024px) {
  .bottom-subtitle {
    font-size: 1rem;
    max-width: 300px;
  }
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

@media (min-width: 1024px) {
  .back-button {
    top: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
  }
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

@media (min-width: 1024px) {
  .back-button svg {
    width: 24px;
    height: 24px;
  }
}

.event-hero-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  align-items: center;
  max-width: 600px;
}

@media (min-width: 1024px) {
  .event-hero-info {
    max-width: 800px;
    gap: 2rem;
  }
}

.event-hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  width: fit-content;
}

@media (min-width: 1024px) {
  .event-hero-badge {
    padding: 0.6rem 1.8rem;
  }
}

.event-hero-badge span {
  font-family: 'Standard', sans-serif;
  font-size: 0.7rem;
  color: #4F4898;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (min-width: 1024px) {
  .event-hero-badge span {
    font-size: 0.85rem;
  }
}

.event-hero-title {
  font-family: 'Standerd Black', sans-serif;
  font-size: 3rem;
  color: #fff;
  margin: 0;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
}

@media (min-width: 1024px) {
  .event-hero-title {
    font-size: 5rem;
  }
}

.event-hero-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-date {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.25rem;
  color: #51C1E1;
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

@media (min-width: 1024px) {
  .hero-location {
    font-size: 1.3rem;
  }
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

@media (min-width: 1024px) {
  .event-hero-icons {
    gap: 2rem;
    padding: 0 2rem;
  }
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

@media (min-width: 1024px) {
  .hero-icon-item {
    width: 72px;
    height: 72px;
  }
}

.hero-icon-item img {
  width: 28px;
  height: 28px;
  opacity: 1;
}

@media (min-width: 1024px) {
  .hero-icon-item img {
    width: 36px;
    height: 36px;
  }
}

.event-tickets-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: #51C1E1;
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
  color: #51C1E1;
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
  background: #51C1E1;
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


/* Artistas Section */
.artistas-section {
  padding: 3rem 1.5rem;
  background: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .artistas-section {
    padding: 5rem 2rem;
    gap: 3.5rem;
  }
}

.entradas-invitation {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  margin: 0;
  opacity: 0.9;
  max-width: 400px;
  line-height: 1.5;
}

@media (min-width: 1024px) {
  .entradas-invitation {
    font-size: 1.1rem;
    max-width: 500px;
  }
}

.entradas-header-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.entradas-header-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (min-width: 1024px) {
  .entradas-header-title {
    font-size: 2.8rem;
  }
}

.entradas-header-desc {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #ccc;
  margin: 0;
  line-height: 1.6;
  opacity: 0.85;
}

@media (min-width: 1024px) {
  .entradas-header-desc {
    font-size: 1rem;
  }
}

.entradas-perks {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0.5rem 0;
}

.perk {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #51C1E1;
  opacity: 0.9;
}

.perk-icon {
  font-size: 1rem;
}

.perk-text {
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
}

@media (min-width: 1024px) {
  .perk {
    font-size: 0.9rem;
  }
  
  .perk-icon {
    font-size: 1.3rem;
  }
}

.entradas-cta-text {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  margin: 0.5rem 0 0 0;
  font-weight: 500;
  letter-spacing: 0.05em;
}

@media (min-width: 1024px) {
  .entradas-cta-text {
    font-size: 1.05rem;
    margin-top: 1rem;
  }
}

.entradas-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #51C1E1;
  color: #000;
  text-decoration: none;
  border-radius: 2rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .entradas-btn {
    padding: 1rem 2.5rem;
    font-size: 0.95rem;
  }
}

.entradas-btn:hover {
  background: #FFE47C;
  transform: scale(1.05);
}

.artistas-carousel-wrapper {
  width: 100%;
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
  text-align: center; /* mobile */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .experiencia-header {
    text-align: center;
  }
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

.experiencia-blocks.single-block {
  max-width: 400px;
  margin: 0 auto;
  justify-items: center;
}

@media (min-width: 768px) {
  .experiencia-blocks {
    grid-template-columns: repeat(2, 1fr);
  }

  .experiencia-blocks.single-block {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
}

.experiencia-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  align-items: center;
  text-align: center;
}

.block-title-top {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  order: 1;
}

@media (min-width: 768px) {
  .block-title-top {
    font-size: 1.8rem;
  }
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
  order: 2;
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
  gap: 1rem;
  text-align: center;
  align-items: center;
  width: 100%;
  order: 3;
}

.block-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
  max-width: 400px;
}

.block-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid #51C1E1;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #51C1E1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.block-btn:hover {
  border-color: #51C1E1;
  color: #51C1E1;
  transform: scale(1.05);
}

.block-btn-icon {
  width: 20px;
  height: 20px;
  animation: spin 8s linear infinite;
}

.block-btn-text {
  display: inline;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  color: #51C1E1;
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
  background: #51C1E1;
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
  background: #51C1E1;
}

:deep(.swiper-pagination) {
  bottom: 0;
}

/* Modal */
/* ================== MODAL DE TRANSPORTE ================== */
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

.modal-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.modal-contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
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

.modal-contact-btn:hover {
  background: rgba(79, 72, 152, 0.1);
  border-color: #4F4898;
  color: #4F4898;
  transform: translateY(-2px);
}

.modal-contact-btn:active {
  transform: translateY(0);
}

.modal-contact-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.25s ease;
}

.modal-contact-btn:hover .modal-contact-icon {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .modal-content {
    padding: 2.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}

/* ================== MODAL DE TICKETS ================== */
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

.external-icon {
  width: 18px;
  height: 18px;
  color: #51C1E1;
  flex-shrink: 0;
}
</style>
