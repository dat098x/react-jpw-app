import React, { useState } from "react";
import PropTypes from "prop-types";

ItemQuestion.propTypes = {};

function ItemQuestion(props) {
  const {
    currentQuestionIndex,
    revealAnswers,
    isSelectedAnswer,
    handleQuestionItemClick,
    index,
  } = props;

  let backgroundColor;
  console.log("Check", isSelectedAnswer);
  if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#2dd42d";
  } else if (revealAnswers && !isSelectedAnswer) {
    backgroundColor = "#ff3030";
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
