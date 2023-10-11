const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization
  if(authHeader) {
    const token = authHeader.split(' ')[1]

jwt.verify(token, process.env.DB_JWT_SECRET, (err, user) => {
      if(err) {
        res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else {
    // req.sendStatus(403)
  }
  
}

module.exports = authenticateJWT