export function upperNeighbor(
  cell: number,
  dimension: number,
  cellSize: number
): number {
  const props = getNeighborCellProperties(cell, cellSize, dimension);
  return (
    ((cell + props.distanceToNeighbor) % props.rangelength) + props.rangestart
  );
}

export function lowerNeighbor(
  cell: number,
  dimension: number,
  cellSize: number
): number {
  const props = getNeighborCellProperties(cell, cellSize, dimension);
  return (
    ((cell - props.distanceToNeighbor + props.rangelength) %
      props.rangelength) +
    props.rangestart
  );
}

function getNeighborCellProperties(
  cell: number,
  cellSize: number,
  dimension: number
) {
  const rangelength = Math.pow(cellSize, dimension);
  return {
    distanceToNeighbor: Math.pow(cellSize, dimension - 1),
    rangelength: rangelength,
    rangestart: Math.floor(cell / rangelength) * rangelength,
  };
}
