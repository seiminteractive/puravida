# 🔧 Troubleshooting - Admin Panel + API + Firebase

## ⚠️ Problemas Comunes

### 1. Backend no inicia

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solución:**
```bash
# Verificar MySQL está corriendo
brew services list | grep mysql
# Iniciar si está apagado
brew services start mysql
# O con docker
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:latest
```

---

### 2. Error: "Cannot find module 'firebase-admin'"

```
Error: Cannot find module 'firebase-admin'
```

**Solución:**
```bash
cd backend
npm install firebase-admin --save
npm install multer --save
```

---

### 3. Firebase credentials not working

```
Error: Firebase initialization failed
UnauthorizedError: Invalid credentials
```

**Solución:**
1. Verificar `.env` tiene las credenciales correctas
2. Verificar FIREBASE_PRIVATE_KEY tiene `\n` escapeados:
   ```bash
   # CORRECTO:
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvg..."
   
   # INCORRECTO:
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   MIIEvg..."
   ```

3. Re-generar credenciales en Firebase Console:
   - Ir a Project Settings → Service Accounts
   - Click "Generate new private key"
   - Copiar JSON completo

---

### 4. CORS error en admin panel

```
Access to XMLHttpRequest at 'http://localhost:3001/api/events' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solución:**
```javascript
// backend/src/server.js - Verificar CORS:
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
```

O agregar a `.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

---

### 5. Upload a Firebase falla

```
Error: Firebase upload failed: Permission denied
```

**Soluciones:**

A) Verificar reglas en Firebase Console:
```javascript
// Ir a Storage → Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;  // Desarrollo solamente
    }
  }
}
```

B) Verificar Firebase Admin SDK está inicializado:
```javascript
// backend/src/config/firebase.js
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})
```

C) Verificar credenciales en .env no están truncadas

---

### 6. Admin panel no carga eventos

```
Empty State: "No hay eventos creados"
But DB tiene eventos
```

**Debug Steps:**

```bash
# 1. Verificar API retorna datos
curl http://localhost:3001/api/events

# 2. Si está vacío, verificar DB
mysql
> USE puravida_events;
> SELECT * FROM events;

# 3. Si DB vacío, insertar test evento
> INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion) 
  VALUES ('Test DJ', '01', '01', 'Test Venue', 'Test Description');
```

**Si API retorna error 500:**
```javascript
// Backend console debe mostrar error
// Verificar:
// - DB connection works
// - Table exists
// - Columns match schema
```

---

### 7. Upload de imagen falla con "413 Payload Too Large"

```
Error: Request Entity Too Large
```

**Solución:**
```javascript
// backend/src/server.js - Aumentar límite
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

// O en multer:
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
})
```

---

### 8. FormData no se envía correctamente

```
Backend recibe undefined o null en campos
```

**Solución - Verificar handleMediaUpload:**
```javascript
// ✅ CORRECTO
const handleMediaUpload = async (e, type, target) => {
  const file = e.target.files?.[0]  // Usar optional chaining
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)     // Usar 'file' como key
  const response = await fetch(`${API_URL}/upload/image`, {
    method: 'POST',
    body: formData                   // NO agregar Content-Type
  })
}
```

---

### 9. Validación rechaza evento válido

```
Error: "Cada artista debe tener nombre e imagen/video"
Pero artista tiene nombre
```

**Debug:**
```javascript
// AdminEventForm.vue - submitForm()
console.log('Artists:', formData.value.artists)
// Verificar que image_url NO esté null

// Si está null, verificar:
// - Upload finalizó sin error
// - URL se asignó correctamente en handleMediaUpload
// - isUploading = false al terminar
```

---

### 10. Eventos no se refrescan después de guardar

```
Creo evento pero sigue en "Empty State"
```

**Verificar:**
```javascript
// AdminPanel.vue - saveEvent()
console.log('Save event response:', newEvent)

// Luego verificar:
console.log('Events después de refresh:', events.value)

// Si sigue vacío, revisar refreshEvents():
const { events, refreshEvents } = useEvents()
// Debe hacer GET /api/events
```

---

