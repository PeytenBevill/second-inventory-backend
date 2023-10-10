const express = require('express')
const router = express.Router()
const userController = require('../controllers/C-users')


router.get('/users', userController.list)


module.exports = router