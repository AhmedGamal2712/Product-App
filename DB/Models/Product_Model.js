const mongoose = require('mongoose')

const Product_Schema = new mongoose.Schema(
  {
    title: String,
    desc: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    price: Number
  },
  {
    timestamps: true
  }
)

const pro_model = mongoose.model('Product', Product_Schema)
module.exports = pro_model
