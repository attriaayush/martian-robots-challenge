const areCoordsValid = (x, y) => x <= 50 && y <= 50;

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

const parseRobotData = robotInstructs => {
  const results = [];
  while (robotInstructs.length) {
    const instructions = robotInstructs.splice(0, 2);
    results.concat(instructionValidator(instructions, results));
  } return results
};

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

const process = inputCommand => {
  const instructions = inputCommand.split('\n');
  return {
    area: setArea(instructions[0]),
    collections: parseRobotData(instructions.slice(1)),
  }
};
exports.process = process;
