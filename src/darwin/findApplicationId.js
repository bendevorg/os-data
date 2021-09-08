/**
 * Module to retrieve an application id by its name
 * @module src/findApplicationId
 */
const exec = require('child_process').exec;
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
     exec(`pgrep -x ${applicationName}`, (error, applicationId) => {
        if (error) {
          return reject(error);
        }
        applicationId = applicationId.replace(/\n/gm, '');
        return resolve(applicationId);
     });
   });
 };
 