import React, { useState } from "react";

import "./ListUnitsBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

ListUnitsBox.propTypes = {};

function ListUnitsBox(props) {
  const {
    unitList,
    currentUnitIndex,
    handleUnitClick,
    name,
    weekOfBook,
  } = props;

  const [isShow, setIsShow] = useState(false);

  const handleUnitOptionClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="list-test-box">
      <span className="unit__name">{name}</span>
      <div
        className="unit__week"
        name="unit_select"
        onClick={() => handleUnitOptionClick()}
      >
        {weekOfBook}
        {isShow ? (
          <>
            <FontAwesomeIcon
              className="unit__week__icon"
              icon={["fas", "angle-up"]}
            />
            <ul className="unit__select">
              <li className="unit__option">
                <NavLink
                  exact
                  className="sub__nav__link"
                  to={{
                    pathname: "/japanword/books/500-cau-n45/week/1",
                    url: "/500-n45/query?week=week1",
                    bookName: "500 câu N45",
                    weekOfBook: "Tuần 1",
                  }}
                  activeClassName="sub__nav__link--active"
                >
                  Tuần 1
                </NavLink>
              </li>
              <li className="unit__option">
                <NavLink
                  exact
                  className="sub__nav__link"
                  to={{
                    pathname: "/japanword/books/500-cau-n45/week/2",
                    url: "/500-n45/query?week=week2",
                    bookName: "500 câu N45",
                    weekOfBook: "Tuần 2",
                  }}
                  activeClassName="sub__nav__link--active"
                >
                  Tuần 2
                </NavLink>
              </li>
              <li className="unit__option">
                <NavLink
                  exact
                  className="sub__nav__link"
                  to={{
                    pathname: "/japanword/books/500-cau-n45/week/3",
                    url: "/500-n45/query?week=week3",
                    bookName: "500 câu N45",
                    weekOfBook: "Tuần 3",
                  }}
                  activeClassName="sub__nav__link--active"
                >
                  Tuần 3
                </NavLink>
              </li>
              <li className="unit__option">
                <NavLink
                  exact
                  className="sub__nav__link"
                  to={{
                    pathname: "/japanword/books/500-cau-n45/week/4",
                    url: "/500-n45/query?week=week4",
                    bookName: "500 câu N45",
                    weekOfBook: "Tuần 4",
                  }}
                  activeClassName="sub__nav__link--active"
                >
                  Tuần 4
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <FontAwesomeIcon
              className="unit__week__icon"
              icon={["fas", "angle-down"]}
            />
          </>
        )}
      </div>
      <div className="grid">
        <div className="row sm-gutter list-unit-item">
          {unitList.map((unit, index) => (
            <div key={index} className="col l-3 m-4 list-unit-col">
              <div
                className={
                  index === currentUnitIndex
                    ? "list-day-item list-day-item--current"
                    : "list-day-item"
                }
                onClick={() => handleUnitClick(index)}
              >
                <span className="day__text">Đề số</span>
                <span className="day__number">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUnitsBox;
