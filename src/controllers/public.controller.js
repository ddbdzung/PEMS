const { Subject } = require('../models')
const { subjectService } = require('../services')

const viewHome = async (req, res) => {
  const subject = await Subject.find({})
  res.render('master', {
    title: 'Home',
    data: subject,
  })
}

const dropDatabase = async (req, res) => {
  return await Subject.deleteMany({})
}

const getTongTinChi = async (req, res) => {
  const subjects = await Subject.find({})
  const length = subjects.length
  res.status(200).json(length)
}

const importData = async (req, res) => {
  const data = require('../vendor/data.json')  // Require data file
  await Subject.create(data)
  return res.send(data)
}

const getDiemTrungBinh = async (req, res) => {
  const subjects = await Subject.find({})
  const data = subjects.map(item => {
    let tmp = JSON.parse(JSON.stringify(item))
    tmp.diemChu = subjectService.getAlphabeticalScore(item)
    tmp.diemTichLuy = subjectService.getValueScore(tmp.diemChu)
    return tmp
  })
  let diemTrungBinh = 0
  let tongTinChi = 0
  let count = 0
  data.forEach(item => {
    if (item.diemTichLuy !== 0 && item.duocTinhTichLuy) {
      count++
      diemTrungBinh += (item.soTinChi * item.diemTichLuy)
      tongTinChi += item.soTinChi
    } else {
    }
  })
  res.json({
    diemTrungBinhMonDaTichLuy: diemTrungBinh,
    tongTinChiDaTichLuy: tongTinChi,
    tongSoMon: count,
    result: diemTrungBinh * 1.0 / tongTinChi,
  })
}

module.exports = {
  viewHome,

  importData,
  getTongTinChi,
  getDiemTrungBinh,
  dropDatabase,
}