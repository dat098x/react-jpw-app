import React from "react";
import ReactFuri from "react-furi";
import PropTypes from "prop-types";
import ButtonAnswer from "../ButtonAnswer";

import "./QuizBox.css";

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
            {/* <div className="question-text">{currentQuestion.questionText}</div> */}
            <ReactFuri
              word={currentQuestion.questionText}
              reading={currentQuestion.questionTextFuri}
              render={({ pairs }) => (
                <h3 lang="ja">
                  {pairs.map(([furigana, text], index) => (
                    <ReactFuri.Pair key={index}>
                      {text === currentQuestion.keyword ? (
                        <>
                          <span className="furi-text"> {furigana}</span>
                          <ReactFuri.Text
                            style={{ textDecoration: "underline" }}
                          >
                            {text}
                          </ReactFuri.Text>
                        </>
                      ) : (
                        <>
                          <span className="furi-text"> {furigana}</span>
                          <ReactFuri.Text>{text}</ReactFuri.Text>
                        </>
                      )}
                    </ReactFuri.Pair>
                  ))}
                </h3>
              )}
            />
          </div>
          <div className="answer-section">
            <div className="grid">
              <div className="row">
                {currentQuestion.answerOptions.map((answerOption, index) => (
                  <div className="l-6 m-6 c-12">
                    <ButtonAnswer
                      key={`answerOption-${index}`}
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
