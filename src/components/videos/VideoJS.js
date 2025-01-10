import React, { useEffect } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import SpriteThumbnails from "videojs-sprite-thumbnails";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

const VideoJS = (props) => {
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
                    if (player && player.tech_ && typeof player.volume === "function") {
                        const storedVolume = localStorage.getItem('videoVolume');
                        if (storedVolume !== null) {
                            player.volume(parseFloat(storedVolume));
                        } else {
                            player.volume(0.5);
                        }
                    }

                    player.on('volumechange', () => {
                        if (player && player.tech_ && typeof player.volume === "function") {
                            const currentVolume = player.volume();
                            localStorage.setItem('videoVolume', currentVolume.toString());

                            const audioIcon = document.getElementById("audio-icon");

                            // Update SVG based on volume level
                            if (currentVolume === 0) {
                                // Mute SVG
                                audioIcon.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_mute" data-name="Xnix/Line/Vol mute" width="24" height="24" viewBox="0 0 24 24">
                              <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                              <path id="Vector-2" data-name="Vector" d="M10,7l2-2m0,0,2-2M12,5l2,2M12,5,10,3" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>`;
                            } else if (currentVolume > 0 && currentVolume <= 0.33) {
                                // Low volume SVG
                                audioIcon.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_Zero" data-name="Xnix/Line/Vol Zero" width="24" height="24" viewBox="0 0 24 24">
                              <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(8 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>`;
                            } else if (currentVolume > 0.33 && currentVolume <= 0.66) {
                                // Medium volume SVG (High in your example)
                                audioIcon.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_Low" data-name="Xnix/Line/Vol Low" width="24" height="24" viewBox="0 0 24 24">
                              <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(6 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                              <path id="Vector-2" data-name="Vector" d="M9.974,1.563a5.265,5.265,0,0,1,0,6.875" transform="translate(6 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
                            </svg>`;
                            } else {
                                // High volume SVG (Your example does not include another SVG for higher volume)
                                audioIcon.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_High" data-name="Xnix/Line/Vol High" width="24" height="24" viewBox="0 0 24 24">
                              <path id="Vector" d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                              <path id="Vector-2" data-name="Vector" d="M12.463.417a7.62,7.62,0,0,1,0,9.167M9.974,1.563a5.265,5.265,0,0,1,0,6.875" transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>`;
                            }
                        }
                    });

                    document.addEventListener('keydown', (event) => {
                        let currentVolume = player.volume();

                        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                            event.preventDefault();
                        }

                        if (event.key === 'ArrowUp') {
                            document.getElementById("audio").style.opacity = "1";
                            setTimeout(function() {
                                document.getElementById("audio").style.opacity = "0";
                            },250);
                            const newVolume = Math.min(currentVolume + 0.05, 1);
                            player.volume(newVolume);
                            localStorage.setItem('videoVolume', newVolume.toString());
                        } else if (event.key === 'ArrowDown') {
                            document.getElementById("audio").style.opacity = "1";
                            setTimeout(function() {
                                document.getElementById("audio").style.opacity = "0";
                            },250);
                            const newVolume = Math.max(currentVolume - 0.05, 0);
                            player.volume(newVolume);
                            localStorage.setItem('videoVolume', newVolume.toString());
                        }

                        if (event.key === 'ArrowRight') {
                            document.getElementById("video-forward").style.opacity = "1";
                            setTimeout(function() {
                                document.getElementById("video-forward").style.opacity = "0";
                            },250);
                            const newTime = Math.min(player.currentTime() + 5, player.duration());
                            player.currentTime(newTime);
                        } else if (event.key === 'ArrowLeft') {
                            document.getElementById("video-backward").style.opacity = "1";
                            setTimeout(function() {
                                document.getElementById("video-backward").style.opacity = "0";
                            },250);
                            const newTime = Math.max(player.currentTime() - 5, 0);
                            player.currentTime(newTime);
                        }
                    });

                    player.qualityLevels();
                    if (typeof player.httpSourceSelector === "function" && player) {
                        player.httpSourceSelector();
                    }

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
                <div className="videoplayer-buttons">
                    <div id="audio" className="videoplayer-buttons-button">
                        <p className="videoplayer-buttons-button-text" id="audio-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Vol_High"
                                 data-name="Xnix/Line/Vol High" width="24" height="24" viewBox="0 0 24 24">
                                <path id="Vector"
                                      d="M1.482,7.98A1.588,1.588,0,0,1,0,6.3V3.7A1.588,1.588,0,0,1,1.482,2.02H2.588a1.375,1.375,0,0,0,.9-.343L5.031.346A1.477,1.477,0,0,1,7.412,1.679V8.321A1.477,1.477,0,0,1,5.031,9.654L3.486,8.323a1.375,1.375,0,0,0-.9-.343Z"
                                      transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="1.5"/>
                                <path id="Vector-2" data-name="Vector"
                                      d="M12.463.417a7.62,7.62,0,0,1,0,9.167M9.974,1.563a5.265,5.265,0,0,1,0,6.875"
                                      transform="translate(5 7)" fill="none" stroke="#000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>
                        </p>
                    </div>
                    <div id="video-forward" className="videoplayer-buttons-button">
                        <p className="videoplayer-buttons-button-text">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Forward" data-name="Xnix/Line/Forward"
                                 width="24" height="24" viewBox="0 0 24 24">
                                <path id="Vector"
                                      d="M6.849,3.632a1.251,1.251,0,0,0-.172-.147L2.157.263A1.346,1.346,0,0,0,0,1.127V7.873a1.346,1.346,0,0,0,2.157.864L6.678,5.213a1.252,1.252,0,0,0,.172-.147m0-1.434V1.127A1.346,1.346,0,0,1,9.006.263l4.521,3.222a1.026,1.026,0,0,1,0,1.728L9.006,8.737a1.346,1.346,0,0,1-2.157-.864V5.066m0-1.434V5.066"
                                      transform="translate(5 8)" fill="none" stroke="#000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>
                        </p>
                    </div>
                    <div id="video-backward" className="videoplayer-buttons-button">
                        <p className="videoplayer-buttons-button-text">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Xnix_Line_Backword"
                                 data-name="Xnix/Line/Backword" width="24" height="24" viewBox="0 0 24 24">
                                <path id="Vector"
                                      d="M6.849-3.632a1.251,1.251,0,0,1-.172.147L2.157-.263A1.346,1.346,0,0,1,0-1.127V-7.873a1.346,1.346,0,0,1,2.157-.864L6.678-5.213a1.252,1.252,0,0,1,.172.147m0,1.434v2.505a1.346,1.346,0,0,0,2.157.864l4.521-3.222a1.026,1.026,0,0,0,0-1.728L9.006-8.737a1.346,1.346,0,0,0-2.157.864v2.807m0,1.434V-5.066"
                                      transform="translate(19 8) rotate(180)" fill="none" stroke="#000"
                                      stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>
                        </p>
                    </div>
                </div>
                <div ref={videoRef}/>
            </div>
        </>
    )
}
export default VideoJS;