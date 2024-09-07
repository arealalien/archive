import React, { useEffect, useState, useRef } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import VideoJS from './VideoJS'
import 'video.js/dist/video-js.css';

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

    useFetchVideoData(location, setError, setVideoDetails);

    const playerRef = React.useRef(null);
    const bgVideoRef = useRef(null);

    const videoJsOptions = videoDetails ? {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2],
        enableSmoothSeeking: true,
        sources: [{
            src: process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/" + videoDetails.videoUrl,
            type: 'video/mp4'
        }],
        controlBar: {
            children: [
                "progressControl",
                "playToggle",
                "volumePanel",
                "currentTimeDisplay",
                "timeDivider",
                "durationDisplay",
                "playbackRateMenuButton",
                "pictureInPictureToggle",
                "fullscreenToggle"
            ],
            skipButtons: {
                forward: 5,
                backward: 5
            },
        }
    } : null;

    const syncBackgroundVideo = (player) => {
        const bgVideo = bgVideoRef.current;

        player.on('play', () => {
            bgVideo.play();
        });

        player.on('pause', () => {
            bgVideo.pause();
        });

        player.on('timeupdate', () => {
            bgVideo.currentTime = player.currentTime();
        });
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        syncBackgroundVideo(player);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!videoDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <video
                ref={bgVideoRef}
                className="background-video"
                src={process.env.PUBLIC_URL + "/users/" + videoDetails.creator.id + "/videos/" + videoDetails.videoUrl.split('.')[0] + "/" + videoDetails.videoUrl}
                muted
                loop
                playsInline
            />
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
        </>
    )
}
export default VideoSec;