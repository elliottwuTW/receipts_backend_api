const express = require('express')
const router = express.Router()

// middleware
const { checkTagInfo, checkValidation } = require('../../middlewares/validator')
const { protect } = require('../../middlewares/auth')

// request handler
const { createTag } = require('../../controllers/tags')

router.post('/', protect, checkTagInfo, checkValidation, createTag)

module.exports = router
