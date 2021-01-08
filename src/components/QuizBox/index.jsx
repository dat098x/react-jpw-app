import React from "react";
import PropTypes from "prop-types";
import ButtonAnswer from "../ButtonAnswer";

QuizBox.propTypes = {};

function QuizBox(props) {
  const {
    showScore,
    score,
    questions,
    currentQuestion,
    historyAnswer,
    currentQuestionIndex,
    revealAnswers,
    handleAnswerOptionClick,
  } = props;
  return (
    <div className="quiz-box">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-text">{currentQuestion.questionText}</div>
          </div>
          <div className="answer-section">
            <div className="grid">
              <div className="row">
                {currentQuestion.answerOptions.map((answerOption) => (
                  <div className="l-6 m-6 c-12">
                    <ButtonAnswer
                      answerOption={answerOption}
                      isCorrectAnswer={answerOption === currentQuestion.answer}
                      isSelectedAnswer={
                        answerOption === historyAnswer[currentQuestionIndex]
                      }
                      revealAnswers={revealAnswers}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                    ></ButtonAnswer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default QuizBox;
