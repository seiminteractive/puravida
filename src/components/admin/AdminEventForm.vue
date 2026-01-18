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
            :class="{ 'form-input-error': errors.dj }"
            placeholder="Ej: Mariano Mellino"
            required
          />
          <span v-if="errors.dj" class="form-error-message">{{ errors.dj }}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Día</label>
            <input 
              v-model="formData.fecha[0]" 
              type="text" 
              class="form-input"
              :class="{ 'form-input-error': errors.fechaDia }"
              placeholder="07"
              required
            />
            <span v-if="errors.fechaDia" class="form-error-message">{{ errors.fechaDia }}</span>
          </div>
          <div class="form-group">
            <label class="form-label">Mes</label>
            <input 
              v-model="formData.fecha[1]" 
              type="text" 
              class="form-input"
              :class="{ 'form-input-error': errors.fechaMes }"
              placeholder="02"
              required
            />
            <span v-if="errors.fechaMes" class="form-error-message">{{ errors.fechaMes }}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Lugar</label>
          <input 
            v-model="formData.lugar" 
            type="text" 
            class="form-input"
            :class="{ 'form-input-error': errors.lugar }"
            placeholder="Ej: Hotel Termas de Victoria"
            required
          />
          <span v-if="errors.lugar" class="form-error-message">{{ errors.lugar }}</span>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción del Evento</label>
          <textarea 
            v-model="formData.descripcion" 
            class="form-textarea"
            :class="{ 'form-input-error': errors.descripcion }"
            placeholder="Describe el evento..."
            maxlength="50"
            required
          ></textarea>
          <span v-if="errors.descripcion" class="form-error-message">{{ errors.descripcion }}</span>
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
        <span v-if="errors.artists" class="form-error-message">{{ errors.artists }}</span>
        
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
                <div>
                  <input 
                    v-model="artist.name" 
                    type="text" 
                    class="form-input form-input-small"
                    :class="{ 'form-input-error': errors.artistsItems[index] }"
                    placeholder="Nombre del artista"
                  />
                  <span v-if="errors.artistsItems[index]" class="form-error-message" style="font-size: 0.75rem;">{{ errors.artistsItems[index] }}</span>
                </div>
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
            <!-- Mostrar si hay transportes -->
            <div v-if="formData.transports && formData.transports.length > 0" class="transports-items">
              <div v-for="(transport, index) in formData.transports" :key="index" class="transport-item">
                <div class="transport-header">
                  <h4 class="transport-title">{{ transport.name || `Transporte` }}</h4>
                  <!-- <button type="button" @click="removeTransport(index)" class="btn-remove">✕</button> -->
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

                  <!-- <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea 
                      v-model="transport.description" 
                      class="form-textarea"
                      placeholder="Descripción del servicio de transporte..."
                    ></textarea>
                  </div> -->

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
                            placeholder="Ej: +54 9 341 5492478"
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

            <!-- Mostrar mensaje si no hay transportes (inicialmente) -->
            <div v-else class="empty-section-message">
              <p>No hay servicios de transporte configurados</p>
              <button type="button" @click="addTransport" class="admin-btn admin-btn-secondary" :disabled="isUploading">
                + Agregar Servicio de Transporte
              </button>
            </div>
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

          <!-- <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="formData.lodging.description" 
              class="form-textarea"
              placeholder="Descripción del hospedaje..."
            ></textarea>
          </div> -->
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

          <!-- <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="formData.mesas.description" 
              class="form-textarea"
              placeholder="Descripción de las mesas VIP..."
            ></textarea>
          </div> -->

          <!-- <div class="form-group">
            <label class="form-label">Número de WhatsApp para Contacto</label>
            <input 
              v-model="formData.mesas.whatsapp_number" 
              type="text" 
              class="form-input"
              placeholder="Ej: +54 9 11 2345 6789"
            />
          </div> -->
        </div>
      </fieldset>

      <!-- Links de Tickets -->
      <fieldset class="form-section">
        <legend class="form-legend">
          Links de Compra de Tickets
          <span style="color: #ff6b6b; margin-left: 0.5rem;">*</span>
        </legend>
        <p class="form-hint">Agregar al menos 1 link de compra (obligatorio)</p>
        <span v-if="errors.ticketLinks" class="form-error-message">{{ errors.ticketLinks }}</span>
        <div class="form-group">
          <label class="form-label">Ticketeras</label>
          <div class="links-list">
            <div v-for="(link, index) in formData.ticketLinks" :key="index" class="link-item-group">
              <div class="link-inputs">
                <input 
                  v-model="formData.ticketLinks[index].name" 
                  type="text" 
                  class="form-input"
                  :class="{ 'form-input-error': errors.ticketLinksItems[index] }"
                  placeholder="Ej: Ticketmaster"
                />
                <input 
                  v-model="formData.ticketLinks[index].url" 
                  type="url" 
                  class="form-input"
                  :class="{ 'form-input-error': errors.ticketLinksItems[index] }"
                  placeholder="Ej: https://www.ticketmaster.com/..."
                />
              </div>
              <span v-if="errors.ticketLinksItems[index]" class="form-error-message" style="font-size: 0.75rem;">{{ errors.ticketLinksItems[index] }}</span>
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
        <button type="submit" class="admin-btn admin-btn-primary" :disabled="isUploading || !isFormValid">
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
import { ref, watch, computed } from 'vue'
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

