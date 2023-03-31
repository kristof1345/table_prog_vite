import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import SideNav from "../components/SideNav";
import Table from "../components/Table";
import findSame from "../functions/check";
import { v4 as uuidv4 } from "uuid";
import findNonErrors from "../functions/findNonErrors";

const MainPage = ({ tables, setTables }) => {
  const red = "rgb(250, 168, 168)";
  const [openPopUp, setOpenPopUp] = useState(false);
  // const [errorsToRender, setErrorsToRender] = useState(
  //   JSON.parse(localStorage.getItem("errors")) || []
  // );
  // const [nonErrors, setNonErrors] = useState(
  //   JSON.parse(localStorage.getItem("nonErrors")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("errors", JSON.stringify(errorsToRender));
  // }, [errorsToRender]);
  // useEffect(() => {
  //   localStorage.setItem("nonErrors", JSON.stringify(nonErrors));
  // }, [nonErrors]);

  const handleFormInput = (e) => {
    e.preventDefault();
    const numOfCells = document.getElementById("num_of_cells");
    const numOfCols = document.getElementById("num_of_col");
    const numOfTables = document.getElementById("num_of_tab");
    setOpenPopUp(false);
    addTable(numOfCells.value, numOfCols.value, numOfTables.value);
  };

  function addTable(numOfCells, numOfCols, numOfTables) {
    const errors = [...errorsToRender];
    const nonerrors = [...nonErrors];
    let id = "";
    let cells = [];
    for (let i = 0; i < numOfCells; i++) {
      cells.push({
        id: "",
        error: "",
        cellValue: "",
      });
    }
    const newTables = [...tables];
    for (let i = 0; i < numOfTables; i++) {
      newTables.push({ numOfCells, numOfCols, errors, id, nonerrors, cells });
    }
    newTables.map((table) => {
      table.numOfCols = numOfCols;
      table.numOfCells = numOfCells;
      table.errors = errorsToRender;
      table.id = uuidv4();
      table.nonerrors = nonErrors;
      table.cells.map((cell, i) => {
        cell.id = uuidv4();
      });
    });
    setTables(newTables);
  }

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
    console.log(errIDs);
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
        <div id="pop_up-wrapper">
          <div id="pop_up">
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
      )}
      <SideNav tables={tables} />
      <div className="main-content">
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
          <button id="add_tables" onClick={() => setOpenPopUp((prev) => !prev)}>
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
