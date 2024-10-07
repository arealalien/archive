import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import VideosSkeletonSec from "./VideosSkeletonSec";

const VideosSec = ({ videoCreator, search, discovery }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const observer = useRef(null);

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

    let hoverTimeout = null;
    const debounceHover = (callback, delay) => {
        return (...args) => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };

    const handleMouseEnter = debounceHover((e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        if (!videoContainer) return;

        const video = videoContainer.querySelector('.videos-inner-item-video-video');
        const thumbnail = videoContainer.querySelector('.videos-inner-item-video-background');
        const progressBar = videoContainer.querySelector('.videos-inner-item-info-line-progress');
        if (!video || !thumbnail || !progressBar) return;

        video.src = video.getAttribute('data-src');
        video.preload = "metadata"; // Preload the video metadata

        const positions = [0.15, 0.30, 0.45, 0.60, 0.75, 0.90];
        let currentIndex = 0;

        if (video.loopTimeout) clearTimeout(video.loopTimeout);

        const updateTime = () => {
            if (!videoContainer.matches(':hover')) {
                handleMouseLeave(e); // Trigger the handleMouseLeave logic if no longer hovering
                return;
            }

            video.currentTime = video.duration * positions[currentIndex];

            const onSeeked = () => {
                // Once the video is fully loaded to the seeked position, update the progress bar and wait 2 seconds
                const percent = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${percent}%`;

                currentIndex = (currentIndex + 1) % positions.length;

                // Remove the listener to avoid memory leaks
                video.removeEventListener('seeked', onSeeked);

                // After 2 seconds, go to the next position
                video.loopTimeout = setTimeout(updateTime, 2000);
            };

            // Wait until the video has fully loaded the seeked position
            video.addEventListener('seeked', onSeeked);
        };

        const onMetadataLoaded = () => {
            thumbnail.style.opacity = "0";
            video.play().then(() => updateTime()).catch(err => console.error('Video failed to play:', err));
        };

        if (video.readyState >= 1) onMetadataLoaded();
        else video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
    }, 200);

    const handleMouseLeave = (e) => {
        const videoContainer = e.target.closest('.videos-inner-item');
        const video = videoContainer.querySelector('.videos-inner-item-video-video');
        const thumbnail = videoContainer.querySelector('.videos-inner-item-video-background');
        const progressBar = videoContainer.querySelector('.videos-inner-item-info-line-progress');
        if (!video || !thumbnail || !progressBar) return;

        if (video.loopTimeout) clearTimeout(video.loopTimeout);

        video.pause();
        video.currentTime = 0;
        progressBar.style.width = "0%";
        thumbnail.style.opacity = "1";

        video.src = '';
        video.preload = "none";
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.src = video.getAttribute('data-src');
                    } else {
                        video.pause();
                        video.currentTime = 0;
                        video.src = '';
                    }
                });
            },
            { threshold: 0.1 }
        );

        const videos = document.querySelectorAll('.videos-inner-item-video-video');
        videos.forEach((video) => observer.observe(video));

        return () => {
            videos.forEach((video) => observer.unobserve(video));
        };
    }, [videos]);

    return (
        <>
            {isLoading ? (
                <VideosSkeletonSec count={16} />
            ) : (
                videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div className="videos-inner-item" key={index} onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave} onMouseOut={handleMouseLeave}>
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
                                    data-src={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/" + video.videoUrl.split('.')[0] + "-144p." + video.videoUrl.split('.')[1]}
                                    muted
                                    loop
                                    preload="none"
                                />
                                <img className="videos-inner-item-video-background"
                                     src={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/thumbnail.jpg"}
                                     alt={video.title} loading="lazy" />
                            </NavLink>
                            <div className="videos-inner-item-info">
                                <NavLink to={`/channel/${video.creator.name}`} className="videos-inner-item-bottom-info-left">
                                    <img className="videos-inner-item-info-left-image"
                                         src={process.env.PUBLIC_URL + "/" + video.creator.profilePicture} alt="" loading="lazy" />
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
                    ))
                ) : (
                    <p>No videos found</p>
                )
            )}
        </>
    );
};

export default VideosSec;