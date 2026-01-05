import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollFadeInElements = (selector) => {
  onMounted(() => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((el) => {
      el.style.opacity = '0'
      
      gsap.to(el, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          markers: false,
        },
      })
    })
  })
}
