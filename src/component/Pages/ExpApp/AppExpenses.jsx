import { useState } from "react";
import { Navigate, Route, Routes, useParams, useMatch } from "react-router-dom";
import ProtectedRoute from "../../js/ProtectedRoute";
import AddExpenses from "./AddExpenses";
import Approval from "./Approval";
import AppSearchBar from "./AppSearchBar";
import Setting from "./contenet/Setting";
import DashBoard from "./Dashboard";
import Graph from "./Graph";
import Help from "./Help";
import SideBar from "./SideBar";

function AppExpenses({
  CustomLink,
  darkMode,
  setDarkMode,
  loggedUser,
  data,
  titleName,
}) {
  const [sideBarExtendBtn, setSideBarExtendBtn] = useState(false);

  return (
    <>
      <AppSearchBar
        darkMode={darkMode}
        setSideBarExtendBtn={setSideBarExtendBtn}
        sideBarExtendBtn={sideBarExtendBtn}
        setDarkMode={setDarkMode}
        loggedUser={loggedUser}
      />
      <SideBar
        data={data}
        CustomLink={CustomLink}
        sideBarExtendBtn={sideBarExtendBtn}
        loggedUser={loggedUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </>
  );
}

export default AppExpenses;
