import { Injectable } from '@angular/core';
import { Direction } from '../enums/direction.enum';

@Injectable({
  providedIn: 'root',
})
export class DirectionHelper {
  getDirection(key: string, currentDirection: Direction): Direction {
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

  getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.LEFT:
        return Direction.RIGHT;
      case Direction.RIGHT:
        return Direction.LEFT;
      case Direction.UP:
        return Direction.DOWN;
      case Direction.DOWN:
      default:
        return Direction.UP;
    }
  }
}
