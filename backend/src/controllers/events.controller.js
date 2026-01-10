import * as eventsService from '../services/events.service.js'
import { validationResult } from 'express-validator'

// GET /api/events
export const getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents()
    res.json({
      success: true,
      data: events
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos',
      error: error.message
    })
  }
}

// GET /api/events/:id
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const event = await eventsService.getEventById(id)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      })
    }

    res.json({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener evento',
      error: error.message
    })
  }
}

// POST /api/events
export const createEvent = async (req, res) => {
  try {
    // Validar errores de express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }

    const eventData = req.body
    const newEvent = await eventsService.createEvent(eventData)
    
    res.status(201).json({
      success: true,
      message: 'Evento creado exitosamente',
      data: newEvent
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({
      success: false,
      message: 'Error al crear evento',
      error: error.message
    })
  }
}

// PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    // Validar errores de express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }

    const { id } = req.params
    const eventData = req.body
    
    const updatedEvent = await eventsService.updateEvent(id, eventData)
    
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      })
    }

    res.json({
      success: true,
      message: 'Evento actualizado exitosamente',
      data: updatedEvent
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({
      success: false,
      message: 'Error al actualizar evento',
      error: error.message
    })
  }
}

// DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await eventsService.deleteEvent(id)
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      })
    }

    res.json({
      success: true,
      message: 'Evento eliminado exitosamente'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({
      success: false,
      message: 'Error al eliminar evento',
      error: error.message
    })
  }
}
