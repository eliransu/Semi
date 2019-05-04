const { Schema } = require("mongoose");
const mongoose = require('mongoose')
const autoPopulate = require('mongoose-autopopulate')
const User = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  products_for_rent: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }]
  },
  address: {
    type: String
  },
  orders_as_provider: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Rent'
    }]
  },
  orders_as_consumer: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Rent'
    }]
  },
  phone_number: {
    type: String
  },
  profile_image: {
    type: String
  }
})
User.plugin(autoPopulate)
const user = mongoose.model("User", User)

module.exports = user