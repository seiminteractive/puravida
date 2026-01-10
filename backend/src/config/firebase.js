import admin from 'firebase-admin'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar .env desde la carpeta backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

console.log('🔍 .env loaded from:', path.resolve(__dirname, '../../.env'))
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID)
console.log('FIREBASE_STORAGE_BUCKET:', process.env.FIREBASE_STORAGE_BUCKET)
console.log('FIREBASE_PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY)

// Normalizar private key - intentar ambas formas
let privateKey = process.env.FIREBASE_PRIVATE_KEY
if (privateKey.includes('\\n')) {
  // Si tiene \n literal (backslash + n)
  privateKey = privateKey.replace(/\\n/g, '\n')
}
// Si ya tiene \n como newlines reales, no hacer nada

// Inicializar Firebase Admin
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || process.env.FIREBASE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL || `firebase-adminsdk@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`
}

console.log('🔐 Service account config:', {
  project_id: serviceAccount.project_id,
  client_email: serviceAccount.client_email,
  private_key_start: serviceAccount.private_key?.substring(0, 50) + '...',
  private_key_end: '...' + serviceAccount.private_key?.substring(serviceAccount.private_key.length - 50),
  has_newlines: serviceAccount.private_key?.includes('\n'),
  lines: serviceAccount.private_key?.split('\n').length
})

console.log('🚀 Initializing Firebase Admin SDK...')
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  })
  console.log('✅ Firebase initialized successfully')
} catch (error) {
  console.error('❌ Firebase init error:', error.message)
  throw error
}

const bucket = admin.storage().bucket()

/**
 * Subir archivo a Firebase Storage
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {string} fileName - Nombre del archivo
 * @param {string} folder - Carpeta en Firebase (ej: 'events/artists')
 * @param {string} mimeType - Tipo MIME del archivo
 * @returns {Promise<string>} URL pública del archivo
 */
export const uploadFileToFirebase = async (fileBuffer, fileName, folder = 'uploads', mimeType = 'application/octet-stream') => {
  try {
    console.log('📤 Firebase upload started:', { fileName, folder, mimeType, bufferSize: fileBuffer.length })
    
    // Crear nombre único con timestamp
    const timestamp = Date.now()
    const uniqueFileName = `${timestamp}-${fileName}`
    const filePath = `${folder}/${uniqueFileName}`

    console.log('📁 File path:', filePath)
    const file = bucket.file(filePath)

    // Subir archivo
    console.log('⏳ Saving to Firebase...')
    await file.save(fileBuffer, {
      metadata: {
        contentType: mimeType,
        cacheControl: 'public, max-age=31536000'
      },
      public: true
    })

    // Obtener URL pública
    const publicUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${filePath}`

    console.log(`✅ File uploaded successfully: ${publicUrl}`)
    return publicUrl
  } catch (error) {
    console.error('❌ Firebase upload error:', error.message)
    console.error('Error details:', error)
    throw new Error(`Firebase upload failed: ${error.message}`)
  }
}

/**
 * Eliminar archivo de Firebase Storage
 * @param {string} fileUrl - URL pública del archivo
 * @returns {Promise<boolean>}
 */
export const deleteFileFromFirebase = async (fileUrl) => {
  try {
    // Extraer nombre del archivo de la URL
    const fileName = fileUrl.split('/').pop()
    const file = bucket.file(fileName)

    await file.delete()
    console.log(`✅ File deleted: ${fileName}`)
    return true
  } catch (error) {
    console.error('❌ Firebase delete error:', error)
    throw new Error(`Firebase delete failed: ${error.message}`)
  }
}

export default { uploadFileToFirebase, deleteFileFromFirebase }
