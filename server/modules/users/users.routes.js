const users = require('express').Router()
const usersController = require('./users.controller')

users.get('/:username', usersController.getUserByUsername)
users.get('/products/:username', usersController.getProducts)
users.post('/product', usersController.addProductToUser)
users.put('/product', usersController.updateProductToUser)
//users.delete('/product', usersController.deleteProductToUser)
//users.put('/', usersController.updateUserData)

module.exports = users
