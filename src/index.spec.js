const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const { process } = require('./controllers/instructions');

describe('Testing the sample inputs', () => {
  const sampleInputs = (fs.readFileSync(path.join(__dirname, '..' + '/test/sample.txt'))).toString();
  it('should return the correct object structure', () => {
    let result = process(sampleInputs);
    assert.deepInclude((result), { area: { x: 5, y: 3 }});
  });
});
