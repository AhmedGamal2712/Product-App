const { auth } = require('../../Middlewears/Authentication')
const validation = require('../../Middlewears/Validation')
const { add_product } = require('./controller/Add_product')
const {
  getallproduct,
  getYesterdayProducts
} = require('./controller/get_all_products')
const { update_pro } = require('./controller/update_pro')
const { add_pro_schema, update_Schema } = require('./products.validation')

const router = require('express').Router()

router.post('/addproduct', auth(), validation(add_pro_schema), add_product)
router.get('/Allproducts', getallproduct)
router.get('/yesterDayProducts', getYesterdayProducts)
router.put('/updateproduct/:_id', auth(), validation(update_Schema), update_pro)

module.exports = router
