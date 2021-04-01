const { User } = require('../models/index')
const ErrorRes = require('../utils/ErrorRes')
const asyncWrapper = require('../middlewares/asyncWrapper')

// @desc      User register
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncWrapper(async (req, res, next) => {
  let user
  user = await User.findOne({ where: { name: req.body.name } })
  if (user) return next(new ErrorRes(400, ['User name is in use']))
  // register
  user = await User.create(req.body)
  return res.status(201).json({
    status: 'success',
    data: user
  })
})
// @desc      User login
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncWrapper(async (req, res, next) => {
  const { name, password } = req.body
  const user = await User.findOne({ where: { name } })
  // check user name
  if (!user) return next(new ErrorRes(400, ['User name not found']))
  // check password
  const isMatched = await user.comparePassword(password)
  if (!isMatched) return next(new ErrorRes(400, ['Please check your password']))

  // response with JWT
  const token = user.getJwtToken()
  return res.status(200).json({
    status: 'success',
    token
  })
})
