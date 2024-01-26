export class CellPosition {
    protected _row: number;
    protected _column: number;

    constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }

    get row() {
        return this._row;
    }

    get column() {
        return this._column;
    }

    isLightColoured(): boolean {
        return (this._row + this._column) % 2 === 0;
    }
}
