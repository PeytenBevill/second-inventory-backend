const pool = require('../sql/connection')


//testing connection
const getAll = (req, res) => {
  pool.query('SELECT * FROM computers', (err, rows, fields) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
};

const addComputer = async (req, res) => {
  const {computer_num} = req.body

  pool.query('INSERT INTO computers (computer_num) VALUES (?)', [computer_num], (err, rows, fields) => {
    res.json({
      message: 'Computer added!'
    })
  })
}

module.exports = {
  getAll,
  addComputer
}