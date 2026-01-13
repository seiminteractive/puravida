#!/bin/bash

# ============================================
# Setup Database Script - Pura Vida Events
# ============================================

echo "🐳 Iniciando setup de Base de Datos..."

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Levantar contenedores Docker
echo -e "${YELLOW}1️⃣  Levantando contenedores Docker...${NC}"
docker-compose up -d

# 2. Esperar a que MySQL esté listo
echo -e "${YELLOW}2️⃣  Esperando a que MySQL esté listo...${NC}"
sleep 15

# 3. Verificar salud del contenedor
echo -e "${YELLOW}3️⃣  Verificando estado de MySQL...${NC}"
if docker-compose ps | grep -q "mysql.*healthy"; then
  echo -e "${GREEN}✅ MySQL está listo${NC}"
else
  echo -e "${RED}❌ MySQL no está listo, reintentando...${NC}"
  sleep 10
fi

# 4. Verificar que las tablas existan
echo -e "${YELLOW}4️⃣  Verificando tablas de base de datos...${NC}"
sleep 5
docker exec puravida_mysql mysql -u puravida_admin -p"puravida_password_123" puravida -e "SHOW TABLES;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Tablas creadas exitosamente${NC}"
else
  echo -e "${RED}❌ Error al crear tablas${NC}"
fi

# 5. Mostrar información de conexión
echo ""
echo -e "${GREEN}✨ Setup completado exitosamente${NC}"
echo ""
echo -e "${YELLOW}📊 Información de Conexión:${NC}"
echo "  Host: localhost"
echo "  Puerto: 3306"
echo "  Base de datos: puravida"
echo "  Usuario: puravida_admin"
echo "  Contraseña: puravida_password_123"
echo ""
echo -e "${YELLOW}🌐 phpMyAdmin:${NC}"
echo "  URL: http://localhost:8080"
echo "  Usuario: puravida_admin"
echo "  Contraseña: puravida_password_123"
echo ""
echo -e "${YELLOW}📋 Comandos útiles:${NC}"
echo "  Ver logs: docker-compose logs -f mysql"
echo "  Conectar a MySQL: docker exec -it puravida_mysql mysql -u puravida_admin -p puravida"
echo "  Ver tablas: docker exec -it puravida_mysql mysql -u puravida_admin -p puravida -e 'SHOW TABLES;'"
echo "  Detener: docker-compose down"
echo "  Detener y limpiar: docker-compose down -v"
echo ""

