const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'movielist'
});

dbConnection.connect();

module.exports = dbConnection;