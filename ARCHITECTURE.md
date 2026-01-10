# 🏗️ Arquitectura - Panel Admin + API + Firebase

## 📐 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                         PURA VIDA                                │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐      ┌─────────────────────────────────┐
│      FRONTEND (Vue 3)        │      │      BACKEND (Node.js)          │
│   http://localhost:5173      │      │   http://localhost:3001         │
│                              │      │                                 │
│  AdminPanel.vue              │      │  Express Server                 │
│  ├─ useEvents.js             │      │  ├─ config/firebase.js          │
│  ├─ AdminEventForm.vue       │◄────►│  ├─ routes/events.js            │
│  └─ apiService.js            │      │  ├─ routes/upload.js           │
│                              │      │  ├─ middleware/upload.js        │
│                              │      │  └─ services/events.service.js  │
│                              │      │                                 │
└──────────────────────────────┘      └─────────────────────────────────┘
         │                                        │
         │ fetch()                                │ mysql2
         │ multipart/form-data                    │
         │                                        │
         └────────────────────┬───────────────────┘
                              │
         ┌────────────────────┴───────────────────┐
         │                                        │
    ┌────▼──────────────────┐          ┌──────────▼─────────┐
    │   Firebase Storage    │          │   MySQL Database   │
    │  (progen-ce347)       │          │  (puravida_events) │
    │                       │          │                    │
    │ /events/images/       │          │ tables:            │
    │ /events/videos/       │          │ - events           │
    │ /events/artists/      │          │ - event_artists    │
    │                       │          │ - event_transports │
    │ URLs públicas         │          │ - event_mesas      │
    │ (persistentes)        │          │ - event_lodging    │
    └───────────────────────┘          └────────────────────┘
```

## 🔀 Flujos de Datos

### 1️⃣ FLUJO DE LECTURA: Cargar Eventos

```
User accede /admin
    ↓
AdminPanel.vue monta
    ↓
useEvents() composable
    ├─ onMounted()
    └─ loadEvents()
       ↓
   apiService.fetchEvents()
       ↓
   GET /api/events
       ↓
   backend/routes/events.js
       ├─ getEvents controller
       ├─ events.service.js
       └─ SELECT FROM events
           ├─ id
           ├─ dj
           ├─ fecha_dia
           ├─ fecha_mes
           ├─ lugar
           ├─ descripcion
           ├─ media_url (Firebase URL)
           └─ ...
       ↓
   Retorna JSON []
       ↓
   events.value = data
       ↓
   Renderizar grid con eventos
```

### 2️⃣ FLUJO DE UPLOAD: Subir Imagen a Firebase

```
User selecciona archivo
    ↓
handleMediaUpload(event, 'artist', index)
    ↓
uploadImage(file)
    ├─ FormData append(file)
    └─ POST /api/upload/image
       ↓
   multer.single('file')
       ├─ Validar tipo MIME
       ├─ Validar tamaño (<100MB)
       └─ Buffer en memoria
       ↓
   uploadToFirebase middleware
       ├─ Firebase Admin SDK
       ├─ bucket.file(path)
       ├─ file.save(buffer)
       └─ Generar URL pública
       ↓
   { success: true, url: "https://..." }
       ↓
   formData.artists[index].image_url = url
       ↓
   Mostrar preview de imagen
```

### 3️⃣ FLUJO DE CREACIÓN: Guardar Evento

```
User completa formulario + uploads
    ↓
submitForm()
    ├─ Validar campos requeridos
    ├─ Validar artistas con imagen_url
    ├─ Validar links de ticket
    └─ Preparar payload
       ├─ dj
       ├─ fecha: [dia, mes]
       ├─ lugar
       ├─ descripcion
       ├─ artists: [{ name, image_url: "https://..." }]
       ├─ transports: [...]
       ├─ lodging: { image_url: "https://..." }
       └─ ticketLinks: [{ name, url }]
       ↓
   emit('save', data)
       ↓
   AdminPanel: saveEvent(eventData)
       ↓
   isSubmitting = true
       ↓
   createEvent(payload)
       ├─ POST /api/events
       └─ Body: { dj, fecha_dia, fecha_mes, ... }
           ↓
       backend/controllers/events.js
           ├─ validateCreateEvent (middleware)
           ├─ events.service.createEvent(data)
           └─ INSERT INTO events VALUES(...)
           ↓
       Retorna: { id: 123, ...data }
           ↓
       refreshEvents()
           └─ loadEvents() (recarga DB)
       ↓
   activeTab = 'events' (mostrar lista)
       ↓
   Grid actualizado con nuevo evento
```

### 4️⃣ FLUJO DE ACTUALIZACIÓN: Editar Evento

```
User click "Editar" en evento
    ↓
editEvent(event)
    ├─ editingEvent = {...event}
    └─ activeTab = 'create'
       ↓
   AdminEventForm.vue
       └─ watch props.event
           ├─ Llenar formData con datos existentes
           └─ image_url ya apunta a Firebase
       ↓
User modifica campos + reuploads
    ↓
submitForm()
    ├─ Validar (igual que crear)
    └─ emit('save', updatedData)
       ↓
   AdminPanel: saveEvent(eventData)
       ├─ editingEvent.id exists?
       └─ YES → updateEvent(id, payload)
           ├─ PUT /api/events/123
           └─ Body: { dj, fecha_dia, ... }
               ↓
           backend/controllers/events.js
               ├─ validateUpdateEvent
               ├─ events.service.updateEvent(id, data)
               └─ UPDATE events SET ... WHERE id = 123
               ↓
           Retorna: { id: 123, ...updatedData }
               ↓
           refreshEvents()
               └─ loadEvents() (recargar)
       ↓
   Grid actualizado automáticamente
