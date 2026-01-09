<template>
  <div class="form-wrapper">
    <h2 class="form-title">{{ event ? 'Editar Evento' : 'Crear Nuevo Evento' }}</h2>

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
              maxlength="2"
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
              maxlength="2"
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
            required
          ></textarea>
        </div>
      </fieldset>

      <!-- DJs/Artistas -->
      <fieldset class="form-section">
        <legend class="form-legend">Artistas</legend>
        <p class="form-hint">Agregar múltiples imágenes o videos de artistas</p>
        
        <div class="gallery-list">
          <div v-if="formData.artists && formData.artists.length > 0" class="gallery-items">
            <div v-for="(artist, index) in formData.artists" :key="index" class="gallery-item">
              <div class="gallery-preview">
                <img v-if="artist.image && !artist.image.includes('video')" :src="artist.image" :alt="`Artist ${index + 1}`" />
                <video v-else-if="artist.image && artist.image.includes('video')" :src="artist.image" controls style="width: 100%; height: 100%; object-fit: cover;" />
                <div v-else class="gallery-empty">Sin archivo</div>
              </div>
              <div class="gallery-info">
                <p class="gallery-name">{{ artist.name || `Artista ${index + 1}` }}</p>
                <input 
                  v-model="artist.name" 
                  type="text" 
                  class="form-input form--small"
                  placeholder="Nombre del artista"
                />
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  class="form-input form-input-small"
                  @change="(e) => handleArtistMediaUpload(e, index)"
                />
              </div>
              <button type="button" @click="removeArtist(index)" class="btn-remove">✕</button>
            </div>
          </div>

          <button type="button" @click="addArtist" class="admin-btn admin-btn-secondary">
            + Agregar Artista
          </button>
        </div>
      </fieldset>

      <!-- Transporte -->
      <fieldset class="form-section">
        <div class="section-header">
          <legend class="form-legend">Transporte</legend>
          <label class="form-checkbox">
            <input v-model="formData.transport.enabled" type="checkbox" />
            <span>Activar sección de transporte</span>
          </label>
        </div>

        <div v-if="formData.transport.enabled" class="section-content">
          <div class="form-group">
            <label class="form-label">Imagen/Flyer</label>
            <input 
              type="file" 
              accept="image/*" 
              class="form-input"
              @change="(e) => handleImageUpload(e, 'transport')"
            />
            <div v-if="formData.transport.image" class="image-preview">
              <img :src="formData.transport.image" alt="Transport preview" />
              <button type="button" @click="formData.transport.image = null" class="btn-remove-image">✕</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="formData.transport.description" 
              class="form-textarea"
              placeholder="Descripción del servicio de transporte..."
            ></textarea>
          </div>
        </div>
      </fieldset>

      <!-- Hospedaje -->
      <fieldset class="form-section">
        <div class="section-header">
          <legend class="form-legend">Hospedaje</legend>
          <label class="form-checkbox">
            <input v-model="formData.lodging.enabled" type="checkbox" />
            <span>Activar sección de hospedaje</span>
          </label>
        </div>

        <div v-if="formData.lodging.enabled" class="section-content">
          <div class="form-group">
            <label class="form-label">Imagen/Flyer</label>
            <input 
              type="file" 
              accept="image/*" 
              class="form-input"
              @change="(e) => handleImageUpload(e, 'lodging')"
            />
            <div v-if="formData.lodging.image" class="image-preview">
              <img :src="formData.lodging.image" alt="Lodging preview" />
              <button type="button" @click="formData.lodging.image = null" class="btn-remove-image">✕</button>
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

      <!-- Links de Tickets -->
      <fieldset class="form-section">
        <legend class="form-legend">Links de Compra de Tickets</legend>
        <div class="form-group">
          <label class="form-label">Links</label>
          <div class="links-list">
            <div v-for="(link, index) in formData.ticketLinks" :key="index" class="link-item">
              <input 
                v-model="formData.ticketLinks[index]" 
                type="url" 
                class="form-input"
                placeholder="Ej: https://www.ticketmaster.com/..."
              />
              <button type="button" @click="removeLink(index)" class="btn-remove">✕</button>
            </div>
          </div>
          <button type="button" @click="addLink" class="admin-btn admin-btn-secondary admin-btn-small">
            + Agregar Link
          </button>
        </div>
      </fieldset>

      <!-- Actions -->
      <div class="form-actions">
        <button type="submit" class="admin-btn admin-btn-primary">
          {{ event ? 'Actualizar Evento' : 'Crear Evento' }}
        </button>
        <button type="button" @click="$emit('cancel')" class="admin-btn admin-btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])

const getDefaultFormData = () => ({
  dj: '',
  fecha: ['', ''],
  lugar: '',
  descripcion: '',
  artists: [],
  transport: {
    enabled: false,
    image: null,
    description: '',
    contacts: [],
  },
  lodging: {
    enabled: false,
    image: null,
    description: '',
  },
  ticketLinks: [],
})

const formData = ref(getDefaultFormData())

const resetForm = () => {
  formData.value = getDefaultFormData()
}

