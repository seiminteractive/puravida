import { body } from 'express-validator'

export const validateCreateEvent = [
  body('dj')
    .notEmpty()
    .withMessage('El nombre del DJ es requerido')
    .isString()
    .trim(),
  
  body('fecha_dia')
    .notEmpty()
    .withMessage('El día es requerido')
    .isLength({ min: 2, max: 2 })
    .withMessage('El día debe tener 2 dígitos')
    .matches(/^[0-9]{2}$/)
    .withMessage('El día debe ser numérico'),
  
  body('fecha_mes')
    .notEmpty()
    .withMessage('El mes es requerido')
    .isLength({ min: 2, max: 2 })
    .withMessage('El mes debe tener 2 dígitos')
    .matches(/^[0-9]{2}$/)
    .withMessage('El mes debe ser numérico'),
  
  body('lugar')
    .notEmpty()
    .withMessage('El lugar es requerido')
    .isString()
    .trim(),
  
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isString()
    .trim(),
  
  body('artists')
    .isArray({ min: 1 })
    .withMessage('Debe haber al menos un artista'),
  
  body('artists.*.artist_name')
    .notEmpty()
    .withMessage('El nombre del artista es requerido'),
  
  body('artists.*.image_url')
    .notEmpty()
    .withMessage('La URL de imagen del artista es requerida'),
  
  body('tickets')
    .isArray({ min: 1 })
    .withMessage('Debe haber al menos un link de tickets'),
  
  body('tickets.*.ticketer_name')
    .notEmpty()
    .withMessage('El nombre de la ticketera es requerido'),
  
  body('tickets.*.link_url')
    .notEmpty()
    .withMessage('El link de tickets es requerido')
    .isURL()
    .withMessage('Debe ser una URL válida')
]

export const validateUpdateEvent = [
  body('dj')
    .optional()
    .isString()
    .trim(),
  
  body('fecha_dia')
    .optional()
    .isLength({ min: 2, max: 2 })
    .matches(/^[0-9]{2}$/),
  
  body('fecha_mes')
    .optional()
    .isLength({ min: 2, max: 2 })
    .matches(/^[0-9]{2}$/),
  
  body('lugar')
    .optional()
    .isString()
    .trim(),
  
  body('descripcion')
    .optional()
    .isString()
    .trim(),
  
  body('artists')
    .optional()
    .isArray({ min: 1 }),
  
  body('tickets')
    .optional()
    .isArray({ min: 1 })
]
