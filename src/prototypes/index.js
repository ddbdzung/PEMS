const _findAndRemove = require('./findAndRemove')
const _distinct = require('./distinct')
const _getIndexes = require('./getIndexes')
const _limit = require('./limit')
const _skip = require('./skip')

const implementPrototypes = () => {
  _findAndRemove()
  _distinct()
  _getIndexes()
  _limit()
  _skip()
}

module.exports = implementPrototypes
