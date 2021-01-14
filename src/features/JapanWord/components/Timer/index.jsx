import React, { useState } from "react";
import PropTypes from "prop-types";

import Clock from "./clock.svg";

import "./Timer.css";
Timer.propTypes = {};

function Timer(props) {
  const { timer, startQuiz } = props;

  const renderTime = (remainingTime) => {
    if (remainingTime === 0) {
      return <div className="timer">Hết giờ</div>;
    }
    let min = "0" + Math.floor(remainingTime / 60);
    let second = "0" + Math.floor(remainingTime % 60);
    return (
      <div className="timer">
        <div className="value">
          {min.slice(-2)} : {second.slice(-2)}
        </div>
      </div>
    );
  };
  return (
    <div className="timer-wrapper">
      {startQuiz ? (
        renderTime(timer)
      ) : (
        <img src={Clock} alt="Clock" width="40px" />
      )}
    </div>
  );
}

export default Timer;
