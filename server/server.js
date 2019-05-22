const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongooseRefValidator = require('mongoose-ref-validator')
const helmet = require('helmet')
const routes = require('./routes')
const path = require('path')
const cookieParser = require('cookie-parser')
const { runMatching } = require('./modules/algorithms/matchingAlgorithm')

require('dotenv').config()
console.log(process.env.SEMI_DB_URI)
connectToSemiDB()

const PORT = process.env.PORT || 8080
const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser({ extended: true, limit: '20mb' }))
app.use('/api', routes)

app.use(express.static(path.join(__dirname, '../build')))
app.get('/ping', (req, res) => res.send({ ping: 'pong' }))
app.get('/*', (req, res) => {
  // if (req.headers.colman_private_key === process.env.COLMAN_KEY) {
  return res.sendFile(path.join(__dirname, '../build', 'index.html'))
  // } else {
  // res.status(500).end()
  // }
})

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
    setTimeout(() => {
      runMatching()
    }, 1000);
    console.log(`MongoDB connected`)
  })
}

