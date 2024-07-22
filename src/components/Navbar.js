import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ searchbar, profile }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);
    const profileMenuRef = useRef(null);
    const menuRef = useRef(null);

    const [query, setQuery] = useState('');

    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            navigate(`/search?query=${query}`);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };

    const handleProfileClick = () => {
        setProfileMenuVisible(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (profileMenuVisible.current && !profileMenuVisible.current.contains(event.target)) {
            setProfileMenuVisible(false);
        }
    };

    useEffect(() => {
        if (profileMenuVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuVisible]);

    const profileMenuStyle = {
        opacity: profileMenuVisible ? 1 : 1,
        clipPath: profileMenuVisible ? "circle(160% at 100% 0)" : "circle(0 at 100% 0)",
        pointerEvents: profileMenuVisible ? "auto" : "none",
        transition: 'all .65s cubic-bezier(.32, .685, .32, 1)'
    };

    const menuStyle = {
        opacity: menuVisible ? 1 : 1,
        clipPath: menuVisible ? "circle(160% at 0 0)" : "circle(0 at 0 0)",
        pointerEvents: menuVisible ? "auto" : "none",
        transition: 'all .65s cubic-bezier(.32, .685, .32, 1)'
    };

    const menuIcon = {
        transform: menuVisible ? "rotate(45deg)" : "rotate(0)",
        transition: 'all .35s cubic-bezier(.175, .685, .32, 1)'
    };

    let profilePictureUrl;

    if (user) {
        profilePictureUrl = `${process.env.PUBLIC_URL}/${user.profilePicture}`;

        if (profile && user) {
            profilePictureUrl = `${process.env.PUBLIC_URL}/../${user.profilePicture}`;
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner view-width">
                <div className="navbar-inner-padding">
                    <div className="navbar-inner-padding-shadow"></div>
                    <div className="navbar-inner-left">
                        <div className="navbar-inner-left-burger" onClick={toggleMenu} style={menuIcon}>
                            <div className="navbar-inner-left-burger-line"></div>
                            <div className="navbar-inner-left-burger-line-2"></div>
                        </div>
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
                        {searchbar !== "no" && (
                            <div className="navbar-inner-center-searchbar">
                                <svg onClick={handleSearch} className="navbar-inner-center-searchbar-icon"
                                     xmlns="http://www.w3.org/2000/svg"
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
                                <input
                                    className="navbar-inner-center-searchbar-input"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="navbar-inner-right">
                        <div className="navbar-inner-right-profile">
                            <div className="navbar-inner-right-profile-button">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Notification</title>
                                    <g id="notification" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="notification-inner" transform="translate(4.614552, 2.514190)" stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M7.38163814,2.84217094e-14 C2.94735243,2.84217094e-14 1.02068576,4.0152381 1.02068576,6.66952381 C1.02068576,8.65333333 1.30830481,8.06952381 0.210209572,10.4895238 C-1.13074281,13.9380952 4.26163814,15.347619 7.38163814,15.347619 C10.5006858,15.347619 15.8930667,13.9380952 14.5530667,10.4895238 C13.4549715,8.06952381 13.7425905,8.65333333 13.7425905,6.66952381 C13.7425905,4.0152381 11.8149715,2.84217094e-14 7.38163814,2.84217094e-14 Z"
                                                id="Stroke-1"/>
                                            <path
                                                d="M9.691448,17.998 C8.39716229,19.4437143 6.37811467,19.4608571 5.071448,17.998"
                                                id="Stroke-3"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            {user ? (
                                <div className="navbar-inner-right-profile-container" onClick={handleProfileClick}>
                                    <img
                                        className="navbar-inner-right-profile-container-image"
                                        src={profilePictureUrl}
                                        alt="Profile"
                                    />
                                </div>
                            ) : (
                                <NavLink to="/login" className="mainbutton">Login</NavLink>
                            )}
                        </div>
                    </div>
                </div>
                <div className="navbar-inner-left-menu" ref={menuRef} style={menuStyle}>
                    <div className="navbar-inner-left-menu-inner">
                        <ul className="navbar-inner-left-menu-inner-list">
                            <li className="navbar-inner-left-menu-inner-list-item">
                                <NavLink to="/" className="navbar-inner-left-menu-inner-list-item-link">Videos</NavLink>
                            </li>
                            <li className="navbar-inner-left-menu-inner-list-item">
                                <NavLink to="/" className="navbar-inner-left-menu-inner-list-item-link">Pictures</NavLink>
                            </li>
                            <li className="navbar-inner-left-menu-inner-list-item">
                                <NavLink to="/" className="navbar-inner-left-menu-inner-list-item-link">Livestreams</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-inner-left-menu-shadow"></div>
                </div>
                {user && (
                    <div className="navbar-inner-right-profile-menu" ref={profileMenuRef} style={profileMenuStyle}>
                        <div className="navbar-inner-right-profile-menu-top">
                            <NavLink to={`/profile/` + user?.name} className="navbar-inner-right-profile-container">
                                <img className="navbar-inner-right-profile-container-image"
                                     src={profilePictureUrl}
                                     alt="Profile"/>
                            </NavLink>
                            <div className="navbar-inner-right-profile-menu-top-text">
                                <NavLink to={`/profile/` + user?.name} className="navbar-inner-right-profile-menu-top-text-username">
                                    <span>{user?.name}</span>
                                    <svg className="verified-icon" viewBox="0 0 22 22" aria-hidden="true">
                                        <g>
                                            <linearGradient gradientUnits="userSpaceOnUse" id="a" x1="4.411" x2="18.083"
                                                            y1="2.495" y2="21.508">
                                                <stop offset="0"></stop>
                                                <stop offset=".539"></stop>
                                                <stop offset=".68"></stop>
                                                <stop offset="1"></stop>
                                                <stop offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient gradientUnits="userSpaceOnUse" id="b" x1="5.355" x2="16.361"
                                                            y1="3.395" y2="19.133">
                                                <stop offset="0"></stop>
                                                <stop offset=".406"></stop>
                                                <stop offset=".989"></stop>
                                            </linearGradient>
                                            <g clip-rule="evenodd" fill-rule="evenodd">
                                                <path
                                                    d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"></path>
                                                <path
                                                    d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"></path>
                                                <path
                                                    d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                                <NavLink to="/editprofile" className="navbar-inner-right-profile-menu-top-text-link">Edit profile</NavLink>
                            </div>
                        </div>
                        <div className="navbar-inner-right-profile-menu-center">
                            <ul className="navbar-inner-right-profile-menu-center-list">
                                <NavLink to="/upload" className="navbar-inner-right-profile-menu-center-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Plus</title>
                                        <g id="plus" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="plus-inner" transform="translate(2.300000, 2.300000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="9.73684179" y1="6.162632" x2="9.73684179"
                                                      y2="13.3110531"
                                                      id="Stroke-1"/>
                                                <line x1="13.3146315" y1="9.73684179" x2="6.158842"
                                                      y2="9.73684179"
                                                      id="Stroke-2"/>
                                                <path
                                                    d="M-3.55271368e-14,9.73684211 C-3.55271368e-14,2.43473684 2.43473684,2.13162821e-14 9.73684211,2.13162821e-14 C17.0389474,2.13162821e-14 19.4736842,2.43473684 19.4736842,9.73684211 C19.4736842,17.0389474 17.0389474,19.4736842 9.73684211,19.4736842 C2.43473684,19.4736842 -3.55271368e-14,17.0389474 -3.55271368e-14,9.73684211 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                                <NavLink to="/upload" className="navbar-inner-right-profile-menu-center-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Image 2</title>
                                        <g id="image-2" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="image-2-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <path
                                                    d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M8.5986,6.7842 C8.5986,7.7572 7.8106,8.5452 6.8376,8.5452 C5.8656,8.5452 5.0766,7.7572 5.0766,6.7842 C5.0766,5.8112 5.8656,5.0232 6.8376,5.0232 C7.8106,5.0232 8.5986,5.8112 8.5986,6.7842 Z"
                                                    id="Stroke-3"/>
                                                <path
                                                    d="M19.1201,12.6666 C18.2391,11.7606 16.9931,9.9296 14.7041,9.9296 C12.4151,9.9296 12.3651,13.9676 10.0291,13.9676 C7.6921,13.9676 6.7511,12.5966 5.2281,13.3126 C3.7061,14.0276 2.4661,16.8736 2.4661,16.8736"
                                                    id="Stroke-5"/>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                                <NavLink to="/upload" className="navbar-inner-right-profile-menu-center-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Video</title>
                                        <g id="video" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="video-inner" transform="translate(2.514381, 5.114095)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <path
                                                    d="M13.6370476,4.55866688 C15.4751429,3.10152403 17.9418095,1.69200022 18.4084762,2.19676212 C19.1799048,3.02533355 19.1132381,10.9110478 18.4084762,11.6634288 C17.9799048,12.1300955 15.4941905,10.7205716 13.6370476,9.2729526"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M-6.21724894e-15,6.92285714 C-6.21724894e-15,1.73047619 1.7247619,-2.66453526e-15 6.90095238,-2.66453526e-15 C12.0761905,-2.66453526e-15 13.8009524,1.73047619 13.8009524,6.92285714 C13.8009524,12.1142857 12.0761905,13.8457143 6.90095238,13.8457143 C1.7247619,13.8457143 -6.21724894e-15,12.1142857 -6.21724894e-15,6.92285714 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                            </ul>
                        </div>
                        <div className="navbar-inner-right-profile-menu-bottom">
                            <ul className="navbar-inner-right-profile-menu-bottom-list">
                                <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Video</title>
                                        <g id="video" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="video-inner" transform="translate(2.514381, 5.114095)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <path
                                                    d="M13.6370476,4.55866688 C15.4751429,3.10152403 17.9418095,1.69200022 18.4084762,2.19676212 C19.1799048,3.02533355 19.1132381,10.9110478 18.4084762,11.6634288 C17.9799048,12.1300955 15.4941905,10.7205716 13.6370476,9.2729526"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M-6.21724894e-15,6.92285714 C-6.21724894e-15,1.73047619 1.7247619,-2.66453526e-15 6.90095238,-2.66453526e-15 C12.0761905,-2.66453526e-15 13.8009524,1.73047619 13.8009524,6.92285714 C13.8009524,12.1142857 12.0761905,13.8457143 6.90095238,13.8457143 C1.7247619,13.8457143 -6.21724894e-15,12.1142857 -6.21724894e-15,6.92285714 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Your Studio</span>
                                </li>
                                <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Lock</title>
                                        <g id="lock" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="lock-inner" transform="translate(3.500000, 2.000000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <path
                                                    d="M12.9709,7.4033 L12.9709,5.2543 C12.9399,2.7353 10.8719,0.7193 8.3539,0.7503 C5.8869,0.7813 3.8919,2.7673 3.8499,5.2343 L3.8499,7.4033"
                                                    id="Stroke-1"/>
                                                <line x1="8.4103" y1="12.1562" x2="8.4103" y2="14.3772"
                                                      id="Stroke-3"/>
                                                <path
                                                    d="M8.4103,6.8242 C2.6653,6.8242 0.7503,8.3922 0.7503,13.0952 C0.7503,17.7992 2.6653,19.3672 8.4103,19.3672 C14.1553,19.3672 16.0713,17.7992 16.0713,13.0952 C16.0713,8.3922 14.1553,6.8242 8.4103,6.8242 Z"
                                                    id="Stroke-5"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Filter Content</span>
                                </li>
                                <li className="navbar-inner-right-profile-menu-bottom-list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Setting</title>
                                        <g id="setting" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="setting-inner" transform="translate(3.500000, 2.500000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <path
                                                    d="M8.5,7 C9.88088012,7 11,8.11911988 11,9.5 C11,10.8808801 9.88088012,12 8.5,12 C7.11911988,12 6,10.8808801 6,9.5 C6,8.11911988 7.11911988,7 8.5,7 Z"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M16.6680023,4.75024695 L16.6680023,4.75024695 C15.9844554,3.55799324 14.4712377,3.15003899 13.2885153,3.83852352 C12.2597626,4.43613205 10.9740669,3.68838056 10.9740669,2.49217572 C10.9740669,1.11619444 9.86587758,0 8.4997646,0 L8.4997646,0 C7.13365161,0 6.02546233,1.11619444 6.02546233,2.49217572 C6.02546233,3.68838056 4.73976662,4.43613205 3.71199461,3.83852352 C2.52829154,3.15003899 1.01507378,3.55799324 0.331526939,4.75024695 C-0.351039204,5.94250065 0.053989269,7.46664934 1.23769234,8.15414609 C2.26546435,8.7527424 2.26546435,10.2472576 1.23769234,10.8458539 C0.053989269,11.5343384 -0.351039204,13.0584871 0.331526939,14.2497531 C1.01507378,15.4420068 2.52829154,15.849961 3.71101391,15.1624643 L3.71199461,15.1624643 C4.73976662,14.5638679 6.02546233,15.3116194 6.02546233,16.5078243 L6.02546233,16.5078243 C6.02546233,17.8838056 7.13365161,19 8.4997646,19 L8.4997646,19 C9.86587758,19 10.9740669,17.8838056 10.9740669,16.5078243 L10.9740669,16.5078243 C10.9740669,15.3116194 12.2597626,14.5638679 13.2885153,15.1624643 C14.4712377,15.849961 15.9844554,15.4420068 16.6680023,14.2497531 C17.3515491,13.0584871 16.9455399,11.5343384 15.7628176,10.8458539 L15.7618369,10.8458539 C14.7340648,10.2472576 14.7340648,8.7527424 15.7628176,8.15414609 C16.9455399,7.46664934 17.3515491,5.94250065 16.6680023,4.75024695 Z"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Settings</span>
                                </li>
                                <li className="navbar-inner-right-profile-menu-bottom-list-item-last"
                                    onClick={handleSignOut}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Arrow - Right Circle</title>
                                        <g id="arrow-right-circle" stroke="none" stroke-width="1"
                                           fill="none" fill-rule="evenodd" stroke-linecap="round"
                                           stroke-linejoin="round">
                                            <g id="arrow-right-circle-inner"
                                               transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(2.000000, 2.000000)"
                                               stroke="#000000" stroke-width="1.5">
                                                <path
                                                    d="M0.7503,10.0001 C0.7503,16.9371 3.0633,19.2501 10.0003,19.2501 C16.9373,19.2501 19.2503,16.9371 19.2503,10.0001 C19.2503,3.0631 16.9373,0.7501 10.0003,0.7501 C3.0633,0.7501 0.7503,3.0631 0.7503,10.0001 Z"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M6.5286,8.5582 C6.5286,8.5582 8.9206,12.0442 10.0006,12.0442 C11.0806,12.0442 13.4706,8.5582 13.4706,8.5582"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Sign Out</span>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-inner-right-profile-menu-shadow"></div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;