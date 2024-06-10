import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navbar  = ({ searchbar }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const handleProfileClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        if (menuVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuVisible]);

    const profileMenuStyle = {
        opacity: menuVisible ? 1 : 0.5,
        clipPath: menuVisible ? "circle(150% at calc(100% - 5em) 5em)" : "circle(0 at calc(100% - 5em) 5em)",
        pointerEvents: menuVisible ? "auto" : "none",
        transition: 'all .65s cubic-bezier(.32, .685, .175, 1)'
    };

    if (searchbar === "no") {
        return (
            <nav className="navbar">
                <div className="navbar-inner view-width-wide">
                    <div className="navbar-inner-left">
                        <NavLink to="/" className="navbar-inner-left-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" id="navbar-logo" data-name="navbar logo"
                                 viewBox="0 0 1364.51 1119.19">
                                <path className="archive-path"
                                      d="M1007.28,1368.47c-32.46,29.89-62.09,56.5-91,83.89C799.16,1563.4,618,1603.53,466,1491.2c-112.66-83.27-159.88-199.69-145.9-339.16,8.6-85.72,44.87-157.48,106.62-219.71C559.43,798.61,688.52,661.33,819,525.39,854.67,488.16,894.88,458.8,946,446c52.21-13,100.51-2.33,146.92,21.55,34.69,17.85,64.58,42.27,91.76,70,132.65,135.48,266.31,270,397.58,406.8,178,185.52,99.47,475.35-88,575.12-142.81,76-323.38,41.57-426.62-83.43C1047.72,1412,1026,1389.37,1007.28,1368.47Zm113-694c0-11.13-5.59-14.51-9.81-18.32-16.13-14.56-31.94-29.57-49-42.91-47.44-37-76-35.4-121,5.41-4.48,4.05-8.75,8.34-12.92,12.7Q733.1,834.08,538.89,1036.91a330.76,330.76,0,0,0-56.17,79.51c-64.54,126.92,51.92,280.25,169.22,288.11,65.85,4.41,117.46-21.34,161.29-66.92,65.29-67.91,129.82-136.55,194.95-204.62,20.87-21.81,42.35-43,64-64a270.91,270.91,0,0,1,30.52-25.56c68.76-49.18,134.61-44.77,196.57,13q100.67,93.94,201.19,188c6.54,6.09,11.37,16.46,25,12.92,20.35-72.59,6.4-139.37-43.38-195.12-57.88-64.81-119.37-126.49-181-187.83-34.54-34.38-78.15-45.85-126.75-38.36-47.88,7.38-84.61,33.68-116.91,67.46Q921,1046.27,784.91,1189.37c-11.66,12.22-23,25.07-36.17,35.46-32.84,25.89-73.53,23.78-102.23-3.85-26.76-25.77-30.93-66.54-8.8-99.46,8-11.9,18.6-22.19,28.66-32.59,105-108.49,210.6-216.4,315-325.51C1020.48,722.46,1063.64,689.22,1120.24,674.46Zm295.33,711.1c-59.82-60.68-122.12-112.07-177-171.09a114.93,114.93,0,0,0-13.32-12.21c-25.27-19.77-42.55-19.53-68.17.65-52.81,41.61-52.52,43.27-9.83,93,30.87,35.94,63.57,69.26,107.1,89.8C1306.23,1410.14,1358.36,1412.86,1415.57,1385.56Z"
                                      transform="translate(-317.74 -440.41)"/>
                            </svg>
                        </NavLink>
                    </div>
                    <div className="navbar-inner-center">

                    </div>
                    <div className="navbar-inner-right">
                        <div className="navbar-inner-right-profile">
                            <div className="navbar-inner-right-profile-container" onClick={handleProfileClick}>
                                <img className="navbar-inner-right-profile-container-image"
                                     src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                     alt=""/>
                            </div>
                            <div className="navbar-inner-right-profile-menu" ref={menuRef} style={profileMenuStyle}>
                                <div className="navbar-inner-right-profile-menu-top">
                                    <div className="navbar-inner-right-profile-menu-top-text">
                                        <NavLink to="/profile"
                                                 className="navbar-inner-right-profile-menu-top-text-username">Channel
                                            Name</NavLink>
                                        <p className="navbar-inner-right-profile-menu-top-text-link">Edit profile</p>
                                    </div>
                                    <div className="navbar-inner-right-profile-container" onClick={handleProfileClick}>
                                        <img className="navbar-inner-right-profile-container-image"
                                             src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                             alt=""/>
                                    </div>
                                </div>
                                <div className="navbar-inner-right-profile-menu-center">
                                    <ul className="navbar-inner-right-profile-menu-center-list">
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                    </ul>
                                </div>
                                <div className="navbar-inner-right-profile-menu-bottom">
                                    <ul className="navbar-inner-right-profile-menu-bottom-list">
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Your Studio</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Filter Content</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Settings</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Sign Out</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="navbar-inner-right-profile-menu-shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <div className="navbar-inner view-width-wide">
                    <div className="navbar-inner-left">
                        <NavLink to="/" className="navbar-inner-left-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" id="navbar-logo" data-name="navbar logo"
                                 viewBox="0 0 1364.51 1119.19">
                                <path className="archive-path"
                                      d="M1007.28,1368.47c-32.46,29.89-62.09,56.5-91,83.89C799.16,1563.4,618,1603.53,466,1491.2c-112.66-83.27-159.88-199.69-145.9-339.16,8.6-85.72,44.87-157.48,106.62-219.71C559.43,798.61,688.52,661.33,819,525.39,854.67,488.16,894.88,458.8,946,446c52.21-13,100.51-2.33,146.92,21.55,34.69,17.85,64.58,42.27,91.76,70,132.65,135.48,266.31,270,397.58,406.8,178,185.52,99.47,475.35-88,575.12-142.81,76-323.38,41.57-426.62-83.43C1047.72,1412,1026,1389.37,1007.28,1368.47Zm113-694c0-11.13-5.59-14.51-9.81-18.32-16.13-14.56-31.94-29.57-49-42.91-47.44-37-76-35.4-121,5.41-4.48,4.05-8.75,8.34-12.92,12.7Q733.1,834.08,538.89,1036.91a330.76,330.76,0,0,0-56.17,79.51c-64.54,126.92,51.92,280.25,169.22,288.11,65.85,4.41,117.46-21.34,161.29-66.92,65.29-67.91,129.82-136.55,194.95-204.62,20.87-21.81,42.35-43,64-64a270.91,270.91,0,0,1,30.52-25.56c68.76-49.18,134.61-44.77,196.57,13q100.67,93.94,201.19,188c6.54,6.09,11.37,16.46,25,12.92,20.35-72.59,6.4-139.37-43.38-195.12-57.88-64.81-119.37-126.49-181-187.83-34.54-34.38-78.15-45.85-126.75-38.36-47.88,7.38-84.61,33.68-116.91,67.46Q921,1046.27,784.91,1189.37c-11.66,12.22-23,25.07-36.17,35.46-32.84,25.89-73.53,23.78-102.23-3.85-26.76-25.77-30.93-66.54-8.8-99.46,8-11.9,18.6-22.19,28.66-32.59,105-108.49,210.6-216.4,315-325.51C1020.48,722.46,1063.64,689.22,1120.24,674.46Zm295.33,711.1c-59.82-60.68-122.12-112.07-177-171.09a114.93,114.93,0,0,0-13.32-12.21c-25.27-19.77-42.55-19.53-68.17.65-52.81,41.61-52.52,43.27-9.83,93,30.87,35.94,63.57,69.26,107.1,89.8C1306.23,1410.14,1358.36,1412.86,1415.57,1385.56Z"
                                      transform="translate(-317.74 -440.41)"/>
                            </svg>
                        </NavLink>
                    </div>
                    <div className="navbar-inner-center">
                        <div className="navbar-inner-center-searchbar">
                            <svg className="navbar-inner-center-searchbar-icon" xmlns="http://www.w3.org/2000/svg"
                                 height="24px" viewBox="0 0 24 24" version="1.1">
                                <title>Search</title>
                                <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                   stroke-linecap="round" stroke-linejoin="round">
                                    <g id="search-inner" transform="translate(2.000000, 2.000000)" stroke="#000000"
                                       stroke-width="1.5">
                                        <path
                                            d="M9.27542857,0.714285714 C14.0030476,0.714285714 17.836381,4.54666667 17.836381,9.2752381 C17.836381,14.0038095 14.0030476,17.8361905 9.27542857,17.8361905 C4.54685714,17.8361905 0.71447619,14.0038095 0.71447619,9.2752381 C0.71447619,4.54666667 4.54685714,0.714285714 9.27542857,0.714285714 Z"
                                            id="Stroke-1"/>
                                        <path
                                            d="M17.8989524,16.487619 C18.678,16.487619 19.3094286,17.12 19.3094286,17.8980952 C19.3094286,18.6780952 18.678,19.3095238 17.8989524,19.3095238 C17.1199048,19.3095238 16.4875238,18.6780952 16.4875238,17.8980952 C16.4875238,17.12 17.1199048,16.487619 17.8989524,16.487619 Z"
                                            id="Stroke-3"/>
                                    </g>
                                </g>
                            </svg>
                            <input className="navbar-inner-center-searchbar-input" placeholder="Search..."/>
                            <div className="navbar-inner-center-searchbar-shadow"></div>
                        </div>
                    </div>
                    <div className="navbar-inner-right">
                        <div className="navbar-inner-right-profile">
                            <div className="navbar-inner-right-profile-container" onClick={handleProfileClick}>
                                <img className="navbar-inner-right-profile-container-image"
                                     src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                     alt=""/>
                            </div>
                            <div className="navbar-inner-right-profile-menu" ref={menuRef} style={profileMenuStyle}>
                                <div className="navbar-inner-right-profile-menu-top">
                                    <div className="navbar-inner-right-profile-menu-top-text">
                                        <NavLink to="/profile" className="navbar-inner-right-profile-menu-top-text-username">Channel Name</NavLink>
                                        <p className="navbar-inner-right-profile-menu-top-text-link">Edit profile</p>
                                    </div>
                                    <div className="navbar-inner-right-profile-container" onClick={handleProfileClick}>
                                        <img className="navbar-inner-right-profile-container-image"
                                                 src="https://images.unsplash.com/photo-1595258545564-bffdf78be46c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                 alt=""/>
                                    </div>
                                </div>
                                <div className="navbar-inner-right-profile-menu-center">
                                    <ul className="navbar-inner-right-profile-menu-center-list">
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                        <li className="navbar-inner-right-profile-menu-center-list-item"></li>
                                    </ul>
                                </div>
                                <div className="navbar-inner-right-profile-menu-bottom">
                                    <ul className="navbar-inner-right-profile-menu-bottom-list">
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Your Studio</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Filter Content</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Settings</span>
                                        </li>
                                        <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                            <span>Sign Out</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="navbar-inner-right-profile-menu-shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;
