/**
 * Module to set a window to be active
 * @module src/setActiveWindow
*/

const user32 = require('./win32/user32');
const constants = require('../utils/constants');

/**
 * Activate window
 * @param {string} windowNumber The window id number
 * @return {null}
*/
module.exports = windowNumber => {
  return new Promise((resolve, reject) => {
    if (!windowNumber)
      return reject(constants.error.INVALID_WINDOW);
    return resolve(user32.SetForegroundWindow(windowNumber));
  });
};
