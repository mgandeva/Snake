import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  HIGHSCORE_LIST_LENGTH,
  STEP_TIME,
} from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { getDirection } from './utilities/direction.utility';
import { Grid } from './models/grid.model';
import { Highscore } from './models/highscore.model';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private grid: Grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  private snake: Snake = new Snake(this.grid);
  private food: Food = new Food(this.grid);
  playerName: string = '';
  shouldEnterHighscore = false;
  score = 0;
  highscores: Highscore = new Highscore();

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];

  constructor(private snakeService: SnakeService) {}

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(() => {
        this.snake.move();
        if (!this.isGameOver()) {
          this.eatFood();
          runTime();
        } else {
          this.shouldEnterHighscore = this.highscores.isHighscore(this.score);
        }
      }, STEP_TIME);
    };

    runTime();
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
      this.reset();
    }
    const direction = getDirection(event.key);

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

    if (cell.isLightColoured()) {
      return 'empty-cell-light';
    }

    return 'empty-cell-middle';
  }

  isGameOver(): boolean {
    return false;
  }

  eatFood() {
    const snakeHead = this.snake.body[0];
    if (snakeHead === this.food.cell) {
      this.snake.grow(this.grid);
      this.score += 10;
      this.food.generateRandomFood(this.snake);
    }
  }

  private reset() {
    this.snake = new Snake(this.grid);
    this.shouldEnterHighscore = false;
    this.playerName = '';
    this.score = 0;
  }
}
