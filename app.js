// libraries
const express = require('express')
const dotenv = require('dotenv')

// modules
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

dotenv.config()

// declarations
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', routes)

// error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
