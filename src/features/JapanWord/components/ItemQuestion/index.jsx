import React, { useState } from "react";
import PropTypes from "prop-types";

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
  if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#78ec70";
  } else if (revealAnswers && !isSelectedAnswer) {
    backgroundColor = "#ff6f6f";
  } else if (isSelectedQuestion) {
    backgroundColor = "#d3d3d3";
  }
  return (
    <li
      style={{ backgroundColor: backgroundColor }}
      className={
        index === currentQuestionIndex
          ? "list-question-item list-question-item--current"
          : "list-question-item"
      }
      onClick={() => handleQuestionItemClick(index)}
    >
      {index + 1}
    </li>
  );
}

export default ItemQuestion;
