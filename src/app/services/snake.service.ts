import { Injectable } from '@angular/core';
import { Snake } from '../models/snake.model';
import { Direction } from '../enums/direction.enum';
import { DirectionHelper } from '../helpers/direction.helper';

@Injectable({
    providedIn: 'root',
})
export class SnakeService {
    constructor(private directionHelper: DirectionHelper) {}
    
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
        var givenDirectionOpposite = this.directionHelper.getOppositeDirection(givenDirection);

        return !(wantedDirection === givenDirection || wantedDirection === givenDirectionOpposite);
    }
}
