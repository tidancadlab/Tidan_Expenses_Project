import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
let titleName = document.getElementById("titleName");
root.render(
  <React.StrictMode>
    <App titleName = {titleName} />
  </React.StrictMode>
);
reportWebVitals();
