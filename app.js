const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get('/', (req, res, next) => {
  console.log('project init')
})

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
