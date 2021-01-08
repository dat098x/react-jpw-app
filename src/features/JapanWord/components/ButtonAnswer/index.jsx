import React, { useState } from "react";
import PropTypes from "prop-types";

ButtonAnswer.propTypes = {};

function ButtonAnswer(props) {
  const {
    handleAnswerOptionClick,
    isCorrectAnswer,
    isSelectedAnswer,
    answerOption,
    revealAnswers,
  } = props;
  let backgroundColor;
  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#2dd42d";
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3030";
  }

  return (
    <button
      style={{ backgroundColor: backgroundColor }}
      onClick={() => handleAnswerOptionClick(answerOption)}
    >
      {answerOption}
    </button>
  );
}

export default ButtonAnswer;
