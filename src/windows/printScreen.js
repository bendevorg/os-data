/**
 * Module to retrive the screen image buffer
 * @module src/printScreen
*/

const temp = require('temp');
const path = require('path');
const exec = require('child_process').exec;
const fileManager = require('../utils/fileManager');
const constants = require('../utils/constants');

/**
 * Get window`s image buffer
 * @param {int} windowNumber Window id number
 * @param {int} filename Window id number
 * @return {object} Window`s image buffer
*/
module.exports = (windowNumber, filename) => {
  return new Promise((resolve, reject) => {
    if (!windowNumber)
      return reject(constants.error.INVALID_WINDOW);
    const tmpPath = temp.path({ suffix: '.png' });
    const imgPath = path.resolve(filename || tmpPath);
    exec('"' + path.join(__dirname, '/screen_capture/screen_capture.bat') + '" ' + windowNumber + ' ' + imgPath, {
      cwd: __dirname
    }, (err, stdout) => {
      if (err) {
        return reject(err);
      } else {
        if (filename) {
          return resolve(imgPath);
        } else {
          fileManager.readAndUnlinkPath(tmpPath)
            .then(resolve)
            .catch(reject);
        }
      }
    });
  });
};
