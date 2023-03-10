import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const SideNav = ({ errors }) => {
  const newErr = [];
  const body = document.querySelector("body");
  const [toggleNav, setToggleNav] = useState(true);

  if (!toggleNav) {
    body.style.paddingRight = "40px";
  } else {
    body.style.paddingRight = "270px";
  }

  errors.map((error) => {
    let el = document.getElementById(error.errid);
    newErr.push(el);
  });

  if (!newErr.includes(null)) {
    newErr.sort(
      (a, b) =>
        Number(a.parentElement.parentElement.dataset.box) -
        Number(b.parentElement.parentElement.dataset.box)
    );
  }

  return (
    <div className="side-navigation">
      <button id="toggle-button" onClick={() => setToggleNav((prev) => !prev)}>
        <FaBars />
      </button>
      {toggleNav && (
        <div id="side-nav">
          <h5 id="errors-title">Errors</h5>
          <div id="output-errors">
            {/* {newErr.map((error, i) => (
              <div className="error" key={i}>
                {`Error on box ${error.parentElement.parentElement.dataset.box} cell ${error.dataset.index}`}
              </div>
            ))} */}
            {!newErr.includes(null)
              ? newErr.map((error, i) => (
                  <div className="error" key={i}>
                    {`Error on box ${error.parentElement.parentElement.dataset.box} cell ${error.dataset.index}`}
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
