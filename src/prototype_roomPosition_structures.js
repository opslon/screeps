'use strict';

RoomPosition.prototype.setSpawn = function(path, pathI) {
  let posNext = path[+pathI + 1];
  let pathPos = new RoomPosition(path[pathI].x, path[pathI].y, path[pathI].roomName);
  // TODO Check distance to other spawns
  let room = Game.rooms[this.roomName];
  if (room.memory.position.structure.spawn.length >= CONTROLLER_STRUCTURES.spawn[8]) {
    return false;
  }

  let directionStructure = pathPos.getDirectionTo(this.x, this.y);

  if (directionStructure === BOTTOM) {
    return true;
  }

  if (!posNext) {
    room.log('No posNext: ' + pathPos);
    return false;
  }

  let directionNext = pathPos.getDirectionTo(posNext.x, posNext.y);

  if (directionNext === RIGHT && directionStructure === BOTTOM_RIGHT) {
    return true;
  }

  if (directionNext === LEFT && directionStructure === BOTTOM_LEFT) {
    return true;
  }

  if (directionNext === TOP_RIGHT && directionStructure === RIGHT) {
    return true;
  }

  if (directionNext === TOP_LEFT && directionStructure === LEFT) {
    return true;
  }

  return false;
};

RoomPosition.prototype.setExtension = function() {
  let room = Game.rooms[this.roomName];
  if (room.memory.position.structure.extension.length >= CONTROLLER_STRUCTURES.extension[8]) {
    return false;
  }
  return true;
};

RoomPosition.prototype.inRamparts = function() {
  let room = Game.rooms[this.roomName];
  for (let rampart of room.memory.walls.ramparts) {
    if (this.isEqualTo(rampart.x, rampart.y)) {
      return true;
    }
  }
};
