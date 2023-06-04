import { useEffect } from "react";
import { useState } from "react";
import {
  BsFillExclamationTriangleFill,
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsKey,
} from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProgressRound from "./ExpApp/contenet/PropgressRound";
import WaitingRoundAnimation from "./ExpApp/contenet/WaitningRoundAnimation";

function LoginPage({ titleName, loggedUser }, props) {
  titleName.innerHTML = "Login - trantracer";
  let [userData, setUserData] = useState({});
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [btnName, setBtnName] = useState("Login");
  const [viewPassword, setViewPassword] = useState(false);
  const [errUser, setErrUser] = useState({
    msg: "",
    className: "",
    err: false,
  });
  const loginUser = async (e) => {
    e.preventDefault();
    console.log(Date());
    setErrUser({
      err: false,
    });
    setBtnName();
    await fetch("http://localhost:8000/login", {
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
        console.log(data);
        setErrUser({
          msg: data.msg,
          className: data.className,
          err: data.err,
        });
        if (data.status === "ok") {
          setUserData(data);
          window.localStorage.removeItem("token");
          window.localStorage.setItem("token", data.data);
          window.location = "/";
          setIsLogged(true);
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

  const bgColors = ["bg-red-300", "bg-green-300", "bg-orange-300"];

  const [colorChange, setColorChange] = useState("bg-[#145FD6]");

  const changeBg = () => {
    setColorChange(bgColors[Math.floor(Math.random() * bgColors.length)]);
  };

  const timeOut = setInterval(() => {
    changeBg();
    clearInterval(timeOut);
  }, 10000);

  let a = 0;

  if (errUser.err) {
    const animTo = setTimeout(() => {
      setErrUser({ err: false });
      clearTimeout(animTo);
      a++;
      console.log(a);
    }, 10000);
  }

  return (
    <>
      {isLogged ? (
        <ProgressRound />
      ) : (
        <div className="h-[calc(100vh-0px)] min-h-[800px] w-screen relative">
          <div className="flex text-left h-full">
            <div
              className={`w-full relative ${colorChange} ease-in-out duration-1000 scrn-mob:hidden`}
            >
              <h6 className=" absolute top-48 left-40 bg-[#0B1B34] text-2xl text-[#DC3B75] p-3">
                ABOUT US
              </h6>
              <div className=" absolute top-64 left-36">
                <h1 className=" bg text-[#0B1B34] text-7xl p-3 font-Trochut">
                  BOOKING EXPENSES.
                </h1>
                <h1 className=" bg text-[#0B1B34] text-7xl p-3 font-Trochut">
                  EXPENSES TRACKING.
                </h1>
                <h1 className=" bg text-[#0B1B34] text-7xl p-3 font-Trochut">
                  PERSONAL, PROFESSIONAL -
                </h1>
                <h1 className=" bg text-[#0B1B34] text-7xl p-3 font-Trochut">
                  - EXPENSES HANDLING.
                </h1>
                <div className="relative w-fit">
                  <h1 className="bg-[#0B1B34] mt-6 text-[#397FDB] text-7xl p-3 font-Trochut">
                    ALL{" "}
                    <span className="text-[#47CD54] font-Trochut">FREE</span>,
                    ON ONE
                  </h1>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-center justify-center h-full min-w-[562px] scrn-mob:max-w-[420px] bg-[#0B1B34] gap-10">
              <div
                className={`absolute ${
                  !errUser.err ? "-top-12" : "top-12"
                }  border-2 px-4 py-2 rounded-lg ease-in-out duration-100 border-${
                  errUser.className
                }-500 text-${errUser.className}-500 w-[calc(100%-120px)]`}
              >
                <h1 className=" font-Trispace flex items-center gap-6">
                  <span>
                    <BsFillExclamationTriangleFill />
                  </span>{" "}
                  <span>{errUser.msg}</span>
                </h1>
              </div>
              <div className="flex gap-10 justify-center flex-col items-center text-white text-3xl">
                <div className="darkLogo"></div>
                <h1 className=" font-Trispace">Welcome! Please login</h1>
              </div>
              <div className="text-white">
                <form
                  onSubmit={loginUser}
                  className="flex flex-col p-2 gap-4 w-full"
                >
                  <div className="flex flex-col gap-4 text-sm min-w-[430px]">
                    <div className="flex gap-2 flex-col w-full box-border">
                      <label
                        className="font-Trispace text-lg text-[#145FD6]"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        value={emailInput || ""}
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                        }}
                        className="h-14 w-full bg-[#0B1B34] rounded-lg px-4 border-2 border-[#145FD6] text-2xl font-Trispace font-extralight outline-none focus:border-[#47CD54]"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@mail.com"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="relative flex gap-2 flex-col w-full box-border">
                      <label
                        className="font-Trispace text-lg text-[#145FD6]"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        value={passwordInput || ""}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                        }}
                        className="h-14 w-full bg-[#0B1B34] rounded-lg px-4 border-2 border-[#145FD6] text-2xl font-Trispace outline-none focus:border-[#47CD54] pr-14"
                        type={viewPassword ? "text" : "password"}
                        name=""
                        id="password"
                        placeholder="Password"
                        autoComplete="off"
                        required
                      />
                      <a
                        className="absolute bottom-4 right-4 text-2xl text-[#145FD6] cursor-pointer"
                        onClick={() =>
                          setViewPassword(viewPassword ? false : true)
                        }
                      >
                        {!viewPassword ? (
                          <BsFillEyeFill />
                        ) : (
                          <BsFillEyeSlashFill />
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2 mt-6">
                    <button
                      className="h-14 w-full bg-[#DC3B75] rounded-lg px-4 hover:bg-[#145FD6] font-Trispace text-lg ease-in-out duration-200"
                      type="submit"
                    >
                      {errUser.err ? (
                        "Login"
                      ) : (
                        <div class="relative h-10 flex gap-1 justify-center items-center">
                          Waiting...
                        </div>
                      )}
                    </button>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="font-Trispace text-xl mt-2 hover:text-[#145FD6] hover:underline"
                      href="/#"
                    >
                      Forget password
                    </a>
                    <div className="">
                      <h1 className="font-Trispace text-xl mt-10" type="submit">
                        Have't account?{" "}
                        <Link
                          to="/Register"
                          className="font-Trispace text-[#145FD6] hover:underline"
                        >
                          Register
                        </Link>
                      </h1>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
