import React from "react";
import PropTypes from "prop-types";

import "./ListUnitsBox.css";

ListUnitsBox.propTypes = {};

function ListUnitsBox(props) {
  const { unitList, currentUnitIndex, handleUnitClick, name } = props;

  return (
    <div className="list-test-box">
      <span class="unit-name">{name}</span>
      <div className="list-unit-item">
        <ul className="list-day">
          {unitList.map((unit, index) => (
            <li
              className={
                index === currentUnitIndex
                  ? "list-day-item list-day-item--current"
                  : "list-day-item"
              }
              onClick={() => handleUnitClick(index)}
            >
              <span className="day-text">Đề số</span>
              <span className="day-number">{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListUnitsBox;
