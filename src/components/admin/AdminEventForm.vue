<template>
  <div class="form-wrapper">
    <h2 class="form-title">{{ event ? 'Editar Evento' : 'Crear Nuevo Evento' }}</h2>

    <!-- Error de Upload -->
    <div v-if="uploadError" class="upload-error">
      <p>{{ uploadError }}</p>
      <button type="button" @click="clearMediaError" class="btn-clear-error">✕</button>
    </div>

    <form @submit.prevent="submitForm" class="admin-form">
      <!-- Evento Base -->
      <fieldset class="form-section">
        <legend class="form-legend">Información Base</legend>

        <div class="form-group">
          <label class="form-label">Nombre del DJ / Artista</label>
          <input 
            v-model="formData.dj" 
            type="text" 
            class="form-input"
            placeholder="Ej: Mariano Mellino"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Día</label>
            <input 
              v-model="formData.fecha[0]" 
              type="text" 
              class="form-input"
              placeholder="07"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Mes</label>
            <input 
              v-model="formData.fecha[1]" 
              type="text" 
              class="form-input"
              placeholder="02"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Lugar</label>
          <input 
            v-model="formData.lugar" 
            type="text" 
            class="form-input"
            placeholder="Ej: Hotel Termas de Victoria"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Descripción del Evento</label>
          <textarea 
            v-model="formData.descripcion" 
            class="form-textarea"
            placeholder="Describe el evento..."
            maxlength="50"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Imagen/Video del Evento</label>
          <input 
            type="file" 
            accept="image/*,video/*" 
            class="form-input"
            @change="(e) => handleMediaUpload(e, 'event')"
            :disabled="isUploading"
          />
          <div v-if="formData.media_url" class="image-preview">
            <img v-if="!formData.media_url.includes('video')" :src="formData.media_url" alt="Event preview" />
            <video v-else :src="formData.media_url" controls style="width: 100%; height: auto; max-height: 300px; object-fit: cover;" />
            <button type="button" @click="formData.media_url = null" class="btn-remove-image">✕</button>
          </div>
        </div>
      </fieldset>

      <!-- DJs/Artistas -->
      <fieldset class="form-section">
        <legend class="form-legend">Artistas</legend>
        
        <div class="gallery-list">
          <div v-if="formData.artists && formData.artists.length > 0" class="gallery-items">
            <div v-for="(artist, index) in formData.artists" :key="index" class="gallery-item">
              <div class="gallery-preview">
                <img v-if="artist.image_url && !artist.image_url.includes('video')" :src="artist.image_url" :alt="`Artist ${index + 1}`" />
                <video v-else-if="artist.image_url && artist.image_url.includes('video')" :src="artist.image_url" controls style="width: 100%; height: 100%; object-fit: cover;" />
                <div v-else class="gallery-empty">Sin archivo</div>
              </div>
              <div class="gallery-info">
                <p class="gallery-name">{{ artist.name || `Artista ${index + 1}` }}</p>
                <input 
                  v-model="artist.name" 
                  type="text" 
                  class="form-input form-input-small"
                  placeholder="Nombre del artista"
                />
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  class="form-input form-input-small"
                  @change="(e) => handleMediaUpload(e, 'artist', index)"
                  :disabled="isUploading"
                />
              </div>
              <button type="button" @click="removeArtist(index)" class="btn-remove">✕</button>
            </div>
          </div>

          <button type="button" @click="addArtist" class="admin-btn admin-btn-secondary" :disabled="isUploading">
            + Agregar Artista
          </button>
        </div>
      </fieldset>

      <!-- Transporte -->
      <fieldset class="form-section">
        <div class="section-header">
          <legend class="form-legend">Servicios de Transporte</legend>
          <label class="form-toggle">
            <input v-model="formData.transportsEnabled" type="checkbox" class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-label">Activar servicios de transporte</span>
          </label>
        </div>

        <div v-if="formData.transportsEnabled" class="section-content">
          <div class="transports-list">
          <div v-if="formData.transports && formData.transports.length > 0" class="transports-items">
            <div v-for="(transport, index) in formData.transports" :key="index" class="transport-item">
              <div class="transport-header">
                <h4 class="transport-title">{{ transport.name || `Transporte ${index + 1}` }}</h4>
                <button type="button" @click="removeTransport(index)" class="btn-remove">✕</button>
              </div>

              <div class="transport-content">
                <div class="form-group">
                  <label class="form-label">Nombre del Servicio</label>
                  <input 
                    v-model="transport.name" 
                    type="text" 
                    class="form-input"
                    placeholder="Ej: Transporte desde CABA"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Imagen/Flyer</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    class="form-input"
                    @change="(e) => handleMediaUpload(e, 'transport', index)"
                    :disabled="isUploading"
                  />
                  <div v-if="transport.image_url" class="image-preview">
                    <img :src="transport.image_url" :alt="`Transport ${index + 1}`" />
                    <button type="button" @click="transport.image_url = null" class="btn-remove-image">✕</button>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Descripción</label>
                  <textarea 
                    v-model="transport.description" 
                    class="form-textarea"
                    placeholder="Descripción del servicio de transporte..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label class="form-label">Contactos (Nombre + Número)</label>
                  <div class="contacts-list">
                    <div v-for="(contact, contactIndex) in transport.contacts" :key="contactIndex" class="contact-item-group">
                      <div class="contact-item-inputs">
                        <input 
                          v-model="transport.contacts[contactIndex].name" 
                          type="text" 
                          class="form-input"
                          placeholder="Nombre del contacto"
                        />
                        <input 
                          v-model="transport.contacts[contactIndex].contact" 
                          type="text" 
                          class="form-input"
                          placeholder="Ej: +54 9 11 2345 6789"
                        />
                      </div>
                      <button type="button" @click="removeTransportContact(index, contactIndex)" class="btn-remove">✕</button>
                    </div>
                  </div>
                  <button type="button" @click="addTransportContact(index)" class="admin-btn admin-btn-secondary admin-btn-small">
                    + Agregar Contacto
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button type="button" @click="addTransport" class="admin-btn admin-btn-secondary" :disabled="isUploading">
            + Agregar Servicio de Transporte
          </button>
          </div>
        </div>
      </fieldset>

      <!-- Hospedaje -->
      <fieldset class="form-section">
        <div class="section-header">
          <legend class="form-legend">Hospedaje</legend>
          <label class="form-toggle">
            <input v-model="formData.lodging.enabled" type="checkbox" class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-label">Activar sección de hospedaje</span>
          </label>
        </div>

        <div v-if="formData.lodging.enabled" class="section-content">
          <div class="form-group">
            <label class="form-label">Imagen/Flyer (Firebase)</label>
            <input 
              type="file" 
              accept="image/*,video/*" 
              class="form-input"
              @change="(e) => handleMediaUpload(e, 'lodging')"
              :disabled="isUploading"
            />
            <div v-if="formData.lodging.image_url" class="image-preview">
              <img :src="formData.lodging.image_url" alt="Lodging preview" />
              <button type="button" @click="formData.lodging.image_url = null" class="btn-remove-image">✕</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="formData.lodging.description" 
              class="form-textarea"
              placeholder="Descripción del hospedaje..."
            ></textarea>
          </div>
        </div>
      </fieldset>

      <!-- Mesas VIP -->
      <fieldset class="form-section">
        <div class="section-header">
          <legend class="form-legend">Mesas VIP & Backstage</legend>
          <label class="form-toggle">
            <input v-model="formData.mesas.enabled" type="checkbox" class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-label">Activar sección de mesas VIP</span>
          </label>
        </div>

        <div v-if="formData.mesas.enabled" class="section-content">
          <div class="form-group">
            <label class="form-label">Imagen/Flyer (Firebase)</label>
            <input 
              type="file" 
              accept="image/*" 
              class="form-input"
              @change="(e) => handleMediaUpload(e, 'mesas')"
              :disabled="isUploading"
            />
            <div v-if="formData.mesas.image_url" class="image-preview">
              <img :src="formData.mesas.image_url" alt="Mesas preview" />
              <button type="button" @click="formData.mesas.image_url = null" class="btn-remove-image">✕</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="formData.mesas.description" 
              class="form-textarea"
              placeholder="Descripción de las mesas VIP..."
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Número de WhatsApp para Contacto</label>
            <input 
              v-model="formData.mesas.whatsapp_number" 
              type="text" 
              class="form-input"
              placeholder="Ej: +54 9 11 2345 6789"
            />
          </div>
        </div>
      </fieldset>

      <!-- Links de Tickets -->
      <fieldset class="form-section">
        <legend class="form-legend">
          Links de Compra de Tickets
          <span style="color: #ff6b6b; margin-left: 0.5rem;">*</span>
        </legend>
        <p class="form-hint">Agregar al menos 1 link de compra (obligatorio)</p>
        <div class="form-group">
          <label class="form-label">Ticketeras</label>
          <div class="links-list">
            <div v-for="(link, index) in formData.ticketLinks" :key="index" class="link-item-group">
              <div class="link-inputs">
                <input 
                  v-model="formData.ticketLinks[index].name" 
                  type="text" 
                  class="form-input"
                  placeholder="Ej: Ticketmaster"
                />
                <input 
                  v-model="formData.ticketLinks[index].url" 
                  type="url" 
                  class="form-input"
                  placeholder="Ej: https://www.ticketmaster.com/..."
                />
              </div>
              <button type="button" @click="removeLink(index)" class="btn-remove">✕</button>
            </div>
          </div>
          <button type="button" @click="addLink" class="admin-btn admin-btn-secondary admin-btn-small">
            + Agregar Ticketera
          </button>
        </div>
      </fieldset>

      <!-- Actions -->
      <div class="form-actions">
        <button type="submit" class="admin-btn admin-btn-primary" :disabled="isUploading">
          {{ isUploading ? 'Subiendo...' : (event ? 'Actualizar Evento' : 'Crear Evento') }}
        </button>
        <button type="button" @click="$emit('cancel')" class="admin-btn admin-btn-secondary" :disabled="isUploading">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { uploadImage, uploadVideo } from '../../services/apiService'

