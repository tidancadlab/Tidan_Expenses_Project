import React, { useState } from 'react';
import { BsFillSunFill, BsFillMoonFill, BsSearch } from 'react-icons/bs'
import { TiThMenu } from 'react-icons/ti'
import { VscClose } from 'react-icons/vsc'
import { Outlet } from 'react-router-dom';

const Nav = (props) => {
    const CustomLink = props.CustomLink;
    const LocalData = props.data;
    const darkMode = props.darkMode;
    const setDarkMode = props.setDarkMode;
    const [navBar, setNavBar] = useState(true)
    const navItems = LocalData.navItem;

    if (navBar === false) {
        const navbbttn = setInterval(() => {
            setNavBar(true)
            clearInterval(navbbttn)
        }, 5000)
    }


    return (
        <>
            <div className=' dark:bg-slate-800 bg-slate-300 z-10 w-full fixed'>
                <nav className={`ease-linear px-36 upto-lab-s:px-2 duration-200 dark:bg-gray-700 bg-gray-200 upto-lab-s:justify-between  justify-between h-[80px] upto-lab-s:h-10 flex items-center w-full`}>
                    <div className={'flex scrn-lap-S:w-[500px] min-w-max items-center upto-lab-s:gap-3 gap-9'}>
                        <CustomLink to="/" className="bg-none"><div className={` ${darkMode === "dark" ? 'lightLogo' : 'darkLogo'} upto-lab-s:w-16 upto-lab-s:h-4 h-8  w-32`}></div></CustomLink>
                        <div onClick={() => { setNavBar(true) }} className={` ${navBar ? "upto-lab-s:-left-1/2" : "upto-lab-s:left-1"}  upto-lab-s:bg-violet-300 ease-linear duration-200 upto-lab-s:absolute upto-lab-s:top-12 upto-lab-s:p-5 upto-lab-s:border upto-lab-s:border-emerald-500 upto-lab-s:rounded-lg upto-lab-s:dark:bg-black `}>
                            <ul className='flex text-xl upto-lab-s:flex-col upto-lab-s:text-violet-700 upto-lab-s:items-start gap-5 upto-lab-s:gap-4 dark:text-white'>
                                {navItems.map((navItems, indx) => {
                                    return (
                                        <li key={indx} className="flex" ><CustomLink to={navItems.link}>{navItems.home}</CustomLink></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='relative upto-lab-s:w-full upto-lab-s:min-w-[250px] min-w-[300px] h-10 upto-lab-s:h-8 scrn-mob:max-w-[200px] dark:border-none'>
                        <input className='h-full pr-12 border-red-400 border dark:border-none w-full px-5 scrn-mob:max-w-fit rounded outline-none dark:bg-gray-500 bg-gray-100 text-black dark:text-white placeholder:text-sm focus:bg-gray-400 focus:text-violet-900 placeholder:text-gray-500 placeholder:dark:text-white' type="text" name="Search" placeholder='SEARCH' id="" />
                        <div className='absolute cursor-pointer flex items-center justify-center rounded-r w-10 h-full active:bg-red-300 ease-in-out duration-150 bg-red-400 top-1/2 right-0 -translate-y-1/2'><BsSearch className='dark:fill-white' /></div>
                    </div>
                    <div>
                    </div>
                    <div className='flex flex-row items-start justify-center'>

                        <div className='w-10 upto-lab-s:w-6 upto-lab-s:h-6 h-10 flex justify-center cursor-pointer items-center rounded dark:active:bg-slate-300 active:bg-slate-700 ease-linear duration-200'
                            onClick={() => setDarkMode(darkMode => darkMode === "dark" ? "light" : "dark")}>{darkMode === "dark" ? <BsFillSunFill className='upto-lab-s:h-4 upto-lab-s:w-4 h-6 w-6 fill-orange-600 active:fill-white' /> : <BsFillMoonFill className=' upto-lab-s:h-4 upto-lab-s:w-4 h-6 w-6 fill-green-600 ease-linear duration-200' />}</div>

                        <div className=' hidden upto-lab-s:block' onClick={() => { setNavBar(navBar => navBar ? false : true) }} >{navBar ? <TiThMenu className='h-6 w-8 dark:fill-white' /> : <VscClose className='dark:fill-white h-6 w-8' />}</div>
                    </div>

                </nav>
            </div>

            <div className='h-20 upto-lab-s:h-10 w-full'></div>
            <Outlet/>
        </>
    );
}



export default Nav;