```

### 5️⃣ FLUJO DE ELIMINACIÓN: Borrar Evento

```
User click "Eliminar" en evento
    ↓
deleteEvent(id)
    ├─ Mostrar confirm dialog
    └─ if (confirmed)
       ↓
   removeEvent(id)
       └─ DELETE /api/events/123
           ↓
       backend/controllers/events.js
           ├─ events.service.deleteEvent(id)
           └─ DELETE FROM events WHERE id = 123
           ↓
       Retorna: true/204
           ↓
       refreshEvents()
           └─ loadEvents()
       ↓
   Grid actualizado (evento removido)
```

## 📊 Estado de Componentes

### AdminPanel.vue
```javascript
activeTab: ref('events')              // 'events' | 'create' | 'settings'
tabs: ['events', 'create', 'settings']
editingEvent: ref(null)               // { id, dj, fecha, ... }
isSubmitting: ref(false)

// Del composable useEvents
events: ref([])                       // Array de eventos de DB
loading: ref(false)                   // Loading state
error: ref(null)                      // Error message
hasRefreshed: ref(false)              // Indica si se cargaron eventos

// Métodos
editEvent(event)        // Abrir formulario con evento
cancelEdit()            // Volver a lista
saveEvent(eventData)    // Crear o actualizar
deleteEvent(id)         // Eliminar con confirmación
refreshEvents()         // Recargar desde DB
```

### AdminEventForm.vue
```javascript
formData: ref({
  dj: '',                             // String
  fecha: ['', ''],                    // [dia, mes]
  lugar: '',                          // String
  descripcion: '',                    // String
  artists: [                          // Array
    { name: 'DJ Name', image_url: 'https://...' }
  ],
  transports: [                       // Array
    { 
      name: 'Transporte', 
      image_url: 'https://...',
      description: '',
      contacts: ['+54 9 11 ...']
    }
  ],
  lodging: {                          // Object
    enabled: false,
    image_url: 'https://...',
    description: ''
  },
  ticketLinks: [                      // Array
    { name: 'Ticketmaster', url: 'https://...' }
  ]
})

isUploading: ref(false)               // Durante upload a Firebase
uploadError: ref(null)                // Error de upload

// Métodos
handleMediaUpload(e, type, target)    // type: 'artist'|'transport'|'lodging'
submitForm()                          // Validar y emitir
```

## 🌐 API Contracts

### GET /api/events
```javascript
// Response:
[
  {
    id: 1,
    dj: "Mariano Mellino",
    fecha_dia: "17",
    fecha_mes: "07",
    lugar: "Hotel Termas de Victoria, Entre Ríos",
    descripcion: "Una noche mágica...",
    media_url: "https://storage.googleapis.com/.../video.mp4",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  }
]
```

### POST /api/events
```javascript
// Body:
{
  dj: "Mariano Mellino",
  fecha_dia: "17",
  fecha_mes: "07",
  lugar: "Hotel Termas...",
  descripcion: "...",
  media_url: "https://...", // NULLABLE
  transport: {...},          // NULLABLE
  lodging: {...},            // NULLABLE
  ...
}

// Response: 201 Created
{ id: 1, ...data, created_at, updated_at }
```

### POST /api/upload/image
```javascript
// Body: multipart/form-data
file: <binary>

// Response:
{
  success: true,
  message: "Image uploaded successfully",
  url: "https://storage.googleapis.com/progen-ce347.firebasestorage.app/events/images/1705329600000-filename.jpg"
}
```

## 🔐 Validación

### Frontend
- ✅ DJ: required, string, max 100
- ✅ Fecha: required, numeric, valid day/month
- ✅ Lugar: required, string, max 200
- ✅ Descripción: required, string, max 1000
- ✅ Artistas: min 1, cada uno con name + image_url
- ✅ TicketLinks: min 1, cada uno con URL válida
- ✅ Media: JPG, PNG, WebP, MP4 (max 100MB)

### Backend (express-validator)
- ✅ dj: trim, isLength(1, 100)
- ✅ fecha_dia: isNumeric, matches(/^(0[1-9]|[12]\d|3[01])$/)
- ✅ fecha_mes: isNumeric, matches(/^(0[1-9]|1[0-2])$/)
- ✅ lugar: trim, isLength(1, 200)
- ✅ descripcion: trim, isLength(1, 1000)

## 📚 Dependencias

### Frontend
```json
{
  "vue": "^3.3.0",
  "vue-router": "^4.0.0",
  "pinia": "^2.0.0",
  "axios": "optional (using fetch)"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "firebase-admin": "^12.0.0",
  "multer": "^1.4.5-lts.1",
  "express-validator": "^7.0.1",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "dotenv": "^16.3.1"
}
```

## 🔗 Integración Frontend-Backend

```
HTTP Request (fetch API)
├─ Headers:
│  ├─ Content-Type: application/json (POST/PUT)
│  └─ Content-Type: multipart/form-data (Upload)
├─ Method: GET | POST | PUT | DELETE
├─ URL: http://localhost:3001/api/...
└─ Body: JSON o FormData

HTTP Response (JSON)
├─ Status: 200 | 201 | 204 | 400 | 500
├─ Headers:
│  ├─ Access-Control-Allow-Origin: http://localhost:5173
│  └─ Content-Type: application/json
└─ Body: { success, data, error?, message? }
```

¡Arquitectura lista! 🎉
