const { body, validationResult } = require('express-validator')

const ErrorRes = require('../utils/ErrorRes')

exports.checkRegisterInfo = [
  body('name').exists().notEmpty().withMessage('Name is required'),
  body('password').exists().notEmpty().withMessage('Password is required'),
  body('passwordConfirm').exists().notEmpty().withMessage('Password-confirmation is required')
]

exports.checkLoginInfo = [
  body('name').exists().notEmpty().withMessage('Name is required'),
  body('password').exists().notEmpty().withMessage('Password is required')
]

exports.checkTagInfo = [
  body('title').exists().notEmpty().withMessage('Tag title is required')
]

exports.checkReceiptInfo = [
  body('tagTitle').exists().notEmpty().withMessage('Tag is required'),
  body('merchant').exists().notEmpty().withMessage('Merchant is required! Please check your uploaded receipt file'),
  body('date').exists().notEmpty().withMessage('Date is required! Please check your uploaded receipt file'),
  body('amount').exists().notEmpty().withMessage('Amount is required! Please check your uploaded receipt file'),
  body('info').exists().notEmpty().withMessage('info is required! Please check your uploaded receipt file'),
  body('sn').exists().notEmpty().withMessage('sn is required! Please check your uploaded receipt file')
]

// custom middleware
exports.checkUserPassword = [
  body('password').trim()
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new ErrorRes(400, 'Password confirmation does not match')
      }
      return true
    })
]

// check if resource exist
exports.ifExist = model => async (req, res, next) => {
  if (!req.params.id) {
    return next()
  }
  const id = req.params.id
  const resource = await model.findByPk(id)
  if (!resource) return next(new ErrorRes(404, `${model.name} with id ${id} does not exist`))
  next()
}

// check the validation result
exports.checkValidation = (req, res, next) => {
  let errors = validationResult(req).errors
  errors = errors.map(error => error.msg)
  if (errors.length === 0) {
    next()
  } else {
    return next(new ErrorRes(400, errors))
  }
}
