import { Direction } from '../enums/direction.enum';

export function getDirection(key: string): Direction | null {
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
      return null;
  }
}
