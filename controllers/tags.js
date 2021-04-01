const { Tag } = require('../models/index')
const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('../middlewares/asyncWrapper')

// @desc      Get all tag
// @route     GET /api/v1/tags
// @access    Private
exports.getTags = asyncWrapper(async (req, res, next) => {
  const tags = await Tag.findAll({ UserId: req.user.id })
  return res.status(200).json({
    status: 'success',
    data: tags
  })
})

// @desc      Get single tag
// @route     GET /api/v1/tags/:id
// @access    Private
exports.getTag = asyncWrapper(async (req, res, next) => {
  const tag = await Tag.findByPk(req.params.id)
  // check ownership
  if (tag.UserId !== req.user.id) return next(new ErrorRes(403, 'Denied to access due to ownership'))

  return res.status(200).json({
    status: 'success',
    data: tag
  })
})

// @desc      Create a tag
// @route     POST /api/v1/tags
// @access    Private
exports.createTag = asyncWrapper(async (req, res, next) => {
  let tag
  // check tag by title
  tag = await Tag.findOne({ where: { title: req.body.title } })
  if (tag) return next(new ErrorRes(400, ['Tag already exists']))

  tag = await Tag.create({
    title: req.body.title,
    UserId: req.user.id
  })
  return res.status(201).json({
    status: 'success',
    data: tag
  })
})

// @desc      Update a tag
// @route     PUT /api/v1/tags/:id
// @access    Private
exports.updateTag = asyncWrapper(async (req, res, next) => {
  const tag = await Tag.findByPk(req.params.id)
  // check ownership
  if (tag.UserId !== req.user.id) return next(new ErrorRes(403, 'Denied to access due to ownership'))

  await tag.update({ title: req.body.title })

  return res.status(200).json({
    status: 'success',
    data: tag
  })
})

// @desc      Delete a tag
// @route     DELETE /api/v1/tags/:id
// @access    Private
exports.deleteTag = asyncWrapper(async (req, res, next) => {
  const tag = await Tag.findByPk(req.params.id)
  // check ownership
  if (tag.UserId !== req.user.id) return next(new ErrorRes(403, 'Denied to access due to ownership'))

  await tag.destroy()

  return res.status(200).json({
    status: 'success',
    data: {}
  })
})
