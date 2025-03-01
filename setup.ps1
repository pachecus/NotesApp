# Instalación de dependencias para el backend (Node.js)
Write-Host "Instalando dependencias del backend..."
cd backend
npm install

# Creación de la base de datos y configuración inicial
Write-Host "Creando base de datos y configurando la estructura..."
# Si estás usando Sequelize, puedes ejecutar el comando de migraciones
# Ejemplo: sequelize db:migrate

# Si usas otro ORM, adapta este comando a lo que uses
# Sequelize suele generar la base de datos a través de migraciones
# Ejemplo:
# npm run migrate

# Volver al directorio raíz del proyecto
cd ..

# Instalación de dependencias para el frontend (React)
Write-Host "Instalando dependencias del frontend..."
cd frontend
npm install

# Volver al directorio backend y iniciar el servidor del backend (con 'node server.js' si tu archivo es server.js)
Write-Host "Iniciando servidor del backend..."
cd ../backend

# Iniciar el servidor del backend en un proceso independiente
Start-Process "cmd" -ArgumentList "/c node server.js" -NoNewWindow

# Iniciar el servidor del frontend en otro proceso independiente
Write-Host "Iniciando servidor del frontend..."
cd ../frontend
Start-Process "cmd" -ArgumentList "/c npm start" -NoNewWindow

Write-Host "Todo está listo. La aplicación debería estar corriendo."
