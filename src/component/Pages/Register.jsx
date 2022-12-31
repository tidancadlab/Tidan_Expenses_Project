import { useState } from "react";
import { Link } from "react-router-dom";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineDangerous } from "react-icons/md";
import tableBGImg from "../../Images/tree.svg";
import carBGImg from "../../Images/lady.svg";

function Register(props) {
  props.titleName.innerHTML = "Register";
  const [userNameInput, setUserNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [confPasswordInput, setConfPasswordInput] = useState();
  const [regWarn, setRegWarn] = useState("");
  const passMatch = confPasswordInput === passwordInput;

  const userRegister = async (e) => {
    e.preventDefault();
    fetch("https://tidan-e-app.onrender.com/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName: userNameInput,
        userEmail: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRegWarn(data.err);
      });
  };

  return (
    <>
      <div className="h-[calc(100vh-64px)] min-h-[800px] w-screen relative flex justify-center bg-gray-400 dark:bg-gray-600 overflow-hidden">
        <div className="relative flex justify-center items-center w-[1200px] h-full">
          <div className="absolute top-32">
            <img className="h-[800px]" src={tableBGImg} alt="" />
          </div>
          <div className="min-w-[300px] flex flex-col items-center max-w-sm w-full rounded-3xl p-2 bg-[#AACBFF] bg-opacity-50 backdrop-blur-md py-20 z-10">
            <div className="lightLogo w-48 -mt-10 mb-10"></div>
            <p>{regWarn}</p>
            <form
              method="POST"
              className="flex flex-wrap relative rounded-xl gap-4 text-sm w-full p-14"
            >
              <div className="relative w-full">
                <input
                  value={userNameInput || ""}
                  onChange={(e) => {
                    setUserNameInput(e.target.value);
                  }}
                  className="h-10 px-4 w-full outline-none rounded-full"
                  type="text"
                  name=""
                  id="fullName"
                  placeholder="Murari Lal Jangir"
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="fullName"
                  className={`absolute top-2 right-2 px-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </label>
              </div>
              <div className="relative w-full">
                <input
                  value={emailInput || ""}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  className="h-10 px-4 w-full outline-none rounded-full"
                  type="email"
                  name=""
                  id="regEmail"
                  placeholder="name@mail.com"
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="regEmail"
                  className={`absolute top-2 right-2 px-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </label>
              </div>
              <div className="relative w-full">
                <input
                  value={passwordInput || ""}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                  className="h-10 px-4 w-full outline-none rounded-full"
                  type="password"
                  name=""
                  id="regPassword"
                  placeholder="Password*"
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="regPassword"
                  className={`absolute top-2 right-2 px-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </label>
              </div>
              <div className="relative flex flex-col items-start w-full">
                <input
                  value={confPasswordInput || ""}
                  onChange={(e) => {
                    setConfPasswordInput(e.target.value);
                  }}
                  className="h-10 px-4 w-full outline-none rounded-full"
                  type="password"
                  name=""
                  id="confPassword"
                  placeholder="Conform Password*"
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="confPassword"
                  className={`absolute top-2 right-2 px-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </label>
                {confPasswordInput && passwordInput ? (
                  <span className="absolute top-3 right-10">
                    {passMatch ? (
                      <BsCheck2 className="fill-green-600" />
                    ) : (
                      <MdOutlineDangerous className="fill-red-500" />
                    )}
                  </span>
                ) : null}
                {confPasswordInput && passwordInput ? (
                  <span
                    className={` ${
                      passMatch
                        ? "text-green-500 after:content-['Matched']"
                        : "text-red-500 after:content-['Not_Matched']"
                    } absolute -bottom-4 text-xs`}
                  >
                    Password{" "}
                  </span>
                ) : null}
              </div>
              <div className="w-full">
                <button
                  className="w-full my-1 p-2 bg-blue-500 rounded-full"
                  type="submit"
                  onClick={userRegister}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="flex flex-wrap relative rounded gap-1 w-full p-5">
              <span>Have you account ? please</span>
              <Link to="/Login" className="text-blue-500" type="submit">
                login...
              </Link>
            </div>
          </div>
          <div className="absolute z-10 right-40 top-96 pointer-events-none">
            <img className="h-[500px]" src={carBGImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
