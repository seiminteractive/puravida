-- ============================================
-- Crear usuario con permisos para conexiones externas
-- ============================================

-- Permitir conexiones desde cualquier host
CREATE USER IF NOT EXISTS 'puravida_admin'@'%' IDENTIFIED BY 'puravida_password_123';
GRANT ALL PRIVILEGES ON puravida.* TO 'puravida_admin'@'%';
FLUSH PRIVILEGES;
