import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

export const useRotatingIcon = (duration = 8) => {
  const iconRef = ref(null)
  let animation = null

  onMounted(() => {
    if (iconRef.value) {
      animation = gsap.to(iconRef.value, {
        rotation: 360,
        duration,
        repeat: -1,
        ease: 'linear',
      })
    }
  })

  onBeforeUnmount(() => {
    if (animation) {
      animation.kill()
    }
  })

  return iconRef
}
