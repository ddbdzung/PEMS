const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subject.controller')

router
  .route('/')
  .post(subjectController.createSubject)
  .put(subjectController.updateSubject)
  .delete(subjectController.deleteSubject)

router
  .route('/:id')
  .get(subjectController.getSubject)

module.exports = router
