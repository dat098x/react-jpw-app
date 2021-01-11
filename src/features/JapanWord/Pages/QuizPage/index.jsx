import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListQuestionBox from "../../components/ListQuestionBox";
import QuizBox from "../../components/QuizBox";
import ListTests from "../../components/ListTests";
import testApi from "../../../../api/testApi";

QuizPage.propTypes = {};

function QuizPage(props) {
  // var questions = [
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
  // ];

  const [questions, setQuestions] = useState([]);
  const [unit, setUnit] = useState(1);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          Unit: 1,
        };
        const response = await testApi.getAll("1");
        console.log(response.questions);
        setQuestions(response.questions);
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
  const [startQuiz, setStartQuiz] = useState(false);
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
    if (startQuiz) updateTimer();
  }, [timer, startQuiz]);

  const handleAnswerOptionClick = (answerOptions) => {
    if (revealAnswers || !startQuiz) return;

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
    setTimer(TIMER_START_VALUE);
    setRevealAnswers(false);
    setShowScore(false);
    setStartQuiz(true);
    setCurrentQuestionIndex(0);
    setHistoryAnswer([]);
  };
  const handleCompletedQuiz = () => {
    setShowScore(true);
    setRevealAnswers(true);
    setStartQuiz(false);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
    console.log(startQuiz);
  };

  const handleUnitClick = (unit) => {
    console.log("Unit: " + unit);
    setUnit(unit);
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
              startQuiz={startQuiz}
              questions={questions}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
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
              questions={questions}
              historyAnswer={historyAnswer}
              revealAnswers={revealAnswers}
              currentQuestionIndex={currentQuestionIndex}
              currentQuestion={currentQuestion}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />
          </div>
          <div className="col l-3 m-3">
            <ListTests handleUnitClick={handleUnitClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
