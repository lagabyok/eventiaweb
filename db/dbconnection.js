const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "sql10.freesqldatabase.com",
  user: "sql10715508",
  password: "GG6PfPYsN7",
  database: "sql10715508",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
