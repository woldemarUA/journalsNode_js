const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'db',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = { pool };
