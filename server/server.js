const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongooseRefValidator = require('mongoose-ref-validator')
const helmet = require('helmet')
const routes = require('./routes')

require('dotenv').config()
console.log(process.env.SEMI_DB_URI)
connectToSemiDB()

const PORT = process.env.PORT || 8080
const app = express()

app.use(helmet())
app.use(bodyParser({ extended: true, limit: '20mb' }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Semi server running on port: ${PORT}`)
})

function connectToSemiDB() {
  mongoose.plugin(mongooseRefValidator)
  mongoose.connect(process.env.SEMI_DB_URI, {
    reconnectTries: 10000,
    reconnectInterval: 10000
  })
  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected`)
  })
}

