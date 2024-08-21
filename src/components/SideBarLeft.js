import React, { useContext, useState, useRef, useCallback, useEffect  } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from "react-router-dom";
import ScrollBar from './ScrollBar';

const SideBarLeft  = ({ profile }) => {
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        return savedWidth ? parseFloat(savedWidth) : 35;
    });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const sidebarRef = useRef(null);
    const isResizing = useRef(false);
    const prevWidth = useRef(sidebarWidth);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('sidebarWidth', sidebarWidth);
    }, [sidebarWidth]);

    const handleMouseMove = useCallback((e) => {
        if (isResizing.current) {
            e.preventDefault(); // Prevent text selection or other default actions
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const newWidth = Math.max(8, Math.min(40, ((e.clientX - sidebarRect.left) / window.innerWidth) * 190));

            // Check if newWidth crosses the thresholds
            if ((prevWidth.current >= 20 && newWidth < 20) || (prevWidth.current <= 8 && newWidth > 8) || (newWidth >= 20 || newWidth <= 8)) {
                setSidebarWidth(newWidth);
                prevWidth.current = newWidth;
            }
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        if (isResizing.current) {
            isResizing.current = false;
            setIsMouseDown(false);
            document.querySelector(".page-center").style.opacity = 1;
            document.querySelector(".sidebarright").style.opacity = 1;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [handleMouseMove, sidebarWidth]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault(); // Prevent text selection or other default actions
        isResizing.current = true;
        setIsMouseDown(true);
        document.querySelector(".page-center").style.opacity = .65;
        document.querySelector(".sidebarright").style.opacity = .65;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    const getResizeButtonStyle = () => {
        if (isMouseDown) {
            if (sidebarWidth <= 15) return {
                opacity: '1',
                animation: 'none'
            };
            if (sidebarWidth <= 21) return {
                opacity: '1',
                animation: 'resize-button .2s linear infinite'
            };
            if (sidebarWidth <= 22) return {
                opacity: '.6',
                animation: 'resize-button 1.4s linear infinite'
            };
            if (sidebarWidth <= 23) return {
                opacity: '.3',
                animation: 'resize-button 2.6s linear infinite'
            };
            if (sidebarWidth <= 22) return {
                opacity: '0',
                animation: 'none'
            };
        }
    };

    const getDisplayStyle = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 15) return { display: 'block' };
        return { display: 'none' }; // default
    };

    const getDisplayStyle2 = () => {
        if (sidebarWidth <= 8) return { display: 'none' };
        if (sidebarWidth > 15) return { display: 'flex' };
        return { display: 'none' }; // default
    };

    const getButtonStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1.75em 1em', borderRadius: '2em', justifyContent: 'center' };
        if (sidebarWidth > 15) return { padding: '1.75em 2.25em', borderRadius: '2em', justifyContent: 'flex-start' };
        return { padding: '1.75em 1em', borderRadius: '2em', justifyContent: 'center' };
    };

    const getPlaylistStyle = () => {
        if (sidebarWidth <= 8) return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
        if (sidebarWidth > 15) return { gridTemplateColumns: '5em 1fr', padding: '1em', borderRadius: '2.25em' };
        return { gridTemplateColumns: '1fr', padding: '.6em', borderRadius: '1.75em' };
    };

    const getMenuStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em' };
        if (sidebarWidth > 15) return { padding: '1.5em' };
        return { padding: '1em' }; // default
    };

    const getMenu2Style = () => {
        if (sidebarWidth <= 8) return { padding: '1em 1em 6em 1em' };
        if (sidebarWidth > 15) return { padding: '1.5em 1.5em 6em 1.5em' };
        return { padding: '1em 1em 6em 1em' }; // default
    };

    const getProfileMenuStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em' };
        if (sidebarWidth > 15) return { padding: '1.5em' };
        return { padding: '1em' }; // default
    };

    const getProfileMenuTopStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em', gridTemplateColumns: '1fr' };
        if (sidebarWidth > 15) return { padding: '1.5em', gridTemplateColumns: '4.5em 1fr' };
        return { padding: '1em', gridTemplateColumns: '1fr' }; // default
    };

    const getProfileMenuBottomStyle = () => {
        if (sidebarWidth <= 8) return { padding: '0', margin: '0 0 1em 0' };
        if (sidebarWidth > 15) return { padding: '0 0 0 6em', margin: '0 0 2em 0' };
        return { padding: '0', margin: '0 0 1em 0' }; // default
    };

    const getProfileMenuItemStyle = () => {
        if (sidebarWidth <= 8) return { padding: '1em 0' };
        if (sidebarWidth > 15) return { padding: '1em 0' };
        return { padding: '1em 0' }; // default
    };

    const getProfileMenuIconStyle = () => {
        if (sidebarWidth <= 8) return { height: '2.25em' };
        if (sidebarWidth > 15) return { height: '2em' };
        return { height: '2.25em' }; // default
    };


    useEffect(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            setSidebarWidth(parseFloat(savedWidth));
        }
    }, []);

    let pictureUrl;

    if (profile) {
        pictureUrl = `http://localhost:5000/${profile.profilePicture}`;
    }

    return (
        <div className="sidebar sidebarleft">
            <div id="sidebarleft-resize" className="sidebarleft-resize" onMouseDown={handleMouseDown}>
                <div className="sidebarleft-resize-button" style={getResizeButtonStyle()}>
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
            <div className="sidebar-inner sidebar-left" style={{width: `${sidebarWidth}em`}} ref={sidebarRef}>
                <ScrollBar className="sidebar-left-inner">
                    {profile ? (
                        <>
                            <div className="sidebar-left-profilemenu" style={getProfileMenuStyle()}>
                                <div className="sidebar-left-profilemenu-list">
                                    <NavLink to={`/channel/` + profile.name}
                                             className="sidebar-left-profilemenu-list-top"
                                             style={getProfileMenuTopStyle()}>
                                        <img className="sidebar-left-profilemenu-list-top-image" src={pictureUrl} alt="" />
                                        <div className="sidebar-left-profilemenu-list-top-text" style={getDisplayStyle()}>
                                            <p className="sidebar-left-profilemenu-list-top-text-displayname"><span>{profile.displayName}</span> {profile?.verified === 1 ? (
                                                <svg className="verified-icon" viewBox="0 0 22 22" aria-hidden="true" style={getDisplayStyle()}>
                                                    <g>
                                                        <linearGradient gradientUnits="userSpaceOnUse" id="c" x1="4.411"
                                                                        x2="18.083"
                                                                        y1="2.495" y2="21.508">
                                                            <stop offset="0"></stop>
                                                            <stop offset=".539"></stop>
                                                            <stop offset=".68"></stop>
                                                            <stop offset="1"></stop>
                                                            <stop offset="1"></stop>
                                                        </linearGradient>
                                                        <linearGradient gradientUnits="userSpaceOnUse" id="d" x1="5.355"
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
                                            ) : null}</p>
                                            <p className="sidebar-left-profilemenu-list-top-text-name">@{profile.name}</p>
                                        </div>
                                    </NavLink>
                                    <div className="sidebar-left-profilemenu-list-bottom" style={getProfileMenuBottomStyle()}>
                                        <div className="sidebar-left-profilemenu-list-bottom-line"
                                             style={getDisplayStyle()}>
                                            <div className="sidebar-left-profilemenu-list-bottom-line-curve curve1"></div>
                                            <div className="sidebar-left-profilemenu-list-bottom-line-curve curve2"></div>
                                            <div className="sidebar-left-profilemenu-list-bottom-line-curve curve3"></div>
                                            <div className="sidebar-left-profilemenu-list-bottom-line-curve curve4"></div>
                                        </div>
                                        <NavLink to={`/channel/` + profile.name}
                                                 className="sidebar-left-profilemenu-list-item" style={getProfileMenuItemStyle()}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1" style={getProfileMenuIconStyle()}>
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
                                            <p className="sidebar-left-profilemenu-list-item-text" style={getDisplayStyle()}>Feed</p>
                                        </NavLink>
                                        <NavLink to={`/channel/` + profile.name + `/videos`}
                                                 className="sidebar-left-profilemenu-list-item" style={getProfileMenuItemStyle()}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1" style={getProfileMenuIconStyle()}>
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
                                            <p className="sidebar-left-profilemenu-list-item-text" style={getDisplayStyle()}>Videos</p>
                                        </NavLink>
                                        <NavLink to={`/channel/` + profile.name + `/pictures`}
                                                 className="sidebar-left-profilemenu-list-item" style={getProfileMenuItemStyle()}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1" style={getProfileMenuIconStyle()}>
                                                <title>Image 2</title>
                                                <g id="image-2" stroke="none" stroke-width="1" fill="none"
                                                   fill-rule="evenodd" stroke-linecap="round"
                                                   stroke-linejoin="round">
                                                    <g id="image-2-inner" transform="translate(2.000000, 2.000000)"
                                                       stroke-width="1.5">
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
                                            <p className="sidebar-left-profilemenu-list-item-text" style={getDisplayStyle()}>Pictures</p>
                                        </NavLink>
                                        <NavLink to={`/channel/` + profile.name + `/playlists`}
                                                 className="sidebar-left-profilemenu-list-item" style={getProfileMenuItemStyle()}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1" style={getProfileMenuIconStyle()}>
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
                                            <p className="sidebar-left-profilemenu-list-item-text" style={getDisplayStyle()}>Playlists</p>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>

                        </>
                    )}
                    <div className="sidebar-left-menu" style={getMenuStyle()}>
                        <div className="sidebar-left-menu-list">
                            <NavLink to="/" className="sidebar-left-menu-list-item" style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Home</title>
                                    <g id="home" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="home-inner" transform="translate(2.400000, 2.000000)"
                                           stroke="#000000"
                                           stroke-width="1.5">
                                            <line x1="6.6787" y1="14.1354" x2="12.4937" y2="14.1354"
                                                  id="Stroke-1"/>
                                            <path
                                                d="M1.24344979e-14,11.713 C1.24344979e-14,6.082 0.614,6.475 3.919,3.41 C5.365,2.246 7.615,0 9.558,0 C11.5,0 13.795,2.235 15.254,3.41 C18.559,6.475 19.172,6.082 19.172,11.713 C19.172,20 17.213,20 9.586,20 C1.959,20 1.24344979e-14,20 1.24344979e-14,11.713 Z"
                                                id="Stroke-2"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="sidebar-left-menu-list-item-text"
                                   style={getDisplayStyle()}>Home</p>
                            </NavLink>
                            <NavLink to="/pictures" className="sidebar-left-menu-list-item"
                                     style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <title>Discovery</title>
                                    <g id="discovery" stroke="none" stroke-width="1" fill="none"
                                       fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="discovery-inner" transform="translate(2.000000, 2.000000)"
                                           stroke="#000000"
                                           stroke-width="1.5">
                                            <path
                                                d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                                id="Stroke-1"/>
                                            <polygon id="Stroke-3"
                                                     points="6.6978 13.3023 8.2718 8.2723 13.3018 6.6983 11.7278 11.7273"/>
                                        </g>
                                    </g>
                                </svg>
                                <p className="sidebar-left-menu-list-item-text"
                                   style={getDisplayStyle()}>Discover</p>
                            </NavLink>
                            <NavLink to="/live" className="sidebar-left-menu-list-item"
                                     style={getButtonStyle()}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
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
                                <p className="sidebar-left-menu-list-item-text"
                                   style={getDisplayStyle()}>Live</p>
                            </NavLink>
                            {user && (
                                <NavLink to="/playlists" className="sidebar-left-menu-list-item"
                                         style={getButtonStyle()}>
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
                                    <p className="sidebar-left-menu-list-item-text"
                                       style={getDisplayStyle()}>Playlists</p>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="sidebar-left-divider">
                        <p className="sidebar-left-divider-text" style={getDisplayStyle()}>Playlists</p>
                        <div className="sidebar-left-divider-line"></div>
                    </div>
                    <div className="sidebar-left-playlists" style={getMenu2Style()}>
                        <div className="sidebar-left-playlists-list">
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Playlist
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/173558115_790424168538166_2849205650520624862_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">A Longer
                                        Playlist
                                        Nameee</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/135060407_240088560971081_6826181255437109694_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/317227331_166200936047228_5967614100849288512_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/0476d014bcfd4716611c1c59f8f7611b.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Playlist
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/173558115_790424168538166_2849205650520624862_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">A Longer
                                        Playlist
                                        Nameee</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/135060407_240088560971081_6826181255437109694_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Poopie doopie
                                        Name</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                            <NavLink className="sidebar-left-playlists-list-item" style={getPlaylistStyle()}>
                                <div className="sidebar-left-playlists-list-item-left">
                                    <div className="sidebar-left-playlists-list-item-left-button">
                                        <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                             id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                                  transform="translate(16 6) rotate(90)" fill="none"
                                                  stroke="#000"
                                                  stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <img className="sidebar-left-playlists-list-item-left-image"
                                         src={process.env.PUBLIC_URL + `/images/gallery/317227331_166200936047228_5967614100849288512_n.jpg`}
                                         alt=""/>
                                </div>
                                <div className="sidebar-left-playlists-list-item-right"
                                     style={getDisplayStyle2()}>
                                    <h3 className="sidebar-left-playlists-list-item-right-title">Shoort</h3>
                                    <p className="sidebar-left-playlists-list-item-right-subtitle">41 Videos</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </ScrollBar>
            </div>
        </div>
    );
};

export default SideBarLeft;
