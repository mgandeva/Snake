import { INITIAL_SNAKE_POSITIONS } from "../constants/game-settings.constants";
import { Direction } from "../enums/direction.enum";
import { Cell } from "./cell.model";
import { Grid } from "./grid.model";

export class Snake {
    private headIndex: number = 0;
    private body: Cell[] = [];
    private _facing: Direction = Direction.RIGHT;
    private movementDirection: Direction = Direction.RIGHT;

    constructor(grid: Grid){
        INITIAL_SNAKE_POSITIONS.forEach((position) => {
            this.body.push(grid.getCell(position[0], position[1]));
        });
    }

    get facing() : Direction {
        return this._facing;
    }

    get head() : Cell {
        return this.body[this.headIndex];
    }

    getMovementDirection() : Direction {
        return this.movementDirection;
    }

    setMovementDirection(direction: Direction): void {
        this.movementDirection = direction;
    }
  
    containsCell(cell: Cell): boolean {
      return this.body.some(snakeCell => snakeCell === cell);
    }
  
    move() {
        this.body = this.body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                this._facing = this.movementDirection;
                return cell.getNeighbour(this.movementDirection);
            }
            
            return this.body[index - 1];
        });
    }
}
