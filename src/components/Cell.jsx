import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Cell = ({ index }) => {
  return (
    <div className="cell-wrapper">
      <span className="cell-index">{index}</span>
      <input type="text" className="cell" data-index={index} />
    </div>
  );
};

export default Cell;
