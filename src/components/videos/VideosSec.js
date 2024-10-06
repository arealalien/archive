import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import VideosSkeletonSec from "./VideosSkeletonSec";

const VideosSec = ({ videoCreator, search, discovery }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                let url = 'http://localhost:5000/videos';

                if (search) {
                    url = `http://localhost:5000/search?query=${encodeURIComponent(search)}`;
                }

                if (discovery) {
                    url = `http://localhost:5000/discoveryvideos`;
                }


                if (videoCreator) {
                    url = `http://localhost:5000/videos?creator=${encodeURIComponent(videoCreator)}`;
                }

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data.map(video => ({
                    ...video,
                    duration: formatDuration(video.duration),
                })));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching video data:', error);
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, [videoCreator, search]);

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    };

    function formatViews(views) {
        if (views < 1000) return views.toString();
        if (views < 10000) {
            const result = (views / 1000).toFixed(1);
            return result.endsWith('.0') ? Math.floor(views / 1000) + 'k' : result + 'k';
        }
        if (views < 1000000) return Math.floor(views / 1000) + 'k';
        if (views < 10000000) {
            const result = (views / 1000000).toFixed(1);
            return result.endsWith('.0') ? Math.floor(views / 1000000) + ' mill.' : result + ' mill.';
        }
        if (views < 1000000000) return Math.floor(views / 1000000) + ' mill.';
        if (views < 10000000000) {
            const result = (views / 1000000000).toFixed(1);
            return result.endsWith('.0') ? Math.floor(views / 1000000000) + ' bill.' : result + ' bill.';
        }
        return Math.floor(views / 1000000000) + ' bill.';
    }

    const handleMouseEnter = (e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        if (!videoContainer) return;

        const video = videoContainer.querySelector('.videos-inner-item-video-video');
        const thumbnail = videoContainer.querySelector('.videos-inner-item-video-background');
        const progressBar = videoContainer.querySelector('.videos-inner-item-info-line-progress');
        if (!video || !thumbnail || !progressBar) return;

        video.preload = "metadata"; // Preload the video metadata

        const positions = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90];
        let currentIndex = 0;

        if (video.loopTimeout) {
            clearTimeout(video.loopTimeout);
            video.loopTimeout = null;
        }

        const updateTime = () => {
            video.currentTime = video.duration * positions[currentIndex];
            currentIndex = (currentIndex + 1) % positions.length;
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;

            // Update every 3 seconds
            video.loopTimeout = setTimeout(updateTime, 2000);
        };

        const onMetadataLoaded = () => {
            thumbnail.style.opacity = "0";
            video.play().then(() => {
                updateTime();
            }).catch(err => {
                console.error('Video failed to play:', err);
            });
        };

        if (video.readyState >= 1) {
            onMetadataLoaded();
        } else {
            const metadataLoadedHandler = () => {
                onMetadataLoaded();
                video.removeEventListener('loadedmetadata', metadataLoadedHandler);
            };
            video.addEventListener('loadedmetadata', metadataLoadedHandler);
        }
    };

    const handleMouseLeave = (e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        if (!videoContainer) return;

        const video = videoContainer.querySelector('.videos-inner-item-video-video');
        const thumbnail = videoContainer.querySelector('.videos-inner-item-video-background');
        const progressBar = videoContainer.querySelector('.videos-inner-item-info-line-progress');
        if (!video || !thumbnail || !progressBar) return;

        if (video.loopTimeout) {
            clearTimeout(video.loopTimeout);
            video.loopTimeout = null;
        }

        video.pause();
        video.currentTime = 0;
        progressBar.style.width = "0%";
        thumbnail.style.opacity = "1";
    };

    return (
        <>
            {isLoading ? (
                <VideosSkeletonSec count={16} />
            ) : (
                videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div className="videos-inner-item" key={index} onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                            <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-video">
                                <div className="videos-inner-item-video-info">
                                    <div className="videos-inner-item-video-info-time">
                                        <p>{video.duration}</p>
                                        <div className="videos-inner-item-video-info-time-shadow"></div>
                                    </div>
                                </div>
                                <div className="videos-inner-item-info-line">
                                    <div className="videos-inner-item-info-line-progress">
                                        <div className="videos-inner-item-info-line-progress-glow"></div>
                                    </div>
                                </div>
                                <div to={`/video?view=` + video.videoUrl.split('.')[0]}
                                     className="videos-inner-item-video-overlay"></div>
                                <video
                                    className="videos-inner-item-video-video"
                                    src={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/" + video.videoUrl.split('.')[0] + "-144p." + video.videoUrl.split('.')[1]}
                                    muted
                                    loop
                                    preload="none"
                                />
                                <img className="videos-inner-item-video-background"
                                     src={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/thumbnail.jpg"}
                                     alt={video.title}/>
                            </NavLink>
                            <div className="videos-inner-item-info">
                                <NavLink to={`/channel/${video.creator.name}`} className="videos-inner-item-bottom-info-left">
                                    <img className="videos-inner-item-info-left-image"
                                         src={process.env.PUBLIC_URL + "/" + video.creator.profilePicture} alt=""/>
                                </NavLink>
                                <div className="videos-inner-item-info-right">
                                    <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]}
                                             className="videos-inner-item-info-right-title">{video.title}</NavLink>
                                    <NavLink to={`/channel/${video.creator.name}`}
                                             className="videos-inner-item-info-right-name">
                                        <span>{video.creator.displayName}</span>
                                        {video.creator?.verified === 1 ? (
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
                                    </NavLink>
                                    <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]}
                                             className="videos-inner-item-info-right-info">Seen {formatViews(video.views)} times &middot; {formatDistanceToNow(new Date(video.datePosted))} ago</NavLink>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No videos found</p>
                )
            )}
        </>
    );
};

export default VideosSec;