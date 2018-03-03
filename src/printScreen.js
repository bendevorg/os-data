/**
 * Module to retrive the screen image buffer
 * @module src/printScreen
*/

const temp = require('temp');
const path = require('path');
const exec = require('child_process').exec;
const fileManager = require('./utils/fileManager');
const getPixels = require('get-pixels');

/**
 * Get window`s image buffer
 * @param {int} windowNumber Window id number
 * @return {object} Window`s image buffer
*/
module.exports = (windowNumber, filename) => {
  return new Promise((resolve, reject) => {

    const tmpPath = temp.path({ suffix: '.jpg' });
    const imgPath = path.resolve(filename || tmpPath);

    exec('"' + path.join(__dirname, 'captureScreen.bat') + '" ' + windowNumber + ' ' + imgPath, {
      cwd: __dirname
    }, (err, stdout) => {
      if (err) {
        return reject(err)
      } else {
        if (filename) {
          resolve(imgPath)
        } else {
          fileManager.readAndUnlinkPath(tmpPath)
            .then(resolve)
            .catch(reject)
        }
      }
    })
  });
};
