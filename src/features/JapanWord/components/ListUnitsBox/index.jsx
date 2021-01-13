import React from "react";
import PropTypes from "prop-types";

import "./ListUnitsBox.css";

ListUnitsBox.propTypes = {};

function ListUnitsBox(props) {
  const { unitList, currentUnitIndex, handleUnitClick, name } = props;
  return (
    <div className="list-test-box">
      <h2 className="list-test-text">{name}</h2>
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
