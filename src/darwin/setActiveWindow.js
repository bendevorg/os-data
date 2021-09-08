/**
 * Module to retrieve an application id by its name
 * @module src/findApplicationId
 */
const exec = require('child_process').exec;

/**
 * Find the application id
 * @param {string} applicationName The app name
 * @return {int} The application id
 */

module.exports = (applicationId) => {
  return new Promise((resolve, reject) => {
    exec(`osascript -e 'tell application "System Events"' -e 'set frontmost of the first process whose unix id is ${applicationId} to true' -e 'end tell'`,
      (error, stoud) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      },
    );
  });
};
