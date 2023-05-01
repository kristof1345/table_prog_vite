export default function fillCells(values) {
  const fillableValues = JSON.parse(JSON.stringify(values));
  const cells = document.querySelectorAll(".cell");
  [...cells].map((cell, i) => {
    const randIdx = getRandomInt(fillableValues.length);
    cell.value = fillableValues[randIdx];
  });
  [...cells].map((cell, i) => {
    let sameCells = [...cells].filter(
      (cell) => cell.dataset.index === (i + 1).toString()
    );
    while (checkForMatch(cell, sameCells)) {
      const randIdx = getRandomInt(fillableValues.length);
      cell.value = fillableValues[randIdx];
    }
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const checkForMatch = (cell, arr) => {
  // console.log(cell, arr);
  let arra = [...arr];
  let CellInd = arr.indexOf(cell);
  let el = arra.splice(CellInd, 1);
  const x = arra.map((item) => {
    //Returns an array of booleans
    if (item.value === cell.value) {
      return true;
    } else {
      return false;
    }
  });
  return x.includes(true); //if array of booleans includes at least one "true" there is a match for this nonMatch cell
};
