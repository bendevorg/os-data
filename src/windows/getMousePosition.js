/**
 * Module to retrieve user`s mouse position
 * @module src/getMousePosition
*/

const user32 = require('./win32/user32');

/**
 * Get the actual mouse position in the screen
 * @return {object} An object containing the x and y position in pixels.
*/
module.exports = () => {
  return new Promise((resolve, reject) => {
    let mouseBuffer = new Buffer(16);
    user32.GetCursorPos(mouseBuffer);

    let mousePosition = {
      x: mouseBuffer[0] + (mouseBuffer[1] * 256),
      y: mouseBuffer[4] + (mouseBuffer[5] * 256)
    };

    return resolve(mousePosition);
  });
};
