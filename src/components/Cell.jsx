import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Cell = ({ index, id }) => {
  // console.log(id);
  return (
    <div className="cell-wrapper">
      <span className="cell-index">{index}</span>
      <input type="text" className="cell" data-index={index} id={id} />
    </div>
  );
};

export default Cell;
