const findApplicationId = require('./src/findApplicationId');
const printScreen = require('./src/printScreen');

findApplicationId('ragnaHOPE | Gepard Shield 2.0 (^-_-^)')
  .then(windowNumber => {
    printScreen(windowNumber, 'a.png')
      .then(img => {
        console.log(img);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });