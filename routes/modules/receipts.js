const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({ dest: 'temp/' })

// model
const { Receipt } = require('../../models/index')

// middleware
const { protect } = require('../../middlewares/auth')
const parseReceiptFile = require('../../middlewares/parseReceiptFile')
const { checkReceiptInfo, checkValidation, ifExist } = require('../../middlewares/validator')

// request handler
const { getReceipts, getReceipt, createReceipt } = require('../../controllers/receipts')

// routes protection
router.use(protect)

router.get('/', getReceipts)
router.get('/:id', ifExist(Receipt), getReceipt)
router.post('/', upload.single('file'), parseReceiptFile, checkReceiptInfo, checkValidation, createReceipt)

module.exports = router
