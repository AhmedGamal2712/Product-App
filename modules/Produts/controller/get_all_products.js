const { StatusCodes } = require('http-status-codes')
const moment = require('moment')
const pro_model = require('../../../DB/Models/Product_Model')
exports.getallproduct = async (req, res) => {
  try {
    const pros = await pro_model
      .find({})
      .populate({ path: 'createdBy', select: 'name email' })

    res.status(StatusCodes.OK).json({ message: 'done', products: pros })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
  }
}

exports.getYesterdayProducts = async (req, res) => {
  try {
    const two_days_ago = moment()
      .add(-2, 'days')
      .toISOString()
      .split('T')[0]
    const yesterday = moment()
      .add(-1, 'days')
      .toISOString()
      .split('T')[0]
    console.log(yesterday)
    const conver_step = await pro_model.find({})
    const products = conver_step.filter(key => {
      converted_form = key.createdAt.toISOString().split('T')[0]
      return converted_form == yesterday
    })
    if (products.length) {
      res.json({ message: 'done', products })
    } else {
      res.json({ message: 'there are no products created yesterday' })
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
  }
}
