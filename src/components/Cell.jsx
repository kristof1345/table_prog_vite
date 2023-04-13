const Cell = ({ index, id }) => {
  return (
    <div className="cell-wrapper">
      <span className="cell-index">{index}</span>
      <input type="text" className="cell" data-index={index} id={id} />
    </div>
  );
};

export default Cell;
