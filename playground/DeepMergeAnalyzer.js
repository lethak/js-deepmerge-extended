const isMergeableObjectUtil = require('is-mergeable-object')
// const isScalarUtil = function (item) {
//   return (!Array.isArray(item) && !isMergeableObjectUtil(item))
// }

const AnalyzedItem = function () {
  this._isAnalyzed = true
  this.sourceChain = [] // new SourceChain()
}

const SourceChainLink = function (source/*, value*/) {
  this.source = source
  // this.hasValue = false
  // let value = undefined
  // Object.defineProperty(this, 'value', {
  //   get: () => {
  //     return value
  //   },
  //   set: (v) => {
  //     value = v
  //     this.hasValue = true
  //   },
  // })
  // this.value = value
}

class SourceChain {
  constructor () {
    this.chain = []
  }

  add (source/*, itemValue*/) {
    // let value = itemValue
    // if (isMergeableObjectUtil(itemValue)) {
    //   value = Object.assign({}, itemValue) // clone
    // } else if (Array.isArray(itemValue)) {
    //   value = itemValue.slice() // clone
    // }
    this.chain.push(new SourceChainLink(source/*, value*/))
    return this
  }
  merge (sourceChain) {
    if (sourceChain instanceof SourceChain) {
      sourceChain.chain.forEach((chainLink) => {
        if (chainLink instanceof SourceChainLink) {
          this.chain.push(chainLink)
        }
      })
    }
    return this
  }

}


const clone = (val) => {
  if (val instanceof AnalyzedItem) {
    let res = Object.assign(new AnalyzedItem(), val)
    res.value = clone(val.value)
    return res
  }
  else if (Array.isArray(val)) {
    return val.slice()
  } else if (isMergeableObjectUtil(val)) {
    return Object.assign({}, val)
  }
  return val
}

