import { Direction } from '../enums/direction.enum';

export function getDirection(
  key: string,
  currentDirection: Direction
): Direction {
  switch (key) {
    case 'ArrowLeft':
      return Direction.LEFT;
    case 'ArrowUp':
      return Direction.UP;
    case 'ArrowDown':
      return Direction.DOWN;
    case 'ArrowRight':
      return Direction.RIGHT;
    default:
      return currentDirection;
  }
}
