import React from "react";

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
  let borderColor;
  let color;
  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#4ce165";
    borderColor = "#07c527";
    color = "white";
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff6465";
    borderColor = "#d33435";
    color = "white";
  }

  return (
    <button
      className={
        isSelectedAnswer ? "btn__answer btn__answer--selected" : "btn__answer"
      }
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        color: color,
      }}
      onClick={() => handleAnswerOptionClick(answerOption)}
    >
      {answerOption}
    </button>
  );
}

export default ButtonAnswer;
