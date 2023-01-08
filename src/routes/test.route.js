const express = require('express')
const router = express.Router()

const testController = require('../controllers/test.controller')

router
  .route('/debug-duplicate-subject')
  .get(testController.debugDuplicatedSubject)

router
  .route('/')
  .get(testController.show)

router
  .route('/log')
  .get(testController.error)


module.exports = router
