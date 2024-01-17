import { GRID_COLUMNS, GRID_ROWS } from "../constants/game-settings.constants";
import { Direction } from "../enums/direction.enum";

export class Cell {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;

        this.normalize();
    }

    getNeighbour(direction: Direction): Cell {
        switch(direction) {
            case Direction.RIGHT:
                return new Cell(this.row, this.column + 1);
            case Direction.LEFT:
                return new Cell(this.row, this.column - 1);
            case Direction.UP:
                return new Cell(this.row - 1, this.column);
            case Direction.DOWN:
                return new Cell(this.row + 1, this.column);
        }
    }

    equals(cell: Cell): boolean {
        return this.row === cell.row && this.column === cell.column;
    }

    private normalize() {
        if (this.row < 0) {
            this.row = GRID_ROWS - 1;
        }
        else if (this.row >= GRID_ROWS) {
            this.row = 0;
        }
        
        if (this.column < 0) {
            this.column = GRID_COLUMNS - 1;
        }
        else if (this.column >= GRID_COLUMNS) {
            this.column = 0;
        }
    }
}
