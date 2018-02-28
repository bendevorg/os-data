/**
 * Module to retrive the screen image buffer
 * @module src/printScreen
*/

const gdi32 = require('./win32/gdi32');
const screenshot = require('screenshot-desktop');
const getPixels = require('get-pixels');

/**
 * Get window`s image buffer
 * @param {int} windowNumber Window id number
 * @return {object} Window`s image buffer
*/
module.exports = windowNumber => {
  /**let screenCopy = gdi.CreateCompatibleDC(this.getApplicationScreen());
  let bitmapScreen = gdi.CreateCompatibleBitmap(screenCopy, 1920, 1080);
  gdi.SelectObject(screenCopy, bitmapScreen);
  gdi.BitBlt(screenCopy, 0, 0, 1920, 1080, this.getApplicationScreen(), 1, 1, 4096);
  let fs = require('fs');
  fs.writeFile('test.png', screenCopy, (err, res) => {
    if (err)
      console.log(err);
    
  });
  console.time('Full');
  console.time('Print');
  screenshot()
    .then(img => {
      console.timeEnd('Print');
      console.time('Analyze');
      getPixels(img, 'image/jpeg', (err, pixels) => {
        console.timeEnd('Analyze');
        console.timeEnd('Full');
        console.log(pixels);
      })
    });
    **/
    screenshot.listDisplays()
    .then((displays) => {
      console.log(displays);
    });
  return;
};
