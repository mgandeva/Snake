import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  STEP_TIME,
} from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { getDirection } from './utilities/direction.utility';
import { Grid } from './models/grid.model';
import { Wall } from './models/wall.model';
import { WallService } from './services/wall.service';
import { Cell } from './models/cell.model';
import { Direction } from './enums/direction.enum';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private grid: Grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  private snake: Snake = new Snake(this.grid);
    private food: Food = new Food(this.grid);
    private walls: Wall[];

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];
  score = 0;

  constructor(
    private snakeService: SnakeService, 
    private wallService: WallService
  ) {
    this.walls = wallService.generateWalls(this.grid, this.snake, this.food);
  }

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(() => {
        this.snake.move();
        if (!this.isGameOver()) {
          this.eatFood();
          runTime();
        }
      }, STEP_TIME);
    };

    runTime();
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    const direction = getDirection(event.key);

    this.snakeService.changeDirection(this.snake, direction);
  }

  getGridCellClasses(row: number, column: number): string {
    const cell = this.grid.getCell(row, column);

    if (this.food.cell === cell) {
      return 'food-cell';
    }

    let classes = cell.isLightColoured() 
      ? 'empty-cell-light' 
      : 'empty-cell-middle';

    if (this.isCellWall(cell)) {
      classes += this.getWallClasses(cell);
    }
    else if (this.snake.containsCell(cell)) {
      return 'snake-cell';
    }

    return classes;
  }

  private isCellWall(cell: Cell): boolean {
    return this.walls.some(wall => 
      wall.cells.some(wallCell => wallCell === cell));
  }

  private getWallClasses(cell: Cell): string {
    let classes = '';

    const upperCell = cell.getNeighbour(Direction.UP);
    if (cell.row > 0 && !this.isCellWall(upperCell)) {
      classes += ' border-top';
    }
    
    const lowerCell = cell.getNeighbour(Direction.DOWN);
    if (cell.row < GRID_ROWS - 1 && !this.isCellWall(lowerCell)) {
      classes += ' border-bottom';
    }
    
    const leftCell = cell.getNeighbour(Direction.LEFT);
    if (cell.column > 0 && !this.isCellWall(leftCell)) {
      classes += ' border-left';
    }
    
    const rightCell = cell.getNeighbour(Direction.RIGHT);
    if (cell.column < GRID_COLUMNS - 1 && !this.isCellWall(rightCell)) {
      classes += ' border-right';
    }

    return classes;
  }

  private isGameOver(): boolean {
    if(this.snake.getHead() === this.grid.getOutOfBoundsCell()){
        return true;
    }

      if (this.snake.hasEatenSelf()) {
      return true;
    }
    
    return this.walls.some(wall => wall.hasColision(this.snake));
  }

  private eatFood() {
    const snakeHead = this.snake.body[0];
    if (snakeHead === this.food.cell) {
      this.snake.grow(this.grid);
      this.score += 10;
      this.food.generateRandomFood(this.snake);
    }
  }
}
