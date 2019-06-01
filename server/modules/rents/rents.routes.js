const orders = require('express').Router()
const rentsController = require('./rents.controller')
const authMiddleware = require('../../middleware/authMiddleware')
const adminMiddleware = require('../../middleware/adminMiddleware')

orders.get('/:id', rentsController.getOrderById)
orders.post('/', authMiddleware, rentsController.createNewOrder)
orders.get('/', authMiddleware, adminMiddleware, rentsController.getAllOrders)
orders.put('/accept', authMiddleware, rentsController.updateOrderStatus)
orders.delete('/:orderId', authMiddleware, adminMiddleware, rentsController.deleteOrderById)

module.exports = orders