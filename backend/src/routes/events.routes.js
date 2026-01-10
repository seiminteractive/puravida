import express from 'express'
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/events.controller.js'
import { validateCreateEvent, validateUpdateEvent } from '../validators/events.validator.js'

const router = express.Router()

// GET /api/events - Obtener todos los eventos
router.get('/', getAllEvents)

// GET /api/events/:id - Obtener un evento por ID
router.get('/:id', getEventById)

// POST /api/events - Crear nuevo evento
router.post('/', validateCreateEvent, createEvent)

// PUT /api/events/:id - Actualizar evento
router.put('/:id', validateUpdateEvent, updateEvent)

// DELETE /api/events/:id - Eliminar evento
router.delete('/:id', deleteEvent)

export default router
