import React from "react";
import PropTypes from "prop-types";
import ItemQuestion from "../ItemQuestion";

ListQuestionBox.propTypes = {};

function ListQuestionBox(props) {
  const {
    timer,
    revealAnswers,
    historyAnswer,
    handleQuestionItemClick,
    questions,
    currentQuestionIndex,
    handleCompletedQuiz,
    handleResetQuiz,
  } = props;
  const TIMER_START_VALUE = 30;
  return (
    <div className="list-question-box">
      <div className="timer-wrapper">
        <div
          className="timer-countdown-bar"
          style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
        ></div>
      </div>
      <ul className="list-question">
        {questions.map((question, index) => (
          <ItemQuestion
            key={index}
            revealAnswers={revealAnswers}
            isSelectedAnswer={question.answer === historyAnswer[index]}
            currentQuestionIndex={currentQuestionIndex}
            handleQuestionItemClick={handleQuestionItemClick}
            index={index}
          ></ItemQuestion>
        ))}
      </ul>
      <div className="quiz-btn-box">
        <button className="quiz-btn" onClick={() => handleCompletedQuiz()}>
          Hoan thanh
        </button>
        <button className="quiz-btn" onClick={() => handleResetQuiz()}>
          Lam lai
        </button>
      </div>
    </div>
  );
}

export default ListQuestionBox;
