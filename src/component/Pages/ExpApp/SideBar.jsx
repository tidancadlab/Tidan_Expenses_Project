import { AiFillDashboard, AiOutlineClose } from 'react-icons/ai'
import { GiPayMoney, GiHelp } from 'react-icons/gi'
import { GoThreeBars } from 'react-icons/go'
import { BsReception3, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsCheck2All } from 'react-icons/bs'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function SideBar(props) {
    const sideNavItem = props.data.sideBarItem;
    const CustomLink = props.CustomLink;
    // const [sideBarBtn, setSideBarBtn] = useState(false)
    const [sideBarExtendBtn, setSideBarExtendBtn] = useState(false)
    return (
        <>
            <div className={` upto-lab-s:bottom-0 upto-lab-s:fixed upto-lab-s:w-full ease-in-out duration-300 absolute`}>
                <div className={` ${sideBarExtendBtn ? "w-44 upto-lab-s:w-full" : "w-24"} justify-around ease-in-out duration-100 flex gap-7 flex-col bg-gray-800 dark:bg-gray-200 upto-lab-s:w-full upto-lab-s:h-fit upto-lab-s:pt-2 rounded-br-xl h-[700px]`}>
                    {/* <div className='hidden upto-lab-s:flex'>
                        <div
                            onClick={() => { setSideBarBtn(sideBarBtn => sideBarBtn ? false : true) }}
                            className={` ${sideBarBtn ? "right-0" : "-right-10"} absolute cursor-pointer flex justify-end items-center w-12 top-3 h-10 text-2xl bg-gray-200 pr-2 dark:bg-gray-800 rounded-lg`}>
                            {sideBarBtn ? <BsFillArrowLeftCircleFill className='fill-black dark:fill-white' /> : <BsFillArrowRightCircleFill className='fill-black dark:fill-white' />}
                        </div>
                    </div> */}
                    <div onClick={() => { setSideBarExtendBtn(sideBarExtendBtn => sideBarExtendBtn ? false : true) }} className='ml-7 upto-lab-s:hidden rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-400 my-2 text-2xl ease-in-out duration-150'>{!sideBarExtendBtn ? <GoThreeBars className=' dark:fill-white' /> : <AiOutlineClose className='dark:fill-white' />}</div>
                    <div className="flex flex-col upto-lab-s:justify-around upto-lab-s:flex-row text-white dark:text-black gap-3 pr-4">
                        {sideNavItem.map((item, index) => {
                            return (
                                <CustomLink to={item.link} key={index} className="">
                                    <ul className={` ${sideBarExtendBtn ? "py-3  pl-3" : "justify-center pl-0 py-1"} upto-lab-s:px-3 m-auto ease-in-out duration-100 bg-orange-500 hover:bg-orange-400 upto-lab-s:bg-transparent upto-lab-s:dark:bg-transparent dark:bg-slate-500 dark:hover:bg-slate-400 flex upto-lab-s:rounded-t upto-lab-s:rounded-r-none rounded-r`}>
                                        <li className={` ${sideBarExtendBtn ? "" : "flex-col text-xs gap-0"} ease-in duration-100 flex gap-2 justify-center items-center text-xl`}>
                                            {item.Name === "Dashboard" ? <AiFillDashboard className='text-3xl upto-lab-s:text-xl' />
                                                : item.Name === "Approval" ? <BsCheck2All className='text-3xl upto-lab-s:text-xl' />
                                                    : item.Name === "Expenses" ? <GiPayMoney className='text-3xl upto-lab-s:text-xl' />
                                                        : item.Name === "Graph" ? <BsReception3 className='text-3xl upto-lab-s:text-xl' />
                                                            : item.Name === "Help" ? <GiHelp className='text-3xl upto-lab-s:text-xl' />
                                                                : null}
                                            <span className='upto-lab-s:'>{item.Name}</span>
                                        </li>
                                    </ul>
                                </CustomLink >
                            )
                        })}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default SideBar;