//const deepmerge = require('./index')
// const DeepMerger = require('./DeepMerger')
const DeepMergeExtended = require('./DeepMergeExtended')

const x = [{
    does: 'work',
    too: [ 1, 2, 3 ]
  }]
// const x = {
//   foo: { bar: 3, baz: 4 },
//   array: [{
//     does: 'work',
//     too: [ 1, 2, 3 ]
//   }],
//   foin: true,
// }
const y = {
  foo: { baz:5, bat: 6 },
  quux: 5,
  array: [{
    does: 'work',
    too: [ 4, 5, 6 ]
  }, {
    really: 'yes'
  }],
  foin: 1337,
}

// const dm = new DeepMerger()
const dme = new DeepMergeExtended()


// const merge1 = deepmerge(x, y)
// const merge2 = deepmerge({}, [])
// const merge3 = dm.merge(x, y)

console.log('x = ', x)
console.log('y = ', y)
// console.log('merge1 = ', merge1)
// console.log('merge2 = ', merge2)
// console.log('merge3 = ', merge3)
// console.log('\nanalyze = ', dm.analyze)

const xx = dme._analyzeItemRecursive(x, 'x')
const yy = dme._analyzeItemRecursive(y, 'y')
const xx_compact = dme._compactAnalyzedItemRecursive(xx)
const yy_compact = dme._compactAnalyzedItemRecursive(yy)
console.log('xx = ', xx)
console.log('yy = ', yy)
console.log('xx_compact = ', xx_compact)
console.log('yy_compact = ', yy_compact)


console.log('Done.')
