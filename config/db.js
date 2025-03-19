const mysql = require('mysql2');
require('dotenv').config();

console.log("Connecting to MySQL with:");
console.log("DB_HOST:", process.env.DB_HOST || "localhost");
console.log("DB_USER:", process.env.DB_USER || "course_square");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3100,
  user: process.env.DB_USER || "course_square",
  password: process.env.DB_PASSWORD || "course_square",
  database: process.env.DB_NAME || "course_square",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
  .then((connection) => {
    console.log('db connection success');
    connection.release();
  })
  .catch((err) => {
    console.error('db connection failed:', err.message);
  });

module.exports = promisePool;
