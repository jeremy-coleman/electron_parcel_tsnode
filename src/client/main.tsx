
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
//import "bulma/bulma.sass";
import "bulma/css/bulma.css";

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(<App />, root);
}
