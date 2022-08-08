const { Subject } = require('../models')
const { subjectService } = require('../services')
const { catchAsync } = require('../utils')

const createSubject = catchAsync(async (req, res) => {
  const dataFromClient = {
    maHP: req.body.maHP,
    maIn: req.body.maIn,
    tenHP: req.body.tenHP,
    hocKy: req.body.hocKy,
    soTinChi: req.body.soTinChi,
    tbKtraTX: req.body.tbKtraTX,
    diemThi: req.body.diemThi,
    diemTB: req.body.diemTB,
    duocTinhTichLuy: req.body.isValueSubject,
  }
  await Subject.create(dataFromClient, (err, dataFromDatabase) => {
    if (err) return res.send(err)
    
    dataFromClient.id = dataFromDatabase._id
  })
  const length = await Subject.estimatedDocumentCount()
  res.json({
    message: 'Created a new subject',
    subject: dataFromClient,
    length,
  })
})

const updateSubject = catchAsync(async (req, res) => {
  const newData = {
    maHP: req.body.maHP,
    maIn: req.body.maIn,
    tenHP: req.body.tenHP,
    hocKy: req.body.hocKy,
    soTinChi: req.body.soTinChi,
    tbKtraTX: req.body.tbKtraTX,
    diemThi: req.body.diemThi,
    diemTB: req.body.diemTB,
    duocTinhTichLuy: req.body.duocTinhTichLuy,
  }
  const { id } = req.body
  console.log(id)
  const beforeUpdatedData = await Subject.findOneAndUpdate({ _id: id }, newData)
  console.log(beforeUpdatedData)
  // 62f05dd4e16e09cd53e55491
  newData.id = beforeUpdatedData._id
  res.json({
    message: 'Bạn đã cập nhật thành công!',
    newData,
  })
})

const deleteSubject = catchAsync(async (req, res) => {
  const { id } = req.body
  await Subject.findByIdAndDelete(id)
  res.json({
    message: 'Bạn đã xóa thành công 1 môn học!',
    subjectId: id,
  })
})

const getSubject = catchAsync(async (req, res) => {
  const { id } = req.params
  const subject = await subjectService.getSubjectById(id)
  res.json({
    data: subject,
  })
})

module.exports = {
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
}