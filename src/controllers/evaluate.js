/** Importing @method {rover}
 * also importing a direction/orientaion mappings
*/
const { rover } = require('./rover');
const leftDirectionMappings = require('../utils/directionMappings');
/** This takes the @param {Object} leftDirectionMappings
 * returns the inverted key/pair values as they would be inverted
 * from left to right mappings or vice verse.
 */
const invertMappings = mappings => Object.keys(mappings).reduce((obj, key) => (obj[mappings[key]] = key, obj), {});
const rightDirectionMappings = invertMappings(leftDirectionMappings);
/**This method on the basis of given set of commands for rover's movements
 * uses a switch case to identify the type of movement is asked for
 * and returns the updated coordinates and orientation
 */
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
/** This acts as an orchestrator to call the @method updateOrientation
 * and returns the updated @var {Array} collections
  */
const evaluate = ({ area, collections }) => collections.map(collection => handler(area, collection));

exports.evaluate = evaluate;
