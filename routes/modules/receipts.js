const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({ dest: 'temp/' })

// model
const { Receipt } = require('../../models/index')

// middleware
const { protect } = require('../../middlewares/auth')
const parseReceiptFile = require('../../middlewares/parseReceiptFile')
const { checkReceiptInfo, checkValidation } = require('../../middlewares/validator')

// request handler
const { createReceipt } = require('../../controllers/receipts')

// routes protection
router.use(protect)

router.post('/', upload.single('file'), parseReceiptFile, checkReceiptInfo, checkValidation, createReceipt)

module.exports = router