const props = defineProps({
  event: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])

const isUploading = ref(false)
const uploadError = ref(null)

const getDefaultFormData = () => ({
  dj: '',
  fecha: ['', ''],
  lugar: '',
  descripcion: '',
  media_url: null,
  artists: [],
  transportsEnabled: false,
  transports: [],
  lodging: {
    enabled: false,
    image_url: null,
    description: '',
  },
  mesas: {
    enabled: false,
    image_url: null,
    description: '',
    whatsapp_number: '',
  },
  ticketLinks: [],
})

const formData = ref(getDefaultFormData())

const resetForm = () => {
  formData.value = getDefaultFormData()
}

watch(() => props.event?.id, () => {
  if (props.event && props.event.dj) {
    const newEvent = props.event
    
    const fecha = Array.isArray(newEvent.fecha) ? newEvent.fecha.map(f => String(f)) : ['', '']
    
    const transportsEnabled = newEvent.transportsEnabled || (newEvent.transports && newEvent.transports.length > 0)
    let transports = newEvent.transports || []
    if (transports.length > 0) {
      transports = transports.map(t => ({
        name: t.name || t.transport_name || '',
        image_url: t.image_url || null,
        description: t.description || '',
        contacts: Array.isArray(t.contacts) ? t.contacts.filter(c => c).map(c => typeof c === 'string' ? c : c.contact || '') : [],
      }))
    }
    
    let ticketLinks = newEvent.ticketLinks || []
    if (ticketLinks.length > 0) {
      if (typeof ticketLinks[0] === 'string') {
        ticketLinks = ticketLinks.map(url => ({ name: '', url }))
      } else if (typeof ticketLinks[0] === 'object') {
        ticketLinks = ticketLinks.map(link => ({ 
          name: link.name || link.ticketer_name || '', 
          url: link.url || link.link_url || '' 
        }))
      }
    }
    
    // Procesar artists
    let artists = newEvent.artists || []
    if (artists.length > 0) {
      artists = artists.map(a => ({
        name: a.name || a.artist_name || '',
        image_url: a.image_url || null,
        media_type: a.media_type || 'image'
      }))
    }
    
    formData.value = {
      dj: newEvent.dj || '',
      fecha: [String(newEvent.fecha?.[0] || ''), String(newEvent.fecha?.[1] || '')],
      lugar: newEvent.lugar || '',
      descripcion: newEvent.descripcion || '',
      media_url: newEvent.media_url || null,
      artists: artists,
      transportsEnabled: transportsEnabled,
      transports: transports,
      lodging: {
        enabled: newEvent.lodging?.enabled === 1 || newEvent.lodging?.enabled === true,
        image_url: newEvent.lodging?.image_url || null,
        description: newEvent.lodging?.description || '',
      },
      mesas: {
        enabled: newEvent.mesas?.enabled === 1 || newEvent.mesas?.enabled === true,
        image_url: newEvent.mesas?.image_url || null,
        description: newEvent.mesas?.description || '',
        whatsapp_number: newEvent.mesas?.whatsapp_number || '',
      },
      ticketLinks: ticketLinks,
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleMediaUpload = async (e, type, target) => {
  const file = e.target.files?.[0]
  if (!file) return

  isUploading.value = true
  uploadError.value = null

  try {
    let url
    if (file.type.startsWith('video/')) {
      url = await uploadVideo(file)
    } else if (file.type.startsWith('image/')) {
      url = await uploadImage(file)
    } else {
      throw new Error('Tipo de archivo no soportado')
    }

    if (type === 'event') {
      formData.value.media_url = url
    } else if (type === 'lodging') {
      formData.value.lodging.image_url = url
    } else if (type === 'mesas') {
      if (formData.value.mesas) {
        formData.value.mesas.image_url = url
      }
    } else if (type === 'transport' && target !== undefined) {
      if (formData.value.transports && formData.value.transports[target]) {
        formData.value.transports[target].image_url = url
      }
    } else if (type === 'artist' && target !== undefined) {
      if (formData.value.artists && formData.value.artists[target]) {
        formData.value.artists[target].image_url = url
      }
    }
  } catch (err) {
    console.error('Error uploading file:', err)
    uploadError.value = err.message || 'Error subiendo archivo'
  } finally {
    isUploading.value = false
  }
}

const addTransport = () => {
  if (!Array.isArray(formData.value.transports)) {
    formData.value.transports = []
  }
  formData.value.transports.push({ 
    name: '', 
    image_url: null, 
    description: '', 
    contacts: [] 
  })
}

const removeTransport = (index) => {
  formData.value.transports.splice(index, 1)
}

const addTransportContact = (transportIndex) => {
  if (formData.value.transports && formData.value.transports[transportIndex]) {
    if (!Array.isArray(formData.value.transports[transportIndex].contacts)) {
      formData.value.transports[transportIndex].contacts = []
    }
    formData.value.transports[transportIndex].contacts.push({ name: '', contact: '' })
  }
}

const removeTransportContact = (transportIndex, contactIndex) => {
  if (formData.value.transports && formData.value.transports[transportIndex]) {
    formData.value.transports[transportIndex].contacts.splice(contactIndex, 1)
  }
}

const addArtist = () => {
  if (!formData.value.artists) {
    formData.value.artists = []
  }
  formData.value.artists.push({ name: '', image_url: null })
}

const removeArtist = (index) => {
  formData.value.artists.splice(index, 1)
}

const addLink = () => {
  if (!Array.isArray(formData.value.ticketLinks)) {
    formData.value.ticketLinks = []
  }
  formData.value.ticketLinks.push({ name: '', url: '' })
}

const removeLink = (index) => {
  formData.value.ticketLinks.splice(index, 1)
}

const clearMediaError = () => {
  uploadError.value = null
}

const submitForm = () => {
  if (!formData.value.dj || !formData.value.lugar || !formData.value.descripcion) {
    alert('Por favor completa todos los campos requeridos')
    return
  }

  if (!formData.value.fecha[0] || !formData.value.fecha[1]) {
    alert('Por favor completa día y mes')
    return
  }

  if (!formData.value.artists || formData.value.artists.length === 0) {
    alert('Debes agregar al menos 1 artista')
    return
  }

  const artistsValid = formData.value.artists.every(a => a.name && a.image_url)
  if (!artistsValid) {
    alert('Cada artista debe tener nombre e imagen/video')
    return
  }

  const validTicketLinks = formData.value.ticketLinks.filter(l => l.url && l.url.trim())
  if (validTicketLinks.length === 0) {
    alert('Debes agregar al menos 1 link de compra de tickets')
    return
  }

  let transports = []
  if (formData.value.transportsEnabled) {
    transports = (formData.value.transports || []).map(t => ({
      name: t.name,
      image_url: t.image_url,
      description: t.description,
      contacts: t.contacts.filter(c => c.trim()),
    }))
  }

  emit('save', {
    dj: formData.value.dj,
    fecha: [formData.value.fecha[0], formData.value.fecha[1]],
    lugar: formData.value.lugar,
    descripcion: formData.value.descripcion,
    media_url: formData.value.media_url,
    artists: formData.value.artists,
    transportsEnabled: formData.value.transportsEnabled,
    transports: transports,
    lodging: {
      enabled: formData.value.lodging.enabled,
      image_url: formData.value.lodging.image_url,
      description: formData.value.lodging.description,
    },
    ticketLinks: validTicketLinks,
  })
}
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #fff;
  margin: 0 0 2rem 0;
  font-weight: 600;
}

.upload-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.upload-error p {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #ff6b6b;
  margin: 0;
  flex: 1;
}

.btn-clear-error {
  background: transparent;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  transition: opacity 0.3s ease;
}

.btn-clear-error:hover {
  opacity: 0.7;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 210, 92, 0.03) 0%, rgba(81, 193, 225, 0.02) 100%);
  border: 1px solid rgba(255, 210, 92, 0.15);
  border-radius: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.form-legend {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.25rem;
  color: #FFD25C;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.form-hint {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #999;
  margin: 0;
  font-style: italic;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 210, 92, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(81, 193, 225, 0.2);
  border-radius: 0.5rem;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #51C1E1;
  background: rgba(0, 0, 0, 0.5);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #666;
}

.form-input-small {
  font-size: 0.85rem;
  padding: 0.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.gallery-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-items {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.gallery-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  align-items: start;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(81, 193, 225, 0.05) 0%, rgba(255, 210, 92, 0.02) 100%);
  border: 1px solid rgba(81, 193, 225, 0.15);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.gallery-item:hover {
  border-color: rgba(81, 193, 225, 0.3);
  background: linear-gradient(135deg, rgba(81, 193, 225, 0.1) 0%, rgba(255, 210, 92, 0.05) 100%);
}

.gallery-preview {
  width: 120px;
  height: 120px;
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(81, 193, 225, 0.2);
}

.gallery-preview img,
.gallery-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-empty {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  color: #666;
  text-align: center;
}

.gallery-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gallery-name {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  color: #FFD25C;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.transports-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.transports-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.transport-item {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(81, 193, 225, 0.1);
  border-radius: 0.75rem;
}

.transport-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(81, 193, 225, 0.1);
}

.transport-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.1rem;
  color: #51C1E1;
  margin: 0;
  font-weight: 600;
}

.transport-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contacts-list,
.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.contact-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
}

