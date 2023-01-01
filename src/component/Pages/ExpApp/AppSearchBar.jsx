import { useEffect, useState } from "react";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsEmojiSunglassesFill,
} from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import WaitningRoundAnimation from '././contenet/WaitningRoundAnimation';

function AppSearchBar(props) {
  const { darkMode } = props;
  const [profileDrop, setProfileDrop] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [userPtyData, setUserPtyData] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const token = localStorage.getItem("token");

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
    } else {
      API();
    }
  }, [loggedUser || userPtyData]);

  //<-----fetch API---->

  const API = async () => {
    await fetch("https://tidan-e-app.onrender.com/loggedUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((result) => setLoggedUser(result))
      .catch((error) => console.log("error", error));
  };

  const [time, setTime] = useState("")
  useEffect(()=>{
   const timeset =  setInterval(() => {
      setTime(Date().slice(0,25))
      clearInterval(timeset)
    }, 1000);
  })

  return (
    <>
      <div className="bg-transparent z-50 fixed dark:text-white w-full upto-lab-s:px-1 px-2 flex upto-lab-s:h-12">
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
        <div className="flex w-full upto-lab-s:gap-2 gap-5 items-center">
          <div className="flex flex-col upto-lab-s:gap-2 gap-2 items-center">
            <Link
              to="/"
              className={` ${
                darkMode === "dark" ? "lightLogo" : "darkLogo"
              } upto-lab-s:h-6 h-16`}
            ></Link>
          </div>
          <div className="relative text-2xl pointer-events-none w-full">
            {time.slice(15,26)} {time.slice(16,18) > 12 ? "PM" : "AM"}
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
              className="flex w-fit items-center gap-1 cursor-pointer bg-gray-900 upto-lab-s:pr-0 pr-6 pl-px upto-lab-s:pl-0 upto-lab-s:py-0 py-px rounded-full"
            >
              <span className=" avatar1 w-7 upto-lab-s:w-8 upto-lab-s:h-8 flex justify-center items-center h-7 rounded-full m-[2px] upto-lab-s:m-0 border-black dark:border-white"></span>
              {loggedUser.userName !== undefined ?<h1 className="upto-lab-s:hidden text-white">
                {loggedUser.userName || "undefined"}
              </h1> : <WaitningRoundAnimation/>}
              <span className="absolute bottom-2 right-1 upto-lab-s:hidden text-white">
                {!profileDrop ? <BsCaretDownFill /> : <BsCaretUpFill />}
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
        </div>
      </div>
    </>
  );
}

export default AppSearchBar;
