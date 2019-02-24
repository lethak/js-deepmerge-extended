//const deepmerge = require('./index')
// const DeepMerger = require('./DeepMerger')
const { AnalyzedItem, DeepMergeAnalyzer } = require('../DeepMergeAnalyzer')
const { x, y, expected_xy } = require('./samples')


const x_string = JSON.stringify(x)

const y_string = JSON.stringify(y)
const expected_xy_string = JSON.stringify(expected_xy)

// const dm = new DeepMerger()
const dma = new DeepMergeAnalyzer()



// const x_analyzed = dma._analyzeItemRecursive(x, 'x')
// const x_analyzed_compacted = dma.compactAnalyzedItemRecursive(x_analyzed)
//
// const y_analyzed = dma._analyzeItemRecursive(y, 'y')
// const y_analyzed_compacted = dma.compactAnalyzedItemRecursive(y_analyzed)

const xy_analyzed = dma.merge(x, y)
const xy_analyzed_compacted = dma.compactAnalyzedItemRecursive(xy_analyzed)

console.log('\n==========================================================\n')

const analyzedItem = new AnalyzedItem()
analyzedItem.value = 'test'
console.log('analyzedItem = ', analyzedItem)
console.log('analyzedItem instanceof AnalyzedItem ? ', analyzedItem instanceof AnalyzedItem)

console.log('\n==========================================================\n')
console.log('\nx = '); console.dir(x, { depth: null })
// console.log('\n===================\nx_analyzed = '); console.dir(x_analyzed, { depth: null })
// console.log('\nx_analyzed_compacted = ');  console.dir(x_analyzed_compacted, { depth: null })
// console.log('\nx_analyzed_compacted === x ? ', (x_string === JSON.stringify(x_analyzed_compacted)))
console.log('\n==========================================================\n')
console.log('\ny = ');  console.dir(y, { depth: null })
// console.log('\ny_analyzed = ');  console.dir(y_analyzed, { depth: null })
// console.log('\n\ny_analyzed_compacted = ');  console.dir(y_analyzed_compacted, { depth: null })
// console.log('\ny_analyzed_compacted === y ? ', (y_string === JSON.stringify(y_analyzed_compacted)))
console.log('\n==========================================================\n')
console.log('\nexpected_xy = ');  console.dir(expected_xy, { depth: null })
console.log('\nxy_analyzed = ');  console.dir(xy_analyzed, { depth: null })
console.log('\nxy_analyzed_compacted = ');  console.dir(xy_analyzed_compacted, { depth: null })
console.log('\nxy_analyzed_compacted === expected_xy ? ', (expected_xy_string === JSON.stringify(xy_analyzed_compacted)))




console.log('\n\nDone.\n')
