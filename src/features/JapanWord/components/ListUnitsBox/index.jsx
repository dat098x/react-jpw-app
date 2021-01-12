import React from "react";
import PropTypes from "prop-types";

import "./ListUnitsBox.css";

ListUnitsBox.propTypes = {};

function ListUnitsBox(props) {
  const { unitList, currentUnitIndex, handleUnitClick } = props;
  return (
    <div className="list-test-box">
      <h2 className="list-test-text">500 câu hỏi N4N5</h2>
      <ul className="list-test">
        {unitList.map((unit, index) => (
          <li
            className={
              index === currentUnitIndex
                ? "list-test-item list-test-item--current"
                : "list-test-item"
            }
            onClick={() => handleUnitClick(index)}
          >
            Unit {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUnitsBox;
