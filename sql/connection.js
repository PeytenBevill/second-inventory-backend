const mysql2 = require('mysql2')



const connection = mysql2.createPool({
  host: 'database-2.c400waytzxzf.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Inventorypassword',
  database: 'inventorydb',
});


module.exports = connection;