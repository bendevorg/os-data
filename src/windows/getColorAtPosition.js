/**
 * Module to retrieve a pixel color at a [x, y] position
 * @module src/getColorAtPosition
*/

const gdi32 = require('./win32/gdi32');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

/**
 * Get the pixel color at the x and y position
 * @param {buffer} windowScreen Window screen reference
 * @param {int} x Point in X axis to get the color.
 * @param {int} y Point in Y axis to get the color.
 * @return {object} An object containing the red, green and blue values.
*/
module.exports = (windowScreen, x, y) => {
  return new Promise((resolve, reject) => {
    if (!windowScreen)
      return reject(constants.error.INVALID_WINDOW);
    if (!validator.isValidInteger(x))
      return reject(constants.error.INVALID_X);
    if (!validator.isValidInteger(y))
      return reject(constants.error.INVALID_Y);
    let pixel = gdi32.GetPixel(windowsScreen, x, y);
    let rgb = {
      red: pixel & 0x000000FF,
      green: (pixel & 0x0000FF00) >> 8,
      blue: (pixel & 0x00FF0000) >> 16
    };
    return rgb;
  });
};
