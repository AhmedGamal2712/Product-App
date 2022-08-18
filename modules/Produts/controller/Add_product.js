const { StatusCodes } = require('http-status-codes')
const pro_model = require('../../../DB/Models/Product_Model')

exports.add_product = async (req, res) => {
  try {
    const { title, desc, price } = req.body
    const newProduct = new pro_model({
      title,
      desc,
      price,
      createdBy: req.user.id
    })
    const savedPro = await newProduct.save()
    res.status(StatusCodes.CREATED).json({ message: 'added done' , product: savedPro })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'fail' })
  }
}
 