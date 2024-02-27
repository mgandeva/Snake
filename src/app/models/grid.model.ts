import { Cell } from "./cell.model";

export class Grid {
    private rowCount: number;
    private columnCount: number;
    private cells: Cell[][];
    private outOfBoundsCell: Cell;

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
        this.outOfBoundsCell = new Cell(this, -1, -1);
    }

    getCell(row: number, col: number): Cell {
        if(row < 0 || this.rowCount <= row ||
           col < 0 || this.columnCount <= col){
           return this.outOfBoundsCell;
        }

        return this.cells[row][col];
    }

    getOutOfBoundsCell(): Cell {
        return this.outOfBoundsCell;
    }
}
