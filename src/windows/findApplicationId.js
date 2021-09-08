/**
 * Module to retrieve an application id by its name
 * @module src/findApplicationId
 */
const ffi = require("ffi-napi");
const ref = require("ref-napi");
const user32 = require("./win32/user32");
const validator = require("../utils/validator");
const constants = require("../utils/constants");

/**
 * Find the application id
 * @param {string} applicationName The app name
 * @return {int} The application id
 */

module.exports = (applicationName) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidString(applicationName))
      return reject(constants.error.INVALID_APPLICATION_NAME);
    let id = user32.FindWindowA(null, applicationName);
    if (id === 0) {
      // If the window's title is non ASCII we need to find it by listing all windows
      user32.EnumWindows(
        ffi.Callback("bool", ["long", "int"], (handle, lParam) => {
          const buffer = new Buffer(255);
          user32.GetWindowTextA(handle, buffer, 255);
          const name = ref.readCString(buffer, 0);
          if (name === applicationName) {
            id = handle;
          }
          return true;
        }),
        0
      );
    }
    return resolve(id);
  });
};
