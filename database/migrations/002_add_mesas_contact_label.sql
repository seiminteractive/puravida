-- ============================================
-- Agregar campo contact_label a event_mesas
-- ============================================

ALTER TABLE event_mesas 
ADD COLUMN contact_label VARCHAR(100) DEFAULT 'Consultar por mesas' AFTER whatsapp_number;
