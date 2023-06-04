import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { GiPayMoney, GiHelp } from "react-icons/gi";
import {
  BsReception3,
  BsCheck2All,
  BsEmojiSunglassesFill,
  BsFillGearFill,
} from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      className={` ${
        isActive
          ? "upto-lab-s:bg-transparent text-[#F27457] upto-lab-s:translate-x-0"
          : "hover:border-gray-600 border-transparent text-white hover:upto-lab-s:bg-gray-300"
      } upto-lab-s:w-16 scrn-lap-S:h-full ease-in-out duration-100`}
      to={to}
      {...props}
    >
      {" "}
      {children}{" "}
    </Link>
  );
}

function SideBar({ loggedUser, darkMode, setDarkMode }) {
  const [profileDrop, setProfileDrop] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  return (
    <>
      <div
        id="sideBar"
        style={{ bottom: 0 }}
        className={`upto-lab-s:ease-in-out duration-300 upto-lab-s:fixed upto-lab-s:w-full fixed z-50`}
      >
        <div
          className={`h-screen w-20 overflow-y-auto upto-lab-s:justify-around upto-lab-s:items-stretch items-center flex flex-col bg-[#0B1B34] upto-lab-s:w-full upto-lab-s:h-fit`}
        >
          <div className="relative flex flex-col upto-lab-s:justify-around upto-lab-s:flex-row upto-lab-s:gap-1 upto-lab-s:p-0">
            <div className="w-20 h-20 flex justify-center items-center">
              <button
                onClick={() => setProfileDrop(profileDrop ? false : true)}
                className="w-12 scrn-mob:absolute scrn-mob:top-2 h-12 flex justify-center items-center bg-white text-3xl rounded-full"
              >
                <h1 className="uppercase font-Itim">{loggedUser.userName.slice(0,1)}</h1>
              </button>
            </div>
            <CustomLink title="Dashboard" to={`/`}>
              <ul
                className={`upto-lab-s:py-1 py-4 upto-lab-s:justify-center justify-center flex`}
              >
                <li
                  className={`relative ease-in duration-100 flex flex-col justify-center items-center `}
                >
                  <MdSpaceDashboard className="text-3xl upto-lab-s:text-xl" />
                  <span className="text-xs font-Itim">Dashboard</span>
                </li>
              </ul>
            </CustomLink>

            <CustomLink title="Expenses" to={"/expenses"}>
              <ul
                className={`upto-lab-s:py-1 py-4 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 flex flex-col justify-center items-center `}
                >
                  <GiPayMoney className="text-3xl upto-lab-s:text-xl" />
                  <span className="text-xs font-Itim">Expenses</span>
                </li>
              </ul>
            </CustomLink>
            <CustomLink title="Approval" to={"/approval"}>
              <ul
                className={`upto-lab-s:py-1 py-4 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 flex flex-col justify-center items-center `}
                >
                  <BsCheck2All className="text-3xl upto-lab-s:text-xl" />
                  <span className="text-xs font-Itim">Approval</span>
                </li>
              </ul>
            </CustomLink>
            <CustomLink title="Admin" to="admin">
              <ul>
                <li
                  className={`ease-in duration-100 flex flex-col justify-center items-center w-full h-full`}
                >
                  <span className="w-full flex flex-col items-center py-5 justify-between">
                    <RiAdminFill className="text-2xl" />
                    <span className="text-xs font-Itim">Admin</span>
                  </span>
                </li>
              </ul>
            </CustomLink>

            <CustomLink title="Help" to={"/help"}>
              <ul
                className={`upto-lab-s:py-1 py-4 px-2 upto-lab-s:justify-center justify-center  flex`}
              >
                <li
                  className={`relative ease-in duration-100 p-2 flex flex-col justify-center items-center `}
                >
                  <GiHelp className="text-2xl upto-lab-s:text-xl" />
                  <span className="text-xs font-Itim">Help</span>
                </li>
              </ul>
            </CustomLink>
          </div>
          <div className="absolute scrn-mob:hidden bottom-2 darkLogo w-20"></div>
        </div>
        {profileDrop && (
          <div className=" absolute top-20 scrn-mob:top-0 left-2 flex flex-col items-start w-64 pb-0 rounded-md">
            <button
              onClick={() =>
                setViewProfile((viewProfile) =>
                  viewProfile === false ? true : false
                )
              }
              className="px-5 py-3 rounded-t-md upto-lab-s:py-1 w-full hover:bg-violet-600 upto-lab-s:bg-gray-700 flex flex-col items-start cursor-pointer bg-white"
            >
              <span className="flex items-center gap-3">
              <BsEmojiSunglassesFill /> {loggedUser.userName || "undefined"}
              </span>
            </button>
            <button className="px-5 py-3 upto-lab-s:py-1 w-full hover:bg-violet-600 upto-lab-s:bg-gray-700 flex border-t border-gray-600 items-center gap-3 bg-white"> 
             <BsFillGearFill/> Setting
            </button>
            <Link
              className="w-full border-t border-pink-500 rounded-b-md flex items-start px-5 py-2 text-white bg-pink-600 hover:bg-violet-600"
              onClick={async () => {
                window.localStorage.removeItem("token");
                window.location = "/Login";
              }}
            >
              <span className="flex gap-1 items-center">
                Sign out <IoIosLogOut className="text-2xl" />
              </span>
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
