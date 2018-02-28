/*!
 * os-info
 * Copyright(c) 2018-2019 Guilherme Conti Teixeira
 * MIT Licensed
*/

let os = {};
const featuresPath = process.cwd() + '/src/';
const fs = require('fs');

fs.readdirSync(featuresPath).forEach(file => {
  if (file.indexOf('.js') !== -1){
    os[file.split('.')[0]] = require(featuresPath + file);
  }
});

module.exports = os;

console.log(os);
