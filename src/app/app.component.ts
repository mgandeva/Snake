import { Component, HostListener, OnInit } from '@angular/core';
import { Food } from './models/food.model';
import { Snake } from './models/snake.model';
import { GRID_COLUMNS, GRID_ROWS, MAX_FRAME_TIME, FRAME_TIME_STEP, MIN_FRAME_TIME } from './constants/game-settings.constants';
import { SnakeService } from './services/snake.service';
import { getDirection } from './utilities/direction.utility';
import { Grid } from './models/grid.model';

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private grid: Grid = new Grid(GRID_ROWS, GRID_COLUMNS);
  private snake: Snake = new Snake(this.grid);
  private food: Food = new Food(this.grid.getCell(10, 10));
  private frameTime = MAX_FRAME_TIME;

  rows: number[] = [...Array(GRID_ROWS).keys()];
  columns: number[] = [...Array(GRID_COLUMNS).keys()];

  constructor(private snakeService: SnakeService) {}

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(
        () => {
          this.snake.move();

          if(!this.isGameOver()){
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
    const direction = getDirection(event.key);

    if (direction === this.snake.movementDirection) {
      this.decreaseFrameTime();
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

    if (cell.isLightColoured()) {
      return 'empty-cell-light';
    }

    return 'empty-cell-middle';
  }

  private isGameOver(): boolean {
    return false;
  }

  private decreaseFrameTime() {
    if (this.frameTime === MIN_FRAME_TIME) {
      return;
    }

    this.frameTime -= FRAME_TIME_STEP;
  }
}
