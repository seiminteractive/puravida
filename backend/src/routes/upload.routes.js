import express from 'express'
import { upload, uploadToFirebase } from '../middleware/upload.js'

const router = express.Router()

/**
 * POST /api/upload/image
 * Upload imagen a Firebase Storage
 */
router.post('/image', upload.single('file'), (req, res, next) => {
  console.log('📤 Image upload request received')
  console.log('File:', req.file?.originalname, req.file?.mimetype)
  console.log('Firebase project:', process.env.FIREBASE_PROJECT_ID)
  next()
}, uploadToFirebase('events/images'), (req, res) => {
  res.json({
    success: true,
    message: 'Image uploaded successfully',
    url: req.fileUrl
  })
})

/**
 * POST /api/upload/video
 * Upload video a Firebase Storage
 */
router.post('/video', upload.single('file'), uploadToFirebase('events/videos'), (req, res) => {
  res.json({
    success: true,
    message: 'Video uploaded successfully',
    url: req.fileUrl
  })
})

/**
 * POST /api/upload/artist
 * Upload imagen de artista a Firebase Storage
 */
router.post('/artist', upload.single('file'), uploadToFirebase('events/artists'), (req, res) => {
  res.json({
    success: true,
    message: 'Artist image uploaded successfully',
    url: req.fileUrl
  })
})

export default router
