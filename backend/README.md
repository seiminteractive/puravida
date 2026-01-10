# Pura Vida Backend API

API REST para gestión de eventos de Pura Vida.

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar variables de entorno
```bash
cp env.example .env
# Editar .env con tus credenciales de MySQL
```

### 3. Crear base de datos
```bash
# Opción A: Con MySQL local
mysql -u root -p < ../database/schema.sql

# Opción B: Con Docker
docker run --name puravida-mysql \
  -e MYSQL_ROOT_PASSWORD=puravida123 \
  -e MYSQL_DATABASE=puravida_events \
  -p 3306:3306 \
  -d mysql:8.0

# Esperar 10 segundos y ejecutar schema
docker exec -i puravida-mysql mysql -u root -ppuravida123 < ../database/schema.sql
```

### 4. Iniciar servidor
```bash
npm run dev  # Desarrollo con nodemon
npm start    # Producción
```

## 📡 Endpoints API

### Eventos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/events` | Obtener todos los eventos |
| GET | `/api/events/:id` | Obtener evento por ID |
| POST | `/api/events` | Crear nuevo evento |
| PUT | `/api/events/:id` | Actualizar evento |
| DELETE | `/api/events/:id` | Eliminar evento |

### Upload a Firebase

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/upload/image` | Subir imagen a Firebase |
| POST | `/api/upload/video` | Subir video a Firebase |
| POST | `/api/upload/artist` | Subir imagen de artista |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verificar estado del servidor |

## 📝 Ejemplo de Request

### Crear Evento

```json
POST /api/events
{
  "dj": "Mariano Mellino",
  "fecha_dia": "17",
  "fecha_mes": "07",
  "lugar": "Hotel Termas de Victoria, Entre Ríos",
  "descripcion": "Una noche mágica donde la música y el agua se encuentran.",
  "transports_enabled": true,
  "artists": [
    {
      "artist_name": "Mariano Mellino",
      "image_url": "https://storage.googleapis.com/.../dj1.png",
      "media_type": "image"
    }
  ],
  "tickets": [
    {
      "ticketer_name": "PassLine",
      "link_url": "https://passline.com/evento"
    }
  ],
  "mesas": {
    "enabled": true,
    "image_url": "https://storage.googleapis.com/.../mesas.png",
    "description": "Reserva tu espacio exclusivo",
    "whatsapp_number": "+5491234567890"
  }
}
```

### Upload Imagen a Firebase

```bash
curl -X POST http://localhost:3001/api/upload/image \
  -F "file=@/path/to/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "https://storage.googleapis.com/progen-ce347.firebasestorage.app/events/images/1703001234567-image.jpg"
}
```

### Upload Video a Firebase

```bash
curl -X POST http://localhost:3001/api/upload/video \
  -F "file=@/path/to/video.mp4"
```

**Response:**
```json
{
  "success": true,
  "message": "Video uploaded successfully",
  "url": "https://storage.googleapis.com/progen-ce347.firebasestorage.app/events/videos/1703001234567-video.mp4"
}

## 🔧 Tecnologías

- Node.js
- Express.js
- MySQL 2 (con promises)
- Express Validator
- Helmet (seguridad)
- CORS
- Dotenv

## 📁 Estructura

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración MySQL
│   ├── controllers/
│   │   └── events.controller.js # Lógica de endpoints
│   ├── services/
│   │   └── events.service.js    # Queries a DB
│   ├── routes/
│   │   └── events.routes.js     # Rutas API
│   ├── validators/
│   │   └── events.validator.js  # Validaciones
│   ├── middleware/
│   │   └── errorHandler.js      # Manejo de errores
│   └── server.js                # Entry point
├── package.json
└── env.example
```
