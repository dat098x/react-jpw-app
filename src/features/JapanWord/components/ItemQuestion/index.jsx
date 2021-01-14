import React, { useState } from "react";
import PropTypes from "prop-types";
import CorrectLogo from "../../../../public/images/check.svg";
import InCorrectLogo from "../../../../public/images/cross.svg";
import CircleLogo from "../../../../public/images/circle.svg";

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

  let text;
  if (revealAnswers && isSelectedAnswer) {
    text = <img src={CorrectLogo} alt="Correct Logo" width="20px" />;
  } else if (revealAnswers && !isSelectedAnswer) {
    text = <img src={InCorrectLogo} alt="Correct Logo" width="20px" />;
  } else if (isSelectedQuestion) {
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
