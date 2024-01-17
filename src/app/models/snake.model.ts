import { Direction } from "../enums/direction.enum";
import { Cell } from "./cell.model";

const INITIAL_SNAKE_COORDINATES = [
    new Cell(0, 7),
    new Cell(0, 6),
    new Cell(0, 5)
];

export class Snake {
    private headIndex: number = 0;

    direction: Direction = Direction.RIGHT;
    facing: Direction = this.direction;
    body: Cell[] = INITIAL_SNAKE_COORDINATES;
  
    containsCell(cell: Cell): boolean {
      return this.body.some(snakeCell => 
        snakeCell.row === cell.row && 
        snakeCell.column === cell.column);
    }
  
    move() {
        this.body = this.body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                this.facing = this.direction;
                return cell.getNeighbour(this.direction);
            }
            
            return this.body[index - 1];
        });
    }
}
