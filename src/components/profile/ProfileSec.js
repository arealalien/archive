import React, {useState, useEffect, useRef} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import { formatDistanceToNow } from "date-fns";

// Components
import VideosSec from "../videos/VideosSec";
import PlaylistsSec from "../playlists/PlaylistsSec";
import CreatorsSec from "../creator/CreatorsSec";
import VideoSec from "../videos/VideoSec";
import VideosSkeletonSec from "../videos/VideosSkeletonSec";
import MiniVideoSec from "../videos/MiniVideoSec";

const ProfileSec  = ({ profile, profileName, page }) => {
    const [videoDetails, setVideoDetails] = useState(null);
    const [videos, setVideos] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isFeaturedVideoLoading, setIsFeaturedVideoLoading] = useState(true);
    const [isVideosLoading, setIsVideosLoading] = useState(true);
    const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);
    const videoRefs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedVideo = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

                const headers = { Authorization: `Bearer ${token}` };

                // Then fetch video details
                const videoResponse = await axios.get(`http://localhost:5000/featuredvideo?creator=${encodeURIComponent(profileName)}`, { headers });
                setVideoDetails(videoResponse.data[0])
                setIsFeaturedVideoLoading(false);
            } catch (error) {
                console.error('Error fetching video data:', error);
                setIsFeaturedVideoLoading(false);
            }
        };

        fetchFeaturedVideo();
    }, [profileName]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                let url = `http://localhost:5000/featuredvideos?creator=${encodeURIComponent(profileName)}`;

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
                setIsVideosLoading(false);
            } catch (error) {
                console.error('Error fetching video data:', error);
                setIsVideosLoading(false);
            }
        };

        fetchVideos();
    }, [profileName]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/featuredplaylists?creator=${encodeURIComponent(profileName)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setPlaylists(data.map(playlist => ({
                    ...playlist
                })));
                setIsPlaylistsLoading(false);
            } catch (error) {
                console.error('Error fetching video data:', error);
                setIsPlaylistsLoading(false);
            }
        };

        fetchPlaylists();
    }, [profileName]);

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

    let domReady = false;

    const ensureDomReady = () => {
        return new Promise((resolve) => {
            if (domReady) {
                resolve();
            } else {
                const observer = new MutationObserver(() => {
                    if (document.readyState === 'complete') {
                        domReady = true;
                        observer.disconnect();
                        resolve();
                    }
                });
                observer.observe(document, { childList: true, subtree: true });
            }
        });
    };

    const handleMouseEnter = async (e, index) => {
        await ensureDomReady();

        const player = videoRefs.current[index]?.current;
        const videoContainer = e.target.closest('.videos-inner-item');

        if (!player || !videoContainer || !(e.relatedTarget instanceof Node) || videoContainer.contains(e.relatedTarget)) {
            return;
        }

        if (player.readyState && player.readyState() < 4) { // Check readyState using forwarded method
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

        await player.play();
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

        time.style.opacity = "1";
        overlay.style.opacity = "1";
        poster.style.display = "inline-block";
        posterInner.style.display = "inline-block";
        poster.style.opacity = "1";
        posterInner.style.opacity = "1";

        player.reset();
    };

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

    const renderSettingsContent = () => {
        switch(page) {
            case 'subscribers':
                return (
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Subscribers</h3>
                            </div>
                            <div className="creators-inner">
                                <CreatorsSec user={profile}/>
                            </div>
                        </div>
                    </>
                );
            case 'videos':
                return (
                    <>
                        <div className="profile-inner-content-right">
                            <div className="profile-inner-content-right-title">
                                <h3 className="profile-inner-content-right-title-name">Videos</h3>
                            </div>
                            <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                <VideosSec videoCreator={profileName}/>
                            </div>
                        </div>
                    </>
                );
            case 'playlists':
                return (
                    <div className="profile-inner-content-right playlists-grid">
                        <div className="profile-inner-content-right-title">
                            <h3 className="profile-inner-content-right-title-name">Playlists</h3>
                        </div>
                        <div className="profile-inner-content-right-playlists playlists-grid-inner">
                            <PlaylistsSec videoCreator={profileName} creator={profile}/>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        {isFeaturedVideoLoading && isVideosLoading && isPlaylistsLoading ? (
                            <>
                                
                            </>
                        ) : (
                            playlists.length > 0 && videos.length > 0 ? (
                                <>
                                    <div className="profile-inner-content-right featuredvideo">
                                        {videoDetails ? (
                                            <div className="featuredvideo-inner">
                                                <div className="featuredvideo-inner-left">
                                                    <VideoSec video={videoDetails}/>
                                                </div>
                                                <div className="featuredvideo-inner-right">
                                                    <div className="featuredvideo-inner-right-top">
                                                        <NavLink
                                                            to={`/video?view=` + videoDetails.videoUrl.split('.')[0]}
                                                            className="featuredvideo-inner-right-top-title">{videoDetails.title}</NavLink>
                                                        <p className="featuredvideo-inner-right-top-subtitle">
                                                            Seen <NumericFormat
                                                            value={videoDetails.views}
                                                            thousandSeparator=" "
                                                            displayType="text"
                                                            renderText={(value) => <b>{value}</b>}
                                                        /> times &middot; {format(new Date(videoDetails.datePosted), 'MMM d, yyyy')}
                                                        </p>
                                                    </div>
                                                    <div className="featuredvideo-inner-right-bottom">
                                                        <p className="featuredvideo-inner-right-bottom-description">
                                                            {videoDetails.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                    <div className="profile-inner-content-right">
                                        <div className="profile-inner-content-right-title">
                                            <h3 className="profile-inner-content-right-title-name">Videos</h3>
                                            <p className="profile-inner-content-right-title-divider">&middot;</p>
                                            <NavLink to={`/channel/` + profile.name + `/videos`}
                                                     className="profile-inner-content-right-title-link">See all</NavLink>
                                        </div>
                                        <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                            {isVideosLoading ? (
                                                <VideosSkeletonSec count={4} />
                                            ) : (
                                                videos.length > 0 &&
                                                videos.map((video, index) => {
                                                    if (!videoRefs.current[index]) {
                                                        videoRefs.current[index] = React.createRef(); // Create a ref for each video
                                                    }

                                                    return (
                                                        <div className="videos-inner-item" key={index} onMouseEnter={(e) => handleMouseEnter(e, index)} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                                                             onMouseLeave={(e) => handleMouseLeave(e, index)}>
                                                            <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-link">

                                                            </NavLink>
                                                            <div className="videos-inner-item-video" onClick={() => handleMouseClick(video.videoUrl)}>
                                                                <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-video-link">

                                                                </NavLink>
                                                                <div className="videos-inner-item-video-info">
                                                                    <div className="videos-inner-item-video-info-time">
                                                                        <p>{video.duration}</p>
                                                                        <div className="videos-inner-item-video-info-time-shadow"></div>
                                                                    </div>
                                                                </div>
                                                                <div to={`/video?view=` + video.videoUrl.split('.')[0]}
                                                                     className="videos-inner-item-video-overlay"></div>
                                                                <MiniVideoSec video={video} ref={videoRefs.current[index]} />
                                                            </div>
                                                            <div className="videos-inner-item-info">
                                                                <NavLink to={`/channel/${video.creator.name}`} className="videos-inner-item-info-left">
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
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                    <div className="profile-inner-content-right playlists-grid">
                                        <div className="profile-inner-content-right-title">
                                            <h3 className="profile-inner-content-right-title-name">Playlists</h3>
                                            <p className="profile-inner-content-right-title-divider">&middot;</p>
                                            <NavLink to={`/channel/` + profile.name + `/playlists`}
                                                     className="profile-inner-content-right-title-link">See all</NavLink>
                                        </div>
                                        <div className="profile-inner-content-right-playlists playlists-grid-inner">
                                            {playlists.length > 0 ? (
                                                playlists.map((playlist, index) => (
                                                    <NavLink to={`/playlist?list=${playlist.playlistUrl}`} key={index}
                                                             className="playlists-grid-inner-item">
                                                        <div className="playlists-grid-inner-item-top">
                                                            <img className="playlists-grid-inner-item-top-image"
                                                                 src={`${process.env.PUBLIC_URL}/${playlist.playlistImg}`}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="playlists-grid-inner-item-bottom">
                                                            <p className="playlists-grid-inner-item-bottom-title">{playlist.name}</p>
                                                            <p className="playlists-grid-inner-item-bottom-subtitle">
                                                                <span>{playlist.creator.name}</span>
                                                                {playlist.creator?.verified === 1 ? (
                                                                    <img
                                                                        src={process.env.PUBLIC_URL + `/images/verified.svg`}
                                                                        alt=""/>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                    </NavLink>
                                                ))
                                            ) : (
                                                <p>No playlists found</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : playlists.length > 0 ? (
                                <>
                                    <div className="profile-inner-content-right playlists-grid">
                                        <div className="profile-inner-content-right-title">
                                            <h3 className="profile-inner-content-right-title-name">Playlists</h3>
                                            <p className="profile-inner-content-right-title-divider">&middot;</p>
                                            <NavLink to={`/channel/` + profile.name + `/playlists`}
                                                     className="profile-inner-content-right-title-link">See all</NavLink>
                                        </div>
                                        <div className="profile-inner-content-right-playlists playlists-grid-inner">
                                            {playlists.length > 0 ? (
                                                playlists.map((playlist, index) => (
                                                    <NavLink to={`/playlist?list=${playlist.playlistUrl}`} key={index}
                                                             className="playlists-grid-inner-item">
                                                        <div className="playlists-grid-inner-item-top">
                                                            <img className="playlists-grid-inner-item-top-image"
                                                                 src={`${process.env.PUBLIC_URL}/${playlist.playlistImg}`}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="playlists-grid-inner-item-bottom">
                                                            <p className="playlists-grid-inner-item-bottom-title">{playlist.name}</p>
                                                            <p className="playlists-grid-inner-item-bottom-subtitle">
                                                                <span>{playlist.creator.name}</span>
                                                                {playlist.creator?.verified === 1 ? (
                                                                    <img
                                                                        src={process.env.PUBLIC_URL + `/images/verified.svg`}
                                                                        alt=""/>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                    </NavLink>
                                                ))
                                            ) : (
                                                <p>No playlists found</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : videos.length > 0 ? (
                                <>
                                    <div className="profile-inner-content-right featuredvideo">
                                        {videoDetails ? (
                                            <div className="featuredvideo-inner">
                                                <div className="featuredvideo-inner-left">
                                                    <VideoSec video={videoDetails}/>
                                                </div>
                                                <div className="featuredvideo-inner-right">
                                                    <div className="featuredvideo-inner-right-top">
                                                        <NavLink to={`/video?view=` + videoDetails.videoUrl.split('.')[0]}
                                                                 className="featuredvideo-inner-right-top-title">{videoDetails.title}</NavLink>
                                                        <p className="featuredvideo-inner-right-top-subtitle">
                                                            Seen <NumericFormat
                                                            value={videoDetails.views}
                                                            thousandSeparator=" "
                                                            displayType="text"
                                                            renderText={(value) => <b>{value}</b>}
                                                        /> times &middot; {format(new Date(videoDetails.datePosted), 'MMM d, yyyy')}
                                                        </p>
                                                    </div>
                                                    <div className="featuredvideo-inner-right-bottom">
                                                        <p className="featuredvideo-inner-right-bottom-description">
                                                            {videoDetails.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                    <div className="profile-inner-content-right">
                                        <div className="profile-inner-content-right-title">
                                            <h3 className="profile-inner-content-right-title-name">Videos</h3>
                                            <p className="profile-inner-content-right-title-divider">&middot;</p>
                                            <NavLink to={`/channel/` + profile.name + `/videos`}
                                                     className="profile-inner-content-right-title-link">See all</NavLink>
                                        </div>
                                        <div className="profile-inner-content-right-videos videos-inner-4 videos-inner">
                                            {isVideosLoading ? (
                                                <VideosSkeletonSec count={4} />
                                            ) : (
                                                videos.length > 0 &&
                                                videos.map((video, index) => {
                                                    if (!videoRefs.current[index]) {
                                                        videoRefs.current[index] = React.createRef(); // Create a ref for each video
                                                    }

                                                    return (
                                                        <div className="videos-inner-item" key={index} onMouseEnter={(e) => handleMouseEnter(e, index)} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                                                             onMouseLeave={(e) => handleMouseLeave(e, index)}>
                                                            <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-link">

                                                            </NavLink>
                                                            <div className="videos-inner-item-video" onClick={() => handleMouseClick(video.videoUrl)}>
                                                                <NavLink to={`/video?view=` + video.videoUrl.split('.')[0]} className="videos-inner-item-video-link">

                                                                </NavLink>
                                                                <div className="videos-inner-item-video-info">
                                                                    <div className="videos-inner-item-video-info-time">
                                                                        <p>{video.duration}</p>
                                                                        <div className="videos-inner-item-video-info-time-shadow"></div>
                                                                    </div>
                                                                </div>
                                                                <div to={`/video?view=` + video.videoUrl.split('.')[0]}
                                                                     className="videos-inner-item-video-overlay"></div>
                                                                <MiniVideoSec video={video} ref={videoRefs.current[index]} />
                                                            </div>
                                                            <div className="videos-inner-item-info">
                                                                <NavLink to={`/channel/${video.creator.name}`} className="videos-inner-item-info-left">
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
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="profile-inner-content-right no-content">
                                    <img className="no-content-image" src={process.env.PUBLIC_URL + `/images/no-content.png`} alt="" />
                                    <p className="no-content-sub">This channel has no content</p>
                                </div>
                            )
                        )}
                    </>
                );
        }
    };

    return (
        renderSettingsContent()
    );
};

export default ProfileSec;
