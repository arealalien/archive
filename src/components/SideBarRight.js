import React, { useContext, useState , useRef, useCallback, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import ScrollBar from './ScrollBar';
import VideosSec from "./videos/VideosSec";

const SideBarRight = ({
                          isMenuVisible,
                          isVideoVisible,
                          isProfileVisible,
                          isSettingsVisible,
                          videoDetails,
                          profile,
                          subscriberCount,
                          dateSubscribed,
                          isSubscribed,
                          handleSubscribe
}) => {
    const [sidebarRightWidth, setSidebarRightWidth] = useState(() => {
        const savedRightWidth = localStorage.getItem('sidebarRightWidth');
        return savedRightWidth ? parseFloat(savedRightWidth) : 35;
    });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const sidebarRightRef = useRef(null);
    const isResizingRight = useRef(false);
    const prevRightWidth = useRef(sidebarRightWidth);

    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('sidebarRightWidth', sidebarRightWidth);
    }, [sidebarRightWidth]);

    const location = useLocation();

    const isActiveLink = (path) => {
        // Compare the current location pathname with the given path
        return location.pathname === path;
    };

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    };

    const handleMouseMoveRight = useCallback((e) => {
        if (isResizingRight.current) {
            e.preventDefault(); // Prevent text selection or other default actions
            const sidebarRightRect = sidebarRightRef.current.getBoundingClientRect();
            const newRightWidth = Math.max(25, Math.min(50, ((sidebarRightRect.right - e.clientX) / window.innerWidth) * 190));

            if ((prevRightWidth.current <= 35 && newRightWidth > 35) ||
                (prevRightWidth.current >= 35 && newRightWidth < 35) ||
                (newRightWidth <= 32 || newRightWidth >= 38)) {
                setSidebarRightWidth(newRightWidth);
                prevRightWidth.current = newRightWidth;
            }
        }
    }, []);

    const handleMouseUpRight = useCallback(() => {
        if (isResizingRight.current) {
            isResizingRight.current = false;
            setIsMouseDown(false);
            document.querySelector(".page-center").style.opacity = 1;
            document.querySelector(".sidebarleft").style.opacity = 1;
            document.removeEventListener('mousemove', handleMouseMoveRight);
            document.removeEventListener('mouseup', handleMouseUpRight);
        }
    }, [handleMouseMoveRight, sidebarRightWidth]);

    const handleMouseDownRight = useCallback((e) => {
        e.preventDefault(); // Prevent text selection or other default actions
        isResizingRight.current = true;
        setIsMouseDown(true);
        document.querySelector(".page-center").style.opacity = .65;
        document.querySelector(".sidebarleft").style.opacity = .65;
        document.addEventListener('mousemove', handleMouseMoveRight);
        document.addEventListener('mouseup', handleMouseUpRight);
    }, [handleMouseMoveRight, handleMouseUpRight]);

    const getResizeButtonStyle = () => {
        if (isMouseDown) {
            if (sidebarRightWidth <= 29) return {
                opacity: '0',
                animation: 'none'
            };
            if (sidebarRightWidth <= 30) return {
                opacity: '.3',
                animation: 'resize-button 2.6s linear infinite'
            };
            if (sidebarRightWidth <= 31) return {
                opacity: '.6',
                animation: 'resize-button 1.4s linear infinite'
            };
            if (sidebarRightWidth <= 32) return {
                opacity: '1',
                animation: 'resize-button .2s linear infinite'
            };
            if (sidebarRightWidth <= 34) return {
                opacity: '1',
                animation: 'none'
            };
            if (sidebarRightWidth <= 35) return {
                opacity: '1',
                animation: 'none'
            };
            if (sidebarRightWidth <= 36) return {
                opacity: '1',
                animation: 'none'
            };
            if (sidebarRightWidth <= 38) return {
                opacity: '1',
                animation: 'resize-button .2s linear infinite'
            };
            if (sidebarRightWidth <= 39) return {
                opacity: '.6',
                animation: 'resize-button 1.4s linear infinite'
            };
            if (sidebarRightWidth <= 40) return {
                opacity: '.3',
                animation: 'resize-button 2.6s linear infinite'
            };
            if (sidebarRightWidth <= 41) return {
                opacity: '0',
                animation: 'none'
            };
        }
    };

    useEffect(() => {
        const savedRightWidth = localStorage.getItem('sidebarRightWidth');
        if (savedRightWidth) {
            setSidebarRightWidth(parseFloat(savedRightWidth));
        }
    }, []);

    let profilePictureUrl, profileBannerUrl;

    if (user) {
        profilePictureUrl = `${process.env.PUBLIC_URL}/${user.profilePicture}`;
        profileBannerUrl = `${process.env.PUBLIC_URL}/${user.banner}`;
    }

    let pProfilePictureUrl;

    if (profile) {
        pProfilePictureUrl = `${process.env.PUBLIC_URL}/${profile.profilePicture}`;
    }

    let pictureUrl;

    if (profile) {
        pictureUrl = `http://localhost:5000/${profile.profilePicture}`;
    }

    return (
        <div className="sidebar sidebarright" style={{ display: isMenuVisible || isVideoVisible || isProfileVisible || isSettingsVisible ? 'block' : 'none' }}>
            <div id="sidebarright-resize" className="sidebarright-resize" onMouseDown={handleMouseDownRight}>
                <div className="sidebarright-resize-button" style={getResizeButtonStyle()}>
                    <svg id="Xnix_Line_Magnet" data-name="Xnix/Line/Magnet"
                         width="24"
                         height="24" viewBox="0 0 24 24">
                        <path id="Vector"
                              d="M6,14A6,6,0,0,1,0,8V4.5a1,1,0,0,1,1-1H2a1,1,0,0,1,1,1V8A3,3,0,0,0,9,8V4.5a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1V8A6,6,0,0,1,6,14Z"
                              transform="translate(6 5)" fill="none" stroke="#000" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Vector-2" data-name="Vector" d="M9,6h3M0,6H3M6,0,5,2H7L6,4" transform="translate(6 5)"
                              fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"/>
                    </svg>
                </div>
            </div>
            <div className="sidebar-inner sidebar-right" style={{width: `${sidebarRightWidth}em`}}
                 ref={sidebarRightRef}>
                <ScrollBar className="sidebar-right-inner">
                    {user ? (
                        <div className="sidebar-right-menu" style={{display: isMenuVisible ? 'block' : 'none'}}>
                            <div className="sidebar-right-menu-inner">
                                <div className="sidebar-right-menu-inner-top">
                                    <div className="sidebar-right-menu-inner-top-left">
                                        <NavLink to={`/channel/` + user?.name}
                                                 className="sidebar-right-menu-inner-top-left-inner">
                                            <img className="sidebar-right-menu-inner-top-left-inner-image"
                                                 src={profilePictureUrl}
                                                 alt="Profile"/>
                                            <div className="sidebar-right-menu-inner-top-left-inner-text">
                                                <h3 className="sidebar-right-menu-inner-top-left-inner-text-title">{user.displayName} {user?.verified === 1 ? (
                                                    <img src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                                ) : null}</h3>
                                                <p className="sidebar-right-menu-inner-top-left-inner-text-subtitle">@{user.name}</p>
                                            </div>
                                        </NavLink>
                                        <div className="sidebar-right-menu-inner-top-left-container">
                                            <NavLink to="/settings/profile" className="whitebutton">
                                                <span>Edit profile</span>
                                                <div className="whitebutton-shadow"></div>
                                            </NavLink>
                                        </div>
                                        <div className="sidebar-right-menu-inner-top-left-overlay"></div>
                                        <img className="sidebar-right-menu-inner-top-left-background"
                                             src={profileBannerUrl} alt=""/>
                                    </div>
                                </div>
                                <div className="sidebar-right-menu-inner-center">
                                    <div className="sidebar-right-menu-inner-center-grid">
                                        <NavLink to="/upload" className="darkbutton">
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
                                            <span>Upload</span>
                                        </NavLink>
                                        <NavLink to="/studio" className="darkbutton">
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
                                        </NavLink>
                                        <NavLink to="/settings/account" className="darkbutton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                                 viewBox="0 0 24 24" version="1.1">
                                                <title>profile</title>
                                                <g id="profile" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="profile-inner" transform="translate(5.000000, 2.400000)"
                                                       stroke="#000000" stroke-width="1.5">
                                                        <path
                                                            d="M6.84454545,19.261909 C3.15272727,19.261909 -8.52651283e-14,18.6874153 -8.52651283e-14,16.3866334 C-8.52651283e-14,14.0858516 3.13272727,11.961909 6.84454545,11.961909 C10.5363636,11.961909 13.6890909,14.0652671 13.6890909,16.366049 C13.6890909,18.6658952 10.5563636,19.261909 6.84454545,19.261909 Z"
                                                            id="Stroke-1"/>
                                                        <path
                                                            d="M6.83729838,8.77363636 C9.26002565,8.77363636 11.223662,6.81 11.223662,4.38727273 C11.223662,1.96454545 9.26002565,-1.0658141e-14 6.83729838,-1.0658141e-14 C4.41457111,-1.0658141e-14 2.45,1.96454545 2.45,4.38727273 C2.44184383,6.80181818 4.39184383,8.76545455 6.80638929,8.77363636 C6.81729838,8.77363636 6.82729838,8.77363636 6.83729838,8.77363636 Z"
                                                            id="Stroke-3"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span>Account Settings</span>
                                        </NavLink>
                                        <div className="sidebar-right-menu-inner-center-grid-divider"></div>
                                        <NavLink to="/settings/account" className="darkbutton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                                 viewBox="0 0 24 24" version="1.1">
                                                <title>Edit</title>
                                                <g id="edit" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="edit-inner" transform="translate(3.500000, 3.500000)"
                                                       stroke="#000000" stroke-width="1.5">
                                                        <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078"
                                                              id="Stroke-1"/>
                                                        <path
                                                            d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                                            id="Stroke-3"/>
                                                        <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624"
                                                              id="Stroke-5"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span>Dark</span>
                                        </NavLink>
                                        <NavLink to="/settings/account" className="darkbutton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                                 viewBox="0 0 24 24" version="1.1">
                                                <title>info square</title>
                                                <g id="info-square" stroke="none" stroke-width="1"
                                                   fill="none" fill-rule="evenodd" stroke-linecap="round"
                                                   stroke-linejoin="round">
                                                    <g id="info-square-inner" transform="translate(2.750200, 2.749900)"
                                                       stroke="#000000" stroke-width="1.5">
                                                        <path
                                                            d="M0,9.25 C0,2.313 2.313,0 9.25,0 C16.187,0 18.5,2.313 18.5,9.25 C18.5,16.187 16.187,18.5 9.25,18.5 C2.313,18.5 0,16.187 0,9.25 Z"
                                                            id="Stroke-1"
                                                            transform="translate(9.250000, 9.250000) rotate(-180.000000) translate(-9.250000, -9.250000) "/>
                                                        <line x1="9.25" y1="9.2501" x2="9.25" y2="13.1451" id="Stroke-3"
                                                              transform="translate(9.250000, 11.197600) rotate(-180.000000) translate(-9.250000, -11.197600) "/>
                                                        <line x1="9.2453" y1="5.7501" x2="9.2543" y2="5.7501"
                                                              id="Stroke-15"
                                                              transform="translate(9.249800, 5.750100) rotate(-180.000000) translate(-9.249800, -5.750100) "/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span>Info</span>
                                        </NavLink>
                                        <NavLink to="/settings/account" className="darkbutton">
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
                                        </NavLink>
                                        <div className="sidebar-right-menu-inner-center-grid-divider"></div>
                                        <div className="mainbutton" onClick={handleSignOut}>
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
                                            <span>Sign out</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    {isVideoVisible && videoDetails && videoDetails.creator ? (
                        <div className="video-inner-right"
                             style={{display: isVideoVisible && !isMenuVisible ? 'grid' : 'none'}}>
                            <div className="sidebar-videos videos-inner">
                                <VideosSec/>
                            </div>
                        </div>
                    ) : null}
                    {isSettingsVisible ? (
                        <>
                            <div className="settings-menu-container"
                                 style={{display: isSettingsVisible && !isMenuVisible ? 'flex' : 'none'}}>
                            <div className="settings-menu-container-inner">
                                    <ul className="settings-menu-container-inner-list">
                                        <NavLink to="/settings/profile" className="settings-menu-container-inner-list-item">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <title>Star</title>
                                                <g id="star" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="star-inner" transform="translate(3.000000, 3.000000)"
                                                       stroke="#000000"
                                                       stroke-width="1.5">
                                                        <path
                                                            d="M9,0 C6.96384545,0 6.77134103,3.54652262 5.55911318,4.79957421 C4.34688533,6.05262581 0.578198764,4.61991709 0.0545867365,6.84402682 C-0.467925266,9.06927362 2.92235261,9.82428837 3.34036221,11.7334296 C3.76057187,13.6425708 1.68922429,16.3249199 3.45916494,17.6598406 C5.2291056,18.9936242 7.13434937,15.9747022 9,15.9747022 C10.8656351,15.9747022 12.7708788,18.9936242 14.5408195,17.6598406 C16.3107602,16.3249199 14.2405126,13.6425708 14.6596222,11.7334296 C15.0787319,9.82428837 18.4679097,9.06927362 17.9453977,6.84402682 C17.4228857,4.61991709 13.6530991,6.05262581 12.4419713,4.79957421 C11.2297434,3.54652262 11.036139,0 9,0 Z"
                                                            id="Stroke-1"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p className="settings-menu-container-inner-list-item-name">Profile settings</p>
                                        </NavLink>
                                        <NavLink to="/settings/account" className="settings-menu-container-inner-list-item">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px"
                                                 viewBox="0 0 24 24" version="1.1">
                                                <title>Profile</title>
                                                <g id="profile" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="profile-inner" transform="translate(5.000000, 2.400000)"
                                                       stroke-width="1.5">
                                                        <path
                                                            d="M6.84454545,19.261909 C3.15272727,19.261909 -8.52651283e-14,18.6874153 -8.52651283e-14,16.3866334 C-8.52651283e-14,14.0858516 3.13272727,11.961909 6.84454545,11.961909 C10.5363636,11.961909 13.6890909,14.0652671 13.6890909,16.366049 C13.6890909,18.6658952 10.5563636,19.261909 6.84454545,19.261909 Z"
                                                            id="Stroke-1"/>
                                                        <path
                                                            d="M6.83729838,8.77363636 C9.26002565,8.77363636 11.223662,6.81 11.223662,4.38727273 C11.223662,1.96454545 9.26002565,-1.0658141e-14 6.83729838,-1.0658141e-14 C4.41457111,-1.0658141e-14 2.45,1.96454545 2.45,4.38727273 C2.44184383,6.80181818 4.39184383,8.76545455 6.80638929,8.77363636 C6.81729838,8.77363636 6.82729838,8.77363636 6.83729838,8.77363636 Z"
                                                            id="Stroke-3"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p className="settings-menu-container-inner-list-item-name">Account settings</p>
                                        </NavLink>
                                        <NavLink to="/settings/layout" className="settings-menu-container-inner-list-item">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <title>Edit</title>
                                                <g id="edit" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="edit-inner" transform="translate(3.500000, 3.500000)"
                                                       stroke="#000000"
                                                       stroke-width="1.5">
                                                        <line x1="9.8352" y1="16.0078" x2="16.2122" y2="16.0078"
                                                              id="Stroke-1"/>
                                                        <path
                                                            d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z"
                                                            id="Stroke-3"/>
                                                        <line x1="7.0041" y1="3.7114" x2="11.8681" y2="7.3624"
                                                              id="Stroke-5"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p className="settings-menu-container-inner-list-item-name">Layout Settings</p>
                                        </NavLink>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : null}
                    {isProfileVisible && profile ? (
                        <>
                            <div className="profile-menu-container"
                                 style={{display: isProfileVisible && !isMenuVisible ? 'flex' : 'none'}}>
                                <div className="profile-menu-container-inner">
                                    <div className="profile-menu-container-inner-button">
                                        <p className="profile-menu-container-inner-button-text">@{profile?.name}</p>
                                        <div className="profile-menu-container-inner-live-shadow"></div>
                                    </div>
                                    {user && profile && user.name === profile.name ? (
                                        <NavLink className="profile-menu-container-inner-cta subscribed whitebutton"
                                                 to="/settings/profile">
                                            Edit profile
                                            <div className="whitebutton-shadow"></div>
                                        </NavLink>
                                    ) : (
                                        isSubscribed ? (
                                            <button className="profile-menu-container-inner-cta subscribed whitebutton"
                                                    onClick={handleSubscribe}
                                                    disabled={isSubscribed}>
                                                Subscribed
                                                <div className="whitebutton-shadow"></div>
                                            </button>
                                        ) : (
                                            <button className="profile-menu-container-inner-cta mainbutton"
                                                    onClick={handleSubscribe}
                                                    disabled={isSubscribed}>
                                                Subscribe
                                            </button>
                                        )
                                    )}
                                    <div className="profile-menu-container-inner-overlay2"></div>
                                    <div className="profile-menu-container-inner-overlay"></div>
                                    <img className="profile-menu-container-inner-image" src={pProfilePictureUrl}
                                         alt=""/>
                                </div>
                                <div className="profile-menu-container-details">
                                    <h3 className="profile-menu-container-details-username">
                                        <span>{profile?.displayName}</span>
                                        {profile?.verified === 1 ? (
                                            <img src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                        ) : null}
                                    </h3>
                                    <NavLink to={`/channel/` + profile.name + `/subscribers`}
                                             className="profile-menu-container-details-subscribers">{subscriberCount} Subscribers</NavLink>
                                    {dateSubscribed && (
                                        <p className="profile-menu-container-details-subscribers">
                                            Subscribed {formatDistanceToNow(new Date(dateSubscribed))} ago
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="sidebar-right-profilemenu"
                                 style={{display: isProfileVisible && !isMenuVisible ? 'block' : 'none'}}>
                                <div className="sidebar-right-profilemenu-list">
                                        <NavLink to={`/channel/` + profile?.name}
                                                 className={() =>
                                                     `sidebar-right-profilemenu-list-item ${isActiveLink(`/channel/${profile?.name}`) ? 'active' : ''}`
                                                 }>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <title>Star</title>
                                                <g id="star" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round"
                                                   stroke-linejoin="round">
                                                    <g id="star-inner" transform="translate(3.000000, 3.000000)"
                                                       stroke-width="1.5">
                                                        <path
                                                            d="M9,0 C6.96384545,0 6.77134103,3.54652262 5.55911318,4.79957421 C4.34688533,6.05262581 0.578198764,4.61991709 0.0545867365,6.84402682 C-0.467925266,9.06927362 2.92235261,9.82428837 3.34036221,11.7334296 C3.76057187,13.6425708 1.68922429,16.3249199 3.45916494,17.6598406 C5.2291056,18.9936242 7.13434937,15.9747022 9,15.9747022 C10.8656351,15.9747022 12.7708788,18.9936242 14.5408195,17.6598406 C16.3107602,16.3249199 14.2405126,13.6425708 14.6596222,11.7334296 C15.0787319,9.82428837 18.4679097,9.06927362 17.9453977,6.84402682 C17.4228857,4.61991709 13.6530991,6.05262581 12.4419713,4.79957421 C11.2297434,3.54652262 11.036139,0 9,0 Z"
                                                            id="Stroke-1"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p className="sidebar-right-profilemenu-list-item-text">Feed</p>
                                        </NavLink>
                                        <NavLink to={`/channel/` + profile?.name + `/videos`}
                                                 className={() =>
                                                     `sidebar-right-profilemenu-list-item ${isActiveLink(`/channel/${profile?.name}/videos`) ? 'active' : ''}`
                                                 }>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <title>Video</title>
                                                <g id="video" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round"
                                                   stroke-linejoin="round">
                                                    <g id="video-inner" transform="translate(2.514381, 5.114095)"
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
                                            <p className="sidebar-right-profilemenu-list-item-text">Videos</p>
                                        </NavLink>
                                        <NavLink to={`/channel/` + profile?.name + `/playlists`}
                                                 className={() =>
                                                     `sidebar-right-profilemenu-list-item ${isActiveLink(`/channel/${profile?.name}/playlists`) ? 'active' : ''}`
                                                 }>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <title>Folder</title>
                                                <g id="folder" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                    <g id="folder-inner" transform="translate(2.500000, 2.500000)"
                                                       stroke="#000000"
                                                       stroke-width="1.5">
                                                        <line x1="4.8057" y1="12.0742685" x2="14.3987" y2="12.0742685"
                                                              id="Stroke-1"/>
                                                        <path
                                                            d="M-1.13686838e-13,5.29836453 C-1.13686838e-13,2.85645977 1.25,0.75931691 3.622,0.272650243 C5.993,-0.214968804 7.795,-0.0463973758 9.292,0.761221672 C10.79,1.56884072 10.361,2.76122167 11.9,3.63645977 C13.44,4.51265024 15.917,3.19645977 17.535,4.94217405 C19.229,6.7697931 19.2200005,9.57550739 19.2200005,11.3640788 C19.2200005,18.1602693 15.413,18.6993169 9.61,18.6993169 C3.807,18.6993169 -1.13686838e-13,18.2288407 -1.13686838e-13,11.3640788 L-1.13686838e-13,5.29836453 Z"
                                                            id="Stroke-2"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p className="sidebar-right-profilemenu-list-item-text">Playlists</p>
                                        </NavLink>
                                </div>
                            </div>
                        </>
                    ) : null}
                </ScrollBar>
            </div>
        </div>
    );
};

export default SideBarRight;
