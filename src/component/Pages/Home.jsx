import "../css/NavBar.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { expensesData } from "../js/FetchModule";
import LocalData from "../../json/Data.json";
import HomeFirst from "./HomeCont";
import Nav from "../js/Nav";
import LoginPage from "./Login";
import AppExpenses from "./ExpApp/AppExpenses";
import AddExpenses from "../../Pages/EApp/NewExpenses";
import Help from "../../Pages/EApp/Help";
import Approval from "../../Pages/EApp/Approval";
import Graph from "./ExpApp/Graph";
import Register from "./Register";
import Setting from "./ExpApp/contenet/Setting";
import ConstructPage from "./ExpApp/contenet/ConstrectPage";
import ProtectedRoute from "../js/ProtectedRoute";
import Progress from "../Progress";
import { useDispatch, useSelector } from "react-redux";
import { getTran } from "../../Store/TranStore";
import { loggedUser as user } from "../../Store/user";
import { userProperty } from "../../Store/userProperty";
import Dbd from "../../Pages/EApp/Dashboard/Dbd";
import Admin from "../../Pages/EApp/Admin";

function NavBar({ titleName }) {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("DarkMode"));
  localStorage.setItem("DarkMode", darkMode);
  const abc = useSelector((state) => state);
  const loggedUser = abc.user;
  const tran = abc.tran;
  const [transData, setTransData] = useState([]);
  let [urlParams, setUrlParams] = useState("");
  const token1 = localStorage.getItem("token");
  const isLoggedIn = token1 ? loggedUser.userId !== undefined : true;
  const [allUser, setAllUser] = useState([]);
  const [updateData, setUpdateData] = useState({ status: true, upT: 4 });

  useEffect(() => {
    if (!!token1) {
      API();
    }
  }, []);

  //<-----fetch API---->
  const API = async () => {
    await fetch("http://localhost:8000/loggedUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ token: token1 }),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(user(result));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (token1) {
      fetch("http://localhost:8000/allUser", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setAllUser(data));
    }
  }, []);

  const DataApi = async () => {
    const rs = await expensesData(
      `http://localhost:8000/dashBoard`,
      loggedUser.userId
    );
    rs.json()
      .then((a) => {
        dispatch(getTran(a));
      })
      .catch((err) => console.log(err));
    setUpdateData({ status: rs.code, upT: 0 });
  };

  useEffect(() => {
    if (loggedUser.userId !== undefined) {
      const { userId } = loggedUser;
      fetch("http://localhost:8000/userDataProperty", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ userId }),
      })
        .then((r) => r.json())
        .then((a) => dispatch(userProperty(a)));
    } else {
      return;
    }
  }, [loggedUser]);

  if (loggedUser.userId && updateData.status) {
    DataApi();
  }

  useEffect(() => {
    DataApi();
  }, [abc.refresh]);

  return (
    <>
      <div className={` ${darkMode === "dark" ? "light" : "dark"}`}>
        <Routes>
          <Route>
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
          </Route>
          {token1 && loggedUser.userId !== undefined ? (
            <Route
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
                path="/"
                element={
                  <Dbd
                    titleName={titleName}
                    data={LocalData}
                    loggedUser={loggedUser}
                    setTransData={setTransData}
                    transData={tran}
                  />
                }
              />
              <Route
                path="/expenses"
                element={
                  <AddExpenses
                    titleName={titleName}
                    expTransaction={LocalData.expTransaction}
                    loggedUser={loggedUser}
                    transData={transData}
                  />
                }
              />
              <Route
                path="/approval"
                element={
                  <Approval
                    titleName={titleName}
                    expTransaction={LocalData.expTransaction}
                    loggedUser={loggedUser}
                    transData={transData}
                    allUser={allUser}
                  />
                }
              />
              <Route path="/help" element={<Help/>} />
              <Route
                path="/graph"
                element={
                  <Graph tran={tran} allUser={allUser} titleName={titleName} />
                }
              />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/setting"
                element={<Setting titleName={titleName} />}
              />
            </Route>
          ) : (
            <Route path={"/*"} element={<Navigate to="/Login" />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default NavBar;
