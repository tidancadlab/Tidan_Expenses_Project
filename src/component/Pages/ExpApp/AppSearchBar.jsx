import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill, BsEmojiSunglassesFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import avatar from '../../../Images/avtars.png'

function AppSearchBar(props) {
    const CustomLink = props.CustomLink;
    const darkMode = props.darkMode;
    const setDarkMode=props.setDarkMode;
    const [profileDrop, setProfileDrop] = useState(false)
    return (<>
        <div className="bg-gray-500 dark:bg-slate-700 dark:text-white w-full px-4 flex upto-lab-s:h-12 h-20">
            <div className="flex justify-between w-full items-center">
                <div className="">
                    <CustomLink to='/' className='darkLogo upto-lab-s:h-4 h-6'></CustomLink>
                </div>
                <div className="h-10 upto-lab-s:h-8 dark:text-white">
                    <input type="text" name="" id="" className="max-w-xl pl-3 pr-12  dark:bg-slate-500 upto-lab-s:w-44 w-80 outline-none rounded h-full" />
                </div>
                <div>
                    <div onClick={() => setDarkMode(darkMode => darkMode === "dark" ? "light" : "dark")} className="relative w-8 h-4 bg-red-500 rounded-full">
                        <span className={` ${darkMode === "dark"? "left-1" : "left-4"} ease-in-out duration-150 absolute w-3 h-3 rounded-full bg-black top-1/2 -translate-y-1/2`}></span>
                    </div>
                </div>
                <div
                    className="relative">
                    <div
                        tabIndex="0"
                        onBlur={() => {
                            const abbcc = setInterval(() => {
                                setProfileDrop(false)
                                clearInterval(abbcc)
                            }, 20);
                        }}
                        onClick={() => { setProfileDrop(profileDrop => profileDrop ? false : true) }}
                        className="flex items-center gap-1 cursor-pointer bg-gray-900 upto-lab-s:pr-0 pr-6 pl-px upto-lab-s:pl-0 upto-lab-s:py-0 py-px rounded-full">
                        <span className=" avatar1 w-7 upto-lab-s:w-8 upto-lab-s:h-8 flex justify-center items-center h-7 rounded-full border m-[2px] upto-lab-s:m-0 border-black dark:border-white">
                        </span>
                        <span className="upto-lab-s:hidden">Praveen Kumar</span>
                        <span className="absolute bottom-2 right-1 upto-lab-s:hidden">{!profileDrop ? <BsCaretDownFill /> : <BsCaretUpFill />}</span>
                    </div>
                    {
                        profileDrop && <div className="absolute top-10 upto-lab-s:right-0 flex gap-2 flex-col items-start w-44 py-5 pb-0 rounded-md bg-white dark:bg-gray-600 dark:text-white">
                            <div className=" px-5 py-3 upto-lab-s:py-1 w-full hover:bg-violet-600 bg-stone-700 upto-lab-s:bg-gray-700 flex flex-col items-start cursor-pointer">
                                <span className="hidden upto-lab-s:flex">Praveen Kumar</span>
                                <p className="cursor-pointer upto-lab-s:opacity-75 upto-lab-s:text-sm -mt-1 flex items-center gap-2 upto-lab-s:gap-1"><BsEmojiSunglassesFill /> Profile</p>
                            </div>
                            <CustomLink className='w-full border-t border-pink-500 rounded-b-md flex items-start px-5 py-2 bg-pink-600 hover:bg-violet-600' to='/' >
                                <span className="flex gap-1 items-center">Sign out <IoIosLogOut className="text-2xl" /></span>
                            </CustomLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>);
}

export default AppSearchBar;