/**
 * Module to retrieve the user`s active screen
 * @module src/getActiveScreen
*/

const user32 = require('./win32/user32');

/**
 * Get active screen
 * @return {int} Active screen number
*/
module.exports = () => {
  return user32.GetForegroundWindow(null);
};
