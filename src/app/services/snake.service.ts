import { Injectable } from '@angular/core';
import { Snake } from '../models/snake.model';
import { Direction } from '../enums/direction.enum';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  changeDirection(snake: Snake, direction: Direction) {
      const canChangeDirection = this.canChangeDirection(
          direction,
          snake.facing
      );
      if (canChangeDirection) {
          snake.setMovementDirection(direction);
      }
  }

  private canChangeDirection(
    wantedDirection: Direction,
    givenDirection: Direction
  ): boolean {
    const directions = [wantedDirection, givenDirection];

        const directionsOnHorizontalAxis = directions.filter(direction =>
            direction === Direction.LEFT || 
            direction === Direction.RIGHT
        ).length;

        // If both the wanted and given direction are on the same axis,
        // directionsOnHorizontalAxis is even.
        const onTheSameAxis = directionsOnHorizontalAxis % 2 === 0;

    return !onTheSameAxis;
  }
}
