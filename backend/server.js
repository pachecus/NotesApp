const express = require('express');
const cors = require('cors');
// ORM library for interaction with SQL
const sequelize = require('./src/config/database');
// Routes for the creating, edition, elimination and other functions 
const notesRoutes = require('./src/routes/routesNotes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());  

app.use('/api/notes', (req, res, next) => {
  console.log('Request recieved');
  next(); 
});

// When a request with /api/notes arrives use the notesRoutes
app.use('/api/notes', notesRoutes);

// Inicialize server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error:', error);
});
