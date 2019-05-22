const UserModel = require('../../database/models/UserModel')
const productService = require('../products/products.service')
const rentService = require('../rents/rents.service')
const Category = require('../../database/models/CategoryModel')
const jwt = require('jwt-simple')
const ObjectId = require('mongodb').ObjectID;

const getProductsByUserName = async (username) => {
  const user = await UserModel.findOne({ username })
  if (!user) {
    return false
  }
  const products = productService.getProductsByUserName(user)
  return products
}

const addProduct = async (username, product) => {
  const user = await UserModel.findOne({ username })
  if (!user) {
    return false
  }
  const name = product.category && product.category.replace(/\s/g, '')
  let category = await Category.findOne({ name })
  if (!category) {
    category = new Category({ name })
    await category.save()
  }

  product.category = category

  const newProduct = await productService.addProduct(product, user)
  if (!newProduct) return false
  user.products_for_rent.push(newProduct)
  const saved = await user.save()
  if (!saved) {
    return false
  }
  return true
}

const updateProduct = async (username, product) => {
  const user = await UserModel.findOne({ _id: username })
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

const getUserByUsername = async (username) => {
  const user = await UserModel.findOne({ username })
  if (!user) {
    return false
  } else {
    const restrictedUser = Object.assign({}, user._doc)
    delete restrictedUser.password
    delete restrictedUser.orders_as_consumer
    delete restrictedUser.products_for_rent
    delete restrictedUser.orders_as_provider
    return restrictedUser
  }
}

const rentProduct = async (username, productId) => {
  const consumer = await UserModel.findOne({ _id: username })
  if (!consumer) return false

  const product = await productService.getProductById(productId).populate('o')
  if (!product) return false

  const provider = product.o
  const rent = await rentService.createNewRent(provider, consumer, product)
  if (!rent) return false

  // add the new rent to user history
  consumer.orders_as_consumer.push(rent)
  await consumer.save()

  return rent
}

const fetchActiveUser = async (userJwtToken) => {
  const decodeUser = jwt.decode(userJwtToken, process.env.JWT_SECRET)
  if (!decodeUser) return false

  const user = await getUserByUsername(decodeUser.username)
  if (!user) return false

  return user
}

const getOrdersByUsername = async (username, type) => {
  const userType = type.toLowerCase() === 'consumer' ? 'consumer' : 'provider'
  const user = await UserModel.findOne({ username }).populate(`orders_as_${userType}`)
  if (!user) return false
  const orders = user[`orders_as_${userType}`]
  return orders.map(order => {
    order.consumer.orders_as_consumer = undefined
    order.consumer.orders_as_provider = undefined
    order.provider.orders_as_consumer = undefined
    order.provider.orders_as_provider = undefined
    order.provider.products_for_rent = undefined
    order.consumer.products_for_rent = undefined
    order.consumer.password = undefined
    order.provider.password = undefined
    return order
  })

}

const getAllUsers = async () => {
  const users = await UserModel.find({}).select({
    products_for_rent: 0,
    orders_as_provider: 0,
    orders_as_consumer: 0,
    deleted: 0,
    __v: 0
  })
  return users
}

const manageMatching = async (userId, action, productIds) => {
  const user = await UserModel.findOne({ _id: userId })
  if (!user) return false
  if (action === 'give') {
    let errorFlag = false
    for (let i = 0; i < productIds.length; i++) {
      if (!user.products_for_rent.some(product => product._id == productIds[i])) {
        console.log('product is not belongs to this user !')
        errorFlag = true
      }
    }
    if (!errorFlag) {
      user.products_to_give = productIds
    }

  } else if (action === 'take') {
    try {
    } catch (err) {
      console.log(err)
    }
    const existsProductsPromiseArray = productIds.map(id => {
      try {
        const oid = ObjectId(id)
        return productService.getProductById(oid)
      } catch (err) {
        return false
      }
    })
    const existing = await Promise.all(existsProductsPromiseArray)
    if (existing.some(val => !val)) {
      console.log('product is not exist..')
      return false
    }
    user.products_to_take = productIds
  }

  await user.save()
  return true
}


module.exports = {
  getProductsByUserName,
  addProduct,
  updateProduct,
  getUserByUsername,
  rentProduct,
  fetchActiveUser,
  getOrdersByUsername,
  getAllUsers,
  manageMatching
}