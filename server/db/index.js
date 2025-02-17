const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'vote_system',
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 30,
    queueLimit: 0
});
  

module.exports = pool;