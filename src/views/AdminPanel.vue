<template>
  <div class="admin-view">

    <!-- Container -->
    <div class="admin-container">
      <!-- Header -->
      <div class="admin-header">
        <h1 class="admin-title">Panel Administrativo</h1>
        <router-link to="/" class="admin-back-btn">← Volver a Home</router-link>
      </div>

      <!-- Tabs Navigation -->
      <div class="admin-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab" 
          @click="activeTab = tab"
          :class="['admin-tab', { active: activeTab === tab }]"
        >
          {{ tab === 'events' ? 'Eventos' : 'Crear Evento' }}
        </button>
      </div>

      <!-- Content Area -->
      <div class="admin-content">
        <!-- Events List Tab -->
        <div v-if="activeTab === 'events'" class="tab-content">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando eventos...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <p>❌ {{ error }}</p>
            <button @click="refreshEvents" class="admin-btn admin-btn-primary">
              Reintentar
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="events.length === 0" class="empty-state">
            <p>No hay eventos creados</p>
            <button @click="activeTab = 'create'" class="admin-btn admin-btn-primary">
              Crear primer evento
            </button>
          </div>

          <!-- Events Grid -->
          <div v-else class="events-grid">
            <div v-for="event in events" :key="event.id" class="event-card">
              <div class="event-card-media">
                <img v-if="event.media_url && !event.media_url.includes('video')" :src="event.media_url" :alt="event.dj" class="event-card-image" />
                <video v-else-if="event.media_url && event.media_url.includes('video')" :src="event.media_url" class="event-card-video" autoplay muted loop playsinline />
                <div v-else class="event-card-empty">Sin imagen</div>
              </div>
              <div class="event-card-header">
                <h3 class="event-card-title">{{ event.dj }}</h3>
                <span class="event-date">{{ event.fecha[0] }}/{{ event.fecha[1] }}</span>
              </div>
              <p class="event-card-location">{{ event.lugar }}</p>
              <p class="event-card-desc">{{ event.descripcion }}</p>
              <div class="event-card-actions">
                <button 
                  @click="editEvent(event)" 
                  class="admin-btn admin-btn-secondary"
                  :disabled="isSubmitting || isLoadingEvent"
                >
                  {{ isLoadingEvent ? 'Cargando...' : 'Editar' }}
                </button>
                <button 
                  @click="deleteEvent(event.id)" 
                  class="admin-btn admin-btn-danger"
                  :disabled="isSubmitting"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Create/Edit Event Tab -->
        <div v-if="activeTab === 'create'" class="tab-content">
          <AdminEventForm 
            :event="editingEvent" 
            @save="saveEvent"
            @cancel="cancelEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AdminEventForm from '../components/admin/AdminEventForm.vue'
import { useEvents } from '../composables/useEvents'
import { fetchEventById } from '../services/apiService'

const activeTab = ref('events')
const tabs = ['events', 'create']
const editingEvent = ref(null)
const isSubmitting = ref(false)
const isLoadingEvent = ref(false)

// Usar el composable para traer eventos de la API
const { events, loading, error, refreshEvents, addEvent, editEvent: updateEventApi, removeEvent } = useEvents()

const editEvent = async (event) => {
  isLoadingEvent.value = true
  try {
    // Fetch del evento completo desde la DB
    const response = await fetchEventById(event.id)
    const freshEvent = response?.data || response
    if (!freshEvent?.id) {
      throw new Error('Respuesta inválida al obtener el evento')
    }
    
    // Transformar al formato esperado por el formulario
    editingEvent.value = {
      id: freshEvent.id,
      dj: freshEvent.dj,
      fecha: [freshEvent.fecha_dia, freshEvent.fecha_mes],
      lugar: freshEvent.lugar,
      descripcion: freshEvent.descripcion,
      media_url: freshEvent.media_url,
      transportsEnabled: freshEvent.transports_enabled ? true : false,
      artists: (freshEvent.artists || []).map(a => ({
        name: a.artist_name,
        image_url: a.image_url,
        media_type: a.media_type
      })),
      ticketLinks: (freshEvent.tickets || []).map(t => ({
        name: t.ticketer_name,
        url: t.link_url
      })),
      transports: (freshEvent.transports || []).map(t => ({
        name: t.transport_name,
        image_url: t.image_url,
        description: t.description,
        contacts: (t.contacts || []).map(c => ({
          name: c.contact_name || 'Contacto',
          contact: c.contact
        }))
      })),
      lodging: freshEvent.lodging ? {
        enabled: freshEvent.lodging.enabled ? true : false,
        description: freshEvent.lodging.description,
        image_url: freshEvent.lodging.image_url
      } : { enabled: false, description: '', image_url: null },
      mesas: freshEvent.mesas ? {
        enabled: freshEvent.mesas.enabled ? true : false,
        description: freshEvent.mesas.description,
        image_url: freshEvent.mesas.image_url,
        whatsapp_number: freshEvent.mesas.whatsapp_number
      } : { enabled: false, description: '', image_url: null, whatsapp_number: '' },
    }
    
    activeTab.value = 'create'
  } catch (err) {
    console.error('Error loading event:', err)
    alert('Error cargando el evento: ' + err.message)
  } finally {
    isLoadingEvent.value = false
  }
}

