const { Subject } = require('../models')
const { arrayToolTest } = require('../utils')

const debugDuplicatedSubject = async (req, res) => {
  const { filter } = req.query
  const subjects = await Subject.find({}).select(filter)
  const testArray = subjects.map(subject => subject[filter])
  res.json({
    message: (arrayToolTest.isUniqueArray(testArray)) ? 'Mảng không lặp' : 'Mảng trùng lặp',
    result: arrayToolTest.dupArray(testArray),
  })
}

module.exports = {
  debugDuplicatedSubject,
}