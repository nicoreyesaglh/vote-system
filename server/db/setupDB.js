const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const pool = require('./index.js');
require('dotenv').config();

async function setupDatabase() {
    const sqlFilePath = path.join(__dirname, 'database.sql');
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
  
    try {
    // Conectar al servidor de MySQL
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });
    //crear BBDD
    await connection.query(`CREATE DATABASE IF NOT EXISTS vote_system;`);
    console.log(`✅ Base de datos creada o ya existente.`);

    await connection.end(); 

    const connectionForSetup = await pool.getConnection();
    // Ejecutar el script SQL para precargar datos
    await connectionForSetup.query(sqlQuery);
        
    connectionForSetup.release();
        
    console.log('✅ Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('❌ Error ejecutando el script SQL:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase();