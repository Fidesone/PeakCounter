const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); // Procesa cuerpos JSON

// Rutas
app.get('/', (req, res) => {
  res.send('API de Peak Counter funcionando correctamente 🚀');
});

app.get('/peaks', (req, res) => {
  db.query('SELECT * FROM peaks', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los datos de los picos');
    } else {
      res.json(results);
    }
  });
});

app.post('/peaks/new', (req, res) => {
  const { name, altitud } = req.body;
  db.query('INSERT INTO peaks (name, altitud) VALUES (?, ?)', [name, altitud], (err, results) => {
    if (err) {
      res.status(500).send('Error al insertar un nuevo pico');
    } else {
      res.status(200).send('Nuevo pico añadido exitosamente');
    }
  });
});
app.post('/peaks', (req, res) => {
  const { id, name, altitud, climbs, lastClimb } = req.body;
  db.query(
    'UPDATE peaks SET name = ?, altitud = ?, climbs = ?, lastClimb = ? WHERE id = ?',
    [name, altitud, climbs, lastClimb, id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error al actualizar el pico');
      } else {
        res.status(200).send('Pico actualizado exitosamente');
      }
    }
  );
});

app.post('/peaks/climb', (req, res) => {
  console.log('Datos recibidos:', req.body);

  const { id, date } = req.body;

  if (!id || !date) {
    return res.status(400).send('Faltan datos requeridos (id o date)');
  }

  const query = `
    UPDATE peaks 
    SET climbs = climbs + 1, lastClimb = ?
    WHERE id = ?
  `;

  db.query(query, [date, id], (err, results) => {
    if (err) {
      console.error('Error al registrar la ascensión:', err);
      return res.status(500).send('Error al registrar la ascensión');
    }
    res.status(200).send('Ascensión registrada correctamente');
  });
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Capturar errores en el servidor
app.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
