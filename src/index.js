const fs = require('fs');
const path = require('path');

const { process } = require('./controllers/instructions');
const { evaluate } = require('./controllers/evaluate');
const { output } = require('./controllers/output');

const input = (fs.readFileSync(path.join(__dirname, '..' + '/test/sample.txt'))).toString();

(function () {
  try {
    let result = output(evaluate(process(input)));
    console.log(`Output:\n${result}`);
  } catch (e) { console.log(`Error: ${e.message}`) }
})();
