-- Migración: Agregar columna media_url a tabla events
-- Ejecutar manualmente en tu cliente MySQL

USE puravida_events;

-- Agregar columna media_url si no existe
ALTER TABLE events 
ADD COLUMN media_url VARCHAR(500) AFTER descripcion;

-- Actualizar el INSERT del backend para incluir media_url
-- En backend/src/services/events.service.js, línea 133-134, cambiar:
-- 
-- De:
-- INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion, transports_enabled)
-- VALUES (?, ?, ?, ?, ?, ?)
--
-- A:
-- INSERT INTO events (dj, fecha_dia, fecha_mes, lugar, descripcion, media_url, transports_enabled)
-- VALUES (?, ?, ?, ?, ?, ?, ?)
--
-- Y agregar eventData.media_url || null a los parámetros

-- También actualizar el UPDATE (línea 246-247):
--
-- De:
-- UPDATE events 
-- SET dj = ?, fecha_dia = ?, fecha_mes = ?, lugar = ?, descripcion = ?, transports_enabled = ?
--
-- A:
-- UPDATE events 
-- SET dj = ?, fecha_dia = ?, fecha_mes = ?, lugar = ?, descripcion = ?, media_url = ?, transports_enabled = ?
--
-- Y agregar eventData.media_url || null a los parámetros
