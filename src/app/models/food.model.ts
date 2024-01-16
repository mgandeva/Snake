import { Cell } from "./cell.model";

export class Food {
  public cell: Cell;
  
  constructor() {
    this.cell = new Cell(10, 10);
  }
}
