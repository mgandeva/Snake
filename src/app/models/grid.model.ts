import { Cell } from './cell.model';

export class Grid {
  private _rowsCount: number;
  private _columnsCount: number;
  private cells: Cell[][];
  private outOfBoundsCell: Cell;

  constructor(rows: number, columns: number) {
    this._rowsCount = rows;
    this._columnsCount = columns;
    this.cells = new Array(this._rowsCount);
    for (let r = 0; r < this._rowsCount; r++) {
      this.cells[r] = new Array(this._rowsCount);
      for (let c = 0; c < this._columnsCount; c++) {
        this.cells[r][c] = new Cell(this, r, c);
      }
    }
    this.outOfBoundsCell = new Cell(this, -1, -1);
  }

  getCell(row: number, col: number): Cell {
    return this.getCellBounded(row, col);
  }

  getCellUnbounded(row: number, col: number): Cell {
    const normalizedRow = (row + this._rowsCount) % this._rowsCount;
    const normalizedCol = (col + this._columnsCount) % this._columnsCount;

    return this.cells[normalizedRow][normalizedCol];
  }

  getCellBounded(row: number, col: number): Cell {
    if (
      row < 0 ||
      this._rowsCount <= row ||
      col < 0 ||
      this._columnsCount <= col
    ) {
      return this.outOfBoundsCell;
    }
    return this.cells[row][col];
  }

  get rowsCount() {
    return this._rowsCount;
  }

  get columnsCount() {
    return this._columnsCount;
  }

  getOutOfBoundsCell(): Cell {
    return this.outOfBoundsCell;
  }

  getRandomCell() {
    return this.getCell(
      this.generateRandom(this._rowsCount - 1),
      this.generateRandom(this._columnsCount - 1)
    );
  }

  private generateRandom(limit: number) {
    return Math.floor(Math.random() * limit);
  }
}
