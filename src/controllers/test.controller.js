const httpStatus = require('http-status')
const { Subject } = require('../models')
const { arrayToolTest } = require('../utils')
const { ApiError } = require('../utils')

const debugDuplicatedSubject = async (req, res) => {
  const { filter } = req.query
  const subjects = await Subject.find({}).select(filter)
  const testArray = subjects.map(subject => subject[filter])
  res.json({
    message: (arrayToolTest.isUniqueArray(testArray)) ? 'Mảng không lặp' : 'Mảng trùng lặp',
    result: arrayToolTest.dupArray(testArray),
  })
}

const show = (req, res) => {
  res.render('test', {
    title: 'Test',
  })
}

const error = (req, res) => {
  let { err } = req.query
  switch (err) {
    case "0":
      return res.status(200).json({
        message: 'Done',
      })
    case "1":
      return res.status(100).json({
        message: '1',
      })
    case "2":
      return res.status(200).json({
        message: '2',
      })
    case "3":
      return res.status(300).json({
        message: '3',
      })
    case "4":
      return res.status(400).json({
        message: '4',
      })
    case "5":
      return res.status(500).json({
        message: '5',
      })
    default:
      return res.status(500).json({
        message: 'Error default',
      })
  }
}

module.exports = {
  debugDuplicatedSubject,
  show,
  error,
}