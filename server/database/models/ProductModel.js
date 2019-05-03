const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const Product = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  belongs_to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const product = mongoose.model("Product", Product)

module.exports = product