
import * as React from "react";
import * as ReactDOM from "react-dom";
//import App from "./components/app";

import "bulma/bulma.sass";

import './styles.css'
import './less/root.less'
//import "bulma/css/bulma.css";

const root = document.getElementById("root");

// //if (root) {
//   ReactDOM.render(<App />, root);
// //}


function renderApp() {
  const App = require('./components/app').default
  ReactDOM.render(<App />, root)
}

renderApp()

//@ts-ignore
module.hot.accept(renderApp)