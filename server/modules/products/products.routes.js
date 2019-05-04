const products = require('express').Router()
const productsController = require('./products.controller')

products.get('/latest/:limit', productsController.getLatestProducts)
products.get('/by-category/:category', productsController.getProductsByCategory)
products.get('/categories', productsController.getAllCategories)
products.get('/', productsController.getProductsByNameOrId)
products.get('/search', productsController.search)
products.post('/', productsController.addProduct)
products.put('/:id', productsController.updateProduct)
products.delete('/:id', productsController.deleteProduct)
products.post('/review', productsController.addReviewToProduct)
products.post('/upload-image', productsController.uploadImage)
products.get('/scrapping', productsController.scrapProducts)

module.exports = products
