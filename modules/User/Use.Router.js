
const { auth } = require('../../Middlewears/Authentication')
const validation = require('../../Middlewears/Validation')
const { getAllUsers, getOneUser } = require('./controller/get_All_Users')
const { update_user } = require('./controller/Update_User')
const { update_schema } = require('./user.validation')

const router = require('express').Router()


router.get('/users', getAllUsers)
router.get('/user', getOneUser)
router.put('/updateuser', auth(), validation(update_schema), update_user)
module.exports = router
