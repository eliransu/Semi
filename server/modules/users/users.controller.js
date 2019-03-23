
const { httpResponse } = require('../../utils')
const userService = require('../users/users.service')

const getProducts = async (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.json(httpResponse(500, 'missing fields', 'getProductsById'))
  }
  const products = await userService.getProductsByUserName(username)
  if (!products) {
    return res.json(httpResponse(500, `products to: ${username} is not found`, 'getProductsById'))
  }
  return res.json(httpResponse(200, products))
}

const addProductToUser = async (req, res) => {
  const { userId, image, category, name } = req.body
  if (!userId || !image || !category || !name) {
    return res.json(httpResponse(500, 'missing fields', 'addProductToUser'))
  }
  const addedProduct = await userService.addProduct(userId, { name, image, category })
  if (!addedProduct) {
    return res.json(httpResponse(500,
      `add product to userId: ${userId} failed`, 'addProductToUser'))
  }

  return res.json(httpResponse(201))
}

const updateProductToUser = async (req, res) => {
  const { userId, productId, image, category, name } = req.body
  if (!userId || !productId) {
    return res.json(httpResponse(500, 'missing fields', 'updateProductToUser'))
  }
  const productUpdated = await userService.updateProduct(userId,
    { name, category, image, id: productId })
  if (!productUpdated) {
    return res.json(httpResponse(500, `failed to update ${name}`,
      'updateProductToUser'))
  }
  return res.json(httpResponse(204))
}

module.exports = {
  getProducts,
  addProductToUser,
  updateProductToUser
}