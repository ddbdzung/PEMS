const express = require('express')
const router = express.Router()

const publicController = require('../controllers/public.controller')
const { publicValidation } = require('../validation')
const validate = require('../middlewares/validate')

router
  .route('/')
  .get(publicController.viewHome)

router
  .route('/get-value-score')
  .get(publicController.getDiemTrungBinh)

router
  .route('/importData')
  .post(validate(publicValidation.importDataValidation), publicController.importData)

router
  .route('/exportDataToJSON')
  .get(publicController.exportDataToJSON)

router
  .route('/dropDatabase')
  .get(publicController.dropDatabase)

router
  .route('/test')
  .get(publicController.getTongTinChi)

module.exports = router
