/**
 * Module to retrieve a window position by its id
 * @module src/getWindowPosition
*/

const user32 = require('./win32/user32');
const pointers = require('./win32/pointers');

/**
 * Get window position in pixels
 * @access public
 * @param {int} windowNumber Window id number
 * @return {object} Window position
*/
module.exports = windowNumber => {
  let window = new pointers.Rect();
  let point = new pointers.Point();
  user32.GetClientRect(windowNumber, window.ref());
  user32.ClientToScreen(windowNumber, point.ref());

  let windowPosition = {
    top: point.Top,
    left: point.Left,
    bottom: point.Top + (window.Bottom - window.Top) + 1,
    right: point.Left + (window.Right - window.Left) + 1
  };

  return windowPosition;
};
