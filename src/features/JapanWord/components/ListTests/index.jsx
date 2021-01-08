import React from "react";
import PropTypes from "prop-types";

import "./ListTests.css";

ListTests.propTypes = {};

function ListTests(props) {
  return (
    <div className="list-test-box">
      <h2>Name Test</h2>
      <ul className="list-test">
        <li className="list-test-item">Test 1</li>
        <li className="list-test-item">Test 1</li>
        <li className="list-test-item">Test 1</li>
        <li className="list-test-item">Test 1</li>
        <li className="list-test-item">Test 1</li>
      </ul>
    </div>
  );
}

export default ListTests;