const cancelEdit = () => {
  editingEvent.value = null
  activeTab.value = 'events'
}

const saveEvent = async (eventData) => {
  isSubmitting.value = true
  try {
    // Transformar artists al formato que espera el backend
    const artists = (eventData.artists || []).map(a => ({
      artist_name: a.name,
      image_url: a.image_url,
      media_type: a.image_url?.includes('.mp4') ? 'video' : 'image'
    }))

    // Transformar tickets al formato que espera el backend
    const tickets = (eventData.ticketLinks || []).map(t => ({
      ticketer_name: t.name,
      link_url: t.url
    }))

    // Transformar transports al formato que espera el backend
    const transports = (eventData.transports || []).map(t => ({
      transport_name: t.name,
      image_url: t.image_url,
      description: t.description,
      contacts: t.contacts || []
    }))

    const payload = {
      dj: eventData.dj || '',
      fecha_dia: eventData.fecha?.[0] || '',
      fecha_mes: eventData.fecha?.[1] || '',
      lugar: eventData.lugar || '',
      descripcion: eventData.descripcion || '',
      media_url: eventData.media_url || null,
      transports_enabled: eventData.transportsEnabled ? 1 : 0,
      artists: artists,
      tickets: tickets,
      transports: transports,
      lodging: eventData.lodging || { enabled: false, description: '' },
      mesas: eventData.mesas || { enabled: false, description: '', image_url: null, whatsapp_number: '' },
    }

    console.log('Payload enviado:', JSON.stringify(payload, null, 2))

    if (editingEvent.value?.id) {
      // Actualizar evento existente
      console.log('Updating event:', editingEvent.value.id, payload)
      await updateEventApi(editingEvent.value.id, payload)
    } else {
      // Crear nuevo evento
      console.log('Creating new event:', payload)
      await addEvent(payload)
    }

    editingEvent.value = null
    activeTab.value = 'events'
  } catch (err) {
    console.error('Error saving event:', err)
    alert('Error guardando evento: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

const deleteEvent = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
    try {
      await removeEvent(id)
    } catch (err) {
      console.error('Error deleting event:', err)
      alert('Error eliminando evento: ' + err.message)
    }
  }
}

// Cuando se vuelve a la vista de eventos, refrescar
watch(() => activeTab.value, async (newTab) => {
  if (newTab === 'events') {
    await refreshEvents()
  }
})
</script>

<style scoped>
.admin-view {
  width: 100%;
  min-height: 100vh;
  background: #000;
  position: relative;
  padding: 2rem 1.5rem;
  overflow-x: hidden;
}

/* Background lights - reutilizadas de Home */
.admin-bg-light-1 {
  position: fixed;
  top: 10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.admin-bg-light-2 {
  position: fixed;
  bottom: 30%;
  left: -15%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(79, 72, 152, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.admin-bg-light-3 {
  position: fixed;
  bottom: 5%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 210, 92, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.admin-bg-light-4 {
  position: fixed;
  top: 40%;
  left: -20%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(79, 72, 152, 0.1);
}

.admin-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.admin-back-btn {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #51C1E1;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border: 1.5px solid rgba(81, 193, 225, 0.4);
  border-radius: 0.7rem;
  transition: all 0.25s ease;
  font-weight: 600;
}

.admin-back-btn:hover {
  border-color: #51C1E1;
  background: rgba(81, 193, 225, 0.08);
}

.admin-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(79, 72, 152, 0.1);
  padding-bottom: 1rem;
}

.admin-tab {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #888;
  background: transparent;
  border: none;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  transition: all 0.25s ease;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.admin-tab:hover {
  color: #51C1E1;
}

.admin-tab.active {
  color: #4F4898;
  border-bottom: 2px solid #4F4898;
  margin-bottom: -1rem;
  padding-bottom: calc(0.7rem + 1rem);
}

.admin-content {
  min-height: 400px;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.events-list {
  width: 100%;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(79, 72, 152, 0.2);
  border-top-color: #4F4898;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #aaa;
  margin: 0;
}

.error-state {
  text-align: center;
  padding: 3rem 2rem;
  border: 1px solid rgba(225, 109, 96, 0.3);
  border-radius: 1rem;
  background: rgba(225, 109, 96, 0.08);
}

.error-state p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #E16D60;
  margin: 0 0 1.5rem 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  border: 1px dashed rgba(79, 72, 152, 0.2);
  border-radius: 1rem;
  background: rgba(79, 72, 152, 0.03);
}

.empty-state p {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #aaa;
  margin: 0 0 1.5rem 0;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.event-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(79, 72, 152, 0.1);
  border-radius: 1.2rem;
  overflow: hidden;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);
}

.event-card:hover {
  border-color: rgba(79, 72, 152, 0.2);
  background: rgba(255, 255, 255, 0.03);
  transform: translateY(-2px);
}

.event-card-media {
  width: 100%;
  height: 180px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(79, 72, 152, 0.08);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-card-image,
.event-card-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card-empty {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.event-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
  gap: 1rem;
  padding: 0 1.5rem;
  padding-top: 1.25rem;
}

.event-card-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.15rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
}

.event-date {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #51C1E1;
  font-weight: 700;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.event-card-location {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #888;
  margin: 0;
  padding: 0 1.5rem;
  font-weight: 500;
}

.event-card-desc {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.5;
  margin: 0;
  padding: 0 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-card-actions {
  display: flex;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.admin-btn {
  font-family: 'Standard', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.65rem 1.25rem;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: all 0.25s ease;
  flex: 1;
}

.admin-btn-primary {
  background: #4F4898;
  color: #fff;
  box-shadow: 0 4px 12px rgba(79, 72, 152, 0.15);
}

.admin-btn-primary:hover:not(:disabled) {
  background: #5c5aab;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 72, 152, 0.25);
}

.admin-btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.admin-btn-secondary {
  background: transparent;
  color: #51C1E1;
  border: 1.5px solid rgba(81, 193, 225, 0.4);
}

.admin-btn-secondary:hover:not(:disabled) {
  background: rgba(81, 193, 225, 0.08);
  border-color: #51C1E1;
}

.admin-btn-danger {
  background: transparent;
  color: #E16D60;
  border: 1.5px solid rgba(225, 109, 96, 0.4);
}

.admin-btn-danger:hover:not(:disabled) {
  background: rgba(225, 109, 96, 0.08);
  border-color: #E16D60;
}

.admin-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.settings-section {
  padding: 2rem;
  background: rgba(255, 210, 92, 0.02);
  border: 1px solid rgba(255, 210, 92, 0.15);
  border-radius: 1rem;
}

.settings-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.settings-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #bbb;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .admin-view {
    padding: 1.5rem 1rem;
  }

  .admin-title {
    font-size: 2rem;
  }

  .admin-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .admin-tabs {
    flex-wrap: wrap;
  }

  .event-card-media {
    height: 150px;
  }

  .event-card-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  .admin-title {
    font-size: 1.75rem;
  }

  .admin-tabs {
    gap: 0.25rem;
  }

  .admin-tab {
    padding: 0.6rem 0.8rem;
  }

  .event-card-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-card-title {
    font-size: 1rem;
  }

  .event-card-media {
    height: 120px;
  }

  .admin-btn {
    padding: 0.6rem 1rem;
    font-size: 0.65rem;
  }
}
</style>

