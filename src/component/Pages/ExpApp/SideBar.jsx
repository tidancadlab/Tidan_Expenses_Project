import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { GiPayMoney, GiHelp } from "react-icons/gi";
import { BsReception3, BsCheck2All } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";

function SideBar({ loggedUser, darkMode, setDarkMode }) {
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <Link
        className={` ${
          isActive
            ? "dark:border-[#F27457] border-[#428CFC] upto-lab-s:bg-transparent text-white upto-lab-s:text-orange-600 upto-lab-s:rounded-none upto-lab-s:shadow-none upto-lab-s:translate-x-0"
            : "hover:border-gray-600 border-transparent text-white hover:upto-lab-s:bg-gray-300"
        } upto-lab-s:border-t-2 border-r-4 upto-lab-s:w-16 ease-in-out duration-100`}
        to={to}
        {...props}
      >
        {" "}
        {children}{" "}
      </Link>
    );
  }
  return (
    <>
      <div
        className={`upto-lab-s:bottom-0 upto-lab-s:fixed upto-lab-s:w-full ease-in-out duration-300 fixed`}
      >
        <div
          className={`h-screen overflow-y-auto upto-lab-s:justify-around upto-lab-s:items-stretch items-center upto-lab-s:p-0 ease-in-out duration-100 flex flex-col bg-[#253659] dark:bg-gray-800 upto-lab-s:w-full upto-lab-s:h-fit upto-lab-s:pt-1  pt-16`}
        >
          <div className="relative flex flex-col upto-lab-s:justify-around upto-lab-s:flex-row text-white dark:text-black upto-lab-s:gap-1 upto-lab-s:p-0">
            <CustomLink title="Dashboard" to={`dashboard`}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center flex`}
              >
                <li
                  className={`relative ease-in duration-100 border rounded-full p-2 flex flex-col justify-center items-center dark:text-white`}
                >
                  <MdSpaceDashboard className="text-3xl upto-lab-s:text-xl" />
                </li>
              </ul>
            </CustomLink>

            <CustomLink title="Expenses" to={"expenses"}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 border rounded-full p-2 flex flex-col justify-center items-center dark:text-white`}
                >
                  <GiPayMoney className="text-3xl upto-lab-s:text-xl" />
                </li>
              </ul>
            </CustomLink>
            <CustomLink title="Approval" to={"approval"}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 border rounded-full p-2 flex flex-col justify-center items-center dark:text-white`}
                >
                  <BsCheck2All className="text-3xl upto-lab-s:text-xl" />
                </li>
              </ul>
            </CustomLink>
            <CustomLink title="Graph" to={"graph"}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 border rounded-full p-2 flex flex-col justify-center items-center dark:text-white`}
                >
                  <BsReception3 className="text-3xl upto-lab-s:text-xl" />
                </li>
              </ul>
            </CustomLink>
            <CustomLink title="Help" to={"help"}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 border rounded-full p-2 flex flex-col justify-center items-center dark:text-white`}
                >
                  <GiHelp className="text-3xl upto-lab-s:text-xl" />
                </li>
              </ul>
            </CustomLink>
            <div className="relative w-full mb-10 mt-5   flex justify-center">
              <div className="h-1.5 rounded-full w-3/4 scrn-tab:hidden bg-white"></div>
            </div>
            <CustomLink title="Setting" to="setting">
              <ul>
                <li
                  className={`ease-in duration-100 flex flex-col justify-center items-center w-full h-full   dark:text-white`}
                >
                  <span className="w-full flex flex-col items-center py-5 justify-between">
                    <AiFillSetting className="h-10 w-10" />
                  </span>
                </li>
              </ul>
            </CustomLink>
            <ul>
              <li className="w-full items-center flex justify-center">
                <div
                  onClick={() =>
                    setDarkMode((darkMode) =>
                      darkMode === "dark" ? "light" : "dark"
                    )
                  }
                  className={`${
                    darkMode === "dark" ? "bg-white" : "bg-black"
                  } cursor-pointer border relative w-8 h-4 rounded-full`}
                >
                  <span
                    className={` ${
                      darkMode === "dark"
                        ? "left-1 active:w-4 border-black"
                        : "left-4 bg-white"
                    } border ease-in-out duration-150 absolute w-3 h-3 rounded-full bg-black top-1/2 -translate-y-1/2`}
                  ></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
