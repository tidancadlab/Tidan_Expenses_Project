import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill, BsEmojiSunglassesFill, BsSearch } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { GoThreeBars } from 'react-icons/go'
import { AiOutlineClose } from 'react-icons/ai'

function AppSearchBar(props) {
    const CustomLink = props.CustomLink;
    const darkMode = props.darkMode;
    const setDarkMode = props.setDarkMode;
    const setSideBarExtendBtn = props.setSideBarExtendBtn;
    const sideBarExtendBtn = props.sideBarExtendBtn;
    const [profileDrop, setProfileDrop] = useState(false)
    return (<>
        <div className="bg-[#F26666] dark:bg-slate-700 dark:text-white w-full upto-lab-s:px-1 px-4 flex upto-lab-s:h-12 h-14">
            <div className="flex w-full upto-lab-s:gap-2 gap-5 items-center">
                <div className="flex flex-row upto-lab-s:gap-2 gap-5 items-center">
                    <div className="upto-lab-s:hidden">
                        <div
                            onClick={() => { setSideBarExtendBtn(sideBarExtendBtn => sideBarExtendBtn ? false : true) }}
                            className='dark:hover:text-black rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-400 my-2 text-2xl ease-in-out duration-150'>
                            {!sideBarExtendBtn ? <GoThreeBars /> : <AiOutlineClose />}
                        </div>
                    </div>
                    <CustomLink to='/' className={` ${darkMode === "dark" ? "lightLogo" : "darkLogo"} upto-lab-s:h-4 h-6`}></CustomLink>
                    <div
                        onClick={() => setDarkMode(darkMode => darkMode === "dark" ? "light" : "dark")}
                        className={`${darkMode === "dark" ? "bg-white" : "bg-black"} cursor-pointer border relative w-8 h-4 rounded-full`} >
                        <span className={` ${darkMode === "dark" ? "left-1 border-black" : "left-4 bg-white"} border ease-in-out duration-150 absolute w-3 h-3 rounded-full bg-black top-1/2 -translate-y-1/2`}></span>
                    </div>
                </div>
                <div className='relative upto-lab-s:w-full upto-lab-s:min-w-[250px] w-full h-10 upto-lab-s:h-8 scrn-mob:max-w-[200px] dark:border-none'>
                    <input
                        className='h-full pr-12 border-violet-200 border dark:border-none w-full px-5 scrn-mob:max-w-fit rounded outline-none bg-transparent dark:bg-gray-500 text-black dark:text-white placeholder:text-sm focus:border-green-400 focus:text-violet-900 placeholder:text-white placeholder:dark:text-white'
                        type="text"
                        name="Search"
                        placeholder='Search'
                        id="" />
                    <div className='absolute cursor-pointer flex items-center justify-center rounded-r w-10 h-full active:bg-red-300 ease-in-out duration-150 hover:bg-red-400 top-1/2 right-0 -translate-y-1/2'><BsSearch className='dark:fill-white' /></div>
                </div>
                {/* User Details */}
                <div
                    className="relative max-w-[180px] upto-lab-s:w-fit w-full">
                    <div
                        tabIndex="0"
                        onBlur={() => {
                            setTimeout(() => {
                                setProfileDrop(false)
                            }, 100);
                        }}
                        onClick={() => { setProfileDrop(profileDrop => profileDrop ? false : true) }}
                        className="flex items-center gap-1 cursor-pointer bg-gray-900 upto-lab-s:pr-0 pr-6 pl-px upto-lab-s:pl-0 upto-lab-s:py-0 py-px rounded-full">
                        <span className=" avatar1 w-7 upto-lab-s:w-8 upto-lab-s:h-8 flex justify-center items-center h-7 rounded-full m-[2px] upto-lab-s:m-0 border-black dark:border-white">
                        </span>
                        <span className="upto-lab-s:hidden text-white">Praveen Kumar</span>
                        <span className="absolute bottom-2 right-1 upto-lab-s:hidden text-white">{!profileDrop ? <BsCaretDownFill /> : <BsCaretUpFill />}</span>
                    </div>
                    {
                        profileDrop && <div className=" text-white absolute top-10 upto-lab-s:right-0 flex gap-1 flex-col items-start w-44 pb-0 rounded-md bg-white dark:bg-gray-600 dark:text-white">
                            <div className="px-5 py-3 rounded-t-md upto-lab-s:py-1 w-full hover:bg-violet-600 bg-stone-700 upto-lab-s:bg-gray-700 flex flex-col items-start cursor-pointer">
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