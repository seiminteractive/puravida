# 🗄️ Base de Datos - Pura Vida Events

## Estructura

```
database/
├── migrations/
│   └── 001_create_events_tables.sql  # Migraciones SQL
├── config.example.php                 # Configuración de ejemplo
└── README.md                          # Este archivo
```

## 🚀 Setup Rápido

### Opción 1: Script de Setup (Recomendado)

```bash
# Desde la raíz del proyecto
bash scripts/setup-db.sh
```

Este script:
- ✅ Levanta los contenedores Docker
- ✅ Espera a que MySQL esté listo
- ✅ Crea todas las tablas
- ✅ Muestra información de conexión

### Opción 2: Comandos Manuales

```bash
# Levantar Docker
docker-compose up -d

# Esperar 15 segundos
sleep 15

# Verificar que todo esté bien
docker-compose ps
```

---

## 📊 Acceso a la Base de Datos

### MySQL CLI

```bash
docker exec -it puravida_mysql mysql -u puravida_admin -p puravida
# Contraseña: puravida_password_123
```

### phpMyAdmin (GUI)

- URL: **http://localhost:8080**
- Usuario: `puravida_admin`
- Contraseña: `puravida_password_123`

---

## 🗂️ Tablas

| Tabla | Descripción |
|-------|-------------|
| `events` | Eventos principales |
| `event_artists` | Artistas/DJs de cada evento |
| `event_transports` | Servicios de transporte |
| `transport_contacts` | Contactos de transporte |
| `event_lodging` | Hospedaje |
| `ticket_links` | Links de compra de tickets |

---

## 🔑 Credenciales

```
Host: localhost
Puerto: 3306
Base de datos: puravida
Usuario: puravida_admin
Contraseña: puravida_password_123
Root Password: root_password_123
```

---

## 📝 Comandos Útiles

```bash
# Ver logs de MySQL
docker-compose logs -f mysql

# Ver estado de contenedores
docker-compose ps

# Ver tablas
docker exec -it puravida_mysql mysql -u puravida_admin -p puravida -e "SHOW TABLES;"

# Ver estructura de una tabla
docker exec -it puravida_mysql mysql -u puravida_admin -p puravida -e "DESCRIBE events;"

# Contar registros
docker exec -it puravida_mysql mysql -u puravida_admin -p puravida -e "SELECT COUNT(*) FROM events;"

# Ejecutar query
docker exec -it puravida_mysql mysql -u puravida_admin -p puravida -e "SELECT * FROM events;"
```

---

## 🧹 Limpieza

### Detener (mantener datos)

```bash
docker-compose down
```

### Detener y eliminar (CUIDADO: borra datos)

```bash
docker-compose down -v
```

### Usar el script de limpieza

```bash
bash scripts/cleanup-db.sh
```

---

## 🔄 Reiniciar la Base de Datos

```bash
# Limpiar y reiniciar
docker-compose down -v
docker-compose up -d
sleep 15
```

---

## 📚 Conexión desde Backend

### Node.js (mysql2)

```javascript
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'puravida',
  user: 'puravida_admin',
  password: 'puravida_password_123'
});
```

### PHP (PDO)

```php
$pdo = new PDO(
  'mysql:host=localhost;port=3306;dbname=puravida;charset=utf8mb4',
  'puravida_admin',
  'puravida_password_123'
);
```

### Python (mysql-connector)

```python
import mysql.connector
connection = mysql.connector.connect(
    host='localhost',
    port=3306,
    database='puravida',
    user='puravida_admin',
    password='puravida_password_123'
)
```

---

## ⚙️ Configuración

Copiar `config.example.php` a `config.php` y actualizar con tus credenciales:

```bash
cp database/config.example.php database/config.php
```

---

## 🆘 Troubleshooting

### MySQL no está listo

```bash
# Ver logs
docker-compose logs mysql

# Esperar más tiempo
sleep 30
docker-compose ps
```

### Puerto 3306 ya está en uso

```bash
# Cambiar puerto en docker-compose.yml
# Línea: "3306:3306" → "3307:3306"
docker-compose down
docker-compose up -d
```

### Resetear todo

```bash
docker-compose down -v
rm -rf database/data/* 2>/dev/null
docker-compose up -d
sleep 15
```

---

## 📖 Más Información

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

