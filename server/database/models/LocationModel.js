const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const Location = new Schema({
  lang:{
    type:Number,
    required:true,
  },
  lat:{
     type:Number,
    required:true,
  },
  userAgent:{
    type:String,
    required:true,
  }
})

const location = mongoose.model("Location",Location);
module.exports = location;