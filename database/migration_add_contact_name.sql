-- ====================================
-- MIGRACIÓN: Agregar nombre a contactos de transporte
-- ====================================

ALTER TABLE transport_contacts ADD COLUMN contact_name VARCHAR(255) AFTER transport_id;

-- Actualizar datos de prueba existentes si es necesario
UPDATE transport_contacts SET contact_name = 'Contacto Principal' WHERE contact_name IS NULL;
