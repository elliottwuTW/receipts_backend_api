const express = require('express')
const router = express.Router()

// middleware
const { checkRegisterInfo, checkUserPassword, checkValidation } = require('../../middlewares/validator')

// request handler
const { register } = require('../../controllers/auth')

router.post('/register', checkRegisterInfo, checkUserPassword, checkValidation, register)

module.exports = router
