import { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { BsGoogle, BsCheck2 } from "react-icons/bs";
import { MdOutlineDangerous } from "react-icons/md";


function Register(props) {

    const [userFocus, setUserFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confPasswordFocus, setConfPasswordFocus] = useState(false);
    const [userNameInput, setUserNameInput] = useState("");
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [confPasswordInput, setConfPasswordInput] = useState();
    const setLoginBtn = props.setLoginBtn;
    const passMatch = confPasswordInput === passwordInput;



    return (
        <>
            <div className="min-w-[400px] max-w-md w-full rounded-xl text-white dark:text-black p-2 dark:bg-white bg-gray-800">
                <div className="px-5">
                    <h1 className="text-3xl mb-10 font-BalooBhaijaan2 font-extrabold">Welcome</h1>
                    <h1 className="text-left flex flex-row items-center gap-1"><BiUserPlus className="h-6 w-6" /> Register and Track your Expenses</h1>
                </div>
                <form action="submit" className="flex flex-wrap relative rounded gap-8 w-full p-5">
                    <div className="relative w-full">
                        <input
                            value={userNameInput || ''}
                            onChange={(e) => { setUserNameInput(e.target.value) }}
                            onFocus={() => { setUserFocus(true) }}
                            onBlur={() => { setUserFocus(false) }}
                            className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 dark:bg-white dark:border-black border-white dark:focus:border-green-500 focus:border-yellow-400 ease-in-out duration-300"
                            type="text"
                            name="" id="userName" autoComplete="off" required />
                        <label
                            htmlFor="userName"
                            className={` ${userFocus ? "-translate-y-4 bg-gray-800 dark:bg-white text-yellow-400 px-2 opacity-100 text-base " : " translate-y-2"} ${userNameInput ? "-translate-y-[16px] px-2 bg-gray-800 text-green-600 opacity-100 text-base dark:bg-white" : "text-red-600"} opacity-50 text-black select-none ease-in-out duration-300 absolute left-3`}>
                            Full Name <span className="text-red-400">*</span>
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            value={emailInput || ""}
                            onChange={(e) => { setEmailInput(e.target.value) }}
                            onFocus={() => { setEmailFocus(true) }}
                            onBlur={() => { setEmailFocus(false) }}
                            className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 focus:border-yellow-500 dark:bg-white dark:border-black border-white"
                            type="email"
                            name="" id="regEmail" autoComplete="off" required />
                        <label
                            htmlFor="regEmail"
                            className={` ${emailFocus ? "-translate-y-4 bg-gray-800 dark:bg-white px-2 " : "translate-y-2"} ${emailInput ? "-translate-y-[16px] px-2 bg-gray-800 dark:bg-white" : ""} select-none ease-in-out duration-100 absolute left-3`}>
                            Email <span className="text-red-400">*</span>
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            value={passwordInput || ""}
                            onChange={(e) => { setPasswordInput(e.target.value) }}
                            onFocus={() => { setPasswordFocus(true) }}
                            onBlur={() => { setPasswordFocus(false) }}
                            className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 dark:bg-white dark:border-black border-white"
                            type="password"
                            name="" id="regPassword" autoComplete="off" required />
                        <label
                            htmlFor="regPassword"
                            className={` ${passwordFocus ? "-translate-y-4 bg-gray-800 dark:bg-white px-2 " : "translate-y-2"} ${passwordInput ? "-translate-y-[16px] px-2 bg-gray-800 dark:bg-white" : ""} select-none ease-in-out duration-100 absolute left-3`}>
                            Password <span className="text-red-400">*</span>
                        </label>
                    </div>
                    <div className="relative flex flex-col items-start w-full">
                        <input
                            value={confPasswordInput || ""}
                            onChange={(e) => { setConfPasswordInput(e.target.value) }}
                            onFocus={() => { setConfPasswordFocus(true) }}
                            onBlur={() => { setConfPasswordFocus(false) }}
                            className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 dark:bg-white dark:border-black border-white"
                            type="password"
                            name="" id="confPassword" autoComplete="off" required />
                        <label className={` ${confPasswordFocus ? "-translate-y-4 bg-gray-800 dark:bg-white px-2 " : "translate-y-2"} ${confPasswordInput ? "-translate-y-[16px] px-2 bg-gray-800 dark:bg-white" : ""} select-none ease-in-out duration-100 absolute left-3`}>
                            Conform Password <span className="text-red-400">*</span>
                        </label>
                        {confPasswordInput && passwordInput? <span className="absolute top-3 right-2">{passMatch? <BsCheck2 className="fill-green-600" /> : <MdOutlineDangerous className="fill-red-500"/>}</span> : null}
                        {confPasswordInput && passwordInput? <span className={` ${passMatch? "text-green-500 after:content-['Matched']" : "text-red-500 after:content-['Not_Matched']"} absolute -bottom-4 text-xs`}>Password </span> : null}
                    </div>
                    <div className="w-full flex -mt-3 flex-col items-start">
                        <button className="border border-violet-800 w-full my-1 p-2 bg-violet-400 text-violet-800 rounded-md" type="submit">Register</button>
                    </div>
                </form>
                <div className="flex -mt-7 flex-wrap relative rounded gap-5 w-full p-5">
                    <button className="flex gap-2 justify-center items-center border w-full my-1 p-2 bg-blue-400 border-blue-800 text-blue-800 rounded-md" type="submit"><BsGoogle className="" />Continue with Google</button>
                </div>
                <h1>------ OR -------</h1>
                <div className="flex flex-wrap relative rounded gap-5 w-full p-5">
                    <button onClick={() => { setLoginBtn(loginBtn => loginBtn ? false : true) }} className="border w-full my-1 p-2 bg-zinc-400 border-zinc-800 text-zinc-800 rounded-md" type="submit">Login</button>
                </div>
            </div>
        </>
    );
}

export default Register;