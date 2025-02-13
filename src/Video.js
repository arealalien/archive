import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "./contexts/AuthContext";
import { NavLink, useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import axios from 'axios';
import ScrollBar from './components/ScrollBar';
import { motion } from 'framer-motion';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideoSec from "./components/videos/VideoSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";
import SideBarLeft from "./components/SideBarLeft";
import SideBarRight from "./components/SideBarRight";

function Video() {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [error, setError] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false);
    const [isVideoMenuVisible] = useState(true);

    const toggleSidebarMenu = () => {
        setSidebarMenuVisible(prevState => !prevState);
    };

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchVideoData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            const queryParams = new URLSearchParams(location.search);
            const videoUrl = queryParams.get('view');

            if (!videoUrl) {
                setError('No video URL found');
                return;
            }

            try {
                const headers = { Authorization: `Bearer ${token}` };

                // First, increment view count
                // NOTE* Bugged in development because of React.StrictMode
                await axios.post(`http://localhost:5000/videos/${encodeURIComponent(videoUrl)}/increment-view`, {}, { headers });

                // Then fetch video details
                const videoResponse = await axios.get(`http://localhost:5000/videos/${encodeURIComponent(videoUrl)}`, { headers });
                setVideoDetails(videoResponse.data);
                const videoData = videoResponse.data;

                // Fetch subscription status
                const subscriptionStatus = await axios.get(`http://localhost:5000/subscribe/status/${encodeURIComponent(videoData.creator.name)}`, { headers });
                setIsSubscribed(subscriptionStatus.data.isSubscribed);

                // Fetch subscriber count
                const subscriberResponse = await axios.get(`http://localhost:5000/user/${encodeURIComponent(videoData.creator.name)}/subscribers`, { headers });
                setSubscriberCount(subscriberResponse.data.subscriberCount);

            } catch (err) {
                console.error('Error fetching video data:', err);
                setError('Failed to fetch video data');
            }
        };

        fetchVideoData();
    }, [location.search]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!videoDetails) {
        return <section className="loading">
            <div className="loading-box"><p className="loading-box-text">Loading</p></div>
        </section>;
    }

    const handleSubscribe = async () => {
        try {
            const endpoint = isSubscribed ? `unsubscribe` : `subscribe`;
            const response = await axios.post(`http://localhost:5000/subscribe/${encodeURIComponent(videoDetails.creator.name)}`, {}, {
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

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/videos/${videoDetails.videoUrl}/like`, {
                userId: user // Pass the user ID
            });

            if (response.data.message === 'Video liked and added to Liked Videos playlist') {
                setVideoDetails(prevDetails => ({
                    ...prevDetails,
                    likes: prevDetails.likes + 1
                }));
            }
        } catch (err) {
            console.error('Failed to like the video:', err);
            setError('Failed to like the video');
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
            <DocumentTitle title={`Archive - ` + videoDetails.title} />
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="video">
                        <div className="video-inner view-width">
                            <div className="video-inner-left">
                                <VideoSec video={videoDetails}/>
                                <section className="video-details">
                                    <div className="video-details-inner">
                                        <div className="video-details-inner-title">
                                            <h1 className="video-details-inner-title-text">{videoDetails.title}</h1>
                                        </div>
                                        <div className="video-details-inner-top">
                                            <div className="video-details-inner-top-left">
                                                <NavLink to={`/channel/${videoDetails.creator.name}`} className="video-details-inner-top-left-inner">
                                                    <div className="video-details-inner-top-left-user creator-gradient">
                                                        <div className="video-details-inner-top-left-user-live">
                                                            <p>New</p>
                                                        </div>
                                                        <img className="video-details-inner-top-left-user-image"
                                                             src={videoDetails.creator.profilePicture} alt=""/>
                                                    </div>
                                                    <div className="video-details-inner-top-left-userinfo">
                                                        <h3 className="video-details-inner-top-left-userinfo-username">
                                                            <span>{videoDetails.creator.displayName}</span>
                                                            {videoDetails.creator?.verified === 1 ? (
                                                                <img
                                                                    src={process.env.PUBLIC_URL + `/images/verified.svg`}
                                                                    alt=""/>
                                                            ) : null}
                                                        </h3>
                                                        <p className="video-details-inner-top-left-userinfo-subscribers">{subscriberCount} subscribers</p>
                                                    </div>
                                                </NavLink>
                                                <div className="video-details-inner-top-left-subscribe">
                                                    {isSubscribed ? (
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
                                                    )}
                                                </div>
                                            </div>
                                            <div className="video-details-inner-top-right">
                                                <button className="video-details-inner-top-right-button blackbutton">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                         width="24px" height="24px"
                                                         viewBox="0 0 24 24" version="1.1">
                                                        <title>Heart</title>
                                                        <g id="heart" stroke="none" stroke-width="1" fill="none"
                                                           fill-rule="evenodd" stroke-linecap="round"
                                                           stroke-linejoin="round">
                                                            <g id="heart-inner"
                                                               transform="translate(2.550170, 3.550158)"
                                                               stroke="#000000"
                                                               stroke-width="1.5">
                                                                <path
                                                                    d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"
                                                                    id="Stroke-1"/>
                                                                <path
                                                                    d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"
                                                                    id="Stroke-3"/>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <p className="homebar-inner-text">{videoDetails.likes}</p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="video-details-inner-bottom">
                                            <p className="video-details-inner-bottom-views">
                                                <NumericFormat
                                                    value={videoDetails.views}
                                                    thousandSeparator=" "
                                                    displayType="text"
                                                    renderText={(value) => <b>{value}</b>}
                                                /> Views &middot; {format(new Date(videoDetails.datePosted), 'MMM d, yyyy')}
                                            </p>
                                            <p className="video-details-inner-bottom-description">{videoDetails.description}</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="video-comments">
                                    <div className="video-comments-inner">
                                        <div className="video-comments-inner-top">
                                            <h3 className="video-comments-inner-top-title">Comments</h3>
                                        </div>
                                        <div className="video-comments-inner-center">

                                        </div>
                                        <div className="video-comments-inner-bottom"></div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </ScrollBar>
                <SideBarRight
                    isMenuVisible={isSidebarMenuVisible}
                    isVideoVisible={isVideoMenuVisible}
                    videoDetails={videoDetails}
                    subscriberCount={subscriberCount}
                    isSubscribed={isSubscribed}
                    handleSubscribe={handleSubscribe}
                    handleLike={handleLike}
                />
            </div>
            <PageShadow/>
            </motion.div>
        </>
    );
}

export default Video;