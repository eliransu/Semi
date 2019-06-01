const orders = require('express').Router()
const rentsController = require('./rents.controller')
const authMiddleware = require('../../middleware/authMiddleware')

orders.get('/:id', rentsController.getOrderById)
orders.post('/', authMiddleware, rentsController.createNewOrder)
orders.get('/', authMiddleware, rentsController.getAllOrders)
orders.put('/accept', authMiddleware, rentsController.updateOrderStatus)
orders.delete('/:orderId', authMiddleware, rentsController.deleteOrderById)

module.exports = orders