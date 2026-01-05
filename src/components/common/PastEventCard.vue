<template>
  <div class="event-card">
    <!-- Background con imagen/video -->
    <div class="event-background">
      <video
        v-if="event.imagen.includes('.mp4')"
        autoplay
        muted
        loop
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
          <button class="event-btn" @click="goToEventDetail">Revivir</button>
          <button class="event-btn">Galería</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const goToEventDetail = () => {
  router.push(`/event/${event.id}`)
}
</script>

<style scoped>
.event-card {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
}

.event-background {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
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
</style>
