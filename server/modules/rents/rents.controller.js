const { httpResponse } = require('../../utils')
const rentService = require('./rents.service')


const createNewOrder = async (req, res) => {
  const { providerName, consumerName, productId, plan } = req.body
  if (!providerName || !consumerName || !productId || !plan) {
    return res.json(httpResponse(400, 'missing fields', 'createNewOrder'))
  }
  if (!plan.price || !plan.period) {
    return res.json(httpResponse(400, 'plan object must include "period" and "price"', 'createNewOrder'))
  }

  const orderCreated = await rentService.createNewOrder(providerName, consumerName, productId, plan)
  if (!orderCreated) {
    return res.json(httpResponse(500, 'failed to create order', 'createNewOrder'))
  }

  return res.json(httpResponse(201))
}

const setOrderAsAccepted = async (req, res) => {
  const { providerName, orderId } = req.body
  if (!providerName || !orderId) {
    return res.json(httpResponse(400, 'missing fields', 'setOrderAsHandled'))
  }
  const orderMarkedAsAccepted = await rentService.markOrderAsAccepted(providerName, orderId)
  if (!orderMarkedAsAccepted) {
    return res.json(httpResponse(500, 'failed to mark order as accepted, please try again later.',
      'setOrderAsAccepted'))
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


module.exports = {
  setOrderAsAccepted,
  createNewOrder,
  getOrderById
}