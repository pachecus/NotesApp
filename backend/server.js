const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const notesRoutes = require('./src/routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());  // Para poder parsear JSON en las solicitudes

app.use('/api/notes', (req, res, next) => {
  console.log(`Solicitud ${req.method} recibida en /api/notes`);
  next(); // Continua con el siguiente middleware o ruta
});

// Rutas
app.use('/api/notes', notesRoutes);

// Iniciar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo conectar a la base de datos:', error);
});
