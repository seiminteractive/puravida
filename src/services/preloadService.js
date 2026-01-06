import marianoMellinoVideo from '/assets/marianoMellinoVideo.mp4'
import fondoMobileVideo from '/assets/fondoMobile.mp4'
import videoPlazas from '/assets/VIDEO_PLAZAS.mp4'
import promoLineup from '/assets/promo_lineup.mp4'

const videos = [
  { name: 'marianoMellino', url: marianoMellinoVideo },
  { name: 'fondoMobile', url: fondoMobileVideo },
  { name: 'videoPlazas', url: videoPlazas },
  { name: 'promoLineup', url: promoLineup },
]

export const preloadVideos = async () => {
  const promises = videos.map(video => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video')
      videoElement.preload = 'metadata'
      videoElement.onloadedmetadata = () => {
        console.log(`✓ Video preloaded: ${video.name}`)
        resolve()
      }
      videoElement.onerror = () => {
        console.warn(`⚠ Failed to preload video: ${video.name}`)
        resolve() // Continuar aunque falle
      }
      videoElement.src = video.url
    })
  })

  try {
    await Promise.all(promises)
    console.log('✓ All videos preloaded successfully')
    return true
  } catch (error) {
    console.error('Error preloading videos:', error)
    return false
  }
}
