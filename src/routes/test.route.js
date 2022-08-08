const express = require('express')
const router = express.Router()

const testController = require('../controllers/test.controller')

router
  .route('/debug-duplicate-subject')
  .get(testController.debugDuplicatedSubject)

module.exports = router
