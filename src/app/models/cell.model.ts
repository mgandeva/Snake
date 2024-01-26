import { Direction } from '../enums/direction.enum';
import { CellPosition } from './cell-position.model';
import { Grid } from './grid.model';

export class Cell extends CellPosition {
    private _grid: Grid;

    constructor(grid: Grid, row: number, column: number) {
        super(row, column);

        this._grid = grid;
    }

    getNeighbour(direction: Direction): Cell {
        switch(direction) {
            case Direction.RIGHT:
                return this._grid.getCell(this._row, this._column + 1);
            case Direction.LEFT:
                return this._grid.getCell(this._row, this._column - 1);
            case Direction.UP:
                return this._grid.getCell(this._row - 1, this._column);
            case Direction.DOWN:
                return this._grid.getCell(this._row + 1, this._column);
        }
    }
}
