import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import {
  FRAME_TIME_STEP,
  GRID_COLUMNS,
  GRID_ROWS,
  MAX_FRAME_TIME,
  MIN_FRAME_TIME
} from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { Grid } from './models/grid.model';
import { Wall } from './models/wall.model';
import { WallService } from './services/wall.service';
import { DirectionHelper } from './helpers/direction.helper';
import { FrameTimeUpdateType } from './enums/frameTimeUpdateType.enum';
import { Cell } from './models/cell.model';
import { RandomHelper } from './helpers/random.helper';
import { Direction } from './enums/direction.enum';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private grid: Grid = new Grid(GRID_ROWS, GRID_COLUMNS, this.randomHelper);
  private snake: Snake = new Snake(this.grid);
  private frameTime = MAX_FRAME_TIME;
  private food: Food;
  private walls: Wall[];

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];
  score = 0;

  constructor(
    private snakeService: SnakeService, 
    private wallService: WallService,
    private directionHelper: DirectionHelper,
    private randomHelper: RandomHelper
  ) {
    this.walls = wallService.generateWalls(this.grid, this.snake);
    this.food = new Food(this.grid, this.snake, this.walls);
  }

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(
        () => {
          this.snake.move();

          if(!this.isGameOver()) {
            this.eatFood();
            runTime();
          }
        }, 
        this.frameTime
      );
    };

    runTime();
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    const direction = this.directionHelper.getDirection(event.key);

    if (direction === this.snake.movementDirection) {
      this.updateFrameTime(FrameTimeUpdateType.Decrease);
      return;
    }

    const snakeMovementDirectionOpposite = this.directionHelper.getOppositeDirection(this.snake.movementDirection);
    if (direction === snakeMovementDirectionOpposite) {
      this.updateFrameTime(FrameTimeUpdateType.Increase);
      return;
    }

    direction && this.snakeService.changeDirection(this.snake, direction);
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
    if(this.snake.head === this.grid.getOutOfBoundsCell()){
        return true;
    }

      if (this.snake.hasEatenSelf()) {
      return true;
    }
    
    return this.walls.some(wall => wall.hasColision(this.snake));
  }

  private eatFood() {
    if (this.snake.head === this.food.cell) {
      this.snake.grow(this.grid);
      this.score += 10;
      this.food.generateRandomFood(this.snake, this.walls);
    }
  }

  private updateFrameTime(frameTimeUpdateType: FrameTimeUpdateType) {
    const updatedFrameTime = this.frameTime + FRAME_TIME_STEP * frameTimeUpdateType;
    if (updatedFrameTime < MIN_FRAME_TIME || updatedFrameTime > MAX_FRAME_TIME) {
      return;
    }

    this.frameTime = updatedFrameTime;
  }
}
