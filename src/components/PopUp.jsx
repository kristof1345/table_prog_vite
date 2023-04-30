import { IoCloseOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const PopUp = ({ setOpenPopUp, tables, setTables }) => {
  const handleFormInput = (e) => {
    e.preventDefault();
    const numOfCells = document.getElementById("num_of_cells");
    const numOfCols = document.getElementById("num_of_col");
    const numOfTables = document.getElementById("num_of_tab");
    setOpenPopUp(false);
    addTable(numOfCells.value, numOfCols.value, numOfTables.value);
  };

  function addTable(numOfCells, numOfCols, numOfTables) {
    let id = "";
    let Cells = [];
    for (let i = 0; i < numOfCells; i++) {
      Cells.push({
        id: "",
        error: "",
        cellValue: "",
      });
    }
    const newTables = [...tables];
    for (let i = 0; i < numOfTables; i++) {
      newTables.push({
        numOfCells,
        numOfCols,
        id: uuidv4(),
        cells: func(Cells),
      });
    }
    newTables.map((table) => {
      table.numOfCols = numOfCols;
      table.numOfCells = numOfCells;
    });
    setTables(newTables);
  }

  function func(Cells) {
    let cellsCopy = JSON.parse(JSON.stringify(Cells));
    for (let i = 0; i < cellsCopy.length; i++) {
      cellsCopy[i].id = uuidv4();
    }
    return cellsCopy;
  }

  return (
    <div className="pop_up-wrapper">
      <div className="pop_up">
        <form id="pop_up-form" onSubmit={handleFormInput}>
          <IoCloseOutline
            className="close-pop_up"
            onClick={() => setOpenPopUp((prev) => !prev)}
          />
          <div className="inputs">
            <div className="input_label">
              <p>Number of cells:</p>
              <input
                type="number"
                className="pop_up-num"
                id="num_of_cells"
                defaultValue="40"
                min="1"
                max="60"
              />
            </div>
            <div className="input_label">
              <p>Number of columns:</p>
              <input
                type="number"
                className="pop_up-num"
                id="num_of_col"
                defaultValue="8"
                min="1"
                max="8"
              />
            </div>
            <div className="input_label">
              <p>Number of tables:</p>
              <input
                type="number"
                className="pop_up-num"
                id="num_of_tab"
                defaultValue="1"
                min="1"
                max="10"
              />
            </div>
          </div>
          <button type="submit" id="add_table-submit">
            Add table
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
