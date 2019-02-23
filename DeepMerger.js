const isMergeableObject = require('is-mergeable-object')


const DeepMerger = function () {
  const analyze = {}
  Object.defineProperty(this, 'analyze', {
    get: function () {
      return analyze
    },
    set: function (val) {},
  })

  const emptyTarget = (val) => {
    console.warn('!!!! emptyTarget !!!!', val)
    return Array.isArray(val) ? [] : {}
  }

  const mergeArray = (target, source) => {
    console.warn('====mergeArray==== ')
    let destination = {}
    target.forEach((key) => {
      console.log('---- (isMergeableObject target) key : ', key)
      destination[key] = cloneUnlessOtherwiseSpecified(target[key])
    })
    // return target.concat(source).map((element) => {
    //   return cloneUnlessOtherwiseSpecified(element)
    // })
  }

  const mergeObject = (target, source) => {
    console.warn('====mergeObject====')
    let destination = {}
    if (isMergeableObject(target)) {
      Object.keys(target).forEach((key) => {
        console.log('---- (isMergeableObject target) key : ', key)
        destination[key] = cloneUnlessOtherwiseSpecified(target[key])
      })
    }
    Object.keys(source).forEach((key) => {
      if (!isMergeableObject(source[key]) || !target[key]) {
        console.log('---- (!isMergeableObject source || !target[key] ) key : ', key)
        destination[key] = cloneUnlessOtherwiseSpecified(source[key])
      } else {
        console.log('---- key : ', key)
        destination[key] = this.merge(target[key], source[key])
      }
    })
    return destination
  }

  const cloneUnlessOtherwiseSpecified = (value) => {
    console.warn('====cloneUnlessOtherwiseSpecified====')
    if (isMergeableObject(value)) {
      console.warn('- isMergeableObject value')
      return this.merge(emptyTarget(value), value)
    } else {
      console.log('---- value : ', value)
      return value
    }
  }

  this.merge = (target, source) => {
    console.warn('====merge====')
    const sourceIsArray = Array.isArray(source)
    const targetIsArray = Array.isArray(target)
    const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source)
    } else if (sourceIsArray) {
      return mergeArray(target, source)
    } else {
      return mergeObject(target, source)
    }
  }


  /**
   * Constructor...
   */
  (() => {
    console.log('== new DeepMerger ==')
  })()
}


module.exports = DeepMerger
