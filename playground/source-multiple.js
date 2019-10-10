const { AnalyzedItem, DeepMergeAnalyzer } = require('./DeepMergeAnalyzer')
const { obj_1, obj_2, obj_3, obj_4, obj_5 } = require('./_common/samples')

const deepMergeAnalyzer = new DeepMergeAnalyzer()
const depth = { depth: null }

// const toMerge = [ obj_1, obj_2, obj_3, obj_4, obj_5 ]
//
// let merge = undefined
// toMerge.forEach((itemToMerge, i) => {
//   merge = deepMergeAnalyzer.merge(obj_1, obj_2, 'obj_1', 'obj_2')
// })

const merge_1 = deepMergeAnalyzer.merge(obj_1, obj_2, 'obj_1', 'obj_2')
const merge_2 = deepMergeAnalyzer.merge(merge_1, obj_3, null, 'obj_3')
const merge_3 = deepMergeAnalyzer.merge(merge_2, obj_4, null, 'obj_4')
const merge_4 = deepMergeAnalyzer.merge(merge_3, obj_5, null, 'obj_5')
const result = deepMergeAnalyzer.compactAnalyzedItemRecursive(merge_4)

console.log('\n==========================================================\n')
console.log('\nobj_1 = ');  console.dir(obj_1, depth)
console.log('\nobj_2 = ');  console.dir(obj_2, depth)
console.log('\nobj_3 = ');  console.dir(obj_3, depth)
console.log('\n==========================================================\n')
console.log('\nmerge_1 = ');  console.dir(merge_1, depth)
console.log('\n==========================================================\n')
console.log('\nmerge_2 = ');  console.dir(merge_2, depth)
console.log('\n==========================================================\n')
console.log('\nmerge_3 = ');  console.dir(merge_3, depth)
console.log('\n==========================================================\n')
console.log('\nmerge_4 = ');  console.dir(merge_4, depth)
console.log('\n==========================================================\n')
console.log('\nresult = ');  console.dir(result, depth)




console.log('\n\nDone.\n')
