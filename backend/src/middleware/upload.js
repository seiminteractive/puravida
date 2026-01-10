import multer from 'multer'
import { uploadFileToFirebase } from '../config/firebase.js'

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage()

// Filtro de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`), false)
  }
}

// Crear instancia de multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
})

/**
 * Middleware para subir archivo a Firebase
 * @param {string} folder - Carpeta en Firebase
 * @returns {Function} Middleware
 */
export const uploadToFirebase = (folder = 'uploads') => {
  return async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        })
      }

      const fileUrl = await uploadFileToFirebase(
        req.file.buffer,
        req.file.originalname,
        folder,
        req.file.mimetype
      )

      // Guardar URL en request para usar en el siguiente middleware
      req.fileUrl = fileUrl

      next()
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({
        success: false,
        message: 'Error uploading file',
        error: error.message
      })
    }
  }
}

export default { upload, uploadToFirebase }
