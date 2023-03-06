import React from "react";
import Cell from "./Cell";

const Table = ({ table, index }) => {
  const deleteTable = (el) => {
    el.remove();
  };

  const clearTable = (el) => {
    const cells = el.querySelectorAll(".cell");
    [...cells].map((cell) => (cell.value = ""));
  };

  return (
    <div
      className="box"
      data-box={`${index + 1}`}
      style={{ gridTemplateColumns: `repeat( ${+table.numOfCols}, 1fr)` }}
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
          Clear
        </button>
        <button
          className="delete_table"
          onClick={(e) =>
            confirm("Sure you want to delete this table?") == true
              ? deleteTable(e.target.parentElement.parentElement)
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
