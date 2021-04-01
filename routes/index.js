const express = require('express')
const router = express.Router()

// modules
const auth = require('./modules/auth')

// routes
router.use('/auth', auth)

module.exports = router
