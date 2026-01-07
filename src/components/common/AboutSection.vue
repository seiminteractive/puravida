<template>
  <section class="about-section pv-surface">
    <!-- Fondos decorativos con luces de colores -->
    <div class="about-bg-accent"></div>
    <div class="about-light-indigo"></div>
    <div class="about-light-yellow"></div>
    <div class="about-light-cyan"></div>

    <div class="about-container">
      <!-- Header con línea divisoria -->
      <div class="about-header">
        <div class="header-line"></div>
        <p class="about-label">Filosofía</p>
        <div class="header-line"></div>
      </div>

      <!-- Logo y Título -->
      <div class="about-hero flex justify-center">
        <img src="/assets/logoCompletoBlanco.png" alt="Pura Vida" class="about-logo-main" />
      </div>

      <!-- Descripción elaborada -->
      <div class="about-description">
        <p class="about-intro">
          No es solo una palabra, es un <span class="highlight">estado de ser</span>
        </p>

        <p class="about-body">
          Una filosofía contemporánea donde la música, la comunidad y la experiencia se fusionan en un ritual de conexión. 
          Donde la energía que eleva encuentra el diseño que guía.
        </p>
      </div>

      <!-- Tres pilares con layout mejorado -->
      <div class="about-pillars">
        <div class="pillar pillar-indigo">
          <div class="pillar-header">
            <img ref="experienciaIcon" src="/assets/iconoExperiencia1.png" alt="Experiencia" class="pillar-icon" />
            <div class="pillar-line pillar-line-indigo"></div>
          </div>
          <h3 class="pillar-title">Experiencia</h3>
          <p class="pillar-subtitle pillar-subtitle-indigo">Sensorial & Emocional</p>
          <p class="pillar-text">Rituales donde cada detalle importa. Donde la música se siente en el cuerpo y el alma.</p>
        </div>

        <div class="pillar pillar-yellow">
          <div class="pillar-header">
            <img ref="comunidadIcon" src="/assets/iconoComunidad3.png" alt="Comunidad" class="pillar-icon" />
            <div class="pillar-line pillar-line-yellow"></div>
          </div>
          <h3 class="pillar-title">Comunidad</h3>
          <p class="pillar-subtitle pillar-subtitle-yellow">Consciente & Vibrante</p>
          <p class="pillar-text">Encuentros de gente que vibra en la misma frecuencia. Conexión real en un mundo digital.</p>
        </div>

        <div class="pillar pillar-cyan">
          <div class="pillar-header">
            <img ref="ritualIcon" src="/assets/iconoEventos3.png" alt="Eventos" class="pillar-icon" />
            <div class="pillar-line pillar-line-cyan"></div>
          </div>
          <h3 class="pillar-title">Ritual</h3>
          <p class="pillar-subtitle pillar-subtitle-cyan">Contemporáneo & Inclusivo</p>
          <p class="pillar-text">Eventos curados con atención extrema. Donde la energía es palpable y la experiencia es infinita.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRotatingIcon } from '../../composables/useRotatingIcon'
import { useScrollFadeInElements } from '../../composables/useScrollFadeIn'

// Iconos rotativos
const experienciaIcon = useRotatingIcon(8)
const comunidadIcon = useRotatingIcon(8)
const ritualIcon = useRotatingIcon(8)

// Scroll fade-in para elementos internos
useScrollFadeInElements('.pillar')
useScrollFadeInElements('.about-section h1')
useScrollFadeInElements('.about-section p')
</script>

