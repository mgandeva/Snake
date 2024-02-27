import { CellPosition } from './cell-position.model';
import { Cell } from './cell.model';
import { Grid } from './grid.model';
import { Snake } from './snake.model';

export class Wall {
    private _cells: Cell[];

    constructor(grid: Grid, wallTemplate: CellPosition[], firstCell: Cell) {
        this._cells = wallTemplate.map(cell => {
            const row = cell.row + firstCell.row;
            const column = cell.column + firstCell.column;

            return grid.getCell(row, column);
        });
    }

    get cells(): Cell[] {
        return this._cells;
    }

    containsCell(cell: Cell): boolean {
        return this._cells.some(wallCell => wallCell === cell);
    }

    hasColision(snake: Snake): boolean {
        return this.containsCell(snake.head);
    }
}
