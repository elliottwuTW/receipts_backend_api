const express = require('express')
const router = express.Router()

// modules
const auth = require('./modules/auth')
const tags = require('./modules/tags')

// routes
router.use('/auth', auth)
router.use('/tags', tags)

module.exports = router
