import { Component, HostListener, OnInit } from '@angular/core';
import { Direction, Snake } from './gameplay/Snake';
import { Food } from './gameplay/Food';

const CELL_WIDTH = 30;
const SIZE = 20;
const TIME = 100;

function getDirection(key: string) {
  switch (key) {
    case 'ArrowLeft':
      return Direction.LEFT;
    case 'ArrowUp':
      return Direction.UP;
    case 'ArrowRight':
      return Direction.RIGHT;
    case 'ArrowDown':
      return Direction.DOWN;
    default:
      return Direction.RIGHT;
  }
}

@Component({
  selector: 'snake-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private size = SIZE;
  private cellWidth = CELL_WIDTH;
  private timestep = TIME;
  private cells = new Array(this.size * this.size);

  private snake: Snake = new Snake();
  private food: Food = new Food();

  public cellWidthStyle = {
    width: `${this.size * this.cellWidth + 70}px`,
  };

  get getCells() {
    return this.cells;
  }

  ngOnInit(): void {
    const runTime = () => {
      setTimeout(() => {
        this.move();
        runTime();
      }, this.timestep);
    };

    runTime();
  }

  move() {
    this.snake.moveSnake(this.size);
  }

  getCellStyle(index: number) {
    const snakeBackground = this.snake.isSnakeCell(index) ? 'green' : null;
    const foodBackground = this.food.position === index ? 'red' : null;
    const defaultBackground = '#ccc';
    return {
      width: `${this.cellWidth}px`,
      height: `${this.cellWidth}px`,
      background: snakeBackground || foodBackground || defaultBackground,
    };
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(e: KeyboardEvent) {
    const dir = getDirection(e.key);

    this.changeDirection(dir);
  }

  changeDirection(direction: Direction) {
    if (direction) {
      const canChangeDir = this.canChangeToGivenDirection(
        direction,
        this.snake.direction
      );
      if (canChangeDir) {
        this.snake.direction = direction;
        this.move();
      }
    }
  }

  canChangeToGivenDirection(
    wantedDirection: Direction,
    givenDirection: Direction
  ) {
    const directions = [wantedDirection, givenDirection];
    const filteredSameDirection = directions.filter(
      (dir) => dir === Direction.LEFT || dir === Direction.RIGHT
    ).length;
    const onlyOneDir =
      filteredSameDirection === 2 || filteredSameDirection === 0;

    return !onlyOneDir;
  }
}