.link-item-group {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: flex-start;
}

.link-inputs {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.75rem;
}

.contact-item-group {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: flex-start;
}

.contact-item-inputs {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 0.75rem;
}

.image-preview {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  background: rgba(0, 0, 0, 0.2);
}

.btn-remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ff6b6b;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.btn-remove-image:hover {
  background: rgba(0, 0, 0, 0.9);
}

.btn-remove {
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-remove:hover {
  background: rgba(255, 107, 107, 0.1);
}

.admin-btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  align-self: flex-start;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.form-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #FFD25C;
}

.form-checkbox span {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
}

/* Toggle Switch Moderno */
.form-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
}

.toggle-input {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 48px;
  height: 28px;
  background: #444;
  border-radius: 14px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.toggle-slider::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.toggle-input:checked + .toggle-slider {
  background: #FFD25C;
}

.toggle-input:checked + .toggle-slider::after {
  left: 22px;
}

.toggle-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-btn {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.admin-btn-primary {
  background: linear-gradient(135deg, #FFD25C 0%, #E6B633 100%);
  color: #000;
}

.admin-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 210, 92, 0.2);
}

.admin-btn-secondary {
  background: transparent;
  color: #51C1E1;
  border: 1px solid #51C1E1;
}

.admin-btn-secondary:hover:not(:disabled) {
  background: rgba(81, 193, 225, 0.1);
}

.admin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .link-inputs {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .gallery-item {
    grid-template-columns: 1fr;
  }
}
</style>
