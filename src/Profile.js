import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import ColorThief from 'colorthief';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import ProfileSec from "./components/profile/ProfileSec";
import PageShadow from "./components/PageShadow";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Profile() {
    const { username } = useParams();
    const [user2, setUser] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [error, setError] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const { page } = useParams();

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    const { user } = useContext(AuthContext);
    const bannerRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch user data
                const response = await axios.get(`http://localhost:5000/user/${encodeURIComponent(username)}`, { headers });
                setUser(response.data);

                // Fetch subscription status
                const subscriptionStatus = await axios.get(`http://localhost:5000/subscribe/status/${encodeURIComponent(username)}`, { headers });
                setIsSubscribed(subscriptionStatus.data.isSubscribed);

                // Fetch subscriber count
                const subscriberResponse = await axios.get(`http://localhost:5000/user/${encodeURIComponent(username)}/subscribers`, { headers });
                setSubscriberCount(subscriberResponse.data.subscriberCount);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (bannerRef.current) {
            const imgElement = bannerRef.current;
            if (!user2) return;
            const colorThief = new ColorThief();

            const updateBackgroundColor = () => {
                const palette = colorThief.getPalette(imgElement);
                const darkColor = palette.reduce((prev, curr) => {
                    const prevLuminance = 0.2126 * prev[0] + 0.7152 * prev[1] + 0.0722 * prev[2];
                    const currLuminance = 0.2126 * curr[0] + 0.7152 * curr[1] + 0.0722 * curr[2];
                    return currLuminance < prevLuminance ? curr : prev;
                }, palette[0]);

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

                // Function to convert HSL back to RGB
                const hslToRgb = (h, s, l) => {
                    let r, g, b;

                    if (s === 0) {
                        r = g = b = l; // achromatic
                    } else {
                        const hue2rgb = (p, q, t) => {
                            if (t < 0) t += 1;
                            if (t > 1) t -= 1;
                            if (t < 1 / 6) return p + (q - p) * 6 * t;
                            if (t < 1 / 3) return q;
                            if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
                            return p;
                        };

                        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        const p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                };

                // Convert darkColor to HSL
                let [h, s, l] = rgbToHsl(darkColor[0], darkColor[1], darkColor[2]);

                // Adjust luminance to make it darker
                l = Math.max(0, l - 0.01);

                // Adjust saturation to make it less saturated
                s = Math.max(0, s - 0.05);

                // Convert back to RGB
                const adjustedColor = hslToRgb(h, s, l);

                document.querySelector(".profile").style.background = `linear-gradient(180deg, rgb(${adjustedColor.join(',')}) 0, rgba(${adjustedColor.join(',')}, .15) 75em)`;
                document.querySelector(".sidebar-left").style.background = `linear-gradient(180deg, rgb(${adjustedColor.join(',')}) 0, rgba(${adjustedColor.join(',')}, .15) 75em)`;
                document.querySelector(".sidebar-right").style.background = `linear-gradient(180deg, rgb(${adjustedColor.join(',')}) 0, rgba(${adjustedColor.join(',')}, .15) 75em)`;
            };

            imgElement.addEventListener('load', updateBackgroundColor);

            if (imgElement.complete) {
                updateBackgroundColor();
            }

            return () => {
                imgElement.removeEventListener('load', updateBackgroundColor);
            };
        }
    }, [user2]);

    const handleSubscribe = async () => {
        try {
            const endpoint = isSubscribed ? `unsubscribe` : `subscribe`;
            const response = await axios.post(`http://localhost:5000/subscribe/${encodeURIComponent(username)}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            // Check response and update state accordingly
            if (response.data.message === 'Subscribed successfully') {
                setIsSubscribed(true); // Update to subscribed
            } else if (response.data.message === 'Unsubscribed successfully') {
                setIsSubscribed(false); // Update to unsubscribed
            }
        } catch (err) {
            setError('Failed to subscribe');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user2) {
        return <section className="loading">
            <div className="loading-box"><p className="loading-box-text">Loading</p></div>
        </section>;
    }

    const profilePictureUrl = `http://localhost:5000/${user2.profilePicture}`;
    const bannerUrl = `http://localhost:5000/${user2.banner}`;

    return (
        <>
            <DocumentTitle title={user2.displayName + ` - Archive`}/>
            <Navbar searchbar="yes" profile="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="profile">
                        <div className="profile-inner view-width">
                            <header className="profile-inner-header">
                                <div className="profile-inner-header-info">
                                    <div className="profile-inner-header-info-left">
                                        <div className="profile-inner-header-info-left-container">
                                            <img className="profile-inner-header-info-left-container-image"
                                                 src={profilePictureUrl}
                                                 alt=""/>
                                        </div>
                                        <div className="profile-inner-header-info-left-text">
                                            <h1 className="profile-inner-header-info-left-text-username">
                                                <span>{user2.displayName}</span>
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
                                            </h1>
                                            <p className="profile-inner-header-info-left-text-subs">{subscriberCount} Subscribers</p>
                                        </div>
                                    </div>
                                    <div className="profile-inner-header-info-right">
                                        {user.name === user2.name ? (
                                            <NavLink to="/settings/profile">
                                                <button className="mainbutton">
                                                    Edit profile
                                                </button>
                                            </NavLink>
                                        ) : (
                                            isSubscribed ? (
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
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="profile-inner-header-overlay"></div>
                                <img className="profile-inner-header-background"
                                     src={bannerUrl}
                                     alt=""
                                     crossOrigin="anonymous"
                                     ref={bannerRef}
                                />
                            </header>
                            <div className="profile-inner-content">
                                <div className="profile-inner-content-left">
                                    <ul className="profile-inner-content-left-list">
                                        <li className="profile-inner-content-left-list-item">
                                            <NavLink to={`/channel/` + user2.name}
                                                     className="profile-inner-content-left-list-item-link">
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
                                                <span>Feed</span>
                                            </NavLink>
                                        </li>
                                        <li className="profile-inner-content-left-list-item">
                                            <NavLink to={`/channel/` + user2.name + `/videos`}
                                                     className="profile-inner-content-left-list-item-link">
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
                                                <span>Videos</span>
                                            </NavLink>
                                        </li>
                                        <li className="profile-inner-content-left-list-item">
                                            <NavLink to={`/channel/` + user2.name + `/pictures`}
                                                     className="profile-inner-content-left-list-item-link">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
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
                                                <span>Pictures</span>
                                            </NavLink>
                                        </li>
                                        <li className="profile-inner-content-left-list-item">
                                            <NavLink to={`/channel/` + user2.name + `/playlists`}
                                                     className="profile-inner-content-left-list-item-link">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <title>Folder</title>
                                                    <g id="folder" stroke="none" stroke-width="1" fill="none"
                                                       fill-rule="evenodd" stroke-linecap="round"
                                                       stroke-linejoin="round">
                                                        <g id="folder-inner" transform="translate(2.500000, 2.500000)"
                                                           stroke-width="1.5">
                                                            <line x1="4.8057" y1="12.0742685" x2="14.3987"
                                                                  y2="12.0742685"
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
                                <ProfileSec profileName={user2.name} page={page}/>
                            </div>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}/>
            </div>
            <PageShadow/>
        </>
    );
}

export default Profile;