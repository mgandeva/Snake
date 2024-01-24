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
  gameOver: boolean = false;
  score = 0;
  highscores: Highscore = new Highscore();

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];

  constructor(private snakeService: SnakeService) {}

  ngOnInit(): void {
    this.highscores.addNewHighscore({ name: 'M', score: 200 });
    this.highscores.addNewHighscore({ name: 'N', score: 200 });
    this.highscores.addNewHighscore({ name: 'P', score: 300 });
    this.highscores.addNewHighscore({ name: 'Q', score: 200 });

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
}
