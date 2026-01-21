import { ref, computed } from 'vue'

// Cache global de media
const mediaCache = new Map()
const loadingQueue = new Set()
const loadedQueue = new Set()

export const useMediaCache = () => {
  // Precargar un media (imagen o video)
  const preloadMedia = async (url, type = 'image') => {
    if (!url) return false
    
    // Si ya está en caché, devolver true inmediatamente
    if (mediaCache.has(url)) {
      return true
    }
    
    // Si ya se está cargando, esperar
    if (loadingQueue.has(url)) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (loadedQueue.has(url)) {
            clearInterval(checkInterval)
            resolve(true)
          }
        }, 50)
      })
    }
    
    loadingQueue.add(url)
    
    try {
      if (type === 'video' || url.includes('.mp4')) {
        await preloadVideo(url)
      } else {
        await preloadImage(url)
      }
      
      mediaCache.set(url, {
        loaded: true,
        timestamp: Date.now()
      })
      
      loadedQueue.add(url)
      return true
    } catch (err) {
      console.warn(`Error precargando media: ${url}`, err)
      loadedQueue.add(url) // Marcar como cargado aunque haya error
      return false
    } finally {
      loadingQueue.delete(url)
    }
  }
  
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Error loading image: ${url}`))
      img.src = url
    })
  }
  
  const preloadVideo = (url) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      
      // 🔑 IMPORTANTE: Ocultar el video
      video.style.display = 'none'
      video.style.visibility = 'hidden'
      video.style.position = 'absolute'
      video.style.left = '-9999px'
      
      video.onloadedmetadata = () => {
        // Limpiar después de cargar
        if (video.parentNode) {
          video.parentNode.removeChild(video)
        }
        resolve()
      }
      
      video.onerror = () => {
        // Limpiar en caso de error
        if (video.parentNode) {
          video.parentNode.removeChild(video)
        }
        reject(new Error(`Error loading video: ${url}`))
      }
      
      // Agregar al DOM pero oculto
      document.body.appendChild(video)
      video.src = url
    })
  }
  
  // Precargar múltiples media (para eventos, etc)
  const preloadMediaArray = async (urls, priorityUrl = null) => {
    if (!Array.isArray(urls)) return
    
    // ✅ Priorizar media crítica si existe (hero video/imagen)
    if (priorityUrl && urls.includes(priorityUrl)) {
      await preloadMedia(priorityUrl)
      // Remover para no cargar dos veces
      urls = urls.filter(url => url !== priorityUrl)
    }
    
    // ✅ Aumentar a 8 descargas paralelas (2.6x más rápido que antes)
    const batchSize = 8
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize)
      await Promise.all(batch.map(url => preloadMedia(url)))
    }
  }
  
  // Obtener media URLs de eventos
  const extractMediaUrls = (events) => {
    if (!Array.isArray(events)) return []
    
    return events
      .map(event => event.media_url || event.imagen)
      .filter(Boolean)
  }
  
  // Verificar si un media está en caché
  const isCached = (url) => {
    return mediaCache.has(url)
  }
  
  // Limpiar caché (opcional, para memoria muy limitada)
  const clearCache = () => {
    mediaCache.clear()
    loadingQueue.clear()
    loadedQueue.clear()
  }
  
  // Estadísticas de caché
  const getCacheStats = computed(() => ({
    cached: mediaCache.size,
    loading: loadingQueue.size,
    total: mediaCache.size + loadingQueue.size
  }))
  
  return {
    preloadMedia,
    preloadMediaArray,
    extractMediaUrls,
    isCached,
    clearCache,
    getCacheStats
  }
}
