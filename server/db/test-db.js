const pool = require('./index.js');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Conexión exitosa:', rows);
  } catch (error) {
    console.error('Error en la conexión:', error);
  }
}

testConnection();