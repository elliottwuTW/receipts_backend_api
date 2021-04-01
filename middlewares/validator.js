const { body, validationResult } = require('express-validator')

exports.checkRegisterInfo = [
  body('name').exists().notEmpty().withMessage('Name is required'),
  body('password').exists().notEmpty().withMessage('Password is required'),
  body('passwordConfirm').exists().notEmpty().withMessage('Password-confirmation is required')
]

// custom middleware
exports.checkUserPassword = [
  body('password').trim()
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error('Password confirmation does not match')
      }
      return true
    })
]

// check the validation result
exports.checkValidation = (req, res, next) => {
  let errors = validationResult(req).errors
  errors = errors.map(error => error.msg)
  if (errors.length === 0) {
    next()
  } else {
    return next(new Error(errors))
  }
}
