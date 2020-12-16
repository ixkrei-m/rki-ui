import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

const app = <App />;
const root = document.getElementById("root");

ReactDOM.render(app, root);
