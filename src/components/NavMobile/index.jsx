import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

NavMobile.propTypes = {};

function NavMobile(props) {
  const [showNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav(!showNav);
  };
  return (
    <div className="nav__mobile">
      <label
        for="nav__mobile__input"
        className="nav__btn"
        onClick={() => handleShowNav()}
      >
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </label>
      <input
        id="nav__mobile__input"
        className="nav__input"
        type="checkbox"
        checked={showNav}
      />
      <div className="nav__overlay" onClick={() => handleShowNav()}></div>
      <div className="nav__mobile__wrapper">
        <label
          for="nav__mobile__input"
          className="nav__close"
          onClick={() => handleShowNav()}
        >
          <FontAwesomeIcon icon={["fas", "times"]} />
        </label>
        <ul className="nav__list__mobile">
          <span className="nav__title">N4</span>
          <li className="nav__link__mobile">
            <NavLink
              exact
              className="sub__nav__link"
              to={{
                pathname: "/japanword/quiz",
                url: "/testbook/1/unit",
                name: "500 câu N45",
              }}
              activeClassName="sub__nav__link--active"
              onClick={() => handleShowNav()}
            >
              500 câu N45
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavMobile;
