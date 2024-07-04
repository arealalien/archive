import React, { useEffect, useState, useRef } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

const VideoSec  = () => {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const videoRef = useRef(null);
    const progressRef = useRef(null);

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

                // Fetch video details
                const videoResponse = await axios.get(`http://localhost:5000/videos/${encodeURIComponent(videoUrl)}`, { headers });
                setVideoDetails(videoResponse.data);

            } catch (err) {
                console.error('Error fetching video data:', err);
                setError('Failed to fetch video data');
            }
        };

        fetchVideoData();
    }, [location.search]);

    useEffect(() => {
        const updatePlayState = () => {
            setIsPlaying(!videoRef.current.paused);
        };

        const updateProgress = () => {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setCurrentTime(currentTime);
            setDuration(duration);
            if (progressRef.current) {
                const progressPercent = (currentTime / duration) * 100;
                progressRef.current.style.width = `${progressPercent}%`;
            }
        };

        const togglePlayPause = () => {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        };

        const handleKeydown = (e) => {
            if (e.key === ' ') {
                togglePlayPause(e);
            }
            if(e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        const overlay = document.querySelector(".player-overlay");
        const playButton = document.querySelector(".video-play");

        if (overlay) {
            overlay.addEventListener("click", togglePlayPause);
        }

        if (playButton) {
            playButton.addEventListener("click", togglePlayPause);
        }

        if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
            videoRef.current.addEventListener("play", updatePlayState);
            videoRef.current.addEventListener("pause", updatePlayState);
            videoRef.current.addEventListener("timeupdate", updateProgress);
        }

        return () => {
            if (overlay) {
                overlay.removeEventListener("click", togglePlayPause);
            }
            if (playButton) {
                playButton.removeEventListener("click", togglePlayPause);
            }
            if (videoRef.current) {
                videoRef.current.removeEventListener("play", updatePlayState);
                videoRef.current.removeEventListener("pause", updatePlayState);
                videoRef.current.removeEventListener("timeupdate", updateProgress);
            }
        };
    }, [videoDetails, duration]);

    useEffect(() => {
        const handleFullscreenToggleLoc = () => {
            if (!isFullScreen) {
                // Enter fullscreen
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
                setIsFullScreen(true);
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                setIsFullScreen(false);
            }
        };

        const handleKeydown = (e) => {
            if (e.key === 'f') {
                handleFullscreenToggleLoc();
            } else if (e.key === 'Escape' && isFullScreen) {
                handleFullscreenToggleLoc();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [isFullScreen]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!videoDetails) {
        return <div>Loading...</div>;
    }

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleVolumeChange = (e) => {
        if (!videoRef.current) return;

        const clickPosition = e.clientX - progressRef.current.getBoundingClientRect().left;
        const barWidth = progressRef.current.clientWidth;
        const clickPercent = clickPosition / barWidth;

        // Volume ranges from 0 to 1
        setVolume(clickPercent);
        videoRef.current.volume = clickPercent;
    };

    const handleMouseDown = (e) => {
        handleVolumeChange(e);
        document.addEventListener("mousemove", handleVolumeChange);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleVolumeChange);
        });
    };

    const handleSeek = (e) => {
        if (!progressRef.current) return;

        const clickPosition = e.clientX - progressRef.current.getBoundingClientRect().left;
        const barWidth = progressRef.current.clientWidth;
        const clickPercent = clickPosition / barWidth;
        const seekTime = clickPercent * duration;

        videoRef.current.currentTime = seekTime;
    };

    const handleFullscreenToggle = () => {
        if (!isFullScreen) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    return (
        <div className={`video-inner-left-box ${isFullScreen ? 'fullscreen' : ''}`}>
            <div className="player">
                <div className="player-bottom">
                    <div className="player-bottom-inner">
                        <div className="player-bottom-inner-left">
                            <div className="player-bottom-inner-left-icon icon-small video-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Prev" data-name="Xnix/Line/Prev"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M2.715-.35l5.69-4.3a1.412,1.412,0,0,0,0-2.3l-5.69-4.7A1.676,1.676,0,0,0,0-10.5V-1.5A1.676,1.676,0,0,0,2.715-.35Z"
                                          transform="translate(18 6) rotate(180)" fill="none" stroke="#000"
                                          stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                    <path id="Vector-2" data-name="Vector" d="M12,0V-12"
                                          transform="translate(18 6) rotate(180)" fill="none" stroke="#000"
                                          stroke-linecap="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                            <div className="player-bottom-inner-left-icon video-play">
                                {isPlaying ? (
                                    <svg className="video-play-pause" xmlns="http://www.w3.org/2000/svg"
                                         id="Xnix_Line_Pause" data-name="Xnix/Line/Pause"
                                         width="24" height="24" viewBox="0 0 24 24">
                                        <path id="Vector"
                                              d="M0,1.125v5.75A1.118,1.118,0,0,0,1.111,8H2.222A1.118,1.118,0,0,0,3.333,6.875V1.125A1.118,1.118,0,0,0,2.222,0H1.111A1.118,1.118,0,0,0,0,1.125Z"
                                              transform="translate(7 8)" fill="none" stroke="#000"
                                              stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                        <path id="Vector-2" data-name="Vector"
                                              d="M6.667,1.125v5.75A1.118,1.118,0,0,0,7.778,8H8.889A1.118,1.118,0,0,0,10,6.875V1.125A1.118,1.118,0,0,0,8.889,0H7.778A1.118,1.118,0,0,0,6.667,1.125Z"
                                              transform="translate(7 8)" fill="none" stroke="#000"
                                              stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                    </svg>
                                ) : (
                                    <svg className="video-play-play" xmlns="http://www.w3.org/2000/svg"
                                         id="Xnix_Line_Play" data-name="Xnix/Line/Play"
                                         width="24" height="24" viewBox="0 0 24 24">
                                        <path id="Vector"
                                              d="M.35,6.285,4.647.6a1.412,1.412,0,0,1,2.3,0l4.7,5.69A1.676,1.676,0,0,1,10.5,9H1.5A1.676,1.676,0,0,1,.35,6.285Z"
                                              transform="translate(16 6) rotate(90)" fill="none" stroke="#000"
                                              stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                    </svg>
                                )}
                            </div>
                            <div className="player-bottom-inner-left-icon icon-small video-next">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Next" data-name="Xnix/Line/Next"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path id="Vector"
                                          d="M2.715.35l5.69,4.3a1.412,1.412,0,0,1,0,2.3l-5.69,4.7A1.676,1.676,0,0,1,0,10.5V1.5A1.676,1.676,0,0,1,2.715.35Z"
                                          transform="translate(6 6)" fill="none" stroke="#000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                    <path id="Vector-2" data-name="Vector" d="M12,0V12" transform="translate(6 6)"
                                          fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                            <div className="player-bottom-inner-left-audio">
                                <div className="player-bottom-inner-left-audio-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_High"
                                         data-name="Xnix/Line/Vol High" width="24" height="24" viewBox="0 0 24 24">
                                        <path id="Vector"
                                              d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z"
                                              transform="translate(5 7)" fill="none" stroke="#000"
                                              stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                        <path id="Vector-2" data-name="Vector"
                                              d="M12.463.417a7.62,7.62,0,0,1,0,9.167M9.974,1.563a5.265,5.265,0,0,1,0,6.875"
                                              transform="translate(5 7)" fill="none" stroke="#000"
                                              stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="1.5"/>
                                    </svg>
                                </div>
                                <div className="player-bottom-inner-left-audio-bar" onMouseDown={(e) => handleMouseDown(e)}>
                                    <div className="player-bottom-inner-left-audio-bar-inner">
                                        <div className="player-bottom-inner-left-audio-bar-inner-progress" style={{ width: `${volume * 100}%` }}>
                                            <div
                                                className="player-bottom-inner-left-audio-bar-inner-progress-dot"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="player-bottom-inner-left-time">
                                <p><span className="player-currenttime">{formatTime(currentTime)}</span> <span className="player-bottom-inner-left-time-small">/</span>
                                    <span className="player-time">{formatTime(duration)}</span></p>
                            </div>
                        </div>
                        <div className="player-bottom-inner-center">
                            <div className="player-bottom-inner-center-thumbnail">
                                <div className="player-bottom-inner-center-thumbnail-inner">
                                    <img
                                        src={process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/thumbnail.jpg"}
                                        alt="" />
                                    <div className="player-bottom-inner-center-thumbnail-inner-shadow"></div>
                                </div>
                            </div>
                            <div className="player-bottom-inner-center-bar" onClick={(e) => handleSeek(e)}>
                                <div className="player-bottom-inner-center-bar-inner">
                                    <div ref={progressRef} className="player-bottom-inner-center-bar-inner-progress">
                                        <div className="player-bottom-inner-center-bar-inner-progress-dot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="player-bottom-inner-right">
                            <div className="player-bottom-inner-right-icon" onClick={handleFullscreenToggle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.5" height="15.5"
                                     viewBox="0 0 15.5 15.5">
                                    <path id="Vector" d="M8.75,0H14V5.25M0,8.75V14H5.25M0,5.25V0H5.25m3.5,14H14V8.75"
                                          transform="translate(0.75 0.75)" fill="none" stroke="#000"
                                          stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="player-bottom-inner-shadow"></div>
                    </div>
                </div>
            </div>
            <div className="player-overlay"></div>
            <video ref={videoRef} controls={false} className="player-video">
                <source src={process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/" + videoDetails.videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}
export default VideoSec;