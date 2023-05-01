export default function findNonErrors() {
  const cells = document.querySelectorAll(".cell");
  const nonerrors = [];
  const emptyHolder = [];
  for (let i = 1; i < cells.length + 1; i++) {
    //41 because we have 40 cells in each table
    let sameCells = [...cells] //Cells that contain text and have matching ids
      .filter((cell) => cell.dataset.index === i.toString())
      .filter((cell) => cell.value !== "");
    let emptyCells = [...cells] //Cells that contain text and have matching ids
      .filter((cell) => cell.dataset.index === i.toString())
      .filter((cell) => cell.value == "");

    if (sameCells.length > 0) {
      nonerrors.push(sameCells);
    }
    if (emptyCells.length > 0) {
      emptyHolder.push(emptyCells);
    }
  }
  const nonErrors = [...new Set(nonerrors)];
  const emptyCells = [...new Set(emptyHolder)];
  return { cells: nonErrors.flat(), empty: emptyCells.flat() };
}
