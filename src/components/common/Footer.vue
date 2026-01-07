<template>
  <footer class="footer pv-surface">
    <!-- Decoración superior -->
    <div class="footer-top-decoration"></div>

    <!-- Contenedor principal -->
    <div class="footer-container">
      <!-- Sección Brand -->
      <div class="footer-brand-section">
        <div class="brand-header">
          <img src="/assets/isotipoBlanco.png" alt="Pura Vida" class="footer-logo" />
          <div class="brand-divider"></div>
        </div>
        
        <p class="brand-tagline">Vivir conectado. Vivir despierto.</p>
        
        <p class="brand-description">
          Un ritual contemporáneo donde la música, la comunidad y la experiencia se fusionan en un estado de conexión pura.
        </p>

        <!-- Redes sociales destacadas -->
        <div class="social-grid">
          <a href="https://instagram.com/puravida" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://tiktok.com/@puravida" target="_blank" rel="noopener noreferrer" class="social-link" title="TikTok">
            <i class="bi bi-tiktok"></i>
          </a>
          <a href="https://youtube.com/@puravida" target="_blank" rel="noopener noreferrer" class="social-link" title="YouTube">
            <i class="bi bi-youtube"></i>
          </a>
        </div>
      </div>

      <!-- Grupo de Navegación y Redes -->
      <div class="footer-links-group">
        <!-- Sección Navegación -->
        <div class="footer-nav-section">
          <h4 class="footer-section-title">Navegación</h4>
          <nav class="footer-nav">
            <a href="#eventos" class="footer-nav-link">
              <span class="nav-icon">→</span>
              <span>Eventos</span>
            </a>
            <a href="#about" class="footer-nav-link">
              <span class="nav-icon">→</span>
              <span>Filosofía</span>
            </a>
            <a href="#comunidad" class="footer-nav-link">
              <span class="nav-icon">→</span>
              <span>Comunidad</span>
            </a>
            <a href="#contacto" class="footer-nav-link">
              <span class="nav-icon">→</span>
              <span>Contacto</span>
            </a>
          </nav>
        </div>

        <!-- Sección Redes -->
        <div class="footer-social-section">
          <h4 class="footer-section-title">Síguenos</h4>
          <nav class="footer-social-nav">
            <a href="https://instagram.com/puravida" target="_blank" rel="noopener noreferrer" class="footer-social-link">Instagram</a>
            <a href="https://tiktok.com/@puravida" target="_blank" rel="noopener noreferrer" class="footer-social-link">TikTok</a>
            <a href="https://youtube.com/@puravida" target="_blank" rel="noopener noreferrer" class="footer-social-link">YouTube</a>
            <a href="https://twitter.com/puravida" target="_blank" rel="noopener noreferrer" class="footer-social-link">Twitter</a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Separador -->
    <div class="footer-divider"></div>

    <!-- Bottom Section -->
    <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="footer-tagline-bottom">
            Energía que eleva. Diseño que guía.
          </p>
          
          <div class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-2">
            <p class="footer-copyright mb-0 leading-none text-center">
              &copy; 2025 Pura Vida — Todos los derechos reservados
            </p>

            <a href="https://seiminteractive.io/" target="_blank" rel="noopener noreferrer"> <img class="w-20 h-auto rounded-md" src="../../.././assets/SeimFooter.jpeg" alt="logo-seim"/></a>
            
          </div>
        </div>
      </div>
    <!-- Elemento decorativo inferior -->
    <div class="footer-bottom-decoration"></div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #000 !important;
  border-top: 1px solid rgba(255, 210, 92, 0.1);
  padding: 4rem 1.5rem 2rem;
  position: relative;
  overflow: hidden;
  z-index: 100;
}

.footer-top-decoration {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 210, 92, 0.3), transparent);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.footer-links-group {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  width: 100%;
}

/* Sección Brand */
.footer-brand-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-logo {
  width: 65px;
  height: 50px;
  flex-shrink: 0;
}

.brand-divider {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 210, 92, 0.2), transparent);
}

.brand-tagline {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  color: #FFD25C;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.brand-description {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #999;
  margin: 0;
  line-height: 1.7;
  font-weight: 300;
}

.social-grid {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 210, 92, 0.1);
  color: #FFD25C;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 210, 92, 0.2);
  flex-shrink: 0;
}

.social-link:hover {
  background: rgba(255, 210, 92, 0.2);
  border-color: rgba(255, 210, 92, 0.4);
  transform: translateY(-2px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Secciones de Navegación y Redes */
.footer-nav-section,
.footer-social-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.footer-section-title {
  font-family: 'Napzer Rounded', sans-serif;
  font-size: 1rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 210, 92, 0.2);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-nav-link {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 300;
}

.nav-icon {
  color: #FFD25C;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.footer-nav-link:hover {
  color: #FFD25C;
  padding-left: 0.5rem;
}

.footer-nav-link:hover .nav-icon {
  opacity: 1;
  transform: translateX(0);
}

.footer-social-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-social-link {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #bbb;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 300;
  position: relative;
  padding-left: 0;
}

.footer-social-link::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: #FFD25C;
  transition: width 0.3s ease;
}

.footer-social-link:hover {
  color: #FFD25C;
}

.footer-social-link:hover::before {
  width: 100%;
}

/* Divider */
.footer-divider {
  width: calc(100% - 3rem);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 210, 92, 0.15), transparent);
  margin: 2rem auto;
}

/* Bottom Section */
.footer-bottom {
  padding: 2rem 0;
  position: relative;
  z-index: 1;
}

.footer-bottom-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-copyright {
  font-family: 'Standard', sans-serif;
  font-size: 0.85rem;
  color: #666;
  font-weight: 300;
}

.footer-tagline-bottom {
  font-family: 'Standard', sans-serif;
  font-size: 0.9rem;
  color: #FFD25C;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.footer-bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 210, 92, 0.2), transparent);
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links-group {
    flex-direction: row;
    gap: 2rem;
  }

  .footer {
    padding: 2rem 1.5rem 1.5rem;
  }

  .brand-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .brand-divider {
    width: 100%;
  }

  .social-grid {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer-links-group {
    gap: 1.5rem;
  }
}
</style>
