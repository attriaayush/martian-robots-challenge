/** An array[] that holds all the records for lost robot points */
let lostRobotRegister = [];
/** Method to perform a check whether the provided
 * @param {Object} area (x,y) coordinates fall within the set area of
 * @param {Object} coords (x,y)
 * Returns boolean based on if the given area is within the set area constraints
 */
const isRobotLost = (area, coords) => coords.x > area.x || coords.y > area.y;
/** Method uses the scent stored in
 * @param {variable} lostRobotRegister
 * from the lost robots against the
 * @param {Object} coords (x,y) coordinates in order to
 * protect the future robots from falling off the grid.
 * Returns a boolean based on if the lost robot scents was found.
 */
const validateLostPoint = coords => {
  let check = false;
  if (lostRobotRegister.length != 0)
    check = lostRobotRegister.some(scent => coords.x === scent.x && coords.y === scent.y);
  lostRobotRegister.push(coords);
  return check;
}
/** Method uses @param {Object} coords
 * which contains a reference to the orientation/direction
 * the robot should move a grid point towards.
 * Returns the updated coordinates
*/
const forward = coords => {
  switch (coords.orientation) {
    case 'N': return { ...coords, y: coords.y + 1 };
    case 'W': return { ...coords, x: coords.x - 1 };
    case 'S': return { ...coords, y: coords.y - 1 };
    case 'E': return { ...coords, x: coords.x + 1 };
    default: return coords;
  }
}
/** Method uses @param {Object} area containing the default grid settings
 * and @param {Object} coords containing.
 * This method starts with moving the rover forward then
 * checking whether the new grids are still valid then
 * if the rover's readings are outside the grid can it be protected
 * from our register of lost robot scents, if not then record those readings
 * if found, then ignore those readings and proceed with the previous readings.
 * Returns the updated coordinates and orientation
 */
const rover = (area, coords) => {
  const newResults = forward(coords);
  if (isRobotLost(area, newResults)) return validateLostPoint(coords) ? coords : { ...coords, rover: 'LOST' };
  return newResults;
}
exports.rover = rover;
