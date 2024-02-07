import { Direction } from '../enums/direction.enum';
import { Cell } from './cell.model';
import { Grid } from './grid.model';

export class Snake {
    private headIndex: number = 0;
    private _body: Cell[];
    private facing: Direction = Direction.RIGHT;
    private movementDirection: Direction = Direction.RIGHT;

    constructor(grid: Grid){
        this._body = [
            grid.getCell(0, 7),
            grid.getCell(0,6),
            grid.getCell(0,5)];
    }

    get body(): Cell[] {
        return this._body;
    }

    getFacing() : Direction {
        return this.facing;
    }
  
    getMovementDirection(): Direction {
        return this.movementDirection;
    }

    setMovementDirection(direction: Direction): void {
        this.movementDirection = direction;
    }
  
    containsCell(cell: Cell): boolean {
      return this._body.some(snakeCell => snakeCell === cell);
    }

    getHead(): Cell {
        return this._body[0];
    }
  
    move() {
        this._body = this._body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                this.facing = this.movementDirection;
                return cell.getNeighbour(this.movementDirection);
            }
            
            return this._body[index - 1];
        });
    }

    hasEatenSelf(): boolean {
        const [head, ...tail] = this.body;

        if(tail.some(tailCell => tailCell === head))
            return true;
        return false;
    }

    grow(grid: Grid) {
        const tailEnd = this.body[this.body.length - 1];
        const newTailEnd = new Cell(grid, tailEnd.row, tailEnd.column);

        return this.body.push(newTailEnd);
    }
}
