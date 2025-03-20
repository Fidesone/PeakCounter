const mysql = require('mysql2');

// Configuración de la conexión
const db = mysql.createConnection({
  host: 'localhost', // O el host de tu servidor
  user: 'root',      // Usuario de MySQL
  password: 'root', // Contraseña de MySQL
  database: 'mibasededatos'
 // Nombre de la base de datos
});

// Probar la conexión
db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = db;
