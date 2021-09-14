/**
 * Module to retrieve screenshot
 * @module src/printScreen
 */
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

module.exports = (fileName) => {
  return new Promise((resolve, reject) => {
    const pathName = path.resolve(`./${fileName}`);
    exec
    exec(`screencapture -D 1 ${fileName}`, (error, applicationId) => {
      const buffer = fs.readFileSync(pathName);
      return resolve(buffer);
    });
  });
};