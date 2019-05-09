const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const ProductPlan = new Schema({
  period: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const plan = mongoose.model("ProductPlan", ProductPlan)

module.exports = plan