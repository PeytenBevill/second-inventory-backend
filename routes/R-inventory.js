const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/C-inventory')

router.get('/inventory', inventoryController.getInventory)
router.get('/inventory/id/:id', inventoryController.getItemById)
router.get('/inventory/product/:product', inventoryController.getItemByProduct)
router.post('/inventory', inventoryController.addInventory)
router.put('/inventory/stock/:id', inventoryController.updateStock)
router.put('/inventory/price/:id', inventoryController.updatePrice)
router.delete('/inventory/:id', inventoryController.deleteItem)

module.exports = router