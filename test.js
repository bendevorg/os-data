const findApplicationId = require('./src/findApplicationId');
const setActiveWindow = require('./src/setActiveWindow');

findApplicationId('ragnaHOPE | Gepard Shield 2.0 (^-_-^)')
  .then(windowNumber => {
    setActiveWindow(windowNumber)
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