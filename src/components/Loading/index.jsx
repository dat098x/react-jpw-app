import React from "react";
import "./Loading.css";
import LoadingImage from "../../public/images/sakura.png";

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="loading__wrapper">
      <div className="loading__overlay"></div>

      <div className="loading__image">
        <img src={LoadingImage} alt="Loading" />
        <div className="loading__text">
          <span>l</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
