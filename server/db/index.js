const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'nico_user',
    password: 'notti0419',
    database: 'vote_system_local',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


module.exports = pool.promise();