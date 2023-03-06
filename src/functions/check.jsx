//? Find errors start
//* Main Function
function findSame() {
  const red = "rgb(250, 168, 168)";
  const cells = document.querySelectorAll(".cell");
  const errors = [];
  for (let i = 1; i < cells.length + 1; i++) {
    //41 because we have 40 cells in each table
    let sameCells = [...cells] //Cells that contain text and have matching ids
      .filter((cell) => cell.dataset.index === i.toString())
      .filter((cell) => cell.value !== "");

    let emptyCells = [...cells] //Cells that do not contain text and have matching ids
      .filter((cell) => cell.dataset.index === i.toString())
      .filter((cell) => cell.value === "");

    emptyCells.map((emptyCell) => {
      //Reset previous errors to default
      emptyCell.style.backgroundColor = "transparent";
    });

    if (sameCells.length !== 0) {
      sameCells.map((cell, index) => {
        let matches = []; //Cells with matching text
        let nonMatches; //Cells with non matching text
        let sameCellsCopy = [...sameCells];

        let el = sameCellsCopy.splice(index, 1); //Deleting the curr cell

        sameCellsCopy.map((item) => {
          //Mapping through the rest of the cells
          if (item.value === cell.value) {
            //If curr cell and some other cell have the same values
            matches.push(item); //Push them to matches
          }
        });

        //err1:
        if (matches.length === 0) {
          cell.style.backgroundColor = "transparent";
        }

        if (matches.length > 0) {
          //If there are cells with matching text
          matches.push(cell);

          matches.map((elem) => {
            elem.style.backgroundColor = red;
          });

          errors.push(...matches);

          const toDeleteSet = new Set(matches); //Making a set

          nonMatches = sameCells.filter((name) => {
            //All the cells that are not a match
            return !toDeleteSet.has(name); //Because of this .has() function
          });
        }

        if (nonMatches !== undefined) {
          //If there are cells that are not a match
          nonMatches.map((nonMatch) => {
            //Map through them
            if (checkForMatch(nonMatch, sameCells)) {
              //Complications
              return;
            } else {
              nonMatch.style.backgroundColor = "transparent";
            }
          });
        }
      });
    }
  }
  const Errors = [...new Set(errors)];
  return Errors;
}

//* Helping function
const checkForMatch = (cell, arr) => {
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
//? Find errors end

export default findSame;
