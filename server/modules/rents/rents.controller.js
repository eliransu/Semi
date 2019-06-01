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


module.exports = {
  updateOrderStatus,
  createNewOrder,
  getOrderById,
  getAllOrders
}