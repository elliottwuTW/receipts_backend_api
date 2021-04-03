const ErrorRes = require('../utils/ErrorRes')
const readFilePromise = require('../utils/readFilePromise')
const asyncWrapper = require('./asyncWrapper')

module.exports = asyncWrapper(async (req, res, next) => {
  const { file } = req
  if (!file) return next(new ErrorRes(400, 'No uploaded file to create a receipt'))

  const data = await readFilePromise(file.path)
  const linesOfFile = data.split('\r\n')
  /// merchant
  const merchant = linesOfFile[0]

  /// date
  const [dateStr, timeStr] = linesOfFile[4].split('  ')
  const dateStartIndex = dateStr.indexOf(':') + 1
  const [day, month, year] = dateStr.slice(dateStartIndex).split('.')
  const timeStartIndex = timeStr.indexOf(':') + 1
  const [hour, minute, second] = timeStr.slice(timeStartIndex).split(':')
  // ISOString in UTC
  const date = new Date(year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.000Z')

  /// sn
  const sn = Number(linesOfFile[5].split(':')[1].trim())

  /// info
  const itemsStr = linesOfFile[linesOfFile.length - 7].split('  ')[0]
  const items = Number(itemsStr.slice(itemsStr.indexOf('(') + 1, itemsStr.indexOf(')')))
  let info = ''
  for (let infoIndex = 7; infoIndex < 7 + (items * 2); infoIndex++) {
    info += linesOfFile[infoIndex] + '\r\n'
  }

  /// amount
  const totalStr = linesOfFile[linesOfFile.length - 5].split(':')[1]
  const amount = Number(totalStr.trim())

  req.body = { ...req.body, merchant, date, sn, info, amount }
  next()
})
