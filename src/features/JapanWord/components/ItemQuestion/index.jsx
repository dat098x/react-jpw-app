import React, { useState } from "react";
import PropTypes from "prop-types";
import CorrectLogo from "./check.svg";
import InCorrectLogo from "./cross.svg";
import CircleLogo from "./circle.svg";

ItemQuestion.propTypes = {};

function ItemQuestion(props) {
  const {
    currentQuestionIndex,
    revealAnswers,
    isSelectedAnswer,
    isSelectedQuestion,
    handleQuestionItemClick,
    index,
  } = props;

  let backgroundColor;
  let text;
  if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#78ec70";
    text = <img src={CorrectLogo} alt="Correct Logo" width="20px" />;
  } else if (revealAnswers && !isSelectedAnswer) {
    backgroundColor = "#ff6f6f";
    text = <img src={InCorrectLogo} alt="Correct Logo" width="20px" />;
  } else if (isSelectedQuestion) {
    backgroundColor = "#d3d3d3";
    text = <img src={CircleLogo} alt="Correct Logo" width="20px" />;
  } else {
    text = index + 1;
  }
  return (
    <li
      //style={{ backgroundColor: backgroundColor }}
      className={
        index === currentQuestionIndex
          ? "list-question-item list-question-item--current"
          : "list-question-item"
      }
      onClick={() => handleQuestionItemClick(index)}
    >
      {/* {index + 1} */}
      {text}
    </li>
  );
}

export default ItemQuestion;
