<template>
  <div class="carousel-full-width">
    <swiper
      :modules="modules"
      :slides-per-view="3"
      :centered-slides="true"
      :loop="true"
      :space-between="20"
      :initial-slide="props.events.length >= 3 ? 1 : 0"
      :preload-images="true"
      class="swiper-carousel"
      :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 20 }
      }"
    >
      <swiper-slide 
        v-for="event in displayEvents" 
        :key="`${event.id}-${event.title}`"
        class="swiper-slide-custom"
      >
        <div class="event-card" @click="handleCardClick(event)">
          <!-- Imagen del evento -->
          <div class="event-image-container">
            <video
              v-if="event.media_url?.includes('.mp4')"
              autoplay
              muted
              loop
              playsinline
              class="event-media"
            >
              <source :src="event.media_url" type="video/mp4" />
            </video>
            <img v-else :src="event.media_url" :alt="event.title" class="event-media" />
          </div>

          <!-- Overlay con info -->
          <div class="event-overlay">
            <!-- Fecha en esquina superior (solo si no hideDetails) -->
            <div v-if="!hideDetails" class="event-date-badge">
                <div class="date-group date-box">
                    <span class="date-label">DÍA</span>
                    <span class="date-value">{{ event.fecha_dia || getDay(event.date) }}</span>
                </div>

                <div class="date-group date-box">
                    <span class="date-label">MES</span>
                    <span class="date-value">{{ event.fecha_mes || getMonth(event.date) }}</span>
                </div>
            </div>

            <!-- Info en la parte inferior -->
            <div class="event-info">
              <h3 class="event-title">{{ event.title }}</h3>

              <!-- Botones (solo si no hideDetails) -->
              <div v-if="!hideDetails" class="event-actions">
                <button class="event-btn info-btn" @click.stop="handleInfoClick(event)">
                  Info
                </button>
                <button class="event-btn tickets-btn" @click.stop="handleTicketsClick(event)">
                  Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const props = defineProps({
  events: {
    type: Array,
    required: true,
    default: () => []
  },
  hideDetails: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cardClick', 'infoClick', 'ticketsClick'])

const modules = [Navigation, Pagination, EffectCoverflow]

// Preparar eventos duplicados según cantidad
const displayEvents = computed(() => {
  if (props.events.length === 0) return []
  
  if (props.events.length === 1) {
    return [props.events[0], props.events[0], props.events[0], props.events[0], props.events[0]]
  }
  
  if (props.events.length === 2) {
    return [props.events[0], props.events[1], props.events[0], props.events[1], props.events[0]]
  }
  
  // Para 3 o más items: prepend última card para que initialSlide=1 muestre (última, primera, segunda)
  if (props.events.length >= 3) {
    return [props.events[props.events.length - 1], ...props.events, props.events[0], props.events[1]]
  }
  
  return [...props.events, props.events[0], props.events[1]]
})

const getDay = (dateString) => {
  if (!dateString) return 'DD'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'DD'
    return String(date.getDate()).padStart(2, '0')
  } catch (e) {
    return 'DD'
  }
}

const getMonth = (dateString) => {
  if (!dateString) return 'MM'
  try {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'MM'
    return months[date.getMonth()]
  } catch (e) {
    return 'MM'
  }
}

const handleCardClick = (event) => {
  emit('cardClick', event)
}

const handleInfoClick = (event) => {
  emit('infoClick', event)
}

const handleTicketsClick = (event) => {
  if (!event.tickets || event.tickets.length === 0) {
    return
  }
  
  if (event.tickets.length === 1) {
    // Un solo ticket, redirigir directo
    window.open(event.tickets[0].url || event.tickets[0].link_url, '_blank')
  } else {
    // Múltiples tickets, emitir evento para abrir modal
    emit('ticketsClick', event)
  }
}
</script>

<style scoped>
/* CAROUSEL SECTION - 100vw full width */
.carousel-full-width {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  z-index: 1;
  overflow: visible;
}

.swiper-carousel {
  width: 100%;
  height: auto;
  padding: 2rem 3rem;
  max-width: 1400px;
}

.swiper-slide-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.4s ease;
  height: auto;
}

/* Card central activa - MÁS GRANDE */
.swiper-slide-active .swiper-slide-custom {
  opacity: 1;
  transform: scale(1.15);
}

.swiper-slide-active {
  opacity: 1;
}

.swiper-slide-custom:not(.swiper-slide-active) {
  opacity: 0.45;
  transform: scale(0.85);
}

.event-card {
  width: 100%;
  max-width: 450px;
  aspect-ratio: 9 / 12;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.event-card:hover {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
}

.swiper-slide-active .event-card {
  box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
}

.event-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1a1a1a;
  position: relative;
}

.event-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.event-card:hover .event-media {
  transform: scale(1.05);
}

/* Overlay con gradiente */
.event-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.event-date-badge {
    display: flex;
  gap: 0.6rem;
  align-self: flex-start;
}

.date-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  min-width: 46px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}


.date-badge-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.date-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.date-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.55rem;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.date-value {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #000;
  line-height: 1;
  white-space: nowrap;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  line-height: 1.3;
}

.event-actions {
  display: flex;
  gap: 0.5rem;
}

.event-btn {
  flex: 1;
  padding: 0.5rem;
  font-family: 'Standard', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid;
}

.info-btn {
  background: transparent;
  border-color: #51C1E1;
  color: #51C1E1;
}

.info-btn:hover {
  background: #51C1E1;
  color: #000;
}

.tickets-btn {
  background: #FFD25C;
  border-color: #FFD25C;
  color: #000;
  font-weight: 700;
}

.tickets-btn:hover {
  opacity: 0.9;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .carousel-full-width {
    padding: 1.5rem 0;
  }

  .swiper-carousel {
    padding: 1.5rem 0;
  }

  .event-card {
    max-width: 340px;
  }

  .event-title {
    font-size: 0.9rem;
  }

  .event-btn {
    font-size: 0.6rem;
  }

  :deep(.swiper) {
    overflow: visible;
  }

  :deep(.swiper-slide) {
    width: auto;
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .event-card {
    max-width: 360px;
  }
}

/* Override Swiper default styles */
:deep(.swiper-wrapper) {
  align-items: center;
}

:deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
}
</style>

