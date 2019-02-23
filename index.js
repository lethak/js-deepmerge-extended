const isMergeableObject = require('is-mergeable-object')

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value) {
  console.warn('====cloneUnlessOtherwiseSpecified==== value:', value)
  if (isMergeableObject(value)) {
    return deepmerge(emptyTarget(value), value)
  } else {
    return value
  }
}

function mergeArray(target, source) {
  console.warn('====defaultArrayMerge==== ')
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element)
  })
}


function mergeObject(target, source) {
  console.warn('====mergeObject====')
  let destination = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function(key) {
      console.log('---- key : ', key)
      destination[key] = cloneUnlessOtherwiseSpecified(target[key])
    })
  }
  Object.keys(source).forEach(function(key) {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key])
    } else {
      destination[key] = deepmerge(target[key], source[key])
    }
  })
  return destination
}

function deepmerge(target, source) {
  console.warn('====deepmerge====')

  let sourceIsArray = Array.isArray(source)
  let targetIsArray = Array.isArray(target)
  let sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source)
  } else if (sourceIsArray) {
    return mergeArray(target, source)
  } else {
    return mergeObject(target, source)
  }
}

deepmerge.all = function deepmergeAll(array) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array')
  }

  return array.reduce(function(prev, next) {
    return deepmerge(prev, next)
  }, {})
}

module.exports = deepmerge
