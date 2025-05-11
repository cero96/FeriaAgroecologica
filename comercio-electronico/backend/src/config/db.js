// backend/src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Puerto por defecto de PostgreSQL
});

pool.connect()
  .then(() => console.log('🟢 Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('🔴 Error al conectar a la base de datos:', err));

module.exports = pool;
