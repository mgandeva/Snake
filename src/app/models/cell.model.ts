import { Direction } from '../enums/direction.enum';
import { Grid } from './grid.model';

export class Cell {
    private grid: Grid;
    private row: number;
    private column: number;

    constructor(grid: Grid, row: number, column: number) {
        this.grid = grid;
        this.row = row;
        this.column = column;
    }

    getNeighbour(direction: Direction): Cell {
        switch(direction) {
            case Direction.RIGHT:
                return this.grid.getCell(this.row, this.column + 1);
            case Direction.LEFT:
                return this.grid.getCell(this.row, this.column - 1);
            case Direction.UP:
                return this.grid.getCell(this.row - 1, this.column);
            case Direction.DOWN:
                return this.grid.getCell(this.row + 1, this.column);
        }
    }

    isLightColoured(): boolean {
        return (this.row + this.column) % 2 === 0;
    }
}
