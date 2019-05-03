const { Schema } = require("mongoose");
const mongoose = require('mongoose')
const autoPopulate = require('mongoose-autopopulate')
const Product = new Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    autopopulate: true
  },
  sub_category: {
    type: String
  },
  quality: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  },
  retail_price: {
    type: Number
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
    default: [],
    autopopulate: true
  },
  plans: {
    type: [Object],
    default: [],
    // autopopulate: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: 'Rent',
    default: [],
    autopopulate: true
  }
})
Product.plugin(autoPopulate)
const product = mongoose.model("Product", Product)

module.exports = product