import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AppSearchBar from "./AppSearchBar";
import SideBar from "./SideBar";

function AppExpenses({ CustomLink, darkMode, setDarkMode, loggedUser, data }) {
  const [sideBarExtendBtn, setSideBarExtendBtn] = useState(false);

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default AppExpenses;
