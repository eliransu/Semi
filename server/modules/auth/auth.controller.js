const UserModel = require('../../database/models/UserModel')
const { httpResponse } = require('../../utils')
const jwt = require('jwt-simple')

const register = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (user)
      return res.json(httpResponse(500, 'email already exist', 'register'))
    const newUser = new UserModel({
      first_name: firstname, last_name: lastname,
      username, email, password
    })
    await newUser.save()
    return res.json(httpResponse(201))
  }
  catch (err) {
    return res.json(httpResponse(500, 'failed to create user', 'register'))
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json(httpResponse(500, 'missing fields', 'login'))
  }
  const user = await UserModel.findOne({ email, password })
  if (!user) {
    return res.json(httpResponse(500, 'user not found', 'login'))
  }
  const hashedUser = jwt.encode({ username: user.username, email: user.email },
    process.env.JWT_SECRET)
  res.cookie('JWT_TOKEN', hashedUser, { maxAge: 900000000000, httpOnly: true })

  return res.json(httpResponse(200))
}

module.exports = {
  register,
  login
}