import React, { useState } from 'react';
import '../css/NavBar.css'
import LocalData from '../../json/Data.json'
import HomeFirst from './HomeCont'
import Nav from '../js/Nav'
import { Routes, Route, useResolvedPath, useMatch, Link, Navigate } from "react-router-dom";
import LoginPage from './Login';
import AppExpenses from './ExpApp/AppExpenses';
import DashBoard from './ExpApp/Dashboard';
import AddExpenses from './ExpApp/AddExpenses';



function NavBar() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("DarkMode"))
    localStorage.setItem("DarkMode", darkMode);

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true })
        return (
            <Link className={isActive ? 'Active bg-red-400 upto-lab-s:translate-y-0 translate-y-1 ease-in-out duration-200 py-1 text-red-900' : 'py-1 notActive'} to={to} {...props}> {children} </Link>
        )
    }

    return (
        <>
            <div className={` ${darkMode === "dark" ? "light" : "dark"}`}>
                <Routes>
                    <Route path='' element={<Nav setDarkMode={setDarkMode} CustomLink={CustomLink} darkMode={darkMode} data={LocalData} />} >
                        <Route path="/" element={<HomeFirst data={LocalData} />} />
                        <Route path="*" element={<Navigate to='/' />} />
                        <Route path="/Login" element={<LoginPage />} />
                    </Route>
                        <Route path="/Price" element={<AppExpenses data={LocalData} darkMode={darkMode} setDarkMode={setDarkMode} CustomLink={CustomLink} />} >
                            <Route path="/Price/:id" element={<DashBoard data={LocalData} CustomLink={CustomLink} />} />
                            <Route path="*" element={<Navigate to="/Price/Dashboard" />} />
                            <Route path="/Price/expenses" element={<AddExpenses />} />
                        </Route>
                </Routes>
            </div>
        </>
    );
}

export default NavBar;