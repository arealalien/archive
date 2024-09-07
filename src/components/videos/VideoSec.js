import React, { useEffect, useState, useRef } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

class Processor {
    constructor(videoElement, canvas) {
        this.video = videoElement;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.video.addEventListener("play", () => {
            this.updateCanvas();
        });

        this.video.addEventListener("pause", () => {
            cancelAnimationFrame(this.animationFrameId);
        });
    }

    updateCanvas = () => {
        if (this.video.paused || this.video.ended) {
            cancelAnimationFrame(this.animationFrameId);
            return;
        }

        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        this.animationFrameId = requestAnimationFrame(this.updateCanvas);
    };
}

const useFetchVideoData = (location, setError, setVideoDetails) => {
    useEffect(() => {
        const fetchVideoData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return setError("No token found");

            const videoUrl = new URLSearchParams(location.search).get("view");
            if (!videoUrl) return setError("No video URL found");

            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`http://localhost:5000/videos/${encodeURIComponent(videoUrl)}`, { headers });
                setVideoDetails(response.data);
            } catch (err) {
                console.error("Error fetching video data:", err);
                setError("Failed to fetch video data");
            }
        };
        fetchVideoData();
    }, [location.search, setError, setVideoDetails]);
};

const VideoSec  = () => {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(() => {
        // Retrieve volume from localStorage if it exists
        const savedVolume = localStorage.getItem('videoVolume');
        return savedVolume ? parseFloat(savedVolume) : 0.5;
    });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volumeIcon, setVolumeIcon] = useState(null);
    const [played, setPlayed] = useState(0);

    const playerRef = useRef(null);
    const bottomRef = useRef(null);
    const canvasRef = useRef(null);
    const progressRef = useRef(null);
    const progressBarRef = useRef(null);
    const audioProgressBarRef = useRef(null);
    const playerPopupRef = useRef(null);

    const icons = {
        mute: (
            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_mute" data-name="Xnix/Line/Vol mute" width="24" height="24" viewBox="0 0 24 24">
                <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                <path id="Vector-2" data-name="Vector" d="M10,7l2-2m0,0,2-2M12,5l2,2M12,5,10,3" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
        ),
        low: (
            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_Zero" data-name="Xnix/Line/Vol Zero" width="24" height="24" viewBox="0 0 24 24">
                <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(8 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
        ),
        medium: (
            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_Low" data-name="Xnix/Line/Vol Low" width="24" height="24" viewBox="0 0 24 24">
                <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(6 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                <path id="Vector-2" data-name="Vector" d="M9.974,1.563a5.265,5.265,0,0,1,0,6.875" transform="translate(6 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
            </svg>
        ),
        high: (
            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_High" data-name="Xnix/Line/Vol High" width="24" height="24" viewBox="0 0 24 24">
                <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                <path id="Vector-2" data-name="Vector" d="M12.463.417a7.62,7.62,0,0,1,0,9.167M9.974,1.563a5.265,5.265,0,0,1,0,6.875" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
        ),
    };

    useFetchVideoData(location, setError, setVideoDetails);

    // Handle volume icon update
    useEffect(() => {
        const updateVolumeIcon = () => {
            setVolumeIcon(
                volume === 0
                    ? icons.mute
                    : volume <= 0.3
                        ? icons.low
                        : volume <= 0.6
                            ? icons.medium
                            : icons.high
            );
        };
        updateVolumeIcon();
    }, [volume]);

    useEffect(() => {
        const updateVolumeIcon = () => {
            if (volume === 0) {
                setVolumeIcon(icons.mute);
            } else if (volume > 0 && volume <= 0.3) {
                setVolumeIcon(icons.low);
            } else if (volume > 0.3 && volume <= 0.6) {
                setVolumeIcon(icons.medium);
            } else {
                setVolumeIcon(icons.high);
            }
        };

        updateVolumeIcon();
    }, [volume]);

    useEffect(() => {
        const initializeCanvas = () => {
            const videoElement = playerRef.current?.getInternalPlayer(); // Optional chaining
            if (videoElement && canvasRef.current) {
                const processor = new Processor(videoElement, canvasRef.current);
            }
        };

        const videoElement = playerRef.current?.getInternalPlayer(); // Optional chaining
        if (videoElement) {
            videoElement.addEventListener('play', initializeCanvas);
            return () => {
                videoElement.removeEventListener('play', initializeCanvas);
            };
        }
    }, [playerRef, canvasRef, videoDetails]);

    // Skip Backward
    const skipBackward = () => {
        const player = playerRef.current;
        if (player) {
            const newTime = Math.max(currentTime - 5, 0); // Ensure it doesn't go below 0
            player.seekTo(newTime);
            setCurrentTime(newTime);
            setIsPlaying(false);
        }
    };

    // Skip Forward
    const skipForward = () => {
        const player = playerRef.current;
        if (player) {
            const newTime = Math.min(currentTime + 5, duration); // Ensure it doesn't exceed video duration
            player.seekTo(newTime);
            setCurrentTime(newTime);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                skipBackward();
            } else if (e.key === "ArrowRight") {
                skipForward();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentTime, duration]);

    const togglePlayPause = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);

        if (playerPopupRef.current) {
            playerPopupRef.current.style.opacity = "1";
            playerPopupRef.current.style.transform = "scale(.85, .85)";
            setTimeout(function () {
                playerPopupRef.current.style.opacity = "0";
                playerPopupRef.current.style.transform = "scale(1, 1)";
            }, 300);
        }

        if (!canvasRef.current) return;

        const videoElement = playerRef.current.getInternalPlayer();
        if (!videoElement) return;

        const processor = new Processor(videoElement, canvasRef.current);

        // Ensure canvas is updated when video starts playing
        if (isPlaying) {
            processor.updateCanvas();
        }
    };

    useEffect(() => {
        togglePlayPause();
    }, []);

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
        localStorage.setItem('videoVolume', parseFloat(e.target.value));
        const width = e.target.value * 100;
        audioProgressBarRef.current.style.width = `${width}%`;
    };

    useEffect(() => {
        if (audioProgressBarRef.current) {
            const width = volume * 100;
            audioProgressBarRef.current.style.width = `${width}%`;
        }
    }, [volume]);

    const handleProgress = (state) => {
        if (!isScrubbing) {
            setCurrentTime(state.playedSeconds);
            setPlayed(state.played);
        }
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    // Scrubbing (seeking) events:
    const handleSeekMouseDown = () => {
        setIsScrubbing(true);
        setIsPlaying(false);
    };

    const handleSeekChange = (event) => {
        const newPlayed = parseFloat(event.target.value);
        playerRef.current.seekTo(newPlayed);
        setPlayed(newPlayed);
    };

    const handleSeekMouseUp = (e) => {
        setIsScrubbing(false);
        setIsPlaying(true);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(screenfull.isFullscreen);
        };

        if (screenfull.isEnabled) {
            document.addEventListener('fullscreenchange', handleFullscreenChange);
        }

        return () => {
            if (screenfull.isEnabled) {
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "f" || e.key === "F") {
                toggleFullScreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            const videoContainer = playerRef.current.wrapper;
            screenfull.toggle(videoContainer);
        }
    };

    useEffect(() => {
        if (progressBarRef.current) {
            const width = played * 100;
            progressBarRef.current.style.width = `${width}%`;
        }
    }, [played]);

    useEffect(() => {
        if (playerRef.current && canvasRef.current) {
            const videoElement = playerRef.current.getInternalPlayer();
            const processor = new Processor(videoElement, canvasRef.current);
        }
    }, [playerRef, canvasRef]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!videoDetails) {
        return <div>Loading...</div>;
    }

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <canvas id="canvas" className={`${isFullScreen ? 'fullscreen' : ''}`} ref={canvasRef}></canvas>
            <div className={`video-inner-left-box ${isFullScreen ? 'fullscreen' : ''}`}>
                <div className="player">
                    <div ref={playerPopupRef} className="player-popup">
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
                    <div className="player-bottom" ref={bottomRef}>
                        <div className="player-bottom-inner">
                            <div className="player-bottom-inner-top">
                                <div className="player-bottom-inner-center">
                                    <div className="player-bottom-inner-center-thumbnail">
                                        <div className="player-bottom-inner-center-thumbnail-inner">
                                            <img
                                                src={process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/thumbnail.jpg"}
                                                alt=""/>
                                            <div className="player-bottom-inner-center-thumbnail-inner-shadow"></div>
                                        </div>
                                    </div>
                                    <div className="player-bottom-inner-center-bar">
                                        <div ref={progressBarRef}
                                             className="player-bottom-inner-center-bar-progress"></div>
                                        <input
                                            className="player-bottom-inner-center-bar-input"
                                            type='range'
                                            min={0}
                                            max={0.999999}
                                            step='any'
                                            value={played}
                                            onMouseDown={handleSeekMouseDown}
                                            onChange={handleSeekChange}
                                            onMouseUp={handleSeekMouseUp}
                                            ref={progressRef}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="player-bottom-inner-bottom">
                                <div className="player-bottom-inner-left">
                                    <div className="player-bottom-inner-left-icon icon-small video-prev"
                                         onClick={skipBackward}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Prev"
                                             data-name="Xnix/Line/Prev"
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
                                    <div className="player-bottom-inner-left-icon video-play" onClick={togglePlayPause}>
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
                                                      stroke-linecap="round" stroke-linejoin="round"
                                                      stroke-width="1.5"/>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="player-bottom-inner-left-icon icon-small video-next"
                                         onClick={skipForward}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Next"
                                             data-name="Xnix/Line/Next"
                                             width="24" height="24" viewBox="0 0 24 24">
                                            <path id="Vector"
                                                  d="M2.715.35l5.69,4.3a1.412,1.412,0,0,1,0,2.3l-5.69,4.7A1.676,1.676,0,0,1,0,10.5V1.5A1.676,1.676,0,0,1,2.715.35Z"
                                                  transform="translate(6 6)" fill="none" stroke="#000"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="1.5"/>
                                            <path id="Vector-2" data-name="Vector" d="M12,0V12"
                                                  transform="translate(6 6)"
                                                  fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                    <div className="player-bottom-inner-left-audio">
                                        <div className="player-bottom-inner-left-audio-icon">
                                            {volumeIcon}
                                        </div>
                                        <div className="player-bottom-inner-left-audio-bar">
                                            <div ref={audioProgressBarRef} style={{width: `${volume * 100}%`}}
                                                 className="player-bottom-inner-left-audio-bar-progress"></div>
                                            <input
                                                className="player-bottom-inner-left-audio-bar-input"
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="player-bottom-inner-left-time">
                                        <p><span className="player-currenttime">{formatTime(currentTime)}</span> <span
                                            className="player-bottom-inner-left-time-small">/</span>
                                            <span className="player-time">{formatTime(duration)}</span></p>
                                    </div>
                                </div>
                                <div className="player-bottom-inner-right">
                                    <div className="player-bottom-inner-right-icon" onClick={toggleFullScreen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.5" height="15.5"
                                             viewBox="0 0 15.5 15.5">
                                            <path id="Vector"
                                                  d="M8.75,0H14V5.25M0,8.75V14H5.25M0,5.25V0H5.25m3.5,14H14V8.75"
                                                  transform="translate(0.75 0.75)" fill="none" stroke="#000"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="1.5"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="player-overlay" onClick={togglePlayPause} onDoubleClick={toggleFullScreen}></div>
                <ReactPlayer
                    ref={playerRef}
                    url={process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/" + videoDetails.videoUrl}
                    playing={isPlaying}
                    volume={volume}
                    controls={false}
                    onReady={togglePlayPause}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    width="100%"
                    height="100%"
                    className="player-video"
                />
            </div>
        </>
    )
}
export default VideoSec;