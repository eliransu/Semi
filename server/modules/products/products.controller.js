//products.get('/by-category/:category')
//products.post('/')
//products.put('/:id')
//products.delete('/:id')
//products.get('/:id')
const { httpResponse } = require('../../utils')
const productService = require('./products.service')
const userService = require('../users/users.service')
const { upload } = require('../utils/imageUploader');
const singleUpload = upload.single('image')
const axios = require('axios')

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
  const { username, name, image, category, price, description } = req.body
  if (!username) {
    return res.json(httpResponse(400, 'username is required', 'addProduct'))
  }
  if (!name || !image || !category || !price || !description) {
    return res.json(httpResponse(500, 'missing fields', 'addProduct'))
  }
  const addedToUser = await userService.addProduct(username, { name, image, category, price, description })
  if (!addedToUser) {
    return res.json(httpResponse(500, 'add product to user failed'))
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

const getProductsByNameOrId = async (req, res) => {
  const { name, id } = req.query
  if (!name && !id) {
    return res.json(httpResponse(500, 'missing fields', 'getProductsByName'))
  }
  let result
  if (name) {
    result = await productService.getProductsByName(name)
    if (!result) {
      return res.json(httpResponse(500, `products by name: ${name} are not found`))
    }
  } else if (id) {
    const arrayBecauseOfReduceElements = await productService.getProductById(id)
    result = arrayBecauseOfReduceElements[0]
    if (!result) {
      return res.json(httpResponse(500, `product by id: ${id} is not found`))
    }
  }
  return res.json(httpResponse(200, result))
}

const getLatestProducts = async (req, res) => {
  const { limit = 10 } = req.params
  const latestProducts = await productService.getLatestProducts(limit)
  if (!latestProducts) {
    return res.json(httpResponse(500, 'Error while trying to load latest products'))
  }

  return res.json(latestProducts)
}

const addReviewToProduct = async (req, res) => {
  const { productId, username, stars, content } = req.body
  if (!productId || !username) {
    return res.json(httpResponse(400, 'productId && username is required', 'addReviewToProduct'))
  }
  const reviewAdded = await productService.addReview(productId, username, stars, content)
  if (!reviewAdded) {
    return res.json(httpResponse(500, 'create review failed', 'addReviewToProduct'))
  }
  return res.json(httpResponse(201))
}

const getAllCategories = async (req, res) => {
  const categories = await productService.getAllCategories()
  if (!categories) {
    return res.json(httpResponse(500, 'Server failed to fetch all categories'))
  }

  return res.json(httpResponse(200, categories))
}

const uploadImage = async (req, res) => {
  singleUpload(req, res, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(req.file.location)
    }
  })
}

const scrapProducts = async (req, res) => {
  const { username, limit, page } = req.query
  const products = await axios.get(`http://localhost:4200/scrapping?pageNumber=${page}&limit=${limit ? limit : 80}`)
  const addProducts = products.data.map(product => userService.addProduct(username, {
    name: product.title, images: product.image,
    category: product.category,
    price: product.price, description: product.description,
    plans: product.plans,
    quality: product.quality
  }))
  addProducts.map(async (promise, idx) => {
    await promise
    console.log('added', idx)
  })
  return res.json('ok')
}

const search = async (req, res) => {
  const { categoryName, productName, minPrice, maxPrice, username, quality } = req.query
  if (!categoryName && !productName) {
    return res.json(httpResponse(400, 'category or productName are required'))
  }
  const results = await productService.search({ categoryName, productName, minPrice, maxPrice, username, quality })
  if (!results) {
    return res.json(httpResponse(500, 'failed to search by these fields', 'search'))
  }

  return res.json(httpResponse(200, results))
}

module.exports = {
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByNameOrId,
  getLatestProducts,
  addReviewToProduct,
  getAllCategories,
  uploadImage,
  scrapProducts,
  search
}