const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subject.controller')
const { subjectValidation } = require('../validation')
const validate = require('../middlewares/validate')

router
  .route('/')
  .post(validate(subjectValidation.createSubject), subjectController.createSubject)
  .put(validate(subjectValidation.updateSubject), subjectController.updateSubject)
  .delete(validate(subjectValidation.deleteSubject), subjectController.deleteSubject)

router
  .route('/:id')
  .get(validate(subjectValidation.getSubject), subjectController.getSubject)

module.exports = router
