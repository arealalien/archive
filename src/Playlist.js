import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ColorThief from 'colorthief';
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

function Playlist() {
    const location = useLocation();
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const [error, setError] = useState('');

    const PlaylistCoverRef = useRef(null);

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

            imgElement.addEventListener('load', updateBackgroundColor);

            if (imgElement.complete) {
                updateBackgroundColor();
            }

            return () => {
                imgElement.removeEventListener('load', updateBackgroundColor);
            };
        }
    }, [PlaylistCoverRef]);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
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

    return (
        <>
            <DocumentTitle title="Playlist - Archive"/>
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="playlist">
                        <header className="playlist-header">
                            <div className="playlist-header-top">
                                <div className="playlist-header-top-left">
                                    <div className="playlist-header-top-left-container">
                                        <img ref={PlaylistCoverRef} className="playlist-header-top-left-container-image" src={process.env.PUBLIC_URL + `/images/gallery/347504210_2210436199143577_4984331646709175478_n.jpg`} alt="" />
                                    </div>
                                </div>
                                <div className="playlist-header-top-right">
                                    <p className="playlist-header-top-right-toptitle">Public playlist</p>
                                    <h1 className={`playlist-header-top-right-title`}>{playlistDetails.name}</h1>
                                    <div className="playlist-header-top-right-details">
                                        <div className="playlist-header-top-right-details-left">
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
                                        </div>
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