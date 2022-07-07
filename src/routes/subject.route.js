const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subject.controller')

router
  .route('/')
  .post(subjectController.createSubject)
  .put(subjectController.updateSubject)
  .delete(subjectController.deleteSubject)

module.exports = router
