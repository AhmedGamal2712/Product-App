const { StatusCodes } = require('http-status-codes')
const pro_model = require('../../../DB/Models/Product_Model')

exports.update_pro = async (req, res) => {
  try {
    const { id } = req.user
    const { _id } = req.params
    const { title, desc, price } = req.body
    const modified = await pro_model.findOneAndUpdate(
      { _id, createdBy: id },
      { title, desc, price, $inc: { __v: 1 } },
      { new: true }
    )
    if (modified == null) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'unauthorized to update' })
    } else {
      res.status(200).json({ message: 'done', modified })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'fail' })
  }
}
