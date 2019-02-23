const isMergeableObjectUtil = require('is-mergeable-object')

const DeepMergeExtended = function () {

  this._analyzeItem = (item, source = null, index = null) => {
    const isArray = Array.isArray(item)
    const isMergeableObject = isMergeableObjectUtil(item)
    return {
      source,
      index,
      typeof: typeof item,
      isArray,
      isMergeableObject,
      isScalar: (!isArray && !isMergeableObject),
      value : item,
    }
  }
  this._compactAnalyzedItem = ({value}) => {
    return value
  }

  this._analyzeItemRecursive = (item, source = null, index = null) => {
    const _item = this._analyzeItem(item, source, index)
    if (_item.isArray) {
      _item.value.forEach((arrValue, i) => {
        _item.value[i] = this._analyzeItemRecursive(arrValue, source, i)
      })
    } else if (_item.isMergeableObject) {
      Object.keys(_item.value).forEach((objValueKey) => {
        _item.value[objValueKey] = this._analyzeItemRecursive(_item.value[objValueKey], source, objValueKey)
      })
    }
    return _item
  }

  this._compactAnalyzedItemRecursive = (_item) => {
    let value = this._compactAnalyzedItem(_item)
    if (_item.isArray) {
      value = []
      _item.value.forEach((arrValue, i) => {
        value.push(this._compactAnalyzedItemRecursive(arrValue))
      })
    } else if (_item.isMergeableObject) {
      value = {}
      Object.keys(_item.value).forEach((objValueKey) => {
        value[objValueKey] = this._compactAnalyzedItemRecursive(_item.value[objValueKey])
      })
    }
    return value
  }

  // this.merge = (itemA, itemB, sourceA = 'A', sourceB = 'B') => {
  //   const _itemA = this._analyzeItemRecursive(itemA, sourceA)
  //   const _itemB = this._analyzeItemRecursive(itemB, sourceB)
  //   //TODO
  //   // return this._mergeAnalyzed(_itemA, _itemB, sourceA, sourceB)
  // }
  //
  // this._mergeAnalyzed = (itemA, itemB, sourceA = 'A', sourceB = 'B') => {
  //   const areBothScalar = (itemA.isScalar === itemB.isScalar)
  //   const areBothArray = (itemA.isArray === itemB.isArray)
  //   if (!areBothArray) {
  //   } else if (_itemA.isMergeableObject) {
  //   }
  // }
  // this._mergeAnalyzedRecursive = () => {
  //   //TODO
  // }

  /**
   * Constructor...
   */
  (() => {
    console.log('== new DeepMergeExtended ==')
  })()
}


module.exports = DeepMergeExtended
