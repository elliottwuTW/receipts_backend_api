const express = require('express')
const router = express.Router()

// modules
const auth = require('./modules/auth')
const tags = require('./modules/tags')
const receipts = require('./modules/receipts')

// routes
router.use('/auth', auth)
router.use('/tags', tags)
router.use('/receipts', receipts)

module.exports = router
