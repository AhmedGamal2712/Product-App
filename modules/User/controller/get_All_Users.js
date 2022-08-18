const user_model = require('../../../DB/Models/User_Model')


exports.getAllUsers = async (req, res) => {
  try {
    const users = await user_model.find({})
    res.json({ message: 'done', users })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messsage: 'fail' })
  }
}


exports.getOneUser = async (req, res) => {
  try {
    const { _id } = req.body
    const user = await user_model.findOne({ _id })
    res.json({ message: 'done', user })
  } catch (error) {
    console.log(error)
    res.json({ message: 'fail' })
  }
}
