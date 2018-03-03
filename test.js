const findApplicationId = require('./src/findApplicationId');
const printScreen = require('./src/printScreen');

let windowNumber = findApplicationId('ragnaHOPE | Gepard Shield 2.0 (^-_-^)');

findApplicationId('ragnaHOPE | Gepard Shield 2.0 (^-_-^)')
  .then(windowNumber => {
    printScreen(windowNumber)
      .then(image => {
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });