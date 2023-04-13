import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Table from "../components/Table";
import findSame from "../functions/check";
import findNonErrors from "../functions/findNonErrors";
import PopUp from "../components/PopUp";

const MainPage = ({ tables, setTables }) => {
  const red = "rgb(250, 168, 168)";
  const [openPopUp, setOpenPopUp] = useState(false);

  const clearAllTables = () => {
    const allCells = document.getElementsByClassName("cell");
    [...allCells].map((cell) => (cell.value = ""));
  };

  useEffect(() => {
    tables.map((table) => {
      table.cells.map((cell) => {
        let domCell = document.getElementById(cell.id);
        if (domCell === null) {
          return;
        } else if (!cell.error == "") {
          domCell.style.backgroundColor = red;
          domCell.value = cell.error;
        } else if (!cell.cellValue == "") {
          domCell.style.backgroundColor = "transparent";
          domCell.value = cell.cellValue;
        }
      });
    });
  });

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

  return (
    <div className="App">
      {openPopUp && (
        <PopUp
          setOpenPopUp={setOpenPopUp}
          tables={tables}
          setTables={setTables}
        />
      )}
      <SideNav tables={tables} />
      <div className="main-content">
        <div className="glass-header">
          <div className="site-functions">
            <button
              id="check"
              onClick={() => {
                findSame;
                convertErrors(findSame());
                convertNonErrors(findNonErrors());
              }}
            >
              Check/Save
            </button>
            <button
              id="add_tables"
              onClick={() => setOpenPopUp((prev) => !prev)}
            >
              Add Table
            </button>
            <button
              id="clear_all_tables"
              onClick={() =>
                confirm("Sure want to clear all the tables?") == true
                  ? clearAllTables()
                  : null
              }
            >
              Clear All Tables
            </button>
          </div>
        </div>
        <div className="boxes">
          {tables.map((table, index) => (
            <Table
              key={index}
              table={table}
              index={index}
              tables={tables}
              setTables={setTables}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
