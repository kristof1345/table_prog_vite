import findSame from "../functions/check";
import findNonErrors from "../functions/findNonErrors";

const Header = ({ setOpenPopUp, tables, setTables, setOpenFillPopUp }) => {
  const clearAllTables = () => {
    const allCells = document.getElementsByClassName("cell");
    [...allCells].map((cell) => (cell.value = ""));
    let newTables = [...tables];
    newTables.map((table) => {
      table.cells.map((cell) => {
        cell.error = "";
        cell.cellValue = "";
      });
    });
    setTables(newTables);
  };

  const convertErrors = (prop) => {
    const errorsReturned = prop;
    const errIDs = errorsReturned.map((err) => err.id);
    let newTables = [...tables];
    errorsReturned.map((err) => {
      newTables.map((table) => {
        table.cells.map((cell) => {
          if (cell.id === err.id) {
            cell.error = err.value;
            setTables(newTables);
          }
        });
      });
    });
    newTables.map((table) => {
      table.cells.map((cell) => {
        if (!errIDs.includes(cell.id)) {
          cell.error = "";
          setTables(newTables);
        }
      });
    });
  };

  const convertNonErrors = (prop) => {
    const cellsReturned = prop.cells;
    const emptyCellsReturned = prop.empty;
    let newTables = [...tables];
    cellsReturned.map((returned) => {
      newTables.map((table) => {
        table.cells.map((cell) => {
          if (cell.id === returned.id && cell.error == "") {
            cell.cellValue = returned.value;
            setTables(newTables);
          }
        });
      });
    });

    emptyCellsReturned.map((empty) => {
      newTables.map((table) => {
        table.cells.map((cell) => {
          if (cell.id === empty.id) {
            cell.cellValue = "";
            cell.error = "";
            setTables(newTables);
          }
        });
      });
    });
  };

  const configureAndSet = (setFunc) => {
    if (tables.length) {
      setFunc((prev) => !prev);
    } else {
      alert("Please add a table first");
    }
  };

  return (
    <div className="glass-header">
      <div className="site-functions">
        <button
          id="check"
          className="nav-item"
          onClick={() => {
            findSame;
            convertErrors(findSame());
            convertNonErrors(findNonErrors());
          }}
        >
          Check/Save
        </button>
        <button id="add_tables" onClick={() => setOpenPopUp((prev) => !prev)}>
          Add Table
        </button>
        <button
          id="clear_all_tables"
          className="nav-item"
          onClick={() =>
            confirm("Sure want to clear all the tables?") == true
              ? clearAllTables()
              : null
          }
        >
          Clear All Tables
        </button>
        <button
          id="fill_tables"
          className="nav-item"
          onClick={() => configureAndSet(setOpenFillPopUp)}
        >
          Fill Tables
        </button>
      </div>
    </div>
  );
};

export default Header;
