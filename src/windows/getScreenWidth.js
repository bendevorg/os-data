/**
 * Module to retrieve the width of the user`s screen
 * @module src/getScreenWidth
*/

const user32 = require('./win32/user32');

/**
 * Get the user`s screen width
 * @return {int} Screen width in pixels
*/
module.exports = () => {
  return new Promise((resolve, reject) => {
    return resolve(user32.GetSystemMetrics(0));
  });
};


