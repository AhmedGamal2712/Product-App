const mongoose = require('mongoose')

const User_Schema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    phone: String
  },
  {
    timestamps: true
  }
)

const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const res = require('express/lib/response')
User_Schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  )
  this.phone = CryptoJS.AES.encrypt(this.phone, process.env.SECRET_KEY)
   this.phone =
     this.phone.substring(0, this.phone.length - 3) +
     CryptoJS.AES.encrypt(
       this.phone.substring(this.phone.length - 3),
      process.env.SECRET_KEY
     )
})
User_Schema.post('findOne', async function (docs, next) {
   console.log(docs.phone)
   docs.phone = CryptoJS.AES.decrypt(
     docs.phone,
    process.env.SECRET_KEY
   ).toString(CryptoJS.enc.Utf8)

   console.log(docs.phone)
   console.log(docs.phone.split('U2F')[0])
  console.log(docs)
  if (docs) {
    if (docs.phone) {
      notEncrypted_part = docs.phone.split('U2F')[0]
      encrypted_part = docs.phone.split('U2F')[1]
      docs.phone =
        notEncrypted_part +
        CryptoJS.AES.decrypt(
          'U2F' + encrypted_part,
          process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      console.log(docs.phone)
    }
  }
})

const user_model = mongoose.model('User', User_Schema)
module.exports = user_model
