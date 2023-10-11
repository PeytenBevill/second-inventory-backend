// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const pool = require('../sql/connection')
// require('dotenv').config()


// const signin = (req, res) => {
//   const { email, password } = req.body
//   console.log(email, password)
//   pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, user, fields) => {
//    console.log(user)
//     const hashedPassword = await bcrypt.compare(password, user[0].password)
    
//     if(hashedPassword){
//     const token = jwt.sign({ user_id: user[0].id }, process.env.DB_JWT_SECRET)
//     res.json({
//       token,
//       user_id: user[0].id
//     })
//   } else {
//     res.json({
//       message: 'Email or Password is incorrect'
//     })
//   }

//   })
  
// }

// module.exports = {
//   signin,
// }