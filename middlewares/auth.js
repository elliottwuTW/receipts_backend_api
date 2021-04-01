const jwt = require('jsonwebtoken')

const { User } = require('../models/index')
const ErrorRes = require('../utils/ErrorRes')

exports.protect = async (req, res, next) => {
  // check token
  let token
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    const spaceIndex = authHeader.indexOf(' ')
    token = authHeader.slice(spaceIndex + 1)
  }
  if (!token) return next(new ErrorRes(401, 'Unauthorized due to no token'))

  // verify jwt
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findByPk(payload.id)
    next()
  } catch (err) {
    return next(new ErrorRes(401, 'Invalid token! Please get a new one'))
  }
}