const DeepMergeAnalyzer = function () {
  /**
   * (Shallow) Analyze a single item and returns the analysis
   * @param item
   * @param source
   * @param index
   * @returns {{source: *, sourceChain: *[], index: *, typeof: string, isArray: boolean, isMergeableObject: *, isScalar: boolean, value: *}}
   * @private
   */
  this._analyzeItem = (item, source = null, index = null) => {
    const isArray = Array.isArray(item)
    const isMergeableObject = isMergeableObjectUtil(item)
    const isScalar = (!isArray && !isMergeableObject)
    return Object.assign(new AnalyzedItem(), {
      isAnalyzedItem: item instanceof AnalyzedItem,
      source,
      sourceChain: (new SourceChain()).add(source/*, item*/),
      // sourceChain: [ source ],
      mergeCount: 0,
      index,
      typeof: typeof item,
      isArray,
      isMergeableObject,
      isScalar,
      value : clone(item),
    })
  }

  this._refreshAnalyzedItem = (analyzedItem) => {
    if (analyzedItem instanceof AnalyzedItem) {
      const isArray = Array.isArray(analyzedItem.value)
      const isMergeableObject = isMergeableObjectUtil(analyzedItem.value)
      const isScalar = (!isArray && !isMergeableObject)
      Object.assign(analyzedItem, {
        isAnalyzedItem: analyzedItem.value instanceof AnalyzedItem,
        typeof: typeof analyzedItem.value,
        isArray,
        isMergeableObject,
        isScalar,
      })
    }
    return this
  }

  this._emptyAnalyzedItem = (analyzedItem) => {
    let _an = clone(analyzedItem)
    if (analyzedItem.isArray) {
      _an.value = []
    } else if (analyzedItem.isMergeableObject) {
      _an.value = {}
    }
    this._refreshAnalyzedItem(_an)
    return _an
  }

  /**
   * (Shallow) Compact an analyzed item down to its value only.
   * Inverse of _analyzeItem
   * @param analyzedItem
   * @returns {*}
   * @private
   */
  this._compactAnalyzedItem = (analyzedItem) => {
    return (analyzedItem instanceof AnalyzedItem) ? analyzedItem.value : analyzedItem
  }

  /**
   * (Deep) Recursively analyze an item.
   * @param item
   * @param source
   * @param index
   * @returns {{source: *, index: *, typeof: string, isArray: boolean, isMergeableObject: *, isScalar: boolean, value: *}}
   * @private
   */
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

  /**
   * (Deep) Recursively compact an analyzed item down to its values only.
   * Inverse of _analyzeItemRecursive
   * @param _item
   * @returns {*}
   * @private
   */
  this.compactAnalyzedItemRecursive = (_item) => {
    let value = this._compactAnalyzedItem(_item)
    if (_item.isArray) {
      value = []
      _item.value.forEach((arrValue, i) => {
        value.push(this.compactAnalyzedItemRecursive(arrValue))
      })
    } else if (_item.isMergeableObject) {
      value = {}
      Object.keys(_item.value).forEach((objValueKey) => {
        value[objValueKey] = this.compactAnalyzedItemRecursive(_item.value[objValueKey])
      })
    }
    return value
  }

  this.merge = (itemA, itemB, sourceA = 'A', sourceB = 'B') => {
    let _itemA = clone(itemA)
    if (!(itemA instanceof AnalyzedItem)) {
      _itemA = this._analyzeItemRecursive(_itemA, sourceA)
    }

    let _itemB = clone(itemB)
    if (!(itemB instanceof AnalyzedItem)) {
      _itemB = this._analyzeItemRecursive(_itemB, sourceB)
    }

    return this._mergeAnalyzedItems(_itemA, _itemB)
  }

  this._mergeAnalyzedItems = (itemA, itemB) => {
    const areBothArray = (true === itemA.isArray && true === itemB.isArray)
    const areBothMergeableObjects = (true === itemA.isMergeableObject && true === itemB.isMergeableObject)
    if (areBothArray) {
      return this._mergeAnalyzedArray(itemA, itemB)
    } else if (areBothMergeableObjects) {
      return this._mergeAnalyzedObject(itemA, itemB)
    } else {
      return this._mergeAnalyzedScalar(itemA, itemB)
    }
  }

  this._mergeAnalyzedScalar = (itemA, itemB) => {
    const result = clone(itemA)
    result.source = clone(itemB.source)
    if (result.mergeCount > 0) {
      result.sourceChain.add(result.source)
    }
    result.mergeCount++
    result.value = clone(itemB.value)
    this._refreshAnalyzedItem(result)
    return result
  }

  this._mergeAnalyzedArray = (itemA, itemB) => {
    const result = clone(itemA)
      itemB.value.forEach((v, i) => {
        result.value.push(clone(v))
      })
    if (itemB.value.length > 0) {
      result.source = clone(itemB.source)
      result.sourceChain.merge(itemB.sourceChain)
      result.mergeCount++
    }
    return result
  }

  this._mergeAnalyzedObject = (itemA, itemB) => {
    const result = clone(itemA)
    const keys = Object.keys(itemB.value)
    keys.forEach((itemBValueObjKey) => {
      let v = itemB.value[itemBValueObjKey]
      if (typeof result.value[itemBValueObjKey] !== 'undefined') {
        result.value[itemBValueObjKey] = this._mergeAnalyzedItems(result.value[itemBValueObjKey], v)
      } else {
        result.value[itemBValueObjKey] = this._mergeAnalyzedItems(this._emptyAnalyzedItem(v), v)
      }
    })
    if (Object.keys(result.value).length > 0) {
      result.source = clone(itemB.source)
      result.sourceChain.merge(itemB.sourceChain)
      result.mergeCount++
    }
    this._refreshAnalyzedItem(result)
    return result
  }

  /**
   * Constructor...
   */
  // (() => {
  // })()
}


module.exports = {
  DeepMergeAnalyzer,
  AnalyzedItem,
  SourceChain,
  SourceChainLink,
  clone,
}
