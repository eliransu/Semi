const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const Category = new Schema({
  name: {
    type: String,
    required: true
  }
})

const category = mongoose.model("Category", Category)
module.exports = category