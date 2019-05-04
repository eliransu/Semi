const RentModel = require('../../database/models/RentModel')
const UserModel = require('../../database/models/UserModel')
const ProductModel = require('../../database/models/ProductModel')

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const mapPeriodToDays = {
  '1 day': 1,
  '2 days': 2,
  '3 days': 3,
  '4 days': 4,
  '5 days': 5,
  '6 days': 6,
  '1 week': 7,
  '2 weeks': 14,
  '3 weeks': 21,
  '1 month': 30,
  '2 months': 60,
  '3 months': 90
}
const createNewOrder = async (providerName, consumerName, productId, plan) => {
  const provider = await UserModel.findOne({ username: providerName })
  const consumer = await UserModel.findOne({ username: consumerName })
  const product = await ProductModel.findOne({ _id: productId })
  console.log({ provider })
  console.log({ consumer })
  console.log({ product })
  if (!provider || !consumer || !product) return false

  const today = new Date(Date.now())
  const newRent = new RentModel({
    consumer, provider, product,
    start_time: today,
    finish_time: addDays(today, mapPeriodToDays[plan.period]),
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

  return newRent
}

const markOrderAsAccepted = async (providerName, orderId) => {
  const user = await UserModel.findOne({ username: providerName })
  if (!user) return false
  const order = await RentModel.findOne({ _id: orderId })
  console.log(order.provider)
  console.log(user._id)
  if (!order) return false
  // if (!order.provider != user._id) return false

  order.order_status = 'handled'
  await order.save()

  return true
}

const getOrderById = async id => {
  const order = await RentModel.findOne({ _id: id })
  if (!order) return false

  return order
}

module.exports = {
  createNewOrder,
  markOrderAsAccepted,
  getOrderById
}