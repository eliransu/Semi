const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const Rent = new Schema({
  consumer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  finish_time: {
    type: Date,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  }
})

const rent = mongoose.model("Rent", Rent)

module.exports = rent