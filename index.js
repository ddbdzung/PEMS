require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./src/routes')
const config = require('./src/config/config')
const { errorConverter, errorHandler } = require('./src/middlewares/error')
// parse json request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: true}))

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let connectDb = () => {
  const Uri = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  return mongoose.connect(Uri)
}
connectDb()

// Init routes
app.use('/', routes)

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Hello David Dang, I'm running at http://${config.host}:${config.port}/`)
})