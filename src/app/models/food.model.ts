import { Cell } from './cell.model';
import { Grid } from './grid.model';
import { Snake } from './snake.model';
import { Wall } from './wall.model';

export class Food {
  public cell: Cell;
  private grid: Grid;

  constructor(grid: Grid, snake: Snake, walls: Wall[]) {
    this.grid = grid;
    this.cell = this.getNewCell(snake, walls);
  }

  generateRandomFood(snake: Snake, walls: Wall[]) {
    this.cell = this.getNewCell(snake, walls);
  }

  private getNewCell(snake: Snake, walls: Wall[]): Cell {
    let cell = this.grid.getRandomCell();

    const isCellSnake = snake.containsCell(cell);
    const isCellWall = walls.some(wall => wall.containsCell(cell));

    if (isCellSnake || isCellWall) {
      return this.getNewCell(snake, walls);
    }

    return cell;
  }
}
