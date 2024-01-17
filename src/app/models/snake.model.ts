import { Direction } from '../enums/direction.enum';
import { Cell } from './cell.model';

const INITIAL_SNAKE_COORDINATES = [
  new Cell(0, 7),
  new Cell(0, 6),
  new Cell(0, 5),
];

export class Snake {
  private headIndex: number = 0;

  direction: Direction = Direction.RIGHT;
  body: Cell[] = INITIAL_SNAKE_COORDINATES;

  containsCell(cell: Cell): boolean {
    return this.body.some(
      (snakeCell) =>
        snakeCell.row === cell.row && snakeCell.column === cell.column
    );
  }

  move() {
    this.body = this.body.map((cell: Cell, index: number) => {
      if (index === this.headIndex) {
        return cell.getNeighbour(this.direction);
      }
      return this.body[index - 1];
    });
  }

  grow() {
    const newTailEnd = this.determineGrowDirection();

    return this.body.push(new Cell(newTailEnd.row, newTailEnd.column));
  }

  private determineGrowDirection() {
    switch (this.direction) {
      case Direction.RIGHT:
        return {
          row: this.body[this.body.length - 1].row,
          column: this.body[this.body.length - 1].column - 1,
        };
      case Direction.LEFT:
        return {
          row: this.body[this.body.length - 1].row,
          column: this.body[this.body.length - 1].column + 1,
        };
      case Direction.UP:
        return {
          row: this.body[this.body.length - 1].row + 1,
          column: this.body[this.body.length - 1].column,
        };
      case Direction.DOWN:
        return {
          row: this.body[this.body.length - 1].row - 1,
          column: this.body[this.body.length - 1].column,
        };
    }
  }
}
