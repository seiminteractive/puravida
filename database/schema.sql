-- ====================================
-- PURA VIDA - DATABASE SCHEMA
-- ====================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS puravida_events
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE puravida_events;

-- ====================================
-- TABLA PRINCIPAL: EVENTOS
-- ====================================
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

-- ====================================
-- TABLA: ARTISTAS (OBLIGATORIO - MÍNIMO 1)
-- ====================================
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

-- ====================================
-- TABLA: TRANSPORTES (MÚLTIPLE - OPCIONAL)
-- ====================================
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

-- ====================================
-- TABLA: CONTACTOS DE TRANSPORTE
-- ====================================
CREATE TABLE IF NOT EXISTS transport_contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transport_id INT NOT NULL,
  contact VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transport_id) REFERENCES event_transports(id) ON DELETE CASCADE,
  INDEX idx_transport (transport_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABLA: HOSPEDAJE (OPCIONAL)
-- ====================================
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

-- ====================================
-- TABLA: MESAS (OPCIONAL)
-- ====================================
CREATE TABLE IF NOT EXISTS event_mesas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT TRUE,
  image_url VARCHAR(500),
  description LONGTEXT,
  whatsapp_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABLA: LINKS DE TICKETS (OBLIGATORIO - MÍNIMO 1)
-- ====================================
CREATE TABLE IF NOT EXISTS ticket_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  ticketer_name VARCHAR(255) NOT NULL,
  link_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- DATOS DE PRUEBA
-- ====================================

-- Insertar evento de prueba
INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion, transports_enabled)
VALUES ('Mariano Mellino', '17', '07', 'Hotel Termas de Victoria, Entre Ríos', 
        'Una noche mágica donde la música y el agua se encuentran. Ritual de conexión bajo las estrellas.', 
        TRUE);

-- Insertar artistas del evento
INSERT INTO event_artists (event_id, artist_name, image_url, media_type)
VALUES 
  (1, 'Mariano Mellino', 'https://firebase.com/dj1.png', 'image'),
  (1, 'DJ Support 1', 'https://firebase.com/dj2.png', 'image'),
  (1, 'DJ Support 2', 'https://firebase.com/dj3.png', 'image');

-- Insertar mesas para el evento
INSERT INTO event_mesas (event_id, enabled, image_url, description, whatsapp_number)
VALUES (1, TRUE, 'https://firebase.com/mesas.png', 
        'Reserva tu espacio exclusivo para disfrutar de la mejor experiencia', 
        '+5491234567890');

-- Insertar hospedaje
INSERT INTO event_lodging (event_id, enabled, image_url, description)
VALUES (1, TRUE, 'https://firebase.com/hospedaje.mp4', 
        'Alojamiento cómodo y exclusivo para tu estadía');

-- Insertar transporte
INSERT INTO event_transports (event_id, transport_name, image_url, description)
VALUES (1, 'Transporte Premium', 'https://firebase.com/transporte.png', 
        'Transporte seguro y cómodo desde CABA');

INSERT INTO transport_contacts (transport_id, contact)
VALUES (1, '+5491234567890');

-- Insertar links de tickets
INSERT INTO ticket_links (event_id, ticketer_name, link_url)
VALUES 
  (1, 'PassLine', 'https://passline.com/puravida'),
  (1, 'Ticket Portal', 'https://tickets.com/puravida');

-- ====================================
-- VERIFICAR TABLAS CREADAS
-- ====================================
SHOW TABLES;
