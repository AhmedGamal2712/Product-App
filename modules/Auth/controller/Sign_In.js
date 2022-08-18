const { StatusCodes } = require('http-status-codes')
const user_model = require('../../../DB/Models/User_Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const emailCheck = await user_model.findOne({ email })
    if (emailCheck) {
      const hashed = await bcrypt.compare(password, emailCheck.password)
      if (hashed) {
        const token = jwt.sign(
          { id: emailCheck._id, email: emailCheck.email },
          process.env.HASH_KEY
        )
        res
          .status(StatusCodes.OK)
          .json({ message: 'signIn done', Your_token: token })
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'email or password invalid' })
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'email or password invalid' })
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
  }
}
