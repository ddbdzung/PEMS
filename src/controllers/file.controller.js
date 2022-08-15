const httpStatus = require('http-status')
const XLSX = require("xlsx");
const { catchAsync } = require("../utils");
const { subjectService } = require('../services')

const keyObject = {
  maHP: 'Mã học phần',
  maIn: 'Mã in',
  tenHP: 'Tên học phần',
  hocKy: 'Học kỳ',
  soTinChi: 'Số tín chỉ',
  tbKtraTX: 'TB Ktra thường xuyên',
  diemThi: 'Điểm thi',
  diemTB: 'Điểm TB',
  duocTinhTichLuy: 'Tích lũy',
}
const fixWidth = (worksheet) => {
  const data = XLSX.utils.sheet_to_json(worksheet)
  const colLengths = Object.keys(data[0]).map((k) => new String(k).length)
  for (const d of data) {
    Object.values(d).forEach((element, index) => {
      const length = new String(element).length
      if (colLengths[index] < length) {
        colLengths[index] = length
      }
    })
  }
  worksheet["!cols"] = colLengths.map((l) => {
    return {
      wch: l,
    }
  })
}
function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

const exportDataToExcelInServerSide = catchAsync(async (req, res) => {
  let data = await subjectService.getAllSubjects()
  data = data.map(item => {
    delete item._id
    delete item.createdAt
    delete item.updatedAt
    delete item.__v
    item.duocTinhTichLuy = (item.duocTinhTichLuy === true) ? 'Có' : 'Không'
    return renameKeys(item, keyObject)
  })

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(data,
    {
      origin: 'A2',
      type: 'tring',
    })
  XLSX.utils.sheet_add_json(ws, [{
    A: 'BẢNG ĐIỂM',
  }], {
    skipHeader: true,
    origin: { r: 0, c: 3 },
  })
  const sheetName = 'Sheet 1'
  const ExportFile = 'Data.xlsx'
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  ws = fixWidth(ws)
  XLSX.writeFile(wb, ExportFile)
  res.status(httpStatus.OK).send({
    code: httpStatus.OK,
    message: 'Export successfully!',
  })
})

const exportExcelInClientSide = catchAsync(async (req, res) => {
  let data = await subjectService.getAllSubjects()
  Object.assign(data, data.map(subject => {
    subject.diemChu = subjectService.getAlphabeticalScore(subject)
    return subject
  }))
  res.status(httpStatus.OK).send({
    code: httpStatus.OK,
    data,
  })
})

module.exports = {
  exportExcelInClientSide,
  exportDataToExcelInServerSide,
}