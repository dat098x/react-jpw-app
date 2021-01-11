import React from "react";
import PropTypes from "prop-types";
import ItemQuestion from "../ItemQuestion";
import ButtonBegin from "../ButtonBegin";

import "./ListQuestionBox.css";

ListQuestionBox.propTypes = {};

function ListQuestionBox(props) {
  const {
    timer,
    startQuiz,
    revealAnswers,
    historyAnswer,
    handleQuestionItemClick,
    questions,
    currentQuestionIndex,
    handleCompletedQuiz,
    handleResetQuiz,
    handleStartQuiz,
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
        {!startQuiz ? (
          <button className="btn-begin" onClick={() => handleResetQuiz()}>
            Bắt đầu
          </button>
        ) : (
          <>
            <button
              className="btn-completed"
              onClick={() => handleCompletedQuiz()}
            >
              Kết quả
            </button>
            <button className="btn-reset" onClick={() => handleResetQuiz()}>
              Làm lại
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ListQuestionBox;
