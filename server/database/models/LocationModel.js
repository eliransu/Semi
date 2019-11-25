const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const LocationModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const location = mongoose.model("LocationModel", LocationModel)
module.exports = location