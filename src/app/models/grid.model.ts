import { Cell } from './cell.model';

export class Grid {
    private rowCount: number;
    private columnCount: number;
    private cells: Cell[][];

    constructor(rows: number, columns: number) {
        this.rowCount = rows;
        this.columnCount = columns;
        this.cells = new Array(this.rowCount);
        for(let r = 0; r < this.rowCount; r++) {
            this.cells[r] = new Array(this.rowCount);
            for(let c = 0; c < this.columnCount; c++) {
                this.cells[r][c] = new Cell(this, r, c);
            }
        }
    }

    getCell(row: number, col: number): Cell{
        const normalizedRow = (row + this.rowCount) % this.rowCount;
        const normalizedCol = (col + this.columnCount) % this.columnCount;

        return this.cells[normalizedRow][normalizedCol];
    }
}
