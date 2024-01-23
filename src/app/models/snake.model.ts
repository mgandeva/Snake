import { Direction } from '../enums/direction.enum';
import { Cell } from './cell.model';
import { Grid } from './grid.model';

export class Snake {
    private headIndex: number = 0;
    private body: Cell[];
    private _movementDirection: Direction = Direction.RIGHT;

    constructor(grid: Grid){
        this.body = [grid.getCell(0, 7), grid.getCell(0,6), grid.getCell(0,5)];
    }

    get movementDirection() : Direction {
        return this._movementDirection;
    }

    setMovementDirection(direction: Direction): void {
        this._movementDirection = direction;
    }
  
    containsCell(cell: Cell): boolean {
      return this.body.some(snakeCell => snakeCell === cell);
    }
  
    move() {
        this.body = this.body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                return cell.getNeighbour(this.movementDirection);
            }
            
            return this.body[index - 1];
        });
    }
}
