const { process } = require('./controllers/instructions');
const input = '5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL';

(function () {
  try {
    console.log(JSON.stringify(process(input), null, 4));
  } catch(e) { console.log(`Error: ${e.message}`) }
})();
