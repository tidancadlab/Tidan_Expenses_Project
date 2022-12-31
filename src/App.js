import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./component/Pages/Home";

function App({ titleName }) {
  titleName.innerHTML = "APP";

  return (
    <div className="App">
      <BrowserRouter>
        <HomePage titleName={titleName}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
