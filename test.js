const findApplicationId = require('./src/findApplicationId');
const setActiveWindow = require('./src/setActiveWindow');
const printScreen = require('./src/printScreen');

findApplicationId('?ok???O')
  .then(windowNumber => {
    setActiveWindow(windowNumber)
      .then(() => {
        printScreen(windowNumber, 'test.jpg')
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });