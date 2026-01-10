const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Debug: Log API URL
console.log('API_URL configured:', API_URL)

/**
 * Obtener todos los eventos de la DB
 */
export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`)
    if (!response.ok) throw new Error('Error fetching events')
    const json = await response.json()
    console.log('Events response:', json)
    // El backend retorna { success: true, data: [...] }
    // Retornar la respuesta completa para que useEvents pueda extraer data
    return json
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

/**
 * Obtener un evento por ID
 */
export const fetchEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`)
    if (!response.ok) throw new Error('Event not found')
    return await response.json()
  } catch (error) {
    console.error('Error fetching event:', error)
    throw error
  }
}

/**
 * Crear un nuevo evento
 */
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
    if (!response.ok) throw new Error('Error creating event')
    return await response.json()
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
}

/**
 * Actualizar un evento
 */
export const updateEvent = async (id, eventData) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
    if (!response.ok) throw new Error('Error updating event')
    return await response.json()
  } catch (error) {
    console.error('Error updating event:', error)
    throw error
  }
}

/**
 * Eliminar un evento
 */
export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Error deleting event')
    return true
  } catch (error) {
    console.error('Error deleting event:', error)
    throw error
  }
}

/**
 * Subir imagen a Firebase
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) throw new Error('Error uploading image')
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

/**
 * Subir video a Firebase
 */
export const uploadVideo = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/upload/video`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) throw new Error('Error uploading video')
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading video:', error)
    throw error
  }
}

export default {
  fetchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadImage,
  uploadVideo
}
