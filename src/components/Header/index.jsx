import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./Header.css";

import "../../public/grid.css";
Header.propTypes = {};

function Header(props) {
  return (
    <header className="header">
      <div className="grid">
        <div className="row">
          <div className="col l-6">
            <h1>JapanWord</h1>
          </div>
          <div className="col l-6">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink
                  exact
                  className="header__link"
                  to={{
                    pathname: "/japanword/main",
                    url: "/test/1/unit",
                  }}
                  activeClassName="header__link--active"
                >
                  Chương trình tiếng Nhật
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className="header__link"
                  to={{
                    pathname: "/japanword/quiz",
                    url: "/testbook/1/unit",
                  }}
                  activeClassName="header__link--active"
                >
                  Luyện thi tiếng Nhật
                </NavLink>
                <div className="test-panel">
                  <ul className="test-panel-list">
                    <li className="test-panel-item">
                      <NavLink
                        exact
                        className="header__link"
                        to={{
                          pathname: "/japanword/quiz",
                          url: "/testbook/1/unit",
                          name: "500 câu N45",
                        }}
                        activeClassName="header__link--active"
                      >
                        500 câu N45
                      </NavLink>
                    </li>
                    <li className="test-panel-item">
                      <NavLink
                        exact
                        className="header__link"
                        to={{
                          pathname: "/japanword/quiz",
                          url: "/testbook/2/unit",
                          name: "500 câu N3",
                        }}
                        activeClassName="header__link--active"
                      >
                        500 câu N3
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
