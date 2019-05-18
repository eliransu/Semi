const { Schema } = require("mongoose");
const mongoose = require('mongoose')
const autoPopulate = require('mongoose-autopopulate')

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
    autopopulate: { select: { __v: 0, owner: 0, quality: 0, reviews: 0, plans: 0, deleted: 0, description: 0 } }
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
    default: 'not handled'
  }
})

Rent.plugin(autoPopulate)

const rent = mongoose.model("Rent", Rent)

module.exports = rent