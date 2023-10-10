// const bcrypt = require('bcrypt')
// const pool = require('../sql/connection')


// const signup = async (req, res) => {
//   const { email, password, first_name } = req.body
//   const hashedPassword = await bcrypt.hash(password, 8)

//   pool.query(`INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)`, ['users', 'email', 'password', 'first_name', email, hashedPassword, first_name], (err, rows, fields) => {
//     res.json({
//       message: "User created!"
//     })
//   })
// }

// module.exports = {
//   signup,
// }