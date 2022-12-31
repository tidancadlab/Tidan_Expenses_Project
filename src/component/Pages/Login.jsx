import { useState } from "react";
import { BsKey } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProgressRound from "./ExpApp/contenet/PropgressRound";
// import Register from "./Register";

import loginImg from "../../Images/loginImg.jpg";
import WaitingRoundAnimation from "./ExpApp/contenet/WaitningRoundAnimation";

function LoginPage({ titleName, loggedUser }, props) {
  titleName.innerHTML = "Login";
  let [userData, setUserData] = useState({});
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  let btnName = "Login";
  const [errUser, setErrUser] = useState({
    msg: "",
    className: "",
    err: false,
  });
  const loginUser = async (e) => {
    e.preventDefault();
    btnName = await (<WaitingRoundAnimation />);
    await fetch("https://tidan-e-app.onrender.com/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userEmail: emailInput, password: passwordInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUserData(data);
          window.localStorage.removeItem("token");
          window.localStorage.setItem("token", data.data);
          window.location = "/";
          setIsLogged(true);
          setErrUser({
            msg: "Successfully Logged in!",
            className: "text-green-500",
            err: false,
          });
        } else {
          btnName = "not working";
          setErrUser({
            msg: "Email & Password not matched!",
            className: "text-red-500",
            err: true,
          });
        }
      })
      .catch((err) => {
        console.log(err, "user Not found");
      });
  };
  window.localStorage.setItem("userData", JSON.stringify(userData));
  console.log(btnName);
  return (
    <>
      {isLogged ? (
        <ProgressRound />
      ) : (
        <div className="h-[calc(100vh-64px)] min-h-[800px] w-screen relative bg-white dark:bg-gray-600">
          <div className="flex">
            <div className="flex justify-center items-center min-w-max w-full text-white dark:text-black p-10">
              <div className="relative flex flex-col justify-center items-center bg-[#AACBFF] max-w-sm w-full h-fit px-14 py-24 shadow-xl rounded-3xl gap-4">
                <div className="lightLogo w-52 -mt-10 mb-10"></div>
                <h1 className={`absolute top-3 ${errUser.className}`}>
                  {errUser.msg}
                </h1>
                <div className="">
                  <div className="flex justify-center items-center h-20 w-20 rounded-full bg-blue-100">
                    <FaUser className="text-7xl rounded-full fill-blue-500" />
                  </div>
                </div>
                <form
                  method="GET"
                  onSubmit={loginUser}
                  className="flex flex-col p-2 gap-4 w-full"
                >
                  <div className="flex flex-col gap-4 text-sm">
                    <div className="relative w-full">
                      <label className="absolute right-4 top-3" htmlFor="email">
                        <CiUser />
                      </label>
                      <input
                        value={emailInput || ""}
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                        }}
                        className="bg-gray-800 h-10 px-5 w-full outline-none rounded-full dark:bg-white focus:bg-blue-900"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@mail.com"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="relative w-full">
                      <label
                        className="absolute right-4 top-3"
                        htmlFor="password"
                      >
                        <BsKey />
                      </label>
                      <input
                        value={passwordInput || ""}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                        }}
                        className="bg-gray-800 h-10 px-5 w-full outline-none rounded-full dark:bg-white focus:bg-blue-900"
                        type="password"
                        name=""
                        id="password"
                        placeholder="*********"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="">
                      <Link
                        to="/Register"
                        className="text-blue-500"
                        type="submit"
                      >
                        Sign up now
                      </Link>
                    </div>
                    <button
                      className="w-full my-1 p-2 bg-blue-500 text-white rounded-full"
                      type="submit"
                    >
                      {btnName}
                    </button>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-blue-700 hover:underline"
                      href="/#"
                    >
                      Forget password
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="min-w-fit scrn-lap-max-L:hidden">
              <img
                className="h-[calc(100vh-64px)] rounded-l-xl"
                src={loginImg}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
