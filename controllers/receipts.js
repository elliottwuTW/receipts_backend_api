const { Receipt, Tag } = require('../models/index')
const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('../middlewares/asyncWrapper')

// @desc      Parse the uploaded file to create a receipt
// @route     POST /api/v1/receipts
// @access    Private
exports.createReceipt = asyncWrapper(async (req, res, next) => {
  const tag = await Tag.findOne({ where: { title: req.body.tagTitle } })
  if (!tag) return next(new ErrorRes(400, `You don't have the tag named ${req.body.tagTitle}. Create a new tag first!`))

  // prevent double upload
  let receipt = await Receipt.findOne({ where: { sn: req.body.sn } })
  if (receipt) return next(new ErrorRes(400, 'You\'ve already uploaded this receipt'))

  receipt = await Receipt.create({
    ...req.body,
    UserId: req.user.id,
    TagId: tag.id
  })

  return res.status(201).json({
    status: 'success',
    data: receipt
  })
})
