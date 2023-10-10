const pool = require('../sql/connection')


//list all users
const list = (req, res) => {
  pool.query('SELECT * FROM users', (err, rows, fields) => {
    res.json(rows)
  })
}

module.exports = {
  list,
}