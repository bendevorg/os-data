/**
 * Module to retrieve an application id by its name
 * @module src/findApplicationId
*/

const user32 = require('./win32/user32');
const validator = require('./utils/validator');
const constants = require('./utils/constants');

/**
 * Find the application id
 * @param {string} applicationName The app name
 * @return {int} The application id
*/
module.exports = applicationName => {
  return new Promise((resolve, reject) => {
    if (!validator.validator(applicationName))
      return reject(constants.error.INVALID_APPLICATION_NAME);
    return resolve(user32.FindWindowA(null, applicationName));
  });
};