// =============== FORM DATA ===============
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

// =============== VALIDACIONES EN TIEMPO REAL ===============
const errors = ref({
  dj: '',
  fechaDia: '',
  fechaMes: '',
  lugar: '',
  descripcion: '',
  artists: '',
  artistsItems: {},
  ticketLinks: '',
  ticketLinksItems: {},
})

// Utilidad para validar strings
const isValidString = (value) => {
  return typeof value === 'string' && value.trim().length > 0
}

// =============== SANITIZACIÓN Y NORMALIZACIÓN DE FECHA ===============
// Sanitizar entrada: solo permitir dígitos
const sanitizeNumberInput = (value) => {
  return String(value).replace(/[^\d]/g, '')
}

// Normalizar día: a dos dígitos (1 → 01), máximo 31
const normalizeDia = (value) => {
  const sanitized = sanitizeNumberInput(value)
  if (!sanitized) return ''
  const num = parseInt(sanitized, 10)
  if (num < 1) return '01'
  if (num > 31) return '31'
  return String(num).padStart(2, '0')
}

// Normalizar mes: a dos dígitos (1 → 01), máximo 12
const normalizeMes = (value) => {
  const sanitized = sanitizeNumberInput(value)
  if (!sanitized) return ''
  const num = parseInt(sanitized, 10)
  if (num < 1) return '01'
  if (num > 12) return '12'
  return String(num).padStart(2, '0')
}

// Validadores
const validateDj = (value) => {
  if (!isValidString(value)) {
    return 'El nombre del DJ/Artista es obligatorio'
  }
  if (value.trim().length < 2) {
    return 'Debe tener al menos 2 caracteres'
  }
  return ''
}

const validateFecha = (value) => {
  if (!isValidString(value)) {
    return 'Campo obligatorio'
  }
  const num = parseInt(value, 10)
  if (isNaN(num)) {
    return 'Debe ser un número'
  }
  return ''
}

const validateFechaDia = (value) => {
  const baseError = validateFecha(value)
  if (baseError) return baseError
  const num = parseInt(value, 10)
  if (num < 1 || num > 31) {
    return 'Día debe estar entre 1 y 31'
  }
  return ''
}

const validateFechaMes = (value) => {
  const baseError = validateFecha(value)
  if (baseError) return baseError
  const num = parseInt(value, 10)
  if (num < 1 || num > 12) {
    return 'Mes debe estar entre 1 y 12'
  }
  return ''
}

const validateLugar = (value) => {
  if (!isValidString(value)) {
    return 'El lugar es obligatorio'
  }
  if (value.trim().length < 3) {
    return 'Debe tener al menos 3 caracteres'
  }
  return ''
}

const validateDescripcion = (value) => {
  if (!isValidString(value)) {
    return 'La descripción es obligatoria'
  }
  if (value.trim().length < 5) {
    return 'Debe tener al menos 5 caracteres'
  }
  return ''
}

// Watchers para validaciones en tiempo real
watch(() => formData.value.dj, (value) => {
  errors.value.dj = validateDj(value)
}, { immediate: true })

watch(() => formData.value.fecha[0], (value) => {
  errors.value.fechaDia = validateFechaDia(value)
}, { immediate: true })

watch(() => formData.value.fecha[1], (value) => {
  errors.value.fechaMes = validateFechaMes(value)
}, { immediate: true })

watch(() => formData.value.lugar, (value) => {
  errors.value.lugar = validateLugar(value)
}, { immediate: true })

watch(() => formData.value.descripcion, (value) => {
  errors.value.descripcion = validateDescripcion(value)
}, { immediate: true })

