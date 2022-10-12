import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill, BsSearch } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { VscClose } from "react-icons/vsc";
import { Outlet } from "react-router-dom";

const Nav = (props) => {
  const CustomLink = props.CustomLink;
  const LocalData = props.data;
  const darkMode = props.darkMode;
  const setDarkMode = props.setDarkMode;
  const [navBar, setNavBar] = useState(false);
  const navItems = LocalData.navItem;

  return (
    <>
      <div className=" dark:bg-slate-800 bg-slate-300 z-10 w-full fixed">
        <nav
          className={`ease-linear duration-200 upto-lab-s:px-2 justify-around dark:bg-gray-700 bg-gray-200 upto-lab-s:justify-between upto-lab-s:gap-2 gap-5 h-16 upto-lab-s:h-10 flex items-center w-full`}
        >
          <div className={"flex min-w-max items-center upto-lab-s:gap-3 gap-9"}>
            <Link to="/" className="bg-none">
              <div
                className={` ${
                  darkMode === "dark" ? "lightLogo" : "darkLogo"
                } upto-lab-s:w-16 upto-lab-s:h-4 h-8  w-32`}
              ></div>
            </Link>
            <div
              className="w-10 upto-lab-s:w-6 upto-lab-s:h-6 h-10 flex justify-center cursor-pointer items-center rounded dark:active:bg-slate-300 active:bg-slate-700 ease-linear duration-200"
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
            </div>
          </div>
          <div className="relative upto-lab-s:w-full max-w-[350px] w-full upto-lab-s:min-w-[250px] h-10 upto-lab-s:h-8 scrn-mob:max-w-[200px] dark:border-none">
            <input
              className="h-full pr-12 border-red-400 border dark:border-none w-full px-5 scrn-mob:max-w-fit rounded outline-none dark:bg-gray-500 bg-gray-100 text-black dark:text-white placeholder:text-sm focus:bg-gray-400 focus:text-violet-900 placeholder:text-gray-500 placeholder:dark:text-white"
              type="text"
              name="Search"
              placeholder="SEARCH"
              id=""
            />
            <div className="absolute cursor-pointer flex items-center justify-center rounded-r w-10 h-full active:bg-red-300 ease-in-out duration-150 top-1/2 right-0 -translate-y-1/2">
              <BsSearch className="dark:fill-white" />
            </div>
          </div>
          <div
            className="flex flex-row items-start justify-center"
            tabIndex={1}
            onBlur={() => {
              setTimeout(() => {
                setNavBar(false);
              }, 300);
            }}
          >
            <div
              className={` ${
                !navBar ? "upto-lab-s:-right-1/2" : "upto-lab-s:right-1"
              }  upto-lab-s:bg-violet-300 ease-linear duration-200 upto-lab-s:absolute upto-lab-s:top-12 upto-lab-s:p-5 upto-lab-s:border upto-lab-s:border-emerald-500 upto-lab-s:rounded-lg upto-lab-s:dark:bg-black `}
            >
              <ul className="flex text-xl upto-lab-s:flex-col upto-lab-s:text-violet-700 upto-lab-s:items-start gap-2 upto-lab-s:gap-4 dark:text-white">
                {navItems.map((navItems, indx) => {
                  return (
                    <li key={indx} className="flex">
                      <CustomLink to={navItems.link}>
                        <span className=" inline-block text-sm">
                          {navItems.home}
                        </span>
                      </CustomLink>
                    </li>
                  );
                })}
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
          </div>
        </nav>
      </div>

      <div className="h-16 upto-lab-s:h-10 w-full"></div>
      <Outlet />
    </>
  );
};

export default Nav;
