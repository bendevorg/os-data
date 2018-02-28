
const rgbHex = require('rgb-hex');

const screenshot = require('screenshot-desktop');
const getPixels = require('get-pixels');

const user32 = require('./win32/user32');
const gdi32 = require('./win32/gdi32');


const SCREEN_WIDTH = user.GetSystemMetrics(0);
const SCREEN_HEIGHT = user.GetSystemMetrics(1);
let applicationId;
let applicationScreen;

/**
 * Mouse and Keyboard input constructor
 * @class
 * @example
 * let inputController = new InputController();
*/
class OS {

  /**
   * Nothing is needed to construct the class
  */
  constructor() {
  }

  /**
   * Get the user`s screen width
   * @access public
   * @return {int} Screen width in pixels
  */
  getScreenWidth(){
    return SCREEN_WIDTH;
  }

  /**
   * Get the user`s screen height
   * @access public
   * @return {int} Screen height in pixels
  */
  getScreenHeight(){
    return SCREEN_HEIGHT;
  }

  /**
   * Get active screen
   * @access public
   * @return {int} Active screen number
  */
  getActiveScreen(){
    return user.GetForegroundWindow(null);
  }

  /**
   * Get active screen
   * @access public
   * @return {int} Active screen number
  */
  setApplication(applicationName){
    this.applicationId = this.findApplicationId(applicationName);
    this.applicationScreen = user.GetDC(this.applicationId);
  }

  /**
   * Find the application id
   * @access public
   * @param {string} applicationName The app name
   * @return {int} The application id
  */
  findApplicationId(applicationName){
    return user.FindWindowA(null, applicationName);
  }

  /**getApplicationScreen
   * Find the application id
   * @access public
   * @return {int} The application id
  */
  getApplicationId(){
    return this.applicationId;
  }

  /**
   * Get the application screen
   * @access public
   * @return {buffer} The application screen
  */
  getApplicationScreen(){
    return this.applicationScreen;
  }

  /**
   * Get window name
   * @access public
   * @return {string} Window name
  */
  getWindowName(windowNumber){
    let buffer = new Buffer(255);
    user.GetWindowTextA(windowNumber, buffer, 255);
    let windowName = ref.readCString(buffer, 0);
    return windowName;
  }

   /**
   * Get window size in pixels
   * @access public
   * @return {object} Window size
  */
  getScreenPosition(screenNumber){
    let window = new Rect();
    let point = new Point();
    user.GetClientRect(screenNumber, window.ref());
    user.ClientToScreen(screenNumber, point.ref());

    let gameScreen = {
      top: point.Top,
      left: point.Left,
      bottom: point.Top + (window.Bottom - window.Top) + 1,
      right: point.Left + (window.Right - window.Left) + 1
    };

    return gameScreen;
  }

  /**
   * Get the actual mouse position int he screen
   * @access public
   * @return {object} An object containing the x and y position in pixels.
  */
  getMousePosition(){
    let mouseBuffer = new Buffer(16);
    user.GetCursorPos(mouseBuffer);

    let mousePosition = {
      x: mouseBuffer[0] + (mouseBuffer[1] * 256),
      y: mouseBuffer[4] + (mouseBuffer[5] * 256)
    };

    return mousePosition;
  }

  printScreen(){
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
  }

  /**
   * Get the pixel color at the x and y position
   * @access public
   * @param {int} x Point in X axis to get the color.
   * @param {int} y Point in Y axis to get the color.
   * @return {object} An object containing the x and y position in pixels.
  */
  getColorAtPosition(x, y) {
    let pixel = gdi.GetPixel(windowsScreen, x, y);
    return rgbHex(pixel & 0x000000FF, (pixel & 0x0000FF00) >> 8, (pixel & 0x00FF0000) >> 16);
  }

  getColorAtRange(startX, endX, startY, endY){
    for(; startX < endX; startX++){
      for (; startY < endY; startY){
        let pixel = gdi.GetPixel(windowsScreen, x, y);
        console.log(`RGB(${pixel & 0x000000FF}, ${(pixel & 0x0000FF00) >> 8}, ${(pixel & 0x00FF0000) >> 16})`);
      }
    }
  }
}

module.exports = OS;
