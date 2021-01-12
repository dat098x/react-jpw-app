import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from "./Pages/MainPage";
import QuizPage from "./Pages/QuizPage";
import NotFound from "../../components/NotFound";

JapanWord.propTypes = {};

function JapanWord(props) {
  const match = useRouteMatch();
  console.log("Match-URL:", { match });
  return (
    <Switch>
      <Route path={`${match.url}/main`} component={MainPage} />

      <Route path={`${match.url}/quiz`} component={QuizPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default JapanWord;
