import { useEffect, useState } from "react";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsEmojiSunglassesFill,
} from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import WaitningRoundAnimation from "././contenet/WaitningRoundAnimation";
import { useSelector } from "react-redux";

function AppSearchBar(props) {
  const { darkMode } = props;
  const abc = useSelector((state) => state);
  const [profileDrop, setProfileDrop] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [userPtyData, setUserPtyData] = useState({});
  const loggedUser = abc.user;

  useEffect(() => {
    if (loggedUser.userId !== undefined) {
      const { userId } = loggedUser;
      fetch("https://tidan-e-app.onrender.com/userDataProperty", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => setUserPtyData(data.userProperty));
    }
  }, [loggedUser || userPtyData]);

  return (
    <>
      <div
        id="topBar"
        className="bg-transparent fixed dark:text-white w-full upto-lab-s:px-1 z-[51] px-2 flex upto-lab-s:h-12 scrn-lap-S:ease-in-out duration-300"
      >
        {viewProfile && (
          <div className="absolute top-32 right-10 rounded-2xl">
            <button
              onClick={() => setViewProfile(false)}
              className="absolute flex justify-center items-center right-3 z-50 top-3 border w-8 h-8 rounded-full bg-black text-white"
            >
              X
            </button>
            <UserProfile loggedUser={loggedUser} userPtyData={userPtyData} />
          </div>
        )}
        <div className="flex w-full upto-lab-s:gap-2 gap-5 justify-between items-center">
          <div className="flex flex-col upto-lab-s:gap-2 gap-2 items-center">
            <Link
              to="/"
              className={` ${
                darkMode === "dark" ? "lightLogo" : "darkLogo"
              } upto-lab-s:h-6 h-16`}
            ></Link>
          </div>
          <div className="relative flex justify-end max-w-[180px] upto-lab-s:w-fit w-full">
            <div
              tabIndex="-1"
              onBlur={() => {
                setTimeout(() => {
                  setProfileDrop(false);
                }, 300);
              }}
              onClick={() => {
                setProfileDrop((profileDrop) => (profileDrop ? false : true));
              }}
              className="flex w-fit items-center gap-1 cursor-pointer bg-gray-900 upto-lab-s:pr-0 pr-6 upto-lab-s:pl-0 upto-lab-s:py-0 rounded-full border"
            >
              <span className="w-7 upto-lab-s:w-8 upto-lab-s:h-8 flex justify-center items-center h-7 rounded-full border-l-0 bg-white text-black upto-lab-s:m-0 border border-white">{loggedUser.userName.slice(0,1)}</span>
              {loggedUser.userName !== undefined ? (
                <h1 className="upto-lab-s:hidden text-white capitalize">
                  {loggedUser.userName || "undefined"}
                </h1>
              ) : (
                <WaitningRoundAnimation />
              )}
              <span className={` ${profileDrop ? "" : "rotate-180"} absolute bottom-2 right-1 ease-in-out duration-500 upto-lab-s:hidden text-white`}>
               <BsCaretUpFill />
              </span>
            </div>
            {profileDrop && (
              <div className=" text-white absolute top-10 upto-lab-s:right-0 flex gap-1 flex-col items-start w-44 pb-0 rounded-md bg-white dark:bg-gray-600 dark:text-white">
                <div
                  onClick={() =>
                    setViewProfile((viewProfile) =>
                      viewProfile === false ? true : false
                    )
                  }
                  className="px-5 py-3 rounded-t-md upto-lab-s:py-1 w-full hover:bg-violet-600 bg-stone-700 upto-lab-s:bg-gray-700 flex flex-col items-start cursor-pointer"
                >
                  <span className="hidden upto-lab-s:flex">
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
        </div>
      </div>
    </>
  );
}

export default AppSearchBar;
