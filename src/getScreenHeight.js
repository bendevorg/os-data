/**
 * Module to retrieve the height of the user`s screen
 * @module src/getScreenHeight
*/

const user32 = require('./win32/user32');

/**
 * Get the user`s screen height
 * @return {int} Screen height in pixels
*/
module.exports = () => {
  return user32.GetSystemMetrics(1);
};
