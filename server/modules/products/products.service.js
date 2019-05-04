const ProductModel = require('../../database/models/ProductModel')
const ReviewModel = require('../../database/models/ReviewModel')
const CategoryModel = require('../../database/models/CategoryModel')

const reduceProductsData = (products) => {
  let productsArray = []
  if (!Array.isArray(products)) {
    productsArray = [products]
  } else {
    productsArray = products
  }
  return productsArray.map(prod => {
    prod.owner.products_for_rent = undefined
    prod.owner.orders_as_consumer = undefined
    prod.owner.orders_as_provider = undefined
    prod.owner.__v = undefined
    prod.owner.deleted = undefined
    prod.category.__v = undefined
    return prod
  })
}
const addProduct = async (product, user) => {
  if (!Array.isArray(product.images)) {
    product.images = [product.images]
  }
  const newProduct = new ProductModel({ ...product, owner: user })
  const p = await newProduct.save()
  if (!p) {
    return false
  }
  return p
}
const getProductsByCategory = async (category) => {
  const categoryModel = await CategoryModel.findOne({ name: category })
  const products = await ProductModel.find({ category: categoryModel })
  if (!products) {
    return false
  }

  return reduceProductsData(products)
}

const getProductById = async (id) => {
  const product = await ProductModel.findOne({ _id: id })
  if (!product) {
    return false
  }
  return reduceProductsData(product)
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
    let category = await CategoryModel.findOne({ name: product.category })
    if (!category) {
      category = new CategoryModel({ name: product.category })
      await category.save()
    }
    dbProduct.category = category
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
  return reduceProductsData(products)
}

const getLatestProducts = async (limit) => {
  const limitNumeric = +limit
  const latestProducts = await ProductModel.find().sort({ 'createdAt': -1 }).limit(limitNumeric)
  if (latestProducts.length > 0) {
    return reduceProductsData(latestProducts)
  }
  return null
}

const addReview = async (productId, username, stars, content) => {
  const userService = require('../users/users.service')
  const user = await userService.getUserByUsername(username)
  if (!user) return false

  const product = await getProductById(productId)
  if (!product) return false

  const review = new ReviewModel({ content, stars, creator: user })
  await review.save()

  product.reviews.push(review)
  await product.save()

  return true
}

const getAllCategories = async () => {
  const categories = await CategoryModel.find({})
  if (Array.isArray(categories)) {
    return categories.map(category => category.name)
  }
}

const getProductsByUserName = async (owner) => {
  const products = await ProductModel.find({ owner })
  if (!products) return false

  return reduceProductsData(products)
}

module.exports = {
  addProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getProductsByName,
  getProductById,
  addReview,
  getAllCategories,
  reduceProductsData,
  getProductsByUserName
}