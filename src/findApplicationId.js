/**
 * Module to retrieve an application id by its name
 * @module src/findApplicationId
*/

const user32 = require('./win32/user32');

/**
 * Find the application id
 * @access public
 * @param {string} applicationName The app name
 * @return {int} The application id
*/
module.exports = () => {
  return user32.FindWindowA(null, applicationName);
};
