const { Tag } = require('../models/index')
const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('../middlewares/asyncWrapper')

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
