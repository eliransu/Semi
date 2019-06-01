const users = require('express').Router()
const usersController = require('./users.controller')

users.get('/', usersController.getAllUsers)
users.get('/active-user', usersController.fetchActiveUser)
users.get('/products/:username', usersController.getProducts)
users.get('/orders', usersController.getOrdersByUsername)
users.get('/:username', usersController.getUserByUsername)
users.post('/product', usersController.addProductToUser)
users.put('/product', usersController.updateProductToUser)
users.post('/rent', usersController.rentProduct)
users.post('/match', usersController.manageMatching)
users.delete('/:userId', usersController.deleteUserById)
module.exports = users