// Validación de artistas
watch(() => formData.value.artists, (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    errors.value.artists = 'Debe agregar al menos 1 artista'
  } else {
    const invalidArtists = {}
    value.forEach((artist, idx) => {
      if (!isValidString(artist.name)) {
        invalidArtists[idx] = 'Nombre requerido'
      } else if (!artist.image_url) {
        invalidArtists[idx] = 'Imagen requerida'
      }
    })
    errors.value.artistsItems = invalidArtists
    errors.value.artists = Object.keys(invalidArtists).length > 0 ? 'Artistas incompletos' : ''
  }
}, { deep: true, immediate: true })

// Validación de tickets
watch(() => formData.value.ticketLinks, (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    errors.value.ticketLinks = 'Debe agregar al menos 1 link de tickets'
  } else {
    const invalidLinks = {}
    value.forEach((link, idx) => {
      if (!isValidString(link.url)) {
        invalidLinks[idx] = 'URL requerida'
      } else if (!isValidString(link.name)) {
        invalidLinks[idx] = 'Nombre requerido'
      }
    })
    errors.value.ticketLinksItems = invalidLinks
    errors.value.ticketLinks = Object.keys(invalidLinks).length > 0 ? 'Links incompletos' : ''
  }
}, { deep: true, immediate: true })

// Computed para verificar si el formulario es válido
const isFormValid = computed(() => {
  return (
    !errors.value.dj &&
    !errors.value.fechaDia &&
    !errors.value.fechaMes &&
    !errors.value.lugar &&
    !errors.value.descripcion &&
    !errors.value.artists &&
    !errors.value.ticketLinks &&
    Object.keys(errors.value.artistsItems).length === 0 &&
    Object.keys(errors.value.ticketLinksItems).length === 0
  )
})

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
        contacts: Array.isArray(t.contacts) ? t.contacts.filter(c => c).map(c => ({
          name: typeof c === 'string' ? '' : (c.contact_name || c.name || ''),
          contact: typeof c === 'string' ? c : (c.contact || '')
        })) : [],
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
      contacts: (t.contacts || []).filter(c => {
        if (typeof c === 'string') {
          return c && c.trim()
        } else if (c && typeof c === 'object' && c.contact) {
          return c.contact && c.contact.trim()
        }
        return false
      }),
    }))
  }

  // Normalizar día y mes solo en el momento de guardar
  const normalizedFecha = [
    normalizeDia(formData.value.fecha[0]),
    normalizeMes(formData.value.fecha[1])
  ]

  emit('save', {
    dj: formData.value.dj,
    fecha: normalizedFecha,
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
    mesas: {
      enabled: formData.value.mesas.enabled,
      image_url: formData.value.mesas.image_url,
      description: formData.value.mesas.description,
      whatsapp_number: formData.value.mesas.whatsapp_number,
      contacts: [],
    },
    ticketLinks: validTicketLinks,
  })
}
</script>

<style scoped>
/* ================== LAYOUT BASE ================== */
.form-wrapper {
  max-width: 850px;
  margin: 0 auto;
}

.form-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 2rem;
  color: #fff;
  margin: 0 0 2.5rem 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* ================== ERRORS ================== */
.upload-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(225, 109, 96, 0.08);
  border: 1px solid rgba(225, 109, 96, 0.3);
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}

.upload-error p {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #E16D60;
  margin: 0;
  flex: 1;
}

.btn-clear-error {
  background: transparent;
  border: none;
  color: #E16D60;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  transition: opacity 0.2s ease;
}

.btn-clear-error:hover {
  opacity: 0.6;
}

