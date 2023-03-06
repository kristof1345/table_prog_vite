import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import SideNav from "../components/SideNav";
import Table from "../components/Table";
import findSame from "../functions/check";

const MainPage = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [errorsToRender, setErrorsToRender] = useState([]);
  const [tables, setTables] = useState([]);

  const handleFormInput = (e) => {
    e.preventDefault();
    const numOfCells = document.getElementById("num_of_cells");
    const numOfCols = document.getElementById("num_of_col");
    const numOfTables = document.getElementById("num_of_tab");
    setOpenPopUp(false);
    addTable(numOfCells.value, numOfCols.value, numOfTables.value);
  };

  function addTable(numOfCells, numOfCols, numOfTables) {
    // const newTables = [{ numOfCells, numOfCols }, ...tables]; // //og version
    const newTables = [...tables];
    for (let i = 0; i < numOfTables; i++) {
      // used for num of tables functionality
      newTables.push({ numOfCells, numOfCols });
    }
    newTables.map((table) => {
      table.numOfCols = numOfCols;
      table.numOfCells = numOfCells;
    });
    setTables(newTables);
  }

  const clearAllTables = () => {
    const allCells = document.getElementsByClassName("cell");
    [...allCells].map((cell) => (cell.value = ""));
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
              setErrorsToRender(findSame());
            }}
          >
            Check
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
            <Table key={index} table={table} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
