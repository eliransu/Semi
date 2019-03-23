const products = require('express').Router()
const productsController = require('./products.controller')

products.get('/by-category/:category', productsController.getProductsByCategory)
products.get('/:name', productsController.getProductsByName)
products.post('/', productsController.addProduct)
products.put('/:id', productsController.updateProduct)
products.delete('/:id', productsController.deleteProduct)

module.exports = products
