import { useState } from "react";
import { Navigate, Route, Routes, useParams, useMatch } from "react-router-dom";
import AppSearchBar from "./AppSearchBar";
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
