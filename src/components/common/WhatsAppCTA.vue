<template>
  <section class="whatsapp-cta pv-surface">
    <!-- Fondo decorativo -->
    <div class="cta-bg-decoration"></div>

    <div class="cta-container">
      <div class="cta-content">
        <p class="cta-label">Conecta con nosotros</p>
        <h2 class="cta-title">Preguntas sobre eventos y experiencias</h2>
        <p class="cta-subtitle">Nuestro equipo está disponible para ayudarte. Escríbenos y responderemos pronto.</p>
        
        <a 
          href="https://wa.me/5491234567890?text=Hola%20Pura%20Vida!%20Me%20gustaría%20conocer%20más%20sobre%20vuestros%20eventos%20y%20experiencias." 
          target="_blank"
          rel="noopener noreferrer"
          class="whatsapp-btn"
        >
          <img ref="communityIcon" src="/assets/iconoComunidad3.png" alt="Comunidad" class="btn-icon" />
          <span>Iniciar conversación</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import { useScrollFadeInElements } from '../../composables/useScrollFadeIn'

// Icono rotativo del botón
const communityIcon = useRotatingIcon(8)

// Scroll fade-in para elementos internos
useScrollFadeInElements('.cta-content')
useScrollFadeInElements('.cta-title')
useScrollFadeInElements('.cta-label')
useScrollFadeInElements('.cta-subtitle')
useScrollFadeInElements('.whatsapp-btn')
</script>

<style scoped>
.whatsapp-cta {
  min-height: 50vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.cta-bg-decoration {
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 210, 92, 0.1) 0%, transparent 70%);
  z-index: 1;
}

.cta-container {
  max-width: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.cta-content {
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

.cta-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.8rem;
  color: #FFD25C;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cta-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #fff;
  margin: 0 0 1rem 0;
  font-weight: 600;
  line-height: 1.3;
}

.cta-subtitle {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #999;
  margin: 0 0 2.5rem 0;
  font-weight: 300;
  line-height: 1.6;
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #fff;
  text-decoration: none;
  border-radius: 2rem;
  border: 0.5px solid #fff;
  font-family: 'Standard', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  opacity: 0.7;
}

.btn-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
