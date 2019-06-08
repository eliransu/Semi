const jwt = require('jwt-simple')
const { httpResponse } = require('../utils')

const adminMiddleware = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next()
  }
  return res.json(httpResponse(401, 'Unauthorized - User is not an admin'))
}

module.exports = adminMiddleware