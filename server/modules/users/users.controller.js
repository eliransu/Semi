
const { httpResponse } = require('../../utils')
const userService = require('../users/users.service')
const { runMatching } = require('../algorithms/matchingAlgorithm')

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

const addGeoLocation = async (req,res)=>{
  const {longitude,latitude,userAgent} =req.body;
  if(!latitude||!longitude||!userAgent){
    return res.json(httpResponse(500,'user not allow geolocation','addGeoLocation'));
  }
  const location = await userService.addUserGeoLocation(latitude,longitude,userAgent);
  if(!location){
    return res.json(httpResponse(500,'location not fetch'));
  }
  return res.json(httpResponse(200,location));

}

const addProductToUser = async (req, res) => {
  const { username, images, category, name, description, retail_price, sub_category, quality, plans } = req.body
  if (!username || !category || !name) {
    return res.json(httpResponse(500, 'missing fields', 'addProductToUser'))
  }
  const addedProduct = await userService.addProduct(username,
    {
      name,
      retail_price,
      images,
      category,
      description,
      sub_category,
      quality,
      plans
    })
  if (!addedProduct) {
    return res.json(httpResponse(500,
      `add product to userId: ${username} failed`, 'addProductToUser'))
  }

  return res.json(httpResponse(201))
}

const updateProductToUser = async (req, res) => {
  const { username, productId, images, category, name, plans, retailPrice } = req.body
  if (!username || !productId) {
    return res.json(httpResponse(500, 'missing fields', 'updateProductToUser'))
  }
  const productUpdated = await userService.updateProduct(username,
    { name, category, images, id: productId, retail_price: retailPrice, plans })
  if (!productUpdated) {
    return res.json(httpResponse(500, `failed to update ${name}`,
      'updateProductToUser'))
  }
  return res.json(httpResponse(204))
}

const getUserByUsername = async (req, res) => {
  const { username } = req.params
  if (!username) return res.json(httpResponse(400, 'missing username attribute'))

  const user = await userService.getUserByUsername(username)
  if (!user) {
    return res.json(httpResponse(400, 'user not found'))
  }
  return res.json(httpResponse(200, user))
}

const rentProduct = async (req, res) => {
  const { productId, username } = req.body
  if (!productId || !username) return res.json(httpResponse(400, 'missing productId or username'))

  const rented = await userService.rentProduct(username, productId)

  if (!rented) {
    return res.json(httpResponse(500, 'rent product failed'))
  }

  return res.json(httpResponse(201))
}

const fetchActiveUser = async (req, res) => {
  const token = req.cookies.JWT_TOKEN
  if (!token) return res.json(httpResponse(400))

  const user = await userService.fetchActiveUser(token)
  if (!user) return res.json(httpResponse(400))

  return res.json(httpResponse(200, user))
}

const getOrdersByUsername = async (req, res) => {
  const { username, type } = req.query
  if (!username || !type) {
    return res.json(httpResponse(400, 'missing fields', 'getOrdersByUsername'))
  }

  const orders = await userService.getOrdersByUsername(username, type)
  if (!orders) {
    return res.json(httpResponse(500, 'failed to fetch orders', 'getOrdersByUsername'))
  }

  return res.json(httpResponse(200, orders))
}

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers()
  if (!users) {
    return res.json(httpResponse(500, 'users not found', 'getAllUsers'))
  }
  return res.json(httpResponse(200, users))
}

const manageMatching = async (req, res) => {
  const { productIds, userId, action } = req.body
  if (!action || !userId || !Array.isArray(productIds)) {
    return res.json(httpResponse(500, 'missing fields', 'manageMatching'))
  }
  const matchPlacementCreated = await userService.manageMatching(userId, action, productIds)
  if (!matchPlacementCreated) {
    return res.json(httpResponse(500, 'failed to placement matching', 'manageMatching'))
  }

  return res.json(httpResponse(201))
}

const deleteUserById = async (req, res) => {
  const { userId } = req.params
  if (!userId) {
    return res.json(httpResponse(400, 'userId is required', 'deleteUserById'))
  }
  const userDeleted = await userService.deleteUserById(userId)
  if (!userDeleted) {
    return res.json(httpResponse(500, 'failed to delete user', 'deleteUserById'))
  }

  return res.json(httpResponse(204))
}

const getAllProductsToReplace = async (req, res) => {
  const { userId } = req.params
  if (!userId || (userId.length !== 12 && userId.length !== 24)) {
    return res.json(httpResponse(400, 'wrong userId', 'getAllProductsToReplace'))
  }
  const allProductsToReplace = await userService.getAllProductsToReplace(userId)
  if (!allProductsToReplace) {
    return res.json(httpResponse(500, 'failed to load products to replace',
      'getAllProductsToReplace'))
  }
  return res.json(httpResponse(200, allProductsToReplace))
}

const getReplacementProductsByUsername = async (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.json(httpResponse(400, 'username is required as param',
      'getReplacementProductsByUsername'))
  }
  const replacementProducts = await userService.getReplacementProductsByUsername(username)
  if (!replacementProducts) {
    return res.json(httpResponse(500, 'Server Error', 'getReplacementProductsByUsername'))
  }
  return res.json(httpResponse(200, replacementProducts))
}

const getRestrictedUserData = async (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.json(httpResponse(400, 'username is required as param',
      'getRestrictedUserData'))
  }
  const userRestricted = await userService.getRestrictedUserData(username)
  if (!userRestricted) {
    return res.json(httpResponse(500, 'Server Error', 'getRestrictedUserData'))
  }
  return res.json(httpResponse(200, userRestricted))
}

const getMatchingIfExist = async (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.json(httpResponse(400, 'username is required as param',
      'getMatchingIfExist'))
  }
  const cycle = await runMatching(username)
  if (!cycle) {
    return res.json(httpResponse(500, 'failed to load cycle', 'getMatchingIfExist'))
  }
  return res.json(httpResponse(200, cycle))
}

module.exports = {
  getProducts,
  addProductToUser,
  updateProductToUser,
  getUserByUsername,
  rentProduct,
  fetchActiveUser,
  getOrdersByUsername,
  getAllUsers,
  manageMatching,
  deleteUserById,
  getAllProductsToReplace,
  getRestrictedUserData,
  getReplacementProductsByUsername,
  getMatchingIfExist,
  addGeoLocation
}