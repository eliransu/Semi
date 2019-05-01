const RentModel = require('../../database/models/RentModel')

const createNewRent = (provider, consumer, product, days) => {
  const today = new Date(Date.now())
  const newRent = new RentModel({
    consumer, provider, product,
    start_time: today,
    finish_time: today + days,
    price: product.price * days
  })
}