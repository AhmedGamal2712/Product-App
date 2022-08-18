const user_model = require('../../../DB/Models/User_Model')

const { StatusCodes } = require('http-status-codes')
exports.sign_up = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const newUser = new user_model({ name, email, password, phone })
    const savedUser = await newUser.save()
    res.status(StatusCodes.CREATED).json({ message: 'done', User: savedUser })
  } catch (error) {
    if (error.keyValue) {
      if (error.keyValue.email) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'email is already exits' })
      }
    } else {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
    }
  }
}
