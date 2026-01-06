<template>
  <div v-if="showIntro" class="intro-wrapper">
    <!-- Header con logo -->
    <div class="intro-header">
      <div class="intro-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" class="logo-img" />
      </div>

      <!-- Slide negro con mensaje espiritual -->
      <div ref="finalSlideRef" class="final-overlay">
        <div class="final-content">
          <img src="/assets/logoCompletoNegro.png" alt="Pura Vida" class="final-logo" />
          <p class="final-message">VIVIR CONECTADO, VIVIR DESPIERTO</p>
        </div>
      </div>
    </div>

    <!-- Container de color -->
    <div class="intro-container"></div>

    <!-- Text wrapper con logos -->
    <div class="intro-text-wrapper" ref="textWrapper">
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
      <div class="intro-text-logo">
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
        <img src="/assets/logoTipograficoBlancoCortado.png" alt="Pura Vida" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const showIntro = ref(true)

onMounted(() => {
  // Verificar si ya se vio la intro
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
  
  if (!hasSeenIntro) {
    sessionStorage.setItem('hasSeenIntro', 'true')
    // Esperar a que el DOM esté listo y luego ejecutar la animación
    nextTick(() => {
      triggerIntro()
    })
  } else {
    // Si ya la vio, no mostrar la intro
    showIntro.value = false
  }
})

const triggerIntro = () => {
  // Disable scroll durante la intro
  document.body.style.overflow = 'hidden'
  
  gsap.to('.intro-logo', 0.5, {
    opacity: 0,
    y: -40,
    ease: 'expo.inOut',
  })

  gsap.to('.intro-text-wrapper > div', .5, {
    x: '100',
    ease: 'expo.inOut',
    stagger: 0.1,
  })

  gsap.to('.intro-text-wrapper', 2.3, {
    y: -300,
    scale: 4.5,
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
      showIntro.value = false
      // Restaurar scroll
      document.body.style.overflow = ''
    },
  })
}
</script>

<style scoped>
.intro-wrapper {
  position: fixed;
  width: 100%;
  height: 100dvh;
  height: 100vh;
  z-index: 50;
  background: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  height: 100dvh;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -2;
  top: 0;
  left: 0;
}

.intro-container {
  position: fixed;
  width: 100%;
  height: 100dvh;
  height: 100vh;
  background: #4F4898;
  z-index: -1;
  top: 0;
  left: 0;
}

.intro-text-wrapper {
  position: fixed;
  width: 100%;
  height: 100dvh;
  height: 100vh;
  left: -50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5vh;
  cursor: default;
  z-index: 0;
  padding-top: 2vh;
  top: 0;
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

.intro-text-logo img:nth-child(1),
.intro-text-logo img:nth-child(2) {
  display: inline-block;
}

.final-overlay {
  position: fixed;
  width: 100%;
  height: 100dvh;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  opacity: 0;
  pointer-events: none;
}

.final-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.final-logo {
  width: 180px;
  height: auto;
  margin-bottom: 1rem;
}

.final-message {
  font-family: 'Standard', sans-serif;
  font-size: 1.3rem;
  color: #000;
  max-width: 90%;
  line-height: 1.8;
  font-weight: 200;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
