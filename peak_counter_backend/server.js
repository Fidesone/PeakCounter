const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(bodyParser.json()); // Procesa cuerpos JSON

const authenticate = (req, res, next) => {
  const token = req.headers.authorization; // Extrae el token de la cabecera

  if (!token) {
    return res.status(401).send('Acceso denegado. No se proporcionó un token');
  }

  // Verifica y decodifica el token
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }

    req.user = decoded; // Añade la información del usuario al objeto `req`
    next(); // Permite que la solicitud continúe a la ruta
  });
};

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
    res.status(200).json({ success: true, message: 'Ascensión registrada correctamente' });
  });
});

app.post('/climbs', authenticate, (req, res) => {
  const { peak, date, altitude, distance } = req.body;

  if (!peak || !date || altitude == null || distance == null) {
      return res.status(400).send('Todos los campos (peak, date, altitude, distance) son obligatorios');
  }

  const query = `INSERT INTO climbs (peak_id, date, altitude, distance) VALUES (?, ?, ?, ?)`;

  db.query(query, [peak, date, altitude, distance], (err, result) => {
      if (err) {
          console.error('Error al registrar la subida:', err);
          return res.status(500).send('Error al registrar la subida');
      }
      res.status(200).send('Subida registrada con éxito');
  });
});

//Registro de usuarios
app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Hash de la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al hashear la contraseña:', err);
      return res.status(500).send('Error interno en el servidor');
    }

    // Guardar el usuario en la base de datos
    db.query('INSERT INTO users (name_user, email, password) VALUES (?, ?, ?)', 
      [nombre, email, hashedPassword], 
      (err, result) => {
        if (err) {
          console.error('Error al registrar el usuario:', err);
          return res.status(500).send('Error al registrar el usuario');
        }
        res.status(200).json({ success: true, message: 'Usuario registrado con éxito' });
      }
    );
  });
});

//Inicio de sesion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email y contraseña son obligatorios');
  }

  // Buscar al usuario en la base de datos
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).send('Error interno en el servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = results[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).send('Error interno en el servidor');
      }

      if (!isMatch) {
        return res.status(401).send('Contraseña incorrecta');
      }

      // Crear un token (JWT)
      const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
      res.json({ mensaje: 'Inicio de sesión exitoso', token });
    });
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
