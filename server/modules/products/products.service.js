const ProductModel = require('../../database/models/ProductModel')

const addProduct = async (product, user) => {
  const newProduct = new ProductModel({ ...product, belongs_to: user })
  const p = await newProduct.save()
  if (!p) {
    return false
  }
  return p
}
const getProductsByCategory = async (category) => {
  const products = await ProductModel.find({ category })
  if (!products) {
    return false
  }
  return products
}

const getProductById = async (id) => {
  const product = await ProductModel.findOne({ _id: id })
  if (!product) {
    return false
  }
  return product
}

const deleteProduct = async (id) => {
  const productToRemove = await ProductModel.findOne({ _id: id })
  if (!productToRemove) {
    return false
  }
  productToRemove.deleted = true
  const setAsDeleted = productToRemove.save()
  if (!setAsDeleted) {
    return false
  }
  return true
}

const updateProduct = async (product) => {
  const dbProduct = await ProductModel.findOne({ _id: product.id })
  if (!dbProduct) {
    return false
  }
  if (product.name) {
    dbProduct.name = product.name
  }
  if (product.category) {
    dbProduct.category = product.category
  }
  if (product.image) {
    dbProduct.image = product.image
  }
  const updated = await dbProduct.save()
  if (!updated) {
    return false
  }

  return true
}

const getProductsByName = async (name) => {
  const products = await ProductModel.find({ name })
  if (!products) {
    return false
  }
  return products
}

const getLatestProducts = async (limit) => {
  const limitNumeric = +limit
  const latestProducts = await ProductModel.find().sort({ 'createdAt': -1 }).limit(limitNumeric)
  if (latestProducts.length > 0) {
    return latestProducts
  }
  return null
}

module.exports = {
  addProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getProductsByName,
  getProductById
}