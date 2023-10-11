const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
  host: 'database-1.c400waytzxzf.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Redhead814!',
  database: 'inventorydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0 
})

module.exports = connection