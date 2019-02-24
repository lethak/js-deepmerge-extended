const array_1 = [1, 2, 3]
const array_2 = [4, 5, 6]
const array_3 = [6, 6, 7]
const obj_1 = { foo: 'bar '}
const obj_2 = { baz: 'bat'}
const obj_3 = { schi: 'fumi'}
const obj_4 = { sbrada: 'radjan'}
const obj_5 = { baz: 'biz'}

const x = {
  arg: 'gleuh',
  foo: { bar: 3, baz: 4 },
  array: [{
    does: 'work',
    too: [ 1, 2, 3 ]
  }],
  foin: true,
  taz: 'mania',
  undo: 'something',
}

const y = {
  foo: { baz:5, bat: 6 },
  array: [{
    does: 'work',
    too: [ 4, 5, 6 ]
  }, {
    really: 'yes'
  }],
  foin: 1337,
  taz: null,
  undo: undefined,
  quux: 5,
}

const expected_xy =  {
  arg: 'gleuh',
  foo: { bar: 3, baz: 5, bat: 6 },
  array: [
    {
      does: 'work',
      too: [ 1, 2, 3 ]
    },
    {
      does: 'work',
      too: [ 4, 5, 6 ]
    },
    {
      really: 'yes',
    },
  ],
  foin: 1337,
  taz: null,
  quux: 5,
}


module.exports = {
  x,
  y,
  expected_xy,

  array_1,
  array_2,
  array_3,
  obj_1,
  obj_2,
  obj_3,
  obj_4,
  obj_5,
}
