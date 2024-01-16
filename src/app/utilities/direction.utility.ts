import { Direction } from "../enums/direction.enum";

export function getDirection(key: string): Direction {
    switch (key) {
      case 'ArrowLeft':
        return Direction.LEFT;
      case 'ArrowUp':
        return Direction.UP;
      case 'ArrowRight':
        return Direction.RIGHT;
      case 'ArrowDown':
        return Direction.DOWN;
      default:
        return Direction.RIGHT;
    }
  }