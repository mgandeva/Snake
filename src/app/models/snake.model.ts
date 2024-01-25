import { Direction } from '../enums/direction.enum';
import { Cell } from './cell.model';
import { Grid } from './grid.model';

export class Snake {
  private headIndex: number = 0;
  body: Cell[];
  private _movementDirection: Direction = Direction.RIGHT;

  constructor(grid: Grid) {
    this.body = [grid.getCell(0, 7), grid.getCell(0, 6), grid.getCell(0, 5)];
  }

  get movementDirection(): Direction {
    return this._movementDirection;
  }

  setMovementDirection(direction: Direction): void {
    this._movementDirection = direction;
  }

  containsCell(cell: Cell): boolean {
    return this.body.some((snakeCell) => snakeCell === cell);
  }

  move() {
    this.body = this.body.map((cell: Cell, index: number) => {
      if (index === this.headIndex) {
        return cell.getNeighbour(this.movementDirection);
      }

      return this.body[index - 1];
    });
  }

  grow(grid: Grid) {
    const tailEnd = this.body[this.body.length - 1];
    const newTailEnd = new Cell(grid, tailEnd.row, tailEnd.column);

    return this.body.push(newTailEnd);
  }

  getHead(): Cell {
    return this.body[0];
  }

  hasEatenSelf(): boolean {
    const [head, ...tail] = this.body;

    if (tail.some((tailCell) => tailCell === head)) return true;
    return false;
  }
}
