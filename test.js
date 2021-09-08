const findApplicationId = require(`./src/${process.platform === 'win32' ? 'windows' : 'darwin'}/findApplicationId`);
const setActiveWindow = require(`./src/${process.platform === 'win32' ? 'windows' : 'darwin'}/setActiveWindow`);
// const printScreen = require(`./src/${process.platform === 'win32' ? 'windows' : 'darwin'}/printScreen`);

findApplicationId('java')
  .then(windowNumber => {
    setActiveWindow(windowNumber)
      .then(() => {
        // printScreen(windowNumber, 'test.jpg')
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });