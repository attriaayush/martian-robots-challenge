const areCoordsValid = (x, y) => x <= 50 && y <= 50;
/** This method returns an Object of coordinates for (x,y)
 * by parsing them into integers from strings
 */
const setArea = upperRightCoord => {
  const upperRight = upperRightCoord.split(' ');
  if (areCoordsValid(parseInt(upperRight[0]), parseInt(upperRight[1]))) {
    return {
      x: parseInt(upperRight[0]),
      y: parseInt(upperRight[1])
    }
  } else throw Error('The maximum value for any coordinate should be 50.');
};

const instructionValidator = (instructions, results) => {
  if (instructions.length === 2) {
    if (instructions[1] && instructions[1].length <= 100) {
      results.push({
        coords: parseRobotCoords(instructions[0]).coords,
        directions: instructions[1].split(''),
      });
    } else throw Error('All instruction strings should be less than 100 characters in length.');
  } return results;
};
/** This method parses the command directions string
 * and returns an Object with the output from
 * @method parseRobotCoords and direction commands array
 */
const parseRobotData = robotInstructs => {
  const results = [];
  while (robotInstructs.length) {
    const instructions = robotInstructs.splice(0, 2);
    results.concat(instructionValidator(instructions, results));
  } return results
};
/** This takes in the strings of robot instructions and
 * parses those strings and returns an object with
 * coordinates and orientation
*/
const parseRobotCoords = coordInstructions => {
  let instructions = coordInstructions.split(' ');
  return {
    coords: {
      x: parseInt(instructions[0]),
      y: parseInt(instructions[1]),
      orientation: instructions[2],
    }
  }
};
/** This includes call outs to methods such as
 * @method setArea and @method parseRobotData
 * and returns an object with parsed data
 * e.g.
 * {
 *    area: { x: 1, y: 1 },
 *    collections: [
 *      {
 *          coords: {
 *            x: 1,
 *            y: 1,
 *            orientation: "E",
 *          },
 *          directions: ["RFFLFF"],
 *      }
 *    ]
 * }
  */
const process = inputCommand => {
  const instructions = inputCommand.split('\n');
  return {
    area: setArea(instructions[0]),
    collections: parseRobotData(instructions.slice(1)),
  }
};
exports.process = process;