<style scoped>
.about-section {
  min-height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  padding: 3rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-bg-accent {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 210, 92, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.about-light-indigo {
  position: absolute;
  bottom: 12%;
  right: -18%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(81, 193, 225, 0.12) 0%, transparent 80%);  
  border-radius: 50%;
  z-index: 0;
}

.about-light-yellow {
  position: absolute;
  top: 45%;
  left: -20%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 210, 92, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.about-light-cyan {
  position: absolute;
  top: 5%;
  right: -40%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(79, 72, 152, 0.18) 0%, transparent 90%);
  border-radius: 50%;
  z-index: 0;
}

.about-container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.about-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.header-line {
  flex: 0 1 40px;
  height: 1px;
  background: linear-gradient(to right, transparent, #FFD25C, transparent);
}

.about-label {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #FFD25C;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
  font-weight: 500;
}

.about-hero {
  margin-bottom: 3rem;
}

.about-logo-main {
  max-width: 280px;
  width: 100%;
  height: auto;
}

.about-description {
  margin-bottom: 4rem;
}

.about-intro {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.75rem;
  color: #fff;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
  line-height: 1.4;
}

.highlight {
  color: #FFD25C;
  font-weight: 600;
}

.about-body {
  font-family: 'Standard', sans-serif;
  font-size: 1rem;
  color: #bbb;
  line-height: 1.8;
  margin: 0;
  font-weight: 300;
}

.about-pillars {
  max-width: 700px;
  margin: 4rem auto; /* ← ESTO es lo clave */
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@keyframes rotarIndigo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes rotarYellow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes rotarCyan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.pillar {
  padding: 2.5rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pillar-indigo {
  background-color: black;
}

.pillar-indigo::before {
  content: '';
  position: absolute;
  inset: -50%;
  background-image: conic-gradient(rgba(182, 113, 160, 0.8) 20deg, transparent 120deg);
  animation: rotarIndigo 4s linear infinite 0s;
  z-index: 1;
}

.pillar-indigo::after {
  content: '';
  position: absolute;
  inset: 2px;
  background-color: black;
  border-radius: 0.95rem;
  z-index: 2;
}

.pillar-yellow {
  background-color: black;
}

.pillar-yellow::before {
  content: '';
  position: absolute;
  inset: -50%;
  background-image: conic-gradient(rgba(255, 210, 92, 0.8) 20deg, transparent 120deg);
  animation: rotarYellow 4s linear infinite 0.65s;
  z-index: 1;
}

.pillar-yellow::after {
  content: '';
  position: absolute;
  inset: 2px;
  background-color: black;
  border-radius: 0.95rem;
  z-index: 2;
}

.pillar-cyan {
  background-color: black;
}

.pillar-cyan::before {
  content: '';
  position: absolute;
  inset: -50%;
  background-image: conic-gradient(rgba(81, 193, 225, 0.8) 20deg, transparent 120deg);
  animation: rotarCyan 4s linear infinite 1.3s;
  z-index: 1;
}

.pillar-cyan::after {
  content: '';
  position: absolute;
  inset: 2px;
  background-color: black;
  border-radius: 0.95rem;
  z-index: 2;
}

.pillar:hover {
  transform: translateY(-5px);
}

.pillar-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 4;
}

.pillar-icon {
  width: 50px;
  height: 50px;
  order: -1;
}

.pillar-line {
  width: 100px;
  height: 1px;
  background: rgba(255, 210, 92, 0.3);
}

.pillar-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  position: relative;
  z-index: 4;
}

.pillar-subtitle {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #FFD25C;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  font-weight: 500;
  position: relative;
  z-index: 4;
}

.pillar-subtitle-indigo {
  color: #B671A0;
}

.pillar-line-indigo {
    background-color: #B671A0;
}

.pillar-subtitle-yellow {
  color: #FFD25C;
}

.pillar-subtitle-cyan {
  color: #51C1E1;
}

.pillar-line-cyan {
  background-color: #51C1E1;
}

.pillar-text {
  font-family: 'Standard', sans-serif;
  font-size: 0.95rem;
  color: #999;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
  position: relative;
  z-index: 4;
}

.about-values {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 4rem 0;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 210, 92, 0.2);
  border-radius: 1rem;
  background: rgba(255, 210, 92, 0.02);
}

.value-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.value-icon {
  font-size: 1.25rem;
  color: #FFD25C;
}

.value-text {
  font-family: 'Standard', sans-serif;
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.05em;
}

.value-divider {
  height: 1px;
  background: rgba(255, 210, 92, 0.1);
}

.about-cta {
  margin-top: 4rem;
}

.about-btn {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #FFD25C 0%, #E6B633 100%);
  border: none;
  color: #000;
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 210, 92, 0.2);
}

.about-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 210, 92, 0.3);
}
</style>
