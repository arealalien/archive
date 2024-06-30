import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const VideosSec = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await fetch('http://localhost:5000/videos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <>
            {videos.map((video, index) => (
                <div className="videos-inner-item" key={index}>
                    <div className="videos-inner-item-top-info">
                        <NavLink to={`/profile/${video.creator.name}`} className="videos-inner-item-top-info-user">
                            <div className="videos-inner-item-top-info-user-picture">
                                <img className="videos-inner-item-top-info-user-picture-image"
                                     src={process.env.PUBLIC_URL + "/" + video.creator.profilePicture} alt=""/>
                            </div>
                            <p className="videos-inner-item-top-info-user-username">
                                <span>{video.creator.name}</span>
                                <svg className="verified-icon" viewBox="0 0 22 22" aria-hidden="true">
                                    <g>
                                        <linearGradient gradientUnits="userSpaceOnUse" id="a" x1="4.411" x2="18.083"
                                                        y1="2.495" y2="21.508">
                                            <stop offset="0"></stop>
                                            <stop offset=".539"></stop>
                                            <stop offset=".68"></stop>
                                            <stop offset="1"></stop>
                                            <stop offset="1"></stop>
                                        </linearGradient>
                                        <linearGradient gradientUnits="userSpaceOnUse" id="b" x1="5.355" x2="16.361"
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
                            </p>
                            <div className="videos-inner-item-top-info-user-shadow"></div>
                        </NavLink>
                        <div className="videos-inner-item-top-info-time">
                            <p>{video.time}</p>
                            <div className="videos-inner-item-top-info-time-shadow"></div>
                        </div>
                    </div>
                    <div className="videos-inner-item-bottom-info">
                        <p className="videos-inner-item-bottom-info-title">{video.title}</p>
                        <p className="videos-inner-item-bottom-info-info">{video.views} Views &middot; {video.date}</p>
                    </div>
                    <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-overlay"></NavLink>
                    <img className="videos-inner-item-background" src={process.env.PUBLIC_URL + "/users/" + video.creatorId + "/videos/" + video.videoUrl.split('.')[0] + "/thumbnail.jpg"} alt=""/>
                </div>
            ))}
        </>
    );
};

export default VideosSec;