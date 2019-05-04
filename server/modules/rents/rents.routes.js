const orders = require('express').Router()
const rentsController = require('./rents.controller')

orders.get('/:id', rentsController.getOrderById)
orders.post('/', rentsController.createNewOrder)
orders.put('/accept', rentsController.setOrderAsAccepted)

module.exports = orders