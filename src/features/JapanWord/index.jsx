import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import MainPage from "./Pages/MainPage";
import QuizPage from "./Pages/QuizPage";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";

JapanWord.propTypes = {};

function JapanWord(props) {
  const match = useRouteMatch();
  console.log("Match-URL:", { match });
  return (
    <Switch>
      <Suspense fallback={<div>Loading ...</div>}>
        <Route path={`${match.url}/main`} component={MainPage} />

        <Route path={`${match.url}/books`} component={QuizPage} />
      </Suspense>
      <Route component={NotFound} />
    </Switch>
  );
}

export default JapanWord;
