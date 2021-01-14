import React from "react";
import PropTypes from "prop-types";
import ItemQuestion from "../ItemQuestion";

import "./ListQuestionBox.css";
import Timer from "../Timer";

ListQuestionBox.propTypes = {};

function ListQuestionBox(props) {
  const {
    timer,
    startQuiz,
    revealAnswers,
    historyAnswer,
    historyQuestionAnswered,
    currentUnit,
    currentQuestionIndex,
    handleQuestionItemClick,
    handleCompletedQuiz,
    handleResetQuiz,
  } = props;

  const questions = currentUnit.questions;

  const TIMER_START_VALUE = 450;

  return (
    <div className="list-question-box">
      <Timer timer={timer} startQuiz={startQuiz} />

      <ul className="list-question">
        {questions.map((question, index) => (
          <ItemQuestion
            key={index}
            revealAnswers={revealAnswers}
            isSelectedAnswer={question.answer === historyAnswer[index]}
            isSelectedQuestion={historyQuestionAnswered[index]}
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
            {/* <button className="btn-reset" onClick={() => handleResetQuiz()}>
              Làm lại
            </button> */}
          </>
        )}
      </div>
    </div>
  );
}

export default ListQuestionBox;
