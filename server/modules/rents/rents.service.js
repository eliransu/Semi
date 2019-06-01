const RentModel = require('../../database/models/RentModel')
const UserModel = require('../../database/models/UserModel')
const ProductModel = require('../../database/models/ProductModel')

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const createNewOrder = async (providerName, consumerName, startDate, productId, plan) => {
  const provider = await UserModel.findOne({ username: providerName })
  const consumer = await UserModel.findOne({ username: consumerName })
  const product = await ProductModel.findOne({ _id: productId })
  if (!provider || !consumer || !product) return false
  console.log(provider.products_for_rent)
  if (!provider.products_for_rent.some(p => productId == p)) {
    console.log('product is not belong to provider')
    return false
  }

  const newRent = new RentModel({
    consumer, provider, product,
    start_time: startDate,
    finish_time: addDays(startDate, plan.period),
    plan
  })
  await newRent.save()
  if (!provider.orders_as_provider) {
    provider.orders_as_provider = []
  }
  if (!consumer.orders_as_consumer) {
    consumer.orders_as_consumer = []
  }
  provider.orders_as_provider.push(newRent)
  consumer.orders_as_consumer.push(newRent)
  await provider.save()
  await consumer.save()

  product.orders = Array.isArray(product.orders) ? product.orders.push(newRent) : [newRent]
  await product.save()
  return newRent
}

const markOrderAsAccepted = async (providerName, orderId, accepted) => {
  const user = await UserModel.findOne({ username: providerName })
  if (!user) return false

  const order = await RentModel.findOne({ _id: orderId })
  if (!order) return false

  accepted
    ? order.order_status = 'handled'
    : order.order_status = 'rejected'
  await order.save()

  return true
}

const getAllOrders = async () => {
  const orders = await RentModel.find({})
  return orders
}

const getOrderById = async id => {
  const order = await RentModel.findOne({ _id: id })
  return order
}

const deleteOrderById = async id => {
  const orderDeleted = await RentModel.findOneAndDelete({ _id: id })
  return orderDeleted
}

module.exports = {
  createNewOrder,
  markOrderAsAccepted,
  getOrderById,
  getAllOrders,
  deleteOrderById
}