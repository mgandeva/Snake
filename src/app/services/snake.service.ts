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
            snake.getFacing()
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

        const filteredRowAxes = directions.filter(direction => 
            direction === Direction.LEFT || 
            direction === Direction.RIGHT
        ).length;

        const onTheSameAxis = filteredRowAxes === 2 || filteredRowAxes === 0;

        return !onTheSameAxis;
    }
}
