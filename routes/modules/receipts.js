const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({ dest: 'temp/' })

// model
const { Receipt } = require('../../models/index')

// middleware
const { protect } = require('../../middlewares/auth')
const parseReceiptFile = require('../../middlewares/parseReceiptFile')
const { checkReceiptInfo, checkValidation, ifExist, checkTagTitle } = require('../../middlewares/validator')

// request handler
const { getReceipts, getReceipt, createReceipt, updateReceiptTag, deleteReceipt } = require('../../controllers/receipts')

// routes protection
router.use(protect)

router.get('/', getReceipts)
router.get('/:id', ifExist(Receipt), getReceipt)
router.post('/', upload.single('file'), parseReceiptFile, checkReceiptInfo, checkTagTitle, checkValidation, createReceipt)
router.put('/:id/tag', ifExist(Receipt), checkTagTitle, checkValidation, updateReceiptTag)
router.delete('/:id', ifExist(Receipt), deleteReceipt)

module.exports = router
