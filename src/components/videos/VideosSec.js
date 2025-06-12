import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import VideosSkeletonSec from "./VideosSkeletonSec";
import MiniVideoSec from "./MiniVideoSec";

const VideosSec = ({ videoCreator, search, discovery, profileVideoCreator }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const videoRefs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token');
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

                if (profileVideoCreator) {
                    url = `http://localhost:5000/featuredvideos?creator=${encodeURIComponent(videoCreator)}`;
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
    }, [videoCreator, search, discovery, profileVideoCreator]);

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

    const handleMouseEnter = async (e, index) => {
        const player = videoRefs.current[index]?.current;
        const videoContainer = e.target.closest('.videos-inner-item');

        if (!player || !videoContainer || !(e.relatedTarget instanceof Node) || videoContainer.contains(e.relatedTarget)) {
            return;
        }

        if (player.readyState && player.readyState() < 4) {
            console.log("Video not fully ready yet, waiting...");
            return;
        }

        const time = videoContainer.querySelector('.videos-inner-item-video-info-time');
        const overlay = videoContainer.querySelector('.videos-inner-item-video-overlay');
        const poster = videoContainer.querySelector('.vjs-poster');
        const posterInner = poster.querySelector('.vjs-poster');

        time.style.opacity = "0";
        overlay.style.opacity = "0";
        poster.style.display = "inline-block";
        posterInner.style.display = "inline-block";
        poster.style.opacity = "0";
        posterInner.style.opacity = "0";

        try {
            await player.play();
        } catch (err) {
            console.error("Error trying to play the video:", err);
        }
    };

    const handleMouseLeave = async (e, index) => {
        const player = videoRefs.current[index]?.current;
        const videoContainer = e.target.closest('.videos-inner-item');

        if (!player || !videoContainer || !(e.relatedTarget instanceof Node) || videoContainer.contains(e.relatedTarget)) {
            return;
        }

        const time = videoContainer.querySelector('.videos-inner-item-video-info-time');
        const overlay = videoContainer.querySelector('.videos-inner-item-video-overlay');
        const poster = videoContainer.querySelector('.vjs-poster');
        const posterInner = poster.querySelector('.vjs-poster');

        if (time) time.style.opacity = "1";
        if (overlay) overlay.style.opacity = "1";
        if (poster) poster.style.display = "inline-block";
        if (posterInner) posterInner.style.display = "inline-block";

        if (poster) poster.style.opacity = "1";
        if (posterInner) posterInner.style.opacity = "1";

        player.reset();
    };

    document.addEventListener('mouseleave', function (e) {
        // Ensure the event is triggered only when the mouse leaves the document (browser window)
        if (e.relatedTarget instanceof Node) {
            return;
        }

        // Convert videoRefs.current (object) to an array of values
        const players = Object.values(videoRefs.current) || [];

        // Get all video containers
        const videoContainers = document.querySelectorAll('.videos-inner-item');

        players.forEach((playerRef, index) => {
            const player = playerRef?.current;
            const videoContainer = videoContainers[index];

            if (!player || !videoContainer) {
                return;
            }

            const time = videoContainer.querySelector('.videos-inner-item-video-info-time');
            const overlay = videoContainer.querySelector('.videos-inner-item-video-overlay');
            const poster = videoContainer.querySelector('.vjs-poster');
            const posterInner = poster?.querySelector('.vjs-poster');

            // Reset styles for overlay, poster, and time elements
            if (time) time.style.opacity = '1';
            if (overlay) overlay.style.opacity = '1';
            if (poster) poster.style.display = 'inline-block';
            if (posterInner) posterInner.style.display = 'inline-block';
            if (poster) poster.style.opacity = '1';
            if (posterInner) posterInner.style.opacity = '1';

            // Reset the player
            player.reset();
        });
    });

    const handleMouseDown = (e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        if (!videoContainer) return;

        videoContainer.style.backgroundColor = "#000";
        videoContainer.style.border = "1px solid rgba(255, 255, 255, .15)";
    };

    const handleMouseUp = (e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        if (!videoContainer) return;

        videoContainer.style.backgroundColor = "transparent";
        videoContainer.style.border = "1px solid rgba(255, 255, 255, 0)";
    };

    const handleMouseClick = (videoUrl) => {
        const videoId = videoUrl.split('.')[0];
        navigate(`/video?view=${videoId}`);
    };

    return (
        <>
        {isLoading ? (
            <VideosSkeletonSec count={profileVideoCreator ? 4 : 16} />
        ) : (
            videos.length > 0 &&
            videos.map((video, index) => {
                if (!videoRefs.current[index]) {
                    videoRefs.current[index] = React.createRef(); // Create a ref for each video
                }

                return (
                    <div className="videos-inner-item"
                         onMouseEnter={isLoading ? null : (e) => handleMouseEnter(e, index)}
                         onMouseLeave={isLoading ? null : (e) => handleMouseLeave(e, index)}
                         onMouseDown={handleMouseDown}
                         onMouseUp={handleMouseUp}>
                        <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-link">

                        </NavLink>
                        <div className="videos-inner-item-video" onClick={() => handleMouseClick(video.videoUrl)}>
                            <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]}
                                     className="videos-inner-item-video-link">

                            </NavLink>
                            <div className="videos-inner-item-video-info">
                                <div className="videos-inner-item-video-info-time">
                                    <p>{video.duration}</p>
                                    <div className="videos-inner-item-video-info-time-shadow"></div>
                                </div>
                            </div>
                            <div to={`/video?view=` + video.videoUrl.split('.')[0]}
                                 className="videos-inner-item-video-overlay"></div>
                            <MiniVideoSec video={video} ref={videoRefs.current[index]}/>
                        </div>
                        <div className="videos-inner-item-info">
                            <NavLink to={`/channel/${video.creator.name}`} className="videos-inner-item-info-left">
                                <img className="videos-inner-item-info-left-image"
                                     src={process.env.PUBLIC_URL + "/" + video.creator.profilePicture} alt=""
                                     loading="lazy"/>
                            </NavLink>
                            <div className="videos-inner-item-info-right">
                                <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]}
                                         className="videos-inner-item-info-right-title">{video.title}</NavLink>
                                <NavLink to={`/channel/${video.creator.name}`}
                                         className="videos-inner-item-info-right-name">
                                    <span>{video.creator.displayName}</span>
                                    {video.creator?.verified === 1 ? (
                                        <img src={process.env.PUBLIC_URL + `/images/verified.svg`} alt=""/>
                                    ) : null}
                                </NavLink>
                                <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]}
                                         className="videos-inner-item-info-right-info">Seen {formatViews(video.views)} times &middot; {formatDistanceToNow(new Date(video.datePosted))} ago</NavLink>
                            </div>
                        </div>
                    </div>
                    );
                }))
            }
        </>
    )};

export default VideosSec;