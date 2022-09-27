require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const config = require('./src/config/config')
const { connect } = require('./src/config/mongodb')
const { errorConverter, errorHandler } = require('./src/middlewares/error')
// parse json request body
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

connect()

// Init routes
app.use('/', routes)

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', () => {
  console.log('Listening on port: ' + process.env.PORT)
})