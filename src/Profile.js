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
    const [isProfileMenuVisible] = useState(true);
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
                setSubscriberCount(prevCount => prevCount + 1);
            } else if (response.data.message === 'Unsubscribed successfully') {
                setIsSubscribed(false); // Update to unsubscribed
                setSubscriberCount(prevCount => prevCount + - 1);
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

    const bannerUrl = `http://localhost:5000/${user2.banner}`;

    return (
        <>
            <DocumentTitle title={user2.displayName + ` - Archive`}/>
            <Navbar searchbar="yes" profile="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft profile={user2} />
                <ScrollBar className="page-center">
                    <section className="profile">
                        <div className="profile-inner view-width">
                            <header className="profile-inner-header">
                                <div className="profile-inner-header-overlay"></div>
                                <img className="profile-inner-header-background"
                                     src={bannerUrl}
                                     alt=""
                                     crossOrigin="anonymous"
                                     ref={bannerRef}
                                />
                            </header>
                            <div className="profile-inner-content">
                                <ProfileSec profileName={user2.name} page={page}/>
                            </div>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}
                              isProfileVisible={isProfileMenuVisible}
                              profile={user2}
                              subscriberCount={subscriberCount}
                              isSubscribed={isSubscribed}
                              handleSubscribe={handleSubscribe} />
            </div>
            <PageShadow/>
        </>
    );
}

export default Profile;