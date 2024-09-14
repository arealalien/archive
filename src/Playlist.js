import React, { useEffect, useRef, useState, useContext } from 'react';
import ColorThief from 'colorthief';
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";
import VideosSec from "./components/videos/VideosSec";
import PlaylistUpload from "./components/playlists/PlaylistUpload";

function Playlist() {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [playlistImage, setPlaylistImage] = useState('');
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const [error, setError] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);

    const PlaylistCoverRef = useRef(null);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    useEffect(() => {
        const fetchPlaylistData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            const queryParams = new URLSearchParams(location.search);
            const playlistUrl = queryParams.get('list');

            if (!playlistUrl) {
                setError('No playlist URL found');
                return;
            }

            try {
                const headers = { Authorization: `Bearer ${token}` };

                // Then fetch playlist details
                const playlistResponse = await axios.get(`http://localhost:5000/playlistsUrl?url=${encodeURIComponent(playlistUrl)}`, { headers });
                setPlaylistDetails(playlistResponse.data);

            } catch (err) {
                console.error('Error fetching playlist data:', err);
                setError('Failed to fetch playlist data');
            }
        };

        fetchPlaylistData();
    }, [location.search]);

    useEffect(() => {
        if (PlaylistCoverRef.current) {
            const imgElement = PlaylistCoverRef.current;
            const colorThief = new ColorThief();

            const updateBackgroundColor = () => {
                const palette = colorThief.getPalette(imgElement);

                // Function to convert RGB to HSL
                const rgbToHsl = (r, g, b) => {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    let h, s, l = (max + min) / 2;

                    if (max === min) {
                        h = s = 0; // achromatic
                    } else {
                        const d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                            default: break;
                        }
                        h /= 6;
                    }

                    return [h, s, l];
                };

                // Find the most vibrant color in the palette (highest saturation)
                const vibrantColor = palette.reduce((prev, curr) => {
                    const prevHsl = rgbToHsl(prev[0], prev[1], prev[2]);
                    const currHsl = rgbToHsl(curr[0], curr[1], curr[2]);
                    return currHsl[1] > prevHsl[1] ? curr : prev;
                }, palette[0]);

                // Calculate the luminance of the selected color
                const luminance = 0.2126 * vibrantColor[0] + 0.7152 * vibrantColor[1] + 0.0722 * vibrantColor[2];

                // Determine the alpha value based on luminance
                let alpha = 1;
                if (luminance > 160) {
                    alpha = 0.3;
                } else if (luminance > 140) {
                    alpha = 0.32;
                } else if (luminance > 120) {
                    alpha = 0.34;
                } else {
                    alpha = 0.36;
                }

                // Apply the vibrant color directly as the background with the adjusted alpha
                const colorString = `rgba(${vibrantColor.join(',')}, ${alpha})`;
                const gradient = `linear-gradient(180deg, rgba(${vibrantColor.join(',')}, ${alpha - .05}) 0, rgba(${vibrantColor.join(',')}, 0) 35em)`;

                document.querySelector(".playlist-header").style.background = colorString;
                document.querySelector(".playlist-content").style.background = gradient;
            };

            // Ensure image load completion
            imgElement.addEventListener('load', updateBackgroundColor);

            // Check if image is already loaded
            if (imgElement.complete) {
                updateBackgroundColor();
            }

            return () => {
                imgElement.removeEventListener('load', updateBackgroundColor);
            };
        }
    }, [playlistDetails]);

    const playlistPictureUploadRef = useRef(null);

    const handlePlaylistPictureUpload = (filePath) => {
        setPlaylistImage(`http://localhost:5000/${filePath}`);
    };

    const handleEditOutClick = () => {
        setEditVisible(false);
    };

    const isCurrentUserCreator = user && playlistDetails && user.id === playlistDetails.creator.id && playlistDetails.name !== 'Liked Videos';

    const handleClick = () => {
        if (isCurrentUserCreator) {
            setEditVisible(true);
            playlistPictureUploadRef.current.triggerFileInput();
        }
    };

    const handleNameClick = () => {
        if (isCurrentUserCreator) {
            setEditVisible(true);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!playlistDetails) {
        return <section className="loading">
            <div className="loading-box"><p className="loading-box-text">Loading</p></div>
        </section>;
    }

    let profilePictureUrl;

    if (playlistDetails) {
        profilePictureUrl = `${process.env.PUBLIC_URL}/${playlistDetails.creator.profilePicture}`;
    }

    let playlistCover;

    if (PlaylistCoverRef) {
        playlistCover = `${process.env.PUBLIC_URL}/${playlistDetails.playlistImg}`;
    }

    return (
        <>
            <DocumentTitle title={playlistDetails.name + ` - Archive`}/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    {isCurrentUserCreator && (
                        <div className={`playlist-edit ${isEditVisible ? 'visible' : ''}`}>
                            <div className="playlist-edit-modal">
                                <div className="playlist-edit-modal-top">
                                    <h3 className="playlist-edit-modal-top-title">Edit details</h3>
                                    <div className="playlist-edit-modal-top-button" onClick={handleEditOutClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <title>close square</title>
                                            <g id="close-square" stroke="none" stroke-width="1" fill="none"
                                               fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                                <g id="close-square-inner" transform="translate(2.000000, 2.000000)"
                                                   stroke="#000000" stroke-width="1.5">
                                                    <line x1="12.3941" y1="7.5948" x2="7.6021" y2="12.3868" id="Stroke-1"/>
                                                    <line x1="12.3999" y1="12.3931" x2="7.5999" y2="7.5931" id="Stroke-2"/>
                                                    <path
                                                        d="M0.75,10.0001 C0.75,16.9371 3.063,19.2501 10,19.2501 C16.937,19.2501 19.25,16.9371 19.25,10.0001 C19.25,3.0631 16.937,0.7501 10,0.7501 C3.063,0.7501 0.75,3.0631 0.75,10.0001 Z"
                                                        id="Stroke-3"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="playlist-edit-modal-center">
                                    <div className="playlist-edit-modal-left"
                                         onClick={() => playlistPictureUploadRef.current.triggerFileInput()}>
                                        <img className="playlist-edit-modal-left-image"
                                             src={playlistImage || playlistCover} alt=""/>
                                    </div>
                                    <div className="playlist-edit-modal-right">
                                        <input className="playlist-edit-modal-right-title" id="name" type="text"
                                               placeholder="Playlist Name" value={playlistDetails.name} name="name"
                                               aria-label=""/>
                                        <textarea className="playlist-edit-modal-right-description"
                                                  placeholder="Description"></textarea>
                                    </div>
                                </div>
                                <div className="playlist-edit-modal-bottom">
                                    <button className="mainbutton" type="submit">Save changes</button>
                                </div>
                            </div>
                            <div className="playlist-edit-overlay" onClick={handleEditOutClick}></div>
                        </div>
                    )}
                    <section className="playlist">
                        <header className="playlist-header">
                            <div className="playlist-header-top">
                                <div className={`playlist-header-top-left ${isCurrentUserCreator ? '' : 'not-editable'}`} onClick={isCurrentUserCreator ? handleClick : null}>
                                    <div className="playlist-header-top-left-container">
                                    <img ref={PlaylistCoverRef} className="playlist-header-top-left-container-image"
                                             src={playlistImage || playlistCover} alt=""/>
                                    </div>
                                    <div className="playlist-header-top-left-note">
                                        <div className="playlist-header-top-left-note-arrow"></div>
                                        <p className="playlist-header-top-left-note-text">Edit picture</p>
                                    </div>
                                    <PlaylistUpload
                                        ref={playlistPictureUploadRef}
                                        uploadUrl={`http://localhost:5000/upload/playlist-picture`}
                                        onSuccess={handlePlaylistPictureUpload}
                                        playlistDetails={playlistDetails}
                                        fileKey="playlistPicture"
                                    />
                                </div>
                                <div className="playlist-header-top-right">
                                    {playlistDetails.visibility === 0 ? (
                                        <p className="playlist-header-top-right-toptitle">Private playlist</p>
                                    ) : playlistDetails.visibility === 1 ? (
                                        <p className="playlist-header-top-right-toptitle">Public playlist</p>
                                    ) : null}
                                    <h1 className={`playlist-header-top-right-title ${isCurrentUserCreator ? '' : 'not-editable'}`} onClick={isCurrentUserCreator ? handleNameClick : null}>{playlistDetails.name}</h1>
                                    <div className="playlist-header-top-right-details">
                                        <NavLink to={`/channel/${playlistDetails.creator.name}`} className="playlist-header-top-right-details-left">
                                            <div className="playlist-header-top-right-details-left-container">
                                            <img
                                                     className="playlist-header-top-right-details-left-container-image"
                                                     src={profilePictureUrl}
                                                     alt=""/>
                                            </div>
                                            <h3 className="playlist-header-top-right-details-left-username">
                                                <span>{playlistDetails.creator.name}</span>
                                                {playlistDetails.creator?.verified === 1 ? (
                                                    <svg className="verified-icon" viewBox="0 0 22 22" aria-hidden="true">
                                                        <g>
                                                            <linearGradient gradientUnits="userSpaceOnUse" id="a" x1="4.411"
                                                                            x2="18.083"
                                                                            y1="2.495" y2="21.508">
                                                                <stop offset="0"></stop>
                                                                <stop offset=".539"></stop>
                                                                <stop offset=".68"></stop>
                                                                <stop offset="1"></stop>
                                                                <stop offset="1"></stop>
                                                            </linearGradient>
                                                            <linearGradient gradientUnits="userSpaceOnUse" id="b" x1="5.355"
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
                                                ) : null}
                                            </h3>
                                        </NavLink>
                                        <div className="playlist-header-top-right-details-right">
                                            <p className="playlist-header-top-right-details-right-thicktitle">&middot;</p>
                                            <p className="playlist-header-top-right-details-right-subtitle">41
                                                Videos, 3t 3m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="playlist-header-bottom">

                            </div>
                        </header>
                        <div className="playlist-content">
                            <div className="playlist-content-bar">

                            </div>
                            <section className="videos">
                                <div className="videos-inner videos-inner-4 view-width">
                                    <VideosSec/>
                                </div>
                            </section>
                        </div>
                    </section>
                    <Footer/>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}/>
            </div>
            <PageShadow/>
        </>
    );
}

export default Playlist;