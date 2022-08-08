/**
 * Check if an array is unique or not
 * @param {Array<any>} myArray 
 * @returns Boolean
 */
const isUniqueArray = (myArray) => {
  return myArray.length === new Set(myArray).size;
}

const dupArray = (arr) => {
  let dupClearArr = []
  let duplicatedArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) != i && arr.indexOf(arr[i]) != -1) {
      duplicatedArr.push(arr[i])
    } else {
      dupClearArr.push(arr[i])
    }
  }
  return {
    duplicatedArr: duplicatedArr.sort(),
    originalArr: arr.sort(),
    noDuplicatedArr: dupClearArr.sort(),
  }
}

module.exports = {
  isUniqueArray,
  dupArray,
}
