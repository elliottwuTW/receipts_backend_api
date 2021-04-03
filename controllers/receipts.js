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

// @desc      Get all receipts
// @route     GET /api/v1/receipts
// @access    Private
exports.getReceipts = asyncWrapper(async (req, res, next) => {
  const option = {}
  // query parameter
  const { tagTitle } = req.query
  if (tagTitle) {
    const tag = await Tag.findOne({ where: { title: tagTitle } })
    if (tag) option.where = { TagId: tag.id }
  }

  // get receipts
  const receipts = await Receipt.findAll({
    where: {
      ...option.where,
      UserId: req.user.id
    },
    include: { model: Tag, attributes: ['title'] }
  })

  return res.status(200).json({
    status: 'success',
    data: receipts
  })
})

// @desc      Get single receipt
// @route     GET /api/v1/receipts/:id
// @access    Private
exports.getReceipt = asyncWrapper(async (req, res, next) => {
  const receipt = await Receipt.findByPk(req.params.id, {
    include: { model: Tag, attributes: ['title'] }
  })

  if (receipt.UserId !== req.user.id) return next(new ErrorRes(403, 'Not authorized to access this receipt'))

  return res.status(200).json({
    status: 'success',
    data: receipt
  })
})

// @desc      update the tag of a receipt by tagTitle
// @route     PUT /api/v1/receipts/:id/tag
// @access    Private
exports.updateReceiptTag = asyncWrapper(async (req, res, next) => {
  const receipt = await Receipt.findByPk(req.params.id)
  if (receipt.UserId !== req.user.id) return next(new ErrorRes(403, 'Not authorized to update this receipt'))

  const tag = await Tag.findOne({ where: { title: req.body.tagTitle } })
  if (!tag) return next(new ErrorRes(400, `You don't have the tag named ${req.body.tagTitle}. Create a new tag first!`))

  await receipt.update({ TagId: tag.id })

  return res.status(200).json({
    status: 'success',
    data: receipt
  })
})

// @desc      delete a receipt
// @route     DELETE /api/v1/receipts/:id
// @access    Private
exports.deleteReceipt = asyncWrapper(async (req, res, next) => {
  const receipt = await Receipt.findByPk(req.params.id)
  if (receipt.UserId !== req.user.id) return next(new ErrorRes(403, 'Not authorized to delete this receipt'))

  await receipt.destroy()

  return res.status(200).json({
    status: 'success',
    data: {}
  })
})
