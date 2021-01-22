import * as React from "react";
import * as ReactDOM from "react-dom";

import './glob.css'

const root = document.getElementById("root");

function renderApp() {
  const App = require('./components/app').default
  ReactDOM.render(<App />, root)
}

renderApp()

//@ts-ignore
module.hot.accept(renderApp)