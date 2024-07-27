import React, { useEffect, useState } from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import axios from 'axios';
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import './css/main.css';

// Components
import DocumentTitle from "./components/DocumentTitle";
import Navbar from "./components/Navbar";
import VideoSec from "./components/videos/VideoSec";
import VideosSec from "./components/videos/VideosSec";
import PageShadow from "./components/PageShadow";
import Footer from "./components/Footer";

function Video() {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [error, setError] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    return (
        <>
            <DocumentTitle title={`Archive - ` + videoDetails.title} />
            <Navbar searchbar="yes"/>
            <section className="video">
                <div className="video-inner view-width">
                    <div className="video-inner-left">
                        <VideoSec video={videoDetails}/>
                        <section className="videos">
                            <div className="videos-inner videos-inner-3">
                                <VideosSec/>
                            </div>
                        </section>
                    </div>
                    <div className="video-inner-right">
                        <div className="video-inner-right-box">
                            <div className="video-inner-right-box-top">
                                <div className="video-inner-right-box-top-user">
                                    <NavLink to={`/channel/${videoDetails.creator.name}`} className="video-inner-right-box-top-user-inner">
                                        <div className="video-inner-right-box-top-user-container">
                                            <img className="video-inner-right-box-top-user-container-image"
                                                 src={profilePictureUrl}
                                                 alt=""/>
                                        </div>
                                        <div className="video-inner-right-box-top-user-text">
                                            <h3 className="video-inner-right-box-top-user-text-username">
                                                <span>{videoDetails.creator.displayName}</span>
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
                                            </h3>
                                            <p className="video-inner-right-box-top-user-text-date">{subscriberCount} Subscribers</p>
                                        </div>
                                    </NavLink>
                                    <div className="video-inner-right-box-top-container">
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
                                    <div className="video-inner-right-box-top-user-overlay"></div>
                                    <img className="video-inner-right-box-top-user-background"
                                         src={bannerUrl}
                                         alt=""/>
                                </div>
                            </div>
                            <div className="video-inner-right-box-center">
                                <h3 className="video-inner-right-box-center-title">{videoDetails.title}</h3>
                                <p className="video-inner-right-box-center-subtitle">
                                    <NumericFormat
                                    value={videoDetails.views}
                                    thousandSeparator=" "
                                    displayType="text"
                                    renderText={(value) => <b>{value}</b>}
                                /> Views &middot; {format(new Date(videoDetails.datePosted), 'MMM d, yyyy')}</p>
                                <p className="video-inner-right-box-center-description">{videoDetails.description}</p>
                            </div>
                            <div className="video-inner-right-box-bottom">
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Heart</title>
                                        <g id="heart" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="heart-inner" transform="translate(2.550170, 3.550158)"
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
                                </div>
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px"
                                         viewBox="0 0 24 24" version="1.1">
                                        <title>Chat</title>
                                        <g id="chat" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="chat-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000">
                                                <line x1="13.9394" y1="10.413" x2="13.9484" y2="10.413"
                                                      id="Stroke-11" stroke-width="2"/>
                                                <line x1="9.9304" y1="10.413" x2="9.9394" y2="10.413" id="Stroke-13"
                                                      stroke-width="2"/>
                                                <line x1="5.9214" y1="10.413" x2="5.9304" y2="10.413" id="Stroke-15"
                                                      stroke-width="2"/>
                                                <path
                                                    d="M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z"
                                                    id="Stroke-4" stroke-width="1.5"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="homebar-inner-text">0</p>
                                </div>
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Folder</title>
                                        <g id="folder" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="folder-inner" transform="translate(2.500000, 2.500000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="4.8057" y1="12.0742685" x2="14.3987" y2="12.0742685"
                                                      id="Stroke-1"/>
                                                <path
                                                    d="M-1.13686838e-13,5.29836453 C-1.13686838e-13,2.85645977 1.25,0.75931691 3.622,0.272650243 C5.993,-0.214968804 7.795,-0.0463973758 9.292,0.761221672 C10.79,1.56884072 10.361,2.76122167 11.9,3.63645977 C13.44,4.51265024 15.917,3.19645977 17.535,4.94217405 C19.229,6.7697931 19.2200005,9.57550739 19.2200005,11.3640788 C19.2200005,18.1602693 15.413,18.6993169 9.61,18.6993169 C3.807,18.6993169 -1.13686838e-13,18.2288407 -1.13686838e-13,11.3640788 L-1.13686838e-13,5.29836453 Z"
                                                    id="Stroke-2"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div className="video-inner-right-box-bottom-item">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <title>Download</title>
                                        <g id="download" stroke="none" stroke-width="1" fill="none"
                                           fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g id="download-inner" transform="translate(2.000000, 2.000000)"
                                               stroke="#000000"
                                               stroke-width="1.5">
                                                <line x1="9.8791" y1="12.791" x2="9.8791" y2="0.75" id="Stroke-1"/>
                                                <polyline id="Stroke-3"
                                                          points="12.7951 9.8642 9.8791 12.7922 6.9631 9.8642"/>
                                                <path
                                                    d="M14.3703,5.2587 C17.9493,5.5887 19.2503,6.9287 19.2503,12.2587 C19.2503,19.3587 16.9393,19.3587 10.0003,19.3587 C3.0593,19.3587 0.7503,19.3587 0.7503,12.2587 C0.7503,6.9287 2.0503,5.5887 5.6303,5.2587"
                                                    id="Stroke-4"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="video-inner-right-box-shadow"></div>
                        </div>
                        <div className="video-inner-right-box-comments">
                            <div className="video-inner-right-box-comments-top">
                                <h3 className="video-inner-right-box-comments-top-title">Comments</h3>
                            </div>
                            <div className="video-inner-right-box-comments-center">

                            </div>
                            <div className="video-inner-right-box-comments-bottom">

                            </div>
                            <div className="video-inner-right-box-comments-shadow"></div>
                        </div>
                    </div>
                </div>
            </section>
            <PageShadow/>
            <Footer/>
        </>
    );
}

export default Video;