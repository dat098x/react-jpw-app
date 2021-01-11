import React from "react";
import PropTypes from "prop-types";

import "./ListTests.css";

ListTests.propTypes = {};

function ListTests(props) {
  const { handleUnitClick } = props;
  return (
    <div className="list-test-box">
      <h2>500 câu hỏi N4N5</h2>
      <ul className="list-test">
        <li className="list-test-item" onClick={() => handleUnitClick(1)}>
          Unit 1
        </li>
        <li className="list-test-item" onClick={() => handleUnitClick(2)}>
          Unit 2
        </li>
        <li className="list-test-item">Unit 3</li>
        <li className="list-test-item">Unit 4</li>
        <li className="list-test-item">Unit 5</li>
      </ul>
    </div>
  );
}

export default ListTests;
