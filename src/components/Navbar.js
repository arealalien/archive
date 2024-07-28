import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ profile }) => {
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);
    const profileMenuRef = useRef(null);
    const inputRef = useRef(null);
    const inputSearchRef = useRef(null);
    const searchRef = useRef(null);
    const homeRef = useRef(null);
    const discoveryRef = useRef(null);
    const liveRef = useRef(null);
    const playlistsRef = useRef(null);
    const notificationsRef = useRef(null);


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

    const handleInput = () => {
        if (inputRef.current) {
            inputRef.current.style.opacity = '1';
            inputRef.current.style.pointerEvents = 'auto';
            inputRef.current.style.maxWidth = '100%';
            inputRef.current.style.left = '0';
            inputSearchRef.current.focus();

            searchRef.current.style.opacity = '0';
            searchRef.current.style.transform = 'scale(0, 0)';
            searchRef.current.style.pointerEvents = 'none';
            homeRef.current.style.opacity = '0';
            homeRef.current.style.transform = 'scale(0, 0)';
            homeRef.current.style.pointerEvents = 'none';
            discoveryRef.current.style.opacity = '0';
            discoveryRef.current.style.transform = 'scale(0, 0)';
            discoveryRef.current.style.pointerEvents = 'none';
            liveRef.current.style.opacity = '0';
            liveRef.current.style.transform = 'scale(0, 0)';
            liveRef.current.style.pointerEvents = 'none';
            
            if (user) {
                playlistsRef.current.style.opacity = '0';
                playlistsRef.current.style.transform = 'scale(0, 0)';
                playlistsRef.current.style.pointerEvents = 'none';
                notificationsRef.current.style.opacity = '0';
                notificationsRef.current.style.transform = 'scale(0, 0)';
                notificationsRef.current.style.pointerEvents = 'none';
            }
        }
    };

    const shrinkSearchBar = () => {
        if (inputRef.current) {
            inputRef.current.style.maxWidth = '15em';
            inputRef.current.style.left = '5.3em';
            inputRef.current.style.opacity = '1';
            inputRef.current.style.pointerEvents = 'none';

            searchRef.current.style.opacity = '0';
            searchRef.current.style.transform = 'scale(1, 1)';
            searchRef.current.style.pointerEvents = 'auto';
            homeRef.current.style.opacity = '1';
            homeRef.current.style.transform = 'scale(1, 1)';
            homeRef.current.style.pointerEvents = 'auto';
            discoveryRef.current.style.opacity = '1';
            discoveryRef.current.style.transform = 'scale(1, 1)';
            discoveryRef.current.style.pointerEvents = 'auto';
            liveRef.current.style.opacity = '1';
            liveRef.current.style.transform = 'scale(1, 1)';
            liveRef.current.style.pointerEvents = 'auto';

            if (user) {
                playlistsRef.current.style.opacity = '1';
                playlistsRef.current.style.transform = 'scale(1, 1)';
                playlistsRef.current.style.pointerEvents = 'auto';
                notificationsRef.current.style.opacity = '1';
                notificationsRef.current.style.transform = 'scale(1, 1)';
                notificationsRef.current.style.pointerEvents = 'auto';
            }
        }
    };

    const handleClickshrinkSearchBar = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            shrinkSearchBar();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickshrinkSearchBar);

        return () => {
            document.removeEventListener('mousedown', handleClickshrinkSearchBar);
        };
    }, []);

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const handleProfileClick = () => {
        setProfileMenuVisible(prevState => !prevState);
    };

    const profileMenuStyle = {
        opacity: profileMenuVisible ? 1 : 1,
        clipPath: profileMenuVisible ? "circle(160% at 50% 0)" : "circle(0 at 50% 0)",
        pointerEvents: profileMenuVisible ? "auto" : "none",
        transition: 'all .65s cubic-bezier(.32, .685, .32, 1)'
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
            <div className="navbar-inner">
                <div className="navbar-inner-padding">
                    <div className="navbar-inner-padding-shadow"></div>
                    <div className="navbar-inner-left">
                        <form ref={inputRef} onSubmit={handleSearch} className="navbar-inner-left-searchbar-absolute">
                            <svg onClick={handleSearch} className="navbar-inner-left-searchbar-absolute-icon"
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
                            <input ref={inputSearchRef}
                                className="navbar-inner-left-searchbar-absolute-input"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <NavLink ref={homeRef} to="/" className="navbar-inner-left-link">
                            <div className="navbar-inner-left-link-text">
                                <p className="navbar-inner-left-link-text-label">Home</p>
                                <div className="navbar-inner-left-link-text-shadow"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <title>Home</title>
                                <g id="home" stroke="none" stroke-width="1" fill="none"
                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <g id="home-inner" transform="translate(2.400000, 2.000000)" stroke="#000000"
                                       stroke-width="1.5">
                                        <line x1="6.6787" y1="14.1354" x2="12.4937" y2="14.1354" id="Stroke-1"/>
                                        <path
                                            d="M1.24344979e-14,11.713 C1.24344979e-14,6.082 0.614,6.475 3.919,3.41 C5.365,2.246 7.615,0 9.558,0 C11.5,0 13.795,2.235 15.254,3.41 C18.559,6.475 19.172,6.082 19.172,11.713 C19.172,20 17.213,20 9.586,20 C1.959,20 1.24344979e-14,20 1.24344979e-14,11.713 Z"
                                            id="Stroke-2"/>
                                    </g>
                                </g>
                            </svg>
                        </NavLink>
                        <div ref={searchRef} onClick={handleInput} className="navbar-inner-left-searchbar">
                            <svg onClick={handleSearch} className="navbar-inner-left-searchbar-icon"
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
                                className="navbar-inner-left-searchbar-input"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <NavLink ref={discoveryRef} to="/pictures" className="navbar-inner-left-link">
                            <div className="navbar-inner-left-link-text">
                                <p className="navbar-inner-left-link-text-label">Discover</p>
                                <div className="navbar-inner-left-link-text-shadow"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <title>Discovery</title>
                                <g id="discovery" stroke="none" stroke-width="1" fill="none"
                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <g id="discovery-inner" transform="translate(2.000000, 2.000000)" stroke="#000000"
                                       stroke-width="1.5">
                                        <path
                                            d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                            id="Stroke-1"/>
                                        <polygon id="Stroke-3"
                                                 points="6.6978 13.3023 8.2718 8.2723 13.3018 6.6983 11.7278 11.7273"/>
                                    </g>
                                </g>
                            </svg>
                        </NavLink>
                        <NavLink ref={liveRef} to="/live" className="navbar-inner-left-link">
                            <div className="navbar-inner-left-link-text">
                                <p className="navbar-inner-left-link-text-label">Livestreams</p>
                                <div className="navbar-inner-left-link-text-shadow"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <title>Video</title>
                                <g id="video" stroke="none" stroke-width="1" fill="none"
                                   fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <g id="video-inner" transform="translate(2.514381, 5.114095)" stroke="#000000"
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
                        {user && (
                            <>
                                <NavLink ref={playlistsRef} to="/playlists" className="navbar-inner-left-link">
                                    <div className="navbar-inner-left-link-text">
                                        <p className="navbar-inner-left-link-text-label">Playlists</p>
                                        <div className="navbar-inner-left-link-text-shadow"></div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Folder</title>
                                        <g id="folder" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="folder-inner" transform="translate(2.500000, 2.500000)" stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="4.8057" y1="12.0742685" x2="14.3987" y2="12.0742685" id="Stroke-1"/>
                                                <path
                                                    d="M-1.13686838e-13,5.29836453 C-1.13686838e-13,2.85645977 1.25,0.75931691 3.622,0.272650243 C5.993,-0.214968804 7.795,-0.0463973758 9.292,0.761221672 C10.79,1.56884072 10.361,2.76122167 11.9,3.63645977 C13.44,4.51265024 15.917,3.19645977 17.535,4.94217405 C19.229,6.7697931 19.2200005,9.57550739 19.2200005,11.3640788 C19.2200005,18.1602693 15.413,18.6993169 9.61,18.6993169 C3.807,18.6993169 -1.13686838e-13,18.2288407 -1.13686838e-13,11.3640788 L-1.13686838e-13,5.29836453 Z"
                                                    id="Stroke-2"/>
                                            </g>
                                        </g>
                                    </svg>
                                </NavLink>
                                <div ref={notificationsRef} className="navbar-inner-left-link">
                                    <div className="navbar-inner-left-link-text">
                                        <p className="navbar-inner-left-link-text-label">Notifications</p>
                                        <div className="navbar-inner-left-link-text-shadow"></div>
                                    </div>
                                    <div className="navbar-inner-left-link-bigdot">
                                        <span>219</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Notification</title>
                                        <g id="notification" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="notification-inner" transform="translate(4.614552, 2.514190)"
                                               stroke="#000000"
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
                            </>
                        )}
                    </div>
                    <div className="navbar-inner-right">
                        <div className="navbar-inner-right-profile">
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
                {user && (
                    <div className="navbar-inner-right-profile-menu" ref={profileMenuRef} style={profileMenuStyle}>
                        <div className="navbar-inner-right-profile-menu-top">
                            <NavLink to={`/channel/` + user?.name}
                                     className="navbar-inner-right-profile-container navbar-inner-right-profile-menu-top-image">
                                <img className="navbar-inner-right-profile-container-image"
                                     src={profilePictureUrl}
                                     alt="Profile"/>
                            </NavLink>
                            <div className="navbar-inner-right-profile-menu-top-text">
                                <NavLink to={`/channel/` + user?.name}
                                         className="navbar-inner-right-profile-menu-top-text-username">
                                    <span>{user?.displayName}</span>
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
                                <NavLink to="/settings/profile" className="navbar-inner-right-profile-menu-top-text-link">Edit
                                    profile</NavLink>
                            </div>
                            <NavLink to={`/channel/` + user?.name} className="blackbutton">
                                <span>Go to channel</span>
                                <div className="blackbutton-shadow"></div>
                            </NavLink>
                        </div>
                        <div className="navbar-inner-right-profile-menu-center">
                            <div className="navbar-inner-right-profile-menu-center-left">
                                <NavLink to="/upload" className="navbar-inner-right-profile-menu-center-left-link">
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
                                <div className="navbar-inner-right-profile-menu-center-left-link">
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
                                </div>
                                <div className="navbar-inner-right-profile-menu-center-left-link">
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
                                <div className="navbar-inner-right-profile-menu-center-left-link">
                                    <div className="navbar-inner-right-profile-menu-center-left-link-bigdot">
                                        <span>219</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Notification</title>
                                        <g id="notification" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="notification-inner" transform="translate(4.614552, 2.514190)"
                                               stroke="#000000"
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
                            </div>
                            <div className="navbar-inner-right-profile-menu-center-right">
                                <div className="navbar-inner-right-profile-menu-center-right-filter">
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
                                    <div className="navbar-inner-right-profile-menu-center-right-filter-switch">
                                        <input type="checkbox"
                                               className="navbar-inner-right-profile-menu-center-right-filter-toggle"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-inner-right-profile-menu-bottom">
                            <ul className="navbar-inner-right-profile-menu-bottom-list list-2">
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
                                <NavLink to="/settings/profile" className="navbar-inner-right-profile-menu-bottom-list-item">
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
                            </ul>
                            <ul className="navbar-inner-right-profile-menu-bottom-list list-1">
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