/* ================== FORM SECTIONS ================== */
.admin-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-section {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(79, 72, 152, 0.1);
  border-radius: 1.2rem;
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.form-legend {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.35rem;
  color: #4F4898;
  margin: 0;
  font-weight: 700;
}

.form-hint {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #888;
  margin: 0.5rem 0 0 0;
  font-style: italic;
  font-weight: 400;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(79, 72, 152, 0.08);
}

/* ================== FORM GROUPS ================== */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #aaa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.form-input,
.form-textarea {
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(79, 72, 152, 0.15);
  border-radius: 0.7rem;
  color: #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  transition: all 0.25s ease;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #666;
}

.form-input:hover,
.form-textarea:hover {
  border-color: rgba(79, 72, 152, 0.25);
  background: rgba(79, 72, 152, 0.03);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4F4898;
  background: rgba(79, 72, 152, 0.05);
  box-shadow: 0 0 0 3px rgba(79, 72, 152, 0.08);
}

.form-input-small {
  font-size: 0.85rem;
  padding: 0.65rem 0.85rem;
}

.form-textarea {
  resize: vertical;
  min-height: 110px;
  line-height: 1.5;
}

/* ================== GALLERY ITEMS ================== */
.gallery-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-item {
  display: grid;
  grid-template-columns: 130px 1fr auto;
  gap: 1.75rem;
  align-items: start;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(81, 193, 225, 0.1);
  border-radius: 1rem;
  transition: all 0.25s ease;
}

.gallery-item:hover {
  border-color: rgba(81, 193, 225, 0.2);
  background: rgba(81, 193, 225, 0.04);
}

.gallery-preview {
  width: 130px;
  height: 130px;
  border-radius: 0.8rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(79, 72, 152, 0.15);
}

.gallery-preview img,
.gallery-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-empty {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  font-weight: 500;
}

.gallery-info {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.gallery-name {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.05rem;
  color: #51C1E1;
  margin: 0;
  font-weight: 600;
}

/* ================== TRANSPORTS ================== */
.transports-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.transports-items {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.transport-item {
  padding: 1.75rem;
  background: rgba(81, 193, 225, 0.03);
  border: 1px solid rgba(81, 193, 225, 0.12);
  border-radius: 0.9rem;
}

.transport-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
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
  gap: 1.5rem;
}

/* ================== LISTS ================== */
.contacts-list,
.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 0;
}

.contact-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.85rem;
  align-items: center;
}

.link-item-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-item-group > .btn-remove {
  align-self: flex-end;
  margin-top: 0.5rem;
}

.link-inputs {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0.85rem;
}

.contact-item-group {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.85rem;
  align-items: flex-start;
}

.contact-item-inputs {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0.85rem;
}

/* ================== PREVIEWS ================== */
.image-preview {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-top: 1rem;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid rgba(79, 72, 152, 0.1);
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: contain;
  background: rgba(0, 0, 0, 0.15);
}

/* ================== BUTTONS ================== */
.btn-remove-image {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: #E16D60;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove-image:hover {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.btn-remove {
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: 1.5px solid rgba(225, 109, 96, 0.4);
  color: #E16D60;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove:hover {
  border-color: #E16D60;
  background: rgba(225, 109, 96, 0.08);
}

.admin-btn-small {
  padding: 0.6rem 1.2rem;
  font-size: 0.75rem;
  align-self: flex-start;
}

/* ================== TOGGLE ================== */
.form-toggle {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
}

.toggle-input {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 52px;
  height: 30px;
  background: #333;
  border-radius: 15px;
  transition: all 0.25s ease;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.toggle-slider::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.toggle-input:checked + .toggle-slider {
  background: #4F4898;
  border-color: #4F4898;
}

.toggle-input:checked + .toggle-slider::after {
  left: 24px;
}

.toggle-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #aaa;
  font-weight: 500;
}

/* ================== ACTIONS ================== */
.form-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: flex-end;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(79, 72, 152, 0.1);
}

.admin-btn {
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.85rem 1.75rem;
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

.admin-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ================== EMPTY SECTION MESSAGE ================== */
.empty-section-message {
  text-align: center;
  padding: 2rem 1.5rem;
  background: rgba(79, 72, 152, 0.03);
  border: 1px dashed rgba(79, 72, 152, 0.15);
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.empty-section-message p {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

/* ================== VALIDATION MESSAGES ================== */
.form-input-error,
.form-textarea.form-input-error {
  border-color: #E16D60 !important;
  background: rgba(225, 109, 96, 0.05) !important;
}

.form-input-error:focus,
.form-textarea.form-input-error:focus {
  box-shadow: 0 0 0 3px rgba(225, 109, 96, 0.08) !important;
}

.form-error-message {
  display: block;
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #E16D60;
  margin-top: 0.4rem;
  font-weight: 500;
}

/* ================== RESPONSIVE ================== */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 0 1rem;
  }

  .form-title {
    font-size: 1.75rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .form-legend {
    font-size: 1.2rem;
  }

  .gallery-item {
    grid-template-columns: 110px 1fr auto;
    gap: 1.25rem;
  }

  .gallery-preview {
    width: 110px;
    height: 110px;
  }

  .link-inputs,
  .contact-item-inputs {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .form-wrapper {
    max-width: 100%;
  }

  .form-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-section {
    padding: 1.25rem;
    gap: 0.5rem;
  }

  .gallery-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .gallery-preview {
    width: 100%;
    height: 180px;
  }

  .admin-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.7rem;
  }

  .admin-btn-small {
    padding: 0.5rem 1rem;
  }
}
</style>
