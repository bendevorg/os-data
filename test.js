const findApplicationId = require('./src/findApplicationId');
const getWindowPosition = require('./src/getWindowPosition');
const printScreen = require('./src/printScreen');

findApplicationId('ragnaHOPE | Gepard Shield 2.0 (^-_-^)')
  .then(windowNumber => {
    getWindowPosition(windowNumber)
      .then(windowPosition => {
        console.log(windowPosition);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });