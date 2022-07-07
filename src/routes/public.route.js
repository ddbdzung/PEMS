const express = require('express')
const router = express.Router()

const publicController = require('../controllers/public.controller')

router
  .route('/')
  .get(publicController.viewHome)

router
  .route('/get-value-score')
  .get(publicController.getDiemTrungBinh)

router
  .route('/new-subject')
  .get(publicController.viewNewSubject)
  // .post(publicController.)

router
  .route('/importData')
  .get(publicController.importData)

router
  .route('/test')
  .get(publicController.getTongTinChi)

module.exports = router
