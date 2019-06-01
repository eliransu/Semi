const userRestricted = {
  products_for_rent: 0,
  orders_as_provider: 0,
  orders_as_consumer: 0,
  products_to_take: 0,
  products_to_give: 0,
  deleted: 0,
  __v: 0
}

const productRestricted = {
  __v: 0, owner: 0, quality: 0,
  reviews: 0, plans: 0, deleted: 0, description: 0,
  orders: 0
}

const orderRestricted = {
  __v: 0
}

module.exports = {
  userRestricted,
  productRestricted,
  orderRestricted
}
