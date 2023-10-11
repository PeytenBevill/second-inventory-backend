const express = require('express')
const router = express.Router()
const computerController = require('../controllers/C-computers')

router.get('/computers', computerController.getAll)
router.post('/computers', computerController.addComputer)

module.exports = router