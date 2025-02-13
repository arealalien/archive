import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import ColorThief from 'colorthief';
import ScrollBar from './components/ScrollBar';
import { motion } from 'framer-motion';
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
    const [dateSubscribed, setDateSubscribed] = useState(false);
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

                // Fetch subscription date
                const subscriptionDate = await axios.get(`http://localhost:5000/subscribe/date/${encodeURIComponent(username)}`, { headers });
                setDateSubscribed(subscriptionDate.data.dateSubscribed)

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

                // Choose the dark color from the palette
                const darkColor = palette.reduce((prev, curr) => {
                    const prevLuminance = 0.2126 * prev[0] + 0.7152 * prev[1] + 0.0722 * prev[2];
                    const currLuminance = 0.2126 * curr[0] + 0.7152 * curr[1] + 0.0722 * curr[2];
                    return currLuminance < prevLuminance ? curr : prev;
                }, palette[0]);

                // Calculate the luminance of the selected color
                const luminance = 0.2126 * darkColor[0] + 0.7152 * darkColor[1] + 0.0722 * darkColor[2];

                // Determine the alpha value based on luminance
                let alpha = 1;
                if (luminance > 160) {
                    alpha = 0.5;
                } else if (luminance > 140) {
                    alpha = 0.7;
                } else if (luminance > 120) {
                    alpha = 0.9;
                }

                // Apply the dark color directly as the background with the adjusted alpha
                const colorString = `rgba(${darkColor.join(',')}, ${alpha})`;
                const gradient = `linear-gradient(180deg, ${colorString} 0, rgba(${darkColor.join(',')}, 0) 75em)`;

                document.querySelector(".profile").style.background = gradient;
                document.querySelector(".sidebar-right").style.background = gradient;
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
            <DocumentTitle title={user2.displayName + ` - Archive`}/>
            <Navbar searchbar="yes" profile="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft />
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
                                <ProfileSec page={page} profileName={user2.name} profile={user2} />
                            </div>
                        </div>
                    </section>
                </ScrollBar>
                <SideBarRight isMenuVisible={isSidebarMenuVisible}
                              isProfileVisible={isProfileMenuVisible}
                              profile={user2}
                              subscriberCount={subscriberCount}
                              isSubscribed={isSubscribed}
                              dateSubscribed={dateSubscribed}
                              handleSubscribe={handleSubscribe} />
            </div>
            <PageShadow/>
            </motion.div>
        </>
    );
}

export default Profile;