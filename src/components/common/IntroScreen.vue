<template>
  <div v-if="showIntro" class="intro-wrapper">
    <!-- Header con logo -->
    <div class="intro-header">
      <div class="intro-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" class="logo-img" />
      </div>
    </div>

    <!-- Container de color -->
    <div class="intro-container"></div>

    <!-- Slide final con mensaje espiritual (fuera del header para z-index correcto) -->
    <div ref="finalSlideRef" class="final-overlay">
      <div class="final-content">
        <img src="/assets/logoCompletoNegro.png" alt="Pura Vida" class="final-logo" />
        <p class="final-message">VIVIR CONECTADO, VIVIR DESPIERTO</p>
      </div>
    </div>

    <!-- Text wrapper con logos -->
    <div class="intro-text-wrapper" ref="textWrapper">
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'

const showIntro = ref(true)

const setViewportHeightVar = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--pv-vh', `${vh}px`)
}

const onViewportResize = () => setViewportHeightVar()

onMounted(() => {
  setViewportHeightVar()
  window.addEventListener('resize', onViewportResize, { passive: true })
  window.addEventListener('orientationchange', onViewportResize, { passive: true })

  // Verificar si ya se vio la intro
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
  
  if (!hasSeenIntro) {
    sessionStorage.setItem('hasSeenIntro', 'true')
    
    // ✅ Bloquear scroll mientras la intro está activa
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Esperar a que el DOM esté listo y luego ejecutar la animación
    nextTick(() => {
      triggerIntro()
    })
  } else {
    // Si ya la vio, no mostrar la intro
    showIntro.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onViewportResize)
  window.removeEventListener('orientationchange', onViewportResize)
  
  // ✅ Permitir scroll cuando el componente se desmonta
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})

const triggerIntro = () => {
  gsap.to('.intro-logo', 0.5, {
    opacity: 0,
    y: -40,
    ease: 'expo.inOut',
  })

  gsap.to('.intro-text-wrapper > div', .5, {
    x: '130',
    ease: 'expo.inOut',
    stagger: 0.1,
  })

  gsap.to('.intro-text-wrapper', 2.3, {
    y: -300,
    scale: 3.5,
    rotate: -90,
    ease: 'expo.inOut',
    delay: .4,
  })

  gsap.to('.intro-text-wrapper > div', 2, {
    x: '-1500',
    ease: 'expo.inOut',
    delay: 1.5,
    stagger: 0.05,
  })

  gsap.to('.intro-container', 1, {
    bottom: '-100%',
    ease: 'expo.inOut',
    delay: 2.7,
  })

  // Mostrar slide final negro con contenido
  gsap.fromTo(
    '.final-overlay',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      delay: 3.5,
    }
  )

  // Animación de apertura: slide se va hacia el costado derecho
  gsap.to('.final-overlay', 2, {
    x: '100%',
    ease: 'expo.inOut',
    delay: 5,
  })

  // Todo el wrapper se desvanece
  gsap.to('.intro-wrapper', 2, {
    opacity: 0,
    ease: 'expo.inOut',
    delay: 5,
    onComplete: () => {
      // ✅ Permitir scroll cuando la intro termina
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      showIntro.value = false
    },
  })
}
</script>

<style scoped>
.intro-wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  height: calc(var(--pv-vh, 1vh) * 100);
  z-index: 50;
  background: white;
}

/* Desktop: z-index mayor para tapar la navbar durante la animación */
@media (min-width: 1024px) {
  .intro-wrapper {
    z-index: 99999;
  }
}

.intro-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: default;
}

.logo-img {
  width: 120px;
  height: 120px;
}

.intro-header {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  height: calc(var(--pv-vh, 1vh) * 100);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -2;
}

.intro-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  height: calc(var(--pv-vh, 1vh) * 100);
  background: #4F4898;
  z-index: -1;
}

.intro-text-wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  height: calc(var(--pv-vh, 1vh) * 100);
  left: -50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5vh;
  cursor: default;
  z-index: 0;
  padding-top: 2vh;
}

.intro-text-logo {
  width: 300%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 1rem;
}

.intro-text-logo img {
  height: 14vw;
  width: auto;
  flex-shrink: 0;
}

/* Desktop: logos más pequeños */
@media (min-width: 1024px) {
  .intro-text-logo img {
    height: 6vw;
  }
}

.intro-text-logo img:nth-child(1),
.intro-text-logo img:nth-child(2) {
  display: inline-block;
}

.final-overlay {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  height: calc(var(--pv-vh, 1vh) * 100);
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 0;
}

.final-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
}

.final-logo {
  width: 180px;
  height: auto;
  margin-bottom: 1rem;
}

.final-message {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #000;
  line-height: 1.8;
  font-weight: 200;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
