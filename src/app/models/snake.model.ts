import { INITIAL_SNAKE_POSITIONS } from "../constants/game-settings.constants";
import { Direction } from "../enums/direction.enum";
import { Cell } from "./cell.model";
import { Grid } from "./grid.model";

export class Snake {
    private headIndex: number = 0;
    private _body: Cell[] = [];
    private _facing: Direction = Direction.RIGHT;
    private _movementDirection: Direction = Direction.RIGHT;

    constructor(grid: Grid){
        INITIAL_SNAKE_POSITIONS.forEach((position) => {
            this.body.push(grid.getCell(position[0], position[1]));
        });
    }

    get body(): Cell[] {
        return this._body;
    }

    get facing(): Direction {
        return this._facing;
    }

    get head(): Cell {
        return this.body[this.headIndex];
    }
  
    get movementDirection(): Direction {
        return this._movementDirection;
    }

    setMovementDirection(direction: Direction): void {
        this._movementDirection = direction;
    }
  
    containsCell(cell: Cell): boolean {
      return this._body.some(snakeCell => snakeCell === cell);
    }
  
    move() {
        this._body = this._body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                this._facing = this.movementDirection;
                return cell.getNeighbour(this.movementDirection);
            }
            
            return this._body[index - 1];
        });
    }

    hasEatenSelf(): boolean {
        const [head, ...tail] = this._body;

        return tail.some(tailCell => tailCell === head);
    }

    grow(grid: Grid) {
        const tailEnd = this._body[this._body.length - 1];
        const newTailEnd = new Cell(grid, tailEnd.row, tailEnd.column);

    return this._body.push(newTailEnd);
  }

  eatsSelf(): boolean {
    const [head, ...tail] = this._body;
    return tail.some((tailCell) => head === tailCell);
  }

  halveLength() {
    const remainingLength = this._body.length / 2;
    this._body = this._body.slice(0, remainingLength);
  }
}
