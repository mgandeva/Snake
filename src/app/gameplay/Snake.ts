import { lowerNeighbor, upperNeighbor } from './utils';

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface SnakeCell {
  prevPosition: number;
  position: number;
}

const INITIAL_SNAKE_COORDINATES = [
  {
    position: 3,
    prevPosition: 2,
  },
  {
    position: 2,
    prevPosition: 1,
  },
  {
    position: 1,
    prevPosition: 0,
  },
];

export class Snake {
  public direction: Direction = Direction.RIGHT;

  private snakeBody: SnakeCell[] = INITIAL_SNAKE_COORDINATES;

  get head() {
    return this.snakeBody[0];
  }

  get tail() {
    const [_, ...tail] = this.snakeBody;
    return tail;
  }

  updateSnake(newPos: number) {
    this.head.prevPosition = this.head.position;
    this.head.position = newPos;

    this.tail.forEach((snakeCell, index) => {
      snakeCell.prevPosition = snakeCell.position;
      snakeCell.position = this.snakeBody[index].prevPosition;
    });
  }

  isSnakeCell(position: number) {
    return this.snakeBody.find((snakeCell) => snakeCell.position === position);
  }

  moveSnake(cellSize: number) {
    const headPosition = this.head.position;
    switch (this.direction) {
      case Direction.LEFT:
        return this.updateSnake(lowerNeighbor(headPosition, 1, cellSize));
      case Direction.RIGHT:
        return this.updateSnake(upperNeighbor(headPosition, 1, cellSize));
      case Direction.UP:
        return this.updateSnake(lowerNeighbor(headPosition, 2, cellSize));
      case Direction.DOWN:
        return this.updateSnake(upperNeighbor(headPosition, 2, cellSize));
      default:
        throw new Error('Unknown direction');
    }
  }
}
