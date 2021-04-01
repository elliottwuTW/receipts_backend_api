// libraries
const express = require('express')
const dotenv = require('dotenv')

// modules
const routes = require('./routes')

dotenv.config()

// declarations
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`This server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
