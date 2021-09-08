/**
 * Windows pointers structs
 * @module win32/pointers
*/

const ref = require('ref-napi');
const Struct = require('ref-struct-napi');

const voidPtr = ref.refType(ref.types.void);
const stringPtr = ref.refType(ref.types.CString);
const intPtr = ref.refType(ref.types.int);

const Rect = Struct({
  'Left': 'int',
  'Top': 'int',
  'Right': 'int',
  'Bottom': 'int'
});

const rectPtr = ref.refType(Rect);

const Point = Struct({
  'Left': 'int',
  'Top': 'int',
  'Right': 'int',
  'Bottom': 'int'
});

const pointPtr = ref.refType(Point);

module.exports = {
  Rect: Rect,
  Point: Point,
  voidPtr: voidPtr,
  stringPtr: stringPtr,
  intPtr: intPtr,
  rectPtr: rectPtr,
  pointPtr: pointPtr
};
