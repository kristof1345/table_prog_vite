export default function findNonErrors() {
  const cells = document.querySelectorAll(".cell");
  const nonerrors = [];
  for (let i = 1; i < cells.length + 1; i++) {
    //41 because we have 40 cells in each table
    let sameCells = [...cells] //Cells that contain text and have matching ids
      .filter((cell) => cell.dataset.index === i.toString())
      .filter((cell) => cell.value !== "");

    if (sameCells.length > 0) {
      nonerrors.push(sameCells);
    }
  }
  const nonErrors = [...new Set(nonerrors)];
  return nonErrors.flat();
}
