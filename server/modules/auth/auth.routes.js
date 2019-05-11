const auth = require('express').Router()
const authController = require('./auth.controller')

auth.post('/login', authController.login)
auth.post('/register', authController.register)
auth.post('/logOut', authController.logOut)

module.exports = auth