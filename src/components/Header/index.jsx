import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./Header.css";

import "../../public/grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMobile from "../NavMobile";
Header.propTypes = {};

function Header(props) {
  return (
    <header className="header">
      {/* PC */}
      <div className="grid wide">
        <nav className="header__wrapper">
          <div className="header__logo">
            <span>J</span>
            <span>apan</span>
            <span>ez</span>
          </div>
          {/* Toggle Menu On Mobile & Tablet */}
          <NavMobile />
          {/* <div className="toggle__menu hide-on-desktop">
            <div className="toggle__menu__btn">
              <FontAwesomeIcon icon={["fas", "bars"]} />
              <div className="toggle__panel">
                <div className="toggle__panel__items">
                  <span className="toggle__panel__title">N4</span>
                  <span className="toggle__panel__link">
                    {" "}
                    <NavLink
                      exact
                      className="sub__nav__link"
                      to={{
                        pathname: "/japanword/quiz",
                        url: "/testbook/1/unit",
                        name: "500 câu N45",
                      }}
                      activeClassName="sub__nav__link--active"
                    >
                      500 câu N45
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          {/* End Toggle Menu */}
          <div className="nav__list__wrapper hide-on-mobile-tablet">
            <ul className="nav__list__pc">
              <li className="nav__item">
                <NavLink
                  exact
                  className="nav__link"
                  to={{
                    pathname: "/japanword/main",
                    url: "/test/1/unit",
                  }}
                  activeClassName="nav__link--active"
                >
                  Chương trình tiếng Nhật
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  exact
                  className="nav__link"
                  to={{
                    pathname: "/japanword/quiz",
                    url: "/testbook/1/unit",
                  }}
                  activeClassName="nav__link--active"
                >
                  JLPT
                </NavLink>
                <div className="test-panel">
                  <ul className="test-panel-list">
                    <li className="test-panel-item">
                      <NavLink
                        exact
                        className="sub__nav__link"
                        to={{
                          pathname: "/japanword/quiz",
                          url: "/testbook/1/unit",
                          name: "500 câu N45",
                        }}
                        activeClassName="sub__nav__link--active"
                      >
                        500 câu N45
                      </NavLink>
                    </li>
                    <li className="test-panel-item">
                      <NavLink
                        exact
                        className="sub__nav__link"
                        to={{
                          pathname: "/japanword/quiz",
                          url: "/testbook/2/unit",
                          name: "500 câu N3",
                        }}
                        activeClassName="sub__nav__link--active"
                      >
                        500 câu N3
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* End-PC */}
    </header>
  );
}

export default Header;
