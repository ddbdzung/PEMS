const { Subject } = require('../models')

const getAlphabeticalScore = (subject) => {
  const averageScore = subject.diemTB
  if (!averageScore) {
    return "X"
  }
  if (averageScore >= 8.5) {
    return "A"
  } else if (averageScore < 8.5 && averageScore >= 7.7) {
    return "B+"
  } else if (averageScore < 7.7 && averageScore >= 7.0) {
    return "B"
  }  else if (averageScore < 7.0 && averageScore >= 6.2) {
    return "C+"
  }  else if (averageScore < 6.2 && averageScore >= 5.5) {
    return "C"
  }  else if (averageScore < 5.5 && averageScore >= 4.7) {
    return "D+"
  }  else if (averageScore < 4.7 && averageScore >= 4.0) {
    return "D"
  } else if (averageScore < 4.0) {
    return "F"
  }
}

const getValueScore = (alphabeticalScore) => {
  switch (alphabeticalScore) {
    case "A":
      return 4
    case "B+":
      return 3.5
    case "B":
      return 3
    case "C+":
      return 2.5
    case "C":
      return 2
    case "D+":
      return 1.5
    case "D":
      return 1
    case "F":
      return 0
    default:
      return 0
  }
}

const getSubjectById = async (id) => {
  const subject = await Subject.findById(id)
  let data = {}
  Object.assign(data, subject)
  data._doc.diemChu = getAlphabeticalScore(subject)
  delete data._doc._id
  delete data._doc.createdAt
  delete data._doc.updatedAt
  delete data._doc.__v
  return data._doc
}

module.exports = {
  getAlphabeticalScore,
  getValueScore,
  getSubjectById,
}