const { Schema } = require("mongoose");
const mongoose = require('mongoose')
const autoPopulate = require('mongoose-autopopulate')
const { userRestricted } = require('./restrictions')
const Review = new Schema({
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { select: userRestricted }
  },
  stars: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

Review.plugin(autoPopulate)

const review = mongoose.model("Review", Review)
module.exports = review