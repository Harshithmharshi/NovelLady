import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./store";
import Arabic from "./Arabic_App"

ReactDOM.render(
  <Provider store={store}>
    {localStorage.getItem("Arabic") ? <Arabic /> :  <App /> }
  </Provider>,
  document.getElementById("root")
);
