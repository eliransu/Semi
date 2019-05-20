const { Schema } = require("mongoose");
const mongoose = require('mongoose')
const autoPopulate = require('mongoose-autopopulate')
const { productRestricted } = require('./restrictions')
const Rent = new Schema({
  consumer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    autopopulate: { select: productRestricted }
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
  plan: {
    type: Object,
    required: true
  },
  order_status: {
    type: String,
    required: true,
    enum: ['handled', 'not handled', 'rejected'],
    default: 'not handled'
  }
})

Rent.plugin(autoPopulate)

const rent = mongoose.model("Rent", Rent)

module.exports = rent