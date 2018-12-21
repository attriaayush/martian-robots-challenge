let lostRobotRegister = [];

const isRobotLost = (area, coords) => coords.x > area.x || coords.y > area.y;

const validateLostPoint = coords => {
  let check = false;
  if (lostRobotRegister.length != 0)
    check = lostRobotRegister.some(scent => coords.x === scent.x && coords.y === scent.y);
  lostRobotRegister.push(coords);
  return check;
}

const forward = coords => {
  switch (coords.orientation) {
    case 'N': return { ...coords, y: coords.y + 1 };
    case 'W': return { ...coords, x: coords.x - 1 };
    case 'S': return { ...coords, y: coords.y - 1 };
    case 'E': return { ...coords, x: coords.x + 1 };
    default: return coords;
  }
}

const rover = (area, coords) => {
  const newResults = forward(coords);
  if (isRobotLost(area, newResults)) return validateLostPoint(coords) ? coords : { ...coords, rover: 'LOST' };
  return newResults;
}
exports.rover = rover;