watch(() => props.event, (newEvent) => {
  if (newEvent && newEvent.dj) {
    const fecha = Array.isArray(newEvent.fecha) ? newEvent.fecha : ['', '']
    const transportContacts = newEvent.transport?.contacts 
      ? (Array.isArray(newEvent.transport.contacts) ? newEvent.transport.contacts : [newEvent.transport.contacts])
      : []
    const ticketLinks = newEvent.ticketLinks 
      ? (Array.isArray(newEvent.ticketLinks) ? newEvent.ticketLinks : [newEvent.ticketLinks])
      : []
    
    formData.value = {
      dj: newEvent.dj || '',
      fecha: [...fecha],
      lugar: newEvent.lugar || '',
      descripcion: newEvent.descripcion || '',
      artists: newEvent.artists || [],
      transport: {
        enabled: newEvent.transport?.enabled || false,
        image: newEvent.transport?.image || null,
        description: newEvent.transport?.description || '',
        contacts: transportContacts,
      },
      lodging: {
        enabled: newEvent.lodging?.enabled || false,
        image: newEvent.lodging?.image || null,
        description: newEvent.lodging?.description || '',
      },
      ticketLinks: ticketLinks,
    }
  } else {
    resetForm()
  }
}, { immediate: true, deep: true })

const handleImageUpload = (e, section) => {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (section === 'transport') {
        formData.value.transport.image = event.target?.result
      } else if (section === 'lodging') {
        formData.value.lodging.image = event.target?.result
      }
    }
    reader.readAsDataURL(file)
  }
}

const addArtist = () => {
  if (!formData.value.artists) {
    formData.value.artists = []
  }
  formData.value.artists.push({ name: '', image: null })
}

const removeArtist = (index) => {
  formData.value.artists.splice(index, 1)
}

const handleArtistMediaUpload = (e, index) => {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (formData.value.artists && formData.value.artists[index]) {
        formData.value.artists[index].image = event.target?.result
      }
    }
    reader.readAsDataURL(file)
  }
}

const addContact = (section) => {
  if (section === 'transport') {
    if (!Array.isArray(formData.value.transport.contacts)) {
      formData.value.transport.contacts = []
    }
    formData.value.transport.contacts.push('')
  }
}

const removeContact = (index, section) => {
  if (section === 'transport') {
    formData.value.transport.contacts.splice(index, 1)
  }
}

const addLink = () => {
  if (!Array.isArray(formData.value.ticketLinks)) {
    formData.value.ticketLinks = []
  }
  formData.value.ticketLinks.push('')
}

const removeLink = (index) => {
  formData.value.ticketLinks.splice(index, 1)
}

const submitForm = () => {
  // Validar campos requeridos
  if (!formData.value.dj || !formData.value.lugar || !formData.value.descripcion) {
    alert('Por favor completa todos los campos requeridos')
    return
  }

  // Validar fechas
  if (!formData.value.fecha[0] || !formData.value.fecha[1]) {
    alert('Por favor completa día y mes')
    return
  }

  // Filtrar contactos vacíos y links vacíos
  const transportContacts = formData.value.transport.contacts.filter(c => c.trim())
  const ticketLinks = formData.value.ticketLinks.filter(l => l.trim())

  // Enviar datos validados
  emit('save', {
    dj: formData.value.dj,
    fecha: [formData.value.fecha[0], formData.value.fecha[1]],
    lugar: formData.value.lugar,
    descripcion: formData.value.descripcion,
    artists: formData.value.artists || [],
    transport: {
      enabled: formData.value.transport.enabled,
      image: formData.value.transport.image,
      description: formData.value.transport.description,
      contacts: transportContacts,
    },
    lodging: {
      enabled: formData.value.lodging.enabled,
      image: formData.value.lodging.image,
      description: formData.value.lodging.description,
    },
    ticketLinks: ticketLinks,
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
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.form-input[type="file"] {
  padding: 0.5rem;
  cursor: pointer;
}

.form-input[type="file"]::file-selector-button {
  background: rgba(81, 193, 225, 0.2);
  color: #51C1E1;
  border: 1px solid #51C1E1;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.form-input[type="file"]::file-selector-button:hover {
  background: rgba(81, 193, 225, 0.3);
}

.form-input-small {
  font-size: 0.85rem;
  padding: 0.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Galería de Artistas */
.gallery-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(81, 193, 225, 0.1);
  border-radius: 0.75rem;
}

.gallery-preview {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-preview img {
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
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  margin: 0;
}

.form-input-small {
  font-size: 0.85rem;
  padding: 0.5rem;
}

/* Contactos */
.contacts-list,
.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.contact-item,
.link-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
}

/* Imagen Preview */
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

/* Botones pequenos */
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

.placeholder-box {
  padding: 2rem;
  background: rgba(81, 193, 225, 0.05);
  border: 2px dashed rgba(81, 193, 225, 0.2);
  border-radius: 0.75rem;
  text-align: center;
}

.placeholder-box p {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
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
}

.admin-btn-primary {
  background: linear-gradient(135deg, #FFD25C 0%, #E6B633 100%);
  color: #000;
}

.admin-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 210, 92, 0.2);
}

.admin-btn-secondary {
  background: transparent;
  color: #51C1E1;
  border: 1px solid #51C1E1;
}

.admin-btn-secondary:hover {
  background: rgba(81, 193, 225, 0.1);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>

