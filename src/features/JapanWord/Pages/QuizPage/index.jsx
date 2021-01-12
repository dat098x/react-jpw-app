import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListQuestionBox from "../../components/ListQuestionBox";
import QuizBox from "../../components/QuizBox";
import testApi from "../../../../api/testApi";
import ListUnitsBox from "../../components/ListUnitsBox";
import useModal from "../../../../Hooks/useModal";
import Modal from "../../../../public/Modal";

QuizPage.propTypes = {};

function QuizPage(props) {
  const [unitList, setUnitList] = useState([]);
  const [historyQuestionAnswered, setHistoryQuestionAnswered] = useState([]);
  const [historyScored, setHistoryScored] = useState();
  const [modalBindTo, setModalBindTo] = useState();
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {};

        const testResponse = await testApi.getAllTest();
        setUnitList(testResponse);
        setHistoryQuestionAnswered(
          Array(testResponse[0].questions.length).fill(false)
        );
        setHistoryScored(Array(testResponse[0].questions.length).fill(0));
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchProductList();
  }, []);

  // Initial Timer
  const TIMER_START_VALUE = 30;
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  // Index Of Test
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextUnitIndex, setNextUnitIndex] = useState(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [historyAnswer, setHistoryAnswer] = useState([]);

  const currentUnit = unitList[currentUnitIndex];

  const setQuizAndBeginQuiz = (startQuiz) => {
    setCurrentQuestionIndex(0);
    setTimer(TIMER_START_VALUE);
    setRevealAnswers(false);
    setShowScore(false);
    setStartQuiz(startQuiz);
    setHistoryAnswer([]);
    setHistoryQuestionAnswered(Array(currentUnit.questions.length).fill(false));
    setHistoryScored(Array(currentUnit.questions.length).fill(0));
  };

  const calculateScore = () => {
    setScore(
      historyScored.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ),
      0
    );
  };

  const updateTimer = () => {
    if (!revealAnswers && timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  useEffect(() => {
    if (startQuiz) updateTimer();
  }, [timer, startQuiz]);

  const handleAnswerOptionClick = (answerOptions) => {
    if (revealAnswers || !startQuiz) return;

    historyQuestionAnswered.splice(currentQuestionIndex, 1, true);
    historyAnswer.splice(currentQuestionIndex, 1, answerOptions);

    if (answerOptions === currentUnit.questions[currentQuestionIndex].answer) {
      historyScored.splice(currentQuestionIndex, 1, 1);
    } else {
      historyScored.splice(currentQuestionIndex, 1, 0);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentUnit.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else if (historyQuestionAnswered.indexOf(false) !== -1) {
      setCurrentQuestionIndex(historyQuestionAnswered.indexOf(false));
    } else {
      calculateScore();
      setShowScore(true);
      setRevealAnswers(true);
      setStartQuiz(false);
    }
  };

  const handleQuestionItemClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowScore(false);
  };

  const handleResetQuiz = () => {
    setQuizAndBeginQuiz(true);
  };

  const handleCompletedQuiz = (status = "not-submit") => {
    if (
      historyQuestionAnswered.indexOf(false) !== -1 &&
      status === "not-submit" &&
      !revealAnswers
    ) {
      toggle();
      setModalBindTo("Completed-Click");
    } else {
      calculateScore();
      setShowScore(true);
      setRevealAnswers(true);
      setStartQuiz(false);
      toggle();
    }
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
    console.log(startQuiz);
  };

  const handleUnitClick = (unit) => {
    console.log(1111);
    if (startQuiz) {
      toggle();
      setNextUnitIndex(unit);
      setModalBindTo("Unit-Click");
    } else {
      setCurrentUnitIndex(unit);
      setQuizAndBeginQuiz(false);
    }
  };

  return (
    <div className="quiz-page">
      {!currentUnit ? (
        <div> Loading...</div>
      ) : (
        <div className="row">
          <div className="col l-3 m-3">
            <ListQuestionBox
              timer={timer}
              startQuiz={startQuiz}
              historyAnswer={historyAnswer}
              historyQuestionAnswered={historyQuestionAnswered}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentUnit={currentUnit}
              handleQuestionItemClick={handleQuestionItemClick}
              handleCompletedQuiz={handleCompletedQuiz}
              handleResetQuiz={handleResetQuiz}
              handleStartQuiz={handleStartQuiz}
            />
          </div>
          <div className="col l-6 m-6">
            <QuizBox
              score={score}
              showScore={showScore}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentUnit={currentUnit}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />
          </div>
          <div className="col l-3 m-3">
            <ListUnitsBox
              unitList={unitList}
              currentUnitIndex={currentUnitIndex}
              handleUnitClick={handleUnitClick}
            />
          </div>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            modalBindTo={modalBindTo}
            nextUnitIndex={nextUnitIndex}
            handleCompletedQuiz={handleCompletedQuiz}
            handleUnitClick={handleUnitClick}
          />
        </div>
      )}
    </div>
  );
}

export default QuizPage;
