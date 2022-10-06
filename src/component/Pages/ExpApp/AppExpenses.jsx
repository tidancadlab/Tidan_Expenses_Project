
import AppSearchBar from "./AppSearchBar";
import SideBar from "./SideBar";


function AppExpenses(props) {

    return (
        <>
            <div>
                <AppSearchBar CustomLink={props.CustomLink} darkMode={props.darkMode} setDarkMode={props.setDarkMode}/>
                <SideBar data={props.data} CustomLink={props.CustomLink} />
            </div>
        </>
    );
}

export default AppExpenses;