const products = require('express').Router()
const productsController = require('./products.controller')
const authMiddleware = require('../../middleware/authMiddleware')
const adminMiddleware = require('../../middleware/adminMiddleware')

products.get('/', authMiddleware, adminMiddleware, productsController.getAllProducts)
products.get('/latest/:limit', productsController.getLatestProducts)
products.get('/by-category/:category', productsController.getProductsByCategory)
products.get('/categories', productsController.getAllCategories)
products.get('/query', productsController.getProductsByNameOrId)
products.get('/search', productsController.search)
products.put('/:id', authMiddleware, productsController.updateProduct)
products.delete('/:id', authMiddleware, adminMiddleware, productsController.deleteProduct)
products.post('/review', authMiddleware, productsController.addReviewToProduct)
products.post('/upload-image', productsController.uploadImage)
products.get('/scrapping', productsController.scrapProducts)

module.exports = products
