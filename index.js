/*!
 * os-data
 * Copyright(c) 2018-2019 Guilherme Conti Teixeira
 * MIT Licensed
*/

const path = require('path');
const fs = require('fs');

let os = {};
const featuresPath = path.join(__dirname, '/src/');

fs.readdirSync(featuresPath).forEach(file => {
  if (file.indexOf('.js') !== -1){
    os[file.split('.')[0]] = require(featuresPath + file);
  }
});

module.exports = os;
