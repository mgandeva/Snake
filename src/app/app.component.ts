import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  MAX_FRAME_TIME,
  FRAME_TIME_STEP,
  MIN_FRAME_TIME,
} from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { Grid } from './models/grid.model';
import { Highscore } from './models/highscore.model';
import { DirectionHelper } from './helpers/direction.helper';
import { FrameTimeUpdateType } from './enums/frameTimeUpdateType.enum';
import { Wall } from './models/wall.model';
import { WallService } from './services/wall.service';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private grid: Grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  private snake: Snake = new Snake(this.grid);
  private food: Food = new Food(this.grid);
  private frameTime = MAX_FRAME_TIME;
  private walls: Wall[];

  private isPaused = true;

  playerName: string = '';
  shouldEnterHighscore = false;
  score = 0;
  highscores: Highscore = new Highscore();

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];

  constructor(
    private directionHelper: DirectionHelper,
    private snakeService: SnakeService,
    private wallService: WallService
  ) {
    this.walls = wallService.generateWalls(this.grid, this.snake, this.food);
  }

  ngOnInit(): void {
    this.runTime();
  }

  private runTime() {
    setTimeout(() => {
      if (!this.isPaused) {
        this.snake.move();
      }

      if (!this.isGameOver()) {
        this.eatFood();
        this.runTime();
      } else {
        this.shouldEnterHighscore = this.highscores.isHighscore(this.score);
      }
    }, this.frameTime);
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (
      this.isGameOver() &&
      this.shouldEnterHighscore &&
      event.key === 'Enter'
    ) {
      this.highscores.addNewHighscore({
        name: this.playerName,
        score: this.score,
      });
      this.shouldEnterHighscore = false;
    }

    if (this.isGameOver() && event.key === ' ') {
      this.reset();
      return;
    }

    if (event.key === 'P' || event.key === 'p') {
      this.isPaused = !this.isPaused;
      return;
    }

    if (
      this.isPaused &&
      this.directionHelper.getDirection(event.key, this.snake.movementDirection)
    ) {
      this.isPaused = false;
    }

    const direction = this.directionHelper.getDirection(
      event.key,
      this.snake.movementDirection
    );

    if (direction === this.snake.movementDirection) {
      this.updateFrameTime(FrameTimeUpdateType.Decrease);
      return;
    }

    const snakeMovementDirectionOpposite =
      this.directionHelper.getOppositeDirection(this.snake.movementDirection);
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

    const isCellWall = this.walls.some((wall) =>
      wall.cells.some((wallCell) => wallCell == cell)
    );
    if (isCellWall) {
      return 'wall-cell';
    }

    if (cell.isLightColoured()) {
      return 'empty-cell-light';
    }

    return 'empty-cell-middle';
  }

  isGameOver(): boolean {
    return (
      this.snake.hasEatenSelf() ||
      this.snake.getHead() === this.grid.getOutOfBoundsCell() ||
      this.walls.some((wall) => wall.hasColision(this.snake))
    );
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
    const updatedFrameTime =
      this.frameTime + FRAME_TIME_STEP * frameTimeUpdateType;
    if (
      updatedFrameTime < MIN_FRAME_TIME ||
      updatedFrameTime > MAX_FRAME_TIME
    ) {
      return;
    }

    this.frameTime = updatedFrameTime;
  }

  private reset() {
    this.snake = new Snake(this.grid);
    this.shouldEnterHighscore = false;
    this.playerName = '';
    this.score = 0;
    this.frameTime = FRAME_TIME_STEP;
    this.isPaused = true;
    this.runTime();
  }
}
