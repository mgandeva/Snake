import { Direction } from "../enums/direction.enum";
import { Cell } from "./cell.model";
import { Grid } from "./grid.model";

export class Snake {
    private headIndex: number = 0;
    private body: Cell[];
    private facing: Direction = Direction.RIGHT;
    private movementDirection: Direction = Direction.RIGHT;

    constructor(grid: Grid){
        this.body = [grid.getCell(0, 7), grid.getCell(0,6), grid.getCell(0,5)];
    }

    getFacing() : Direction {
        return this.facing;
    }

    getMovementDirection() : Direction {
        return this.movementDirection;
    }

    setMovementDirection(direction: Direction): void {
        this.movementDirection = direction;
    }
  
    containsCell(cell: Cell): boolean {
      return this.body.some(snakeCell => snakeCell === cell);
    }
  
    move() {
        this.body = this.body.map((cell: Cell, index: number) => {
            if (index === this.headIndex) {
                this.facing = this.movementDirection;
                return cell.getNeighbour(this.movementDirection);
            }
            
            return this.body[index - 1];
        });
    }

    hasEatenSelf(): boolean {
        const [head, ...tail] = this.body;

        if(tail.some(tailCell => tailCell === head))
            return true;
        return false;
    }
}
