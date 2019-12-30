import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "tachyons";
// import Apps from "./Apps";
import Server from "./Server";
import Apps from "./Apps";
// import {createBrowserHisory} from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import "assets/scss/material-kit-react.scss?v=1.4.0";

// import Server from "./Server";

// var hist = createBrowserHisory()
ReactDOM.render(
  <Router>
    <Route path="/sell" component={Server} />
    <Route path="/buy" component={Apps} />
  </Router>,
  document.getElementById("root")
);

// ReactDOM.render(
// <Router>
//   <Switch>
//     <Route path="/buy" component={Server} />
//     <Route path="/sell" component={Apps} />
//   </Switch>
// </Router>,
// document.getElementById("root"));
// ReactDOM.render(<Menu />, document.getElementById(''));
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
