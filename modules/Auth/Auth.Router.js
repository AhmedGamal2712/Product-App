const validation = require('../../Middlewears/Validation')
const { Sign_up_schema, sign_In_Schema } = require('./Auth_Validation')
const { signIn } = require('./controller/Sign_In')
const { sign_up } = require('./controller/Sign_Up')

const router = require('express').Router()





router.post("/signup" , validation(Sign_up_schema) , sign_up)
router.post("/signin" , validation(sign_In_Schema) , signIn)


module.exports = router
