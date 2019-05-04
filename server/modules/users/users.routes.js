const users = require('express').Router()
const usersController = require('./users.controller')

users.get('/active-user', usersController.fetchActiveUser)
users.get('/products/:username', usersController.getProducts)
// users.get('/:username', usersController.getUserByUsername)
users.post('/product', usersController.addProductToUser)
users.put('/product', usersController.updateProductToUser)
users.post('/rent', usersController.rentProduct)
//users.delete('/product', usersController.deleteProductToUser)
//users.put('/', usersController.updateUserData)

module.exports = users
