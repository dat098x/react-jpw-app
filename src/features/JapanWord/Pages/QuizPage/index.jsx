import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListQuestionBox from "../../components/ListQuestionBox";
import QuizBox from "../../components/QuizBox";
import ListTests from "../../components/ListTests";
import testApi from "../../../../api/testApi";

QuizPage.propTypes = {};

function QuizPage(props) {
  //var questions = [
  // {
  //   questionText: "What is the capital of Ireland",
  //   answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
  //   answer: "Dublin",
  // },
  // {
  //   questionText: "Luke Skywalker is a character from which film series",
  //   answerOptions: [
  //     "The Lion King",
  //     "Harry Potter",
  //     "Star Wars",
  //     "Lord of the Rings",
  //   ],
  //   answer: "Star Wars",
  // },
  // {
  //   questionText: "How many days are in September",
  //   answerOptions: ["28", "29", "30", "31"],
  //   answer: "30",
  // },
  // {
  //   questionText: "What is the house number of the Simpsons?",
  //   answerOptions: ["1", "64", "742", "0"],
  //   answer: "742",
  // },
  // {
  //   questionText: "Which of these is not an planet?",
  //   answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
  //   answer: "Florida",
  // },
  // {
  //   questionText: "Which of these is not an planet?",
  //   answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
  //   answer: "Florida",
  // },
  //];

  const [questions, setQuestionsList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          Unit: 1,
        };
        const response = await testApi.getAll(params);
        console.log(response);
        setQuestionsList(response);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchProductList();
  }, []);

  const TIMER_START_VALUE = 30;
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [historyAnswer, setHistoryAnswer] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];
  const updateTimer = () => {
    if (!revealAnswers && timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  useEffect(() => {
    updateTimer();
  }, [timer]);

  const handleAnswerOptionClick = (answerOptions) => {
    if (revealAnswers) return;
    if (historyAnswer.length === 0) {
      historyAnswer.push(answerOptions);
    } else {
      historyAnswer.splice(currentQuestionIndex, 1, answerOptions);
    }
    setSelectedAnswer(answerOptions);
    if (answerOptions === currentQuestion.answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
      setRevealAnswers(true);
    }
  };

  const handleQuestionItemClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowScore(false);
  };
  const handleResetQuiz = () => {
    setRevealAnswers(false);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setTimer(TIMER_START_VALUE);
    setHistoryAnswer([]);
  };
  const handleCompletedQuiz = () => {
    setShowScore(true);
    setRevealAnswers(true);
  };
  // console.log("selected: ", selectedAnswer);
  // console.log("historyL: ", historyAnswer[0]);
  return (
    <div className="quiz-page">
      {questions.length === 0 ? (
        <div> Loading...</div>
      ) : (
        <div className="row">
          <div className="col l-3 m-3">
            <ListQuestionBox
              timer={timer}
              questions={questions}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              handleQuestionItemClick={handleQuestionItemClick}
              handleCompletedQuiz={handleCompletedQuiz}
              handleResetQuiz={handleResetQuiz}
            />
          </div>
          <div className="col l=6 m-6">
            <QuizBox
              score={score}
              showScore={showScore}
              questions={questions}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentQuestion={currentQuestion}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />
          </div>
          <div className="col l=3 m-3">
            <ListTests />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
