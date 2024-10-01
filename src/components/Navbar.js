import React, { useState, useRef, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ profile, toggleSidebarMenu }) => {
    const searchRef = useRef(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            navigate(`/search?query=${query}`);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
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
                    <div className="navbar-inner-left">
                        <NavLink to="/" className="navbar-inner-left-link">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2"
                                 viewBox="0 0 74.82 67.97">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path className="cls-1"
                                          d="M69.24,33.99c.51-1.26,1-2.53,1.44-3.79,4.12-11.62,6.13-25.08,1.37-28.94-1.26-1.02-2.71-1.43-4.22-1.2-4.02.63-7.78,5.83-11.99,12.21-5.27-5.45-11.48-9.03-18.43-9.03s-13.15,3.58-18.43,9.03C14.77,5.89,11.01.69,6.99.06c-1.5-.23-2.96.18-4.22,1.2C-2,5.12.02,18.57,4.13,30.19c.45,1.26.93,2.53,1.44,3.79-.51,1.27-1,2.53-1.44,3.79C.02,49.4-2,62.85,2.77,66.71c1.26,1.02,2.71,1.43,4.22,1.2,3.99-.62,7.77-5.81,12-12.21,5.27,5.45,11.48,9.03,18.43,9.03s13.15-3.58,18.43-9.03c4.23,6.39,8,11.58,11.99,12.21.28.04.55.06.82.06,1.21,0,2.38-.43,3.4-1.26,4.77-3.86,2.75-17.32-1.37-28.94-.45-1.26-.93-2.53-1.44-3.79ZM68.45,4.02c.29-.05.61-.03,1.09.35,1.92,1.55,2.09,11.14-2.6,24.42-2.33-4.83-5.13-9.46-8.36-13.42,3.39-5.16,7.36-10.96,9.87-11.35ZM37.41,7.25c11.91,0,21.77,13.45,27.49,26.74-2.27,5.28-5.2,10.58-8.65,15.06-5.74-8.71-11.73-17.05-18.84-17.05s-13.1,8.34-18.85,17.05c-3.45-4.48-6.38-9.78-8.65-15.06,5.72-13.29,15.59-26.74,27.49-26.74ZM5.28,4.37c.47-.38.8-.4,1.09-.35,2.51.39,6.48,6.2,9.87,11.36-3.22,3.96-6.02,8.59-8.36,13.42C3.19,15.51,3.36,5.92,5.28,4.37ZM6.37,63.96c-.29.04-.61.03-1.09-.35-1.92-1.55-2.09-11.14,2.6-24.42,2.33,4.83,5.13,9.46,8.36,13.42-3.54,5.39-7.37,10.97-9.86,11.36ZM37.41,60.73c-5.99,0-11.46-3.41-16.15-8.49,4.93-7.52,10.89-16.24,16.16-16.24s11.22,8.72,16.15,16.24c-4.69,5.08-10.16,8.49-16.15,8.49ZM69.53,63.61c-.47.38-.8.4-1.08.35-2.49-.39-6.32-5.96-9.87-11.36,3.22-3.96,6.02-8.59,8.36-13.42,4.69,13.28,4.51,22.87,2.6,24.42Z"/>
                                </g>
                            </svg>
                        </NavLink>
                    </div>
                    <div className="navbar-inner-center">
                        <NavLink to="/discovery" className="navbar-inner-center-item">
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
                        </NavLink>
                        <form ref={searchRef} onSubmit={handleSearch} className="navbar-inner-center-searchbar">
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
                        </form>
                    </div>
                    <div className="navbar-inner-right">
                        <div className="navbar-inner-right-profile">
                            {user ? (
                                <div className="navbar-inner-right-profile-container" onClick={toggleSidebarMenu}>
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
            </div>
        </nav>
    );
};

export default Navbar;