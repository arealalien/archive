import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import VideoJS from './VideoJS';
import 'video.js/dist/video-js.css';

const useFetchVideoData = (video, location, setError, setVideoDetails) => {
    useEffect(() => {
        const fetchVideoData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return setError("No token found");

            let urlToFetch = video.videoUrl.split(".")[0];

            if (!urlToFetch) {
                setError("No video URL found");
                return;
            }

            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`http://localhost:5000/videos/${encodeURIComponent(urlToFetch)}`, { headers });
                setVideoDetails(response.data);
            } catch (err) {
                console.error("Error fetching video data:", err);
                setError("Failed to fetch video data");
            }
        };
        fetchVideoData();
    }, [video, location.search, setError, setVideoDetails]);
};

const VideoSec  = ({ video }) => {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [error, setError] = useState('');

    useFetchVideoData(video, location, setError, setVideoDetails);

    const playerRef = React.useRef(null);

    const videoJsOptions = videoDetails ? {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2],
        enableSmoothSeeking: true,
        poster: process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/thumbnail.jpg",
        sources: [{
            src: process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/" + video.videoUrl,
            type: 'video/mp4'
        }],
        userActions: {
            hotkeys: true
        },
        controlBar: {
            children: [
                "progressControl",
                "playToggle",
                "seekButton",
                "volumePanel",
                "currentTimeDisplay",
                "timeDivider",
                "durationDisplay",
                "playbackRateMenuButton",
                "httpSourceSelector",
                "pictureInPictureToggle",
                "fullscreenToggle"
            ],
        },
        inactivityTimeout: 3000,
        aspectRatio: '16:9',
    } : null;

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!videoDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} spriteLink={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/sprites/"}/>
        </>
    )
}
export default VideoSec;