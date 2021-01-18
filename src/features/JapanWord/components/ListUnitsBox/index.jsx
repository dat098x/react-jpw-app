import React from "react";
import PropTypes from "prop-types";

import "./ListUnitsBox.css";

ListUnitsBox.propTypes = {};

function ListUnitsBox(props) {
  const { unitList, currentUnitIndex, handleUnitClick, name } = props;

  return (
    <div className="list-test-box">
      <span class="unit-name">{name}</span>
      <div className="grid">
        <div className="row sm-gutter list-unit-item">
          {unitList.map((unit, index) => (
            <div className="col l-3 m-4 list-unit-col">
              <div
                className={
                  index === currentUnitIndex
                    ? "list-day-item list-day-item--current"
                    : "list-day-item"
                }
                onClick={() => handleUnitClick(index)}
              >
                <span className="day__text">Đề số</span>
                <span className="day__number">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUnitsBox;
