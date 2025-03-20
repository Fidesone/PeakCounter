const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); // Procesa cuerpos JSON

// Rutas
app.get('/', (req, res) => {
  res.send('API de Peak Counter funcionando correctamente 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Capturar errores en el servidor
app.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
