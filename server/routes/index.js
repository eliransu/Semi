const auth = require('../modules/auth/auth.routes')
const products = require('../modules/products/products.routes')
const users = require('../modules/users/users.routes')
const orders = require('../modules/rents/rents.routes')
const router = require('express').Router()

router.use('/auth', auth)
router.use('/products', products)
router.use('/users', users)
router.use('/orders', orders)

module.exports = router
