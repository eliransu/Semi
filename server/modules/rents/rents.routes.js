const orders = require('express').Router()
const rentsController = require('./rents.controller')

orders.get('/:id', rentsController.getOrderById)
orders.post('/', rentsController.createNewOrder)
orders.get('/', rentsController.getAllOrders)
orders.put('/accept', rentsController.updateOrderStatus)

module.exports = orders