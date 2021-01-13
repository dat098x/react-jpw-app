import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = ({
  isShowing,
  hide,
  nextUnitIndex,
  modalBindTo,
  handleCompletedQuiz,
  handleUnitClick,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <h3>Nộp bài</h3>
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <span>Bạn vẫn chưa hoàn thành hết các câu hỏi.</span>
              <br />
              <span> Bạn có chắc muốn bỏ kết quả hiện tại ?</span>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={hide}>
                  Hủy bỏ
                </button>
                <button
                  className="btn-submit"
                  onClick={() => {
                    modalBindTo === "Unit-Click"
                      ? handleUnitClick(nextUnitIndex, "submit")
                      : handleCompletedQuiz("submit");
                  }}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
