import { GRID_COLUMNS, GRID_ROWS } from '../constants/game-settings.constants';
import { Cell } from './cell.model';
import { Snake } from './snake.model';

export class Food {
  public cell: Cell;

  constructor() {
    this.cell = new Cell(this.generateRandomRow(), this.generateRandomColumn());
  }

  generateRandomFood(snake: Snake) {
    let randomCell = new Cell(
      this.generateRandomRow(),
      this.generateRandomColumn()
    );

    while (snake.containsCell(randomCell)) {
      randomCell.row = this.generateRandomRow();
      randomCell.column = this.generateRandomColumn();
    }

    this.cell.row = randomCell.row;
    this.cell.column = randomCell.column;
  }

  private generateRandomRow() {
    return Math.floor(Math.random() * (GRID_ROWS - 1));
  }

  private generateRandomColumn() {
    return Math.floor(Math.random() * (GRID_COLUMNS - 1));
  }
}
