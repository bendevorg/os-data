/**
 * User 32 dll functions import
 * @module win32/user32
*/

const ffi = require('ffi-napi');
const pointers = require('./pointers');

//  Import our operational system info
const user32 = ffi.Library('user32', {
  'GetSystemMetrics': ['int', ['int']],
  'GetCursorPos': ['bool', ['pointer']],
  'GetDC': ['pointer', ['int']],
  'GetWindowDC': ['pointer', ['int']],
  'GetForegroundWindow': ['int', ['void']],
  'FindWindowA': ['int', ['string', 'string']],
  'GetWindowRect': ['bool', ['int', pointers.rectPtr]],
  'GetClientRect': ['bool', ['int', pointers.rectPtr]],
  'ClientToScreen': ['bool', ['int', pointers.pointPtr]],
  'GetWindowTextA': ['int', ['int', pointers.stringPtr, 'int']],
  'SetForegroundWindow': ['int', ['int']],
  'PrintWindow': ['bool', ['int', 'pointer', 'int']],
  'OpenClipboard': ['bool', ['int']],
  'EmptyClipboard': ['bool', ['void']],
  'SetClipboardData': ['pointer', ['int', 'int']],
  'CloseClipboard': ['bool', ['void']],
  'EnumWindows': ['bool', [pointers.voidPtr, 'int']],
});

module.exports = user32;
