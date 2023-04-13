import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Table from "../components/Table";
import PopUp from "../components/PopUp";
import Header from "../components/Header";

const MainPage = ({ tables, setTables }) => {
  const red = "rgb(250, 168, 168)";
  const [openPopUp, setOpenPopUp] = useState(false);

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
        <Header
          setOpenPopUp={setOpenPopUp}
          tables={tables}
          setTables={setTables}
        />
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
