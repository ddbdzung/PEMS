const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')

router
  .route('/')
  .get(fileController.exportExcelInClientSide)
router
  .route('/f/serverSide')
  .get(fileController.exportDataToExcelInServerSide)

module.exports = router
