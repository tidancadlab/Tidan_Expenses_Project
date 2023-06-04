import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./component/Pages/Home";
import store from "./Store/Store";

function App({ titleName }) {
  titleName.innerHTML = "APP";
  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function () {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("sideBar").style.bottom = "0";
  //     document.getElementById("topBar").style.top = "0";
  //     // document.getElementById("name").style.top = "0";
  //   } else {
  //     document.getElementById("sideBar").style.bottom = "-60px";
  //     document.getElementById("topBar").style.top = "-60px";
  //     // document.getElementById("name").style.top = "-60px";
  //   }
  //   prevScrollpos = currentScrollPos;
  //   console.log(prevScrollpos, currentScrollPos);
  // };

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <HomePage titleName={titleName} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
