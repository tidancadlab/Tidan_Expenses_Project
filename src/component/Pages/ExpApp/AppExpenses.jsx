import { useState } from "react";
import AppSearchBar from "./AppSearchBar";
import SideBar from "./SideBar";


function AppExpenses(props) {
    const [sideBarExtendBtn, setSideBarExtendBtn] = useState(false)

    return (
        <>
            <div>
                <AppSearchBar
                    CustomLink={props.CustomLink}
                    darkMode={props.darkMode}
                    setSideBarExtendBtn={setSideBarExtendBtn}
                    sideBarExtendBtn={sideBarExtendBtn}
                    setDarkMode={props.setDarkMode}
                />
                <SideBar
                    data={props.data}
                    CustomLink={props.CustomLink}
                    sideBarExtendBtn={sideBarExtendBtn}
                />
            </div>
        </>
    );
}

export default AppExpenses;