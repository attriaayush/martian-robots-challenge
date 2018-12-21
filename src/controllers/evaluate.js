const { rover } = require('./rover');
const leftDirectionMappings = require('../utils/directionMappings');

const invertMappings = mappings => Object.keys(mappings).reduce((obj, key) => (obj[mappings[key]] = key, obj), {});
const rightDirectionMappings = invertMappings(leftDirectionMappings);

const updateOrientation = (area, coords, direction) => {
  switch (direction) {
    case 'L': return { ...coords, orientation: leftDirectionMappings[coords.orientation] }
    case 'R': return { ...coords, orientation: rightDirectionMappings[coords.orientation] }
    case 'F': return rover(area, coords, direction);
    default: return coords;
  }
}

const handler = (area, collection) => {
  for (let direction of collection.directions) {
    collection.coords = updateOrientation(area, collection.coords, direction);
    if (collection.coords.rover) break;
  } return collection;
}

const evaluate = ({ area, collections }) => collections.map(collection => handler(area, collection));

exports.evaluate = evaluate;
