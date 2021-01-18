import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ListQuestionBox from "../../components/ListQuestionBox";
import QuizBox from "../../components/QuizBox";
import ListUnitsBox from "../../components/ListUnitsBox";
import testApi from "../../../../api/testApi";

import useModal from "../../../../Hooks/useModal";
import Modal from "../../../../public/Modal";

// const QuizBox = React.lazy(() => import("../../components/QuizBox"));
// const ListQuestionBox = React.lazy(() =>
//   import("../../components/ListQuestionBox")
// );
// const ListUnitsBox = React.lazy(() => import("../../components/ListUnitsBox"));

QuizPage.propTypes = {};

function QuizPage(props) {
  const { url, name } = props.location;
  const [nameUnit, setNameUnit] = useState("500 Câu N45");

  const [unitList, setUnitList] = useState([]);
  const [historyQuestionAnswered, setHistoryQuestionAnswered] = useState([]);
  const [historyScored, setHistoryScored] = useState();
  const [modalBindTo, setModalBindTo] = useState();
  const [isFetching, setIsFetching] = useState(false);

  // Hook Modal
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    setIsFetching(true);
    if (name) {
      setNameUnit(name);
    }
    const fetchProductList = async () => {
      try {
        const params = {
          url: url ? url : "/testbook/1/unit",
        };
        const testResponse = await testApi.getAllUnit(params.url);

        setUnitList(testResponse);
        setHistoryQuestionAnswered(
          Array(testResponse[0].questions.length).fill(false)
        );
        setHistoryScored(Array(testResponse[0].questions.length).fill(0));
        setTimerStart(testResponse[0].timer);
        setQuizAndBeginQuiz(false);
        setIsFetching(false);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
        setIsFetching(false);
      }
    };

    fetchProductList();
  }, [url]);

  // Initial Timer
  const [timerStart, setTimerStart] = useState(0);
  const [timer, setTimer] = useState(timerStart);
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
    //setTimerStart(currentUnit.timer);
    setTimer(timerStart);
    setRevealAnswers(false);
    setShowScore(false);
    setHistoryAnswer([]);
    setHistoryQuestionAnswered(Array(currentUnit.questions.length).fill(false));
    setHistoryScored(Array(currentUnit.questions.length).fill(0));
    setStartQuiz(startQuiz);
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
    if (status === "submit") {
      calculateScore();
      setShowScore(true);
      setRevealAnswers(true);
      setStartQuiz(false);
      toggle();
    } else {
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
      }
    }
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
    console.log(startQuiz);
  };

  const handleUnitClick = (unit, status = "not-submit") => {
    if (status === "submit") {
      toggle();
      setStartQuiz(false);
      setCurrentUnitIndex(unit);
      setQuizAndBeginQuiz(false);
    } else if (startQuiz) {
      setNextUnitIndex(unit);
      setModalBindTo("Unit-Click");
      toggle();
    } else {
      setCurrentUnitIndex(unit);
      setQuizAndBeginQuiz(false);
    }
  };

  // Handle Next Button
  const handleNextButton = () => {
    if (currentQuestionIndex >= currentUnit.questions.length - 1) {
      setCurrentQuestionIndex(currentUnit.questions.length - 1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  // Handle Prev Button
  const handlePrevButton = () => {
    if (currentQuestionIndex <= 0) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  //Handle Next Unit
  const handleNextUnitButton = () => {
    console.log(currentUnitIndex);
    if (currentUnitIndex >= unitList.length - 1) {
      setCurrentUnitIndex(0);
    } else {
      setCurrentUnitIndex(currentUnitIndex + 1);
    }
    setQuizAndBeginQuiz(false);
  };

  return (
    <div className="quiz-page">
      {!currentUnit || isFetching ? (
        <div> Loading...</div>
      ) : (
        <div className="row sm-gutter">
          <div className="col l-3 m-3 c-12">
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
          <div className="col l-6 m-6 c-12">
            <QuizBox
              score={score}
              showScore={showScore}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentUnit={currentUnit}
              handleAnswerOptionClick={handleAnswerOptionClick}
              handleNextButton={handleNextButton}
              handlePrevButton={handlePrevButton}
              handleResetQuiz={handleResetQuiz}
              handleNextUnitButton={handleNextUnitButton}
            />
          </div>
          <div className="col l-3 m-3 c-12">
            <ListUnitsBox
              unitList={unitList}
              currentUnitIndex={currentUnitIndex}
              handleUnitClick={handleUnitClick}
              name={nameUnit}
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
