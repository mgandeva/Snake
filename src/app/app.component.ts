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
  private frameTime = MAX_FRAME_TIME;

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];
  score = 0;

  constructor(
    private snakeService: SnakeService, 
      private wallService: WallService,
      private directionHelper: DirectionHelper
  ) {
    this.walls = wallService.generateWalls(this.grid, this.snake, this.food);
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

    this.snakeService.changeDirection(this.snake, direction);
  }

  getGridCellClass(row: number, column: number): string {
    const cell = this.grid.getCell(row, column);

    if (this.snake.containsCell(cell)) {
      return 'snake-cell';
    }

    if (this.food.cell === cell) {
      return 'food-cell';
    }

    const isCellWall = this.walls.some(wall => 
      wall.cells.some(wallCell => wallCell == cell));
    if (isCellWall) {
      return 'wall-cell';
    }

    if (cell.isLightColoured()) {
      return 'empty-cell-light';
    }

    return 'empty-cell-middle';
  }

  isGameOver(): boolean {
    if(this.snake.getHead() === this.grid.getOutOfBoundsCell()){
        return true;
    }

      if (this.snake.hasEatenSelf()) {
      return true;
    }
    
    return this.walls.some(wall => wall.hasColision(this.snake));
  }

  eatFood() {
    const snakeHead = this.snake.body[0];
    if (snakeHead === this.food.cell) {
      this.snake.grow(this.grid);
      this.score += 10;
      this.food.generateRandomFood(this.snake);
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
