//products.get('/by-category/:category')
//products.post('/')
//products.put('/:id')
//products.delete('/:id')
//products.get('/:id')
const { httpResponse } = require('../../utils')
const productService = require('./products.service')

const getProductsByCategory = async (req, res) => {
  const { category } = req.params
  if (!category) {
    return res.json(httpResponse(500, 'category is not exist',
      'getProductsByCategory'))
  }
  const productsByCategory = await productService.getProductsByCategory(category)
  if (!productsByCategory) {
    return res.json(httpResponse(500, 'products not found',
      'getProductsByCategory'))
  }

  return res.json(httpResponse(200, productsByCategory))
}

const addProduct = async (req, res) => {
  const { name, image, category } = req.body
  if (!name || !image || !category) {
    return res.json(httpResponse(500, 'missing fields', 'addProduct'))
  }
  const productAdded = await productService.addProduct({ name, image, category })
  if (!productAdded) {
    return res.json(httpResponse(500, 'add product failed', 'addProduct'))
  }

  return res.json(httpResponse(201))
}

const updateProduct = async (req, res) => {
  const { name, image, category } = req.body
  const { id } = req.params
  if (!id) {
    return res.json(httpResponse(500, 'missing fields', 'updateProduct'))
  }
  const productUpdated = await productService.updateProduct({ name, image, category, id })
  if (!productUpdated) {
    return res.json(httpResponse(500, `failed to update ${name}`), 'updateProduct')
  }

  return res.json(httpResponse(204))
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.json(httpResponse(500, 'missing fields', 'deleteProduct'))
  }
  const productDeleted = await productService.deleteProduct(id)
  if (!productDeleted) {
    return res.json(500, `delete product with id: ${id} faild`, 'deleteProduct')
  }

  return res.json(httpResponse(204))
}

const getProductsByName = async (req, res) => {
  const { name } = req.params
  if (!name) {
    return res.json(httpResponse(500, 'missing fields', 'getProductsByName'))
  }
  const productsByName = await productService.getProductsByName(name)
  if (!productsByName) {
    return res.json(httpResponse(500, `products by name: ${name} are not found`))
  }
  return res.json(httpResponse(200, productsByName))
}

const getLatestProducts = async (req, res) => {
  const { limit = 10 } = req.params
  const latestProducts = await productService.getLatestProducts(limit)
  if (!latestProducts) {
    return res.json(httpResponse(500, 'Error while trying to load latest products'))
  }

  return res.json(latestProducts)
}

module.exports = {
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
  getLatestProducts
}