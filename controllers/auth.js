const { User } = require('../models/index')

// @desc      User register
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  let user
  try {
    user = await User.findOne({ where: { name: req.body.name } })
    if (user) return next(new Error('User name is in use'))
    // register
    user = await User.create(req.body)
    return res.status(201).json({
      status: 'success',
      data: user
    })
  } catch (err) {
    return next(err)
  }
}
