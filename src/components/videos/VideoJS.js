import React, { useEffect } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import SpriteThumbnails from "videojs-sprite-thumbnails";

const VideoJS  = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady, spriteLink} = props;

    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);

                player.ready(() => {
                    Promise.all([
                        fetch(`${spriteLink}sprite.json`).then(response => response.json()),
                        fetch(`${spriteLink}interval.json`).then(response => response.json()),
                        fetch(`${spriteLink}aspect_ratio.json`).then(response => response.json())
                    ])
                        .then(([spriteData, intervalData, aspectRatioData]) => {
                            const frames = Object.keys(spriteData).length;
                            const columns = Math.ceil(Math.sqrt(frames));
                            const interval = intervalData.frameInterval;
                            const aspectRatio = aspectRatioData.aspectRatio;

                            const spriteHeight = 90; // Keep height fixed
                            const spriteWidth = Math.round(spriteHeight * aspectRatio);

                            player.spriteThumbnails({
                                width: spriteWidth,
                                height: spriteHeight,
                                interval: interval,
                                url: `${spriteLink}sprite.jpg`,
                                columns: columns,
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching sprite or aspect ratio data:", error);
                        });
                });
            });
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <>
            <div id="videojs-sprite-thumbnails-player" className="video-js videoplayer" data-vjs-player>
                <div ref={videoRef}/>
            </div>
        </>
    )
}
export default VideoJS;