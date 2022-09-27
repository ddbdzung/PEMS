const fs = require('fs');
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
  try {
    await Subject.deleteMany({})
    res.send('Drop database successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Has error')
  }
}

const getTongTinChi = async (req, res) => {
  const subjects = await Subject.find({})
  const length = subjects.length
  res.status(200).json(length)
}

const exportDataToJSON = async (req, res) => {
  let data = await subjectService.getAllSubjects()
  data = data.map(item => {
    delete item._id
    delete item.createdAt
    delete item.updatedAt
    delete item.__v
    return item
  })
  fs.writeFile("./src/vendor/export-data.json", JSON.stringify(data), err => {
    if (err) {
      return res.send(err);
    }
    res.send(data)
  });
}

const importData = async (req, res) => {
  let { data } = req.body
  try {
    await Subject.create(data)
    return res.status(200).send({ message: 'Import data successfully' })
  } catch (e) {
    return res.status(500).send({ message: 'Internal server error' })
  }
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
  let soMonTichLuyTruot = 0
  let tongTinChiAllMonDaQua = 0
  // let tongTinChiAllMon = 0
  // let tongTinChiTichLuy = 0
  // let tongTinChiKhongTichLuy = 0
  data.forEach(item => {
    if (item.diemChu === 'F' && item.duocTinhTichLuy) {
      soMonTichLuyTruot += 1
    }
    tongTinChiAllMonDaQua += ((item.diemTrungBinh != 0) ? item.soTinChi : 0)
    // if (item.diemTichLuy != 0 && item.duocTinhTichLuy) {
    //   console.log('Hoc phan tinh tich luy', item.tenHP)
    //   tongTinChiTichLuy += item.soTinChi
    // } else {
    //   console.log('Hoc phan khong tinh tich luy', item.tenHP)
    //   tongTinChiKhongTichLuy += item.soTinChi
    // }
  })
  // console.log('Tong tin chi all mon: ', tongTinChiAllMon);
  // console.log('Tong tin chi da tich luy', tongTinChiTichLuy);
  // console.log('Tong tin chi khong tich luy', tongTinChiKhongTichLuy);
  const tongSoMon = data.length
  res.json({
    tongSoMon, // Toan bo cac mon da va dang hoc
    tongTinChiAllMonDaQua,
    soMonTichLuyTruot,
    diemTrungBinhMonDaTichLuy: diemTrungBinh,
    tongTinChiDaTichLuy: tongTinChi,
    tongSoMonDaTichLuy: count,
    result: diemTrungBinh * 1.0 / tongTinChi,
  })
}

module.exports = {
  viewHome,

  importData,
  exportDataToJSON,
  getTongTinChi,
  getDiemTrungBinh,
  dropDatabase,
}