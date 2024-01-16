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
      
      const filteredRowAsics = directions.filter(
        direction => direction === Direction.LEFT || 
        direction === Direction.RIGHT
      ).length;

      const onTheSameAsixs =
      filteredRowAsics === 2 || filteredRowAsics === 0;
  
      return !onTheSameAsixs;
    }
}