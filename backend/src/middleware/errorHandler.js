// Middleware para manejar errores globales
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  const status = err.status || 500
  const message = err.message || 'Error interno del servidor'

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  })
}
