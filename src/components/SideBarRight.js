import React, { useContext, useState , useRef, useCallback } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import ScrollBar from './ScrollBar';


const SideBarRight = ({
                          isMenuVisible,
                          isVideoVisible,
                          videoDetails,
                          subscriberCount,
                          isSubscribed,
                          handleSubscribe
                      }) => {

    const [sidebarRightWidth, setSidebarRightWidth] = useState(35);
    const sidebarRightRef = useRef(null);
    const isResizing = useRef(false);
    const prevRightWidth = useRef(35);

    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const handleMouseMoveRight = useCallback((e) => {
        if (isResizing.current) {
            e.preventDefault(); // Prevent text selection or other default actions
            const sidebarRightRect = sidebarRightRef.current.getBoundingClientRect();
            const newRightWidth = Math.max(30, Math.min(50, ((e.clientX - sidebarRightRect.right) / window.innerWidth) * 190));

            setSidebarRightWidth(newRightWidth);
            prevRightWidth.current = newRightWidth;
        }
    }, []);

    const handleMouseUpRight = useCallback(() => {
        if (isResizing.current) {
            isResizing.current = false;
            document.removeEventListener('mousemove', handleMouseMoveRight);
            document.removeEventListener('mouseup', handleMouseUpRight);
        }
    }, [handleMouseMoveRight, sidebarRightWidth]);

    const handleMouseDownRight = useCallback((e) => {
        e.preventDefault(); // Prevent text selection or other default actions
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMoveRight);
        document.addEventListener('mouseup', handleMouseUpRight);
    }, [handleMouseMoveRight, handleMouseUpRight]);

    let profilePictureUrl, profileBannerUrl;

    if (user) {
        profilePictureUrl = `${process.env.PUBLIC_URL}/${user.profilePicture}`;
        profileBannerUrl = `${process.env.PUBLIC_URL}/${user.banner}`;
    }

    return (
        <div className="sidebar sidebarright" style={{ display: isMenuVisible || isVideoVisible ? 'block' : 'none' }}>
            <div id="sidebarright-resize" className="sidebarright-resize" onMouseDown={handleMouseDownRight}></div>
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
                                                <h3 className="sidebar-right-menu-inner-top-left-inner-text-title">{user.displayName}</h3>
                                                <p className="sidebar-right-menu-inner-top-left-inner-text-subtitle">@{user.name}</p>
                                            </div>
                                        </NavLink>
                                        <div className="sidebar-right-menu-inner-top-left-container">
                                            <NavLink to="/settings/profile" className="blackbutton">
                                                <span>Edit profile</span>
                                                <div className="blackbutton-shadow"></div>
                                            </NavLink>
                                        </div>
                                        <div className="sidebar-right-menu-inner-top-left-overlay"></div>
                                        <img className="sidebar-right-menu-inner-top-left-background"
                                             src={profileBannerUrl} alt=""/>
                                    </div>
                                </div>
                                <div className="sidebar-right-menu-inner-center">
                                    <div className="sidebar-right-menu-inner-center-grid">
                                        <NavLink to="/upload" className="blackbutton">
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
                                        <NavLink to="/studio" className="blackbutton">
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
                                        <NavLink to="/settings/account" className="blackbutton">
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
                    <div className="video-inner-right" style={{ display: isVideoVisible && !isMenuVisible ? 'grid' : 'none' }}>
                        <div className="video-inner-right-box">
                            <div className="video-inner-right-box-top">
                                <div className="video-inner-right-box-top-user">
                                    <NavLink to={`/channel/${videoDetails.creator.name}`}
                                             className="video-inner-right-box-top-user-inner">
                                        <div className="video-inner-right-box-top-user-container">
                                            <img className="video-inner-right-box-top-user-container-image"
                                                 src={`http://localhost:5000/${videoDetails.creator.profilePicture}`}
                                                 alt=""/>
                                        </div>
                                        <div className="video-inner-right-box-top-user-text">
                                            <h3 className="video-inner-right-box-top-user-text-username">
                                                <span>{videoDetails.creator.displayName}</span>
                                                <svg className="verified-icon" viewBox="0 0 22 22"
                                                     aria-hidden="true">
                                                    <g>
                                                        <linearGradient gradientUnits="userSpaceOnUse" id="a"
                                                                        x1="4.411"
                                                                        x2="18.083"
                                                                        y1="2.495" y2="21.508">
                                                            <stop offset="0"></stop>
                                                            <stop offset=".539"></stop>
                                                            <stop offset=".68"></stop>
                                                            <stop offset="1"></stop>
                                                            <stop offset="1"></stop>
                                                        </linearGradient>
                                                        <linearGradient gradientUnits="userSpaceOnUse" id="b"
                                                                        x1="5.355"
                                                                        x2="16.361"
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
                                            </h3>
                                            <p className="video-inner-right-box-top-user-text-date">{subscriberCount} Subscribers</p>
                                        </div>
                                    </NavLink>
                                    <div className="video-inner-right-box-top-container">
                                        {isSubscribed ? (
                                            <button className="blackbutton" onClick={handleSubscribe}
                                                    disabled={isSubscribed}>
                                                Subscribed
                                                <div className="blackbutton-shadow"></div>
                                            </button>
                                        ) : (
                                            <button className="mainbutton" onClick={handleSubscribe}
                                                    disabled={isSubscribed}>
                                                Subscribe
                                            </button>
                                        )}
                                    </div>
                                    <div className="video-inner-right-box-top-user-overlay"></div>
                                    <img className="video-inner-right-box-top-user-background"
                                         src={`http://localhost:5000/${videoDetails.creator.banner}`}
                                         alt=""/>
                                </div>
                            </div>
                            <div className="video-inner-right-box-center">
                                <h3 className="video-inner-right-box-center-title">{videoDetails.title}</h3>
                                <p className="video-inner-right-box-center-subtitle">
                                    <NumericFormat
                                        value={videoDetails.views}
                                        thousandSeparator=" "
                                        displayType="text"
                                        renderText={(value) => <b>{value}</b>}
                                    /> Views &middot; {format(new Date(videoDetails.datePosted), 'MMM d, yyyy')}
                                </p>
                                <p className="video-inner-right-box-center-description">{videoDetails.description}</p>
                            </div>
                            <div className="video-inner-right-box-bottom">
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Heart</title>
                                        <g id="heart" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="heart-inner" transform="translate(2.550170, 3.550158)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <path
                                                    d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"
                                                    id="Stroke-1"/>
                                                <path
                                                    d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"
                                                    id="Stroke-3"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="homebar-inner-text">{videoDetails.likes}</p>
                                </div>
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Chat</title>
                                        <g id="chat" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="chat-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000">
                                                <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"
                                                      id="Stroke-11" stroke-width="2"/>
                                                <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413"
                                                      id="Stroke-13"
                                                      stroke-width="2"/>
                                                <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413"
                                                      id="Stroke-15"
                                                      stroke-width="2"/>
                                                <path
                                                    d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"
                                                    id="Stroke-4" stroke-width="1.5"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="homebar-inner-text">0</p>
                                </div>
                                <div className="video-inner-right-box-bottom-item">
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
                                </div>
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Download</title>
                                        <g id="download" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="download-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="9.8791" y1="12.791" x2="9.8791" y2="0.75"
                                                      id="Stroke-1"/>
                                                <polyline id="Stroke-3"
                                                          points="12.7951 9.8642 9.8791 12.7922 6.9631 9.8642"/>
                                                <path
                                                    d="M14.3703,5.2587 C17.9493,5.5887 19.2503,6.9287 19.2503,12.2587 C19.2503,19.3587 16.9393,19.3587 10.0003,19.3587 C3.0593,19.3587 0.7503,19.3587 0.7503,12.2587 C0.7503,6.9287 2.0503,5.5887 5.6303,5.2587"
                                                    id="Stroke-4"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="video-inner-right-box-shadow"></div>
                        </div>
                        <div className="video-inner-right-box-comments">
                            <div className="video-inner-right-box-comments-top">
                                <h3 className="video-inner-right-box-comments-top-title">Comments</h3>
                            </div>
                            <div className="video-inner-right-box-comments-center">

                            </div>
                            <div className="video-inner-right-box-comments-bottom">

                            </div>
                            <div className="video-inner-right-box-comments-shadow"></div>
                        </div>
                    </div>
                    ) : null}
                </ScrollBar>
            </div>
        </div>
    );
};

export default SideBarRight;
