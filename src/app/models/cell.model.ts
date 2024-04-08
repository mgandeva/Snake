import { GRID_COLUMNS, GRID_ROWS } from "../constants/game-settings.constants";
import { Direction } from "../enums/direction.enum";
import { Grid } from "./grid.model";

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
            case Direction.RIGHT:{
                if(this.column >= GRID_COLUMNS - 1){
                  return this.grid.getCell(this.row, 0)
                }

                return this.grid.getCell(this.row, this.column + 1);
            }
            case Direction.LEFT:{
                if(this.column === 0){
                  return this.grid.getCell(this.row, GRID_COLUMNS - 1)
                }

                return this.grid.getCell(this.row, this.column - 1);
            }
            case Direction.UP:{
                if(this.row === 0){
                  return this.grid.getCell(GRID_ROWS - 1, this.column)
                }

                return this.grid.getCell(this.row - 1, this.column);
            }
            case Direction.DOWN:{
                if(this.row >= GRID_ROWS - 1){
                  return this.grid.getCell(0, this.column)
                }

                return this.grid.getCell(this.row + 1, this.column);
            }
        }
    }

    isLightColoured(): boolean {
        return (this.row + this.column) % 2 === 0;
    }
}
