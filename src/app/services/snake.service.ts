import { Injectable } from "@angular/core";
import { Snake } from "../models/snake.model";
import { Direction } from "../enums/direction.enum";

@Injectable({
    providedIn: 'root',
})
export class SnakeService {
    changeDirection(snake: Snake, direction: Direction) {
        const canChangeDirection = this.canChangeDirection(direction, snake.direction);
        if (canChangeDirection) {
            snake.direction = direction;
        }
    }

    private canChangeDirection(
      wantedDirection: Direction,
      givenDirection: Direction
    ): boolean {
      const directions = [wantedDirection, givenDirection];
      const filteredSameDirection = directions.filter(
        direction => direction === Direction.LEFT || direction === Direction.RIGHT
      ).length;

      const onlyOneDir =
        filteredSameDirection === 2 || filteredSameDirection === 0;
  
      return !onlyOneDir;
    }
}