### 11. Base de datos vacía después de reiniciar backend

**Esto es normal** - Los datos se guardan en MySQL, no en memoria.

Para verificar:
```bash
mysql -u root puravida_events
SELECT * FROM events;
```

Si está vacía:
```bash
# Reiniciar desde schema
mysql -u root < database/schema.sql
```

---

### 12. Error "Table already exists"

```
Error: ER_TABLE_EXISTS_ERROR
```

**Solución:**
```bash
# Drop y recrear
mysql -u root -e "DROP DATABASE puravida_events;"
mysql -u root < database/schema.sql

# O solo limpiar datos
mysql -u root -e "DELETE FROM puravida_events.events;"
```

---

## 🔍 Debugging Checklist

### Frontend Debug

```javascript
// browser console
console.log('API_URL:', import.meta.env.VITE_API_URL)
console.log('Events loaded:', events.value)
console.log('Error state:', error.value)
console.log('Loading state:', loading.value)
```

**Network Tab:**
- Ver requests a `http://localhost:3001/api/...`
- Verificar status (200, 201, 400, 500)
- Ver response JSON
- Ver headers de CORS

### Backend Debug

```javascript
// Terminal - Enable verbose
NODE_ENV=development npm run dev

// En rutas:
app.get('/api/events', (req, res) => {
  console.log('GET /api/events')
  try {
    // ...
  } catch(err) {
    console.error('Error:', err)
  }
})
```

### Database Debug

```bash
# Conectar interactivamente
mysql -u root

# Listar datos
USE puravida_events;
SELECT COUNT(*) FROM events;
SELECT * FROM events;

# Ver estructura
DESC events;

# Verificar foreign keys
SELECT CONSTRAINT_NAME, TABLE_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'events';
```

### Firebase Debug

```javascript
// backend/src/config/firebase.js
console.log('Firebase initialized')
console.log('Project ID:', process.env.FIREBASE_PROJECT_ID)
console.log('Storage bucket:', process.env.FIREBASE_STORAGE_BUCKET)

// En upload endpoint:
const uploadFileToFirebase = async (fileBuffer, fileName, folder) => {
  console.log('Uploading:', fileName, 'to:', folder)
  const url = ...
  console.log('Upload result:', url)
  return url
}
```

---

## 🚨 Error Status Codes

| Código | Significado | Solución |
|--------|-----------|----------|
| 200 | OK | Exitoso |
| 201 | Created | Evento creado exitosamente |
| 204 | No Content | Eliminado exitosamente |
| 400 | Bad Request | Validación fallida - revisar datos |
| 404 | Not Found | Evento no existe - revisar ID |
| 413 | Payload Too Large | Archivo muy grande - límite 100MB |
| 500 | Server Error | Error backend - revisar logs |
| 503 | Service Unavailable | Backend offline o DB offline |

---

## 💡 Performance Tips

### Si admin lenta al cargar eventos:

```javascript
// useEvents.js - Agregar paginación
const PAGE_SIZE = 50

export const useEvents = () => {
  const page = ref(1)
  
  const loadEvents = async () => {
    const skip = (page.value - 1) * PAGE_SIZE
    const response = await fetch(
      `${API_URL}/events?skip=${skip}&limit=${PAGE_SIZE}`
    )
  }
}
```

### Si upload es lento:

```javascript
// Comprimir imagen antes de upload
const compressImage = async (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, 800, 600)
      canvas.toBlob(resolve, 'image/jpeg', 0.8)
    }
  })
}
```

---

## 📞 Support

Si el problema persiste:

1. Revisar documentación:
   - ADMIN_INTEGRATION.md
   - ARCHITECTURE.md
   - CHANGES_SUMMARY.md

2. Check logs:
   ```bash
   # Frontend
   browser console (F12)
   
   # Backend
   terminal output
   
   # Database
   mysql logs
   ```

3. Common patterns:
   - Asegurar credenciales en .env
   - Verificar puertos (5173, 3001, 3306)
   - Limpiar cache: Ctrl+Shift+R
   - Reiniciar servicios

¡Listo para resolver! 🎯
