import { Cell } from './cell.model';

export class Grid {
  private rowCount: number;
  private columnCount: number;
  private cells: Cell[][];
  private outOfBoundsCell: Cell;

  constructor(rows: number, columns: number) {
    this.rowCount = rows;
    this.columnCount = columns;
    this.cells = new Array(this.rowCount);
    for (let r = 0; r < this.rowCount; r++) {
      this.cells[r] = new Array(this.rowCount);
      for (let c = 0; c < this.columnCount; c++) {
        this.cells[r][c] = new Cell(this, r, c);
      }
    }
    this.outOfBoundsCell = new Cell(this, -1, -1);
  }

  getCell(row: number, col: number): Cell {
    return this.getCellBounded(row, col);
  }

  getCellUnbounded(row: number, col: number): Cell {
    const normalizedRow = (row + this.rowCount) % this.rowCount;
    const normalizedCol = (col + this.columnCount) % this.columnCount;

    return this.cells[normalizedRow][normalizedCol];
  }

  getCellBounded(row: number, col: number): Cell {
    if (row < 0 || this.rowCount <= row || col < 0 || this.columnCount <= col) {
      return this.outOfBoundsCell;
    }
    return this.cells[row][col];
  }

  getOutOfBoundsCell(): Cell {
    return this.outOfBoundsCell;
  }

  getRandomCell() {
    return this.getCell(
      this.generateRandom(this.rowCount - 1),
      this.generateRandom(this.columnCount - 1)
    );
  }

  private generateRandom(limit: number) {
    return Math.floor(Math.random() * limit);
  }
}
