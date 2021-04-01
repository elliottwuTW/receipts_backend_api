const express = require('express')
const router = express.Router()

// middleware
const { checkRegisterInfo, checkLoginInfo, checkUserPassword, checkValidation } = require('../../middlewares/validator')

// request handler
const { register, login } = require('../../controllers/auth')

router.post('/register', checkRegisterInfo, checkUserPassword, checkValidation, register)
router.post('/login', checkLoginInfo, checkValidation, login)

module.exports = router
