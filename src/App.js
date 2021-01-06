import { useEffect, useState } from "react";
import "./App.css";
import ButtonAnswer from "./components/ButtonAnswer";
import ItemQuestion from "./components/ItemQuestion";
import "./publics/grid.css";

function App() {
  const questions = [
    {
      questionText: "What is the capital of Ireland",
      answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
      answer: "Dublin",
    },
    {
      questionText: "Luke Skywalker is a character from which film series",
      answerOptions: [
        "The Lion King",
        "Harry Potter",
        "Star Wars",
        "Lord of the Rings",
      ],
      answer: "Star Wars",
    },
    {
      questionText: "How many days are in September",
      answerOptions: ["28", "29", "30", "31"],
      answer: "30",
    },
    {
      questionText: "What is the house number of the Simpsons?",
      answerOptions: ["1", "64", "742", "0"],
      answer: "742",
    },
    {
      questionText: "Which of these is not an planet?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
      answer: "Florida",
    },
    {
      questionText: "Which of these is not an planet?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
      answer: "Florida",
    },
  ];
  const TIMER_START_VALUE = 30;
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [historyAnswer] = useState([]);

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
  };
  const handleCompletedQuiz = () => {
    setShowScore(true);
    setRevealAnswers(true);
  };
  console.log("selected: ", selectedAnswer);
  console.log("historyL: ", historyAnswer[0]);
  return (
    <div className="App">
      <div className="row">
        <div className="col l-4 m-4">
          <div className="question-box">
            <div className="timer-wrapper">
              <div
                className="timer-countdown-bar"
                style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
              ></div>
            </div>
            <ul className="list-question-box">
              {questions.map((question, index) => (
                <ItemQuestion
                  revealAnswers={revealAnswers}
                  isSelectedAnswer={question.answer === historyAnswer[index]}
                  currentQuestionIndex={currentQuestionIndex}
                  handleQuestionItemClick={handleQuestionItemClick}
                  index={index}
                ></ItemQuestion>
              ))}
            </ul>
            <div className="quiz-btn-box">
              <button
                className="quiz-btn"
                onClick={() => handleCompletedQuiz()}
              >
                Hoan thanh
              </button>
              <button className="quiz-btn" onClick={() => handleResetQuiz()}>
                Lam lai
              </button>
            </div>
          </div>
        </div>
        <div className="col l=8 m-8">
          <div className="quiz-box">
            {showScore ? (
              <div className="score-section">
                You scored {score} out of {questions.length}
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-text">
                    {currentQuestion.questionText}
                  </div>
                </div>
                <div className="answer-section">
                  <div className="grid">
                    <div className="row">
                      {currentQuestion.answerOptions.map((answerOption) => (
                        <div className="l-6 m-6 c-12">
                          <ButtonAnswer
                            answerOption={answerOption}
                            isCorrectAnswer={
                              answerOption === currentQuestion.answer
                            }
                            isSelectedAnswer={
                              answerOption ===
                              historyAnswer[currentQuestionIndex]
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
        </div>
      </div>
    </div>
  );
}

export default App;
