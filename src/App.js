import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import "./components/NavMobile/NavMobile.css";
import NotFound from "./components/NotFound";
import "./public/css/base.css";
import "./public/css/responsive.css";
import "./public/grid.css";

library.add(fas);
import("./features/JapanWord");

const JapanWord = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./features/JapanWord")), 1500);
  });
});

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/japanword" />
            <Route path="/japanword" component={JapanWord} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
