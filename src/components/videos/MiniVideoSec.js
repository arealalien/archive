import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import MiniVideoJS from './MiniVideoJS';
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

const MiniVideoSec = forwardRef(({ video }, ref) => {
    const location = useLocation();
    const [videoDetails, setVideoDetails] = useState(null);
    const [error, setError] = useState('');

    useFetchVideoData(video, location, setError, setVideoDetails);

    const playerRef = React.useRef(null);

    const videoJsOptions = videoDetails ? {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        muted: true,
        enableSmoothSeeking: true,
        poster: process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/thumbnail.jpg",
        sources: [{
            src: process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/" + video.videoUrl.split('.')[0] + "-144p." + video.videoUrl.split('.')[1],
            type: 'video/mp4'
        }],
        userActions: {
            hotkeys: true
        },
        controlBar: {
            children: [
                "progressControl",
            ],
        },
        inactivityTimeout: 3000,
        aspectRatio: '16:9',
    } : null;

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };

    useImperativeHandle(ref, () => ({
        play: () => {
            if (playerRef.current) {
                playerRef.current.play();
            }
        },
        reset: () => {
            if (playerRef.current) {
                playerRef.current.pause();
                playerRef.current.currentTime(0);
            }
        },
        readyState: () => playerRef.current?.readyState(),
        getPlayer: () => playerRef.current,
    }));

    if (error) {
        return <div>{error}</div>;
    }

    if (!videoDetails) {
        return <div></div>;
    }

    return (
        <>
            <MiniVideoJS ref={ref} options={videoJsOptions} onReady={handlePlayerReady} spriteLink={process.env.PUBLIC_URL + "/users/" + video.creator.id + "/videos/" + video.videoUrl.split('.')[0] + "/sprites/"}/>
        </>
    )
});
export default MiniVideoSec;