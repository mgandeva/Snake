import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import { Cell } from './models/cell.model';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  STEP_TIME,
} from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { getDirection } from './utilities/direction.utility';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private snake: Snake = new Snake();
  private food: Food = new Food();

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];

  constructor(private snakeService: SnakeService) {}

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(() => {
        this.snake.move();
        this.eatFood();
        runTime();
      }, STEP_TIME);
    };

    runTime();
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    const direction = getDirection(event.key);

    this.snakeService.changeDirection(this.snake, direction);
  }

  getCellClass(row: number, column: number): string {
    const cell = new Cell(row, column);

    if (this.snake.containsCell(cell)) {
      return 'snake-cell';
    }

    if (this.food.cell.equals(cell)) {
      return 'food-cell';
    }

    if ((cell.row + cell.column) % 2 == 0) {
      return 'empty-cell-light';
    }

    return 'empty-cell-middle';
  }

  eatFood() {
    const snakeHead = this.snake.body[0];
    if (
      snakeHead.row === this.food.cell.row &&
      snakeHead.column === this.food.cell.column
    ) {
      this.snake.grow();
      this.food.generateRandomFood(this.snake);
    }
  }
}
