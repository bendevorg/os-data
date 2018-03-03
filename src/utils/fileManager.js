/**
 * Module to manipulate files paths
 * @module utils/fileManager
*/

const fs = require('fs');

/**
 * Unlink path from disk
 * @param {path} path File's path
 * @return {null}
*/
function unlinkPath(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, function(err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

/**
 * Read path from disk
 * @param {path} path File's path
 * @return {buffer} File's content
*/
function readFilePath(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, file) {
      if(err) {
        return reject(err)
      }
      resolve(file)
    })
  })
}

/**
 * Read and unlink path from disk
 * @param {path} path File's path
 * @return {buffer} File's content
*/
function readAndUnlinkPath(path) {
  return new Promise((resolve, reject) => {
    readFilePath(path)
      .then(file => {
        unlinkPath(path)
          .then(() => resolve(file))
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports = {
  unlinkPath: unlinkPath,
  readFilePath: readFilePath,
  readAndUnlinkPath: readAndUnlinkPath
};
