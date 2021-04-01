const express = require('express')
const router = express.Router()

// model
const { Tag } = require('../../models/index')

// middleware
const { checkTagInfo, checkValidation, ifExist } = require('../../middlewares/validator')
const { protect } = require('../../middlewares/auth')

// request handler
const { createTag, getTags, getTag, updateTag, deleteTag } = require('../../controllers/tags')

// routes protection
router.use(protect)

router.get('/', getTags)
router.get('/:id', ifExist(Tag), getTag)
router.post('/', checkTagInfo, checkValidation, createTag)
router.put('/:id', ifExist(Tag), updateTag)
router.delete('/:id', ifExist(Tag), deleteTag)

module.exports = router
