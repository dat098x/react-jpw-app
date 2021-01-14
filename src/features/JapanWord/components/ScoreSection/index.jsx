import React from "react";
import PropTypes from "prop-types";
import CorrectLogo from "../../../../public/images/check.svg";
import InCorrectLogo from "../../../../public/images/cross.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ScoreSection.propTypes = {};

function ScoreSection(props) {
  const { score, currentUnit, handleResetQuiz, handleNextUnitButton } = props;
  return (
    <div className="score-section">
      <div className="score-box">
        <div className="score-header">
          <h3>Kết quả</h3>
        </div>
        <div className="score-body">
          <div className="score-detail">
            <span className="score-text">
              {score} / {currentUnit.questions.length}
            </span>
            <img src={CorrectLogo} alt="Correct Logo" width="20px" />{" "}
          </div>
          <div className="score-detail">
            <span className="score-text">
              {currentUnit.questions.length - score} /{" "}
              {currentUnit.questions.length}
            </span>
            <img src={InCorrectLogo} alt="Correct Logo" width="20px" />{" "}
          </div>
        </div>
        <div className="score=footer">
          <button className="restart-btn" onClick={() => handleResetQuiz()}>
            <FontAwesomeIcon icon={["fas", "redo"]} />
          </button>
          <button
            className="next-unit-btn"
            onClick={() => handleNextUnitButton()}
          >
            <FontAwesomeIcon icon={["fas", "arrow-right"]} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreSection;
