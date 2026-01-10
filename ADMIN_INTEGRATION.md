# 🎵 Pura Vida - Admin Panel & API Integration

## 📋 Resumen

Se ha integrado completamente el panel administrativo con la API backend. Ahora los eventos se cargan desde la base de datos en tiempo real, con capacidad de crear, editar y eliminar eventos.

## ✨ Características Principales

### Panel de Admin (`/admin`)
- ✅ **Listar eventos** desde la DB en tiempo real
- ✅ **Crear eventos** con validación completa
- ✅ **Editar eventos** existentes
- ✅ **Eliminar eventos** con confirmación
- ✅ **Estados de carga** y errores
- ✅ **Refresh automático** después de guardar/editar

### Upload a Firebase
- ✅ **Upload de imágenes** de artistas → `/api/upload/image`
- ✅ **Upload de videos** (hospedaje) → `/api/upload/video`
- ✅ **URLs persistentes** guardadas en la DB
- ✅ **Validación de tipos** de archivo
- ✅ **Límite de 100MB** por archivo

## 🏗️ Arquitectura

### Frontend (Vue 3)
```
src/
  ├─ composables/
  │  └─ useEvents.js          → Composable para estado de eventos
  ├─ services/
  │  └─ apiService.js         → Servicios de API REST + Firebase
  ├─ components/admin/
  │  └─ AdminEventForm.vue    → Formulario con upload Firebase
  └─ views/
     └─ AdminPanel.vue        → Panel principal
```

### Backend (Node.js + Express)
```
backend/src/
  ├─ config/
  │  └─ firebase.js           → Admin SDK + uploads
  ├─ middleware/
  │  ├─ upload.js             → Multer + Firebase middleware
  │  └─ errorHandler.js       → Manejo de errores
  ├─ routes/
  │  ├─ events.routes.js      → CRUD de eventos
  │  └─ upload.routes.js      → Upload endpoints
  ├─ services/
  │  └─ events.service.js     → Lógica de negocios
  └─ server.js                → Servidor Express
```

## 🚀 Instalación y Configuración

### 1️⃣ Backend Setup

```bash
cd backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp env.example .env

# Editar .env con credenciales Firebase
nano .env
```

**Variables requeridas en `.env`:**
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=puravida_events
CORS_ORIGIN=http://localhost:5173

# Firebase credentials (ya incluidas)
FIREBASE_PROJECT_ID=progen-ce347
FIREBASE_STORAGE_BUCKET=progen-ce347.firebasestorage.app
FIREBASE_PRIVATE_KEY=...
```

### 2️⃣ Base de Datos

```bash
# Crear base de datos y tablas
mysql -u root < ../database/schema.sql
```

### 3️⃣ Frontend Setup

```bash
# En la raíz del proyecto
npm install

# Crear .env.local (si es necesario)
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
```

### 4️⃣ Iniciar Desarrollo

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

Acceder a:
- **App**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5173/admin`
- **API Health**: `http://localhost:3001/health`

## 📡 API Endpoints

### Eventos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/events` | Obtener todos los eventos |
| GET | `/api/events/:id` | Obtener evento por ID |
| POST | `/api/events` | Crear nuevo evento |
| PUT | `/api/events/:id` | Actualizar evento |
| DELETE | `/api/events/:id` | Eliminar evento |

### Upload Firebase

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/upload/image` | Subir imagen a Firebase |
| POST | `/api/upload/video` | Subir video a Firebase |
| POST | `/api/upload/artist` | Subir imagen de artista |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verificar estado del servidor |

## 💡 Uso del Panel de Admin

### Crear Evento

1. Acceder a `/admin`
2. Click en tab "Crear Evento"
3. Completar formulario:
   - **Información Base**: DJ, fecha, lugar, descripción
   - **Artistas**: Nombre + imagen/video (subida a Firebase)
   - **Transporte** (opcional): Nombre, imagen, descripción, contactos
   - **Hospedaje** (opcional): Imagen/video, descripción
   - **Tickets**: Al menos 1 link de compra
4. Click "Crear Evento"
5. Se guarda en DB y se actualiza lista automáticamente

### Editar Evento

1. En tab "Eventos", click en "Editar"
2. Formulario se llena con datos existentes
3. Modificar campos necesarios
4. Click "Actualizar Evento"

### Eliminar Evento

1. En tab "Eventos", click en "Eliminar"
2. Confirmar en modal
3. Se elimina y lista se actualiza

## 🔄 Flujo de Datos

```
Usuario carga archivo
    ↓
handleMediaUpload() captura archivo
    ↓
uploadImage/uploadVideo() sube a Firebase
    ↓
Firebase Admin SDK retorna URL pública
    ↓
URL se guarda en formData.image_url
    ↓
submitForm() envía JSON con URL a API
    ↓
Backend guarda URL en DB
    ↓
loadEvents() refresca lista desde DB
```

## 🛠️ Desarrollo

### Agregar nuevo field a Evento

1. **Backend**: Agregar columna en `database/schema.sql`
2. **Backend**: Incluir en POST/PUT validation
3. **Frontend**: Agregar input en `AdminEventForm.vue`
4. **Frontend**: Incluir en `submitForm()`

### Agregar nuevo upload endpoint

```javascript
// backend/src/routes/upload.routes.js
router.post('/custom', upload.single('file'), uploadToFirebase('events/custom'), (req, res) => {
  res.json({ success: true, url: req.fileUrl })
})
```

```javascript
// src/services/apiService.js
export const uploadCustom = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${API_URL}/upload/custom`, { method: 'POST', body: formData })
  return (await response.json()).url
}
```

## 🔒 Seguridad

- ✅ Validación de tipos de archivo (multer)
- ✅ Límite de 100MB por archivo
- ✅ URLs Firebase públicas pero única en timestamp
- ✅ CORS configurado
- ✅ Helmet para headers de seguridad
- ✅ Error handling centralizado

## 📸 Preview de Cambios

### Estado de Carga
```
[Spinner] Cargando eventos...
```

### Error State
```
❌ Error conectando a la API
[Reintentar]
```

### Grid de Eventos
```
┌─────────────────────┐
│  Mariano Mellino    │ 17/07
│  Hotel Termas       │
│  Una noche mágica...│
│  [Editar] [Eliminar]│
└─────────────────────┘
```

## ✅ Checklist de Implementación

- [x] Composable `useEvents` para estado centralizado
- [x] Servicio de API completo (`apiService.js`)
- [x] Firebase Admin SDK integrado
- [x] Multer + Firebase middleware
- [x] Upload endpoints (/image, /video, /artist)
- [x] AdminPanel conectado a API
- [x] AdminEventForm con upload Firebase
- [x] Estados de loading/error en UI
- [x] Refresh automático después de save
- [x] Validación de datos completa
- [x] Error handling en frontend y backend

## 📝 Notas

- Los eventos se cargan automáticamente al entrar al admin
- Después de guardar/editar, se refrescan automáticamente
- Las imágenes/videos se suben a Firebase antes de guardar
- Las URLs se guardan en la DB para persistencia
- El panel es completamente reactivo

¡Listo para producción! 🎉
