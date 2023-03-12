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
  const [errorsToRender, setErrorsToRender] = useState(
    JSON.parse(localStorage.getItem("errors")) || []
  );
  const [nonErrors, setNonErrors] = useState(
    JSON.parse(localStorage.getItem("nonErrors")) || []
  );

  useEffect(() => {
    localStorage.setItem("errors", JSON.stringify(errorsToRender));
  }, [errorsToRender]);
  useEffect(() => {
    localStorage.setItem("nonErrors", JSON.stringify(nonErrors));
  }, [nonErrors]);

  const handleFormInput = (e) => {
    e.preventDefault();
    const numOfCells = document.getElementById("num_of_cells");
    const numOfCols = document.getElementById("num_of_col");
    const numOfTables = document.getElementById("num_of_tab");
    setOpenPopUp(false);
    addTable(numOfCells.value, numOfCols.value, numOfTables.value);
  };

  function addTable(numOfCells, numOfCols, numOfTables) {
    // const errorIds = errorsToRender.map((error) => error.id);
    const errors = [...errorsToRender];
    const nonerrors = [...nonErrors];
    let id = "";
    // const newTables = [{ numOfCells, numOfCols }, ...tables]; // //og version
    const newTables = [...tables];
    // used for num of tables functionality
    for (let i = 0; i < numOfTables; i++) {
      newTables.push({ numOfCells, numOfCols, errors, id, nonerrors });
    }
    newTables.map((table) => {
      table.numOfCols = numOfCols;
      table.numOfCells = numOfCells;
      table.errors = errorsToRender;
      table.id = uuidv4();
      table.nonerrors = nonErrors;
    });
    setTables(newTables);
  }

  useEffect(() => {
    if (errorsToRender == []) {
      return;
    } else {
      const newTables = [...tables];
      newTables.map((table) => {
        table.errors = [...errorsToRender];
      });
      setTables(newTables);
    }
  }, [errorsToRender]);

  useEffect(() => {
    if (nonErrors == []) {
      return;
    } else {
      const newTables = [...tables];
      newTables.map((table) => {
        table.nonerrors = [...nonErrors];
      });
      setTables(newTables);
    }
  }, [nonErrors]);

  const clearAllTables = () => {
    const allCells = document.getElementsByClassName("cell");
    [...allCells].map((cell) => (cell.value = ""));
  };

  useEffect(() => {
    tables.map((table) => {
      table.errors.map((error) => {
        let el = document.getElementById(error.errid);
        if (el === null) {
          return;
        } else {
          el.style.backgroundColor = red;
          el.value = error.text;
        }
      });
      table.nonerrors.map((nonerror) => {
        let el = document.getElementById(nonerror.errid);
        if (el === null) {
          return;
        } else {
          el.style.backgroundColor = "transparent";
          el.value = nonerror.text;
        }
      });
    });
  });

  const convertErrors = (prop) => {
    const errorsReturned = prop;
    const completeErrors = [];
    errorsReturned.map((err) => {
      let errid = err.id;
      let text = err.value;
      completeErrors.push({ errid, text });
    });
    setErrorsToRender(completeErrors);
  };

  const convertNonErrors = (prop) => {
    const cellsReturned = prop;
    const convertedCells = [];
    cellsReturned.map((cell) => {
      let errid = cell.id;
      let text = cell.value;
      convertedCells.push({ errid, text });
    });
    const NonErrors = [...convertedCells];
    convertedCells.map((cel) => {
      errorsToRender.map((err) => {
        if (cel.errid === err.errid) {
          let ind = NonErrors.indexOf(cel);
          NonErrors.splice(ind, 1);
        }
      });
    });
    setNonErrors(NonErrors);
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
      <SideNav errors={errorsToRender} />
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
              setErrorsToRender={setErrorsToRender}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
