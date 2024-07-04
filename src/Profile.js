import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import ProfileSec from "./components/profile/ProfileSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [error, setError] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    if (!user) {
        return <section className="loading">
            <div className="loading-box"><p className="loading-box-text">Loading</p></div>
        </section>;
    }

    const profilePictureUrl = `http://localhost:5000/${user.profilePicture}`;
    const bannerUrl = `http://localhost:5000/${user.banner}`;

    return (
        <>
            <DocumentTitle title={user.name + ` - Archive`}/>
            <Navbar searchbar="yes" profile="yes" />
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
                                        <span>{user.name}</span>
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
                                {isSubscribed ? (
                                    <button className="blackbutton" onClick={handleSubscribe} disabled={isSubscribed}>
                                        Subscribed
                                        <div className="blackbutton-shadow"></div>
                                    </button>
                                ) : (
                                    <button className="mainbutton" onClick={handleSubscribe} disabled={isSubscribed}>
                                        Subscribe
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="profile-inner-header-overlay"></div>
                        <img className="profile-inner-header-background"
                             src={bannerUrl}
                             alt=""/>
                    </header>
                    <ProfileSec profileName={user.name} />
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Profile;