const express = require('express')
// const userRoute = require('./user.route')
const subjectRoute = require('./subject.route')
// const authRoute = require('./auth.route')
const publicRoute = require('./public.route')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/',
    route: publicRoute,
  },
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
]

const userRoutes = [
  // {
  //   path: '/user',
  //   route: userRoute,
  // },
  {
    path: '/api/subject',
    route: subjectRoute,
  },
]

const adminRoutes = [
  
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

userRoutes.forEach(route => {
  router.use(route.path, route.route)
})

adminRoutes.forEach(route => {
  router.use(route.path, route.route)
})

module.exports = router
