import React, { useEffect } from "react";
import Cell from "./Cell";

const Table = ({ table, index, tables, setTables }) => {
  const deleteTable = (el) => {
    let ind = el.parentElement.parentElement.id;
    const newTables = tables.filter((item) => item.id !== ind);
    // let tablesCopy = [...tables];
    // console.log(tablesCopy);
    // const objWithIdIndex = tablesCopy.findIndex((obj) => obj.id === ind);
    // console.log(objWithIdIndex);
    // if (objWithIdIndex > -1) {
    //   tablesCopy.splice(objWithIdIndex, 1);
    // }
    // setTables(tablesCopy);
    // console.log(tablesCopy);
    setTables(newTables);
  };

  const clearTable = (el) => {
    const cells = el.querySelectorAll(".cell");
    [...cells].map((cell) => (cell.value = ""));
  };

  useEffect(() => {
    const cells = document.querySelectorAll(".cell");
    // if(cells != null) {
    [...cells].map((cell, index) => {
      cell.id = `err${index}`;
    });
    // }
  });

  return (
    <div
      className="box"
      data-box={`${index + 1}`}
      // style={{ gridTemplateColumns: `repeat( ${+table.numOfCols}, 1fr)` }}
      id={table.id}
    >
      {[...Array(+table.numOfCells)].map((x, i) => (
        <Cell key={i} index={i + 1} />
      ))}
      <div className="table_nav">
        <button
          className="clear_table"
          onClick={(e) =>
            confirm("Sure you want to clear this table?") == true
              ? clearTable(e.target.parentElement.parentElement)
              : null
          }
        >
          {/* Clear */}
          {table.id}
        </button>
        <button
          className="delete_table"
          onClick={(e) =>
            confirm("Sure you want to delete this table?") == true
              ? deleteTable(e.target)
              : null
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Table;
