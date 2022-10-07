import { useState } from "react";
import { BsFillShieldLockFill, BsGoogle } from 'react-icons/bs'
import Register from "./Register";


function LoginPage() {

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [loginBtn, setLoginBtn] = useState(true);
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

    console.log(emailInput);

    return (
        <>
            <div className="h-[calc(100vh-80px)] min-h-[800px] w-screen relative bg-gray-400 dark:bg-gray-600">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    {loginBtn ? <div className="min-w-[400px] max-w-md w-full rounded-xl text-white dark:text-black p-2 dark:bg-white bg-gray-800 ease-in-out duration-200">
                        <div className="px-5">
                            <h1 className="text-3xl mb-10 font-BalooBhaijaan2 font-extrabold">Welcome</h1>
                            <h1 className="text-left flex flex-row items-center gap-1"><BsFillShieldLockFill className="h-5 w-5" /> Login to Continue access Expenses</h1>
                        </div>
                        <form action="submit" className="flex flex-wrap relative rounded gap-8 w-full p-5">
                            <div className="relative w-full">
                                <input
                                    value={emailInput || ""}
                                    onChange={(e) => { setEmailInput(e.target.value) }}
                                    onFocus={() => { setEmailFocus(true) }}
                                    onBlur={() => { setEmailFocus(false) }}
                                    className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 dark:bg-white dark:border-black border-white"
                                    type="email"
                                    name="email" id="email" autoComplete="off" required />
                                <label htmlFor="email" className={` ${emailFocus ? "-translate-y-4 bg-gray-800 dark:bg-white px-2 " : "translate-y-2"} ${emailInput ? "-translate-y-[16px] px-2 bg-gray-800 dark:bg-white" : ""} select-none ease-in-out duration-100 absolute left-3`}>Email</label>
                            </div>
                            <div className="relative w-full">
                                <input
                                    value={passwordInput || ""}
                                    onChange={(e) => { setPasswordInput(e.target.value) }}
                                    onFocus={() => { setPasswordFocus(true) }}
                                    onBlur={() => { setPasswordFocus(false) }}
                                    className="bg-gray-800 h-10 px-2 w-full outline-none rounded border bg-red-30 dark:bg-white dark:border-black border-white"
                                    type="password"
                                    name="" id="password" autoComplete="off" required />
                                <label htmlFor="password" className={` ${passwordFocus ? "-translate-y-4 bg-gray-800 dark:bg-white px-2 " : "translate-y-2"} ${passwordInput ? "-translate-y-[16px] px-2 bg-gray-800 dark:bg-white" : ""}  select-none ease-in-out duration-100 absolute left-3`}>Password</label>
                            </div>
                            <div className="w-full flex -mt-3 flex-col items-start">
                                <button className="border border-violet-800 w-full my-1 p-2 bg-violet-400 text-violet-800 rounded-md" type="submit">Login</button>
                                <a onClick={(e)=>{e.preventDefault()}} className="text-blue-700 hover:underline" href="/#">Forget password</a>
                            </div>
                        </form>
                        <div className="flex -mt-7 flex-wrap relative rounded gap-5 w-full p-5">
                            <button className="flex gap-2 justify-center items-center border w-full my-1 p-2 bg-blue-400 border-blue-800 text-blue-800 rounded-md" type="submit"><BsGoogle className=""/>Sign in with Google</button>
                        </div>
                        <h1>------ OR -------</h1>
                        <div className="flex flex-wrap relative rounded gap-5 w-full p-5">
                            <button onClick={() => { setLoginBtn(loginBtn => loginBtn ? false : true) }} className="border w-full my-1 p-2 bg-zinc-400 border-zinc-800 text-zinc-800 rounded-md" type="submit">Register</button>
                        </div>
                    </div>
                        :
                        <Register loginBtn={loginBtn} setLoginBtn={setLoginBtn}/>
                    }
                </div>
            </div>
        </>
    );
}

export default LoginPage;