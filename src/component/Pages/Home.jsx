import React, { useState } from "react";
import "../css/NavBar.css";
import LocalData from "../../json/Data.json";
import { createBrowserHistory } from "history";
import HomeFirst from "./HomeCont";
import Nav from "../js/Nav";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import LoginPage from "./Login";
import AppExpenses from "./ExpApp/AppExpenses";
import DashBoard from "./ExpApp/Dashboard";
import AddExpenses from "./ExpApp/AddExpenses";
import Error404 from "../js/Err404";
import Help from "./ExpApp/Help";
import Approval from "./ExpApp/Approval";
import Graph from "./ExpApp/Graph";
import Register from "./Register";
import Setting from "./ExpApp/contenet/Setting";
import { useEffect } from "react";
import LoginAgain from "./ExpApp/contenet/LoginAgain";
import ConstructPage from "./ExpApp/contenet/ConstrectPage";
import ExpView from "./ExpApp/contenet/ExpView";
import ProtectedRoute from "../js/ProtectedRoute";
import { useCookies } from "react-cookie";

function NavBar({ titleName }) {
  const history = createBrowserHistory();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("DarkMode"));
  localStorage.setItem("DarkMode", darkMode);
  const [userPtyData, setUserPtyData] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [transData, setTransData] = useState([]);
  let [urlParams, setUrlParams] = useState("");
  const token1 = localStorage.getItem("token");
  const [cookies, setCookies, dltCookies] = useCookies();

  useEffect(() => {
    if (!!token1) {
      API();
    }
    // console.log(!(!token1) && loggedUser.userId === undefined);
  }, []);

  //<-----fetch API---->
  const API = async () => {
    const userData = await fetch(
      "https://tidan-e-app.onrender.com/loggedUserData",
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token: token1 }),
      }
    )
      .then((response) => response.json())
      .then((result) => setLoggedUser(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className={` ${darkMode === "dark" ? "light" : "dark"}`}>
        <Routes>
          <Route
            path=""
            element={
              <Nav
                setDarkMode={setDarkMode}
                darkMode={darkMode}
                data={LocalData}
                loggedUser={loggedUser}
              />
            }
          >
            <Route path="*" element={<Error404 titleName={titleName} />} />
            <Route
              path="/"
              element={
                <HomeFirst
                  titleName={titleName}
                  data={LocalData}
                  loggedUser={loggedUser}
                />
              }
            />
            {!token1 ? (
              <>
                <Route
                  path="/Login"
                  element={
                    <LoginPage titleName={titleName} loggedUser={loggedUser} />
                  }
                />
                <Route
                  path="/Register"
                  element={<Register titleName={titleName} />}
                />
              </>
            ) : (
              <>
                <Route path={"/Login"} element={<Navigate to="/" />} />
                <Route path={"/Register"} element={<Navigate to="/" />} />
              </>
            )}

            <Route
              path="/Blog"
              element={<ConstructPage titleName={titleName} />}
            />
            <Route
              path="/About-us"
              element={<ConstructPage titleName={titleName} />}
            />
            <Route
              path="/Contact-us"
              element={<ConstructPage titleName={titleName} />}
            />
          </Route>
          {token1 ? (
            <Route
              path="/e-app/:id/"
              element={
                <AppExpenses
                  titleName={titleName}
                  data={LocalData}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  loggedUser={loggedUser}
                  setUrlParams={setUrlParams}
                />
              }
            >
              <Route
                path="/e-app/:id/Dashboard"
                element={
                  <DashBoard
                    titleName={titleName}
                    data={LocalData}
                    loggedUser={loggedUser}
                    setTransData={setTransData}
                    transData ={transData}
                  />
                }
              />
              <Route
                path="/e-app/:id/"
                element={
                  <Navigate to={`/e-app/${loggedUser.userId}/Dashboard`} />
                }
              />
              <Route
                path="/e-app/:id/expenses"
                element={
                  <AddExpenses
                    titleName={titleName}
                    expTransaction={LocalData.expTransaction}
                    loggedUser={loggedUser}
                    transData ={transData}
                  />
                }
              />
              <Route
                path="/e-app/:id/approval"
                element={
                  <Approval
                    titleName={titleName}
                    expTransaction={LocalData.expTransaction}
                    loggedUser={loggedUser}
                    transData ={transData}
                  />
                }
              />
              <Route
                path="/e-app/:id/graph"
                element={
                  <Graph
                    titleName={titleName}
                  />
                }
              />
              <Route
                path="/e-app/:id/help"
                element={
                  <ProtectedRoute
                    titleName={titleName}
                    Component={Help}
                    loggedUser={loggedUser}
                  />
                }
              />
              <Route
                path="/e-app/:id/setting"
                element={<Setting titleName={titleName} history={history} />}
              />
              {/* <Route path="/e-app/dashboard/:id" element={<Setting />} /> */}
            </Route>
          ) : (
            <Route path={"/e-app/:id/*"} element={<Navigate to="/Login" />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default NavBar;
