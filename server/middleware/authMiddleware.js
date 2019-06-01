const jwt = require('jwt-simple')
const UserModel = require('../database/models/UserModel')
const { httpResponse } = require('../utils')

const authMiddleware = async (req, res, next) => {
  const { JWT_TOKEN } = req.cookies
  if (!JWT_TOKEN) {
    return res.json(httpResponse(401, 'Unauthorized - Login is required'))
  }
  const decodedUser = jwt.decode(JWT_TOKEN, process.env.JWT_SECRET)
  if (!decodedUser) {
    return res.json(httpResponse(401, 'Unauthorized - Login is required'))
  }
  const user = await UserModel.findOne({ username: decodedUser.username })
  if (!user) {
    return res.json(httpResponse(401, 'Unauthorized - User not found'))
  }
  req.user = user
  return next()
}

module.exports = authMiddleware