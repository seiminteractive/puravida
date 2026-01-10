import { ref, onMounted } from 'vue'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/apiService'

export const useEvents = () => {
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)
  const hasRefreshed = ref(false)

  /**
   * Traer eventos de la API
   */
  const loadEvents = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetchEvents()
      
      // Extraer array de datos (backend retorna { success: true, data: [...] })
      const dataArray = response.data || response
      
      // Transformar datos de la API al formato esperado
      events.value = (Array.isArray(dataArray) ? dataArray : []).map(event => ({
        id: event.id,
        dj: event.dj || 'DJ Desconocido',
        fecha: [event.fecha_dia, event.fecha_mes],
        lugar: event.lugar || 'Por definir',
        descripcion: event.descripcion || '',
        imagen: event.media_url || 'https://via.placeholder.com/600x400?text=Evento',
        // Campos adicionales de la API
        ...event
      }))
      hasRefreshed.value = true
    } catch (err) {
      console.error('Error loading events:', err)
      error.value = err.message || 'Error cargando eventos'
    } finally {
      loading.value = false
    }
  }

  /**
   * Crear evento
   */
  const addEvent = async (eventData) => {
    try {
      const newEvent = await createEvent(eventData)
      // Traer eventos actualizados de la API
      await loadEvents()
      return newEvent
    } catch (err) {
      console.error('Error creating event:', err)
      error.value = err.message || 'Error creando evento'
      throw err
    }
  }

  /**
   * Actualizar evento
   */
  const editEvent = async (id, eventData) => {
    try {
      const updatedEvent = await updateEvent(id, eventData)
      // Traer eventos actualizados de la API
      await loadEvents()
      return updatedEvent
    } catch (err) {
      console.error('Error updating event:', err)
      error.value = err.message || 'Error actualizando evento'
      throw err
    }
  }

  /**
   * Eliminar evento
   */
  const removeEvent = async (id) => {
    try {
      await deleteEvent(id)
      // Traer eventos actualizados de la API
      await loadEvents()
    } catch (err) {
      console.error('Error deleting event:', err)
      error.value = err.message || 'Error eliminando evento'
      throw err
    }
  }

  /**
   * Recargar eventos (útil después de guardar)
   */
  const refreshEvents = async () => {
    await loadEvents()
  }

  onMounted(() => {
    loadEvents()
  })

  return {
    events,
    loading,
    error,
    hasRefreshed,
    loadEvents,
    addEvent,
    editEvent,
    removeEvent,
    refreshEvents
  }
}
