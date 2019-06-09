const { httpResponse } = require('../../utils')
const rentService = require('./rents.service')


const createNewOrder = async (req, res) => {
  const { providerName, consumerName, productId, plan, startDate } = req.body
  if (!providerName || !consumerName || !productId || !plan || !startDate) {
    return res.json(httpResponse(400, 'missing fields', 'createNewOrder'))
  }
  if (!plan.price || !plan.period) {
    return res.json(httpResponse(400, 'plan object must include "period" and "price"', 'createNewOrder'))
  }

  const orderCreated = await rentService.createNewOrder(providerName, consumerName, startDate, productId, plan)
  if (!orderCreated) {
    return res.json(httpResponse(500, 'failed to create order', 'createNewOrder'))
  }

  return res.json(httpResponse(201))
}

const updateOrderStatus = async (req, res) => {
  const { providerName, orderId, accepted } = req.body
  if (!providerName || !orderId) {
    return res.json(httpResponse(400, 'missing fields', 'setOrderAsHandled'))
  }
  const orderMarkedAsAccepted = await rentService.markOrderAsAccepted(providerName, orderId, accepted)
  if (!orderMarkedAsAccepted) {
    return res.json(httpResponse(500, 'failed to mark order as accepted, please try again later.',
      'updateOrderStatus'))
  }

  return res.json(httpResponse(204))
}

const getOrderById = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.json(httpResponse(400, 'missing fields', 'getOrderById'))
  }

  const order = await rentService.getOrderById(id)
  if (!order) {
    return res.json(httpResponse(500, 'failed to load order by id', 'getOrderById'))
  }

  return res.json(httpResponse(200, order))
}

const getAllOrders = async (req, res) => {
  const orders = await rentService.getAllOrders()
  if (!orders) {
    return res.json(httpResponse(500, 'failed to load all orders', 'getOrderById'))
  }
  return res.json(httpResponse(200, orders))
}

const deleteOrderById = async (req, res) => {
  const { orderId } = req.params
  if (!orderId) {
    return res.json(httpResponse(400, 'orderId as param is required', 'deleteOrderById'))
  }
  const orderDeleted = await rentService.deleteOrderById(orderId)
  if (!orderDeleted) {
    return res.json(httpResponse(500, 'failed to delete order by id', 'deleteOrderById'))
  }
  return res.json(httpResponse(204))
}

const getOrdersStatsByCategories = async (req, res) => {
  const ordersStats = await rentService.getOrdersStats()
  if (!ordersStats) {
    return res.json(httpResponse(500, 'Server Error', 'getOrdersStatsByCategories'))
  }
  return res.json(httpResponse(200, ordersStats))
}

const getOrdersByMonths = async (req, res) => {
  const statsByMonths = await rentService.getOrdersByMonthStats()
  if (!statsByMonths) {
    return res.json(httpResponse(500, 'Server Error', 'getOrdersByMonths'))
  }
  return res.json(httpResponse(200, statsByMonths))
}


module.exports = {
  updateOrderStatus,
  createNewOrder,
  getOrderById,
  getAllOrders,
  getOrdersStatsByCategories,
  deleteOrderById,
  getOrdersByMonths
}