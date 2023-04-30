import { IoCloseOutline } from "react-icons/io5";

const FillPopUp = ({ setOpenFillPopUp }) => {
  return (
    <div className="pop_up-wrapper">
      <div className="pop_up">
        <form id="pop_up-form">
          <IoCloseOutline
            className="close-pop_up"
            onClick={() => setOpenFillPopUp((prev) => !prev)}
          />
          <div className="inputs"></div>
          <button type="submit" id="add_table-submit">
            Add table
          </button>
        </form>
      </div>
    </div>
  );
};

export default FillPopUp;
