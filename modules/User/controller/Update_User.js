const cryptoJs = require('crypto-js')
const { StatusCodes } = require('http-status-codes')
const user_model = require('../../../DB/Models/User_Model')

exports.update_user = async (req, res) => {
  try {
    const { id } = req.user
    const { name, email, phone } = req.body
    encrypted_phone =
      phone.substring(0, phone.length - 3) +
      cryptoJs.AES.encrypt(
        phone.substring(phone.length - 3),
        process.env.SECRET_KEY
      )
    await user_model.findOneAndUpdate(
      { _id: id },
      { name, email, phone: encrypted_phone, $inc: { __v: 1 } }
    )
    res.status(StatusCodes.OK).json({ message: 'updated done' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
  }
}
