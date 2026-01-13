#!/bin/bash

# ============================================
# Cleanup Database Script - Pura Vida Events
# ============================================

echo "🗑️  Script de Limpieza de Base de Datos"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Opciones:${NC}"
echo "1) Detener contenedores (mantener datos)"
echo "2) Detener y eliminar contenedores (eliminar datos)"
echo "3) Cancelar"
echo ""
read -p "Selecciona una opción (1-3): " option

case $option in
  1)
    echo -e "${YELLOW}⏹️  Deteniendo contenedores...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Contenedores detenidos${NC}"
    echo "Los datos se mantienen en el volumen 'mysql_data'"
    ;;
  2)
    echo -e "${RED}⚠️  ADVERTENCIA: Esto eliminará todos los datos${NC}"
    read -p "¿Estás seguro? (s/n): " confirm
    if [ "$confirm" = "s" ]; then
      echo -e "${YELLOW}🗑️  Eliminando contenedores y datos...${NC}"
      docker-compose down -v
      echo -e "${GREEN}✅ Contenedores y datos eliminados${NC}"
    else
      echo -e "${YELLOW}Cancelado${NC}"
    fi
    ;;
  3)
    echo -e "${YELLOW}Cancelado${NC}"
    ;;
  *)
    echo -e "${RED}❌ Opción inválida${NC}"
    exit 1
    ;;
esac

