import { CellPosition } from '../models/cell-position.model';

export const MIN_WALLS_COUNT = 1;

export const MAX_WALLS_COUNT = 3;

export const WALL_TEMPLATES = [
    [new CellPosition(0, 0), new CellPosition(0, 1)],
    [new CellPosition(0, 0), new CellPosition(1, 0)],
    [new CellPosition(0, 0), new CellPosition(0, 1), new CellPosition(0, 2)],
    [new CellPosition(0, 0), new CellPosition(1, 0), new CellPosition(2, 0)]
];
