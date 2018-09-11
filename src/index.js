import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
require("dotenv").config();

ReactDOM.render(<App />, document.getElementById("root"));

let key = {
  apikey: process.env.REACT_APP_APIKEY
};

export default key;
