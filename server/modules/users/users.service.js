const UserModel = require('../../database/models/UserModel')
const productService = require('../products/products.service')

const getProductsByUserName = async (username) => {
  const user = await UserModel.findOne({ username }).populate('products_for_rent')
  if (!user) {
    return false
  }
  return user.products_for_rent
}

const addProduct = async (userId, product) => {
  const user = await UserModel.findOne({ _id: userId })
  if (!user) {
    return false
  }
  const newProduct = await productService.addProduct(product)
  if (!newProduct) {
    return false
  }
  let productsArray = []
  if (user.products_for_rent) {
    productsArray = user.products_for_rent
  }
  productsArray.push(newProduct)
  user.products_for_rent = productsArray
  const saved = await user.save()
  if (!saved) {
    return false
  }
  return true
}

const updateProduct = async (userId, product) => {
  const user = await UserModel.findOne({ _id: userId })
  if (!user) {
    return false
  }
  const productBelongsToUser = user.products_for_rent.find(p => p === product.id)
  if (!productBelongsToUser) {
    return false
  }
  const productUpdated = await productService.updateProduct(product)
  if (!productUpdated) {
    return false
  }
  return true
}

module.exports = {
  getProductsByUserName,
  addProduct,
  updateProduct
}