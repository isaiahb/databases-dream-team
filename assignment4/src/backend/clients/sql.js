const mysql = require('mysql');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.SQL_HOST || 'localhost',
  user: process.env.SQL_USER || 'user',
  password: process.env.SQL_PASSWORD || 'password',
  database: process.env.SQL_DATABASE || 'databasename'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;