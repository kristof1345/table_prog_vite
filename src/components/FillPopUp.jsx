import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import fillCells from "../functions/fillCells";

const FillPopUp = ({ setOpenFillPopUp }) => {
  const [numOCols, setNumOCols] = useState(0);

  const handleFillInput = (e) => {
    e.preventDefault();
    const inputs = document.getElementsByClassName("pop_up-text");
    let ret = [...inputs].map((input) => input.value);
    fillCells(ret);
  };

  return (
    <div className="pop_up-wrapper">
      <div className="pop_up">
        <form id="pop_up-form" onSubmit={handleFillInput}>
          <IoCloseOutline
            className="close-pop_up"
            onClick={() => setOpenFillPopUp((prev) => !prev)}
          />
          <p>How many columns do you want to fill?</p>
          <input
            className="cols-to-fill pop_up-num"
            type="number"
            min="1"
            max="14"
            onChange={(e) => setNumOCols(e.target.value)}
          />
          <p>
            Fill these inputs with the values you want to use. The values
            ideally should be different.
          </p>
          <div className="inputs" style={{ rowGap: "5px", marginTop: "5px" }}>
            {Array.apply(null, { length: numOCols }).map((e, i) => (
              <input type="text" className="pop_up-text" key={i} />
            ))}
          </div>
          <button type="submit" id="add_table-submit">
            Fill Tables With Values
          </button>
        </form>
      </div>
    </div>
  );
};

export default FillPopUp;
