import React from "react";
import ReactFuri from "react-furi";
import PropTypes from "prop-types";
import ButtonAnswer from "../ButtonAnswer";

import "./QuizBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScoreSection from "../ScoreSection";

QuizBox.propTypes = {};

function QuizBox(props) {
  const {
    showScore,
    score,
    currentUnit,
    historyAnswer,
    currentQuestionIndex,
    revealAnswers,
    handleAnswerOptionClick,
    handleNextButton,
    handlePrevButton,
    handleResetQuiz,
    handleNextUnitButton,
  } = props;

  const currentQuestion = currentUnit.questions[currentQuestionIndex];
  return (
    <div className="quiz-box">
      {showScore ? (
        <ScoreSection
          score={score}
          currentUnit={currentUnit}
          handleResetQuiz={handleResetQuiz}
          handleNextUnitButton={handleNextUnitButton}
        />
      ) : (
        <>
          <div className="question-section">
            <div className="question-number">
              Câu {currentQuestionIndex + 1}
            </div>
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
            <button className="next-btn" onClick={() => handleNextButton()}>
              <FontAwesomeIcon icon={["fas", "angle-right"]} />
            </button>
            <button className="prev-btn" onClick={() => handlePrevButton()}>
              <FontAwesomeIcon icon={["fas", "angle-left"]} />
            </button>
            <div className="grid">
              <div className="row">
                {currentQuestion.answerOptions.map((answerOption, index) => (
                  <div className="l-6 m-6 c-6">
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
