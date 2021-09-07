/**
 * GDI 32 dll functions import
 * @module win32/gdi32
*/

const ffi = require('ffi-napi');
const pointers = require('./pointers');

const gdi32 = ffi.Library('gdi32', {
  'GetPixel': ['int', [pointers.intPtr, 'int', 'int']],
  'CreateCompatibleDC': ['pointer', ['pointer']],
  'CreateCompatibleBitmap': ['pointer', ['pointer', 'int', 'int']],
  'SelectObject': ['pointer', ['pointer', 'pointer']],
  'BitBlt': ['int', ['pointer', 'int', 'int', 'int', 'int', 'pointer', 'int', 'int', 'int']]
});

module.exports = gdi32;
