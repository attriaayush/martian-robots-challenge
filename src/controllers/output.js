const output = (result) => (result.map(res =>
  `${res.coords.x} ${res.coords.y} ${res.coords.orientation}${res.coords.rover ? ' ' + res.coords.rover : ''}`)).join('\n');
exports.output = output;
