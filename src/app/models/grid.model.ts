import { RandomHelper } from '../helpers/random.helper';
import { Cell } from './cell.model';

export class Grid {
    private _rowsCount: number;
    private _columnsCount: number;
    private cells: Cell[][];
    private outOfBoundsCell: Cell;

    constructor(
        rows: number, 
        columns: number, 
        private randomHelper: RandomHelper) {
        this._rowsCount = rows;
        this._columnsCount = columns;
        this.cells = new Array(this._rowsCount);
        for(let r = 0; r < this._rowsCount; r++) {
            this.cells[r] = new Array(this._rowsCount);
            for(let c = 0; c < this._columnsCount; c++) {
                this.cells[r][c] = new Cell(this, r, c);
            }
        }
        this.outOfBoundsCell = new Cell(this, -1, -1);
    }

    get rowsCount() {
        return this._rowsCount;
    }

    get columnsCount() {
        return this._columnsCount;
    }

    getCell(row: number, col: number): Cell {
        if(row < 0 || this._rowsCount <= row ||
           col < 0 || this._columnsCount <= col){
           return this.outOfBoundsCell;
        }

        return this.cells[row][col];
    }

    getOutOfBoundsCell(): Cell {
        return this.outOfBoundsCell;
    }

    getRandomCell() {
        return this.getCell(
            this.randomHelper.randomNumber(0, this._rowsCount - 1),
            this.randomHelper.randomNumber(0, this._columnsCount - 1)
        );
    }
}
