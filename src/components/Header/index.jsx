import React from "react";
import { NavLink } from "react-router-dom";
import "../../public/grid.css";
import NavMobile from "../NavMobile";
import "./Header.css";

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
            <NavLink
              exact
              className="nav__link__logo"
              to={{
                pathname: "/japanword/main",
              }}
            ></NavLink>
          </div>
          {/* Toggle Menu On Mobile & Tablet */}
          <NavMobile />

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
                    pathname: "/japanword/books/500-cau-n45",
                    url: "/500-n45/query?week=week1",
                    bookName: "500 câu N45",
                    weekOfBook: "Tuần 1",
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
                          pathname: "/japanword/books/500-cau-n45",
                          url: "/500-n45/query?week=week1",
                          bookName: "500 câu N45",
                        }}
                        activeClassName="sub__nav__link--active"
                      >
                        500 câu N45
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
