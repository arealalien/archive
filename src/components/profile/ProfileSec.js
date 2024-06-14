import React from "react";
import {NavLink} from "react-router-dom";

// Components
import VideosSec from "../videos/VideosSec";

const ProfileSec  = () => {
    return (
        <section className="profile">
            <div className="profile-inner view-width">
                <header className="profile-inner-header">
                    <div className="profile-inner-header-info">
                        <div className="profile-inner-header-info-left">
                            <div className="profile-inner-header-info-left-container">
                                <img className="profile-inner-header-info-left-container-image" src="https://images.unsplash.com/photo-1610555248279-adea4c523fb3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                            </div>
                            <div className="profile-inner-header-info-left-text">
                                <h1 className="profile-inner-header-info-left-text-username">Channel Name</h1>
                                <p className="profile-inner-header-info-left-text-subs">15M Subscribers</p>
                            </div>
                        </div>
                        <div className="profile-inner-header-info-right">
                            <button className="mainbutton">Subscribe</button>
                        </div>
                    </div>
                    <div className="profile-inner-header-overlay"></div>
                    <img className="profile-inner-header-background"
                         src="https://images.unsplash.com/photo-1690796033760-790beb3b7506?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                         alt=""/>
                </header>
                <div className="profile-inner-content">
                    <div className="profile-inner-content-left">
                        <ul className="profile-inner-content-left-list">
                            <li className="profile-inner-content-left-list-item">
                                <NavLink to="" className="profile-inner-content-left-list-item-link">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Star</title>
                                        <g id="star" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="star-inner" transform="translate(3.000000, 3.000000)"
                                               stroke-width="1.5">
                                                <path
                                                    d="M9,0 C6.96384545,0 6.77134103,3.54652262 5.55911318,4.79957421 C4.34688533,6.05262581 0.578198764,4.61991709 0.0545867365,6.84402682 C-0.467925266,9.06927362 2.92235261,9.82428837 3.34036221,11.7334296 C3.76057187,13.6425708 1.68922429,16.3249199 3.45916494,17.6598406 C5.2291056,18.9936242 7.13434937,15.9747022 9,15.9747022 C10.8656351,15.9747022 12.7708788,18.9936242 14.5408195,17.6598406 C16.3107602,16.3249199 14.2405126,13.6425708 14.6596222,11.7334296 C15.0787319,9.82428837 18.4679097,9.06927362 17.9453977,6.84402682 C17.4228857,4.61991709 13.6530991,6.05262581 12.4419713,4.79957421 C11.2297434,3.54652262 11.036139,0 9,0 Z"
                                                    id="Stroke-1"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Feed</span>
                                </NavLink>
                            </li>
                            <li className="profile-inner-content-left-list-item">
                                <NavLink to="/profile/videos" className="profile-inner-content-left-list-item-link">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Video</title>
                                        <g id="video" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
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
                                    <span>Videos</span>
                                </NavLink>
                            </li>
                            <li className="profile-inner-content-left-list-item">
                                <NavLink to="/profile/pictures" className="profile-inner-content-left-list-item-link">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Image 2</title>
                                        <g id="image-2" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
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
                                    <span>Pictures</span>
                                </NavLink>
                            </li>
                            <li className="profile-inner-content-left-list-item">
                                <NavLink to="/profile/playlists" className="profile-inner-content-left-list-item-link">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Folder</title>
                                        <g id="folder" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="folder-inner" transform="translate(2.500000, 2.500000)"
                                               stroke-width="1.5">
                                                <line x1="4.8057" y1="12.0742685" x2="14.3987" y2="12.0742685"
                                                      id="Stroke-1"/>
                                                <path
                                                    d="M-1.13686838e-13,5.29836453 C-1.13686838e-13,2.85645977 1.25,0.75931691 3.622,0.272650243 C5.993,-0.214968804 7.795,-0.0463973758 9.292,0.761221672 C10.79,1.56884072 10.361,2.76122167 11.9,3.63645977 C13.44,4.51265024 15.917,3.19645977 17.535,4.94217405 C19.229,6.7697931 19.2200005,9.57550739 19.2200005,11.3640788 C19.2200005,18.1602693 15.413,18.6993169 9.61,18.6993169 C3.807,18.6993169 -1.13686838e-13,18.2288407 -1.13686838e-13,11.3640788 L-1.13686838e-13,5.29836453 Z"
                                                    id="Stroke-2"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Playlists</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="profile-inner-content-right videos-inner videos-inner-3">
                        <VideosSec/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSec;
