-- ============================================
-- Pura Vida Events Database Migrations
-- ============================================

-- ============================================
-- TABLA PRINCIPAL: EVENTOS
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dj VARCHAR(255) NOT NULL,
  fecha_dia VARCHAR(2) NOT NULL,
  fecha_mes VARCHAR(2) NOT NULL,
  lugar VARCHAR(255) NOT NULL,
  descripcion LONGTEXT NOT NULL,
  media_url VARCHAR(500),
  transports_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_fecha (fecha_dia, fecha_mes)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: ARTISTAS (OBLIGATORIO - MÍNIMO 1)
-- ============================================
CREATE TABLE IF NOT EXISTS event_artists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  media_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: TRANSPORTES (MÚLTIPLE - OPCIONAL)
-- ============================================
CREATE TABLE IF NOT EXISTS event_transports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  transport_name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  description LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: CONTACTOS DE TRANSPORTE
-- ============================================
CREATE TABLE IF NOT EXISTS transport_contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transport_id INT NOT NULL,
  contact_name VARCHAR(255),
  contact VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transport_id) REFERENCES event_transports(id) ON DELETE CASCADE,
  INDEX idx_transport (transport_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: HOSPEDAJE (OPCIONAL)
-- ============================================
CREATE TABLE IF NOT EXISTS event_lodging (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  description LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: LINKS DE TICKETS (OBLIGATORIO - MÍNIMO 1)
-- ============================================
CREATE TABLE IF NOT EXISTS ticket_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  ticketer_name VARCHAR(255) NOT NULL,
  link_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: MESAS VIP (OPCIONAL)
-- ============================================
CREATE TABLE IF NOT EXISTS event_mesas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  description LONGTEXT,
  whatsapp_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================
-- INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion, transports_enabled)
-- VALUES (
--   'Mariano Mellino',
--   '07',
--   '02',
--   'Hotel Termas de Victoria, Entre Rios',
--   'Una noche mágica donde la música y el agua se encuentran. Ritual de conexión bajo las estrellas.',
--   TRUE
-- );
