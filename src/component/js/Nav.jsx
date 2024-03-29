import React, { useState } from "react";
import { Link, useMatch, useResolvedPath, Outlet } from "react-router-dom";
import {
  BsFillSunFill,
  BsFillMoonFill,
  BsSearch,
  BsCaretDown,
  BsEmojiSunglassesFill,
  BsSignpost2,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { ImBlog } from "react-icons/im";
import { VscClose } from "react-icons/vsc";
import { HiOutlineHome } from "react-icons/hi";
import { IoIosLogOut, IoMdLogIn } from "react-icons/io";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";
import WaitingRoundAnimation from "../Pages/ExpApp/contenet/WaitningRoundAnimation";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link
      className={` ${
        isActive ? "text-[#023E73]" : "hover:text-[#023E73]"
      } mx-2 flex px-1 py-1 ease-in-out font-thin duration-100`}
      to={to}
      {...props}
    >
      {" "}
      {children}
    </Link>
  );
}

const Nav = (props) => {
  const { loggedUser, darkMode, setDarkMode } = props;
  const [navBar, setNavBar] = useState(false);
  const [profileDrop, setProfileDrop] = useState(true);
  const [expendUser, setExpendUser] = useState(true);
  const [viewProfile, setViewProfile] = useState(false); // this is for profile view
  const token = localStorage.getItem("token");
  // console.log(loggedUser);
  const random = Math.floor(Math.random() * (0 - 360) + 360);
  const random2 = Math.floor(Math.random() * (0 - random / 2) + random / 2);
  return (
    <>
      <div className="z-10 w-full scrn-4k:fixed">
        <nav
          className={`upto-lab-s:px-2 justify-around upto-lab-s:justify-between bg-white upto-lab-s:gap-2 gap-5 h-16 upto-lab-s:h-10 flex items-center w-full`}
        >
          <div className={"flex min-w-max items-center upto-lab-s:gap-3 gap-9"}>
            <Link title="Tidan Expenses" to="/" className="bg-none">
              <div
                className={` ${
                  darkMode === "dark" ? "lightLogoLarge" : "darkLogoLarge"
                } upto-lab-s:h-4  `}
              ></div>
            </Link>
            {/* <div
              className="upto-lab-s:w-6 upto-lab-s:h-6 h-10 flex justify-center cursor-pointer items-center rounded dark:active:bg-slate-300 active:bg-slate-700 ease-linear duration-200"
              onClick={() =>
                setDarkMode((darkMode) =>
                  darkMode === "dark" ? "light" : "dark"
                )
              }
            >
              {darkMode === "dark" ? (
                <BsFillSunFill className="upto-lab-s:h-4 upto-lab-s:w-4 h-6 w-6 fill-orange-600 active:fill-white" />
              ) : (
                <BsFillMoonFill className=" upto-lab-s:h-4 upto-lab-s:w-4 h-6 w-6 fill-green-600 ease-linear duration-200" />
              )}
            </div> */}
          </div>
          <nav className="flex flex-row items-start justify-center">
            <div
              className={` ${
                !navBar
                  ? "upto-lab-s:-right-1/2  upto-lab-s:w-0"
                  : "upto-lab-s:right-1"
              }  upto-lab-s:bg-violet-300 ease-linear duration-200 upto-lab-s:absolute upto-lab-s:top-12 upto-lab-s:p-5 upto-lab-s:border upto-lab-s:border-emerald-500 upto-lab-s:rounded-lg upto-lab-s:dark:bg-black `}
            >
              <ul className="flex text-xl upto-lab-s:flex-col upto-lab-s:text-violet-700 upto-lab-s:items-start gap-4 upto-lab-s:gap-4">
                <li className="flex">
                  <CustomLink to="/">
                    <span className="text-xl flex justify-center items-center gap-1">
                      <HiOutlineHome />
                      <h1 className="scrn-lap-L:hidden ">Home</h1>
                    </span>
                  </CustomLink>
                </li>
                {token && (
                  <li className="flex">
                    <CustomLink to={"/e-app/" + loggedUser.userId}>
                      <span className="text-xl flex justify-center items-center gap-1">
                        <BsSignpost2 />
                        <h1 className="scrn-lap-L:hidden">Dashboard</h1>
                      </span>
                    </CustomLink>
                  </li>
                )}
                {/* <li className="flex">
                  <CustomLink to="/Blog">
                    <span className="text-sm flex justify-center items-center gap-1">
                      <ImBlog />
                      <h1 className="scrn-lap-L:hidden"> Blog</h1>
                    </span>
                  </CustomLink>
                </li> */}
                {/* <li className="flex">
                  <CustomLink to="/About-us">
                    <span className="text-sm flex justify-center items-center gap-1">
                      <BsReverseLayoutTextSidebarReverse />
                      <h1 className="scrn-lap-L:hidden"> About US</h1>
                    </span>
                  </CustomLink>
                </li> */}
                {/* <li className="flex">
                  <CustomLink to="/Contact-us">
                    <span className="text-sm flex justify-center items-center gap-1">
                      <MdOutlineContactSupport /> Contact Us
                    </span>
                  </CustomLink>
                </li> */}
                {!token ? (
                  <>
                    <li className="flex">
                      <CustomLink to="/Login">
                        <span className="text-xl flex justify-center items-center gap-1">
                          <IoMdLogIn /> Log In
                        </span>
                      </CustomLink>
                    </li>
                    <li className="flex">
                      <CustomLink to="/Register">
                        <span className="text-xl font-thin flex justify-center items-center gap-1">
                          <BiUserPlus /> Register
                        </span>
                      </CustomLink>
                    </li>
                  </>
                ) : (
                  <li className="flex relative min-w-[200px] justify-start items-center text-sm px-1 py-1 rounded-full">
                    <div
                      onClick={() => {
                        setProfileDrop(profileDrop ? false : true);
                      }}
                      onMouseOver={() => {
                        setExpendUser(false);
                      }}
                      onMouseOut={() => {
                        setExpendUser(true);
                      }}
                      className="flex absolute items-center gap-1 border-[#024959] rounded-full border cursor-pointer"
                    >
                      <div
                        className={`flex justify-center items-center h-7 w-7 uppercase rounded-full`}
                      >
                        {loggedUser.userName !== undefined ? (
                          (loggedUser.userName || "").slice(0, 1)
                        ) : (
                          <WaitingRoundAnimation />
                        )}
                      </div>
                      <h1
                        className="uppercase -ml-[12.5px]"
                        hidden={expendUser && profileDrop}
                      >
                        {loggedUser.userName !== undefined ? (
                          (loggedUser.userName || "").slice(1)
                        ) : (
                          <WaitingRoundAnimation />
                        )}
                      </h1>
                      <span hidden={expendUser && profileDrop}>
                        <BsCaretDown
                          className={`${
                            !profileDrop ? "rotate-180" : "rotate-0"
                          } ease-in-out duration-300 mr-1`}
                        />
                      </span>
                      {!profileDrop && (
                        <div className=" text-white absolute top-10 upto-lab-s:right-0 flex gap-1 flex-col items-start w-44 pb-0 rounded-md bg-white dark:bg-gray-600 dark:text-white">
                          <div
                            onClick={() =>
                              setViewProfile((viewProfile) =>
                                viewProfile === false ? true : false
                              )
                            }
                            className="px-5 py-3 rounded-t-md upto-lab-s:py-1 w-full hover:bg-violet-600 bg-stone-700 upto-lab-s:bg-gray-700 flex flex-col items-start cursor-pointer"
                          >
                            <span className="hidden upto-lab-s:flex capitalize">
                              {loggedUser.userName || "undefined"}
                            </span>
                            <p className="cursor-pointer upto-lab-s:opacity-75 upto-lab-s:text-sm -mt-1 flex items-center gap-2 upto-lab-s:gap-1">
                              <BsEmojiSunglassesFill /> Profile
                            </p>
                          </div>
                          <Link
                            className="w-full border-t border-pink-500 rounded-b-md flex items-start px-5 py-2 bg-pink-600 hover:bg-violet-600"
                            onClick={async () => {
                              window.localStorage.removeItem("token");
                              window.location = "/";
                            }}
                          >
                            <span className="flex gap-1 items-center">
                              Sign out <IoIosLogOut className="text-2xl" />
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div
              className=" hidden upto-lab-s:block"
              onClick={() => {
                setNavBar((navBar) => (navBar ? false : true));
              }}
            >
              {!navBar ? (
                <TiThMenu className="h-6 w-8 dark:fill-white" />
              ) : (
                <VscClose className="dark:fill-white h-6 w-8" />
              )}
            </div>
          </nav>
        </nav>
      </div>

      {/* <div className="h-16 upto-lab-s:h-10 w-full"></div> */}
      <Outlet />
    </>
  );
};

export default Nav;
