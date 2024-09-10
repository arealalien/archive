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
                    // Fetch the sprite.json file dynamically
                    fetch(`${spriteLink}sprite.json`)
                        .then(response => response.json())
                        .then(jsonData => {
                            // Calculate the number of columns based on the jsonData
                            const frames = Object.keys(jsonData).length;
                            const columns = Math.ceil(Math.sqrt(frames));

                            player.spriteThumbnails({
                                width: 160,
                                height: 90,
                                interval: 2,
                                url: `${spriteLink}sprite.jpg`,
                                columns: columns,
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching sprite.json:", error);
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