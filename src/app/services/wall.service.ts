import { Injectable } from '@angular/core';
import { Snake } from '../models/snake.model';
import { Grid } from '../models/grid.model';
import { Wall } from '../models/wall.model';
import { RandomHelper } from '../helpers/random.helper';
import { MAX_WALLS_COUNT, MIN_WALLS_COUNT, WALL_TEMPLATES } from '../constants/wall.constants';
import { CellPosition } from '../models/cell-position.model';
import { Cell } from '../models/cell.model';
import { Food } from '../models/food.model';

@Injectable({
    providedIn: 'root',
})
export class WallService {
    constructor(private randomHelper: RandomHelper) {}

    generateWalls(grid: Grid, snake: Snake): Wall[] {
        const wallsCount = this.randomHelper.randomNumber(MIN_WALLS_COUNT, MAX_WALLS_COUNT);

        let occupiedCells = snake.body;

        const walls: Wall[] = [];
        for(let i = 0; i < wallsCount; i++) {
            const template = this.getRandomWallTemplate();
            const wall = this.generateWall(template, grid, occupiedCells);

            walls.push(wall);

            occupiedCells = occupiedCells.concat(wall.cells);
        }

        return walls;
    }

    private getRandomWallTemplate(): CellPosition[] {
        const templateIndex = this.randomHelper.randomNumber(0, WALL_TEMPLATES.length - 1);
        return WALL_TEMPLATES[templateIndex];
    }

    private generateWall(template: CellPosition[], grid: Grid, occupiedCells: Cell[]): Wall {
        const lastTemplateCell = template[template.length - 1];
        const maxRow = grid.rowsCount - lastTemplateCell.row;
        const maxColumn = grid.columnsCount - lastTemplateCell.column;

        while (true) {
            const row = this.randomHelper.randomNumber(0, maxRow);
            const column = this.randomHelper.randomNumber(0, maxColumn);

            const firstWallCell = grid.getCell(row, column);
            const wall = new Wall(grid, template, firstWallCell);

            const wallHasColisions = wall.cells.some(wallCell => 
                occupiedCells.some(occupiedCell => occupiedCell === wallCell));
            if (!wallHasColisions) {
                return wall;
            }
        }
    }
}
