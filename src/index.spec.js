const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const { process } = require('./controllers/instructions');
const { evaluate } = require('./controllers/evaluate');
const { output } = require('./controllers/output');

describe('Testing the sample inputs', () => {
  const sampleInputs = (fs.readFileSync(path.join(__dirname, '..' + '/test/sample.txt'))).toString();
  let result = process(sampleInputs);
  it('should return the correct object structure', () => {
    assert.deepInclude((result), { area: { x: 5, y: 3 }});
  });
  it('should return the correct outputs for the given data without LOST scents', () => {
    let resultString = output(evaluate(result));
    let expectedOutput = `1 1 E\n3 3 N LOST\n2 3 S`
    assert.equal(resultString, expectedOutput);
  })
});
