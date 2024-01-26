import { GRID_COLUMNS, GRID_ROWS } from '../constants/game-settings.constants';
import { Cell } from './cell.model';
import { Grid } from './grid.model';
import { Snake } from './snake.model';

export class Food {
  public cell: Cell;
  private grid: Grid;

  constructor(grid: Grid) {
    this.cell = grid.getRandomCell();
    this.grid = grid;
  }

  generateRandomFood(snake: Snake) {
    let randomCell = this.grid.getRandomCell();

    while (snake.containsCell(randomCell)) {
      randomCell = this.grid.getRandomCell();
    }

    this.cell = randomCell;
  }
}
