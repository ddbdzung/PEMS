const _distinct = () => {
  Array.prototype.distinct = function (selector) {
    if (selector === 'undefined') {
      return [...new Set(this)];
    }

    if (typeof (selector) !== 'function') {
      throw new Error(`Expecting selector to be a function, but received ${typeof (selector)} instead.`)
    }

    let found = new Set()
    return this.filter(element => {
      if (found.has(selector(element))) {
        return false
      } else {
        found.add(selector(element))
        return true
      }
    })
  }
}

module.exports = _distinct

// Input:
/*
const array = [1, 1, 1, 3, 3, 2, 2]
console.log(array.distinct())
*/
// Output:
/*
[1, 3, 2]
*/
