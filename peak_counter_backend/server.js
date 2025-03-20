const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); // Procesa cuerpos JSON

// Datos de los picos
let peaks = [
  { id: 1, name: 'Peñalara', altitud: 2428, climbs: 0, lastClimb: null },
  { id: 2, name: 'La Maliciosa', altitud: 2227, climbs: 0, lastClimb: null },
  { id: 3, name: 'Siete Picos', altitud: 2138, climbs: 0, lastClimb: null },
];

// Rutas
app.get('/', (req, res) => {
  res.send('API de Peak Counter funcionando correctamente 🚀');
});

// Ruta para obtener la lista de picos
app.get('/peaks', (req, res) => {
  res.json(peaks); // Devuelve la lista de picos como JSON
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Capturar errores en el servidor
app.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
