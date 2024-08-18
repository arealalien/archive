import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ScrollBar from './components/ScrollBar';
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideoSec from "./components/videos/VideoSec";
import VideosSec from "./components/videos/VideosSec";
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

    const profilePictureUrl = `http://localhost:5000/${videoDetails.creator.profilePicture}`;
    const bannerUrl = `http://localhost:5000/${videoDetails.creator.banner}`;

    const videoMenuDetails = [];

    return (
        <>
            <DocumentTitle title={`Archive - ` + videoDetails.title} />
            <Navbar searchbar="yes" toggleSidebarMenu={toggleSidebarMenu} />
            <div className="page">
                <SideBarLeft/>
                <ScrollBar className="page-center">
                    <section className="video">
                        <div className="video-inner view-width">
                            <div className="video-inner-left">
                                <VideoSec video={videoDetails}/>
                                <section className="videos">
                                    <div className="videos-inner videos-inner-4">
                                        <VideosSec/>
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
                />
            </div>
            <PageShadow/>
        </>
    );
}

export default Video;